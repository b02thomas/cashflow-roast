import { redirect } from "next/navigation";
import { getUser, createSupabaseServerClient } from "@/lib/supabase-server";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default async function OnboardingPage() {
  const user = await getUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/auth/login");
  }

  // Check if onboarding is already complete
  const supabase = await createSupabaseServerClient();
  const { data: profile } = await supabase
    .from("Profile")
    .select("onboardingComplete")
    .eq("id", user.id)
    .single();

  // Redirect to dashboard if already onboarded
  if (profile?.onboardingComplete) {
    redirect("/dashboard");
  }

  return <OnboardingWizard />;
}
