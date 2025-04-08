import UAParser from 'ua-parser-js';

const transparentPixel = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAn0B9Lq8VfsAAAAASUVORK5CYII=',
  'base64'
);

export default async function handler(req, res) {
  const { email } = req.query;
  const userAgent = req.headers['user-agent'] || 'unknown';

  const parser = new UAParser(userAgent);
  const ua = parser.getResult();

  const logData = {
    timestamp: new Date().toISOString(),
    email: email || 'unknown',
    browser: `${ua.browser.name} ${ua.browser.version}`,
    os: `${ua.os.name} ${ua.os.version}`,
    device: ua.device.type || 'desktop',
    rawUserAgent: userAgent,
  };

  try {
    await fetch('https://script.google.com/macros/s/AKfycbyEKCRm4ugimilZJoxrq95TZrfEhG7rMwR2mee_6Vf_2BkB2Wqbbi3pYDMDVgXmc1zQ/exec', {
      method: 'POST',
      body: JSON.stringify(logData),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('OpenLog POST failed:', err);
  }

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).end(transparentPixel);
}
