import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

describe("Build Validation", () => {
  const webAppPath = path.resolve(__dirname, "../..");

  describe("TypeScript compilation", () => {
    it("should pass TypeScript type checking", () => {
      expect(() => {
        execSync("npx tsc --noEmit", {
          cwd: webAppPath,
          encoding: "utf-8",
          stdio: "pipe",
        });
      }).not.toThrow();
    });
  });

  describe("Critical files exist", () => {
    const criticalFiles = [
      "src/lib/supabase.ts",
      "src/lib/auth-context.tsx",
      "src/app/layout.tsx",
      "src/app/page.tsx",
      "src/app/auth/login/page.tsx",
      "src/app/auth/signup/page.tsx",
    ];

    criticalFiles.forEach((file) => {
      it(`should have ${file}`, () => {
        const filePath = path.join(webAppPath, file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });
  });

  describe("Supabase client implementation", () => {
    it("should have SSR-safe createSupabaseBrowserClient", () => {
      const supabasePath = path.join(webAppPath, "src/lib/supabase.ts");
      const content = fs.readFileSync(supabasePath, "utf-8");

      // Check for SSR safety pattern
      expect(content).toContain('typeof window === "undefined"');
    });

    it("should have fallback values for env vars", () => {
      const supabasePath = path.join(webAppPath, "src/lib/supabase.ts");
      const content = fs.readFileSync(supabasePath, "utf-8");

      // Check for placeholder fallback pattern
      expect(content).toContain("PLACEHOLDER_URL");
      expect(content).toContain("PLACEHOLDER_KEY");
    });

    it("should not have module-level Supabase client instantiation", () => {
      const supabasePath = path.join(webAppPath, "src/lib/supabase.ts");
      const content = fs.readFileSync(supabasePath, "utf-8");

      // Should NOT have direct export const supabase = createSupabaseBrowserClient()
      expect(content).not.toMatch(
        /export\s+const\s+supabase\s*=\s*createSupabaseBrowserClient\(\)/
      );
    });
  });

  describe("Auth context implementation", () => {
    it("should defer Supabase client creation to client-side", () => {
      const authContextPath = path.join(
        webAppPath,
        "src/lib/auth-context.tsx"
      );
      const content = fs.readFileSync(authContextPath, "utf-8");

      // Should have window check or useRef pattern for deferred initialization
      const hasWindowCheck = content.includes('typeof window !== "undefined"');
      const hasUseRef = content.includes("useRef");

      expect(hasWindowCheck || hasUseRef).toBe(true);
    });

    it("should be marked as client component", () => {
      const authContextPath = path.join(
        webAppPath,
        "src/lib/auth-context.tsx"
      );
      const content = fs.readFileSync(authContextPath, "utf-8");

      expect(content).toContain('"use client"');
    });
  });

  describe("Auth pages implementation", () => {
    const authPages = [
      "src/app/auth/login/page.tsx",
      "src/app/auth/signup/page.tsx",
    ];

    authPages.forEach((pagePath) => {
      it(`${pagePath} should be a client component`, () => {
        const fullPath = path.join(webAppPath, pagePath);
        const content = fs.readFileSync(fullPath, "utf-8");

        expect(content).toContain('"use client"');
      });
    });
  });

  describe("No problematic patterns", () => {
    it("should not have direct browser API calls at module level in lib files", () => {
      const libPath = path.join(webAppPath, "src/lib");
      const files = fs.readdirSync(libPath).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

      files.forEach((file) => {
        const content = fs.readFileSync(path.join(libPath, file), "utf-8");

        // Check for problematic patterns at module level (outside functions)
        // This is a simplified check - looks for window/document without being inside a function
        const lines = content.split("\n");
        let insideFunction = 0;

        lines.forEach((line, index) => {
          if (line.includes("function") || line.includes("=>")) {
            insideFunction++;
          }
          if (line.includes("}") && insideFunction > 0) {
            insideFunction--;
          }

          // Skip if inside a function or if it's a type check
          if (insideFunction === 0 && !line.includes("typeof window")) {
            // These patterns at module level would be problematic
            expect(line).not.toMatch(/^\s*window\./);
            expect(line).not.toMatch(/^\s*document\./);
            expect(line).not.toMatch(/^\s*localStorage\./);
          }
        });
      });
    });
  });
});
