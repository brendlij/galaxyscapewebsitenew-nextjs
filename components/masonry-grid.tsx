"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Photo } from "@/lib/api";

interface MasonryGridProps {
  photos: Photo[];
}

export function MasonryGrid({ photos }: MasonryGridProps) {
  const [columns, setColumns] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(3);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Distribute photos across columns for masonry effect
  const columnArrays: Photo[][] = Array.from({ length: columns }, () => []);
  const columnHeights: number[] = Array(columns).fill(0);

  photos.forEach((photo) => {
    // Find the shortest column
    const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
    columnArrays[shortestColumn].push(photo);
    // Add height based on aspect ratio (inverse for vertical space)
    columnHeights[shortestColumn] += 1 / photo.aspectRatio;
  });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="grid gap-4 md:gap-6"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {columnArrays.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4 md:gap-6">
          {column.map((photo, photoIndex) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={columnIndex * 10 + photoIndex}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
}

interface PhotoCardProps {
  photo: Photo;
  index: number;
}

function PhotoCard({ photo, index }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.03,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <Link
        href={`/photo/${photo.id}`}
        className="group relative block overflow-hidden rounded-sm bg-muted"
        style={{ aspectRatio: photo.aspectRatio }}
      >
        <Image
          src={photo.thumbnailUrl || "/placeholder.svg"}
          alt={photo.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            objectPosition: `${photo.focusX}% ${photo.focusY}%`,
          }}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Blur placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-muted" />
        )}

        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
          <div className="p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <h3 className="font-light text-lg text-white tracking-wide">
              {photo.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
