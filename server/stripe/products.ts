/**
 * Stripe products and pricing configuration
 * These are the products available for purchase on the pricing page
 */

export const STRIPE_PRODUCTS = {
  STARTER: {
    name: "Starter Coaching Package",
    description: "Perfect for beginners looking to establish their personal brand foundation",
    priceInCents: 2900, // $29.00
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID || "price_starter_placeholder",
    features: [
      "1 one-on-one coaching session",
      "Personal brand assessment",
      "LinkedIn profile optimization guide",
      "Email support for 30 days",
    ],
  },
  PROFESSIONAL: {
    name: "Professional Coaching Package",
    description: "Ideal for professionals ready to amplify their brand and influence",
    priceInCents: 7900, // $79.00
    stripePriceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID || "price_professional_placeholder",
    features: [
      "4 one-on-one coaching sessions",
      "Comprehensive brand strategy development",
      "Content calendar creation",
      "LinkedIn content optimization",
      "Email and Slack support for 90 days",
      "Access to all advanced modules",
    ],
  },
  EXECUTIVE: {
    name: "Executive Coaching Package",
    description: "Premium package for executives and thought leaders",
    priceInCents: 19900, // $199.00
    stripePriceId: process.env.STRIPE_EXECUTIVE_PRICE_ID || "price_executive_placeholder",
    features: [
      "12 one-on-one coaching sessions",
      "Custom brand positioning strategy",
      "Speaking opportunity identification",
      "Media training and pitch development",
      "LinkedIn and personal website optimization",
      "Priority email and phone support for 6 months",
      "Access to all advanced modules and exclusive content",
      "Quarterly brand performance reviews",
    ],
  },
};

export type ProductKey = keyof typeof STRIPE_PRODUCTS;

export function getProduct(key: ProductKey) {
  return STRIPE_PRODUCTS[key];
}

export function getAllProducts() {
  return Object.entries(STRIPE_PRODUCTS).map(([key, product]) => ({
    key,
    ...product,
  }));
}
