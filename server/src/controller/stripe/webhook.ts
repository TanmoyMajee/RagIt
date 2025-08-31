import Stripe from "stripe";
import { Request, Response } from "express";
import prisma from "../../DataBase/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion:"2025-08-27.basil" });

export const handleStripeWebhook = async (req: Request, res: Response) :Promise<void>=> {
  const sig = req.headers["stripe-signature"] as string;
  let event;

  try{
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = Number(session.metadata?.userId);
    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { plan: "PREMIUM" },
      });
    }
  }

  res.json({ received: true });
};