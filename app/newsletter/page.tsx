"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  ArrowRight,
  MapPin,
  Globe,
  ExternalLink,
  Twitter,
  Instagram,
  Music,
  CheckCircle,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
// import { SupportModal } from "@/components/support-modal" // Import the new modal component

// Featured Newsletter data
const featuredNewsletter = {
  id: 1,
  slug: "el-telefono-de-vaudagna-es-una-bomba",
  title: "El teléfono de Vaudagna es una bomba",
  excerpt:
    "El ex jefe regional de AFIP en Rosario protagoniza la segunda entrega de esta novela de narcos, complicidad política y corrupción judicial.",
  date: "2025-07-12",
  imageUrl: "/images/vaudagna-bomba.webp",
}

// Other newsletters data - simplified without images
const otherNewsletters = [
  {
    id: 2,
    slug: "el-telefono-de-vaudagna-es-una-bomba", // Redirect to existing page
    title: "Si Bailaque habla, esto se va a la mierda",
    excerpt:
      "El presidente Milei le aceptó la renuncia al juez federal acusado de complicidad con los narcos de Rosario, pero fuentes judiciales dicen que esto recién empieza.",
    date: "2025-07-11",
    imageUrl: "/images/vaudagna-bomba.webp", // Updated to vaudagna-bomba.webp
  },
  {
    id: 3,
    slug: "el-telefono-de-vaudagna-es-una-bomba", // Redirect to existing page
    title: 'Los "intelectuales" de Milei y la brecha de la felicidad',
    excerpt:
      "Axel Kaiser, Secretario Académico de la Fundación Faro, trató a los progresistas de parásitos y enfermos mentales y dijo que los conservadores son más felices.",
    date: "2025-07-10",
    imageUrl: "/images/vaudagna-bomba.webp", // Updated to vaudagna-bomba.webp
  },
  {
    id: 4,
    slug: "el-telefono-de-vaudagna-es-una-bomba", // Redirect to existing page
    title: "¿Peligra el decomiso contra Cristina Fernández de Kirchner?",
    excerpt:
      "En el newsletter de hoy te canto La Justa sobre cómo se debe gestionar el recupero de activos en una causa compleja y por qué se hizo mal en Vialidad.",
    date: "2025-07-09",
    imageUrl: "/images/vaudagna-bomba.webp", // Updated to vaudagna-bomba.webp
  },
  {
    id: 5,
    slug: "el-telefono-de-vaudagna-es-una-bomba", // Redirect to existing page
    title: "Cristina presa",
    excerpt: "Todo sobre la decisión más grietera de la Corte Suprema.",
    date: "2025-07-08",
    imageUrl: "/images/vaudagna-bomba.webp", // Updated to vaudagna-bomba.webp
  },
]

// Support options data (copied from /por-que/page.tsx)
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

