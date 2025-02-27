import { NextResponse } from "next/server"
import stripe from "@/lib/stripe"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id parameter" }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer", "line_items"],
    })

    return NextResponse.json(session)
  } catch (error) {
    console.error("Error retrieving checkout session:", error)
    return NextResponse.json({ error: "Error retrieving session" }, { status: 500 })
  }
}

