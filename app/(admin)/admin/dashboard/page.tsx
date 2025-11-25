"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Plus, Pencil, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AdminHeader } from "@/components/admin/admin-header"
import { PhotoForm } from "@/components/admin/photo-form"
import { getPhotos, deletePhoto, createPhoto, updatePhoto, type Photo } from "@/lib/api"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    // Check authentication
    if (typeof window !== "undefined") {
      const isAuthenticated = localStorage.getItem("admin_authenticated")
      if (!isAuthenticated) {
        router.push("/admin/login")
        return
      }
    }

    loadPhotos()
  }, [router])

  async function loadPhotos() {
    setIsLoading(true)
    const data = await getPhotos()
    setPhotos(data)
    setIsLoading(false)
  }

  async function handleSubmit(data: Partial<Photo>) {
    if (editingPhoto) {
      await updatePhoto(editingPhoto.id, data)
    } else {
      await createPhoto(data as Omit<Photo, "id" | "collectionId" | "collectionName" | "created" | "updated">)
    }
    await loadPhotos()
    setShowForm(false)
    setEditingPhoto(null)
  }

  async function handleDelete() {
    if (deleteId) {
      await deletePhoto(deleteId)
      await loadPhotos()
      setDeleteId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AdminHeader activeTab="photos" />

      <div className="container mx-auto px-4 py-8 md:px-6">
        {showForm || editingPhoto ? (
          <div>
            <h1 className="mb-6 text-2xl font-light">{editingPhoto ? "Edit Photo" : "Add New Photo"}</h1>
            <PhotoForm
              photo={editingPhoto || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false)
                setEditingPhoto(null)
              }}
            />
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-light">Photos</h1>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Photo
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {photos.map((photo) => (
                <Card key={photo.id} className="group overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={photo.thumbnailUrl || "/placeholder.svg"}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                    {photo.featured && (
                      <div className="absolute left-2 top-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button size="sm" variant="secondary" onClick={() => setEditingPhoto(photo)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setDeleteId(photo.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-medium">{photo.title}</p>
                    <p className="text-xs capitalize text-muted-foreground">{photo.category}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Photo</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this photo? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
