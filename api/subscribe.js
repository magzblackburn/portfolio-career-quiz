export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, firstName, archetype } = req.body;

  if (!email || !firstName || !archetype) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;

  if (!publicationId || !apiKey) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          first_name: firstName,
          reactivate_existing: true,
          send_welcome_email: true,
          custom_fields: [
            { name: "archetype", value: archetype },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Beehiiv error:", data);
      return res.status(response.status).json({ error: data.message || "Beehiiv error" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
