"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import { RoboAnimation } from "@/components/robo-animation"
import { useRef, useState } from "react" // Add these imports

export default function Hero() {
  // Add state for managing files
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prevFiles) => [...prevFiles, ...files])

    // Store files in localStorage (only metadata since Files can't be directly stored)
    const filesMetadata = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    }))

    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]")
    localStorage.setItem("uploadedFiles", JSON.stringify([...storedFiles, ...filesMetadata]))
  }

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={4} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Redefine Research With 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {" "}
                AI Magic 
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Upload your research papers and let our AI transform them into engaging presentations, podcasts, and visual
            content.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx"
              multiple
            />

            <Button size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8" onClick={handleUploadClick}>
              <FileText className="mr-2 h-5 w-5" />
              Upload Paper
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl text-white border-blue-500 hover:bg-gray-500/20"
              onClick={() => window.location.href = "/"}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              See Examples
            </Button>
          </motion.div>

          {/* Display uploaded files */}
          {uploadedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-left max-w-md mx-auto bg-white/10 rounded-lg p-4"
            >
              <h3 className="text-white font-medium mb-2">Uploaded Files:</h3>
              <ul className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="text-gray-300 flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-purple-400" />
                    {file.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  )
}

