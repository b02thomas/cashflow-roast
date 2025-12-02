export function SocialProofCarousel() {
  const companies = [
    {
      name: "Webflow",
      logo: (
        <svg className="h-5 w-5" viewBox="0 0 24 16" fill="#4353FF">
          <path d="M17.802 1.297c-1.744 0-3.394.707-4.64 1.98-1.246-1.273-2.896-1.98-4.64-1.98C3.862 1.297 0 4.324 0 8.5v6.203h4.56v-5.54c0-.795.647-1.44 1.44-1.44.794 0 1.44.645 1.44 1.44v5.54h4.56v-5.54c0-.795.646-1.44 1.44-1.44.793 0 1.44.645 1.44 1.44v5.54H20V8.5c0-4.176-3.862-7.203-2.198-7.203z"/>
        </svg>
      ),
    },
    {
      name: "Framer",
      logo: (
        <svg className="h-5 w-5" viewBox="0 0 14 21" fill="#0055FF">
          <path d="M0 0h14v7H7zM0 7h7l7 7H7v7l-7-7z"/>
        </svg>
      ),
    },
    {
      name: "Linear",
      logo: (
        <svg className="h-5 w-5" viewBox="0 0 100 100" fill="#5E6AD2">
          <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"/>
          <path d="M50 20c-16.6 0-30 13.4-30 30s13.4 30 30 30 30-13.4 30-30-13.4-30-30-30z"/>
        </svg>
      ),
    },
    {
      name: "Notion",
      logo: (
        <svg className="h-5 w-5" viewBox="0 0 100 100" fill="none">
          <path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M61.35.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257-3.89c5.433-.387 6.99-2.917 6.99-7.193V20.64c0-2.21-.873-2.847-3.443-4.733L74.167 3.143c-4.273-3.107-6.02-3.5-12.817-2.917zM25.92 19.523c-5.247.353-6.437.433-9.417-1.99L8.927 11.507c-.77-.78-.383-1.753 1.557-1.947l53.193-3.887c4.467-.39 6.793 1.167 8.54 2.527l9.123 6.61c.39.197 1.36 1.36.193 1.36l-54.933 3.307-.68.047zM19.803 88.3V30.367c0-2.53.777-3.697 3.103-3.893L86 22.78c2.14-.193 3.107 1.167 3.107 3.693v57.547c0 2.53-.39 4.67-3.883 4.863l-60.377 3.5c-3.493.193-5.043-.97-5.043-4.083zm59.6-54.827c.387 1.75 0 3.5-1.75 3.7l-2.917.577v42.773c-2.527 1.36-4.853 2.137-6.797 2.137-3.107 0-3.883-.973-6.21-3.887l-19.03-29.94v28.967l6.02 1.363s0 3.5-4.857 3.5l-13.39.777c-.39-.78 0-2.723 1.357-3.11l3.497-.97v-38.3L30.48 40.667c-.39-1.75.58-4.277 3.3-4.473l14.367-.967 19.8 30.327v-26.83l-5.047-.58c-.39-2.143 1.163-3.7 3.103-3.89l13.4-.78z" fill="var(--background)"/>
        </svg>
      ),
    },
    {
      name: "Figma",
      logo: (
        <svg className="h-5 w-5" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
        </svg>
      ),
    },
    {
      name: "Airtable",
      logo: (
        <svg className="h-5 w-5" viewBox="0 0 200 170" fill="none">
          <path d="M90.039 12.368L24.079 39.66c-3.667 1.519-3.641 6.749.042 8.23l66.27 26.41a28.09 28.09 0 0 0 20.418 0l66.27-26.41c3.683-1.481 3.709-6.711.042-8.23l-65.96-27.292a28.09 28.09 0 0 0-21.122 0z" fill="#FCB400"/>
          <path d="M108.687 101.388v67.301c0 4.286 4.451 7.179 8.378 5.448l66.654-29.41a5.63 5.63 0 0 0 3.281-5.118V72.308c0-4.286-4.451-7.179-8.378-5.448l-66.654 29.41a5.63 5.63 0 0 0-3.281 5.118z" fill="#18BFFF"/>
          <path d="M91.313 100.439L37.61 75.155a5.63 5.63 0 0 0-8.074 5.087v62.879c0 2.299 1.392 4.373 3.519 5.237l53.703 21.848c4.044 1.644 8.242-1.596 8.242-5.908v-58.801a5.63 5.63 0 0 0-3.687-5.058z" fill="#F82B60"/>
        </svg>
      ),
    },
    {
      name: "Vercel",
      logo: (
        <svg className="h-4 w-4" viewBox="0 0 76 65" fill="currentColor">
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z"/>
        </svg>
      ),
    },
    {
      name: "Supabase",
      logo: (
        <svg className="h-5 w-5" viewBox="0 0 109 113" fill="none">
          <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="#3ECF8E"/>
          <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E" fillOpacity=".5"/>
        </svg>
      ),
    },
    {
      name: "Loom",
      logo: (
        <svg className="h-5 w-5" viewBox="0 0 32 32" fill="none">
          <path fill="#625DF5" d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16z"/>
          <path fill="#fff" d="M21.5 15.134l-4.33-2.5V7.866L22.5 11v4.134h-1zm-4.33 2.5v4.768l-5.34-3.084v-4.134l5.34 3.084v-.634zm0-5l5.33 3.084v4.768l-5.33-3.084v-4.768zM9.5 17.318l4.33 2.5v4.768L8.5 21.5v-4.182h1zm4.33-2.5V10.05l5.34 3.084v4.134l-5.34-3.084v.634zm0 5L8.5 16.734V11.966l5.33 3.084v4.768z"/>
        </svg>
      ),
    },
    {
      name: "Miro",
      logo: (
        <svg className="h-5 w-5" viewBox="0 0 48 48" fill="none">
          <rect fill="#FFDD33" rx="8" width="48" height="48"/>
          <path fill="#050038" d="M12 38V10h5l7 14-7 14h-5zm9 0V10h5l7 14-7 14h-5zm9 0V10h5l7 14-7 14h-5z"/>
        </svg>
      ),
    },
    {
      name: "Calendly",
      logo: (
        <svg className="h-5 w-5" viewBox="0 0 32 32" fill="none">
          <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14c3.73 0 7.14-1.46 9.66-3.84l-2.12-2.12A10.94 10.94 0 0116 27C10.486 27 6 22.514 6 17S10.486 7 16 7c2.76 0 5.26 1.12 7.07 2.93l2.12-2.12A13.94 13.94 0 0016 2z" fill="#006BFF"/>
          <path d="M16 8c-4.97 0-9 4.03-9 9s4.03 9 9 9c2.21 0 4.24-.8 5.81-2.12l-2.83-2.83A5.96 5.96 0 0116 22c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.38 0 2.63.56 3.54 1.46l2.83-2.83A8.96 8.96 0 0016 8z" fill="#006BFF"/>
        </svg>
      ),
    },
    {
      name: "Typeform",
      logo: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 5h18v3H14v13h-4V8H3V5z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--foreground)]/70">
            Built for Users of Your Favorite Tools
          </h2>
        </div>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

          {/* Scrolling container */}
          <div className="flex animate-scroll items-center">
            {/* First set of companies */}
            {companies.map((company) => (
              <div
                key={company.name}
                className="flex-shrink-0 mx-8 flex items-center gap-2 h-12 text-[var(--foreground)]/40 hover:text-[var(--foreground)]/60 transition-colors"
              >
                {company.logo}
                <span className="text-sm font-medium whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {companies.map((company) => (
              <div
                key={`${company.name}-dup`}
                className="flex-shrink-0 mx-8 flex items-center gap-2 h-12 text-[var(--foreground)]/40 hover:text-[var(--foreground)]/60 transition-colors"
              >
                {company.logo}
                <span className="text-sm font-medium whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8">
          <span className="flex items-center gap-2 text-[var(--foreground)]/60 text-sm">
            <svg className="w-4 h-4 text-[var(--accent-success)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Works with your existing stack
          </span>
          <span className="flex items-center gap-2 text-[var(--foreground)]/60 text-sm">
            <svg className="w-4 h-4 text-[var(--accent-success)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Bank sync coming soon
          </span>
        </div>
      </div>
    </section>
  );
}
