"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react" // Import useRef
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  MessageCircle,
  Repeat2,
  Heart,
  ExternalLink,
  Instagram,
  MapPin,
  Globe,
  Twitter,
  Music,
  CheckCircle,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils" // Import cn utility
import Image from "next/image" // Import Image component

// Simplified data structure
const featuredArticle = {
  id: 1,
  slug: "el-telefono-de-vaudagna-es-una-bomba",
  title: "El teléfono de Vaudagna es una bomba",
  excerpt:
    "El ex jefe regional de AFIP en Rosario protagoniza la segunda entrega de esta novela de narcos, complicidad política y corrupción judicial",
  date: "2025-01-16",
}

const articles = [
  {
    id: 2,
    slug: "corrupcion-contrataciones-publicas-mecanismos-control",
    title: "La corrupción en las contrataciones públicas: Nuevos mecanismos de control",
    excerpt:
      "Propuestas concretas para fortalecer la transparencia en las compras del Estado basadas en experiencias internacionales exitosas.",
    date: "2025-01-15",
    category: "Derecho Público",
  },
  {
    id: 3,
    slug: "reformas-judiciales-lecciones-yale-sistema-argentino",
    title: "Reformas judiciales: Lecciones desde Yale para el sistema argentino",
    excerpt:
      "Reflexiones sobre las reformas necesarias en el Poder Judicial, comparando modelos internacionales con la realidad local.",
    date: "2025-01-14",
    category: "Justicia",
  },
  {
    id: 4,
    slug: "criminalidad-economica-desafios-procuracion-general",
    title: "Criminalidad económica: Los desafíos de la Procuración General",
    excerpt:
      "Una mirada desde adentro sobre los obstáculos y oportunidades en la persecución de delitos económicos complejos.",
    date: "2025-01-13",
    category: "Derecho Penal",
  },
]

// Mock Twitter/X posts data - expanded to 8 posts for pagination
const twitterPosts = [
  {
    id: 1,
    text: "Mi amiga que ayer festejó los 40 con mega fiestón se acaba de dar cuenta de que en realidad cumplió 39. La amo mucho.",
    date: "2025-01-16",
    time: "14:30",
    replies: 45,
    retweets: 128,
    likes: 312,
  },
  {
    id: 2,
    text: "Odiaron al Diego. Odiaron a Román. Y ahora odian a Messi porque, por una vez, se negó a dejarse forrear y lo hizo en el lenguaje real y simbólico de la vulgata, que es lo que, en rigor, odian por sobre todas las demás cosas. Nadie los obliga a ser argentinos, chicos. Vayan yendo.",
    date: "2025-01-15",
    time: "10:15",
    replies: 23,
    retweets: 67,
    likes: 189,
  },
  {
    id: 3,
    text: "El presidente no es doctor. Le regalaron un título en una universidad falopa de Benegas Lynch tercero. Tampoco mide 1.80. Usa un banquito para parecer alto. Y no calza 44, sino 37. Ah, y no es liberal. Es un fascista conservador.",
    date: "2025-01-14",
    time: "16:45",
    replies: 31,
    retweets: 94,
    likes: 256,
  },
  {
    id: 4,
    text: "Hijo con vómitos. A la guardia con remera de Boca. Pediatra mujer (presumiblemente gallinacia). Revisa. Nada grave. Sentencia: “me parece que lo que te cayó mal fue el partido de ayer”. Me reí. Hijo no.",
    date: "2025-01-13",
    time: "09:20",
    replies: 18,
    retweets: 52,
    likes: 143,
  },
  {
    id: 5,
    text: "Villa se comparó con el lobo feroz de Caperucita, que es, justamente, una parábola de la violación. Hola Freud.",
    date: "2025-01-12",
    time: "11:45",
    replies: 27,
    retweets: 89,
    likes: 201,
  },
  {
    id: 6,
    text: "6 de cada 10 niñes son pobres y vos te quejas de que vas a tener que pagar 30% más por Netflix y Spotify.",
    date: "2025-01-11",
    time: "15:20",
    replies: 42,
    retweets: 156,
    likes: 378,
  },
  {
    id: 7,
    text: "TN hizo renunciar al jefe de YouTube del canal Juan Vailati y no al periodista Jonatan Viale que salió en pija a mear el derecho más sagrado de la democracia: la libertad de expresión.",
    date: "2025-01-10",
    time: "08:30",
    replies: 35,
    retweets: 112,
    likes: 289,
  },
  {
    id: 8,
    text: "Me asusta muchísimo que haya que explicar por qué está mal que la policía vaya de noche a las casas de las familias de pibes que tomaron colegios a notificarles sarasas contravencionales.",
    date: "2025-01-09",
    time: "13:15",
    replies: 19,
    retweets: 73,
    likes: 167,
  },
]

