const transparentPixel = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAn0B9Lq8VfsAAAAASUVORK5CYII=',
  'base64'
);

function parseUserAgent(ua) {
  let browser = 'Unknown', os = 'Unknown', device = 'desktop';

  if (/mobile/i.test(ua)) device = 'mobile';
  else if (/tablet/i.test(ua)) device = 'tablet';

  if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua)) browser = 'Safari';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/edg/i.test(ua)) browser = 'Edge';
  else if (/msie|trident/i.test(ua)) browser = 'Internet Explorer';

  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os/i.test(ua)) os = 'Mac OS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  return { browser, os, device };
}

export default async function handler(req, res) {
  const { email } = req.query;
  const userAgent = req.headers['user-agent'] || 'unknown';
  const parsed = parseUserAgent(userAgent);

  const logData = {
    timestamp: new Date().toISOString(),
    email: email || 'unknown',
    browser: parsed.browser,
    os: parsed.os,
    device: parsed.device,
    rawUserAgent: userAgent,
  };

  try {
    await fetch('https://script.google.com/macros/s/AKfycbxX3VhSsY4G6YmM-y_j55yFzX3-hBSEGCET4YFASDIjBZAMDycNBbM1hGl0rOhflkSK/exec', {
      method: 'POST',
      body: JSON.stringify(logData),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Failed to log open:', err);
  }

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).end(transparentPixel);
}
