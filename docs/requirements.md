# Shine Ford - Heavy Equipment Rental Booking System Requirements

## Project Overview

| Attribute | Details |
|-----------|---------|
| Type | Internal web application |
| Domain | Heavy equipment rental |
| Users | 2 admins, 4 staff (6 total) |
| Client Tech Level | First custom software project |

---

## Current State

**Tools in use:** Google Docs (invoices), Google Sheets (time tracking), Google Drive (customer info)

**Pain points:** Everything is manual - booking, invoicing, time tracking, customer management scattered across multiple tools

---

## Users & Permissions

| Role | Count | Access Level |
|------|-------|--------------|
| Admin | 2 | Full access |
| Staff | 4 | Limited access |

- Internal use only (no customer login)
- Single office location
- Desktop only (no mobile required)

---

## Equipment

- **Count:** 20-30 items
- **Types:** Excavators, loaders, cranes, other construction equipment
- **Location:** Single depot
- **Tracking:** Manual check-in/out (no GPS)
- **Accessories:** Not tracked

---

## Booking Workflow

### Process Flow
1. Customer requests equipment (phone/office visit)
2. Staff does site inspection
3. Customer pays 70% deposit (hourly rate + delivery fee)
4. Equipment delivered to site
5. Staff logs actual usage time
6. Invoice generated and sent
7. Revenue tracked (payments managed externally)

### Rules
- **Lead time:** Same day to a few weeks
- **Modifications:** Allowed
- **Cancellations:** Allowed, non-refundable

---

## Customers

- Mix of repeat and one-time customers
- **Data captured:** Name, site address, contact info
- **Contracts:** Required for each rental

---

## Pricing & Payments

| Item | Details |
|------|---------|
| Rate structure | Fixed hourly rate |
| Seasonal updates | Yes |
| Delivery/pickup | Per km rate, can be discounted |
| Deposit | 70% down payment required |
| Invoicing | Generate and print |
| Accounting integration | None |

---

## Operators

- Scheduled with equipment on ad-hoc basis
- No advance scheduling system needed

---

## Notifications

- **In-system reminders:** Yes (rental start/end dates)
- **Email/SMS:** No
- **Overdue alerts:** No

---

## Reporting

- **Reports:** Revenue, utilization
- **Export:** PDF
- **Access:** Admin and staff

---

## Technical Requirements

| Requirement | Details |
|-------------|---------|
| Hosting | AWS Amplify (managed, pay-per-use) |
| Database | Supabase (PostgreSQL + Auth) |
| Integrations | None |
| API | Not needed |
| Availability | 24/7 |
| Downtime tolerance | Few hours acceptable |
| Compliance | None |

---

## Timeline & Budget

- **Timeline:** Flexible, no rush
- **Budget:** TBD
- **Priority:** Features over speed/cost

---

## MVP Scope

### Phase 1 - Core System (MVP)

**Goal:** Replace spreadsheets with a single system for bookings, customers, equipment, and invoicing.

| Module | Features |
|--------|----------|
| **Auth** | Login, admin/staff roles with permissions |
| **Equipment** | Add/edit/view equipment, hourly rates, availability status |
| **Customers** | Add/edit/view customers (name, site address, contact) |
| **Bookings** | Create/edit/cancel bookings, assign equipment, set dates/hours |
| **Invoicing** | Generate invoice with hourly charges + delivery, print/PDF |
| **Payments** | Track 70% deposit, mark as paid, outstanding balance |

### Phase 2 - Enhancements

| Module | Features |
|--------|----------|
| **Calendar** | Visual calendar view of all bookings |
| **Time Tracking** | Log actual hours used per booking |
| **Operators** | Assign operators to bookings |
| **Delivery** | Per-km rate calculator with discounts |
| **Reminders** | In-system alerts for upcoming rentals |
| **Reports** | Revenue and utilization reports (PDF export) |

### Phase 3 - Future

