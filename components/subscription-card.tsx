"use client"

import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, XCircle } from "lucide-react"

interface SubscriptionCardProps {
  subscription: {
    id: string
    status: string
    current_period_end: number
    items: {
      data: Array<{
        price: {
          product: {
            name: string
            description?: string
          }
          unit_amount: number
          currency: string
        }
      }>
    }
  }
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const product = subscription.items.data[0]?.price.product
  const price = subscription.items.data[0]?.price

  return (
    <div className="rounded-lg border border-white/20 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{product.name}</h3>
            <p className="text-sm text-gray-400">{product.description}</p>
          </div>
          <Badge variant={subscription.status === "active" ? "success" : "destructive"} className="capitalize">
            {subscription.status === "active" ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : (
              <XCircle className="mr-1 h-3 w-3" />
            )}
            {subscription.status}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount</span>
            <span className="text-white font-medium">${(price?.unit_amount || 0) / 100} / month</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Next billing date</span>
            <div className="flex items-center text-white">
              <Clock className="mr-1 h-3 w-3" />
              {formatDate(subscription.current_period_end * 1000)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

