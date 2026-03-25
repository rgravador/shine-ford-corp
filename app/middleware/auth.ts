/**
 * Auth middleware
 * Redirects unauthenticated users to login page
 * Note: @nuxtjs/supabase handles basic auth redirects automatically
 * This middleware is for additional route protection logic
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()

  // Allow access to public routes
  const publicRoutes = ['/login', '/confirm', '/']
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Redirect to login if not authenticated
  if (!user.value) {
    return navigateTo('/login')
  }
})
