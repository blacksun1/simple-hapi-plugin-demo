/* eslint-disable */
"use strict";

const Hapi = require("hapi");

const internals = {};

internals.plugins = [
  require("./dist/index"),
  require("blipp")
];

internals.ports = {
  "port": process.env.npm_package_config_port || 8080
}

internals.server = new Hapi.Server();
internals.server.connection(internals.ports);

process.on("SIGINT", () => {
  internals.server.log(["info"], {"msg": "Server is stopping"});
  internals.server.stop()
    .then(() => process.exit(0));
});

process.once("SIGUSR2", () => {
  internals.server.log(["info"], {"msg": "Server is stopping"});
  internals.server.stop()
    .then(() => {
      internals.server = null;
      process.kill(process.pid, "SIGUSR2");
    });
});

internals.server.register(internals.plugins)
  .then(() => internals.server.start())
  .catch(err => {
    console.error(err);
    console.error(err.stack);
  });

internals.server.on("error", message => console.log("ERROR", message));
internals.server.on("log", (event, tags) => console.log("LOG", event.timestamp, event.tags, event.data));
internals.server.on("response", request => console.log("RESPONSE", request.path, request.response.statusCode));
internals.server.on("start", () => internals.server.log(["info"], {"msg": `Server running at: ${internals.server.info.uri}`}));
internals.server.on("stop", () => internals.server.log(["info"], {"msg": "Server stopped"}));

