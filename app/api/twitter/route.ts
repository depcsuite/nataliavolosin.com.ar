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
        profile_image_url: "https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg",
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
        profile_image_url: "https://s3.us-east-1.amazonaws.com/nataliavolosin.com.ar/natalia-volosin.jpg",
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
      max_results: 5,
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
      },
    })

    if (!response.ok) {
      console.error(`Twitter API Error: ${response.status} ${response.statusText}`)
      return NextResponse.json(
        { error: `Twitter API Error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error al pedir tweets reales:", error)
    return NextResponse.json(fallbackTweets)
  }
}
