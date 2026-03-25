# Shine Ford - Technical Specification

## Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Nuxt 3 (Vue 3) | SSR, auto-imports, simple deployment |
| UI Library | Ant Design Vue | Complete component set, tables, forms, calendar |
| Styling | Tailwind CSS | Utility-first, fast development |
| Backend | Nuxt Server Routes | Unified codebase, simpler deployment |
| Database | PostgreSQL (Supabase) | Reliable, managed, free tier available |
| Data Layer | @nuxtjs/supabase | Direct integration, built-in auth, no ORM overhead |
| Auth | Supabase Auth | Built-in, session management, row-level security |
| PDF | pdfmake | Invoice generation |
| Hosting | AWS Amplify + Supabase | Managed services, pay-per-use, SSR support |

---

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│            Nuxt 3 (Vue 3 + Ant Design Vue)           │
└─────────────────────┬───────────────────────────────┘
                      │ HTTPS
┌─────────────────────▼───────────────────────────────┐
│                  API Layer                           │
│              Nuxt Server Routes                      │
│            (@nuxtjs/supabase client)                 │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                   Supabase                           │
│     PostgreSQL + Auth + Storage + Row Level Security │
└─────────────────────────────────────────────────────┘
```

---

## Database Schema

> Managed via Supabase Dashboard or SQL migrations. Auth handled by Supabase Auth.

### Profiles (extends Supabase Auth)
```sql
profiles
├── id              UUID PRIMARY KEY REFERENCES auth.users(id)
├── name            VARCHAR(100) NOT NULL
├── role            VARCHAR(20) CHECK (role IN ('admin', 'staff'))
├── is_active       BOOLEAN DEFAULT true
├── created_at      TIMESTAMPTZ DEFAULT NOW()
└── updated_at      TIMESTAMPTZ
```

### Equipment
```sql
equipment
├── id              UUID PRIMARY KEY
├── name            VARCHAR(100) NOT NULL
├── type            VARCHAR(50) NOT NULL
├── description     TEXT
├── hourly_rate     DECIMAL(10,2) NOT NULL
├── status          ENUM('available', 'rented', 'maintenance') DEFAULT 'available'
├── created_at      TIMESTAMP DEFAULT NOW()
└── updated_at      TIMESTAMP
```

### Customers
```sql
customers
├── id              UUID PRIMARY KEY
├── name            VARCHAR(100) NOT NULL
├── contact_person  VARCHAR(100)
├── phone           VARCHAR(20)
├── email           VARCHAR(255)
├── site_address    TEXT
├── notes           TEXT
├── created_at      TIMESTAMP DEFAULT NOW()
└── updated_at      TIMESTAMP
```

### Bookings
```sql
bookings
├── id              UUID PRIMARY KEY
├── booking_number  VARCHAR(20) UNIQUE NOT NULL
├── customer_id     UUID REFERENCES customers(id)
├── equipment_id    UUID REFERENCES equipment(id)
├── start_date      DATE NOT NULL
├── end_date        DATE NOT NULL
├── estimated_hours INT NOT NULL
├── actual_hours    INT
├── hourly_rate     DECIMAL(10,2) NOT NULL
├── delivery_fee    DECIMAL(10,2) DEFAULT 0
├── delivery_km     DECIMAL(10,2)
├── status          ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')
├── notes           TEXT
├── created_by      UUID REFERENCES users(id)
├── created_at      TIMESTAMP DEFAULT NOW()
└── updated_at      TIMESTAMP
```

### Invoices
```sql
invoices
├── id              UUID PRIMARY KEY
├── invoice_number  VARCHAR(20) UNIQUE NOT NULL
├── booking_id      UUID REFERENCES bookings(id)
├── customer_id     UUID REFERENCES customers(id)
├── subtotal        DECIMAL(12,2) NOT NULL
├── delivery_fee    DECIMAL(10,2) DEFAULT 0
├── total           DECIMAL(12,2) NOT NULL
├── status          ENUM('draft', 'sent', 'paid', 'partial') DEFAULT 'draft'
├── issued_date     DATE NOT NULL
├── due_date        DATE
├── created_at      TIMESTAMP DEFAULT NOW()
└── updated_at      TIMESTAMP
```

### Payments
```sql
payments
├── id              UUID PRIMARY KEY
├── invoice_id      UUID REFERENCES invoices(id)
├── amount          DECIMAL(12,2) NOT NULL
├── payment_type    ENUM('deposit', 'partial', 'final') NOT NULL
├── payment_date    DATE NOT NULL
├── notes           TEXT
├── recorded_by     UUID REFERENCES users(id)
├── created_at      TIMESTAMP DEFAULT NOW()
└── updated_at      TIMESTAMP
```

### Entity Relationships
```
users ─────────────────┐
                       │
