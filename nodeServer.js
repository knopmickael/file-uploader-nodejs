const fs = require("fs");
const http = require("http");

const toJson = (data) => JSON.stringify(data);

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  switch (req.method) {
    case "GET":
      switch (req.url) {
        case "/":
          res.end(toJson({ message: "Hello world" }));
          break;
        default:
          res.statusCode = 404;
          res.end(toJson({ error: "Not found" }));
          break;
      }
      break;
    case "POST":
      switch (req.url) {
        case "/upload-file":
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            try {
              const { b64img } = JSON.parse(body);
              const b64 = b64img.split(",")[1];
              const imgBuffer = Buffer.from(b64, "base64");

              fs.writeFile("file.jpeg", imgBuffer, (err) => {
                if (err) {
                  res.statusCode = 500;
                  res.end(toJson({ error: err.message }));
                } else {
                  res.statusCode = 201;
                  res.end(toJson({ message: "File uploaded successfully" }));
                }
              });
            } catch (err) {
              res.statusCode = 500;
              res.end(toJson({ error: err.message }));
            }
          });
          break;
        default:
          res.statusCode = 404;
          res.end(toJson({ error: "Not found" }));
          break;
      }
      break;
  }
});

server.listen(3000, () => {
  console.log("Node server at 3000");
});
