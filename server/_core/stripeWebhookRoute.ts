import { Express } from "express";
import { handleStripeWebhook } from "../stripe/webhook";

export function registerStripeWebhookRoute(app: Express) {
  // Register webhook route BEFORE express.json() middleware
  // This is critical for Stripe signature verification
  app.post("/api/stripe/webhook", (req, res) => {
    // Use raw body for signature verification
    let body = "";
    req.setEncoding("utf8");

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      // Create a new request object with the raw body
      const rawReq = {
        ...req,
        body: body,
      };

      await handleStripeWebhook(rawReq as any, res);
    });
  });
}
