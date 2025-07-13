"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SupportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  targetId: string // New prop to specify the ID to scroll to
}

export function SupportModal({ open, onOpenChange, targetId }: SupportModalProps) {
  const handleButtonClick = () => {
    onOpenChange(false) // Close the modal first
    // Scroll to the target section
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      // Use scrollIntoView with a smooth behavior and block: 'start' to ensure it's at the top
      // The scroll-mt-24 class on the section itself will handle the offset for the fixed header.
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-none border-black bg-white text-black">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xlarge mb-4">Sumate a la comunidad</DialogTitle>
          <DialogDescription className="text-regular text-gray-700">
            Tu contribución hace posible que podamos seguir investigando y contando la verdad sin compromisos.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center mt-6">
          <Button
            onClick={handleButtonClick} // Use onClick instead of Link href
            className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-4 text-lg"
          >
            SUMATE a La Justa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
