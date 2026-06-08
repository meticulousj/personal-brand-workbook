import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, emailSubscribers, InsertEmailSubscriber, stripeCustomers, InsertStripeCustomer, stripeSubscriptions, InsertStripeSubscription, stripePayments, InsertStripePayment } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Email subscriber queries
export async function subscribeEmail(subscriber: InsertEmailSubscriber): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot subscribe email: database not available");
    return;
  }

  try {
    await db.insert(emailSubscribers).values(subscriber).onDuplicateKeyUpdate({
      set: {
        name: subscriber.name,
        source: subscriber.source,
        subscribed: 1,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("[Database] Failed to subscribe email:", error);
    throw error;
  }
}

export async function getEmailSubscriber(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get email subscriber: database not available");
    return undefined;
  }

  const result = await db.select().from(emailSubscribers).where(eq(emailSubscribers.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Stripe customer queries
export async function getOrCreateStripeCustomer(userId: number, stripeCustomerId: string, email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get/create stripe customer: database not available");
    return undefined;
  }

  try {
    const existing = await db.select().from(stripeCustomers).where(eq(stripeCustomers.userId, userId)).limit(1);
    if (existing.length > 0) {
      return existing[0];
    }

    await db.insert(stripeCustomers).values({
      userId,
      stripeCustomerId,
      email,
    });

    const result = await db.select().from(stripeCustomers).where(eq(stripeCustomers.userId, userId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get/create stripe customer:", error);
    throw error;
  }
}

// Stripe subscription queries
export async function createStripeSubscription(subscription: InsertStripeSubscription) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create stripe subscription: database not available");
    return undefined;
  }

  try {
    await db.insert(stripeSubscriptions).values(subscription);
    const result = await db.select().from(stripeSubscriptions).where(eq(stripeSubscriptions.stripeSubscriptionId, subscription.stripeSubscriptionId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to create stripe subscription:", error);
    throw error;
  }
}

export async function updateStripeSubscription(stripeSubscriptionId: string, updates: Partial<InsertStripeSubscription>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update stripe subscription: database not available");
    return undefined;
  }

  try {
    await db.update(stripeSubscriptions).set({ ...updates, updatedAt: new Date() }).where(eq(stripeSubscriptions.stripeSubscriptionId, stripeSubscriptionId));
    const result = await db.select().from(stripeSubscriptions).where(eq(stripeSubscriptions.stripeSubscriptionId, stripeSubscriptionId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to update stripe subscription:", error);
    throw error;
  }
}

export async function getUserSubscription(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user subscription: database not available");
    return undefined;
  }

  const result = await db.select().from(stripeSubscriptions).where(eq(stripeSubscriptions.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Stripe payment queries
export async function createStripePayment(payment: InsertStripePayment) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create stripe payment: database not available");
    return undefined;
  }

  try {
    await db.insert(stripePayments).values(payment);
    const result = await db.select().from(stripePayments).where(eq(stripePayments.stripePaymentIntentId, payment.stripePaymentIntentId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to create stripe payment:", error);
    throw error;
  }
}

export async function updateStripePayment(stripePaymentIntentId: string, status: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update stripe payment: database not available");
    return undefined;
  }

  try {
    await db.update(stripePayments).set({ status, updatedAt: new Date() }).where(eq(stripePayments.stripePaymentIntentId, stripePaymentIntentId));
    const result = await db.select().from(stripePayments).where(eq(stripePayments.stripePaymentIntentId, stripePaymentIntentId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to update stripe payment:", error);
    throw error;
  }
}

export async function getUserPayments(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user payments: database not available");
    return [];
  }

  try {
    return await db.select().from(stripePayments).where(eq(stripePayments.userId, userId));
  } catch (error) {
    console.error("[Database] Failed to get user payments:", error);
    return [];
  }
}

// TODO: add feature queries here as your schema grows.
