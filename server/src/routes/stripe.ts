import express from "express";
import { handleStripeWebhook } from "../controller/stripe/webhook";

const router = express.Router();

// Stripe requires the raw body for webhooks
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

export default router;