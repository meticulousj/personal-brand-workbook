import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Zap, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  stripePriceId?: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "STARTER",
    name: "Starter",
    price: 29,
    description: "Perfect for individuals just beginning their personal branding journey",
    features: [
      "Access to all 9 pillar modules",
      "Interactive workbook with progress tracking",
      "Downloadable PDF templates (6 templates)",
      "Personal branding tips guide",
      "Email support",
      "30-day access",
    ],
    cta: "Get Started",
    stripePriceId: "price_starter",
  },
  {
    id: "PROFESSIONAL",
    name: "Professional",
    price: 79,
    description: "Ideal for professionals looking to amplify their personal brand",
    features: [
      "Everything in Starter, plus:",
      "Advanced modules for LinkedIn optimization",
      "Personal brand audit worksheet",
      "Story framework & narrative development",
      "Email support with 24-hour response",
      "90-day access with lifetime updates",
      "Exclusive community access",
      "Monthly group coaching calls (2)",
    ],
    cta: "Upgrade Now",
    highlighted: true,
    stripePriceId: "price_professional",
  },
  {
    id: "EXECUTIVE",
    name: "Executive",
    price: 199,
    description: "Comprehensive solution for executives and thought leaders",
    features: [
      "Everything in Professional, plus:",
      "1-on-1 personal branding coaching (4 sessions)",
      "Custom brand positioning strategy",
      "LinkedIn profile optimization service",
      "Personal brand messaging framework",
      "Media kit creation",
      "Priority email support",
      "Lifetime access with quarterly updates",
      "Private Slack community",
      "Monthly 1-on-1 coaching calls (4)",
    ],
    cta: "Start Premium",
    stripePriceId: "price_executive",
  },
];

export default function PricingPage() {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const checkoutMutation = trpc.stripe.createCheckoutSession.useMutation();

  const handleCheckout = async (tier: PricingTier) => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    setLoadingId(tier.id);
    try {
      const response = await checkoutMutation.mutateAsync({
        productKey: tier.id as "STARTER" | "PROFESSIONAL" | "EXECUTIVE",
        origin: window.location.origin,
      });

      if (response.success && response.url) {
        // Open Stripe checkout in a new tab
        window.open(response.url, "_blank");
        toast.success("Redirecting to checkout...");
      } else {
        toast.error("Failed to create checkout session. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-xl font-display font-bold text-foreground">
              Pricing & Packages
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Invest in Your Personal Brand
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the package that fits your journey. All plans include access to the complete
            Personal Brand Workbook with our proven 9-pillar framework.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="text-sm font-medium text-foreground">One-time payment</span>
            <div className="inline-flex items-center bg-primary/10 rounded-full p-1">
              <button className="px-4 py-2 rounded-full bg-white text-foreground font-medium">
                Monthly
              </button>
              <button className="px-4 py-2 rounded-full text-muted-foreground hover:text-foreground">
                Annual (Save 20%)
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative p-8 flex flex-col transition-all duration-300 ${
                tier.highlighted
                  ? "md:scale-105 border-primary shadow-xl bg-gradient-to-br from-primary/5 to-accent/5"
                  : "hover:shadow-lg hover:border-primary/50"
              }`}
            >
              {/* Popular Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Name and Description */}
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => handleCheckout(tier)}
                disabled={loadingId === tier.id}
                className={`w-full mb-8 ${
                  tier.highlighted
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "bg-secondary hover:bg-secondary/90 text-foreground"
                }`}
                size="lg"
              >
                {loadingId === tier.id ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />
                  Processing...
                </>
              ) : (
                tier.cta
              )}
              </Button>

              {/* Features List */}
              <div className="space-y-4 flex-1">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10 p-12 mb-12">
          <h3 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h3>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                What payment methods do you accept?
              </h4>
              <p className="text-muted-foreground text-sm">
                We accept all major credit cards, debit cards, and digital payment methods through
                Stripe. Your payment is secure and encrypted.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Is there a money-back guarantee?
              </h4>
              <p className="text-muted-foreground text-sm">
                Yes! If you're not satisfied within 30 days, we offer a full refund. No questions
                asked.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Can I upgrade or downgrade my plan?
              </h4>
              <p className="text-muted-foreground text-sm">
                Absolutely. You can upgrade to a higher tier at any time. We'll prorate the
                difference based on your remaining access period.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                How long do I have access to the materials?
              </h4>
              <p className="text-muted-foreground text-sm">
                Access duration varies by plan. Starter includes 30 days, Professional includes 90
                days with lifetime updates, and Executive includes lifetime access.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Do you offer team or corporate licenses?
              </h4>
              <p className="text-muted-foreground text-sm">
                Yes! For team or corporate inquiries, please contact us directly at
                hello@personalbranding.com for custom pricing.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                What if I need help choosing the right plan?
              </h4>
              <p className="text-muted-foreground text-sm">
                Our support team is here to help! Reach out to us, and we'll recommend the best
                plan based on your personal branding goals.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-12 text-center text-white">
          <h3 className="text-3xl font-display font-bold mb-4">
            Ready to Build Your Personal Brand?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of professionals who are transforming their careers with our proven
            personal branding framework.
          </p>
          <Button
            onClick={() => handleCheckout(pricingTiers[1]!)}
            disabled={loadingId === "PROFESSIONAL"}
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg"
            size="lg"
          >
            {loadingId === "PROFESSIONAL" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />
                Processing...
              </>
            ) : (
              "Start Your Journey"
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
