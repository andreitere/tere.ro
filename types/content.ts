export interface HowToStep {
  name: string
  text: string
  image?: string
}

export interface HowToData {
  totalTime?: string // ISO 8601 duration, e.g., "PT30M" for 30 minutes
  estimatedCost?: {
    currency: string
    value: string
  }
  supply?: string[]
  tool?: string[]
  steps: HowToStep[]
}

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
  howto?: HowToData // HowTo schema for tutorial articles
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