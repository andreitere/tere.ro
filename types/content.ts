export interface BlogCollectionItem {
  title: string
  description: string
  date: string
  lastmod?: string
  draft: boolean
  categories?: string | string[]
  tags?: string[]
  image?: string
  path?: string
  category?: string
}

export interface ProjectCollectionItem {
  title: string
  description: string
  date: string
  endDate?: string
  active?: boolean
  external?: boolean
  externalUrl?: string
  githubUrl?: string
  tags: string[]
  path?: string
}

declare module '#content/types' {
  interface Collections {
    blog: BlogCollectionItem[]
    projects: ProjectCollectionItem[]
  }
} 