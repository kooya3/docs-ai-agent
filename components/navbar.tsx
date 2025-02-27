"use client"

import { Button } from "@/components/ui/button"
import { ChefHat, Menu } from 'lucide-react'
import { motion } from "framer-motion"
import Link from "next/link"
import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import type React from "react"

export default function Navbar() {
  const { user } = useUser()

  return (
    <div className="container mx-auto">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
      >
        <Link href="/" className="flex items-center space-x-2">
          <ChefHat className="w-8 h-8 text-blue-500 animate-pulse" />
          <span className="font-medium text-xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Docs AI
          </span>
        </Link>

        {/* User area */}
        <ClerkLoaded>
          <div className="flex items-center space-x-4 gap-10">
            <SignedIn>
              <Link href="/manage-plan">
                <Button 
                  variant="outline" 
                  className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                >
                  Manage Plan
                </Button>
              </Link>
              <div className="flex items-center space-x-2 rounded-full border border-transparent">
                <UserButton afterSignOutUrl="/" />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold text-white">{user?.fullName}</p>
                </div>
              </div>
            </SignedIn>

            {!user && (
              <SignInButton mode="modal">
                <Button className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
        </ClerkLoaded>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </Button>
      </motion.nav>
    </div>
  )
}

