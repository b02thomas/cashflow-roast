This is the final, comprehensive **Product Requirements Document (PRD)**. It aggregates all our strategy, the "Business Roast" features, and the confirmed tech stack into a single source of truth.

You can hand this directly to Claude Code. It is written to be "machine-readable" for an AI developer but "human-readable" for you.

-----

# PRD: The "Cashflow Roast" Invoicing App (MVP)

## 1\. Executive Summary

**Product Name:** Cashflow Roast (working title)
**Mission:** To be the first financial tool that doesn't just "track" money but actively "coaches" freelancers to earn more. It combines a **ResuMax-style design-first builder** with a **brutally honest AI business coach**.
**Core User:** Design-conscious freelancers (Creative Pros, Developers, Coaches) who hate admin and undervalue their time.

## 2\. The Core Features (MVP)

### Feature A: The "Brain Dump" Invoice Builder

**Goal:** Zero-friction creation.

1.  **Unstructured Input:** A single text box where users type natural language: *"I did a website redesign for Google, 20 hours at $100/hr, plus $50 for hosting."*
2.  **AI Parser:** The LLM extracts:
      * Client Name: "Google"
      * Line Items: "Website Redesign", "Hosting"
      * Rate/Qty: $100 x 20, $50 x 1
3.  **Visual Preview:** Instantly updates a split-screen PDF preview (React-PDF).

### Feature B: "The Business Roast" (The USP)

**Goal:** Increase user's revenue by finding leaks.
**Logic:** Before sending, the AI analyzes the draft invoice against the user's "Profile Goals".
**Roast Triggers:**

  * **The "Sweatshop" Alert:** If `(Total Amount / Hours)` \< `Target Hourly Rate`.
      * *Copy:* "You are charging $25/hr. Your goal is $100. Stop acting like a charity."
  * **The "Scope Creep" Detector:** If notes mention "revisions" but no extra line item exists.
      * *Copy:* "I see you did 3 rounds of revisions. Why is that free? Add a Revision Fee."
  * **The "Late Tax" Warning:** If the invoice date is \>7 days after the "Work Done" date.
      * *Copy:* "You finished this 2 weeks ago. You just gave them a 0% loan. Send it now."

### Feature C: The "Smart Send" Engine

**Goal:** Professional delivery without file management.

1.  **Generate:** Creates a PDF on the server (no local download needed).
2.  **Store:** Saves to Supabase Storage.
3.  **Deliver:** Sends an email to the client with a secure link + attached PDF.

-----

## 3\. Technical Architecture (The Stack)

**Repository:** Monorepo (Turborepo)

  * **Web:** Next.js 15 (App Router) + Tailwind CSS.
  * **Mobile:** Expo SDK 52 + NativeWind v4 (Shared logic with Web).
  * **Database:** Supabase (PostgreSQL).
  * **ORM:** Prisma.

### Critical Implementation Details (For Claude Code)

#### 1\. PDF Generation Strategy (Server-Side)

Do *not* use client-side PDF generation. It is buggy on mobile.

  * **Library:** `@react-pdf/renderer`
  * **Method:** Use `renderToStream` inside a **Next.js Server Action**.
  * **Flow:**
    1.  Receive invoice data in Server Action.
    2.  `renderToStream(<InvoiceTemplate data={data} />)`
    3.  Convert stream to Buffer.
    4.  Upload Buffer to Supabase Storage (`invoices/user_id/invoice_id.pdf`).
    5.  Return the public URL to the frontend.

#### 2\. Compliance (ZUGFeRD/XRechnung)

  * **Phase 1 (MVP):** Standard PDF only.
  * **Phase 2:** Use `node-zugferd` library to attach the XML metadata to the PDF during the Server Action generation step.

#### 3\. Database Schema (Final Version)

This schema supports the "Roast" logic by tracking time and rates.

```prisma
// schema.prisma

model Profile {
  id             String    @id @default(uuid())
  email          String    @unique
  businessName   String?
  targetHourlyRate Decimal @default(50.00) // Critical for "The Roast"
  currency       String    @default("USD")
  createdAt      DateTime  @default(now())
  
  clients        Client[]
  invoices       Invoice[]
}

model Client {
  id        String    @id @default(uuid())
  name      String
  email     String
  company   String?
  vatId     String?
  
  userId    String
  user      Profile   @relation(fields: [userId], references: [id])
  invoices  Invoice[]
}

model Invoice {
  id            String    @id @default(uuid())
  invoiceNumber String
  status        String    @default("DRAFT") // DRAFT, SENT, PAID, OVERDUE
  
  // Financials
  subtotal      Decimal
  taxAmount     Decimal
  totalAmount   Decimal
  
  // The Roast Metrics
  hoursSpent    Decimal   // User inputs this manually or via timer
  effectiveRate Decimal?  // Calculated: totalAmount / hoursSpent
  roastFeedback String?   // The AI's critique saved for history
  
  // Storage
  pdfUrl        String?
  
  // Dates
  issuedAt      DateTime  @default(now())
  dueAt         DateTime
  paidAt        DateTime?

  // Relations
  clientId      String
  client        Client    @relation(fields: [clientId], references: [id])
  userId        String
  user          Profile   @relation(fields: [userId], references: [id])
  items         InvoiceItem[]
}

model InvoiceItem {
  id          String  @id @default(uuid())
  description String
  quantity    Decimal
  unitPrice   Decimal
  total       Decimal
  
  invoiceId   String
  invoice     Invoice @relation(fields: [invoiceId], references: [id])
}
```

-----

## 4\. Development Phases

### Phase 1: "The Skeleton" (Days 1-2)

  * Set up Turborepo (Next.js + Expo).
  * Set up Supabase Auth + Database.
  * Build the `Profile` creation flow (Store the "Target Hourly Rate").

### Phase 2: "The Brain Dump" (Days 3-4)

  * Build the AI API Route (Claude Sonnet / GPT-4o).
  * Input: Text String -\> Output: JSON Object (Items, Prices).
  * Build the Invoice Form (pre-filled by the AI JSON).

### Phase 3: "The Roast & PDF" (Days 5-7)

  * Implement `renderToStream` for PDF generation.
  * Implement the "Roast Logic" (Math calculation + AI commentary).
  * Ship the "Send" button (Email via Resend or Nodemailer).

-----

### How to Start with Claude Code

**Copy and paste this exact prompt to kick off the project:**

> "Claude, act as the Lead Architect. We are building 'Cashflow Roast', an AI invoicing app in a Turborepo (Next.js 15 + Expo).
>
> Please initialize the project structure.
>
> 1.  **Setup:** Create a Turborepo with a Next.js web app (`apps/web`) and an Expo mobile app (`apps/mobile`).
> 2.  **Database:** Create a `packages/db` folder with the Prisma Schema provided in the PRD below.
> 3.  **Config:** Ensure `next.config.js` is set up to handle `@react-pdf/renderer` as a server component external package.
>
> Here is the PRD with the Database Schema: [PASTE THE PRD CONTENT HERE]"

**Go get 'em, CEO.** I'll be here when you hit the first bug.