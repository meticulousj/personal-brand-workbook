import Stripe from "stripe";
import { z } from "zod";
import { getOrCreateStripeCustomer, createStripePayment } from "../db";
import { STRIPE_PRODUCTS, ProductKey } from "./products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
// Using default API version from Stripe SDK

export async function createCheckoutSession(
  userId: number,
  userEmail: string,
  userName: string | undefined,
  productKey: ProductKey,
  origin: string
) {
  try {
    const product = STRIPE_PRODUCTS[productKey];
    if (!product) {
      throw new Error(`Product ${productKey} not found`);
    }

    // Get or create Stripe customer
    let stripeCustomerId: string;
    try {
      const customers = await stripe.customers.list({
        email: userEmail,
        limit: 1,
      });

      if (customers.data.length > 0) {
        stripeCustomerId = customers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          email: userEmail,
          name: userName,
          metadata: {
            userId: userId.toString(),
          },
        });
        stripeCustomerId = customer.id;
      }
    } catch (error) {
      console.error("[Stripe] Failed to get/create customer:", error);
      throw error;
    }

    // Store customer in database
    await getOrCreateStripeCustomer(userId, stripeCustomerId, userEmail);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: product.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      client_reference_id: userId.toString(),
      metadata: {
        userId: userId.toString(),
        productKey,
        productName: product.name,
      },
    });

    return session;
  } catch (error) {
    console.error("[Stripe] Failed to create checkout session:", error);
    throw error;
  }
}

export async function handlePaymentSuccess(
  sessionId: string,
  userId: number
) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    const paymentIntentId = session.payment_intent as string;
    const amount = session.amount_total || 0;
    const productName = session.metadata?.productName || "Unknown Product";

    // Store payment in database
    await createStripePayment({
      userId,
      stripePaymentIntentId: paymentIntentId,
      amount,
      currency: (session.currency || "usd").toUpperCase(),
      status: "succeeded",
      productName,
    });

    return {
      success: true,
      paymentIntentId,
      amount,
      productName,
    };
  } catch (error) {
    console.error("[Stripe] Failed to handle payment success:", error);
    throw error;
  }
}
