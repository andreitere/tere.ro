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