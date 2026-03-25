# Project Proposal
## Shine Ford - Heavy Equipment Rental Booking System

---

**Prepared for:** [Client Name]

**Prepared by:** [Developer Name]

**Date:** [Date]

**Valid until:** [Date + 30 days]

---

## Executive Summary

This proposal outlines the development of a custom web-based booking system designed to streamline your heavy equipment rental operations. The system will replace your current manual processes (spreadsheets, Google Docs, phone-based coordination) with a centralized platform for managing equipment, customers, bookings, invoicing, and payments.

### Key Benefits

| Current Problem | Solution |
|-----------------|----------|
| Customer info scattered in Drive | Centralized customer database |
| Bookings tracked in spreadsheets | Booking system with status tracking |
| Invoices created manually in Docs | Auto-generated invoices with PDF export |
| No visibility on equipment availability | Real-time equipment status and availability |
| Deposit tracking is manual | Payment tracking with balance due alerts |

---

## Understanding Your Needs

### Current Challenges

| Challenge | Impact |
|-----------|--------|
| Booking management via spreadsheets | Time-consuming, prone to errors |
| Customer info scattered across Google Drive | Difficult to track history |
| Invoices created manually in Google Docs | Inconsistent, slow process |
| No visibility on equipment availability | Risk of double-booking |
| Deposit tracking is manual | Missed payments, cash flow issues |

### Business Requirements

- 20-30 heavy equipment items (excavators, loaders, cranes)
- 6 users (2 admins, 4 staff) with different access levels
- Hourly rental rates with 70% deposit requirement
- Delivery/pickup charged per kilometer
- Invoice generation and printing capability
- Internal use only (no customer portal needed)

---

## Proposed Solution

A modern, cloud-based booking system with the following capabilities:

### Core Features

| Module | Description |
|--------|-------------|
| **User Management** | Secure login with admin and staff roles |
| **Equipment Catalog** | Track 20-30 equipment items, hourly rates, and availability status |
| **Customer Database** | Centralized customer records with contact info and site addresses |
| **Booking Management** | Create, modify, and cancel bookings with 6-stage status workflow |
| **Contract Tracking** | "Contract signed" checkbox required before equipment delivery |
| **Invoicing** | Auto-numbered invoices (INV-2026-0001) with print and PDF export |
| **Payment Tracking** | Record 70% deposits, partial payments, and final payments |

### Booking Workflow

Your bookings will follow a clear status progression:

```
Request → Site Inspection → Deposit Paid → Delivery → In Use → Completed
```

Each stage is tracked in the system, so you always know where every booking stands.

### User Permissions

| Action | Admin | Staff |
|--------|-------|-------|
| View all records | Yes | Yes |
| Create/edit records | Yes | Yes |
| Delete records | Yes | No |
| Manage users | Yes | No |
| Change equipment rates | Yes | No |

### Technical Approach

| Component | Technology |
|-----------|------------|
| Frontend | Nuxt 3 (Vue.js) with Ant Design Vue |
| Backend | Nuxt Server Routes |
| Database | PostgreSQL (Supabase) |
| Authentication | Supabase Auth with role-based access |
| Hosting | AWS Amplify |
| PDF Generation | pdfmake |

### Why This Stack?

- **Low maintenance** - Managed services, no server administration needed
- **Secure** - Built-in authentication and database security
- **Scalable** - Can grow with your business
- **Cost-effective** - Pay-per-use hosting model

---

## Scope of Work

### Phase 1: Core System (MVP)

| Module | Deliverables |
|--------|--------------|
| **Setup** | Project setup, database design, deployment to AWS Amplify |
| **Authentication** | Login system, admin/staff roles, permission controls |
| **Equipment** | Add, edit, view equipment with hourly rates and 4 status types (Available, Rented, Maintenance, Retired) |
| **Customers** | Add, edit, view customers with contact details and site addresses |
| **Bookings** | Create, modify, cancel bookings with 6-stage workflow, equipment availability checking, contract checkbox |
| **Invoicing** | Auto-numbered invoices, calculate totals (hours × rate + delivery), print and PDF export |
| **Payments** | Record 70% deposits, partial and final payments, track outstanding balances |
| **Dashboard** | Overview of recent bookings, pending actions, outstanding invoices |
| **Search** | Find equipment, customers, and bookings quickly |

