const fs = require('fs');
const https = require('https');

// Download a placeholder OG image generator
const data = JSON.stringify({
  title: 'SLEDGE BOT',
  subtitle: '"Sledgy sees you. Sledgy helps."',
  theme: 'dark'
});

const req = https.request({
  hostname: 'og-image.vercel.app',
  path: '/api/og',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    fs.writeFileSync('/home/dave/sites/sledgebot.com/public/og.png', body);
    console.log('Saved og.png');
  });
});

req.on('error', console.error);
req.write(data);
req.end();
