const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, firstName, archetype, secondaryArchetype, responses } = req.body ?? {};

  if (!email || !firstName || !archetype) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (typeof email !== "string" || typeof firstName !== "string" || typeof archetype !== "string") {
    return res.status(400).json({ error: "Invalid field types" });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  if (email.length > 254 || firstName.length > 100 || archetype.length > 100) {
    return res.status(400).json({ error: "Field value too long" });
  }

  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;
  const airtableKey = process.env.AIRTABLE_API_KEY;
  const airtableBaseId = process.env.AIRTABLE_BASE_ID;

  // ── Beehiiv ──────────────────────────────────────────────────────────────────
  if (publicationId && apiKey) {
    try {
      const beehiivRes = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            first_name: firstName.trim(),
            reactivate_existing: true,
            send_welcome_email: true,
            automation_ids: ["aut_bc695caa-d25b-4133-894c-04423a301510"],
            custom_fields: [
              { name: "archetype", value: archetype },
              { name: "secondary_archetype", value: secondaryArchetype ?? "" },
            ],
          }),
        }
      );
      const beehiivData = await beehiivRes.json();
      console.log("Beehiiv status:", beehiivRes.status, JSON.stringify(beehiivData));

      // Enroll in automation via separate call
      const subscriberId = beehiivData?.data?.id;
      if (subscriberId) {
        const automationRes = await fetch(
          `https://api.beehiiv.com/v2/publications/${publicationId}/automations/aut_bc695caa-d25b-4133-894c-04423a301510/journeys`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ subscriber_id: subscriberId }),
          }
        );
        const automationData = await automationRes.json();
        console.log("Automation status:", automationRes.status, JSON.stringify(automationData));
      }
    } catch (err) {
      console.error("Beehiiv error:", err);
    }
  }

  // ── Airtable ─────────────────────────────────────────────────────────────────
  if (airtableKey && airtableBaseId) {
    try {
      const fields = {
        "Name": firstName.trim(),
        "Email": email.trim().toLowerCase(),
        "Primary Archetype": archetype,
        "Secondary Archetype": secondaryArchetype ?? "",
        "Submitted At": new Date().toISOString(),
      };

      if (Array.isArray(responses)) {
        responses.forEach(({ answer }, i) => {
          fields[`Q${i + 1}`] = answer;
        });
      }

      const airtableRes = await fetch(
        `https://api.airtable.com/v0/${airtableBaseId}/Responses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airtableKey}`,
          },
          body: JSON.stringify({ fields }),
        }
      );
      const airtableData = await airtableRes.json();
      console.log("Airtable status:", airtableRes.status, JSON.stringify(airtableData));
    } catch (err) {
      console.error("Airtable error:", err);
    }
  }

  return res.status(200).json({ success: true });
}
