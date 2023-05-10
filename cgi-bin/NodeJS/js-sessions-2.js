#!/usr/bin/env node

const querystring = require('querystring');

const COOKIE_NAME = 'username';

process.stdin.setEncoding('utf8');

process.stdin.on('end', () => {
  const cookies = parseCookies(process.env.HTTP_COOKIE);
  const username = cookies[COOKIE_NAME] || 'You do not have a name set';

  process.stdout.write('Cache-Control: no-cache\r\n');
  process.stdout.write('Content-Type: text/html\r\n');
  process.stdout.write('\r\n');

  process.stdout.write(`
    <html>
      <head><title>NodeJS Sessions</title></head>
      <body>
        <h1>NodeJS Sessions Page 2</h1>
        <p><b>Name:</b> ${username}</p>
        <br /><br />
        <a href="/cgi-bin/NodeJS/js-sessions-1.js">Session Page 1</a><br />
        <a href="/cgi-forms/js-cgiform.html">NodeJS CGI Form</a><br />
        <form style="margin-top:30px" action="/cgi-bin/NodeJS/js-destroy-session.js" method="get">
          <button type="submit">Destroy Session</button>
        </form>
      </body>
    </html>
  `);
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

process.stdin.resume();
