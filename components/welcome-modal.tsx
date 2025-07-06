"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import Link from "next/link"

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true) // Set to true to always open

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] p-8 bg-brand-white rounded-3xl commercial-shadow border-2 border-brand-purple/30">
        <DialogHeader className="text-center">
          <div className="mb-4">
            <Badge className="bg-brand-purple text-brand-white px-4 py-2 font-arimo font-bold text-sm mb-4">
              Bienvenid@ a La Justa
            </Badge>
          </div>
          <DialogTitle className="text-3xl md:text-4xl font-garamond font-medium text-brand-black mb-4">
            La plataforma de contenidos digitales de{" "}
            <span className="font-script script-enhanced text-brand-purple">Natalia Volosin</span>
          </DialogTitle>
          <DialogDescription className="text-lg font-arimo font-medium text-brand-black mb-6 tracking-wide">
            DATOS • INVESTIGACIÓN • ANÁLISIS INDEPENDIENTE
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-base font-arimo leading-relaxed text-brand-black mb-6">
          <p className="font-arimo">
            <strong>La Justa</strong> te trae lo que los medios tradicionales no te quieren contar, con la
            independencia, la claridad y la irreverencia de siempre.
          </p>
          <p className="font-arimo">
            <span className="bg-brand-green/30 px-2 py-1 rounded">
              No recibimos ni vamos a recibir pauta de ningún gobierno ni de empresas vinculadas al juego, servicios
              públicos o sindicatos.
            </span>{" "}
            Esto nos diferencia de TODOS los medios y periodistas.
          </p>
          <p className="font-arimo">
            <strong>La Justa te va a incomodar, porque no somos neutrales.</strong> Pero nunca te va a manipular, porque
            sí somos independientes.
          </p>
          <p className="text-brand-purple font-medium font-arimo">
            Y porque no exageramos cuando decimos que{" "}
            <span className="font-script script-enhanced text-xl">la invitación a pensar es urgente.</span>
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/suscripcion" onClick={handleClose}>
            <Button className="bg-gradient-to-r from-brand-purple to-brand-teal text-brand-white font-arimo font-bold px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-transform duration-300">
              <Users className="w-5 h-5 mr-2" />
              Quiero bancar a La Justa
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
