"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSchematicEvents } from "@schematichq/schematic-react"
import { SchematicEmbed } from "@schematichq/schematic-components"
import { useUser, useOrganization } from "@clerk/nextjs"

export default function PricingCards() {
  const { user } = useUser()
  const { organization } = useOrganization()
  const { identify } = useSchematicEvents()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const componentId = "cmpn_QD4hhLXnCBD"

  useEffect(() => {
    const setupSchematic = async () => {
      try {
        if (!user) {
          setError("User not found")
          setIsLoading(false)
          return
        }

        // Identify both user and organization with Schematic
        identify({
          keys: { id: user.id },
          name: user.fullName || undefined,
          traits: {
            email: user.primaryEmailAddress?.emailAddress || undefined,
          },
          company: {
            keys: { id: "comp_DXYRxmNT9Z6" },
            name: "AI Champs",
            traits: {
              createdAt: organization?.createdAt?.toISOString(),
              membersCount: organization?.membersCount,
            }
          }
        })

        // Fetch access token for the organization
        const response = await fetch('/api/schematic-token')
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch pricing data')
        }

        const data = await response.json()
        
        if (!data.token) {
          throw new Error('Invalid token response from server')
        }

        setAccessToken(data.token)
        setError(null)
      } catch (error) {
        console.error('Failed to initialize pricing:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    setupSchematic()
  }, [user, identify, organization])

  if (!componentId) {
    return (
      <div className="mt-16 text-center text-red-500">
        Pricing component configuration error
      </div>
    )
  }

  return (
    <div className="mt-16 relative">
      {/* Error display */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/20 rounded-lg text-red-300">
          Error loading pricing: {error}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="text-center text-gray-400">
          Loading pricing options...
        </div>
      )}

      {/* Decorative background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-lg bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-[120px] rounded-full" />
      </div>

      {/* Content display */}
      {accessToken && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl backdrop-blur-xl border border-white/10 overflow-hidden"
        >
          <SchematicEmbed 
            accessToken={accessToken} 
            id={componentId}
          />
        </motion.div>
      )}
    </div>
  )
}