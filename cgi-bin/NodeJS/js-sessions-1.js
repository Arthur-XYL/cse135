#!/usr/bin/env node

const querystring = require('querystring');

const SESSION_COOKIE_NAME = 'sessionID';
const USERNAME_COOKIE_NAME = 'username';

process.stdin.setEncoding('utf8');

let body = '';

process.stdin.on('data', (chunk) => {
  body += chunk;
});

process.stdin.on('end', () => {
  const requestMethod = process.env.REQUEST_METHOD;
  const cookies = parseCookies(process.env.HTTP_COOKIE);
  const sessionID = cookies[SESSION_COOKIE_NAME];

  if (requestMethod === 'POST') {
    const data = querystring.parse(body);
    const name = data.username;

    if (name && !sessionID) {
      const newSessionID = createSessionID();
      process.stdout.write(`Set-Cookie: ${SESSION_COOKIE_NAME}=${newSessionID}\r\n`);
      process.stdout.write(`Set-Cookie: ${USERNAME_COOKIE_NAME}=${name}\r\n`);
    }

    process.stdout.write('Status: 303 See Other\r\n');
    process.stdout.write('Location: /cgi-bin/NodeJS/js-sessions-1.js\r\n');
    process.stdout.write('\r\n');
  } else {
    const username = cookies[USERNAME_COOKIE_NAME] || 'You do not have a name set';

    process.stdout.write('Cache-Control: no-cache\r\n');
    process.stdout.write('Content-Type: text/html\r\n');
    process.stdout.write('\r\n');

    process.stdout.write(`
    <html>
      <head><title>NodeJS Sessions</title></head>
      <body>
        <h1>NodeJS Sessions Page 1</h1>
        <p><b>Name:</b> ${username}</p>
        <br /><br />
        <a href="/cgi-bin/NodeJS/js-sessions-2.js">Session Page 2</a><br />
        <a href="/cgi-forms/js-cgiform.html">NodeJS CGI Form</a><br />
        <form style="margin-top:30px" action="/cgi-bin/NodeJS/js-destroy-session.js" method="get">
          <button type="submit">Destroy Session</button>
        </form>
      </body>
    </html>
    `);
  }
});

function parseCookies(cookieString) {
  const cookies = {};

  if (!cookieString) {
    return cookies;
  }

  const list = cookieString.split(';');
  for (let i = 0; i < list.length; i++) {
    const cookie = list[i].trim();
    const [name, value] = cookie.split('=');
    cookies[name] = value;
  }

  return cookies;
}

function createSessionID() {
  return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

process.stdin.resume();
