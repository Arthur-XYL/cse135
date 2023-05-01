#!/usr/bin/env node

const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use express-session middleware
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

app.locals.username = '';

// Headers
process.stdout.write("Cache-Control: no-cache\n");
process.stdout.write("Content-type: text/html\n\n"); // Add Content-type header

// Get Name from Environment
app.post('../cgi-bin/NodeJS/js-sessions-1.js', (req, res) => {
  const name = req.body.username;
  // Set the app.locals variable
  if (name) {
    app.locals.username = name;
  }
  // Redirect to the same page to display the username
  res.redirect('../cgi-bin/NodeJS/js-sessions-1.js');
});

// Body - HTML
process.stdout.write("<html>");
process.stdout.write("<head><title>NodeJS Sessions</title></head>\n");
process.stdout.write("<body>");
process.stdout.write("<h1>NodeJS Sessions Page 1</h1>");
process.stdout.write("<table>");

// Check for the app.locals variable
if (app.locals.username) {
  process.stdout.write(`<tr><td>Cookie:</td><td>${app.locals.username}</td></tr>\n`);
}
else {
  process.stdout.write("<tr><td>Cookie:</td><td>None</td></tr>\n");
}

process.stdout.write("</table>");

// Links for other pages
process.stdout.write("<br />");
process.stdout.write('<a href="/cgi-bin/NodeJS/js-sessions-2.js">Session Page 2</a>');
process.stdout.write("<br />");
process.stdout.write('<a href="/cgi-forms/js-cgiform.html">NodeJS CGI Form</a>');
process.stdout.write("<br /><br />");
// Destroy Session button
process.stdout.write('<form action="/cgi-bin/NodeJS/js-destroy-session.js" method="get">');
process.stdout.write('<button type="submit">Destroy Session</button>');
process.stdout.write('</form>');

process.stdout.write("</body>");
process.stdout.write("</html>");


// const session = require('express-session');
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(session({
//   secret: 'mysecretkey',
//   resave: false,
//   saveUninitialized: true
// }));

// app.use(bodyParser.urlencoded({ extended: false }));

// app.post('../cgi-bin/NodeJS/js-sessions-1.js', (req, res) => {
//   const name = req.body.username;
//   if (name) {
//     req.session.username = name;
//   }
//   res.redirect('../cgi-bin/NodeJS/js-sessions-1.js');
// });

// app.get('/destroy-session', (req, res) => {
//   req.session.destroy();
//   res.redirect('/');
// });

// app.get('/', (req, res) => {
//   res.send(`
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <title>NodeJS Sessions</title>
//         </head>
//         <body>
//             <h1>NodeJS Sessions Page 1</h1>
//             <table>
//                 <tr>
//                     <td>Username:</td>
//                     <td id="usernameDisplay">${req.session.username || 'None'}</td>
//                 </tr>
//             </table>
//             <br />
//             <form id="usernameForm" action="/set-username" method="post">
//                 <input type="text" name="username" placeholder="Enter username" />
//                 <button type="submit">Set username</button>
//             </form>
//             <br />
//             <a href="/destroy-session">Destroy Session</a>
//             <br />
//             <script>
//                 document.getElementById('usernameForm').addEventListener('submit', (e) => {
//                     e.preventDefault();

//                     const form = e.target;
//                     const formData = new FormData(form);

//                     fetch(form.action, {
//                         method: form.method,
//                         body: formData,
//                     }).then(() => {
//                         window.location.reload();
//                     });
//                 });
//             </script>
//         </body>
//         </html>
//     `);
// });

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });