const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const date = new Date().toLocaleString();
  const ip = req.ip;
  const message = 'Hello NodeJS World!';

  const html = `
    <html>
      <head>
        <title>${message}</title>
      </head>
      <body>
        <h1>${message}</h1>
		<p>This page was generated with the NodeJS programming language</p>
        <p>Current Time: ${date}</p>
        <p>User's IP Address: ${ip}</p>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000, () => console.log('Server running on port 3000'));
