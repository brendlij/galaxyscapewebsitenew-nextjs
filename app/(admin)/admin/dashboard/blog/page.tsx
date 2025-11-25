"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
import { getAllBlogPosts, deleteBlogPost, createBlogPost, updateBlogPost, type BlogPost } from "@/lib/api"

export default function AdminBlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthenticated = localStorage.getItem("admin_authenticated")
      if (!isAuthenticated) {
        router.push("/admin/login")
        return
      }
    }

    loadPosts()
  }, [router])

  async function loadPosts() {
    setIsLoading(true)
    const data = await getAllBlogPosts()
    setPosts(data)
    setIsLoading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      coverImageUrl: formData.get("coverImageUrl") as string,
      publishedAt: (formData.get("publishedAt") as string) || new Date().toISOString(),
      published: formData.get("published") === "on",
      tags: (formData.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }

    if (editingPost) {
      await updateBlogPost(editingPost.id, data)
    } else {
      await createBlogPost(data)
    }

    await loadPosts()
    setShowForm(false)
    setEditingPost(null)
  }

  async function handleDelete() {
    if (deleteId) {
      await deleteBlogPost(deleteId)
      await loadPosts()
      setDeleteId(null)
    }
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
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
      <AdminHeader activeTab="blog" />

      <div className="container mx-auto px-4 py-8 md:px-6">
        {showForm || editingPost ? (
          <div>
            <h1 className="mb-6 text-2xl font-light">{editingPost ? "Edit Post" : "New Post"}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      required
                      defaultValue={editingPost?.title}
                      onChange={(e) => {
                        if (!editingPost) {
                          const slugInput = document.getElementById("slug") as HTMLInputElement
                          if (slugInput) {
                            slugInput.value = generateSlug(e.target.value)
                          }
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content (Markdown)</Label>
                    <Textarea
                      id="content"
                      name="content"
                      rows={20}
                      className="font-mono text-sm"
                      placeholder="# Your blog post content..."
                      defaultValue={editingPost?.content}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input id="slug" name="slug" required defaultValue={editingPost?.slug} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={editingPost?.excerpt} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="coverImageUrl">Cover Image URL</Label>
                        <Input
                          id="coverImageUrl"
                          name="coverImageUrl"
                          placeholder="https://..."
                          defaultValue={editingPost?.coverImageUrl}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          name="tags"
                          placeholder="tutorial, astrophotography"
                          defaultValue={editingPost?.tags.join(", ")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="publishedAt">Publish Date</Label>
                        <Input
                          id="publishedAt"
                          name="publishedAt"
                          type="datetime-local"
                          defaultValue={
                            editingPost?.publishedAt
                              ? new Date(editingPost.publishedAt).toISOString().slice(0, 16)
                              : new Date().toISOString().slice(0, 16)
                          }
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch id="published" name="published" defaultChecked={editingPost?.published ?? true} />
                        <Label htmlFor="published">Published</Label>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        setShowForm(false)
                        setEditingPost(null)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      {editingPost ? "Update" : "Publish"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-light">Blog Posts</h1>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="flex items-center gap-4 p-4">
                  <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded bg-muted">
                    <Image
                      src={post.coverImageUrl || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate font-medium">{post.title}</h2>
                      {post.published ? (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setEditingPost(post)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
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
