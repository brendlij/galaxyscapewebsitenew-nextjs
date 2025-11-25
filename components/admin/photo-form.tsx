"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Photo } from "@/lib/api";

interface PhotoFormProps {
  photo?: Photo;
  onSubmit: (data: Partial<Photo>) => Promise<void>;
  onCancel: () => void;
}

export function PhotoForm({ photo, onSubmit, onCancel }: PhotoFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [focusX, setFocusX] = useState(photo?.focusX ?? 50);
  const [focusY, setFocusY] = useState(photo?.focusY ?? 50);
  const [previewUrl, setPreviewUrl] = useState(photo?.imageUrl ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const data: Partial<Photo> = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: (formData.get("imageUrl") as string) || previewUrl,
      thumbnailUrl: (formData.get("imageUrl") as string) || previewUrl,
      aspectRatio:
        Number.parseFloat(formData.get("aspectRatio") as string) || 1.5,
      focusX,
      focusY,
      camera: (formData.get("camera") as string) || undefined,
      lens: (formData.get("lens") as string) || undefined,
      focalLength: (formData.get("focalLength") as string) || undefined,
      aperture: (formData.get("aperture") as string) || undefined,
      iso: (formData.get("iso") as string) || undefined,
      exposureTime: (formData.get("exposureTime") as string) || undefined,
      category: formData.get("category") as Photo["category"],
      featured: formData.get("featured") === "on",
    };

    await onSubmit(data);
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Image & Focus Point */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                placeholder="https://..."
                defaultValue={photo?.imageUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter a URL or upload to your storage
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aspectRatio">Aspect Ratio (width/height)</Label>
              <Input
                id="aspectRatio"
                name="aspectRatio"
                type="number"
                step="0.01"
                placeholder="1.5"
                defaultValue={photo?.aspectRatio ?? 1.5}
              />
            </div>

            {/* Focus Point Selector */}
            <div className="space-y-2">
              <Label>Focus Point (for thumbnails)</Label>
              <div
                className="relative aspect-video cursor-crosshair overflow-hidden rounded-lg border border-border bg-muted"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setFocusX(Math.round(x));
                  setFocusY(Math.round(y));
                }}
              >
                {previewUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                )}
                <div
                  className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent shadow-lg"
                  style={{ left: `${focusX}%`, top: `${focusY}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Click to set focus point: {focusX}%, {focusY}%
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  defaultValue={photo?.title}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  defaultValue={photo?.description}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  defaultValue={photo?.category ?? "astrophotography"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="astrophotography">
                      Astrophotography
                    </SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  name="featured"
                  defaultChecked={photo?.featured}
                />
                <Label htmlFor="featured">Featured photo</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">EXIF Data</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="camera">Camera</Label>
                <Input
                  id="camera"
                  name="camera"
                  placeholder="Sony A7 IV"
                  defaultValue={photo?.camera}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lens">Lens</Label>
                <Input
                  id="lens"
                  name="lens"
                  placeholder="Sony 14mm f/1.8 GM"
                  defaultValue={photo?.lens}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="focalLength">Focal Length</Label>
                <Input
                  id="focalLength"
                  name="focalLength"
                  placeholder="14mm"
                  defaultValue={photo?.focalLength}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aperture">Aperture</Label>
                <Input
                  id="aperture"
                  name="aperture"
                  placeholder="f/1.8"
                  defaultValue={photo?.aperture}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iso">ISO</Label>
                <Input
                  id="iso"
                  name="iso"
                  placeholder="3200"
                  defaultValue={photo?.iso}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exposureTime">Exposure Time</Label>
                <Input
                  id="exposureTime"
                  name="exposureTime"
                  placeholder="25s"
                  defaultValue={photo?.exposureTime}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : photo ? "Update Photo" : "Add Photo"}
        </Button>
      </div>
    </form>
  );
}