export default function NewsletterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  // const [showSupportModal, setShowSupportModal] = useState(false) // State for the modal
  const [email, setEmail] = useState("") // State for email input
  const [isSubmitted, setIsSubmitted] = useState(false) // State for form submission success
  const [isLoading, setIsLoading] = useState(false) // State for loading during submission
  const [showStickyFooter, setShowStickyFooter] = useState(true)
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Effect to show the modal on page load
  // useEffect(() => {
  //   setShowSupportModal(true)
  // }, [])

  // Add this useEffect hook to scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const clearFilters = () => {
    setSearchQuery("")
  }

  const filteredOtherNewsletters = otherNewsletters.filter((newsletter) => {
    if (!searchQuery) return true

    const searchLower = searchQuery.toLowerCase()
    return (
      newsletter.title.toLowerCase().includes(searchLower) || newsletter.excerpt.toLowerCase().includes(searchLower)
    )
  })

  const hasActiveFilters = searchQuery.length > 0

  const handleHeaderButtonClick = () => {
    const targetElement = document.getElementById("sumate-a-la-comunidad")
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

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
      {/* Support Modal */}
      {/* <SupportModal open={showSupportModal} onOpenChange={setShowSupportModal} targetId="sumate-a-la-comunidad" /> */}
      {/* Minimalist Header */}
      <header className="bg-white border-b border-black">
        <div className="px-4 py-6 flex justify-between items-center">
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
              <Link href="/newsletter" className="text-black hover:text-gray-700 font-medium uppercase font-bold">
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
              <Button
                className="bg-black text-white hover:bg-gray-800 rounded-none px-4 py-2 text-sm"
                onClick={handleHeaderButtonClick}
              >
                SUMATE
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section - Title */}
      <section className="block-massive bg-white">
        <div className="px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-massive mb-12 text-center">LA JUSTA</h1>
          </div>
        </div>
      </section>
      <Separator className="border-t border-black" />
      {/* Main Content - Introductory Text */}
      <section className="block-large bg-white">
        <div className="px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-regular leading-relaxed">
              <p>
                La Justa es la plataforma de contenidos digitales de Natalia Volosin. Datos, investigación y análisis de
                lo que los medios tradicionales no te quieren contar, con la independencia, la claridad y la
                irreverencia de siempre.
              </p>
              <p className="text-medium leading-relaxed font-medium">
                No recibimos ni vamos a recibir pauta de ningún gobierno ni de empresas vinculadas al juego, servicios
                públicos o sindicatos. Esto nos diferencia de TODOS los medios y periodistas.
              </p>
              <p className="text-regular leading-relaxed">
                La Justa te va a incomodar, porque no somos neutrales. Pero nunca te va a manipular, porque sí somos
                independientes. Y porque no exageramos cuando decimos que la invitación a pensar es urgente.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Separator className="border-t border-black" />
      {/* Featured Newsletter */}
      <section className="py-12 bg-white">
        <div className="px-4">
          <Link href={`/newsletter/${featuredNewsletter.slug}`}>
            <article className="grid md:grid-cols-2 gap-12 items-center border-2 border-black hover:bg-black hover:text-white transition-colors group cursor-pointer p-8 md:p-0">
              {/* Text block on the left */}
              <div className="md:p-8 flex flex-col justify-center">
                <div className="mb-2">
                  <span className="text-small uppercase bg-black text-white group-hover:bg-white group-hover:text-black px-2 py-1">
                    Destacado
                  </span>
                </div>
                <h2 className="text-large mb-4 leading-tight">{featuredNewsletter.title}</h2>
                <p className="text-regular mb-6 line-clamp-4">{featuredNewsletter.excerpt}</p>
                <span className="text-small text-gray-600 group-hover:text-gray-300">
                  {new Date(featuredNewsletter.date).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
              {/* Image on the right */}
              <div className="relative w-full h-auto md:order-last">
                <Image
                  src={featuredNewsletter.imageUrl || "/placeholder.svg"} // Dynamically use imageUrl
                  alt={featuredNewsletter.title}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </article>
          </Link>
        </div>
      </section>
      {/* Search Section - Between featured and recent newsletters */}
      <section className="py-8 bg-black text-white">
        <div className="px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="¿Qué newsletter estás buscando?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-12 py-3 border-white bg-black text-white placeholder:text-gray-400 rounded-none w-full text-regular focus:border-gray-300"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearFilters}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="text-center md:text-right">
                <p className="text-small text-gray-300">
                  {searchQuery ? (
                    <>
                      {filteredOtherNewsletters.length} resultado
                      {filteredOtherNewsletters.length !== 1 ? "s" : ""} encontrado
                      {filteredOtherNewsletters.length !== 1 ? "s" : ""}
                    </>
                  ) : (
                    `${otherNewsletters.length} newsletters disponibles`
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter Archive */}
      <section className="py-12 bg-white">
        <div className="px-4">
          {filteredOtherNewsletters.length > 0 ? (
            <div>
              <h3 className="text-xlarge mb-8">{searchQuery ? "Resultados de búsqueda" : "Newsletter recientes"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredOtherNewsletters.map((newsletter) => (
                  <Link key={newsletter.id} href={`/newsletter/${newsletter.slug}`}>
                    <article className="group cursor-pointer">
                      {/* Image */}
                      <div className="relative w-full h-40 overflow-hidden mb-4 border border-black">
                        <Image
                          src={newsletter.imageUrl || "/placeholder.svg"} // Dynamically use imageUrl
                          alt={newsletter.title}
                          width={300}
                          height={160}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h4 className="text-regular font-medium leading-tight line-clamp-2 group-hover:underline">
                          {newsletter.title}
                        </h4>

                        {/* Date */}
                        <span className="text-small text-gray-600 block">
                          {new Date(newsletter.date).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </span>

                        <p className="text-small text-gray-700 leading-relaxed">{newsletter.excerpt}</p>

                        <div className="flex items-center text-black font-medium text-small group-hover:text-gray-700 transition-colors">
                          Leer más
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          ) : searchQuery ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-large mb-4">No se encontraron resultados</h3>
                <p className="text-regular text-gray-600 mb-6">
                  No encontramos newsletters que coincidan con "
                  <span className="font-medium text-black">{searchQuery}</span>
                  ".
                </p>
                <Button onClick={clearFilters} className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3">
                  Ver todos los newsletters
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xlarge mb-8">Newsletter recientes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherNewsletters.map((newsletter) => (
                  <Link key={newsletter.id} href={`/newsletter/${newsletter.slug}`}>
                    <article className="group cursor-pointer">
                      {/* Image */}
                      <div className="relative w-full h-40 overflow-hidden mb-4 border border-black">
                        <Image
                          src={newsletter.imageUrl || "/placeholder.svg"} // Dynamically use imageUrl
                          alt={newsletter.title}
                          width={300}
                          height={160}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h4 className="text-regular font-medium leading-tight line-clamp-2 group-hover:underline">
                          {newsletter.title}
                        </h4>

                        {/* Date */}
                        <span className="text-small text-gray-600 block">
                          {new Date(newsletter.date).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </span>

                        <p className="text-small text-gray-700 leading-relaxed">{newsletter.excerpt}</p>

                        <div className="flex items-center text-black font-medium text-small group-hover:text-gray-700 transition-colors">
                          Leer más
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
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
      {/* Support Options - WHITE (Copied from /por-que/page.tsx) */}
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
      </section>
      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="px-4">
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
            <p className="text-small">2025 Natalia Volosin. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      {/* Sticky Footer Banner */}
      {showStickyFooter && (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-white shadow-lg z-50 transition-transform duration-300">
          <div className="px-4 py-6">
            <div className="flex items-center justify-between gap-6">
              {/* Left side - Title and description */}
              <div className="flex-1 min-w-0">
                <h3 className="text-medium mb-1 text-white">Sumate a la comunidad</h3>
                <p className="text-small text-gray-300 leading-tight">
                  Tu contribución hace posible seguir investigando sin compromisos.
                </p>
              </div>

              {/* Center - Support options grid */}
              <div className="flex-shrink-0">
                {/* Payment buttons grid - 3 on top, 3 on bottom */}
                <div className="space-y-2">
                  {/* Top row - 3 buttons */}
                  <div className="flex gap-2">
                    <Link
                      href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849763dae001976bb14ba2031d"
                      target="_blank"
                    >
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-black rounded-lg px-4 py-2 text-sm bg-transparent w-[90px] h-12"
                      >
                        $5.000
                      </Button>
                    </Link>
                    <Link
                      href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849764e81a01976bb1a6e402c6"
                      target="_blank"
                    >
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-black rounded-lg px-4 py-2 text-sm bg-transparent w-[90px] h-12"
                      >
                        $8.000
                      </Button>
                    </Link>
                    <Link
                      href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849763dae001976ec4495d0412"
                      target="_blank"
                    >
                      <Button className="bg-white text-black hover:bg-gray-200 rounded-lg px-4 py-2 text-sm w-[90px] h-12 font-medium">
                        $12.000
                      </Button>
                    </Link>
                  </div>

                  {/* Bottom row - 3 buttons */}
                  <div className="flex gap-2">
                    <Link
                      href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849764e81a01976bb4934202c7"
                      target="_blank"
                    >
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-black rounded-lg px-4 py-2 text-sm bg-transparent w-[90px] h-12"
                      >
                        Anual
                      </Button>
                    </Link>
                    <Link
                      href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c938084976a0ea101976bb1fdc400be"
                      target="_blank"
                    >
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-black rounded-lg px-4 py-2 text-sm bg-transparent w-[90px] h-12"
                      >
                        Otro monto
                      </Button>
                    </Link>
                    <Link href="https://www.paypal.com/" target="_blank">
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-black rounded-lg px-4 py-2 text-sm bg-transparent w-[90px] h-12"
                      >
                        PayPal
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right side - Close button */}
              <div className="flex items-center">
                <button
                  onClick={() => setShowStickyFooter(false)}
                  className="p-2 text-white hover:text-gray-300 transition-colors"
                  aria-label="Cerrar banner"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
