import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { SchematicProviderWrapper } from "@/components/providers/schematic-provider"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black/[0.96] antialiased">
        <ClerkProvider
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: "#9333ea",
            },
            elements: {
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
              card: "bg-white/10 backdrop-blur-xl border border-white/20",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "border border-white/20 hover:border-purple-500",
              socialButtonsBlockButtonText: "text-white",
              formFieldLabel: "text-gray-300",
              formFieldInput: "bg-white/5 border-white/10 text-white",
              footerActionLink: "text-purple-400 hover:text-purple-300",
              formFieldInputShowPasswordButton: "text-gray-400",
            },
          }}
        >
          <SchematicProviderWrapper>{children}</SchematicProviderWrapper>
        </ClerkProvider>
      </body>
    </html>
  )
}

