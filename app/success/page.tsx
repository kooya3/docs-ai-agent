"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const orderNumber = searchParams.get("orderNumber")

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 bg-purple-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-6 text-center text-white">Thank You for Your Subscription!</h1>

        <div className="border-t border-b border-white/10 py-6 mb-6">
          <p className="text-lg text-gray-300 mb-4">Your subscription has been confirmed and is now active.</p>
          <div className="space-y-2">
            {orderNumber && (
              <p className="text-gray-300 flex items-center space-x-5">
                <span>Order Number:</span>
                <span className="font-mono text-sm text-purple-400">{orderNumber}</span>
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-400">A confirmation email has been sent to your registered email address.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/orders">View Subscription Details</Link>
            </Button>
            <Button asChild variant="outline" className="text-white border-purple-500 hover:bg-purple-500/20">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  )
}

