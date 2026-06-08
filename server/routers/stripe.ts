import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { createCheckoutSession, handlePaymentSuccess } from "../stripe/checkout";
import { STRIPE_PRODUCTS, ProductKey } from "../stripe/products";
import { getUserPayments, getUserSubscription } from "../db";

export const stripeRouter = router({
  // Create a checkout session for a product
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        productKey: z.enum(["STARTER", "PROFESSIONAL", "EXECUTIVE"] as const),
        origin: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      try {
        const session = await createCheckoutSession(
          ctx.user.id,
          ctx.user.email ?? "",
          ctx.user.name ?? undefined,
          input.productKey as ProductKey,
          input.origin
        );

        return {
          success: true,
          sessionId: session.id,
          url: session.url,
        };
      } catch (error) {
        console.error("[Stripe] Failed to create checkout session:", error);
        throw new Error("Failed to create checkout session");
      }
    }),

  // Handle payment success (called after redirect from Stripe)
  handlePaymentSuccess: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      try {
        const result = await handlePaymentSuccess(input.sessionId, ctx.user.id);
        return result;
      } catch (error) {
        console.error("[Stripe] Failed to handle payment success:", error);
        throw new Error("Failed to process payment success");
      }
    }),

  // Get user's payment history
  getPaymentHistory: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new Error("User not authenticated");
    }

    try {
      const payments = await getUserPayments(ctx.user.id);
      return {
        success: true,
        payments: payments.map((p) => ({
          id: p.id,
          amount: p.amount,
          currency: p.currency,
          status: p.status,
          productName: p.productName,
          createdAt: p.createdAt,
        })),
      };
    } catch (error) {
      console.error("[Stripe] Failed to get payment history:", error);
      throw new Error("Failed to get payment history");
    }
  }),

  // Get user's active subscription
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new Error("User not authenticated");
    }

    try {
      const subscription = await getUserSubscription(ctx.user.id);
      return {
        success: true,
        subscription: subscription
          ? {
              id: subscription.id,
              status: subscription.status,
              currentPeriodStart: subscription.currentPeriodStart,
              currentPeriodEnd: subscription.currentPeriodEnd,
              canceledAt: subscription.canceledAt,
            }
          : null,
      };
    } catch (error) {
      console.error("[Stripe] Failed to get subscription:", error);
      throw new Error("Failed to get subscription");
    }
  }),

  // Get available products
  getProducts: publicProcedure.query(() => {
    return {
      success: true,
      products: Object.entries(STRIPE_PRODUCTS).map(([key, product]) => ({
        key,
        name: product.name,
        description: product.description,
        priceInCents: product.priceInCents,
        features: product.features,
      })),
    };
  }),
});
