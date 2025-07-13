"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail, CheckCircle } from "lucide-react"

export default function SuscripcionPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Add this useEffect hook to scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Minimalist Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-black hover:text-gray-700">
            <h1 className="text-2xl font-bold tracking-tight">NATALIA VOLOSIN</h1>
          </Link>
          <nav className="hidden md:flex space-x-12">
            <Link href="/" className="text-black hover:text-gray-700 font-medium uppercase">
              Inicio
            </Link>
            <Link href="/sobre-mi" className="text-black hover:text-gray-700 font-medium uppercase">
              Quién
            </Link>
            <Link href="/newsletter" className="text-black hover:text-gray-700 font-medium uppercase">
              La Justa
            </Link>
            <Link href="/por-que" className="text-black hover:text-gray-700 font-medium uppercase">
              Por qué
            </Link>
          </nav>
          <Link href="/#sumate-a-la-comunidad" scroll={false}>
            <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3">SUMATE a La Justa</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="block-massive bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {!isSubmitted ? (
              <>
                <h1 className="text-xlarge mb-8">Newsletter semanal de Natalia Volosin</h1>
                <p className="text-medium mb-12 text-gray-700">
                  Sobre política, (in)justicia y actualidad. Sale los viernes y es gratuito.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 py-4 border-black rounded-none w-full text-lg"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !email}
                    className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-4 text-lg w-full md:w-auto"
                  >
                    {isLoading ? "Suscribiendo..." : "Suscribirme"}
                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </form>

                <p className="text-small text-gray-600 mt-8">
                  Al suscribirte, aceptas recibir nuestro newsletter semanal. Podés cancelar tu suscripción en cualquier
                  momento.
                </p>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                <h1 className="text-xlarge mb-6">¡Gracias por suscribirte!</h1>
                <p className="text-medium mb-8 text-gray-700">
                  Te has suscrito exitosamente a La Justa. Recibirás nuestro newsletter semanal todos los viernes.
                </p>
                <p className="text-regular mb-8 text-gray-600">
                  Revisa tu correo electrónico para confirmar tu suscripción.
                </p>
                <Link href="/">
                  <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-4 text-lg">
                    Volver al inicio
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-medium mb-6">Natalia Volosin</h3>
              <p className="text-regular mb-4">
                Abogada, consultora, académica y comunicadora. Doctora en Derecho por Yale Law School.
              </p>
            </div>
            <div>
              <h3 className="text-medium mb-6">Contacto</h3>
              <p className="text-regular mb-2">lajusta@nataliavolosin.com</p>
              <p className="text-regular mb-2">comercial@nataliavolosin.com</p>
            </div>
            <div>
              <h3 className="text-medium mb-6">Redes sociales</h3>
              <div className="flex space-x-4">
                <Link href="https://x.com/nataliavolosin" target="_blank" className="text-black hover:text-gray-700">
                  Twitter
                </Link>
                <Link
                  href="https://www.instagram.com/nataliavolosin"
                  target="_blank"
                  className="text-black hover:text-gray-700"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.tiktok.com/@nataliaavolosin"
                  target="_blank"
                  className="text-black hover:text-gray-700"
                >
                  TikTok
                </Link>
              </div>
            </div>
          </div>
          <Separator className="border-t border-black my-12" />
          <div className="text-center">
            <p className="text-small">© 2025 Natalia Volosin. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
