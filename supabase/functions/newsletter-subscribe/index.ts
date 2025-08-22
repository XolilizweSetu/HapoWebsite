import express from "express";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const router = express.Router();

// Setup Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Generate verification token
    const verificationToken = `verify_${Date.now()}_${crypto.randomUUID()}`;

    // Lookup existing subscriber
    const { data: existingSubscriber, error: fetchError } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) {
      console.error("Database fetch error:", fetchError);
      return res.status(500).json({ error: "Database lookup failed" });
    }

    if (existingSubscriber) {
      if (
        existingSubscriber.subscription_status === "active" &&
        existingSubscriber.verified
      ) {
        return res.json({ message: "Email already subscribed" });
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from("newsletter_subscribers")
          .update({
            subscription_status: "pending",
            verification_token: verificationToken,
            verified: false,
            last_updated: new Date().toISOString(),
          })
          .eq("email", email);

        if (updateError) throw updateError;
      }
    } else {
      // Insert new subscriber
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({
          email,
          verification_token: verificationToken,
          subscription_status: "pending",
          verified: false,
        });

      if (insertError) throw insertError;
    }

    // Build verification link
    const verificationUrl = `${
      req.headers.origin || "http://localhost:5173"
    }/verify-email?token=${verificationToken}`;

    console.log("Verification URL:", verificationUrl); // useful for dev
    // TODO: send via EmailJS/SMTP here

    return res.json({
      message: "Subscription successful! Please check your email to verify.",
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
