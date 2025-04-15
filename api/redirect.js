export default async function handler(req, res) {
  const { link, user, campaign } = req.query;

  const DESTINATIONS = {
    youtube1: "https://www.youtube.com/watch?v=6YpDlx7ofHI",
    article2link: "https://www.drweil.com/health-wellness/balanced-living/exercise-fitness/yoga-more-than-a-workout/",
    article1link: "https://blog.themindfulnessapp.com/articles/building-a-mindful-morning-routine",
    lexusad: "https://www.lexus.com/",
    ritzad: "https://www.ritzcarlton.com/",
    websitelink: "https://www.drybar.com/"
  };

  const destination = DESTINATIONS[link];

  if (!destination) {
    return res.status(400).send("Invalid link parameter.");
  }

  try {
    const logUrl = `https://script.google.com/macros/s/AKfycbybkFNYUMeNnhtjPRCRQL57Bl7sGJlBr0fsUJxK8V3eaowAibF1mP8RJokDAXsOQ9qf/exec?link=${link}&user=${encodeURIComponent(user)}&campaign=${encodeURIComponent(campaign || "General")}`;

    const response = await fetch(logUrl);
    const text = await response.text();

    console.log("📬 Log URL:", logUrl);
    console.log("📬 Response status:", response.status);
    console.log("📬 Response text:", text);
  } catch (err) {
    console.error("❌ Logging error:", err);
  }

  res.writeHead(302, { Location: destination });
  res.end();
}
