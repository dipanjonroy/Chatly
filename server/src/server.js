const app = require("./app");
const http = require("http");
const { connectToSocket } = require("./controllers/socketController");
const port = process.env.PORT || 3030;

const server = http.createServer(app);

connectToSocket(server);

server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