- Seasonal rate management
- Contract/agreement templates
- Dashboard with KPIs
- Audit logs

---

## MVP Rationale

| Current Pain | MVP Solution |
|--------------|--------------|
| Customer info scattered in Drive | Centralized customer database |
| Bookings tracked in spreadsheets | Booking management with status |
| Invoices created manually in Docs | Auto-generated invoices |
| No visibility on equipment availability | Equipment status tracking |
| Deposit tracking is manual | Payment/deposit tracking |

### Out of Scope for MVP
- Customer portal
- Mobile app
- GPS tracking
- Email/SMS notifications
- Accounting integration
- API access
- Reports (use database queries initially)

---

## Project Estimate

### Phase 1 - MVP (Core System)

| Module | Tasks | Days |
|--------|-------|------|
| **Setup** | Nuxt 3, Supabase, Tailwind, Ant Design Vue, project structure | 2 |
| **Database** | Schema design, migrations, RLS policies, seed data | 2 |
| **Auth** | Login/logout, session management, role-based access | 2 |
| **Equipment** | CRUD, status management, hourly rate, listing/search | 3 |
| **Customers** | CRUD, contact info, site address, listing/search | 2 |
| **Bookings** | CRUD, equipment assignment, dates, status workflow | 4 |
| **Invoicing** | Generate from booking, line items, PDF generation, print | 4 |
| **Payments** | Record deposit (70%), partial/final payments, balance tracking | 2 |
| **Layout** | Sidebar, header, responsive layout, navigation | 2 |
| **Testing** | Manual testing, bug fixes, polish | 3 |
| **Deployment** | Vercel setup, domain, SSL, production config | 1 |
| | | |
| **Phase 1 Total** | | **27 days** |

### Phase 2 - Enhancements

| Module | Tasks | Days |
|--------|-------|------|
| **Calendar** | Calendar view, booking visualization, date navigation | 3 |
| **Time Tracking** | Log actual hours, compare vs estimated | 2 |
| **Operators** | Operator list, assignment to bookings | 2 |
| **Delivery** | Per-km calculator, distance input, discount support | 2 |
| **Reminders** | In-system notifications, upcoming rental alerts | 2 |
| **Reports** | Revenue report, utilization report, PDF export | 4 |
| **Testing** | Testing and bug fixes | 2 |
| | | |
| **Phase 2 Total** | | **17 days** |

### Phase 3 - Future

| Module | Tasks | Days |
|--------|-------|------|
| **Seasonal Rates** | Rate periods, automatic rate switching | 2 |
| **Contracts** | Template system, PDF generation | 3 |
| **Dashboard** | KPIs, charts, summary widgets | 3 |
| **Audit Logs** | Activity tracking, change history | 2 |
| | | |
| **Phase 3 Total** | | **10 days** |

---

### Effort Summary

| Phase | Hours | Timeline (4-6 hrs/day) |
|-------|-------|------------------------|
| Phase 1 (MVP) | 216 hrs | ~9 weeks |
| Phase 2 | 136 hrs | ~6 weeks |
| Phase 3 | 80 hrs | ~3 weeks |
| **Total** | **432 hrs** | **~18 weeks** |

*Timeline assumes 1 developer working 4-6 hours/day, 5 days/week.*

---

### Monthly Operating Costs

| Service | Cost |
|---------|------|
| AWS Amplify | ~$5-15/mo (pay-per-use) |
| Supabase (Free tier) | $0/mo |
| Domain (Route 53) | ~$12/yr |
| **Total** | **~$5-20/mo** |

*Supabase free tier includes 500MB database, 50,000 auth users, sufficient for this project.*
*AWS Amplify pricing based on build minutes + hosting (typically lower cost for small apps).*

---

## Next Steps

- [x] Complete requirements gathering
- [x] Identify MVP scope
- [x] Create technical specification
- [x] Provide estimate
- [ ] Client approval
- [ ] Begin development
