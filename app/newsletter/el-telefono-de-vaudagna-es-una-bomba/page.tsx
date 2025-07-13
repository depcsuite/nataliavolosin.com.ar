"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Eye, Share2, ExternalLink, MapPin, Globe, Copy } from "lucide-react" // Import Copy icon
import Image from "next/image"

// Featured Newsletter data (copied from app/newsletter/page.tsx)
const featuredNewsletterData = {
  id: 1,
  slug: "el-telefono-de-vaudagna-es-una-bomba",
  title: "El teléfono de Vaudagna es una bomba",
  excerpt:
    "El ex jefe regional de AFIP en Rosario protagoniza la segunda entrega de esta novela de narcos, complicidad política y corrupción judicial.",
  date: "2025-07-12",
  tags: ["Corrupción", "Justicia", "Política"],
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
    amount: "Anual",
    period: "descuento",
    url: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849764e81a01976bb4934202c7",
  },
]

export default function NewsletterArticlePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [copied, setCopied] = useState(false) // State for copy button feedback

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
          </nav>
          <Link href="https://substack.com/@nataliavolosin" target="_blank">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3">SUMATE a La Justa</Button>
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
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
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredNewsletterData.tags.map((tag) => (
                  <span key={tag} className="text-small uppercase border border-black px-3 py-1 inline-block">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-xlarge mb-6">El teléfono de Vaudagna es una bomba</h1>

              <div className="flex items-center space-x-6 text-small text-gray-600 mb-8">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  12/07/2025
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  2,450 lecturas
                </div>
              </div>

              {/* Featured Image */}
              <div className="mb-12">
                <Image
                  src="/images/vaudagna-bomba.webp"
                  alt="El teléfono de Vaudagna es una bomba"
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              <div className="mb-12">
                <div className="w-full h-[2px] bg-black mb-12"></div>
                <p className="text-medium font-medium mb-8">
                  El ex jefe regional de AFIP en Rosario protagoniza la segunda entrega de esta novela de narcos,
                  complicidad política y corrupción judicial
                </p>

                {/* Moved Share Newsletter block */}
                <div className="border-t border-black pt-8 mt-12 mb-12">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                    <div>
                      <h3 className="text-medium mb-2">Compartir newsletter</h3>
                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          className="border-black rounded-none hover:bg-black hover:text-white bg-transparent"
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Twitter
                        </Button>
                        <Button
                          variant="outline"
                          className="border-black rounded-none hover:bg-black hover:text-white bg-transparent"
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Facebook
                        </Button>
                        <Button
                          variant="outline"
                          className="border-black rounded-none hover:bg-black hover:text-white bg-transparent"
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          LinkedIn
                        </Button>
                        <Button
                          variant="outline"
                          className="border-black rounded-none hover:bg-black hover:text-white bg-transparent"
                          onClick={handleCopyLink}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          {copied ? "¡Copiado!" : "Copiar enlace"}
                        </Button>
                      </div>
                    </div>
                    {/* Removed "Más newsletters" button */}
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <div className="text-regular font-arimo leading-relaxed text-black space-y-6">
                    <h2 className="text-large font-bold mb-4">Capítulo 2: el arrepentido</h2>

                    <p>
                      La semana pasada empezamos a hablar de las acusaciones contra el ex juez Marcelo Bailaque. Como
                      dije, para mí es el caso de corrupción judicial más importante desde que Galeano coimeó a un
                      imputado para desviar la investigación del atentado a la AMIA. Es una historia que toca
                      estructuras del poder real y Bailaque es apenas la punta del iceberg. Por eso, los que conocen la
                      causa dicen que si el juez habla "se va todo a la mierda".
                    </p>

                    <p>
                      Como vimos en el Capítulo 1, hay sospechas de que Bailaque encubría a los narcos del Clan
                      Alvarado. Compartían contador y, además, el juez tenía al hijo del mago de los números trabajando
                      en su juzgado. Si el muchacho llevaba o no las causas contra los jefes narcos de su padre es algo
                      que, de momento, sólo podemos imaginar. Pero que las causas no avanzaban, no avanzaban. Que los
                      teléfonos no se pinchaban, no se pinchaban. Y que los allanamientos no se hacían, no se hacían.
                    </p>

                    <p>
                      También sabemos que todo esto lo denunció el valiente fiscal rosarino Luis Schiappa Pietra en el
                      alegato del juicio por el que Esteban Lindor Alvarado fue condenado a perpetua. Y sabemos, por
                      fin, que al día siguiente de ese alegato el juez federal denunciado, Bailaque, participó de un
                      súper evento en el que la Corte Suprema en pleno, el Procurador General y 140 jueces y fiscales
                      federales se dieron cita en Rosario para vendernos una supuesta lucha contra el narcotráfico que
                      jamás ocurrió. Mientras tanto, el Consejo de la Magistratura protegió a Bailaque durante tres
                      años. El resto es historia. Renuncia aceptada por el presidente Milei, jubileta de privilegio y a
                      casa. Bueno, con prisión domiciliaria. Detalles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

      {/* Support Options - WHITE */}
      <section id="sumate-a-la-comunidad" className="block-large bg-white pt-24 scroll-mt-24">
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
