import type React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const tagColors = [
  { bg: "bg-tag-purple", text: "text-white", border: "border-tag-purple" },
  { bg: "bg-tag-teal", text: "text-white", border: "border-tag-teal" },
  { bg: "bg-tag-lime", text: "text-brand-black", border: "border-tag-lime" },
  { bg: "bg-tag-violet", text: "text-white", border: "border-tag-violet" },
  { bg: "bg-tag-lavender", text: "text-brand-black", border: "border-tag-lavender" },
]

interface TagBadgeProps {
  children: React.ReactNode
  index?: number
  variant?: "default" | "outline"
  className?: string
}

export function TagBadge({ children, index = 0, variant = "default", className }: TagBadgeProps) {
  const colorIndex = index % tagColors.length
  const colors = tagColors[colorIndex]

  if (variant === "outline") {
    return (
      <Badge
        variant="outline"
        className={cn(
          "border-2 bg-transparent font-arimo font-medium text-xs px-3 py-1 rounded-full",
          colors.border,
          colors.text === "text-white" ? "text-brand-black" : colors.text,
          className,
        )}
      >
        {children}
      </Badge>
    )
  }

  return (
    <Badge
      className={cn(
        "font-arimo font-medium text-xs px-3 py-1 rounded-full border-0",
        colors.bg,
        colors.text,
        className,
      )}
    >
      {children}
    </Badge>
  )
}
