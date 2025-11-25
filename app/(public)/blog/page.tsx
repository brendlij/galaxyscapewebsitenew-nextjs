import Image from "next/image"
import Link from "next/link"
import { getBlogPosts } from "@/lib/api"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | GalaxyScape",
  description: "Articles about astrophotography, landscape photography, and the Black Forest.",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <FadeIn className="mb-8 md:mb-12">
        <h1 className="font-serif text-3xl font-light tracking-tight md:text-4xl">Blog</h1>
        <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          Thoughts on photography, technique, and the night sky.
        </p>
      </FadeIn>

      <StaggerContainer className="grid gap-8 md:gap-12" staggerDelay={0.1} initialDelay={0.15}>
        {posts.map((post) => (
          <StaggerItem key={post.id}>
            <article className="group">
              <Link href={`/blog/${post.slug}`} className="grid gap-6 md:grid-cols-3 md:gap-8">
                {/* Cover Image */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-muted md:aspect-[3/2]">
                  <Image
                    src={post.coverImageUrl || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center md:col-span-2">
                  <time className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mb-3 font-serif text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="line-clamp-2 text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-colors duration-300 hover:bg-secondary/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
