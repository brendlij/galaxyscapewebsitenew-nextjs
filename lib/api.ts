// Mock API layer structured for PocketBase compatibility
// Interfaces match PocketBase response schema for easy migration

const PB_URL = process.env.NEXT_PUBLIC_PB_URL || "http://localhost:8090";

export interface PocketBaseRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
}

export interface Photo extends PocketBaseRecord {
  title: string;
  description: string;
  // Image URL - abstracted for R2/storage migration
  imageUrl: string;
  thumbnailUrl: string;
  // Aspect ratio for masonry layout (width/height)
  aspectRatio: number;
  // Focus point for thumbnail cropping (0-100 for x and y)
  focusX: number;
  focusY: number;
  // EXIF data - all optional
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  iso?: string;
  exposureTime?: string;
  // Category
  category: "astrophotography" | "landscape" | "both";
  // Featured flag
  featured: boolean;
}

export interface BlogPost extends PocketBaseRecord {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown content
  coverImageUrl: string;
  publishedAt: string;
  published: boolean;
  tags: string[];
}

// Mock data
const mockPhotos: Photo[] = [
  {
    id: "photo_001",
    collectionId: "photos",
    collectionName: "photos",
    created: "2024-01-15T10:30:00.000Z",
    updated: "2024-01-15T10:30:00.000Z",
    title: "Milky Way over Black Forest",
    description:
      "The galactic core rising above the ancient pines of the Schwarzwald. Captured during a moonless night in late summer when the Milky Way arches perfectly over the forest canopy.",
    imageUrl: "/milky-way-galaxy-night-sky-stars-astrophotography.jpg",
    thumbnailUrl: "/milky-way-galaxy-night-sky-stars-astrophotography.jpg",
    aspectRatio: 0.667,
    focusX: 50,
    focusY: 30,
    camera: "Sony A7 IV",
    lens: "Sony 14mm f/1.8 GM",
    focalLength: "14mm",
    aperture: "f/1.8",
    iso: "3200",
    exposureTime: "25s",
    category: "astrophotography",
    featured: true,
  },
  {
    id: "photo_002",
    collectionId: "photos",
    collectionName: "photos",
    created: "2024-02-20T14:00:00.000Z",
    updated: "2024-02-20T14:00:00.000Z",
    title: "Orion Nebula",
    description:
      "A deep-sky capture of M42, the Great Orion Nebula. This stellar nursery lies approximately 1,344 light-years from Earth and is one of the brightest nebulae visible to the naked eye.",
    imageUrl: "/orion-nebula-deep-space-astrophotography-colorful.jpg",
    thumbnailUrl: "/orion-nebula-deep-space-astrophotography-colorful.jpg",
    aspectRatio: 1,
    focusX: 50,
    focusY: 50,
    camera: "Sony A7 IV",
    lens: "William Optics RedCat 51",
    focalLength: "250mm",
    aperture: "f/4.9",
    iso: "800",
    exposureTime: "180s (stacked)",
    category: "astrophotography",
    featured: true,
  },
  {
    id: "photo_003",
    collectionId: "photos",
    collectionName: "photos",
    created: "2024-03-10T08:00:00.000Z",
    updated: "2024-03-10T08:00:00.000Z",
    title: "Feldberg Sunrise",
    description:
      "Golden light breaking through morning mist at Feldberg, the highest peak in the Black Forest. The interplay of fog and early light creates an ethereal atmosphere.",
    imageUrl: "/sunrise-mountain-fog-landscape-golden-hour.jpg",
    thumbnailUrl: "/sunrise-mountain-fog-landscape-golden-hour.jpg",
    aspectRatio: 1.5,
    focusX: 50,
    focusY: 40,
    camera: "Sony A7 IV",
    lens: "Sony 24-70mm f/2.8 GM II",
    focalLength: "35mm",
    aperture: "f/8",
    iso: "100",
    exposureTime: "1/125s",
    category: "landscape",
    featured: true,
  },
  {
    id: "photo_004",
    collectionId: "photos",
    collectionName: "photos",
    created: "2024-04-05T22:00:00.000Z",
    updated: "2024-04-05T22:00:00.000Z",
    title: "Andromeda Galaxy",
    description:
      "Our nearest galactic neighbor, M31. This image represents over 8 hours of integration time, revealing the intricate dust lanes and satellite galaxies.",
    imageUrl: "/andromeda-galaxy-m31-deep-space-astrophotography.jpg",
    thumbnailUrl: "/andromeda-galaxy-m31-deep-space-astrophotography.jpg",
    aspectRatio: 1.33,
    focusX: 50,
    focusY: 50,
    camera: "Sony A7 IV (modified)",
    lens: "Takahashi FSQ-85ED",
    focalLength: "450mm",
    aperture: "f/5.3",
    iso: "1600",
    exposureTime: "300s (96 subs)",
    category: "astrophotography",
    featured: false,
  },
  {
    id: "photo_005",
    collectionId: "photos",
    collectionName: "photos",
    created: "2024-04-20T06:30:00.000Z",
    updated: "2024-04-20T06:30:00.000Z",
    title: "Forest Cathedral",
    description:
      "Ancient beech trees reaching toward the heavens in the heart of the Black Forest. The morning light filtering through the canopy creates a cathedral-like atmosphere.",
    imageUrl: "/forest-trees-tall-beech-sunlight-rays-cathedral.jpg",
    thumbnailUrl: "/forest-trees-tall-beech-sunlight-rays-cathedral.jpg",
    aspectRatio: 0.643,
    focusX: 50,
    focusY: 30,
    camera: "Sony A7 IV",
    lens: "Sony 16-35mm f/2.8 GM",
    focalLength: "16mm",
    aperture: "f/11",
    iso: "400",
    exposureTime: "1/30s",
    category: "landscape",
    featured: false,
  },
  {
    id: "photo_006",
    collectionId: "photos",
    collectionName: "photos",
    created: "2024-05-15T23:30:00.000Z",
    updated: "2024-05-15T23:30:00.000Z",
    title: "Star Trails over Titisee",
    description:
      "A 3-hour exposure capturing the rotation of Earth reflected in the still waters of Titisee lake. The circular star trails center on Polaris, the North Star.",
    imageUrl: "/star-trails-long-exposure-lake-reflection-night.jpg",
    thumbnailUrl: "/star-trails-long-exposure-lake-reflection-night.jpg",
    aspectRatio: 1.5,
    focusX: 50,
    focusY: 40,
    camera: "Sony A7 IV",
    lens: "Sony 14mm f/1.8 GM",
    focalLength: "14mm",
    aperture: "f/4",
    iso: "400",
    exposureTime: "30s x 360",
    category: "both",
    featured: true,
  },
  {
    id: "photo_007",
    collectionId: "photos",
    collectionName: "photos",
    created: "2024-06-01T04:00:00.000Z",
    updated: "2024-06-01T04:00:00.000Z",
    title: "Comet NEOWISE",
    description:
      "Comet C/2020 F3 (NEOWISE) gracing the northern sky in July 2020. A once-in-a-lifetime capture of this magnificent visitor from the outer solar system.",
    imageUrl: "/comet-neowise-night-sky-stars-astrophotography.jpg",
    thumbnailUrl: "/comet-neowise-night-sky-stars-astrophotography.jpg",
    aspectRatio: 1.5,
    focusX: 60,
    focusY: 30,
    camera: "Sony A7 III",
    lens: "Sony 70-200mm f/2.8 GM",
    focalLength: "135mm",
    aperture: "f/2.8",
    iso: "1600",
    exposureTime: "4s",
    category: "astrophotography",
    featured: false,
  },
  {
    id: "photo_008",
    collectionId: "photos",
    collectionName: "photos",
    created: "2024-06-20T19:00:00.000Z",
    updated: "2024-06-20T19:00:00.000Z",
    title: "Black Forest Waterfall",
    description:
      "The Triberg Waterfalls during spring melt, cascading 163 meters through moss-covered rocks. Long exposure smooths the water into silk.",
    imageUrl: "/waterfall-long-exposure-forest-moss-rocks.jpg",
    thumbnailUrl: "/waterfall-long-exposure-forest-moss-rocks.jpg",
    aspectRatio: 0.625,
    focusX: 50,
    focusY: 50,
    camera: "Sony A7 IV",
    lens: "Sony 24-70mm f/2.8 GM II",
    focalLength: "50mm",
    aperture: "f/16",
    iso: "50",
    exposureTime: "30s",
    category: "landscape",
    featured: false,
  },
];

