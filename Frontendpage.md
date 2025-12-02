Das ist eine **Smart Move**. Eine "Waitlist-Page" (oder "Pre-Launch Page"), die aber schon so aussieht wie das fertige Produkt, baut extrem hohe Glaubwürdigkeit auf. Du validierst nicht nur das Interesse ("Will jemand das?"), sondern verkaufst schon die *Experience*.

Wir nehmen die **ResuMax-Struktur** (die ja bewiesen gut konvertiert), aber wir "häuten" sie komplett um. Statt "Jobsuche" ist das Thema "Geld verdienen & Cashflow".

Hier ist dein Blueprint für die **"Cashflow Roast" Waitlist-Page** basierend auf dem ResuMax-Layout.

-----

### 1\. Design & Branding (Der Anti-Klon)

ResuMax ist dunkel/pink (Cyberpunk). Wir machen "Fintech Bold".

  * **Vibe:** Vertrauenswürdig (weil Finanzen), aber frech/direkt (wegen dem "Roast"-Feature).
  * **Colors:**
      * **Background:** `Deep Navy` oder `Off-White` (sauber).
      * **Primary (CTA):** `Electric Green` (\#00e676) – signalisiert "Geld".
      * **Accent (The Roast):** `Hot Orange` oder `Spicy Red` – für die Warnhinweise der AI.
  * **Font:** Eine starke Sans-Serif (z.B. *Clash Display* für Headlines, *Inter* für Text), damit es modern wirkt.

-----

### 2\. Section Mapping (ResuMax vs. Deine App)

Wir gehen die ResuMax-Sektionen von oben nach unten durch und passen sie an.

#### A. Hero Section

  * **ResuMax:** "The Only Free AI Resume Builder..."
  * **Deine App:**
      * **Headline:** "Der erste Rechnungs-Editor, der dich coacht." (Oder: "Schluss mit Geld liegenlassen.")
      * **Subline:** "Verwandle Notizen in bezahlte Rechnungen in Sekunden. Die AI analysiert deinen Stundenlohn und sagt dir brutal ehrlich, wenn du dich unter Wert verkaufst."
      * **Primary CTA:** [Join Waitlist - Get Beta Access] (Input Field für E-Mail direkt daneben).
      * **Trust Labels:** "No credit card required • Setup in 30 seconds • 100% compliant".
      * **Badge:** "AI Powered / Profit Optimization".

#### B. The "Feature Demo" (Der Hook)

  * **ResuMax:** Zeigt Resume Score (93/100) & ATS Pass Rate.
  * **Deine App:** **"Der Cashflow Health Check"**
      * **Visual:** Eine schwebende Karte, die eine Rechnung zeigt. Daneben eine "Roast-Bubble".
      * **Score Card:** "Profitability Score: 62/100" (Rot/Orange).
      * **Breakdown:**
          * *Hourly Rate:* ⚠️ $25/hr (Low)
          * *Payment Terms:* ✅ 7 Days (Good)
          * *Upsell Potential:* ❌ Missed ($500)
      * **AI Roast Text:** *"Du berechnest 'Logo Design' pauschal, hast aber 30 Stunden daran gesessen. Dein realer Stundenlohn ist $15. Nächstes Mal: Retainer anbieten."*
      * **Why:** Das zeigt sofort den USP – wir sind nicht nur ein Editor, wir sind ein Business-Coach.

#### C. Upload / Start Section (How it Works)

  * **ResuMax:** "Upload Resume -\> Get Analysis".
  * **Deine App:** **"Vom Brain-Dump zur Rechnung"**
      * **Step 1:** Ein Textfeld-Visual mit Text: *"Hab Website gefixt für Peter, ca 4 Stunden, und Hosting bezahlt."*
      * **Arrow:** Ein Pfeil nach rechts "AI Magic".
      * **Step 2:** Eine fertige, wunderschöne PDF-Rechnung.
      * **CTA:** [Try the Demo (Coming Soon)] -\> Ändern zu [Reserve your Spot].

#### D. Logos / Social Proof

  * **ResuMax:** "Land interviews at Google, Meta..."
  * **Deine App:** **"Perfekt für Freelancer, die arbeiten wie..."**
      * **Logos:** Statt Firmenlogos nimmst du "Rollen-Badges": *Senior Developer*, *Product Designer*, *Marketing Consultant*, *Agency Owner*.
      * **Benefit Line:** "Kompatibel mit ZUGFeRD, DATEV-Export und Steuerberater-Liebe."

#### E. Templates Section

  * **ResuMax:** Resume Templates Gallery.
  * **Deine App:** **"Rechnungen, die bezahlt werden."**
      * **Visual:** 3-4 Karten mit unterschiedlichen Styles (Minimalist, Corporate, Bold).
      * **Feature:** "Automatisch dein Logo & Farben. Kein Word-Gefummel mehr."

#### F. Pricing (Der Waitlist-Trick)

  * **ResuMax:** Free / Pro / Recruiting.
  * **Deine App:** Nutze dies, um **FOMO (Fear Of Missing Out)** zu erzeugen.
      * **Card 1 (Public Launch):** "Standard - 15€/Monat" (Grau ausgeblendet / Blur-Effekt).
      * **Card 2 (Beta Access):** **"Free for Early Adopters"**.
          * Features: "Unlimited Invoices", "Full AI Roast", "Founder Status Badge".
          * CTA: [Join Waitlist & Lock Price].

-----

### 3\. Component Architecture (Für Claude Code)

Da wir Next.js und Tailwind nutzen, können wir die Komponenten so definieren:

```tsx
// Komponenten-Struktur für die Landing Page

// 1. Layout Wrapper
<Layout>
  <Navbar /> {/* Links: Features, Manifesto, Pricing, Login */}
  
  {/* 2. Hero mit Email-Capture */}
  <HeroSection 
     title="Stop leaving money on the table."
     emailPlaceholder="Enter your email for beta access"
  />

  {/* 3. Der "Roast" Visualizer (ResuMax Score Copy) */}
  <HealthScoreSection 
     score={62} 
     roastMessage="You are undercharging by 40%." 
     categories={['Rate', 'Terms', 'Scope']} 
  />

  {/* 4. How it works */}
  <TransformationSection 
     beforeImage="/images/messy-notes.png" 
     afterImage="/images/clean-invoice.png" 
  />

  {/* 5. Templates Grid */}
  <TemplateGallery templates={sampleTemplates} />

  {/* 6. Pricing / Waitlist FOMO */}
  <WaitlistPricingCards /> 

  <Footer />
</Layout>
```

-----

### Nächster Schritt: Der Bauplan

Möchtest du, dass ich dir den **Prompt für Claude Code** schreibe, der:

1.  Ein neues Next.js Projekt aufsetzt (nur Landing Page).
2.  Die Komponentenstruktur von ResuMax übernimmt.
3.  Aber **deine Farben** (Deep Navy/Green) und **deine Texte** (Invoicing) direkt einbaut?

Das wäre der schnellste Weg zum Ziel.