customers ◄────────────┼──── bookings ────► equipment
     │                 │         │
     │                 │         │
     └────► invoices ◄─┘         │
                │                │
                ▼                │
            payments             │
                                 │
                       operators ┘ (Phase 2)
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | User login |
| POST | /api/auth/logout | User logout |
| GET | /api/auth/me | Get current user |

### Users (Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | List all users |
| POST | /api/users | Create user |
| GET | /api/users/:id | Get user details |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Deactivate user |

### Equipment
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/equipment | List equipment |
| POST | /api/equipment | Add equipment |
| GET | /api/equipment/:id | Get equipment details |
| PUT | /api/equipment/:id | Update equipment |
| DELETE | /api/equipment/:id | Remove equipment |
| GET | /api/equipment/available | List available equipment |

### Customers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/customers | List customers |
| POST | /api/customers | Add customer |
| GET | /api/customers/:id | Get customer details |
| PUT | /api/customers/:id | Update customer |
| GET | /api/customers/:id/bookings | Customer booking history |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/bookings | List bookings |
| POST | /api/bookings | Create booking |
| GET | /api/bookings/:id | Get booking details |
| PUT | /api/bookings/:id | Update booking |
| PATCH | /api/bookings/:id/status | Update booking status |
| PATCH | /api/bookings/:id/hours | Log actual hours |

### Invoices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/invoices | List invoices |
| POST | /api/invoices | Create invoice |
| GET | /api/invoices/:id | Get invoice details |
| GET | /api/invoices/:id/pdf | Generate PDF |
| PATCH | /api/invoices/:id/status | Update invoice status |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/payments | List payments |
| POST | /api/payments | Record payment |
| GET | /api/invoices/:id/payments | Get invoice payments |

---

## UI Components

### Pages (MVP)

| Page | Route | Description |
|------|-------|-------------|
| Login | /login | Authentication |
| Dashboard | / | Overview, quick actions |
| Equipment | /equipment | List, add, edit equipment |
| Customers | /customers | List, add, edit customers |
| Bookings | /bookings | List, add, edit bookings |
| Booking Detail | /bookings/:id | View/edit single booking |
| Invoices | /invoices | List, create invoices |
| Invoice Detail | /invoices/:id | View invoice, record payment |
| Users | /users | User management (admin only) |

### Key Components

```
components/
├── layout/
│   ├── AppLayout.vue        # Main layout with sidebar
│   ├── Sidebar.vue          # Navigation menu
│   └── Header.vue           # Top bar with user info
├── equipment/
│   ├── EquipmentTable.vue   # Equipment list
│   ├── EquipmentForm.vue    # Add/edit form
│   └── EquipmentStatus.vue  # Status badge
├── customers/
│   ├── CustomerTable.vue    # Customer list
│   ├── CustomerForm.vue     # Add/edit form
│   └── CustomerSelect.vue   # Dropdown selector
├── bookings/
│   ├── BookingTable.vue     # Booking list
│   ├── BookingForm.vue      # Add/edit form
│   ├── BookingStatus.vue    # Status badge
│   └── HoursLogger.vue      # Log actual hours
├── invoices/
│   ├── InvoiceTable.vue     # Invoice list
│   ├── InvoiceDetail.vue    # Invoice view
│   ├── InvoicePDF.vue       # PDF template
│   └── PaymentForm.vue      # Record payment
└── common/
    ├── DataTable.vue        # Reusable table
    ├── SearchInput.vue      # Search component
    ├── StatusBadge.vue      # Status indicator
    └── ConfirmModal.vue     # Confirmation dialog
```