const mockBlogPosts: BlogPost[] = [
  {
    id: "post_001",
    collectionId: "blog",
    collectionName: "blog",
    created: "2024-11-01T10:00:00.000Z",
    updated: "2024-11-01T10:00:00.000Z",
    title: "Chasing the Milky Way: A Guide to Black Forest Dark Sites",
    slug: "chasing-milky-way-black-forest-dark-sites",
    excerpt:
      "Discover the best locations in the Black Forest for astrophotography, from hidden clearings to mountain peaks with minimal light pollution.",
    content: `# Chasing the Milky Way: A Guide to Black Forest Dark Sites

The Black Forest, or *Schwarzwald*, offers some of the darkest skies in Germany. After years of exploring these ancient woodlands with my camera, I've discovered numerous locations perfect for capturing the cosmos.

## Why the Black Forest?

The combination of elevation, forest cover that blocks nearby light pollution, and relatively sparse population makes this region ideal for astrophotography. The best conditions occur during new moon phases from March through October.

## My Top Locations

### 1. Feldberg Summit
At 1,493 meters, Feldberg provides unobstructed horizon views. The parking area near the Feldbergturm offers easy access, though you'll want to hike slightly away from the tower's lights.

### 2. Schluchsee Clearings
The clearings around Schluchsee lake offer beautiful foreground opportunities with the Milky Way reflecting in still waters during calm nights.

### 3. Belchen
Often overlooked in favor of Feldberg, Belchen offers equally dark skies with fewer visitors. The summit meadows provide 360-degree views.

## Essential Gear

For successful night photography in the Black Forest, I recommend:

- A fast wide-angle lens (f/1.4 to f/2.8)
- Sturdy tripod (wind can be fierce at elevation)
- Headlamp with red light mode
- Warm layers (temperatures drop significantly at night)
- Bear spray (just kidding, no bears here!)

## Planning Your Shoot

Check these resources before heading out:

1. **Moon phase calendars** - New moon ±5 days is ideal
2. **Weather forecasts** - Clear skies are essential
3. **Light pollution maps** - Verify dark site conditions
4. **Stellarium or PhotoPills** - Plan your composition

The magic happens when preparation meets opportunity. Clear nights are precious here, so when the conditions align, don't hesitate—the cosmos awaits.

---

*Have questions about specific locations? Feel free to reach out through the contact page.*`,
    coverImageUrl: "/milky-way-over-forest-night-landscape-astrophotogr.jpg",
    publishedAt: "2024-11-01T10:00:00.000Z",
    published: true,
    tags: ["astrophotography", "tutorial", "black forest", "dark sites"],
  },
  {
    id: "post_002",
    collectionId: "blog",
    collectionName: "blog",
    created: "2024-10-15T14:00:00.000Z",
    updated: "2024-10-15T14:00:00.000Z",
    title: "The Art of Image Stacking: Reducing Noise in Deep Sky Photography",
    slug: "art-of-image-stacking-deep-sky-photography",
    excerpt:
      "Learn how combining multiple exposures can dramatically improve your astrophotography, revealing faint details hidden in single frames.",
    content: `# The Art of Image Stacking: Reducing Noise in Deep Sky Photography

When I first started photographing deep sky objects, I was frustrated by the grainy results. Single exposures, even long ones, couldn't capture the faint details I saw in other photographers' work. Then I discovered stacking.

## What is Image Stacking?

Image stacking is the process of combining multiple exposures of the same subject to reduce noise and enhance signal. The principle is simple: while the celestial signal remains constant across frames, random noise does not.

## The Mathematics of Noise Reduction

The signal-to-noise ratio (SNR) improves with the square root of the number of frames:

$$SNR_{stacked} = SNR_{single} \\times \\sqrt{n}$$

This means:
- 4 frames = 2x noise reduction
- 16 frames = 4x noise reduction
- 64 frames = 8x noise reduction

## My Workflow

### Capture Phase
1. Take as many light frames as possible
2. Capture calibration frames (darks, flats, bias)
3. Use consistent settings throughout

### Processing Phase
1. Load frames into stacking software (I use PixInsight)
2. Apply calibration frames
3. Align and register images
4. Stack using sigma clipping to remove satellites and aircraft

## Real World Example

My Andromeda Galaxy image combined 96 individual 5-minute exposures—8 hours of total integration time. The difference between a single frame and the final stack is remarkable.

## Getting Started

You don't need expensive software to begin. DeepSkyStacker is free and handles most situations well. Start with 20-30 frames and work up from there.

The night sky rewards patience. Each additional frame brings you closer to revealing the universe's hidden beauty.`,
    coverImageUrl: "/nebula-deep-space-colorful-astrophotography.jpg",
    publishedAt: "2024-10-15T14:00:00.000Z",
    published: true,
    tags: ["tutorial", "processing", "deep sky", "technique"],
  },
  {
    id: "post_003",
    collectionId: "blog",
    collectionName: "blog",
    created: "2024-09-20T09:00:00.000Z",
    updated: "2024-09-20T09:00:00.000Z",
    title: "Autumn Light: Capturing the Black Forest in Fall Colors",
    slug: "autumn-light-black-forest-fall-colors",
    excerpt:
      "The fleeting weeks of autumn transform the Black Forest into a tapestry of gold and amber. Here are my favorite locations and techniques.",
    content: `# Autumn Light: Capturing the Black Forest in Fall Colors

There's a brief window each year when the Black Forest transforms. The evergreen pines, which dominate the landscape, are suddenly punctuated by brilliant displays of gold, amber, and crimson from the deciduous trees scattered throughout.

## Timing is Everything

Peak autumn colors in the Black Forest typically occur:
- **Lower elevations (400-600m)**: Late October to early November
- **Mid elevations (600-900m)**: Mid to late October  
- **Higher elevations (900m+)**: Early to mid October

I track the progression each year, moving up in elevation as the season advances.

## Favorite Autumn Locations

### Wutach Gorge
The steep walls of this primeval gorge concentrate color in dramatic ways. Morning mist adds an ethereal quality.

### Mummelsee
The dark waters of this glacial lake create perfect reflections of the surrounding autumn foliage.

### Allerheiligen Waterfalls
Cascading water framed by golden beech trees—classic Black Forest scenery at its finest.

## Technical Approach

For autumn landscapes, I typically use:
- Polarizing filter to reduce glare and saturate colors
- Focus stacking for front-to-back sharpness
- Bracketed exposures for high dynamic range scenes

The soft, diffused light of overcast days often works better than harsh sunlight, allowing the natural colors to shine without extreme contrast.

## Embrace the Weather

Some of my favorite autumn images came from "bad weather" days. Fog, mist, and light rain add mood and atmosphere that sunny days simply can't provide.

Don't pack away your camera when clouds roll in—that's when the magic often happens.`,
    coverImageUrl: "/autumn-forest-golden-leaves-fog-landscape.jpg",
    publishedAt: "2024-09-20T09:00:00.000Z",
    published: true,
    tags: ["landscape", "autumn", "black forest", "nature"],
  },
];

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Photo API
export async function getPhotos(): Promise<Photo[]> {
  try {
    const response = await fetch(
      `${PB_URL}/api/collections/photos/records?sort=-created`
    );
    if (!response.ok) throw new Error("Failed to fetch photos");

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Failed to fetch photos from PocketBase:", error);
    return mockPhotos; // Fallback to mock data
  }
}

