"use client";

export function FinalCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
          Your cashflow is your most valuable asset.
        </h2>
        <p className="text-lg text-[var(--foreground)]/70 mb-8">
          Let your AI coach protect it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] font-semibold rounded-lg transition-colors"
          >
            Join Waitlist
          </button>
          <button
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-[var(--background-secondary)] hover:bg-[var(--background-secondary)]/80 text-[var(--foreground)] font-semibold rounded-lg transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
