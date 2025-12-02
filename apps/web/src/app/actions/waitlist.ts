"use server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type WaitlistResult = {
  success: boolean;
  message: string;
};

export async function joinWaitlist(email: string): Promise<WaitlistResult> {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("waitlist").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return { success: true, message: "You're already on the list!" };
    }
    return { success: false, message: "Something went wrong. Please try again." };
  }

  // Send welcome email
  try {
    await resend.emails.send({
      from: "CashflowsRoast.ai <onboarding@resend.dev>",
      to: email,
      subject: "You're on the list! 🔥",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #00ADB5; margin-bottom: 24px;">Welcome to CashflowsRoast.ai!</h1>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            You're officially on our early access list. We're building an AI invoicing app that doesn't just create invoices — it roasts your pricing decisions.
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            <strong>What you'll get:</strong>
          </p>
          <ul style="color: #333; font-size: 16px; line-height: 1.8;">
            <li>🎯 Natural language invoice creation</li>
            <li>🔥 AI "roasts" that find your revenue leaks</li>
            <li>📊 Insights on undercharging & scope creep</li>
            <li>🚀 Early access pricing (locked in forever)</li>
          </ul>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            We'll notify you the moment we launch.
          </p>
          <p style="color: #666; font-size: 14px; margin-top: 40px;">
            — The CashflowsRoast.ai Team
          </p>
        </div>
      `,
    });
  } catch (emailError) {
    // Don't fail the signup if email fails, just log it
    console.error("Failed to send welcome email:", emailError);
  }

  return { success: true, message: "You're on the list! Check your inbox 📬" };
}
