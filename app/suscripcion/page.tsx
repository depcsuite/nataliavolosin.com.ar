import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function SubscriptionPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <section className="mb-12 text-center">
        <h1 className="text-massive font-garamond font-bold">Elige tu Plan</h1>
        <p className="text-regular text-muted-foreground mt-4 max-w-2xl mx-auto">
          Accede a contenido exclusivo y análisis profundos con el plan que mejor se adapte a ti.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
        <Card className="flex flex-col justify-between shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-large font-garamond font-bold">Gratuito</CardTitle>
            <p className="text-huge font-bold mt-2">
              $0<span className="text-regular text-muted-foreground">/mes</span>
            </p>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2 text-regular">
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                Acceso a newsletters básicos
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                Videos públicos
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-transparent" variant="outline">
              Registrarse Gratis
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col justify-between border-2 border-primary shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-large font-garamond font-bold">Mensual</CardTitle>
            <p className="text-huge font-bold mt-2">
              $5<span className="text-regular text-muted-foreground">/mes</span>
            </p>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2 text-regular">
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                Todos los newsletters
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                Videos exclusivos
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                Acceso anticipado a contenido
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Suscribirse Mensual</Button>
          </CardFooter>
        </Card>
      </section>

      <Separator className="my-12" />

      <section className="py-12 md:py-20 bg-brand-light-gray dark:bg-brand-dark-gray rounded-lg text-center">
        <h2 className="text-xlarge font-garamond font-bold mb-6">¿Tienes preguntas?</h2>
        <p className="text-regular max-w-2xl mx-auto mb-8">
          Si tienes alguna duda sobre los planes o el contenido, no dudes en contactarme.
        </p>
        <Button size="lg" variant="outline">
          Contactar
        </Button>
      </section>
    </div>
  )
}
