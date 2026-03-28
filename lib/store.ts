'use client'

import { BlogPost, blogPosts as defaultPosts } from './data'

// ──── Auth ────

const ADMIN_EMAIL = 'admin@polarekat.id'
const ADMIN_PASSWORD = 'polarekat2025'
const AUTH_KEY = 'polarekat_auth'

export function login(email: string, password: string): boolean {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ email, loggedInAt: Date.now() }))
    }
    return true
  }
  return false
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY)
  }
}

export function isLoggedIn(): boolean {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem(AUTH_KEY)
  }
  return false
}

// ──── Posts Store ────

const POSTS_KEY = 'polarekat_posts'

function getStoredPosts(): BlogPost[] {
  if (typeof window === 'undefined') return defaultPosts
  const stored = localStorage.getItem(POSTS_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultPosts
    }
  }
  // Initialize with default posts on first load
  localStorage.setItem(POSTS_KEY, JSON.stringify(defaultPosts))
  return defaultPosts
}

export function getAllPosts(): BlogPost[] {
  return getStoredPosts()
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getStoredPosts().find((p) => p.slug === slug)
}

export function getPostById(id: string): BlogPost | undefined {
  return getStoredPosts().find((p) => p.id === id)
}

export function savePost(post: BlogPost): void {
  const posts = getStoredPosts()
  const idx = posts.findIndex((p) => p.id === post.id)
  if (idx >= 0) {
    posts[idx] = post
  } else {
    posts.unshift(post)
  }
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
}

export function deletePost(id: string): void {
  const posts = getStoredPosts().filter((p) => p.id !== id)
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

// ──── Image Store ────

const IMAGES_KEY = 'polarekat_images'

export interface StoredImage {
  id: string
  name: string
  data: string  // base64 data URL
  size: number
  type: string
  uploadedAt: string
}

export function getAllImages(): StoredImage[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(IMAGES_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }
  return []
}

export function saveImage(image: StoredImage): void {
  const images = getAllImages()
  images.unshift(image)
  localStorage.setItem(IMAGES_KEY, JSON.stringify(images))
}

export function deleteImage(id: string): void {
  const images = getAllImages().filter((img) => img.id !== id)
  localStorage.setItem(IMAGES_KEY, JSON.stringify(images))
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// ──── Settings Store ────

const SETTINGS_KEY = 'polarekat_settings'

export interface SiteSettings {
  siteName: string
  tagline: string
  phone: string
  email: string
  location: string
  instagram: string
  whatsapp: string
  tokopedia: string
}

const defaultSettings: SiteSettings = {
  siteName: 'Polarekat.id',
  tagline: 'Layanan cutting sticker profesional di Bandung',
  phone: '+62 812-3456-7890',
  email: 'hello@polarekat.id',
  location: 'Bandung, Jawa Barat, Indonesia',
  instagram: '@polarekat.id',
  whatsapp: '+62 812-3456-7890',
  tokopedia: 'tokopedia.com/polarekat',
}

export function getSettings(): SiteSettings {
  if (typeof window === 'undefined') return defaultSettings
  const stored = localStorage.getItem(SETTINGS_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultSettings
    }
  }
  return defaultSettings
}

export function saveSettings(settings: SiteSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
