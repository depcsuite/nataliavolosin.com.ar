"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, MessageCircle, Repeat2, Heart, ExternalLink, Play, Instagram } from "lucide-react"
import { cn } from "@/lib/utils" // Import cn utility

// Simplified data structure
const featuredArticle = {
  id: 1,
  slug: "crisis-institucional-reformas-estructurales-argentina",
  title: "Crisis institucional: El momento decisivo para las reformas estructurales en Argentina",
  excerpt:
    "Un análisis exhaustivo sobre la coyuntura política actual y las oportunidades únicas que se presentan para implementar cambios profundos en el sistema institucional argentino.",
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

// Mock Twitter/X posts data
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
]

// Single Instagram video
const featuredVideo = {
  id: 1,
  title: "El fallo de la Corte en la causa #vialidad",
  videoUrl: "https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/videos/el-fallo-de-la-Corte-en-la-causa-vialidad.mp4",
  hashtags: ["#cfk", "#vialidad"],
  date: "2025-01-16",
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }

  const handleVideoPause = () => {
    setIsVideoPlaying(false)
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
            <Link href="/videos" className="text-black hover:text-gray-700 font-medium uppercase">
              Videos
            </Link>
          </nav>
          <Link href="https://substack.com/@nataliavolosin" target="_blank">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3">Suscribirse</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section - WHITE */}
      <section className="block-massive bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl">
            <h1 className="text-massive mb-12">LA JUSTA</h1>
            <p className="text-medium max-w-2xl mb-12">
              Portal de análisis independiente. Datos, investigación y análisis sin compromisos. La invitación a pensar
              es urgente.
            </p>
            <Link href="/newsletter">
              <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-6 text-lg">
                Leer La Justa
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
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xlarge mb-8">Newsletter</h2>
              <h3 className="text-large mb-6">{featuredArticle.title}</h3>
              <p className="text-regular mb-8">{featuredArticle.excerpt}</p>
              <Link href={`/articulo/${featuredArticle.slug}`}>
                <Button className="bg-white text-black hover:bg-black hover:text-white border border-black rounded-none px-6 py-3">
                  Leer artículo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="bg-black text-white p-12 flex items-center justify-center">
              <p className="text-medium font-garamond italic">
                "La Justa no solo informa, sino que educa y empodera a los ciudadanos para que puedan participar
                activamente en la vida democrática del país."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Video Section - BLACK */}
      <section className="block-large bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xlarge mb-8">Video reciente</h2>
              <h3 className="text-large mb-6">{featuredVideo.title}</h3>
              <div className="flex gap-2 mb-6">
                {featuredVideo.hashtags.map((hashtag, index) => (
                  <span key={index} className="text-regular text-gray-300">
                    {hashtag}
                  </span>
                ))}
              </div>
              <p className="text-regular mb-8 text-gray-300">
                Análisis del fallo de la Corte Suprema en la causa vialidad y sus implicancias jurídicas.
              </p>
              <Link href="https://www.instagram.com/nataliavolosin" target="_blank">
                <Button className="bg-white text-black hover:bg-gray-200 rounded-none px-6 py-3">
                  Ver más videos
                  <Instagram className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative group">
              <video
                className={cn(
                  "w-full aspect-[9/16] object-cover bg-gray-900 max-w-sm mx-auto",
                  !isVideoPlaying && "grayscale hover:grayscale-0 transition-all duration-500 ease-in-out",
                )}
                controls={isVideoPlaying}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                preload="metadata"
              >
                <source src={featuredVideo.videoUrl} type="video/mp4" />
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
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xlarge mb-8">Últimos mensajes</h2>
              <div className="space-y-8">
                {twitterPosts.map((post) => (
                  <article key={post.id} className="border-t border-black pt-6">
                    <p className="text-regular mb-4 leading-relaxed">{post.text}</p>
                    <div className="flex items-center justify-between text-small text-gray-600 mb-4">
                      <span>
                        {post.date} • {post.time}
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
            <div className="bg-black text-white p-12">
              <h3 className="text-large mb-6">Sígueme en X</h3>
              <p className="text-regular mb-8">
                Análisis en tiempo real, reflexiones sobre la actualidad política y jurídica, y debates sobre los temas
                que importan.
              </p>
              <Link href="https://x.com/nataliavolosin" target="_blank">
                <Button className="bg-white text-black hover:bg-gray-200 rounded-none px-6 py-3 w-full">
                  Seguir @nataliavolosin
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Recent Newsletters - WHITE */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xlarge mb-12">Newsletter recientes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="border-t-2 border-black pt-6">
                <span className="text-small uppercase mb-2 block">{article.category}</span>
                <h3 className="text-medium mb-4">{article.title}</h3>
                <p className="text-regular mb-6">{article.excerpt}</p>
                <Link
                  href={`/articulo/${article.slug}`}
                  className="text-black hover:underline font-medium flex items-center"
                >
                  Leer más
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Newsletter Signup - BLACK */}
      <section className="block-large bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xlarge mb-6">Suscríbete a La Justa</h2>
            <p className="text-medium mb-8">Recibe análisis semanales directamente en tu correo. Sin compromisos.</p>
            <Link href="https://substack.com/@nataliavolosin" target="_blank">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-none px-8 py-6 text-lg">
                Suscribirse Gratis
              </Button>
            </Link>
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
