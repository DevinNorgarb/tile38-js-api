const path = require("path");
const config = require("./config");
const fastify = require("fastify")();

// compression - add x-protobuf
fastify.register(require("fastify-compress"), {
  customTypes: /^text\/|\+json$|\+text$|\+xml|x-protobuf$/,
});

// CORS
fastify.register(require("fastify-cors"));

// swagger documentation
fastify.register(require("fastify-swagger"), {
  exposeRoute: true,
  swagger: config.swagger,
});

fastify.get("/map", { schema: { hide: false } }, (req, reply) => {
  reply.sendFile("ol.html");
});

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

// routes
fastify.register(require("fastify-autoload"), {
  dir: path.join(__dirname, "routes"),
});

// Launch server
fastify.listen(config.server.port, config.server.host || "localhost", function (
  err,
  address
) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.info(`Server listening on ${address}`);
});
