# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Shine Ford** - Heavy Equipment Rental System MVP built with Nuxt 4, Supabase, Ant Design Vue, and Tailwind CSS.

## Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Build for production
npm run preview  # Preview production build
npm run generate # Generate static site
```

## Architecture

### Tech Stack
- **Nuxt 4** - Vue 3 meta-framework with TypeScript strict mode
- **Supabase** - Auth and PostgreSQL database via `@nuxtjs/supabase`
- **Ant Design Vue** - UI components (globally registered via plugin)
- **Tailwind CSS** - Utility styling with `preflight: false` to avoid Ant Design conflicts

### Nuxt 4 Directory Structure
All application code lives in the `app/` directory (Nuxt 4 minimal template):

```
app/
├── components/layout/   # Layout components (Sidebar, Header)
├── layouts/             # Page layouts (default, auth)
├── middleware/          # Route guards (auth, admin)
├── pages/               # File-based routing
├── plugins/             # Vue plugins (antd.ts)
├── types/               # TypeScript types (database.types.ts)
└── app.vue              # Root component
```

### Key Patterns

**Authentication**: `@nuxtjs/supabase` handles auth redirects. The `auth.ts` middleware adds route protection. Admin routes use `admin.ts` middleware.

**Layouts**:
- `default.vue` - Main app layout with sidebar navigation
- `auth.vue` - Centered layout for login/auth pages

**Type System**: Database types are in `app/types/database.types.ts`. These mirror the Supabase schema (equipment, customers, bookings, invoices, payments, profiles).

**Ant Design Integration**: Components are globally available via the `antd.ts` plugin. Use Ant Design's Layout, Menu, Card, Table, Form components.

## Configuration

- `nuxt.config.ts` - Nuxt modules, Supabase config, runtime config
- `tailwind.config.ts` - Content paths use `./app/` prefix, custom colors match Ant Design
- `.env` - `SUPABASE_URL` and `SUPABASE_KEY` required

## UI Development

Always use the Frontend Design Skill (`/frontend-design`) to generate more user-friendly and comfortable UI designs. This ensures consistent, polished interfaces that follow best practices for user experience.

Skill location: `.claude/skills/frontend-design/SKILL.md`

## Domain Types

Key status enums for business logic:
- `BookingStatus`: pending → inspected → confirmed → in_progress → completed/cancelled
- `EquipmentStatus`: available | rented | maintenance | retired
- `InvoiceStatus`: draft → sent → partial → paid
