import Package from "../package.json";


exports.register = function (server, options, next) {

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

exports.register.attributes = {
  "pkg": Package
};