---

## Security

### Authentication
- Supabase Auth with email/password
- Secure HTTP-only cookies (managed by Supabase)
- Password hashing handled by Supabase (bcrypt)

### Authorization
| Role | Permissions |
|------|-------------|
| Admin | Full CRUD on all resources, user management |
| Staff | CRUD on bookings, customers, invoices; Read equipment |

- Row Level Security (RLS) policies in Supabase
- Role stored in `profiles` table, checked via RLS

### Data Protection
- HTTPS enforced
- Input validation on all endpoints (Zod)
- SQL injection prevention via parameterized queries
- XSS prevention via Vue's default escaping
- CSRF protection via Supabase Auth

---

## Deployment

### Infrastructure

```
┌─────────────────┐     ┌─────────────────┐
│   AWS Amplify   │     │    Supabase     │
│   (Frontend +   │────▶│  (PostgreSQL +  │
│   SSR/API)      │     │   Auth)         │
└─────────────────┘     └─────────────────┘
```

### Environment Variables
```env
# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJ...                    # anon/public key
SUPABASE_SERVICE_KEY=eyJ...            # service role key (server only)

# App
NUXT_PUBLIC_APP_NAME="Shine Ford"
```

### CI/CD
- GitHub repository
- AWS Amplify auto-deploy on push to main
- Preview deployments for PRs (branch deployments)

### Estimated Costs (Monthly)
| Service | Tier | Cost |
|---------|------|------|
| AWS Amplify | Pay-per-use | ~$5-15 |
| Supabase | Free | $0 |
| Domain (Route 53) | - | ~$1 |
| **Total** | | **~$6-20/mo** |

*Amplify pricing: $0.01/build minute, $0.15/GB served, free tier includes 1000 build mins + 15GB/mo*

---

## Project Structure

```
├── components/             # Vue components (auto-imported)
│   ├── layout/
│   ├── equipment/
│   ├── customers/
│   ├── bookings/
│   ├── invoices/
│   └── common/
├── composables/            # Vue composables (auto-imported)
│   ├── useEquipment.ts
│   ├── useCustomers.ts
│   ├── useBookings.ts
│   └── useInvoices.ts
├── layouts/
│   ├── default.vue        # Main authenticated layout
│   └── auth.vue           # Login layout
├── middleware/
│   └── auth.ts            # Route protection
├── pages/                  # File-based routing
│   ├── index.vue          # Dashboard
│   ├── login.vue
│   ├── equipment/
│   │   ├── index.vue
│   │   └── [id].vue
│   ├── customers/
│   │   ├── index.vue
│   │   └── [id].vue
│   ├── bookings/
│   │   ├── index.vue
│   │   └── [id].vue
│   ├── invoices/
│   │   ├── index.vue
│   │   └── [id].vue
│   └── users/
│       └── index.vue
├── server/                 # Nuxt server routes
│   ├── api/
│   │   ├── equipment/
│   │   ├── customers/
│   │   ├── bookings/
│   │   ├── invoices/
│   │   └── payments/
│   └── utils/
│       └── supabase.ts    # Server-side Supabase client
├── stores/                 # Pinia stores
│   └── ui.ts
├── types/
│   ├── database.ts        # Generated Supabase types
│   └── index.ts
├── supabase/
│   ├── migrations/        # SQL migrations
│   └── seed.sql           # Seed data
└── nuxt.config.ts
```

---

## Development Phases

### Phase 1 - MVP (Core)
1. Project setup (Nuxt 3, Supabase, Tailwind, Ant Design Vue)
2. Supabase project setup + database schema
3. Authentication (Supabase Auth + RLS policies)
4. Equipment CRUD
5. Customer CRUD
6. Booking CRUD
7. Invoice generation + PDF
8. Payment tracking
9. Testing and deployment

### Phase 2 - Enhancements
1. Calendar view (Ant Design Vue Calendar)
2. Time tracking improvements
3. Operator assignment
4. Delivery fee calculator
5. In-system reminders
6. Reports (revenue, utilization)

### Phase 3 - Future
1. Seasonal rate management
2. Contract templates
3. Dashboard with KPIs
4. Audit logs
