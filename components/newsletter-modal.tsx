"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail } from "lucide-react"

export function NewsletterModal() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your newsletter service
    console.log("Newsletter signup:", email)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail("")
    }, 3000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-brand-green hover:bg-brand-green/80 text-brand-black font-arimo font-bold">
          <Mail className="w-4 h-4 mr-2" />
          Suscribirse al Newsletter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-garamond">Suscríbete a La Justa</DialogTitle>
          <DialogDescription className="font-arimo">
            Recibe análisis semanales directamente en tu correo
          </DialogDescription>
        </DialogHeader>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-arimo font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-arimo"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-brand-purple hover:bg-brand-purple/80 text-brand-white font-arimo font-bold"
            >
              Suscribirme
            </Button>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-brand-black" />
            </div>
            <h3 className="font-arimo font-medium text-brand-black mb-2">¡Gracias por suscribirte!</h3>
            <p className="text-brand-gray font-arimo">Pronto recibirás nuestros análisis semanales</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
