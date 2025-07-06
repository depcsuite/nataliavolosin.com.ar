"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingAds() {
  const [showLeftAd, setShowLeftAd] = useState(false)
  const [showRightAd, setShowRightAd] = useState(false)

  useEffect(() => {
    // Show ads after 3 seconds
    const timer = setTimeout(() => {
      setShowLeftAd(true)
      setShowRightAd(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!showLeftAd && !showRightAd) return null

  return (
    <>
      {/* Left Floating Ad */}
      {showLeftAd && (
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
          <div className="bg-gradient-to-br from-brand-purple/10 to-brand-teal/10 border-2 border-dashed border-brand-purple/30 rounded-2xl p-4 w-32 h-48 flex flex-col items-center justify-center text-center commercial-shadow relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1 right-1 w-6 h-6 p-0"
              onClick={() => setShowLeftAd(false)}
            >
              <X className="w-3 h-3" />
            </Button>
            <p className="text-brand-purple text-sm font-arimo font-bold mb-2">Publicidad</p>
            <p className="text-brand-gray text-xs font-arimo">120x600</p>
          </div>
        </div>
      )}

      {/* Right Floating Ad */}
      {showRightAd && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
          <div className="bg-gradient-to-br from-brand-green/10 to-brand-teal/10 border-2 border-dashed border-brand-green/30 rounded-2xl p-4 w-32 h-48 flex flex-col items-center justify-center text-center commercial-shadow relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1 right-1 w-6 h-6 p-0"
              onClick={() => setShowRightAd(false)}
            >
              <X className="w-3 h-3" />
            </Button>
            <p className="text-brand-green text-sm font-arimo font-bold mb-2">Publicidad</p>
            <p className="text-brand-gray text-xs font-arimo">120x600</p>
          </div>
        </div>
      )}
    </>
  )
}
