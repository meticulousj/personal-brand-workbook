import { describe, expect, it, vi } from "vitest";
import { STRIPE_PRODUCTS } from "./products";

describe("Stripe Checkout", () => {
  it("should have all required product keys defined", () => {
    expect(STRIPE_PRODUCTS).toHaveProperty("STARTER");
    expect(STRIPE_PRODUCTS).toHaveProperty("PROFESSIONAL");
    expect(STRIPE_PRODUCTS).toHaveProperty("EXECUTIVE");
  });

  it("should have pricing tiers in ascending order", () => {
    expect(STRIPE_PRODUCTS.STARTER.priceInCents).toBeLessThan(
      STRIPE_PRODUCTS.PROFESSIONAL.priceInCents
    );
    expect(STRIPE_PRODUCTS.PROFESSIONAL.priceInCents).toBeLessThan(
      STRIPE_PRODUCTS.EXECUTIVE.priceInCents
    );
  });

  it("should have correct pricing for each tier", () => {
    expect(STRIPE_PRODUCTS.STARTER.priceInCents).toBe(2900); // $29.00 in cents
    expect(STRIPE_PRODUCTS.PROFESSIONAL.priceInCents).toBe(7900); // $79.00 in cents
    expect(STRIPE_PRODUCTS.EXECUTIVE.priceInCents).toBe(19900); // $199.00 in cents
  });

  it("should have descriptions for all products", () => {
    expect(STRIPE_PRODUCTS.STARTER.description).toBeDefined();
    expect(STRIPE_PRODUCTS.PROFESSIONAL.description).toBeDefined();
    expect(STRIPE_PRODUCTS.EXECUTIVE.description).toBeDefined();
  });

  it("should have descriptive names and features for each product", () => {
    expect(STRIPE_PRODUCTS.STARTER.name).toContain("Starter");
    expect(STRIPE_PRODUCTS.PROFESSIONAL.name).toContain("Professional");
    expect(STRIPE_PRODUCTS.EXECUTIVE.name).toContain("Executive");
    
    // Each product should have features array
    expect(Array.isArray(STRIPE_PRODUCTS.STARTER.features)).toBe(true);
    expect(Array.isArray(STRIPE_PRODUCTS.PROFESSIONAL.features)).toBe(true);
    expect(Array.isArray(STRIPE_PRODUCTS.EXECUTIVE.features)).toBe(true);
    
    // Each product should have at least one feature
    expect(STRIPE_PRODUCTS.STARTER.features.length).toBeGreaterThan(0);
    expect(STRIPE_PRODUCTS.PROFESSIONAL.features.length).toBeGreaterThan(0);
    expect(STRIPE_PRODUCTS.EXECUTIVE.features.length).toBeGreaterThan(0);
  });

  it("should have valid Stripe price IDs", () => {
    expect(STRIPE_PRODUCTS.STARTER.stripePriceId).toBeDefined();
    expect(STRIPE_PRODUCTS.PROFESSIONAL.stripePriceId).toBeDefined();
    expect(STRIPE_PRODUCTS.EXECUTIVE.stripePriceId).toBeDefined();
    
    // Price IDs should start with 'price_' or be placeholders
    expect(STRIPE_PRODUCTS.STARTER.stripePriceId).toMatch(/^price_/);
    expect(STRIPE_PRODUCTS.PROFESSIONAL.stripePriceId).toMatch(/^price_/);
    expect(STRIPE_PRODUCTS.EXECUTIVE.stripePriceId).toMatch(/^price_/);
  });
});
