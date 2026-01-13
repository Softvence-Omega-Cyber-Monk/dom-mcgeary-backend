
// src/stripe/stripe.controller.ts
import { Controller, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { StripeService } from './stripe.service';
import { AuthGuard } from '@nestjs/passport'; // assuming you have auth

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  @UseGuards(AuthGuard('jwt'))
  async createCheckoutSession(@Req() req, @Body() body: { priceId: string }) {
    const userId = req.user.id; // Assuming you have user ID in JWT
    const successUrl = `${process.env.FRONTEND_URL}/subscription-success`;
    const cancelUrl = `${process.env.FRONTEND_URL}/subscription-cancel`;

    const session = await this.stripeService.createCheckoutSession(
      userId,
      body.priceId,
      successUrl,
      cancelUrl
    );

    return { sessionId: session.id };
  }

  @Post('webhook')
  async webhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    const rawBody = req.body;

    try {
      await this.stripeService.handleWebhookEvent(sig, rawBody);
      res.status(200).json({ received: true });
    } catch (err) {
      console.error('Webhook error:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}