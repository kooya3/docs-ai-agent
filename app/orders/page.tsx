import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import stripe from "@/lib/stripe"
import { OrderCard } from "@/components/order-card"

async function getCustomerOrders(userId: string) {
  try {
    // Find the customer by Clerk userId
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

    // Get checkout sessions for additional order details
    const sessions = await stripe.checkout.sessions.list({
      customer: customer.id,
      limit: 100,
      expand: ["data.line_items"],
    })

    // Combine the data
    const orders = sessions.data.map((session) => ({
      id: session.id,
      orderNumber: session.metadata?.orderNumber,
      amount: session.amount_total,
      currency: session.currency,
      status: session.payment_status,
      items: session.line_items?.data || [],
      created: session.created,
      customerDetails: {
        name: session.customer_details?.name,
        email: session.customer_details?.email,
      },
    }))

    return orders.sort((a, b) => b.created - a.created) // Sort by most recent first
  } catch (error) {
    console.error("Error fetching customer orders:", error)
    return []
  }
}

export default async function OrdersPage() {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const orders = await getCustomerOrders(userId)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

