# CLAUDE.md


1. First think through the problem, read the codebase for
relevant files, and write a plan to tasks/todo.md.
2. The plan should have a list of todo items that you can
check off as you complete them
3. Before you begin working, check in with me and I will
verify the plan.
4. Then, begin working on the todo items, marking them as
complete as you go.
5. Please every step of the way just give me a high level
explanation of what changes you made
6. Make every task and code change you do as simple as
possible. We want to avoid making any massive or complex
changes. Every change should impact as little code as
possible. Everything is about simplicity.
7. Finally, add a review section to the [todo.md](http://todo.md/) file with
a summary of the changes you made and any other relevant
information.
8. DO NOT BE LAZY. NEVER BE LAZY. IF THERE IS A BUG FIND
THE ROOT CAUSE AND FIX IT. NO TEMPORARY FIXES. YOU ARE A
SENIOR DEVELOPER. NEVER BE LAZY
9. MAKE ALL FIXES AND CODE CHANGES AS SIMPLE AS HUMANLY
POSSIBLE. THEY SHOULD ONLY IMPACT NECESSARY CODE RELEVANT
TO THE TASK AND NOTHING ELSE. IT SHOULD IMPACT AS LITTLE
CODE AS POSSIBLE YOUR GOAL IS TO NOT INTRODUCE ANY BUGS.
IT'S ALL ABOUT SIMPLICITY
10. Always use localhost:3002 for this project


This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cashflow Roast** - An AI invoicing app that combines a natural language invoice builder with a "business roast" AI coach for freelancers. The app analyzes invoices to find revenue leaks (undercharging, scope creep, late invoicing).

## Tech Stack

- **Monorepo:** Turborepo
- **Web:** Next.js 15 (App Router) + Tailwind CSS
- **Mobile:** Expo SDK 52 + NativeWind v4
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **PDF Generation:** `@react-pdf/renderer` (server-side only)
- **Email:** Resend or Nodemailer

## Repository Structure

```
apps/
  web/          # Next.js 15 web application
  mobile/       # Expo mobile application
packages/
  db/           # Prisma schema and database utilities
```

## Critical Implementation Rules

### PDF Generation (Server-Side Only)
- Never use client-side PDF generation (buggy on mobile)
- Use `@react-pdf/renderer` with `renderToStream` inside Next.js Server Actions
- Flow: Server Action → renderToStream → Buffer → Upload to Supabase Storage → Return public URL

### Next.js Configuration
`@react-pdf/renderer` must be configured as a server component external package in `next.config.js`

### The "Roast" Logic
The core USP requires calculating metrics from invoice data:
- **Sweatshop Alert:** `(totalAmount / hoursSpent) < targetHourlyRate`
- **Scope Creep Detector:** Mentions of "revisions" without a revision line item
- **Late Tax Warning:** Invoice date > 7 days after work completion

### Database Key Fields
- `Profile.targetHourlyRate` - User's goal rate for roast comparisons
- `Invoice.hoursSpent` - Manual or timer-tracked hours
- `Invoice.effectiveRate` - Calculated: `totalAmount / hoursSpent`
- `Invoice.roastFeedback` - AI critique stored for history

## Future Phases (Not MVP)
- ZUGFeRD/XRechnung compliance via `node-zugferd` library for XML metadata attachment
