import { type NextRequest, NextResponse } from "next/server"

// Interfaz para la respuesta de la API de Twitter
interface TwitterApiResponse {
  data: Array<{
    id: string
    text: string
    created_at: string
    public_metrics: {
      retweet_count: number
      like_count: number
      reply_count: number
      quote_count: number
    }
    author: {
      name: string
      username: string
      profile_image_url: string
    }
  }>
}

const fallbackTweets: TwitterApiResponse = {
  data: [
    {
      id: "1",
      text: "Analizando las implicancias de la posible anulación del decomiso en el caso Vialidad. #PensarEsUrgente",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Hace 2 h
      public_metrics: {
        retweet_count: 37,
        like_count: 152,
        reply_count: 12,
        quote_count: 4,
      },
      author: {
        name: "Natalia Volosin",
        username: "nataliavolosin",
        profile_image_url: "/natalia-volosin.jpg",
      },
    },
    {
      id: "2",
      text: "La transparencia es una herramienta concreta de gobernanza, no un slogan vacío.",
      created_at: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // Hace 26 h
      public_metrics: {
        retweet_count: 61,
        like_count: 243,
        reply_count: 18,
        quote_count: 9,
      },
      author: {
        name: "Natalia Volosin",
        username: "nataliavolosin",
        profile_image_url: "/natalia-volosin.jpg",
      },
    },
    {
      id: "3",
      text: "El sistema judicial argentino necesita reformas estructurales profundas. No podemos seguir con parches.",
      created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // Hace 48 h
      public_metrics: {
        retweet_count: 89,
        like_count: 312,
        reply_count: 45,
        quote_count: 12,
      },
      author: {
        name: "Natalia Volosin",
        username: "nataliavolosin",
        profile_image_url: "/natalia-volosin.jpg",
      },
    },
    {
      id: "4",
      text: "Nuevo análisis sobre criminalidad económica disponible en La Justa. Los datos que no te cuentan los medios tradicionales.",
      created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // Hace 72 h
      public_metrics: {
        retweet_count: 124,
        like_count: 456,
        reply_count: 67,
        quote_count: 23,
      },
      author: {
        name: "Natalia Volosin",
        username: "nataliavolosin",
        profile_image_url: "/natalia-volosin.jpg",
      },
    },
  ],
}

export async function GET(request: NextRequest) {
  try {
    // En un entorno de producción, estas variables vendrían de las variables de entorno
    const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN

    if (!TWITTER_BEARER_TOKEN) {
      console.log("TWITTER_BEARER_TOKEN no configurado — usando datos de fallback")
      return NextResponse.json(fallbackTweets)
    }

    const endpointURL = "https://api.twitter.com/2/users/14539495/tweets"

    const params = {
      max_results: "5",
      "tweet.fields": "created_at,public_metrics",
      expansions: "author_id",
      "user.fields": "profile_image_url,name,username",
    }

    const queryString = new URLSearchParams(params).toString()
    const url = `${endpointURL}?${queryString}`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error(`Twitter API Error: ${response.status} ${response.statusText}`)
      console.log("Usando datos de fallback debido a error de API")
      return NextResponse.json(fallbackTweets)
    }

    const data = await response.json()

    // Transform the data to include author information
    if (data.data && data.includes?.users) {
      const author = data.includes.users[0]
      data.data = data.data.map((tweet: any) => ({
        ...tweet,
        author: {
          name: author.name,
          username: author.username,
          profile_image_url: author.profile_image_url,
        },
      }))
    } else {
      // Si no hay datos válidos, usar fallback
      console.log("Datos de Twitter API incompletos — usando datos de fallback")
      return NextResponse.json(fallbackTweets)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error al pedir tweets reales:", error)
    console.log("Usando datos de fallback debido a excepción")
    return NextResponse.json(fallbackTweets)
  }
}
