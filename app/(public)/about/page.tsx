import Image from "next/image"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | GalaxyScape",
  description: "Learn about Julian Brendlin, the astrophotographer and landscape photographer behind GalaxyScape.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn delay={0.1} duration={0.7} direction="left">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted lg:aspect-auto lg:min-h-[600px]">
            <Image
              src="/photographer-silhouette-night-sky-camera-tripod.jpg"
              alt="Julian Brendlin photographing the night sky"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </FadeIn>

        <StaggerContainer className="flex flex-col justify-center" staggerDelay={0.08} initialDelay={0.15}>
          <StaggerItem>
            <h1 className="mb-6 font-serif text-3xl font-light tracking-tight md:text-4xl lg:text-5xl">About</h1>
          </StaggerItem>

          <StaggerItem>
            <div className="space-y-6 font-serif text-lg leading-8 text-foreground/90">
              <p>
                I'm Julian Brendlin, an astrophotographer and landscape photographer based in the heart of the Black
                Forest, Germany. What began as childhood wonder gazing at the stars has evolved into a lifelong pursuit
                of capturing the cosmos.
              </p>

              <p>
                The Black Forest, or <em>Schwarzwald</em>, provides the perfect canvas for my work. Its ancient
                woodlands, misty valleys, and surprisingly dark skies offer endless opportunities to blend terrestrial
                and celestial beauty.
              </p>

              <p>
                My approach is patient and deliberate. A single image might represent hours of exposure time, careful
                planning around moon phases and weather, and sometimes months of waiting for the right conditions. I
                believe the best photographs aren't taken—they're earned.
              </p>

              <p>
                When I'm not behind the camera, I'm likely hiking the forest trails, experimenting with new processing
                techniques, or helping fellow photographers discover their own dark sky locations.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10 border-t border-border pt-10">
              <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">Equipment</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="transition-colors duration-300 hover:text-foreground">
                  Sony A7 IV (Full Spectrum Modified)
                </li>
                <li className="transition-colors duration-300 hover:text-foreground">Sony 14mm f/1.8 GM</li>
                <li className="transition-colors duration-300 hover:text-foreground">Sony 24-70mm f/2.8 GM II</li>
                <li className="transition-colors duration-300 hover:text-foreground">Takahashi FSQ-85ED Refractor</li>
                <li className="transition-colors duration-300 hover:text-foreground">Sky-Watcher EQ6-R Pro Mount</li>
              </ul>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10 border-t border-border pt-10">
              <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">Contact</h2>
              <p className="text-sm text-muted-foreground">
                For print inquiries, collaborations, or just to say hello:
              </p>
              <a
                href="mailto:hello@galaxyscape.com"
                className="mt-2 inline-block text-foreground underline underline-offset-4 transition-colors duration-300 hover:text-accent"
              >
                hello@galaxyscape.com
              </a>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  )
}
