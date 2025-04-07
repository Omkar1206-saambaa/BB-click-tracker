export default async function handler(req, res) {
  const { link, user, campaign } = req.query;

  const DESTINATIONS = {
    youtube1: "https://www.youtube.com/watch?v=6YpDlx7ofHI&t=20s",
    article2link: "https://www.webmd.com/diet/health-benefits-chia-seeds",
    article1podcastlink: "https://wondery.com/shows/how-i-built-this/episode/10386-minted-mariam-naficy-2018/",
    article1link: "https://www.vcuhealth.org/news/one-small-step-the-mental-health-benefits-of-walking-outside/",
    lucidmotorsad: "https://lucidmotors.com/",
    loyalityprogram: "https://bareblends.com/loyalty-program",
    athletaad: "https://athleta.gap.com/",
    orderlink: "https://order.incentivio.com/c/bareblends",
    websitelink: "https://bareblends.com"
  };

  const destination = DESTINATIONS[link];

  if (!destination) {
    return res.status(400).send("Invalid link parameter.");
  }

  try {
    await fetch(`https://script.google.com/macros/s/AKfycbxWVJ4xcVUz8sJgcpRR_-2b-KjNeJg0zNjV1quoPrS-T9iMPHXYQevpX_URpYdLMDUd/exec?link=${link}&user=${encodeURIComponent(user)}&campaign=${encodeURIComponent(campaign || "General")}`);
  } catch (err) {
    console.error("Logging error:", err);
  }

  res.writeHead(302, { Location: destination });
  res.end();
}
