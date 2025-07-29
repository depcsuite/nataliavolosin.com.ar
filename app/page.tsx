"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlayIcon } from "lucide-react"
import { useState, useEffect, useRef } from "react" // Import useRef

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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-center bg-black text-white overflow-hidden">
          <Image
            src="/images/natalia-volosin.jpg"
            alt="Natalia Volosin"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0 opacity-50"
            priority
          />
          <div className="relative z-10 p-4 max-w-4xl mx-auto">
            <h1 className="text-massive font-garamond font-bold leading-tight mb-4">Natalia Volosin</h1>
            <p className="text-xlarge font-arimo mb-8">Análisis político, económico y social.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/newsletter" passHref>
                <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                  Newsletters
                </Button>
              </Link>
              <Link href="/suscripcion" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                >
                  Suscribirse
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-12 md:py-20 bg-brand-light-gray dark:bg-brand-dark-gray">
          <div className="container mx-auto px-4">
            <h2 className="text-xlarge font-garamond font-bold text-center mb-10">Últimos Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative w-full h-48 bg-black flex items-center justify-center">
                  <video
                    src="/videos/el-fallo-de-la-Corte-en-la-causa-vialidad.mp4"
                    poster="/placeholder.svg?height=270&width=480"
                    controls={false}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <Button variant="ghost" size="icon" className="absolute z-10 text-white/80 hover:text-white">
                    <PlayIcon className="h-12 w-12 fill-current" />
                    <span className="sr-only">Play video</span>
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-medium font-garamond font-bold line-clamp-2">
                    El fallo de la Corte en la causa Vialidad
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">2023-12-01</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative w-full h-48 bg-black flex items-center justify-center">
                  <video
                    src="/videos/las-mentiras-de-juliana-santillan-ante-el-reclamo-de-las-medicas.mp4"
                    poster="/placeholder.svg?height=270&width=480"
                    controls={false}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <Button variant="ghost" size="icon" className="absolute z-10 text-white/80 hover:text-white">
                    <PlayIcon className="h-12 w-12 fill-current" />
                    <span className="sr-only">Play video</span>
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-medium font-garamond font-bold line-clamp-2">
                    Las mentiras de Juliana Santillán ante el reclamo de las médicas
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">2023-11-25</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative w-full h-48 bg-black flex items-center justify-center">
                  <video
                    src="/videos/el-llanto-de-la-mujer-de-jorge-macri.mp4"
                    poster="/placeholder.svg?height=270&width=480"
                    controls={false}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <Button variant="ghost" size="icon" className="absolute z-10 text-white/80 hover:text-white">
                    <PlayIcon className="h-12 w-12 fill-current" />
                    <span className="sr-only">Play video</span>
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-medium font-garamond font-bold line-clamp-2">
                    El llanto de la mujer de Jorge Macri
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">2023-11-18</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-10">
              <Button size="lg">Ver todos los videos</Button>
            </div>
          </div>
        </section>

        {/* Newsletter Call to Action */}
        <section className="py-12 md:py-20 bg-white dark:bg-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xlarge font-garamond font-bold mb-6">Sumate a la comunidad</h2>
            <p className="text-regular max-w-2xl mx-auto mb-8">
              Recibí mis análisis directamente en tu casilla de correo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/suscripcion" passHref>
                <Button size="lg">Suscribirse</Button>
              </Link>
              <Link href="/newsletter" passHref>
                <Button size="lg" variant="outline">
                  Ver Newsletters
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Footer Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white p-4 shadow-lg flex flex-col md:flex-row items-center justify-center gap-4">
        <p className="text-regular text-center md:text-left flex-grow">
          ¡No te pierdas mis análisis! Suscribite ahora.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link href="/suscripcion" passHref>
            <Button className="w-full md:w-auto bg-white text-black hover:bg-gray-200 h-10 px-6 py-2">
              Suscribirse
            </Button>
          </Link>
          <Link href="/newsletter" passHref>
            <Button
              variant="outline"
              className="w-full md:w-auto border-white text-white hover:bg-white hover:text-black h-10 px-6 py-2 bg-transparent"
            >
              Ver Newsletters
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
