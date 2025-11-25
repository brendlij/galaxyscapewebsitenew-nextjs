import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/api"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found | GalaxyScape" }
  }

  return {
    title: `${post.title} | GalaxyScape`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {/* Cover Image */}
      <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-sm bg-muted">
        <Image
          src={post.coverImageUrl || "/placeholder.svg"}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Header */}
      <header className="mb-8 max-w-3xl">
        <time className="mb-4 block text-xs uppercase tracking-wider text-muted-foreground">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="font-serif text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">{post.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-3xl">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  )
}
