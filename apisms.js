// apisms.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { phone, message } = req.body;
  if (!phone || !message) {
    return res.status(400).json({ error: 'Missing phone or message' });
  }
  // Send SMS via Fast2SMS
  const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
    method: 'POST',
    headers: {
      'authorization': '5QWCXEBm42aG0AUFz8vStHTMgsuolexhwZbcDrp9KNYyJ3IVOi0FRDxSIPN9wm6uH87QhcdjOzfnqMCE',
      'accept': 'application/json',
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
  res.status(200).json(data);
}
