const Package = require("../package.json");

const internals = {};

exports = module.exports = internals.register = function (server, options, next) {

  server.expose("name", Package.name);
  server.expose("version", Package.version);
  server.expose("description", Package.description);

  server.route({
    "method": "get",
    "path": "/api",
    "handler": function(request, reply) {
      server.log(["info"], "I Like Cake");
      reply("iSuck");
    }
  });

  return next();
};

internals.register.attributes = {
  "pkg": Package
};