export async function getFeaturedPhotos(): Promise<Photo[]> {
  try {
    const response = await fetch(
      `${PB_URL}/api/collections/photos/records?filter=(featured=true)&sort=-created`
    );
    if (!response.ok) throw new Error("Failed to fetch featured photos");

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Failed to fetch featured photos:", error);
    return mockPhotos.filter((p) => p.featured);
  }
}

export async function getPhotoById(id: string): Promise<Photo | null> {
  try {
    const response = await fetch(
      `${PB_URL}/api/collections/photos/records/${id}`
    );
    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch photo:", error);
    return mockPhotos.find((p) => p.id === id) || null;
  }
}

export async function getPhotosByCategory(
  category: Photo["category"]
): Promise<Photo[]> {
  try {
    const filter =
      category === "both"
        ? `(category="both")`
        : `(category="${category}" || category="both")`;
    const response = await fetch(
      `${PB_URL}/api/collections/photos/records?filter=${encodeURIComponent(
        filter
      )}&sort=-created`
    );
    if (!response.ok) throw new Error("Failed to fetch photos by category");

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Failed to fetch photos by category:", error);
    return mockPhotos.filter(
      (p) => p.category === category || p.category === "both"
    );
  }
}

// Blog API
export async function getBlogPosts(): Promise<BlogPost[]> {
  await delay(100);
  return mockBlogPosts
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  await delay(100);
  return mockBlogPosts.find((p) => p.slug === slug && p.published) || null;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  await delay(100);
  return mockBlogPosts.sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );
}

