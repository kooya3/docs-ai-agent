"use server"

import stripe from "@/lib/stripe"
import type { Metadata, GroupedBasketItem } from "./types"

export async function createCheckoutSession(items: GroupedBasketItem[], metadata: Metadata) {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`
    const cancelUrl = `${baseUrl}/pricing`

    // First, create or retrieve a customer
    let customer
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    })

    if (customers.data.length > 0) {
      customer = customers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: metadata.customerEmail,
        name: metadata.customerName,
        metadata: {
          clerkUserId: metadata.clerkUserId,
        },
      })
    }

    // Create the checkout session with dynamic prices
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: await Promise.all(
        items.map(async (item) => {
          // Create or retrieve product
          const product = await stripe.products.create({
            name: item.product.name,
            description: `${item.product.name} Subscription Plan`,
            metadata: {
              planId: item.product._id,
            },
          })

          // Create price for the product
          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: Math.round(item.selectedSizeDetails?.price! * 100), // Convert to cents
            currency: "usd",
            recurring: {
              interval: "month",
            },
          })

          return {
            price: price.id,
            quantity: 1,
          }
        }),
      ),
      subscription_data: {
        metadata: {
          clerkUserId: metadata.clerkUserId,
        },
      },
    })

    return session.url
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}

