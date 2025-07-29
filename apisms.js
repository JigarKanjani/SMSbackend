// apisms.js
// Node.js API route for sending SMS using Fast2SMS

import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone, message } = req.body || {};

  if (!phone || !message) {
    return res.status(400).json({ error: 'Missing phone or message' });
  }

  // Compose the API request to Fast2SMS
  try {
    // Use the Fast2SMS API key from environment or fallback to provided key
    const apiKey = process.env.FAST2SMS_API_KEY || '5QWCXEBm42aG0AUFz8vStHTMgsuolexhwZbcDrp9KNYyJ3IVOi0FRDxSIPN9wm6uH87QhcdjOzfnqMCE';
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        authorization: apiKey,
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'q',
        message,
        language: 'english',
        numbers: '91' + phone
      })
    });

    const data = await response.json();

    // Forward the response from Fast2SMS to the client
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send SMS', details: err.message });
  }
}
