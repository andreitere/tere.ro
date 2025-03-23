import { categories } from '~/lib/display-names'

export default defineNuxtRouteMiddleware((to) => {
  // Only check routes that might be category pages
  if (to.params.category && !to.params.slug) {
    const category = to.params.category as string
    
    // Check if the category exists in our valid categories list
    const isValidCategory = Object.keys(categories).includes(category)
    
    // If it's not a valid category, redirect to the 404 page
    if (!isValidCategory) {
      return navigateTo('/not-found', { redirectCode: 404 })
    }
  }
}) 