### Phase 2: Enhancements (Optional)

| Module | Deliverables |
|--------|--------------|
| **Calendar View** | Visual month/week/day calendar of all bookings, drag-and-drop rescheduling |
| **Time Tracking** | Log actual hours per rental, compare actual vs estimated hours |
| **Operators** | Manage operator list, assign operators to bookings, view operator schedule |
| **Delivery Calculator** | Configurable per-km rates with discount thresholds, auto-calculate fees |
| **Reminders** | Bell notifications for booking start/end dates, custom reminders |
| **Reports** | Revenue report with charts, equipment utilization report, PDF export |

### Phase 3: Future Enhancements (Optional)

- Seasonal rate management
- Contract/agreement templates
- Dashboard with KPIs
- Audit logs

---

## Project Timeline

*Developer works 4-6 hours per day, 5 days per week.*

### Visual Timeline

```
Phase 1: MVP (9 weeks)
══════════════════════════════════════════════════════════════
Week 1-2    │ Week 3-4    │ Week 5-6    │ Week 7-8    │ Week 9
────────────┼─────────────┼─────────────┼─────────────┼─────────
Setup       │ Equipment   │ Booking     │ Invoicing   │ Testing
Database    │ Customers   │ Management  │ Payments    │ Deploy
Auth        │             │             │ Dashboard   │
══════════════════════════════════════════════════════════════

Phase 2: Enhancements (6 weeks)
══════════════════════════════════════════════════════════════
Week 10-11  │ Week 12-13  │ Week 14-15
────────────┼─────────────┼─────────────
Calendar    │ Operators   │ Reports
Time Track  │ Delivery    │ Testing
            │ Reminders   │ Deploy
══════════════════════════════════════════════════════════════
```

### Phase 1: MVP (9 weeks)

| Week | Activities |
|------|------------|
| Week 1-2 | Project setup, database design, authentication, user permissions |
| Week 3-4 | Equipment module (CRUD, rates, status), Customer module (CRUD, contacts) |
| Week 5-6 | Booking management (workflow, availability check, contract checkbox) |
| Week 7-8 | Invoicing (auto-numbering, PDF), Payment tracking (deposits, balances) |
| Week 9 | Dashboard, search, testing, bug fixes, deployment to production |

**Deliverable: Fully functional booking system ready for daily use**

### Phase 2: Enhancements (6 weeks)

| Week | Activities |
|------|------------|
| Week 10-11 | Calendar view (month/week/day), Time tracking (actual vs estimated) |
| Week 12-13 | Operator management and assignment, Delivery calculator with discounts |
| Week 14-15 | Reminder system, Revenue and utilization reports, testing, deployment |

**Deliverable: Enhanced system with visual calendar, reports, and operator scheduling**

### Phase 3: Future Features (3 weeks)

| Week | Activities |
|------|------------|
| Week 16-17 | Seasonal rate management, Contract templates with PDF generation |
| Week 18 | KPI dashboard, Audit logs, final polish and handover |

**Deliverable: Complete system with advanced features**

---

## Investment

### Option A: MVP Only (Recommended to Start)

| Item | Amount | Timeline |
|------|--------|----------|
| Phase 1 Development | ₱145,000 | 9 weeks |
| **Total** | **₱145,000** | **9 weeks** |

### Option B: Full Project (All Phases)

| Item | Amount | Timeline |
|------|--------|----------|
| Phase 1 - Core System | ₱145,000 | 9 weeks |
| Phase 2 - Enhancements | ₱91,000 | 6 weeks |
| Phase 3 - Future Features | ₱54,000 | 3 weeks |
| **Total** | **₱290,000** | **18 weeks** |

### Monthly Operating Costs (After Launch)

| Service | Cost | Notes |
|---------|------|-------|
| AWS Amplify (hosting) | ~₱280-840/mo | Pay-per-use, scales with traffic |
| Supabase (database) | ₱0/mo | Free tier sufficient for 6 users |
| Domain (optional) | ~₱56/mo | If you want a custom domain |
| **Total** | **~₱280-900/mo** | |

