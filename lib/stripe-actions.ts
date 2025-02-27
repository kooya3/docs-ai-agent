"use server"

import stripe from "@/lib/stripe"

export async function getCustomerSubscriptions(userId: string) {
  try {
    // First, find the customer by metadata
    const customers = await stripe.customers.list({
      limit: 1,
      metadata: {
        clerkUserId: userId,
      },
    })

    if (!customers.data.length) {
      return []
    }

    const customer = customers.data[0]

    // Get all subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      expand: ["data.items.data.price.product"],
      limit: 100,
    })

    return subscriptions.data
  } catch (error) {
    console.error("Error fetching customer subscriptions:", error)
    return []
  }
}

