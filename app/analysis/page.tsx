// app/analysis/page.tsx
'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FileText } from 'lucide-react'

export default function AnalysisPage() {
  const searchParams = useSearchParams()
  const filesParam = searchParams.get('files')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const analyzeFiles = async () => {
      if (filesParam) {
        try {
          const files = JSON.parse(decodeURIComponent(filesParam))
          const analysisPromises = files.map(async (fileUrl: string) => {
            const response = await fetch('/api/analyze', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ fileUrl }),
            })
            return response.json()
          })
          
          const analysisResults = await Promise.all(analysisPromises)
          setResults(analysisResults)
        } catch (error) {
          console.error('Error analyzing files:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    analyzeFiles()
  }, [filesParam])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Document Analysis Results</h1>
        {loading ? (
          <div className="text-center">Analyzing documents...</div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            {results.map((result, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 mr-2 text-blue-500" />
                  <h2 className="text-xl font-semibold">
                    {result.fileName || `Document ${index + 1}`}
                  </h2>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">{result.summary}</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(result.analysis, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}