// Videos for the home page
const homePageVideos = [
  {
    id: 1,
    title: "El fallo de la Corte en la causa #vialidad",
    videoUrl: "https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/videos/el-fallo-de-la-Corte-en-la-causa-vialidad.mp4",
    hashtags: ["#cfk", "#vialidad"],
    description: "Análisis del fallo de la Corte Suprema en la causa vialidad y sus implicancias jurídicas.",
  },
  {
    id: 2,
    title: "Las mentiras de Juliana Santillán ante el reclamo de las médicas del hospital",
    videoUrl: "https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/videos/las-mentiras-de-juliana-santilla%CC%81n-ante-el-reclamo-de-las-me%CC%81dicas.mp4",
    hashtags: [
      "#garrahan",
      "#hospitalgarrahan",
      "#julianasantillán",
      "#indec",
      "#milei",
      "#benegaslynch",
      "#cluacas",
      "#diputadasantillan",
      "#residentesmédicos",
    ],
    description:
      "Un reel de Instagram sobre las declaraciones de Juliana Santillán y el reclamo de las médicas del Hospital Garrahan.",
  },
  {
    id: 3,
    title:
      "El llanto de la mujer de Jorge Macri, Belén Ludueña, ante una simple pregunta de su panelista al Jefe de Gobierno.",
    videoUrl: "https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/videos/El-llanto-de-la-mujer-de-Jorge-Macri.mp4",
    hashtags: ["#jorgemacri", "#belenludueña", "#amaliaguiñazú", "#bicisenda"],
    description: "Un reel de Instagram sobre la reacción de Belén Ludueña ante una pregunta sobre Jorge Macri.",
  },
]

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

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentTwitterPage, setCurrentTwitterPage] = useState(0)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showStickyFooter, setShowStickyFooter] = useState(true)

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

  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }

  const handleVideoPause = () => {
    setIsVideoPlaying(false)
  }

  const handleHeaderButtonClick = () => {
    const targetElement = document.getElementById("sumate-a-la-comunidad")
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
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

  const currentVideo = homePageVideos[currentVideoIndex]

  // Twitter pagination logic
  const tweetsPerPage = 3
  const totalTwitterPages = Math.ceil(twitterPosts.length / tweetsPerPage)
  const currentTweets = twitterPosts.slice(currentTwitterPage * tweetsPerPage, (currentTwitterPage + 1) * tweetsPerPage)

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

      {/* Hero Section - WHITE */}
      <section className="block-massive bg-white">
        <div className="px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-massive mb-12 text-center">LA JUSTA</h1>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Descriptive Block - WHITE */}
      <section className="block-large bg-white">
        <div className="px-4 md:px-20 2xl:px-40 ">
          <div className="">
            <div className="space-y-8 text-regular leading-relaxed">
              <p>
                La Justa es la plataforma de contenidos digitales de Natalia Volosin. Datos, investigación y análisis de
                lo que los medios tradicionales no te quieren contar, con la independencia, la claridad y la
                irreverencia de siempre.
              </p>
              {/* Mini-bio added here */}

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

      {/* Featured Newsletter - WHITE */}
      <section className="block-large bg-white">
        <div className="px-4 md:px-20 2xl:px-40 ">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text block on the left */}
            <div>
              <h3 className="text-large mb-6">{featuredArticle.title}</h3>
              <p className="text-regular mb-8">{featuredArticle.excerpt}</p>
              <Link href={`/newsletter/${featuredArticle.slug}`}>
                <Button className="bg-white text-black hover:bg-black hover:text-white border border-black rounded-none px-6 py-3">
                  Leer Newsletter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            {/* Image on the right */}
            <div className="relative w-full h-auto">
              <Image
                src="/images/vaudagna-bomba.webp"
                alt="Imagen del Newsletter principal"
                width={800}
                height={450}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Social Media Section - BLACK */}
      <section className="block-large text-white bg-transparent">
        <div className="px-4 md:px-20 2xl:px-40 ">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Instagram Column - Left */}
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-8 flex flex-col items-center justify-center min-h-[600px]">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Instagram className="w-8 h-8 text-white mr-3" />
                  <h2 className="text-xlarge text-white">Instagram</h2>
                </div>
                <p className="text-white/90 text-regular leading-5">
                  Mamá de 2/Bostera 💙💛🎾⚽️
                  <br />
                  Abogada, consultora, académica y comunicadora
                  <br />
                  Máster y Doctora en Derecho (Yale)
                </p>
              </div>

              {/* Video */}
              <div className="relative group mb-6">
                <video
                  key={currentVideo.id}
                  className="w-full aspect-[9/16] object-cover bg-gray-900 max-w-xs mx-auto rounded-lg shadow-2xl"
                  controls
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  preload="metadata"
                >
                  <source src={currentVideo.videoUrl} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>

              {/* Video Navigation Dots */}
              <div className="flex items-center justify-center space-x-3 mb-8">
                {homePageVideos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentVideoIndex(index)
                      setIsVideoPlaying(false)
                    }}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      index === currentVideoIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75",
                    )}
                  />
                ))}
              </div>

              <Link href="https://www.instagram.com/nataliavolosin" target="_blank">
                <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Instagram className="mr-2 h-5 w-5" />
                  Seguir en Instagram
                </Button>
              </Link>
            </div>

            {/* Twitter Column - Right */}
            <div className="bg-black p-8 flex flex-col min-h-[600px]">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Twitter className="w-8 h-8 text-white mr-3" />
                  <h2 className="text-xlarge text-white">Twitter/X</h2>
                </div>
                <p className="text-white/90 text-regular">Mis reflexiones diarias sobre política y justicia</p>
              </div>

              {/* Twitter Posts */}
              <div className="flex-1 space-y-4 mb-8">
                {currentTweets.map((post) => (
                  <article
                    key={post.id}
                    className="bg-gray-900 p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Twitter className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-bold text-white text-sm">Natalia Volosin</span>
                          <span className="text-gray-400 text-xs">@nataliavolosin</span>
                          <span className="text-gray-400 text-xs">•</span>
                          <span className="text-gray-400 text-xs">{post.time}</span>
                        </div>
                        <p className="text-white text-sm leading-relaxed mb-3">{post.text}</p>
                        <div className="flex items-center space-x-6 text-gray-400 text-xs">
                          <div className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer transition-colors">
                            <MessageCircle className="w-3 h-3" />
                            <span>{post.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1 hover:text-green-400 cursor-pointer transition-colors">
                            <Repeat2 className="w-3 h-3" />
                            <span>{post.retweets}</span>
                          </div>
                          <div className="flex items-center space-x-1 hover:text-red-400 cursor-pointer transition-colors">
                            <Heart className="w-3 h-3" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Twitter Navigation Dots */}
              <div className="flex items-center justify-center space-x-3 mb-6">
                {Array.from({ length: totalTwitterPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTwitterPage(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      index === currentTwitterPage ? "bg-white scale-125" : "bg-gray-600 hover:bg-gray-400",
                    )}
                  />
                ))}
              </div>

              <Link href="https://x.com/nataliavolosin" target="_blank" className="mx-auto block">
                <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Twitter className="mr-2 h-5 w-5" />
                  Seguir en X
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

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
                    <Input
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

      {/* Footer - WHITE */}
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
