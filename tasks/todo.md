# Todo: Install Dependencies from PRD

## Plan

Based on the PRD, we need to set up a Turborepo monorepo with the following structure and dependencies:

### Dependencies to Install

**From PRD Tech Stack:**
- Turborepo (monorepo tooling)
- Next.js 15 (App Router) + Tailwind CSS (web app)
- Expo SDK 52 + NativeWind v4 (mobile app)
- Prisma (ORM)
- @supabase/supabase-js (database client)
- @react-pdf/renderer (server-side PDF generation)

### Tasks

- [x] 1. Initialize Turborepo monorepo structure
- [x] 2. Create Next.js 15 web app in `apps/web`
- [x] 3. Create Expo SDK 52 mobile app in `apps/mobile`
- [x] 4. Create `packages/ui` shared UI package with NativeWind v4 (cross-platform components)
- [x] 5. Create `packages/db` with Prisma setup and schema from PRD
- [x] 6. Install shared dependencies (@supabase/supabase-js)
- [x] 7. Install @react-pdf/renderer in web app
- [x] 8. Configure next.config.js for @react-pdf/renderer as server external
- [x] 9. Set up .env files with Supabase placeholders (SUPABASE_URL, SUPABASE_ANON_KEY)
- [x] 10. Verify all packages install correctly

---

## Review

### Summary of Changes

**Project Structure Created:**
```
cashflow-roast/
├── apps/
│   ├── web/          # Next.js 15 + Tailwind CSS
│   └── mobile/       # Expo SDK 52
├── packages/
│   ├── ui/           # Shared NativeWind v4 components
│   └── db/           # Prisma schema + client
├── package.json      # Turborepo root
├── turbo.json        # Turborepo config
└── .gitignore
```

**Key Dependencies Installed:**
- `@supabase/supabase-js` in web and mobile apps
- `@react-pdf/renderer` in web app (server-side only)
- `prisma` + `@prisma/client` in packages/db
- `nativewind` v4 in packages/ui

**Configurations Applied:**
- `next.config.ts`: Added `serverExternalPackages: ["@react-pdf/renderer"]`
- `.env.example` and `.env.local` files created with Supabase placeholders
- Prisma schema includes all models from PRD (Profile, Client, Invoice, InvoiceItem)

**Notes:**
- Used `--legacy-peer-deps` to resolve React 18/19 peer dependency conflicts
- Web app build verified successfully
- Shared UI package exports a cross-platform Button component

---

# Todo: Build Landing Page (Waitlist)

## Tasks

- [x] 1. Update globals.css with color palette CSS variables
- [x] 2. Update layout.tsx with proper metadata
- [x] 3. Create Supabase client (`/src/lib/supabase.ts`)
- [x] 4. Create waitlist Server Action (`/src/app/actions/waitlist.ts`)
- [x] 5. Create Navbar component
- [x] 6. Create HeroSection with email waitlist form (connected to Supabase)
- [x] 7. Create StatsRow component (3 animated stat cards)
- [x] 8. Create ScoreVisualization component with animated progress bars
- [x] 9. Create HowItWorks section with step animation
- [x] 10. Create RolesBadges social proof section
- [x] 11. Create TemplateGallery with card hover effects
- [x] 12. Create PricingCards with blur effect on future price
- [x] 13. Create FinalCTA section
- [x] 14. Create Footer
- [x] 15. Assemble all components in page.tsx

---

## Review

### Summary of Changes

**Color Palette Applied:**
- Background: `#222831` (deep charcoal)
- Secondary BG: `#393E46` (gray)
- Primary Accent: `#00ADB5` (teal/cyan)
- Text: `#EEEEEE` (light gray)
- Warning: `#FF6B35` (orange for roast feedback)
- Success: `#00E676` (green for checkmarks)

**Components Created:**
```
src/
├── app/
│   ├── page.tsx              # Landing page with all sections
│   ├── layout.tsx            # Updated metadata
│   ├── globals.css           # Custom colors + animations
│   └── actions/
│       └── waitlist.ts       # Server Action for Supabase
├── lib/
│   └── supabase.ts           # Supabase client
└── components/
    ├── Navbar.tsx            # Fixed nav with smooth scroll
    ├── HeroSection.tsx       # Email capture form
    ├── StatsRow.tsx          # 3 stat cards
    ├── ScoreVisualization.tsx # Animated invoice analysis
    ├── HowItWorks.tsx        # Brain dump → Invoice flow
    ├── RolesBadges.tsx       # Freelancer roles + features
    ├── TemplateGallery.tsx   # 4 template previews
    ├── PricingCards.tsx      # Beta vs Standard (FOMO)
    ├── FinalCTA.tsx          # Final call to action
    └── Footer.tsx            # Social links
```

**Features:**
- Waitlist email form connected to Supabase via Server Action
- Animated score visualization with progress bars
- Intersection Observer for scroll-triggered animations
- Responsive design (mobile-first)
- Smooth scroll navigation
- FOMO pricing with blurred future price

**Next Steps:**
1. Create `waitlist` table in Supabase: `CREATE TABLE waitlist (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, email TEXT UNIQUE NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());`
2. Add real Supabase credentials to `.env.local`
3. Run `npm run dev` to test the landing page

---

# Todo: Onboarding Flow (4 Steps)

## Plan

Das Onboarding wird in 4 kognitive Schritte aufgeteilt:

1. **The Identity**: Business Name & Currency
2. **The Look**: Logo & Brand Color (mit Live-Preview)
3. **The Strategy**: Business Model (Service/Product/Both) + Target Hourly Rate (conditional)
4. **The Goal**: Monthly Revenue Target (Freedom Number)

### Datenbank Schema Erweiterungen

Das Profile Model muss erweitert werden um:
- `logoUrl` (String? - URL zum Logo in Supabase Storage)
- `brandColor` (String - Hex Code)
- `businessModel` (String - "SERVICE" | "PRODUCT" | "BOTH")
- `monthlyRevenueTarget` (Decimal? - Freedom Number)
- `onboardingCompleted` (Boolean - Flag zum Tracking)

### Tasks

- [ ] 1. Prisma Schema erweitern (Logo, Brand Color, Business Model, Revenue Target, Onboarding Flag)
- [ ] 2. Migration erstellen und ausführen
- [ ] 3. Onboarding Route erstellen (`/app/onboarding/page.tsx`)
- [ ] 4. Onboarding Layout Component mit Progress Indicator
- [ ] 5. Step 1 Component: Business Name & Currency
- [ ] 6. Step 2 Component: Logo Upload & Brand Color Picker (mit Live Preview)
- [ ] 7. Step 3 Component: Business Model Selection (mit conditional Target Hourly Rate)
- [ ] 8. Step 4 Component: Monthly Revenue Target Input
- [ ] 9. Form State Management (React Context oder useState)
- [ ] 10. Server Actions für jeden Step (saveOnboardingStep)
- [ ] 11. Logo Upload zu Supabase Storage (Server Action)
- [ ] 12. Invoice Preview Component für Step 2 (Live Branding Preview)
- [ ] 13. Navigation zwischen Steps (Next/Back Buttons)
- [ ] 14. Validation für jeden Step
- [ ] 15. Completion Handler (Redirect zu Dashboard nach Step 4)

### Dependencies

- `react-color` oder `@radix-ui/react-popover` + native color picker für Brand Color
- Supabase Storage für Logo Upload
- Eventuell `zustand` oder `react-context` für Form State (optional, kann auch useState sein)

---

## Review

*Wird nach Implementierung ausgefüllt*
