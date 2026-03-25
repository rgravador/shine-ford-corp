/**
 * Central type exports for the application
 */

export * from './database.types'

/**
 * Application-specific types
 */

export interface NavigationItem {
  key: string
  label: string
  icon?: string
  path: string
  adminOnly?: boolean
  children?: NavigationItem[]
}

export interface BreadcrumbItem {
  title: string
  path?: string
}

export interface TablePagination {
  current: number
  pageSize: number
  total: number
}

export interface ApiResponse<T> {
  data: T | null
  error: Error | null
}

export interface SelectOption {
  label: string
  value: string | number
}
