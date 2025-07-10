"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Search, Play, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"

// Simplified data structure
const videos = [
  {
    id: 1,
    title: '"Mi calificación moral a Patricia Bullrich es de asesina" Natalia Volosin Abogada',
    description:
      "Análisis crítico sobre las políticas de seguridad y las declaraciones controvertidas de la ministra Patricia Bullrich.",
    youtubeId: "qXjxRHPMZqo",
    thumbnail: "https://img.youtube.com/vi/qXjxRHPMZqo/maxresdefault.jpg",
    duration: "18:45",
    date: "2025-01-15",
    tags: ["Política", "Seguridad"],
  },
  {
    id: 2,
    title: 'Natalia Volosin: "Una cosa es lo que yo pueda pensar y otra es lo que se pueda probar en un juicio"',
    description:
      "Reflexiones sobre la diferencia entre opiniones personales y evidencia judicial en casos de corrupción.",
    youtubeId: "iGS-OiAHuL4",
    thumbnail: "https://img.youtube.com/vi/iGS-OiAHuL4/maxresdefault.jpg",
    duration: "24:12",
    date: "2025-01-08",
    tags: ["Justicia", "Derecho"],
  },
  {
    id: 3,
    title: 'Natalia Volosin - FORO "ARGENTINA: LA CORRUPCIÓN POLÍTICA"',
    description:
      "Participación en foro académico sobre los mecanismos de corrupción política en Argentina y sus posibles soluciones.",
    youtubeId: "Tnctnmyon-c",
    thumbnail: "https://img.youtube.com/vi/Tnctnmyon-c/maxresdefault.jpg",
    duration: "31:28",
    date: "2025-01-01",
    tags: ["Corrupción", "Política"],
  },
  {
    id: 4,
    title: "CRISTINA: HOY FALLA LA CORTE y PUEDE IR PRESA con NOE BARRAL y NATALIA VOLOSIN | ESCUCHO OFERTAS",
    description:
      "Análisis jurídico sobre el fallo de la Corte Suprema en el caso de Cristina Kirchner y sus implicancias legales.",
    youtubeId: "KWikXTJIoC8",
    thumbnail: "https://img.youtube.com/vi/KWikXTJIoC8/maxresdefault.jpg",
    duration: "45:33",
    date: "2024-12-20",
    tags: ["Justicia", "Análisis"],
  },
]

// All available tags
const allTags = ["Justicia", "Política", "Corrupción", "Seguridad", "Derecho", "Análisis"]

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isScrolled, setIsScrolled] = useState(false)

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => video.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  const handleVideoClick = (video: (typeof videos)[0]) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`
    window.open(youtubeUrl, "_blank")
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
            <Link href="/videos" className="text-black hover:text-gray-700 font-medium uppercase font-bold">
              Videos
            </Link>
          </nav>
          <Link href="https://substack.com/@nataliavolosin" target="_blank">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3">Suscribirse</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl">
            <h1 className="text-huge mb-8">Videos</h1>
            <p className="text-medium max-w-2xl mb-12">
              Entrevistas, análisis y participaciones en medios sobre temas de actualidad.
            </p>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Search and Filters */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-28">
                <h2 className="text-large mb-6">Filtros</h2>

                <div className="mb-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 py-3 border-black rounded-none w-full"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-medium mb-4">Temas</h3>
                  <div className="space-y-2">
                    {allTags.map((tag) => (
                      <div key={tag} className="flex items-center">
                        <Button
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          onClick={() => toggleTag(tag)}
                          className={`w-full justify-start rounded-none ${
                            selectedTags.includes(tag)
                              ? "bg-black text-white"
                              : "bg-white text-black border-black hover:bg-black hover:text-white"
                          }`}
                        >
                          {tag}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <Link href="https://substack.com/@nataliavolosin" target="_blank">
                    <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-none py-6">
                      Suscribirse al Newsletter
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <h2 className="text-xlarge mb-8">Videos recientes</h2>

              <div className="space-y-16">
                {filteredVideos.map((video) => (
                  <article key={video.id} className="border-t-2 border-black pt-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative group cursor-pointer" onClick={() => handleVideoClick(video)}>
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white rounded-full p-4">
                            <Play className="w-8 h-8 text-black" fill="currentColor" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-black text-white px-2 py-1 text-small">
                          {video.duration}
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {video.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-small uppercase border border-black px-3 py-1 hover:bg-black hover:text-white cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleTag(tag)
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-large mb-4">{video.title}</h3>
                        <p className="text-regular mb-6">{video.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-small text-gray-600">
                            {new Date(video.date).toLocaleDateString("es-AR")}
                          </span>
                          <Button
                            className="bg-white text-black hover:bg-black hover:text-white border border-black rounded-none px-6 py-3"
                            onClick={() => handleVideoClick(video)}
                          >
                            Ver video
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
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
