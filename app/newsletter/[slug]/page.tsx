import { allNewsletters } from "contentlayer/generated"
import { notFound } from "next/navigation"
import NewsletterLayout from "../../components/NewsletterLayout"
import { MdxRenderer } from "@/components/mdx-renderer"

interface Props {
  params: {
    slug: string
  }
}

export default async function NewsletterPage({ params }: Props) {
  const { slug } = params

  const newsletter = allNewsletters.find((newsletter) => newsletter.slug === slug)

  if (!newsletter) {
    notFound()
  }

  return (
    <NewsletterLayout newsletter={newsletter}>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 font-garamond">
        {newsletter.title}
      </h1>
      <div className="font-arimo prose dark:prose-invert">
        <MdxRenderer code={newsletter.body.code} />
      </div>
    </NewsletterLayout>
  )
}
