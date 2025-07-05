"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, Eye, Star, Twitter, Instagram, Music } from "lucide-react"

// Datos de ejemplo para newsletters
const newsletters = [
  {
    id: 1,
    slug: "exclusivo-peligra-decomiso-cristina-kirchner",
    title: "EXCLUSIVO: Peligra el decomiso de $5.000 millones contra Cristina Kirchner",
    subtitle: "Error procesal podría anular la medida judicial más importante contra la expresidenta",
    excerpt:
      "La Cámara Federal de Casación Penal evalúa un recurso que podría cambiar el rumbo de uno de los casos más emblemáticos. Fuentes judiciales confirman irregularidades en las notificaciones.",
    content: `
      <p>La Cámara Federal de Casación Penal evalúa un recurso presentado por la defensa de Cristina Kirchner que podría anular el decomiso de $5.000 millones ordenado en la causa Vialidad. Según fuentes judiciales consultadas por La Justa, existen irregularidades en las notificaciones que podrían comprometer la validez de la medida.</p>
      
      <p>El recurso, presentado hace dos semanas por los abogados Carlos Beraldi y Ary Llernovoy, cuestiona aspectos procedimentales fundamentales del decomiso ordenado por el Tribunal Oral Federal 2. La defensa argumenta que no se respetaron los plazos legales establecidos y que la notificación no cumplió con los requisitos formales exigidos por el Código Procesal Penal.</p>
      
      <p>Fuentes cercanas al expediente confirmaron a este medio que efectivamente existen "irregularidades significativas" en el procedimiento seguido para la notificación del decomiso. Estas irregularidades podrían ser suficientes para que Casación ordene la nulidad de la medida, lo que representaría un revés importante para la acusación.</p>
      
      <p>El decomiso de $5.000 millones fue ordenado como parte de la condena a Cristina Kirchner en la causa Vialidad, donde fue sentenciada a seis años de prisión e inhabilitación perpetua para ejercer cargos públicos. La medida incluye bienes inmuebles, cuentas bancarias y otros activos de la expresidenta.</p>
      
      <p>La resolución de Casación podría conocerse en las próximas semanas. Si se hace lugar al recurso, no solo se anularía el decomiso sino que podría abrir la puerta a nuevos cuestionamientos sobre otros aspectos de la sentencia.</p>
      
      <p>Este desarrollo se produce en un momento de particular tensión política, con el gobierno nacional enfrentando múltiples crisis y la oposición reorganizándose de cara a las elecciones de medio término.</p>
    `,
    date: "2025-01-16",
    time: "14:30",
    readTime: "8 min",
    tags: ["Justicia", "Política", "Corrupción"],
    views: "12.3K",
    comments: 89,
    featured: true,
    urgent: true,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    slug: "procuracion-general-reformas-investigaciones-economicas",
    title: "Procuración General anuncia reformas estructurales en investigaciones económicas",
    subtitle: "Nuevas directivas buscan acelerar los tiempos procesales en casos de corrupción",
    excerpt:
      "El Procurador General presentó un plan integral que incluye equipos especializados y nuevas tecnologías de investigación para delitos complejos.",
    content: `
      <p>El Procurador General de la Nación anunció ayer un paquete de reformas estructurales destinadas a modernizar y acelerar las investigaciones de delitos económicos complejos. El plan, que será implementado gradualmente durante los próximos seis meses, incluye la creación de equipos especializados y la incorporación de nuevas tecnologías de investigación.</p>
      
      <p>Entre las principales medidas se encuentra la creación de una Unidad Especializada en Criminalidad Económica (UECE), que contará con fiscales, investigadores y peritos especializados en delitos financieros. Esta unidad trabajará de manera coordinada con organismos internacionales y tendrá acceso a herramientas tecnológicas avanzadas para el análisis de datos financieros.</p>
      
      <p>Además, se implementará un nuevo sistema de gestión de casos que permitirá un seguimiento más eficiente de las investigaciones y reducirá los tiempos procesales. El sistema incluye alertas automáticas para evitar vencimientos de plazos y herramientas de análisis predictivo para identificar patrones en los casos.</p>
      
      <p>Las reformas también contemplan la capacitación continua del personal y el fortalecimiento de la cooperación internacional en materia de recupero de activos. Se espera que estas medidas contribuyan significativamente a mejorar la eficacia del sistema judicial en la lucha contra la corrupción.</p>
    `,
    date: "2025-01-15",
    time: "11:45",
    readTime: "6 min",
    tags: ["Justicia", "Reformas"],
    views: "8.7K",
    comments: 45,
    featured: false,
    urgent: false,
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function NewsletterDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  const newsletter = newsletters.find((n) => n.slug === params.slug)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!newsletter) {
    return (
      <div className="min-h-screen bg-brand-light-gray flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif serif-elegant font-medium text-brand-black mb-4">
            Artículo no encontrado
          </h1>
          <Link href="/newsletter">
            <Button className="bg-brand-purple hover:bg-brand-purple/80 text-brand-white">Volver al newsletter</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-light-gray font-serif">
      {/* Compact Header for Full View */}
      <header className="bg-brand-white border-b border-brand-gray/20 commercial-shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center space-x-2 hover:bg-brand-green/20"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-sans sans-modern font-medium">Volver</span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Link href="/">
                <h1 className="text-2xl font-serif serif-elegant font-medium text-brand-black">
                  Natalia <span className="font-script script-enhanced text-3xl text-brand-purple">Volosin</span>
                </h1>
              </Link>
            </div>
            <Link href="/suscripcion">
              <Button className="bg-gradient-to-r from-brand-green to-brand-teal hover:from-brand-green/80 hover:to-brand-teal/80 text-brand-black font-sans sans-modern font-bold px-4 py-2 rounded-xl">
                <Star className="w-4 h-4 mr-2" />
                Suscribirse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Full Newsletter View */}
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              {newsletter.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-brand-purple text-brand-white px-3 py-1 rounded-full font-sans sans-modern font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif serif-elegant font-medium text-brand-black mb-6 leading-tight">
              {newsletter.title}
            </h1>
            <div className="flex items-center justify-between text-brand-gray mb-6">
              <div className="flex items-center space-x-6 font-sans sans-modern">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(newsletter.date).toLocaleDateString("es-AR")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{newsletter.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{newsletter.views}</span>
                </div>
              </div>
            </div>
            <p className="text-xl text-brand-gray font-arimo leading-relaxed">{newsletter.excerpt}</p>
          </header>

          <div className="prose prose-lg max-w-none">
            <div
              className="font-arimo text-brand-black leading-relaxed"
              dangerouslySetInnerHTML={{ __html: newsletter.content }}
            />
          </div>

          <footer className="mt-12 pt-8 border-t border-brand-gray/20">
            <div className="bg-gradient-to-r from-brand-green/20 to-brand-teal/20 p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-serif serif-elegant font-medium text-brand-black mb-4">
                ¿Te gustó este análisis?
              </h3>
              <p className="text-brand-gray font-arimo mb-6">
                Suscríbete para recibir análisis exclusivos y contenido sin límites
              </p>
              <Link href="/suscripcion">
                <Button className="bg-brand-black hover:bg-brand-gray text-brand-white font-sans sans-modern font-bold px-8 py-3 rounded-xl text-lg">
                  Quiero bancar a La Justa
                </Button>
              </Link>
            </div>
          </footer>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-brand-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="text-3xl font-serif serif-elegant font-medium mb-2">
              Natalia <span className="font-script script-enhanced text-4xl text-brand-purple">Volosin</span>
            </h4>
            <h5 className="text-2xl font-sans sans-modern font-black mb-4 tracking-wider">LA JUSTA</h5>
            <p className="text-brand-gray text-lg font-arimo">Portal de análisis independiente</p>
          </div>

          <div className="flex justify-center space-x-8 mb-8">
            <Link
              href="https://x.com/nataliavolosin"
              target="_blank"
              className="text-brand-gray hover:text-brand-white transition-colors p-3 rounded-full hover:bg-brand-gray/20"
            >
              <Twitter className="w-8 h-8" />
            </Link>
            <Link
              href="https://www.instagram.com/nataliavolosin"
              target="_blank"
              className="text-brand-gray hover:text-brand-white transition-colors p-3 rounded-full hover:bg-brand-gray/20"
            >
              <Instagram className="w-8 h-8" />
            </Link>
            <Link
              href="https://www.tiktok.com/@nataliaavolosin"
              target="_blank"
              className="text-brand-gray hover:text-brand-white transition-colors p-3 rounded-full hover:bg-brand-gray/20"
            >
              <Music className="w-8 h-8" />
            </Link>
          </div>

          <div className="text-center text-sm text-brand-gray font-sans sans-modern font-medium">
            © 2025 Natalia Volosin. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
