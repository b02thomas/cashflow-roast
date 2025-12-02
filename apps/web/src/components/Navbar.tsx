"use client";

export function Navbar() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-sm border-b border-[var(--background-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[var(--primary)]">Cashflow</span>
            <span className="text-xl font-bold text-[var(--foreground)]">Roast</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors"
            >
              Pricing
            </button>
          </div>

          <button
            onClick={() => scrollToSection("hero")}
            className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  );
}
