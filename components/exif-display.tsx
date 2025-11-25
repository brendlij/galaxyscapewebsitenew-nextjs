import type React from "react"
import type { Photo } from "@/lib/api"
import { Camera, Aperture, Timer, Gauge } from "lucide-react"

interface ExifDisplayProps {
  photo: Photo
}

interface ExifItemProps {
  icon: React.ReactNode
  label: string
  value: string | undefined
}

function ExifItem({ icon, label, value }: ExifItemProps) {
  if (!value) return null

  return (
    <div className="flex items-center gap-3">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  )
}

export function ExifDisplay({ photo }: ExifDisplayProps) {
  const hasExifData =
    photo.camera || photo.lens || photo.focalLength || photo.aperture || photo.iso || photo.exposureTime

  if (!hasExifData) return null

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">Technical Details</h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ExifItem icon={<Camera className="h-4 w-4" />} label="Camera" value={photo.camera} />
        <ExifItem icon={<Camera className="h-4 w-4" />} label="Lens" value={photo.lens} />
        <ExifItem icon={<Aperture className="h-4 w-4" />} label="Focal Length" value={photo.focalLength} />
        <ExifItem icon={<Aperture className="h-4 w-4" />} label="Aperture" value={photo.aperture} />
        <ExifItem icon={<Gauge className="h-4 w-4" />} label="ISO" value={photo.iso} />
        <ExifItem icon={<Timer className="h-4 w-4" />} label="Exposure" value={photo.exposureTime} />
      </div>
    </div>
  )
}
