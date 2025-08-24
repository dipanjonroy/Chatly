const app = require("./app");
const http = require("http");
const { connectToSocket } = require("./controllers/socketController");
const port = process.env.PORT || 3030;

const server = http.createServer(app);

connectToSocket(server);

// if (process.env.NODE_ENV !== "production") {
//   server.listen(port, () => {
//     console.log(`Server is listening from port ${port}`);
//   });
// }

server.listen(port, () => {
  console.log(`✅ Server is listening on http://localhost:${port}`);
});
