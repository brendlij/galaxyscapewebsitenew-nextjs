import { getPhotos } from "@/lib/api"
import { MasonryGrid } from "@/components/masonry-grid"
import { FadeIn } from "@/components/fade-in"

export default async function HomePage() {
  const photos = await getPhotos()

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <FadeIn className="mb-8 md:mb-12" delay={0.1}>
        <h1 className="sr-only">GalaxyScape Photography Gallery</h1>
        <p className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          Astrophotography and landscapes from the Black Forest, Germany.
        </p>
      </FadeIn>

      <MasonryGrid photos={photos} />
    </div>
  )
}
