/**
 * Database types for Supabase
 * These types will be auto-generated from the Supabase schema in Phase 1.2
 * For now, we define placeholder types that match the planned schema
 */

export type UserRole = 'admin' | 'staff'

export type EquipmentStatus = 'available' | 'rented' | 'maintenance' | 'retired'

export type BookingStatus =
  | 'pending'
  | 'inspected'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export type InvoiceStatus = 'draft' | 'sent' | 'partial' | 'paid'

export type PaymentType = 'deposit' | 'partial' | 'final'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  is_active: boolean
  created_at: string
}

export interface Equipment {
  id: string
  name: string
  type: string
  description: string | null
  hourly_rate: number
  status: EquipmentStatus
  version: number
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  name: string
  company_name: string | null
  phone: string
  email: string
  site_address: string
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  booking_number: string
  customer_id: string
  equipment_id: string
  status: BookingStatus
  contract_signed: boolean
  start_date: string
  end_date: string
  estimated_hours: number | null
  actual_hours: number | null
  delivery_fee: number | null
  delivery_distance_km: number | null
  notes: string | null
  created_by: string
  version: number
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  invoice_number: string
  booking_id: string
  subtotal: number
  total_amount: number
  deposit_required: number
  deposit_paid: number
  balance_due: number
  status: InvoiceStatus
  generated_at: string
  paid_at: string | null
}

export interface Payment {
  id: string
  invoice_id: string
  amount: number
  type: PaymentType
  payment_method: string | null
  reference_number: string | null
  recorded_by: string
  paid_at: string
}

/**
 * Supabase Database type definition
 * This will be replaced with auto-generated types from Supabase CLI
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      equipment: {
        Row: Equipment
        Insert: Omit<Equipment, 'id' | 'version' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Equipment, 'id' | 'created_at'>>
      }
      customers: {
        Row: Customer
        Insert: Omit<Customer, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Customer, 'id' | 'created_at'>>
      }
      bookings: {
        Row: Booking
        Insert: Omit<Booking, 'id' | 'booking_number' | 'version' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Booking, 'id' | 'booking_number' | 'created_at'>>
      }
      invoices: {
        Row: Invoice
        Insert: Omit<Invoice, 'id' | 'invoice_number' | 'generated_at'>
        Update: Partial<Omit<Invoice, 'id' | 'invoice_number' | 'generated_at'>>
      }
      payments: {
        Row: Payment
        Insert: Omit<Payment, 'id'>
        Update: Partial<Omit<Payment, 'id'>>
      }
    }
  }
}
