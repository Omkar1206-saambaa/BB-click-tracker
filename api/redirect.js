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
    await fetch(`https://script.google.com/macros/s/AKfycbx2Sf0qL4aFq4stXfoVEXN5H_jIt9D1yrhYc83w8wGhq821pMsLcDsORy4C3O_o_FZn/exec?link=${link}&user=${encodeURIComponent(user)}&campaign=${encodeURIComponent(campaign || "General")}`);
  } catch (err) {
    console.error("Logging error:", err);
  }

  res.writeHead(302, { Location: destination });
  res.end();
}
