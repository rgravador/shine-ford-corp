# Shine Ford - Brainstorm

**Date:** 2026-03-25
**Status:** Reviewed
**Source:** docs/requirements.md
**Last Updated:** 2026-03-25

---

## What We're Building

A web-based internal booking system for a heavy equipment rental business to replace their current manual processes (Google Docs, Sheets, Drive) with a centralized application.

### Core Problem

The client operates a heavy equipment rental business with 20-30 pieces of equipment and 6 staff members. Currently, all operations are manual:
- Customer information scattered across Google Drive
- Bookings tracked in spreadsheets
- Invoices created manually in Google Docs
- No visibility on equipment availability
- Deposit tracking is manual and error-prone

### Target Users

| Role | Count | Access |
|------|-------|--------|
| Admin | 2 | Full access to all features |
| Staff | 4 | Limited access (day-to-day operations) |

- Internal use only (no customer-facing portal)
- Desktop only (no mobile requirement)
- Single office location

---

## Why This Approach

### Selected Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Nuxt 3 | Vue ecosystem, SSR/SSG support, good DX |
| UI Library | Ant Design Vue + Tailwind CSS | Rich components + utility styling |
| Backend/DB | Supabase (PostgreSQL) | Managed hosting, built-in auth, RLS policies, free tier sufficient |
| Hosting | AWS Amplify | Pay-per-use, managed, 24/7 availability |

### Why Nuxt 3 + Supabase?

1. **Simplicity** - Full-stack in one codebase, no separate API server needed
2. **Cost-effective** - Supabase free tier handles 6 users easily
3. **Speed to market** - Supabase provides auth, database, and real-time out of the box
4. **Maintainability** - Single developer can manage the entire stack
5. **Client context** - First custom software project; needs something easy to hand off

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Next.js + Prisma | Popular, large ecosystem | More complex setup, React learning curve | Not chosen |
| Laravel + Vue | Robust backend, good for CRUD | Higher hosting costs, PHP dependency | Not chosen |
| Low-code (Retool) | Faster initial development | Vendor lock-in, limited customization | Not chosen |

---

## Key Decisions

### 1. Phased Delivery

**Decision:** Build in 3 phases, MVP first.

**Phase 1 (MVP) - 27 days**
- Auth with role-based access
- Equipment management (CRUD, rates, status)
- Customer management (CRUD, contact info)
- Booking management (CRUD, workflow)
- Invoice generation (PDF/print)
- Payment tracking (70% deposit, balance)

**Phase 2 (Enhancements) - 17 days**
- Calendar view
- Time tracking (actual vs estimated hours)
- Operator assignment
- Delivery calculator (per-km with discounts)
- In-system reminders
- Reports (revenue, utilization, PDF export)

**Phase 3 (Future) - 10 days**
- Seasonal rate management
- Contract templates
- Dashboard with KPIs
- Audit logs

### 2. Booking Workflow

**Decision:** Linear workflow with status tracking.

```
Request → Site Inspection → Deposit (70%) → Delivery → Usage Logging → Invoice → Complete
```

**Booking Status Values:**
| Status | Description |
|--------|-------------|
| `pending` | Initial request, awaiting inspection |
| `inspected` | Site inspection done, awaiting deposit |
| `confirmed` | Deposit received, contract signed |
| `in_progress` | Equipment delivered, rental active |
| `completed` | Rental finished, invoice generated |
| `cancelled` | Booking cancelled (non-refundable) |

**Rules:**
- Same-day to weeks-out lead time supported
- Modifications allowed (except when `completed` or `cancelled`)
- Cancellations allowed (non-refundable)
- Revenue tracking only (payments managed externally)

### 3. Pricing Model

**Decision:** Simple hourly rate + delivery fee structure.

- Fixed hourly rate per equipment type
- Seasonal rate updates (Phase 3)
- Delivery: per-km rate with optional discounts
- 70% deposit required upfront
- No accounting integration (manual reconciliation)

### 4. Authentication & Authorization

**Decision:** Supabase Auth with RLS policies.

- Email/password login (no SSO needed)
- Two roles with clear permission boundaries
- Row Level Security for data isolation
- Session-based auth (no JWT complexity)

**Permission Matrix:**

| Action | Admin | Staff |
|--------|-------|-------|
| View all records | ✅ | ✅ |
| Create records | ✅ | ✅ |
| Edit records | ✅ | ✅ |
| Delete records | ✅ | ❌ |
| Manage users | ✅ | ❌ |
| Modify equipment rates | ✅ | ❌ |
| System settings | ✅ | View only |

### 5. Invoice Generation

**Decision:** Client-side PDF generation.

- Generate invoice from booking data
- Include: hourly charges, delivery fees, deposit paid, balance due
- Print-friendly format
- PDF export capability

### 6. No External Integrations

**Decision:** Standalone system with no integrations.

- No accounting software integration
- No email/SMS notifications
- No GPS tracking
- No external API exposure

This keeps the system simple and reduces maintenance burden.

### 7. Contract Handling

