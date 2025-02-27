// app/actions/analyzeContent.ts
"use server"

/* import { getVideoIdFromUrl } from "@/lib/youtube/getVideoIdFromUrl" */
import { redirect } from "next/navigation"
import { put } from "@vercel/blob"
import { randomUUID } from "crypto"

interface FormState {
  errors?: {
    url?: string[]
    files?: string[]
  }
}

export async function analyzeContent(prevState: FormState, formData: FormData): Promise<FormState> {
  const url = formData.get("url")?.toString()
  const files = formData.getAll("files") as File[]

  // Validate input
  if (!url && files.length === 0) {
    return {
      errors: {
        url: ["Please provide either a YouTube URL or upload files"],
        files: ["Please provide either a YouTube URL or upload files"]
      }
    }
  }

  try {
    // Handle YouTube URL
    if (url) {
      const videoId = "abc123" /* getVideoIdFromUrl(url) */
      if (!videoId) {
        return {
          errors: {
            url: ["Invalid YouTube URL"]
          }
        }
      }
      return redirect(`/video/${videoId}/analysis`)
    }

    // Handle file uploads
    if (files.length > 0) {
      const uploadPromises = files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer())
        const { url: blobUrl } = await put(`uploads/${randomUUID()}-${file.name}`, buffer, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
          contentType: file.type,
          addRandomSuffix: false
        })
        return blobUrl
      })
    
      const uploadedUrls = await Promise.all(uploadPromises)
      return redirect(`/analysis?files=${encodeURIComponent(JSON.stringify(uploadedUrls))}`)
    }

    throw new Error("No valid input provided")
  } catch (error) {
    console.error("Analysis failed:", error)
    return {
      errors: {
        url: ["Failed to process request"]
      }
    }
  }
}