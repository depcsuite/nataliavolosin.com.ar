"use client"

import { useEffect } from "react"

import { useRef } from "react"

import { useState } from "react"

import type React from "react"
import Image from "next/image"
import { getArticleBySlug } from "@/lib/article-data"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { ExternalLink, MapPin, Globe, Twitter, Instagram, Music, CheckCircle, ArrowRight } from "lucide-react"

// Featured Newsletter data (copied from app/newsletter/page.tsx)
const featuredNewsletterData = {
  id: 1,
  slug: "el-telefono-de-vaudagna-es-una-bomba",
  title: "El teléfono de Vaudagna es una bomba",
  excerpt:
    "El ex jefe regional de AFIP en Rosario protagoniza la segunda entrega de esta novela de narcos, complicidad política y corrupción judicial.",
  date: "2025-07-12",
  imageUrl: "/images/vaudagna-bomba.webp",
}

// Most read articles for sidebar
const mostReadArticles = [
  {
    id: 101,
    title: "Si Bailaque habla, esto se va a la mierda",
    slug: "el-telefono-de-vaudagna-es-una-bomba", // Redirect to existing page
    date: "2025-07-11",
  },
  {
    id: 102,
    title: 'Los "intelectuales" de Milei y la brecha de la felicidad',
    slug: "el-telefono-de-vaudagna-es-una-bomba", // Redirect to existing page
    date: "2025-07-10",
  },
  {
    id: 103,
    title: "¿Peligra el decomiso contra Cristina Fernández de Kirchner?",
    slug: "el-telefono-de-vaudagna-es-una-bomba", // Redirect to existing page
    date: "2025-07-09",
  },
]

// Support options data
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

export default async function ArticlePage() {
  const article = await getArticleBySlug("el-telefono-de-vaudagna-es-una-bomba")

  if (!article) {
    notFound()
  }

  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [copied, setCopied] = useState(false) // State for copy button feedback
  const [email, setEmail] = useState("") // State for email input
  const [isSubmitted, setIsSubmitted] = useState(false) // State for form submission success
  const [isLoading, setIsLoading] = useState(false) // State for loading during submission
  const emailInputRef = useRef<HTMLInputElement>(null) // Create a ref for the email input

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset "Copied!" message after 2 seconds
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      // If email is empty, focus on the input field
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
        <div className="px-4 py-6 md:px-20 2xl:px-60 flex justify-between items-center">
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
              <Link href="/por-que" className="text-black hover:text-gray-700 font-medium uppercase">
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
              <Link href="https://substack.com/@nataliavolosin" target="_blank">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-4 py-2 text-sm">SUMATE</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="px-4 md:px-20 2xl:px-60">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-28">
                <div className="mb-8">
                  <h3 className="text-medium mb-4">Lo más leído</h3>
                  <div className="space-y-6">
                    {mostReadArticles.map((article) => (
                      <div key={article.id} className="border-t border-black pt-4">
                        <Link href={`/newsletter/${article.slug}`} className="block hover:underline">
                          <h4 className="text-regular font-medium mb-2">{article.title}</h4>
                          <span className="text-small text-gray-600">
                            {new Date(article.date).toLocaleDateString("es-AR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <Link href="/suscripcion">
                    <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-none py-6">
                      Suscribirse al Newsletter
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="mb-6">
                <Link href="/newsletter" passHref>
                  <Button variant="ghost" className="mb-4">
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Volver a Newsletters
                  </Button>
                </Link>
                {article.imageUrl && (
                  <Image
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    width={1200}
                    height={675}
                    className="mb-4 h-auto w-full rounded-lg object-cover"
                    priority
                  />
                )}
                <h1 className="text-xlarge mb-2 font-garamond font-bold leading-tight">{article.title}</h1>
                <p className="text-muted-foreground text-sm">
                  Publicado el{" "}
                  {new Date(article.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                {article.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-regular">
                    {paragraph}
                  </p>
                ))}
              </div>
              <Separator className="my-8" />
              <div className="flex justify-center">
                <Link href="/newsletter" passHref>
                  <Button>Ver todos los Newsletters</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup - BLACK (redesigned to be more minimalist and compact) */}
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
                    <input
                      type="email"
                      placeholder="Tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="py-4 border-white bg-black text-white placeholder:text-gray-400 rounded-none w-full text-lg focus:border-gray-300"
                      ref={emailInputRef} // Attach the ref to the input
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

              <div className="grid md:grid-cols-2 gap-6 mb-8">
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
        <div className="px-4 md:px-20 2xl:px-60">
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
            <p className="text-small">© 2025 Natalia Volosin. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
