// create an api with vanilla node
const http = require("http");

// create a server to listen to requests
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    console.log("hello from server");
    res.end();
  }
});

server.listen(3001, () => console.log("Server on http://localhost:3001"));
