const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_FILE = path.join(ROOT, "data.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ messages: [] }, null, 2));
  }
}

function readData() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

function sendJson(res, statusCode, payload) {
  send(res, statusCode, JSON.stringify(payload), "application/json; charset=utf-8");
}

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ({
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
  })[ext] || "application/octet-stream";
}

const server = http.createServer((req, res) => {
  if (req.url === "/api/status" && req.method === "GET") {
    const data = readData();
    return sendJson(res, 200, {
      serverTime: new Date().toLocaleString("th-TH"),
      messageCount: data.messages.length,
    });
  }

  if (req.url === "/api/hello" && req.method === "POST") {
    const data = readData();
    const item = {
      message: "สวัสดี! เว็บนี้ทำงานผ่าน local server แล้ว",
      createdAt: new Date().toISOString(),
    };
    data.messages.push(item);
    writeData(data);
    return sendJson(res, 200, item);
  }

  const requestPath = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(PUBLIC_DIR, path.normalize(requestPath).replace(/^(\.\.[/\\])+/, ""));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    return send(res, 403, "Forbidden");
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      return send(res, 404, "Not Found");
    }
    res.writeHead(200, { "Content-Type": getMime(filePath) });
    res.end(content);
  });
});

ensureDataFile();
server.listen(PORT, () => {
  console.log(`Local web server running at http://localhost:${PORT}`);
});
