"use client"

import type React from "react"
import Form from "next/form";
import { motion } from "framer-motion"
import { FileText, Sparkles, Link as LinkIcon } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import { RoboAnimation } from "@/components/robo-animation"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { analyzeContent } from "@/actions/analyseYoutubeVideo";

// Add initial state type
interface FormState {
  message?: string
  success?: boolean
  errors?: {
    files?: string[]
    url?: string[]
  }
}

function AnalyseButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      size="lg"
      variant="outline"
      className="rounded-xl text-white border-blue-500 hover:bg-blue-500/50"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <>
          <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Analyze
        </>
      )}
    </Button>
  )
}

export default function Hero() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [url, setUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<FormState>({})
  const formAction = async (formData: FormData) => {
    const newState = await analyzeContent(state, formData)
    setState(newState)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prevFiles) => [...prevFiles, ...files])
  }

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
            Upload research papers or enter a Youtube URL, and let our AI transform them into engaging presentations, podcasts, and visual content.
          </motion.p>

          <Form action={formAction}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4"
            >
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx"
                multiple
                name="files"
              />

              {/* URL Input */}
              <div className="w-full max-w-md relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter Youtube URL"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  name="url"
                />
                <LinkIcon className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              {state.errors?.url && (
                <p className="text-red-400 text-sm -mt-2">{state.errors.url.join(", ")}</p>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <Button 
                  size="lg" 
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8"
                  onClick={handleUploadClick}
                  type="button"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Upload File
                </Button>
                
                <AnalyseButton />
              </div>

              {state.errors?.files && (
                <p className="text-red-400 text-sm">{state.errors.files.join(", ")}</p>
              )}
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
          </Form>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  )
}