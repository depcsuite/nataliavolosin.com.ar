"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Simplified data structure
const newsletters = [
  {
    id: 1,
    slug: "exclusivo-peligra-decomiso-cristina-kirchner",
    title: "EXCLUSIVO: Peligra el decomiso de $5.000 millones contra Cristina Kirchner",
    subtitle: "Error procesal podría anular la medida judicial más importante contra la expresidenta",
    excerpt:
      "La Cámara Federal de Casación Penal evalúa un recurso que podría cambiar el rumbo de uno de los casos más emblemáticos. Fuentes judiciales confirman irregularidades en las notificaciones.",
    date: "2025-01-16",
    tags: ["Justicia", "Política", "Corrupción"],
  },
  {
    id: 2,
    slug: "procuracion-general-reformas-investigaciones-economicas",
    title: "Procuración General anuncia reformas estructurales en investigaciones económicas",
    subtitle: "Nuevas directivas buscan acelerar los tiempos procesales en casos de corrupción",
    excerpt:
      "El Procurador General presentó un plan integral que incluye equipos especializados y nuevas tecnologías de investigación para delitos complejos.",
    date: "2025-01-15",
    tags: ["Justicia", "Reformas"],
  },
  {
    id: 3,
    slug: "congreso-debate-transparencia-contrataciones-publicas",
    title: "Congreso debate nuevas medidas de transparencia en contrataciones públicas",
    subtitle: "Proyecto incluye publicación en tiempo real y sistema de alertas ciudadanas",
    excerpt:
      "La Comisión de Asuntos Constitucionales del Senado analiza modificaciones sustanciales al régimen de contrataciones del Estado.",
    date: "2025-01-14",
    tags: ["Transparencia", "Política"],
  },
  {
    id: 4,
    slug: "crisis-institucional-reformas-estructurales",
    title: "Crisis institucional abre ventana de oportunidad para reformas estructurales",
    subtitle: "Análisis: Cómo la coyuntura actual puede catalizar cambios profundos",
    excerpt:
      "La convergencia de múltiples crisis genera un escenario único para implementar reformas que durante décadas fueron postergadas.",
    date: "2025-01-13",
    tags: ["Política", "Análisis"],
  },
]

// All available tags
const allTags = ["Justicia", "Política", "Corrupción", "Reformas", "Transparencia", "Análisis", "Sociedad"]

export default function NewsletterPage() {
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

  const filteredNewsletters = newsletters.filter((newsletter) => {
    const matchesSearch =
      newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsletter.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => newsletter.tags.includes(tag))

    return matchesSearch && matchesTags
  })

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
            <Link href="/newsletter" className="text-black hover:text-gray-700 font-medium uppercase font-bold">
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

      {/* Hero Section */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl">
            <h1 className="text-huge mb-8">LA JUSTA</h1>
            <p className="text-medium max-w-2xl mb-12">
              Newsletter semanal con análisis independiente sobre política, justicia y transparencia.
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
              <h2 className="text-xlarge mb-8">Newsletters recientes</h2>

              <div className="space-y-16">
                {filteredNewsletters.map((newsletter) => (
                  <article key={newsletter.id} className="border-t-2 border-black pt-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {newsletter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-small uppercase border border-black px-3 py-1 hover:bg-black hover:text-white cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-large mb-4">{newsletter.title}</h3>
                    <p className="text-medium mb-4 text-gray-700">{newsletter.subtitle}</p>
                    <p className="text-regular mb-6">{newsletter.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-small text-gray-600">
                        {new Date(newsletter.date).toLocaleDateString("es-AR")}
                      </span>
                      <Link
                        href="https://nataliavolosin.substack.com/p/peligra-el-decomiso-contra-cristina"
                        target="_blank"
                      >
                        <Button className="bg-white text-black hover:bg-black hover:text-white border border-black rounded-none px-6 py-3">
                          Leer más
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
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
