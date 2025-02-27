"use client"

import { motion } from "framer-motion"
import { FileText, Brain, Sparkles, MessageSquare, Bot, Zap, Video, MessageSquareCode } from "lucide-react"
import { Button } from "./ui/button"

const features = [
  {
    title: "Smart Document Analysis",
    description:
      "Our AI analyzes your research papers instantly, extracting key insights and identifying important patterns.",
    icon: Brain,
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1,
  },
  {
    title: "AI-Powered Summaries",
    description:
      "Get concise, intelligent summaries of complex research papers, making comprehension faster and easier.",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2,
  },
  {
    title: "Interactive Q&A",
    description: "Ask questions about your documents and get instant, accurate answers backed by the source material.",
    icon: MessageSquare,
    gradient: "from-orange-500 to-red-500",
    delay: 0.3,
  },
  {
    title: "Citation Generation",
    description: "Automatically generate properly formatted citations and bibliographies for your research papers.",
    icon: FileText,
    gradient: "from-green-500 to-emerald-500",
    delay: 0.4,
  },
  {
    title: "Research Assistant",
    description: "Your personal AI research assistant available 24/7 to help analyze and understand complex papers.",
    icon: Bot,
    gradient: "from-indigo-500 to-purple-500",
    delay: 0.5,
  },
  {
    title: "Quick Insights",
    description: "Extract key findings, methodologies, and conclusions from papers in seconds, not hours.",
    icon: Zap,
    gradient: "from-pink-500 to-rose-500",
    delay: 0.6,
  },
]

const steps = [
  {
    title: "1. Upload Your Content",
    description: "Upload your video content and let your agent get to work",
    icon: Video,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "2. AI Agent Analysis",
    description: "Your personal agent analyzes every aspect of your content",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "3. Receive Intelligence",
    description: "Get actionable insights and strategic recommendations",
    icon: MessageSquareCode,
    gradient: "from-indigo-500 to-purple-500",
  },
]

export default function Features() {
  return (
    <>
      <section className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-black/[0.96] bg-grid-white/[0.02] -z-10" />
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-full h-full max-w-lg bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Transform Your Research with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                AI Power
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Unlock the full potential of your research papers with our advanced AI features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  className="group relative"
                >
                  <div className="relative z-10 h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/50 hover:bg-white/10">
                    {/* Icon */}
                    <div className={`mb-6 inline-flex rounded-full bg-gradient-to-r ${feature.gradient} p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                  </div>

                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/50 to-pink-500/50 opacity-0 blur transition-opacity duration-500 group-hover:opacity-30" />
                </motion.div>
              )
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16 text-center"
          >
            <Button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg">
              <a href="/">
              Try It Now
              </a>
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Steps Section with seamless transition */}
      <section className="py-20 relative overflow-hidden">
        {/* Background elements for seamless transition */}
        <div className="absolute inset-0 bg-black/[0.96] bg-grid-white/[0.02] -z-10" />
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-full h-full max-w-lg bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Meet Your AI Agent in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              3 Simple Steps
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative z-10 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10">
                    <div className={`w-16 h-16 mb-6 rounded-full bg-gradient-to-r ${step.gradient} p-4 mx-auto`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white text-center">{step.title}</h3>
                    <p className="text-gray-400 text-center">{step.description}</p>
                  </div>

                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/50 to-pink-500/50 opacity-0 blur transition-opacity duration-500 group-hover:opacity-30" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