**Decision:** Simple checkbox on booking form.

- "Contract signed" checkbox required before booking can proceed to delivery
- Physical contracts handled outside the system (existing process)
- Future enhancement: Upload signed contract PDF as attachment

---

## Scope Boundaries

### In Scope (MVP)

- Equipment CRUD with availability status
- Customer database with contact/site info
- Booking lifecycle management with status workflow
- Contract signed checkbox (required before delivery)
- Invoice generation and printing (auto-numbered)
- Deposit and payment tracking
- Admin/staff role separation with permission matrix
- Search and filtering on all list views

### Out of Scope

- Customer portal / self-service
- Mobile application
- GPS tracking
- Email/SMS notifications
- Accounting integration
- API access for third parties
- Reports (Phase 2)
- Calendar view (Phase 2)

---

## Data Model Overview

### Equipment Status Values

| Status | Description |
|--------|-------------|
| `available` | Ready for rental |
| `rented` | Currently on a booking |
| `maintenance` | Under repair/service |
| `retired` | No longer in service |

### Core Entities

```
Equipment
├── id (uuid), name, type, description
├── hourly_rate, status (enum)
├── created_at, updated_at
└── Relationships: has_many Bookings

Customers
├── id (uuid), name, company_name (optional)
├── phone, email, site_address
├── notes, created_at, updated_at
└── Relationships: has_many Bookings

Bookings
├── id (uuid), customer_id, equipment_id
├── status (enum), contract_signed (boolean)
├── start_date, end_date, estimated_hours
├── actual_hours, delivery_fee, delivery_distance_km
├── notes, created_by (user_id)
├── created_at, updated_at
└── Relationships: belongs_to Customer, Equipment; has_one Invoice

Invoices
├── id (uuid), invoice_number (e.g., INV-2026-0001)
├── booking_id, subtotal, total_amount
├── deposit_paid, balance_due, status
├── generated_at, paid_at
└── Relationships: belongs_to Booking; has_many Payments

Payments
├── id (uuid), invoice_id
├── amount, type (deposit/partial/final)
├── payment_method, reference_number
├── paid_at, recorded_by (user_id)
└── Relationships: belongs_to Invoice

Users (Supabase Auth)
├── id (uuid), email, role (admin/staff)
├── full_name, created_at
└── Managed by Supabase Auth + profiles table

Operators (Phase 2)
├── id (uuid), name, phone, status
└── Relationships: has_many Booking assignments
```

### Invoice Numbering

Format: `INV-YYYY-NNNN` (e.g., INV-2026-0001)
- Auto-incrementing sequence per year
- Resets to 0001 each January

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | Timeline delays | Strict phase boundaries, defer to later phases |
| Client unfamiliar with software | Adoption issues | Simple UI, training documentation, walkthrough |
| Single developer | Bus factor | Clean code, documentation, standard patterns |
| Supabase free tier limits | Service interruption | Monitor usage, upgrade path clear ($25/mo) |
| Data migration from spreadsheets | Data loss/errors | Create import script, validate before go-live |
| Concurrent booking conflicts | Double-booking equipment | Check availability on save, show warnings |

---

## Success Criteria

1. **Replace spreadsheets** - All bookings managed in system
2. **Centralized customer data** - Single source of truth
3. **Automated invoicing** - Generate from booking data in <1 minute
4. **Equipment visibility** - See availability at a glance
5. **Deposit tracking** - Clear view of payments and balances

---

## Search & Navigation

### List Views

Each entity (Equipment, Customers, Bookings, Invoices) will have:
- Paginated table with sortable columns
- Search box (searches name/key fields)
- Status filter dropdown
- Date range filter (where applicable)

### Quick Access

- Dashboard shows recent bookings and pending actions
- Global search in header (searches across all entities)
- Sidebar navigation to all modules

---

## Open Questions

All clarified during review:
- ~~Hosting platform~~ → AWS Amplify confirmed
- ~~Staff permission boundaries~~ → Defined in permission matrix
- ~~Contract handling~~ → Simple checkbox for MVP

---

## Timeline Summary

| Phase | Effort | Duration (4-6 hrs/day) |
|-------|--------|------------------------|
| Phase 1 (MVP) | 216 hrs | ~9 weeks |
| Phase 2 | 136 hrs | ~6 weeks |
| Phase 3 | 80 hrs | ~3 weeks |
| **Total** | **432 hrs** | **~18 weeks** |

**Monthly Operating Costs:** ~$5-20/mo (AWS Amplify + Supabase free tier)

---

## Next Steps

1. Client approval of requirements and estimate
2. Begin Phase 1 development
3. Set up development environment (Nuxt 3, Supabase, AWS Amplify)
4. Design database schema and RLS policies
5. Create data migration script for existing spreadsheet data

---

## Revision History

| Date | Changes |
|------|---------|
| 2026-03-25 | Initial brainstorm created from requirements.md |
| 2026-03-25 | Review: Added permission matrix, booking/equipment status enums, contract handling, invoice numbering, search/filtering, expanded data model, additional risks |
