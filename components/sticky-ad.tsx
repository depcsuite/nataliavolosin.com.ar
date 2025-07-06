"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StickyAd() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show sticky ad after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-white border-t-2 border-brand-gray/20 commercial-shadow">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <div className="bg-gradient-to-r from-brand-yellow/20 to-brand-orange/20 border-2 border-dashed border-brand-yellow/40 rounded-xl p-4 mx-auto max-w-2xl">
              <p className="text-brand-yellow font-arimo font-bold text-lg mb-1">Publicidad</p>
              <p className="text-brand-gray text-sm font-arimo">728x90 - Banner Inferior Sticky</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="ml-4 flex-shrink-0" onClick={() => setIsVisible(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
