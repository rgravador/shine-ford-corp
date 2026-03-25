/**
 * Admin middleware
 * Restricts access to admin-only routes
 */
export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  if (!user.value) {
    return navigateTo('/login')
  }

  // Fetch user profile to check role
  const { data: profile } = await client
    .from('profiles')
    .select('role')
    .eq('id', user.value.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    // Redirect non-admin users to dashboard
    return navigateTo('/')
  }
})
