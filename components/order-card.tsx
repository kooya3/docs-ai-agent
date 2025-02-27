"use client"

import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Package } from "lucide-react"

interface OrderCardProps {
  order: {
    id: string
    orderNumber: string
    amount: number
    currency: string
    status: string
    items: Array<{
      description: string
      amount_total: number
      quantity: number
    }>
    created: number
    customerDetails: {
      name: string
      email: string
    }
  }
}

export function OrderCard({ order }: OrderCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: order.currency,
    }).format(amount / 100)
  }

  return (
    <div className="rounded-lg border border-white/20 overflow-hidden hover:border-purple-500/50 transition-colors">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Order Number</p>
            <p className="font-mono text-white">{order.orderNumber}</p>
          </div>
          <Badge variant={order.status === "paid" ? "default" : "destructive"} className="capitalize">
            {order.status === "paid" ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
            {order.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="border-t border-white/10 pt-4">
            <p className="text-sm text-gray-400 mb-2">Items</p>
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <Package className="h-4 w-4 text-purple-400 mr-2" />
                  <span className="text-white">{item.description}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">
                    {item.quantity} × {formatCurrency(item.amount_total / item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Order Date</span>
              <span className="text-white">{formatDate(order.created * 1000)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400">Total Amount</span>
              <span className="text-xl font-bold text-white">{formatCurrency(order.amount)}</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 text-sm">
            <p className="text-gray-400 mb-1">Customer Details</p>
            <p className="text-white">{order.customerDetails.name}</p>
            <p className="text-gray-400">{order.customerDetails.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

