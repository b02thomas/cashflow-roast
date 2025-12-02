import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// We need to test the module behavior, so we'll reimport it fresh for each test
describe("Supabase Client SSR Safety", () => {
  const originalWindow = global.window;

  beforeEach(() => {
    // Reset module cache before each test
    vi.resetModules();
  });

  afterEach(() => {
    // Restore window
    global.window = originalWindow;
  });

  describe("createSupabaseBrowserClient", () => {
    it("should not throw when called during SSR (no window)", async () => {
      // Simulate SSR environment
      // @ts-expect-error - intentionally removing window for SSR simulation
      delete global.window;

      const { createSupabaseBrowserClient } = await import("@/lib/supabase");

      // Should not throw during SSR
      expect(() => createSupabaseBrowserClient()).not.toThrow();
    });

    it("should return a client object during SSR", async () => {
      // @ts-expect-error - intentionally removing window for SSR simulation
      delete global.window;

      const { createSupabaseBrowserClient } = await import("@/lib/supabase");
      const client = createSupabaseBrowserClient();

      // Should return an object with auth property (even if dummy)
      expect(client).toBeDefined();
      expect(client).toHaveProperty("auth");
    });

    it("should work in browser environment with placeholder values", async () => {
      // Ensure window exists (jsdom provides this)
      expect(typeof window).toBe("object");

      const { createSupabaseBrowserClient } = await import("@/lib/supabase");

      // Should not throw in browser (uses placeholder values when env vars missing)
      expect(() => createSupabaseBrowserClient()).not.toThrow();

      const client = createSupabaseBrowserClient();
      expect(client).toBeDefined();
      expect(client).toHaveProperty("auth");
    });

    it("should return singleton in browser", async () => {
      const { createSupabaseBrowserClient } = await import("@/lib/supabase");

      const client1 = createSupabaseBrowserClient();
      const client2 = createSupabaseBrowserClient();

      // Should be the same instance (singleton)
      expect(client1).toBe(client2);
    });
  });

  describe("createSupabaseServerClient", () => {
    it("should not throw when called with placeholder values", async () => {
      const { createSupabaseServerClient } = await import("@/lib/supabase");

      // Should not throw (uses placeholder values when env vars missing)
      expect(() => createSupabaseServerClient()).not.toThrow();
    });

    it("should return a client object", async () => {
      const { createSupabaseServerClient } = await import("@/lib/supabase");
      const client = createSupabaseServerClient();

      expect(client).toBeDefined();
      expect(client).toHaveProperty("from");
    });
  });

  describe("SSR/Build safety", () => {
    it("should use placeholder URL during SSR to prevent build failures", async () => {
      // @ts-expect-error - intentionally removing window for SSR simulation
      delete global.window;

      const { createSupabaseBrowserClient } = await import("@/lib/supabase");

      // The key test: this should NOT throw even without env vars
      // This is what was causing Vercel build failures
      let error: Error | null = null;
      try {
        createSupabaseBrowserClient();
      } catch (e) {
        error = e as Error;
      }

      expect(error).toBeNull();
    });

    it("should handle build-time static generation without env vars", async () => {
      // Save original env vars
      const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const originalKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      // Clear env vars to simulate Vercel build-time
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      vi.resetModules();

      // Simulate SSR
      // @ts-expect-error - intentionally removing window for SSR simulation
      delete global.window;

      const { createSupabaseBrowserClient } = await import("@/lib/supabase");

      // Should not throw - this is the critical test for Vercel deployment
      expect(() => createSupabaseBrowserClient()).not.toThrow();

      // Restore
      process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalKey;
    });
  });
});
