"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChefHat, Github, Twitter, Mail } from 'lucide-react'

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Manage Plan", href: "/manage-plan" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Examples", href: "/examples" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Support", href: "/support" },
    { name: "Status", href: "/status" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
}

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    name: "Email",
    href: "mailto:hello@example.com",
    icon: Mail,
  },
]

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <Link href="/" className="flex items-center space-x-2">
              <ChefHat className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Docs AI
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-gray-400">
              Transform your research papers into engaging presentations, podcasts, and visual content with AI-powered analysis.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-6 w-6" />
                  </Link>
                )
              })}
            </div>
          </motion.div>

          {/* Links sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0"
          >
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24"
        >
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Docs AI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
