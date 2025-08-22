import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

// Setup Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

app.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Verification token required" });
    }

    // Lookup subscriber
    const { data: subscriber, error: fetchError } = await supabase
      .from("newsletter_subscribers")
      .select("id, email, verified, subscription_status")
      .eq("verification_token", token)
      .single();

    if (fetchError || !subscriber) {
      return res.status(400).json({ error: "Invalid or expired verification token" });
    }

    if (subscriber.verified) {
      return res.status(200).json({
        message: "Email already verified!",
        email: subscriber.email,
      });
    }

    // Update subscriber
    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({
        verified: true,
        verification_token: null,
        subscription_status: "active",
        last_updated: new Date().toISOString(),
      })
      .eq("id", subscriber.id);

    if (updateError) {
      return res.status(500).json({ error: "Failed to verify email" });
    }

    return res.status(200).json({
      message: "Email verified successfully!",
      email: subscriber.email,
    });

  } catch (err) {
    console.error("Email verification error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default app;
