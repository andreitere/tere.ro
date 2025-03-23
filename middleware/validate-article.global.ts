import { categories } from '~/lib/display-names'

export default defineNuxtRouteMiddleware(async (to) => {
  // Only check routes that might be article pages
  if (to.params.category && to.params.slug) {
    const category = to.params.category as string
    const slug = to.params.slug as string
    
    // First check if the category is valid
    const isValidCategory = Object.keys(categories).includes(category)
    if (!isValidCategory) {
      return navigateTo('/non-existent-page', { redirectCode: 404 })
    }
    
    // Then check if the article exists
    const { data } = await useAsyncData(`validate-${category}-${slug}`, () => 
      queryCollection('blog')
        .where("path", "=", `/blog/${slug}`)
        .where("category", "=", category)
        .first()
    )
    
    // If no article found, redirect to 404
    if (!data.value) {
      return navigateTo('/not-found', { redirectCode: 404 })
    }
  }
}) 