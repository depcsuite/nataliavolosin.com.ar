"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Search, X, ArrowRight, MapPin, Globe, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { SupportModal } from "@/components/support-modal" // Import the new modal component

// Featured Newsletter data
const featuredNewsletter = {
  id: 1,
  slug: "el-telefono-de-vaudagna-es-una-bomba",
  title: "El teléfono de Vaudagna es una bomba",
  excerpt:
    "El ex jefe regional de AFIP en Rosario protagoniza la segunda entrega de esta novela de narcos, complicidad política y corrupción judicial.",
  date: "2025-07-12",
  tags: ["Corrupción", "Justicia", "Política"],
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
    tags: ["Justicia", "Política", "Narcotráfico"],
  },
  {
    id: 3,
    slug: "el-telefono-de-vaudagna-es-una-bomba", // Redirect to existing page
    title: 'Los "intelectuales" de Milei y la brecha de la felicidad',
    excerpt:
      "Axel Kaiser, Secretario Académico de la Fundación Faro, trató a los progresistas de parásitos y enfermos mentales y dijo que los conservadores son más felices.",
    date: "2025-07-10",
    tags: ["Política", "Sociedad", "Análisis"],
  },
  {
    id: 4,
    slug: "el-telefono-de-vaudagna-es-una-bomba", // Redirect to existing page
    title: "¿Peligra el decomiso contra Cristina Fernández de Kirchner?",
    excerpt:
      "En el newsletter de hoy te canto La Justa sobre cómo se debe gestionar el recupero de activos en una causa compleja y por qué se hizo mal en Vialidad.",
    date: "2025-07-09",
    tags: ["Justicia", "Corrupción"],
  },
  {
    id: 5,
    slug: "el-telefono-de-vaudagna-es-una-bomba", // Redirect to existing page
    title: "Cristina presa",
    excerpt: "Todo sobre la decisión más grietera de la Corte Suprema.",
    date: "2025-07-08",
    tags: ["Justicia", "Política"],
  },
]

// All available tags (combined from featured and other newsletters)
const allTags = Array.from(new Set([...featuredNewsletter.tags, ...otherNewsletters.flatMap((nl) => nl.tags)])).sort()

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
    amount: "Anual",
    period: "descuento",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849764e81a01976bb4934202c7",
  },
]

export default function NewsletterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
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

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
  }

  const filteredOtherNewsletters = otherNewsletters.filter((newsletter) => {
    const matchesSearch =
      newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsletter.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => newsletter.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  const hasActiveFilters = searchQuery.length > 0 || selectedTags.length > 0

  const handleHeaderButtonClick = () => {
    const targetElement = document.getElementById("sumate-a-la-comunidad")
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

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
            <Link href="/newsletter" className="text-black hover:text-gray-700 font-medium uppercase font-bold">
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

      {/* Hero Section - Title */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl">
            <h1 className="text-huge mb-8">LA JUSTA</h1>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Main Content - Introductory Text */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
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

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            {/* Search Bar */}
            <div className="relative max-w-md w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar newsletters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 border-black rounded-none w-full"
              />
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-3">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 border border-black text-small uppercase transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-small text-gray-600">Filtros activos:</span>
                {searchQuery && (
                  <span className="bg-gray-100 px-3 py-1 text-small border border-gray-300">
                    Búsqueda: "{searchQuery}"
                  </span>
                )}
                {selectedTags.map((tag) => (
                  <span key={tag} className="bg-black text-white px-3 py-1 text-small flex items-center gap-2">
                    {tag}
                    <button onClick={() => toggleTag(tag)} className="hover:text-gray-300">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <button onClick={clearFilters} className="text-small text-gray-600 hover:text-black underline">
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content - Featured Newsletter and Archive */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {/* Featured Newsletter */}
            <Link href={`/newsletter/${featuredNewsletter.slug}`}>
              <article className="grid md:grid-cols-2 gap-12 items-center border-2 border-black hover:bg-black hover:text-white transition-colors group cursor-pointer p-8 md:p-0">
                {/* Text block on the left */}
                <div className="md:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredNewsletter.tags.map((tag) => (
                      <span key={tag} className="text-small uppercase border border-current px-3 py-1">
                        {tag}
                      </span>
                    ))}
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
                    src={featuredNewsletter.imageUrl || "/placeholder.svg"}
                    alt={featuredNewsletter.title}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </article>
            </Link>

            {/* Newsletter Archive */}
            {filteredOtherNewsletters.length > 0 ? (
              <div className="border-t-2 border-black pt-8">
                <h3 className="text-xlarge mb-8">Newsletter recientes</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {filteredOtherNewsletters.map((newsletter) => (
                    <Link key={newsletter.id} href={`/newsletter/${newsletter.slug}`}>
                      <article className="border-t-2 border-black pt-6 hover:bg-black hover:text-white transition-colors group cursor-pointer p-4 -m-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {newsletter.tags.map((tag) => (
                            <span key={tag} className="text-small uppercase border border-current px-2 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h4 className="text-medium mb-3 leading-tight">{newsletter.title}</h4>
                        <p className="text-regular mb-4 line-clamp-3">{newsletter.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-small text-gray-600 group-hover:text-gray-300">
                            {new Date(newsletter.date).toLocaleDateString("es-AR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                          <div className="flex items-center text-black group-hover:text-white font-medium">
                            Leer más
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-regular text-gray-600 mb-4">
                  No se encontraron newsletters que coincidan con los filtros seleccionados.
                </p>
                <button onClick={clearFilters} className="text-black hover:underline font-medium">
                  Limpiar filtros para ver todos los newsletters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
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

      {/* Support Options - WHITE (Copied from /por-que/page.tsx) */}
      <section id="sumate-a-la-comunidad" className="block-large bg-white pt-24 scroll-mt-24">
        {" "}
        {/* Added id, pt-24, and scroll-mt-24 */}
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
