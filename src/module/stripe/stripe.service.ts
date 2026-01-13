// src/stripe/stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe'; // ✅ Correct import

@Injectable()
export class StripeService {
  private stripeClient: Stripe;

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
    }

    this.stripeClient = new Stripe(secretKey, {
      apiVersion: '2025-12-15.clover',
    });
  }

  async createCheckoutSession(userId: string, priceId: string, successUrl: string, cancelUrl: string) {
    const session = await this.stripeClient.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: '', // Optional: you can set email later via customer object
      client_reference_id: userId, // Pass user ID to link session to user
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
    });

    return session;
  }

  async handleWebhookEvent(signature: string, payload: Buffer) {
    let event: Stripe.Event;

    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!webhookSecret) {
        throw new Error('STRIPE_WEBHOOK_SECRET is not defined in environment variables');
      }

      event = this.stripeClient.webhooks.constructEvent(
        payload.toString(),
        signature,
        webhookSecret
      );
    } catch (err) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await this.handleSubscriptionEvent(event.data.object as Stripe.Subscription);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  }

  private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const userId = session.client_reference_id;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    console.log('Checkout completed for user:', userId);
    // TODO: Update DB with userId, customerId, subscriptionId
  }

  private async handleSubscriptionEvent(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;
    const status = subscription.status;
    const planId = subscription.items.data[0].price.product;

    console.log('Subscription updated:', subscription.id, status);
    // TODO: Update DB with customerId, status, planId
  }
}