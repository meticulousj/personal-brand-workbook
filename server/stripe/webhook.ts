import Stripe from "stripe";
import { Request, Response } from "express";
import { updateStripePayment, createStripeSubscription, updateStripeSubscription } from "../db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
// Using default API version from Stripe SDK

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );
  } catch (error) {
    console.error("[Webhook] Signature verification failed:", error);
    return res.status(400).json({ error: "Invalid signature" });
  }

  // Handle test events for webhook verification
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({ verified: true });
  }

  try {
    switch (event.type) {
      case "charge.succeeded": {
        const charge = event.data.object as Stripe.Charge;
        console.log("[Webhook] Charge succeeded:", charge.id);
        
        if (charge.payment_intent) {
          await updateStripePayment(
            charge.payment_intent as string,
            "succeeded"
          );
        }
        break;
      }

      case "charge.failed": {
        const charge = event.data.object as Stripe.Charge;
        console.log("[Webhook] Charge failed:", charge.id);
        
        if (charge.payment_intent) {
          await updateStripePayment(
            charge.payment_intent as string,
            "failed"
          );
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription & { current_period_start: number; current_period_end: number };
        console.log("[Webhook] Subscription created:", subscription.id);
        
        const userId = parseInt(subscription.metadata?.userId || "0");
        if (userId > 0) {
          const priceId = subscription.items.data[0]?.price.id || "";
          await createStripeSubscription({
            userId,
            stripeSubscriptionId: subscription.id,
            stripePriceId: priceId,
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription & { current_period_start: number; current_period_end: number; canceled_at?: number };
        console.log("[Webhook] Subscription updated:", subscription.id);
        
        await updateStripeSubscription(subscription.id, {
          status: subscription.status,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : undefined,
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("[Webhook] Subscription deleted:", subscription.id);
        
        await updateStripeSubscription(subscription.id, {
          status: "canceled",
          canceledAt: new Date(),
        });
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
        console.log("[Webhook] Invoice paid:", invoice.id);
        
        if (invoice.subscription && typeof invoice.subscription === "string") {
          await updateStripeSubscription(invoice.subscription, {
            status: "active",
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
        console.log("[Webhook] Invoice payment failed:", invoice.id);
        
        if (invoice.subscription && typeof invoice.subscription === "string") {
          await updateStripeSubscription(invoice.subscription, {
            status: "past_due",
          });
        }
        break;
      }

      default:
        console.log("[Webhook] Unhandled event type:", event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("[Webhook] Error processing event:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}