// Admin API (mock mutations)
export async function createPhoto(
  data: Omit<Photo, keyof PocketBaseRecord>
): Promise<Photo> {
  await delay(200);
  const newPhoto: Photo = {
    ...data,
    id: `photo_${Date.now()}`,
    collectionId: "photos",
    collectionName: "photos",
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  };
  mockPhotos.push(newPhoto);
  return newPhoto;
}

export async function updatePhoto(
  id: string,
  data: Partial<Photo>
): Promise<Photo | null> {
  await delay(200);
  const index = mockPhotos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  mockPhotos[index] = {
    ...mockPhotos[index],
    ...data,
    updated: new Date().toISOString(),
  };
  return mockPhotos[index];
}

export async function deletePhoto(id: string): Promise<boolean> {
  await delay(200);
  const index = mockPhotos.findIndex((p) => p.id === id);
  if (index === -1) return false;
  mockPhotos.splice(index, 1);
  return true;
}

export async function createBlogPost(
  data: Omit<BlogPost, keyof PocketBaseRecord>
): Promise<BlogPost> {
  await delay(200);
  const newPost: BlogPost = {
    ...data,
    id: `post_${Date.now()}`,
    collectionId: "blog",
    collectionName: "blog",
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  };
  mockBlogPosts.push(newPost);
  return newPost;
}

export async function updateBlogPost(
  id: string,
  data: Partial<BlogPost>
): Promise<BlogPost | null> {
  await delay(200);
  const index = mockBlogPosts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  mockBlogPosts[index] = {
    ...mockBlogPosts[index],
    ...data,
    updated: new Date().toISOString(),
  };
  return mockBlogPosts[index];
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  await delay(200);
  const index = mockBlogPosts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  mockBlogPosts.splice(index, 1);
  return true;
}

// Storage helper - abstracts image URL generation for R2 migration
export function getImageUrl(path: string): string {
  // In production, this would return R2/CDN URLs
  // For now, returns the path as-is (placeholder or uploaded)
  return path;
}
