"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, MessageCircle, Repeat2, Heart, ExternalLink, Play, Instagram, MapPin, Globe } from "lucide-react"
import { cn } from "@/lib/utils" // Import cn utility
import Image from "next/image" // Import Image component
import { SupportModal } from "@/components/support-modal" // Import the new modal component

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

// Mock Twitter/X posts data - expanded to 4 posts
const twitterPosts = [
  {
    id: 1,
    text: "La reforma judicial no puede ser una herramienta de venganza política. Debe ser una oportunidad para fortalecer las instituciones democráticas. #ReformaJudicial #Democracia",
    date: "2025-01-16",
    time: "14:30",
    replies: 45,
    retweets: 128,
    likes: 312,
  },
  {
    id: 2,
    text: "Nuevo artículo en La Justa: 'Crisis institucional y reformas estructurales'. Analizamos las oportunidades únicas que presenta la coyuntura actual para implementar cambios profundos.",
    date: "2025-01-15",
    time: "10:15",
    replies: 23,
    retweets: 67,
    likes: 189,
  },
  {
    id: 3,
    text: "La transparencia en las contrataciones públicas no es solo una cuestión técnica, es un imperativo democrático. Los ciudadanos tienen derecho a saber cómo se gasta su dinero.",
    date: "2025-01-14",
    time: "16:45",
    replies: 31,
    retweets: 94,
    likes: 256,
  },
  {
    id: 4,
    text: "El sistema de justicia argentino necesita reformas estructurales urgentes. No podemos seguir con parches cuando lo que se requiere es una transformación profunda. #Justicia #Argentina",
    date: "2025-01-13",
    time: "09:20",
    replies: 18,
    retweets: 52,
    likes: 143,
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
    amount: "Anual",
    period: "descuento",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849764e81a01976bb4934202c7",
  },
]

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false) // State for the modal

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
  useEffect(() => {
    setShowSupportModal(true)
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

  const currentVideo = homePageVideos[currentVideoIndex]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Support Modal */}
      <SupportModal open={showSupportModal} onOpenChange={setShowSupportModal} targetId="sumate-a-la-comunidad" />

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
          <Button
            className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3"
            onClick={handleHeaderButtonClick} // Added onClick handler
          >
            SUMATE a La Justa
          </Button>
        </div>
      </header>

      {/* Hero Section - WHITE */}
      <section className="block-massive bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl">
            <h1 className="text-massive mb-12">LA JUSTA</h1>
            <p className="text-medium max-w-2xl mb-12">
              La Justa es la plataforma de contenidos digitales de Natalia Volosin. Datos, investigación y análisis de
              lo que los medios tradicionales no te quieren contar, con la independencia, la claridad y la irreverencia
              de siempre.
            </p>
            <Link href="/suscripcion">
              <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-6 text-lg">
                Suscribite al Newsletter La Justa
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Featured Newsletter - WHITE */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xlarge mb-8">Newsletter</h2>
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
                src="/images/imagen-newsletter.webp"
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

      {/* Instagram Section - BLACK */}
      <section className="block-large bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bio and content on the left */}
            <div>
              <h2 className="text-xlarge mb-6">Seguime en Instagram</h2>
              <div className="mb-8">
                <h3 className="text-large mb-4">Natalia Volosin</h3>
                <p className="text-regular text-gray-300 leading-relaxed">
                  Mamá de 2/Bostera 💙💛🎾⚽️
                  <br />
                  Abogada, consultora, académica y comunicadora
                  <br />
                  Máster y Doctora en Derecho (Yale)
                </p>
              </div>

              {/* Current video info */}
              <div className="mb-8">
                <h4 className="text-medium mb-4">{currentVideo.title}</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentVideo.hashtags.map((hashtag, index) => (
                    <span key={index} className="text-small text-gray-300">
                      {hashtag}
                    </span>
                  ))}
                </div>
                <p className="text-regular text-gray-300 mb-6">{currentVideo.description}</p>
              </div>

              {/* Carousel controls - Only circles remain */}
              <div className="flex items-center justify-center space-x-2 mb-8">
                {homePageVideos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentVideoIndex(index)
                      setIsVideoPlaying(false)
                    }}
                    className={cn(
                      "w-3 h-3 rounded-full transition-colors",
                      index === currentVideoIndex ? "bg-white" : "bg-gray-500",
                    )}
                  />
                ))}
              </div>

              <Link href="https://www.instagram.com/nataliavolosin" target="_blank">
                <Button className="bg-white text-black hover:bg-gray-200 rounded-none px-6 py-3">
                  Seguir en Instagram
                  <Instagram className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Video on the right */}
            <div className="relative group">
              <video
                key={currentVideo.id} // Force re-render when video changes
                className={cn(
                  "w-full aspect-[9/16] object-cover bg-gray-900 max-w-sm mx-auto",
                  !isVideoPlaying && "grayscale hover:grayscale-0 transition-all duration-500 ease-in-out",
                )}
                controls={isVideoPlaying}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                preload="metadata"
              >
                <source src={currentVideo.videoUrl} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
              {!isVideoPlaying && (
                <div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleVideoPlay}
                >
                  <div className="bg-white rounded-full p-4">
                    <Play className="w-8 h-8 text-black" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Twitter/X Feed Section - WHITE */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xlarge">Seguime en X</h2>
              <Link href="https://x.com/nataliavolosin" target="_blank">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3">
                  Seguir @nataliavolosin
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {twitterPosts.map((post) => (
                <article
                  key={post.id}
                  className="border border-black p-6 transition-colors hover:bg-black hover:text-white"
                >
                  <p className="text-regular mb-4 leading-relaxed">{post.text}</p>
                  <div className="flex items-center justify-between text-small text-gray-600 mb-4">
                    <span>
                      {new Date(post.date).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}{" "}
                      • {post.time}
                    </span>
                    <Link
                      href="https://x.com/nataliavolosin"
                      target="_blank"
                      className="flex items-center hover:text-black"
                    >
                      Ver en X
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                  <div className="flex items-center space-x-6 text-small text-gray-600">
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.replies}
                    </div>
                    <div className="flex items-center">
                      <Repeat2 className="w-4 h-4 mr-1" />
                      {post.retweets}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Newsletter Signup - BLACK */}
      <section className="block-large bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xlarge mb-6">Suscribite a La Justa</h2>
            <p className="text-medium mb-8">
              La Justa es el newsletter semanal de Natalia Volosin sobre política, (in)justicia y actualidad. Sale los
              viernes.
            </p>
            <Link href="/suscripcion">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-none px-8 py-6 text-lg">
                Suscribite ahora Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Support Options - WHITE */}
      <section id="sumate-a-la-comunidad" className="block-large bg-white pt-24 scroll-mt-24">
        {" "}
        {/* Added pt-24 and scroll-mt-24 */}
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-xlarge mb-6">Sumate a la comunidad</h2>
              <p className="text-regular max-w-2xl mx-auto">
                Tu contribución hace posible que podamos seguir investigando y contando la verdad sin compromisos.
              </p>
            </div>

            {/* Argentina Support */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
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

              <div className="text-center">
                <p className="text-regular mb-4">¿Preferís otro monto?</p>
                <Link
                  href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c938084976a0ea101976bb1fdc400be"
                  target="_blank"
                >
                  <Button className="bg-white text-black hover:bg-black hover:text-white border border-black rounded-none px-6 py-3">
                    Monto personalizado
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <Separator className="border-t border-black my-16" />

            {/* International Support */}
            <div>
              <div className="flex items-center justify-center mb-8">
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
