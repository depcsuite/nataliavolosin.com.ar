"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, ExternalLink, Globe, MapPin } from "lucide-react"

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

export default function PorQuePage() {
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
            <Link href="/por-que" className="text-black hover:text-gray-700 font-medium uppercase font-bold">
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
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl">
            <h1 className="text-huge mb-8">Por qué</h1>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Main Content - WHITE */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-regular leading-relaxed">
              <p>
                La Justa nace de la necesidad de decir lo que, en un sistema estructuralmente injusto y corrupto, pocos
                tienen incentivos para decir. La política, los medios, los empresarios, los jueces, los fiscales… todos
                comen del mismo plato y ninguno tiene independencia para romper con los pactos corporativos.
              </p>

              <p>
                Para garantizar nuestra independencia real, adoptamos como política no recibir pauta oficial de ningún
                gobierno nacional, provincial o municipal. Esto incluye a las empresas parcial o totalmente públicas,
                que es el engañapichanga con el que se compran micrófonos sin que se note. Tampoco aceptamos auspicios
                de sindicatos ni de empresas vinculadas al juego o a servicios públicos.
              </p>

              <p className="text-medium font-medium">
                Esto nos diferencia de TODOS los medios y periodistas. Porque no hay ninguno (ese que estás pensando
                tampoco) que no tenga alguna limitación directa o indirecta por el origen del $ que recibe.
              </p>

              <p>
                La Justa te va a incomodar, porque no somos neutrales. No nos da lo mismo la democracia que la
                dictadura. No nos da lo mismo la libertad que el autoritarismo. No nos da lo mismo la igualdad que la
                crueldad. Pero nunca te vamos a manipular, porque sí somos independientes.
              </p>

              <p>
                Podrás estar de acuerdo o no con lo que publicamos, pero nunca vas a dudar de que es lo que pensamos, no
                lo que les conviene a unos u otros o lo que alguien nos paga por publicar… o por no publicar.
              </p>

              <p>
                Y hacemos esto porque no exageramos cuando decimos que la invitación a pensar es urgente. Por eso
                necesitamos de tu apoyo. Sumate a la comunidad de Justicieros. Sumate a la urgencia de pensar con
                profundidad, independencia y claridad.
              </p>

              <div className="text-center py-8">
                <h2 className="text-xlarge mb-4">Sumate a La Justa</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* About La Justa - BLACK */}
      <section className="block-large bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xlarge mb-8">La Justa</h2>
            <div className="space-y-6 text-regular leading-relaxed">
              <p>
                La Justa es la plataforma de contenidos digitales de Natalia Volosin. Datos, investigación y análisis de
                lo que los medios tradicionales no te quieren contar, con la independencia, la claridad y la
                irreverencia de siempre.
              </p>

              <p>
                No recibimos ni vamos a recibir pauta de ningún gobierno ni de empresas vinculadas al juego, servicios
                públicos o sindicatos. Esto nos diferencia de TODOS los medios y periodistas.
              </p>

              <p>
                La Justa te va a incomodar, porque no somos neutrales. Pero nunca te va a manipular, porque sí somos
                independientes. Y porque no exageramos cuando decimos que la invitación a pensar es urgente.
              </p>

              <p className="text-medium font-medium text-gray-300">
                Tu apoyo hace posible el periodismo independiente que Argentina necesita. Convertite en Justicier@ y
                bancá el análisis independiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Support Options - WHITE */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-xlarge mb-6">Apoyá el proyecto</h2>
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

      <Separator className="border-t border-black" />

      {/* Call to Action - BLACK */}
      <section className="block-large bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xlarge mb-6">Convertite en Justicier@</h2>
            <p className="text-medium mb-8">
              Bancá el periodismo independiente que Argentina necesita. Tu apoyo hace la diferencia.
            </p>
            <Link href="https://substack.com/@nataliavolosin" target="_blank">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-none px-8 py-6 text-lg">
                Suscribirse ahora
                <ArrowRight className="ml-2 h-6 w-6" />
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
