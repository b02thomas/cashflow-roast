"use server";

import { supabase } from "@/lib/supabase";

export type WaitlistResult = {
  success: boolean;
  message: string;
};

export async function joinWaitlist(email: string): Promise<WaitlistResult> {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return { success: true, message: "You're already on the list!" };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }

  return { success: true, message: "You're on the list! We'll be in touch soon." };
}
