"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Twitter, Instagram, Music } from "lucide-react"
import { MapPin, Globe, ExternalLink } from "lucide-react" // Import missing icons

const supportOptions = [
  {
    amount: "$5.000",
    period: "mes",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849763dae001976bb14ba2031d",
  },
  {
    amount: "$8.000",
    period: "mes",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849764e81a01976bb1a6e402c6",
  },
  {
    amount: "$12.000",
    period: "mes",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849763dae001976ec4495d0412",
  },
  {
    amount: "Otro monto",
    period: "única vez",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c938084976a0ea101976bb1fdc400be",
  }, // Added "Otro monto" option
]

export default function PorQuePage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Add this useEffect hook to scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      emailInputRef.current?.focus()
      return
    }

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
      <header className="bg-white border-b border-black">
        <div className="px-4 py-6 md:px-20 2xl:px-40 flex justify-between items-center">
          <Link href="/" className="text-black hover:text-gray-700">
            <h1 className="text-2xl font-bold tracking-tight">NATALIA VOLOSIN</h1>
          </Link>

          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-12">
              <Link href="/" className="text-black hover:text-gray-700 font-medium uppercase">
                Inicio
              </Link>
              <Link href="/sobre-mi" className="text-black hover:text-gray-700 font-medium uppercase">
                Quién
              </Link>
              <Link href="/newsletter" className="text-black hover:text-gray-700 font-medium uppercase">
                Newsletter
              </Link>
              <Link href="/por-que" className="text-black hover:text-gray-700 font-medium uppercase font-bold">
                Por qué
              </Link>
            </nav>

            {/* Social Media Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="https://x.com/nataliavolosin" target="_blank" className="text-black hover:text-gray-700">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/nataliavolosin"
                target="_blank"
                className="text-black hover:text-gray-700"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@nataliaavolosin"
                target="_blank"
                className="text-black hover:text-gray-700"
              >
                <Music className="w-5 h-5" />
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/suscripcion">
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white rounded-none px-4 py-2 text-sm bg-transparent"
                >
                  Suscribirse
                </Button>
              </Link>
              <Link href="#sumate-a-la-comunidad">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-4 py-2 text-sm">SUMATE</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="block-massive bg-white">
        <div className="px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-massive mb-12 text-center">Por qué</h1>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Main Content */}
      <section className="block-large bg-white">
        <div className="px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-regular leading-relaxed">
              <p>
                Porque los medios tradicionales no te cuentan toda la verdad. Porque la información que recibís está
                filtrada por intereses económicos y políticos que condicionan lo que podés saber.
              </p>

              <p className="text-medium leading-relaxed font-medium">
                La Justa nació para romper con esa lógica. Para ofrecerte análisis independiente, datos verificados y
                las historias que otros no se animan a contar.
              </p>

              <p>
                No dependemos de la pauta oficial ni de grandes anunciantes. No tenemos compromisos con partidos
                políticos ni grupos económicos. Nuestra única lealtad es con la verdad y con vos, que elegís apoyar este
                proyecto.
              </p>

              <p>
                Cada investigación, cada análisis, cada dato que compartimos está respaldado por años de experiencia en
                el sistema judicial, académico y periodístico. Pero sobre todo, está respaldado por la convicción de que
                tenés derecho a saber.
              </p>

              <p className="text-medium leading-relaxed font-medium">
                La Justa es más que un newsletter. Es una comunidad de personas que creen que la información es poder y
                que ese poder debe estar en tus manos.
              </p>

              <p>
                Por eso existimos. Por eso seguimos. Y por eso necesitamos tu apoyo para continuar creciendo y llegando
                a más personas que, como vos, buscan la verdad sin filtros.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Newsletter Signup - BLACK */}
      <section className="block-medium bg-black text-white">
        <div className="px-4">
          <div className="max-w-2xl mx-auto text-center">
            {!isSubmitted ? (
              <>
                <h2 className="text-xlarge mb-4">Suscribite a La Justa</h2>
                <p className="text-regular mb-8 text-gray-300">
                  Newsletter semanal sobre política, (in)justicia y actualidad. Sale los viernes.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-6">
                  <div className="relative max-w-md mx-auto">
                    <Input
                      type="email"
                      placeholder="Tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="py-4 border-white bg-black text-white placeholder:text-gray-400 rounded-none w-full text-lg focus:border-gray-300"
                      ref={emailInputRef}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !email}
                    className="bg-white text-black hover:bg-black hover:text-white border border-black rounded-none px-8 py-4 text-lg"
                  >
                    {isLoading ? "Suscribiendo..." : "Suscribirme gratis"}
                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </form>

                <p className="text-small text-gray-400 mt-6">Podés cancelar tu suscripción en cualquier momento.</p>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h2 className="text-xlarge mb-6">¡Gracias por suscribirte!</h2>
                <p className="text-medium mb-8 text-gray-300">
                  Te has suscrito exitosamente a La Justa. Recibirás nuestro newsletter semanal todos los viernes.
                </p>
                <p className="text-regular mb-8 text-gray-400">
                  Revisa tu correo electrónico para confirmar tu suscripción.
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail("")
                  }}
                  className="bg-white text-black hover:bg-gray-200 rounded-none px-8 py-4 text-lg"
                >
                  Suscribir otro correo
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Contact Section */}
      <section className="block-large bg-white">
        <div className="px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xlarge mb-12 text-center">Contacto</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Charlas, Eventos y Consultoría */}
              <Card className="border-2 border-black rounded-none hover:bg-black hover:text-white transition-colors group h-48 flex flex-col justify-center">
                <CardHeader className="p-6 text-center">
                  <CardTitle className="text-medium mb-4">
                    Charlas, Eventos
                    <br />y Consultoría
                  </CardTitle>
                  <Link
                    href="mailto:lajusta@nataliavolosin.com"
                    className="text-regular underline group-hover:text-white"
                  >
                    lajusta@nataliavolosin.com
                  </Link>
                </CardHeader>
              </Card>

              {/* Consultas Comerciales */}
              <Card className="border-2 border-black rounded-none hover:bg-black hover:text-white transition-colors group h-48 flex flex-col justify-center">
                <CardHeader className="p-6 text-center">
                  <CardTitle className="text-medium mb-4">
                    Consultas
                    <br />
                    Comerciales
                  </CardTitle>
                  <Link
                    href="mailto:comercial@nataliavolosin.com"
                    className="text-regular underline group-hover:text-white"
                  >
                    comercial@nataliavolosin.com
                  </Link>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Support Options - WHITE */}
      <section id="sumate-a-la-comunidad" className="block-medium bg-white pt-24 scroll-mt-24">
        <div className="px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-xlarge mb-6">Sumate a la comunidad</h2>
              <p className="text-regular max-w-2xl mx-auto">
                Tu contribución hace posible que podamos seguir investigando y contando la verdad sin compromisos.
              </p>
            </div>

            {/* Argentina Support */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <h3 className="text-large">Desde Argentina</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {supportOptions.map((option, index) => (
                  <Link key={index} href={option.url} target="_blank">
                    <div className="border border-black p-6 hover:bg-black hover:text-white transition-colors group">
                      <div className="text-center">
                        <div className="text-medium mb-2">{option.amount}</div>
                        <div className="text-regular mb-4">por {option.period}</div>
                        <div className="flex items-center justify-center text-regular group-hover:text-white">
                          Apoyar
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Separator className="border-t border-black my-16" />

            {/* International Support */}
            <div>
              <div className="flex items-center justify-center mb-6">
                <Globe className="w-5 h-5 mr-2" />
                <h3 className="text-large">Desde el exterior</h3>
              </div>

              <div className="text-center">
                <p className="text-regular mb-8 max-w-2xl mx-auto">
                  Para apoyar La Justa desde cualquier parte del mundo con el monto que consideres justo.
                </p>

                <Link href="https://www.paypal.com/" target="_blank">
                  <div className="border border-black p-8 hover:bg-black hover:text-white transition-colors group max-w-md mx-auto">
                    <div className="text-center">
                      <div className="text-medium mb-2">PayPal</div>
                      <div className="text-regular mb-4">Monto personalizado</div>
                      <div className="flex items-center justify-center text-regular group-hover:text-white">
                        Apoyar internacionalmente
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="px-4 md:px-20 2xl:px-40">
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
                <Link href="https://x.com/nataliavolosin" target="_blank" className="text-white hover:text-gray-300">
                  Twitter
                </Link>
                <Link
                  href="https://www.instagram.com/nataliavolosin"
                  target="_blank"
                  className="text-white hover:text-gray-300"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.tiktok.com/@nataliaavolosin"
                  target="_blank"
                  className="text-white hover:text-gray-300"
                >
                  Music
                </Link>
              </div>
            </div>
          </div>
          <Separator className="border-t border-white my-12" />
          <div className="text-center">
            <p className="text-small">© {new Date().getFullYear()} Natalia Volosin. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
