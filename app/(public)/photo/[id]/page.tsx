import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getPhotoById, getPhotos } from "@/lib/api"
import { ExifDisplay } from "@/components/exif-display"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in"
import type { Metadata } from "next"

interface PhotoPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PhotoPageProps): Promise<Metadata> {
  const { id } = await params
  const photo = await getPhotoById(id)

  if (!photo) {
    return { title: "Photo Not Found | GalaxyScape" }
  }

  return {
    title: `${photo.title} | GalaxyScape`,
    description: photo.description,
  }
}

export async function generateStaticParams() {
  const photos = await getPhotos()
  return photos.map((photo) => ({ id: photo.id }))
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = await params
  const photo = await getPhotoById(id)

  if (!photo) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <FadeIn delay={0.05}>
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Gallery
        </Link>
      </FadeIn>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <FadeIn className="lg:col-span-2" delay={0.1} duration={0.6}>
          <div className="relative overflow-hidden rounded-sm bg-muted" style={{ aspectRatio: photo.aspectRatio }}>
            <Image
              src={photo.imageUrl || "/placeholder.svg"}
              alt={photo.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-contain"
            />
          </div>
        </FadeIn>

        <StaggerContainer className="flex flex-col gap-6" staggerDelay={0.08} initialDelay={0.2}>
          <StaggerItem>
            <div>
              <h1 className="mb-4 font-serif text-3xl font-light tracking-tight md:text-4xl">{photo.title}</h1>
              <p className="leading-relaxed text-muted-foreground">{photo.description}</p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <ExifDisplay photo={photo} />
          </StaggerItem>

          <StaggerItem className="mt-auto pt-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Category</p>
            <p className="mt-1 text-sm capitalize text-foreground">
              {photo.category === "both" ? "Astro & Landscape" : photo.category}
            </p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  )
}