*The free tier of Supabase includes 500MB database storage and 50,000 auth users - more than enough for your needs. If usage grows significantly, Supabase Pro is $25/mo (~₱1,400/mo).*

---

## Payment Terms

### Option A: MVP Only

| Milestone | % | Amount | When |
|-----------|---|--------|------|
| Project Kickoff | 50% | ₱72,500 | Upon contract signing |
| Project Completion | 50% | ₱72,500 | Upon delivery and acceptance |
| **Total** | | **₱145,000** | |

### Option B: Full Project

| Milestone | % | Amount | When |
|-----------|---|--------|------|
| Project Kickoff | 30% | ₱87,000 | Upon contract signing |
| MVP Completion | 40% | ₱116,000 | Phase 1 delivered and accepted |
| Phase 2 Completion | 20% | ₱58,000 | Phase 2 delivered and accepted |
| Final Delivery | 10% | ₱29,000 | Phase 3 delivered and accepted |
| **Total** | | **₱290,000** | |

---

## What's Included

| Category | Details |
|----------|---------|
| Development | Complete frontend (Nuxt 3/Vue) and backend (Supabase) development |
| Database | PostgreSQL database with secure access controls per user role |
| Deployment | AWS Amplify hosting with HTTPS, Supabase cloud database |
| Security | Role-based permissions (admin vs staff), secure login system |
| Testing | Functional testing of all features, bug fixes before delivery |
| Documentation | Basic user guide with screenshots |
| Support | Bug fixes during development period |
| Revisions | Up to 2 rounds of revisions per phase |
| Training | 1-hour online walkthrough session after each phase delivery |

## What's Not Included

| Item | Notes |
|------|-------|
| Post-launch support | Available as separate maintenance agreement |
| Major scope changes | Will require change request and new estimate |
| Extended training | Additional on-site or remote training sessions |
| Data migration | Migration from existing spreadsheets (see below) |
| Third-party fees | AWS, Supabase, domain registration |
| Content creation | Logo, images, copywriting |

---

## Data Migration (Optional Add-On)

If you want to import your existing data from Google Sheets into the new system:

| Scope | Cost | What's Included |
|-------|------|-----------------|
| Basic Migration | ₱15,000 | Import equipment list and customer list (up to 500 records) |
| Full Migration | ₱30,000 | Import equipment, customers, and historical bookings (up to 2,000 records) |

*Migration includes data cleaning, validation, and verification before go-live. We'll review your existing spreadsheets to provide an accurate quote.*

---

## Post-Launch Support (Optional)

| Package | Coverage | Monthly Cost |
|---------|----------|--------------|
| Basic | Bug fixes, minor updates (up to 4 hrs/mo) | ₱5,000/mo |
| Standard | Bug fixes, updates, priority support (up to 8 hrs/mo) | ₱10,000/mo |
| Premium | All support, feature enhancements (up to 16 hrs/mo) | ₱18,000/mo |

---

## Why Work With Me

| Benefit | Description |
|---------|-------------|
| **Single Point of Contact** | Direct communication, no middlemen |
| **Full-Stack Expertise** | 6 years experience in frontend, backend, and DevOps |
| **End-to-End Delivery** | From requirements to deployment |
| **Quality Focus** | Clean code, tested functionality |
| **Transparent Process** | Regular updates and progress reports |

---

## Next Steps

1. **Review** this proposal and let me know if you have questions
2. **Confirm** scope and preferred option (MVP or Full Project)
3. **Sign** the project agreement
4. **Pay** the initial milestone payment
5. **Kickoff** meeting to finalize requirements and begin development

---

## Agreement

By signing below, both parties agree to the terms outlined in this proposal.

**Option Selected:** [ ] MVP Only (₱145,000) / [ ] Full Project (₱290,000)

---

**Client**

Name: _______________________

Signature: _______________________

Date: _______________________

---

**Developer**

Name: _______________________

Signature: _______________________

Date: _______________________

---

## Contact

| | |
|---|---|
| **Developer** | [Your Name] |
| **Email** | [your.email@example.com] |
| **Phone** | [+63 XXX XXX XXXX] |

---

*This proposal is valid for 30 days from the date of issue.*
