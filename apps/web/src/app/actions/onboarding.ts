"use server";

import { createSupabaseServerClient, getUser } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export type OnboardingData = {
  appMode?: "business" | "personal" | "both";
  businessName?: string;
  currency?: string;
  logoUrl?: string;
  brandColor?: string;
  businessType?: "services" | "products" | "both";
  targetHourlyRate?: number;
  monthlyRevenueGoal?: number;
  monthlySalary?: number;
  monthlySavingsGoal?: number;
};

export async function saveOnboardingStep(data: OnboardingData) {
  const user = await getUser();

  if (!user) {
    return { success: false, message: "Not authenticated" };
  }

  const supabase = await createSupabaseServerClient();

  // Upsert profile with new data
  const { error } = await supabase
    .from("Profile")
    .upsert(
      {
        id: user.id,
        email: user.email,
        ...data,
      },
      { onConflict: "id" }
    );

  if (error) {
    console.error("Error saving onboarding step:", error);
    return { success: false, message: "Failed to save progress" };
  }

  revalidatePath("/onboarding");
  return { success: true, message: "Progress saved" };
}

export async function uploadLogo(formData: FormData) {
  const user = await getUser();

  if (!user) {
    return { success: false, message: "Not authenticated", url: null };
  }

  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, message: "No file provided", url: null };
  }

  const supabase = await createSupabaseServerClient();

  // Upload to Supabase Storage
  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}/logo.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("logos")
    .upload(fileName, file, { upsert: true });

  if (uploadError) {
    console.error("Error uploading logo:", uploadError);
    return { success: false, message: "Failed to upload logo", url: null };
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("logos").getPublicUrl(fileName);

  // Update profile with logo URL
  await saveOnboardingStep({ logoUrl: publicUrl });

  return { success: true, message: "Logo uploaded", url: publicUrl };
}

export async function completeOnboarding() {
  const user = await getUser();

  if (!user) {
    return { success: false, message: "Not authenticated" };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("Profile")
    .update({ onboardingComplete: true })
    .eq("id", user.id);

  if (error) {
    console.error("Error completing onboarding:", error);
    return { success: false, message: "Failed to complete onboarding" };
  }

  revalidatePath("/");
  return { success: true, message: "Onboarding complete!" };
}

export async function getProfile() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("Profile")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}
