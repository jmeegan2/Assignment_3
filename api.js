const http = require('http');
const url = require('url');

const port = 3000; // Set the desired port number here

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  
  if (req.url === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.end();
    return;
  }
  
  if (req.method === 'GET') {
    if (pathname === '/api/parsetime') {
      const iso = query.iso;
      if (iso) {
        const date = new Date(iso);
        const response = {
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds()
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } else {
        res.writeHead(401);
        res.end();
      }
    } else if (pathname === '/api/unixtime') {
      const iso = query.iso;
      if (iso) {
        const unixTime = new Date(iso).getTime();
        const response = {
          unixtime: unixTime
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } else {
        res.writeHead(401);
        res.end();
      }
    } else {
      res.writeHead(401);
      res.end();
    }
  } else {
    res.writeHead(401);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});