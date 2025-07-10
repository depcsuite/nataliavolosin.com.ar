"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function AboutPage() {
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
            <Link href="/sobre-mi" className="text-black hover:text-gray-700 font-medium uppercase font-bold">
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

      {/* Hero Section */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl">
            <h1 className="text-huge mb-8">Sobre mí</h1>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Bio Section */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-xlarge mb-8">Natalia Volosin</h2>
              <div className="space-y-6 text-regular">
                <p>
                  Natalia Volosin es abogada (2004), consultora, académica y comunicadora. Es diploma de honor magna cum
                  laude y class valedictorian, LL.M. (Master of Laws) por Yale Law School en 2009 y J.S.D. (Doctor of
                  the Science of Law) por la misma institución en 2018.
                </p>
                <p>
                  Se formó como penalista en el estudio Arslanian, Beraldi, Kaminker & Asociados, fue consultora de
                  entidades académicas, organismos públicos, ONGs y organizaciones internacionales y durante 10 años
                  lideró investigaciones complejas de criminalidad económica en la Procuración General de la Nación.
                </p>
                <p>
                  Fue profesora en la Universidad de Buenos Aires, Universidad Di Tella, Universidad de Palermo,
                  Universidad de San Andrés, Universidad Nacional de La Plata y Universidad Nacional de San Martín.
                </p>
              </div>

              {/* Photo for mobile - visible only on small screens */}
              <div className="md:hidden mt-8">
                <div className="relative w-full max-w-sm mx-auto">
                  <Image
                    src="/images/natalia-volosin.jpg"
                    alt="Natalia Volosin"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Photo for desktop - visible only on medium screens and up */}
              <div className="hidden md:block">
                <div className="relative w-full">
                  <Image
                    src="/images/natalia-volosin.jpg"
                    alt="Natalia Volosin"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                    priority
                  />
                </div>
              </div>

              <div className="bg-black text-white p-12">
                <h3 className="text-large mb-6">Publicaciones</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-medium mb-2">Corruption in Argentina: Towards an Institutional Approach</h4>
                    <p className="text-regular mb-4">ROUTLEDGE • 2019</p>
                    <p className="text-small mb-4">
                      Una investigación histórica, institucional y sectorial sobre la corrupción estructural en la
                      Argentina. Análisis académico riguroso basado en años de investigación en Yale Law School.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-medium mb-2">La Máquina de la Corrupción</h4>
                    <p className="text-regular mb-4">SUDAMERICANA • 2019</p>
                    <p className="text-small mb-4">
                      Una versión de divulgación en español sobre los mecanismos de corrupción y las herramientas para
                      combatirla. Accesible para el público general argentino.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-t border-black" />

      {/* Mission Statement */}
      <section className="block-large bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-xlarge mb-8">Mi misión</h2>
            <div className="space-y-6 text-regular">
              <p>
                "La Justa" nace de la necesidad de decir lo que, en un sistema estructuralmente injusto y corrupto,
                pocos tienen incentivos para decir. Mi objetivo es generar contenido independiente, riguroso y accesible
                sobre los temas que realmente importan.
              </p>
              <p>
                No somos neutrales. No nos da lo mismo la democracia que la dictadura, la libertad que el autoritarismo,
                la igualdad que la crueldad. Pero nunca te va a manipular, porque sí somos independientes.
              </p>
              <blockquote className="border-l-4 border-black pl-6 py-2 my-8 text-medium italic">
                "El periodismo independiente es fundamental para la democracia. Tu apoyo hace posible que podamos seguir
                investigando, analizando y contando la verdad sin compromisos."
              </blockquote>
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
