import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { subscribeEmail, getEmailSubscriber } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  email: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
        source: z.string().default("lead-magnet"),
      }))
      .mutation(async ({ input }) => {
        try {
          await subscribeEmail({
            email: input.email,
            name: input.name,
            source: input.source,
          });
          return { success: true, message: "Successfully subscribed!" };
        } catch (error) {
          console.error("[Email] Subscription error:", error);
          return { success: false, message: "Failed to subscribe. Please try again." };
        }
      }),
    check: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        const subscriber = await getEmailSubscriber(input.email);
        return { isSubscribed: !!subscriber };
      }),
  }),
});

export type AppRouter = typeof appRouter;
