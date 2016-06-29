const Lab = require("lab");
const Code = require("code");
const Hapi = require("hapi");
const Plugin = require("../dist/index");


// Export and alias Lab and Code
const lab = exports.lab = Lab.script();
const {expect} = Code;
const {beforeEach, experiment, test} = lab;

// Get the port from the package.json
const port = {
  // eslint-disable-next-line
  "port": process.env.npm_package_config_port
};


let server;

experiment("bitcoin-server", () => {

  experiment("when registered without a URL prefix", () => {

    beforeEach(() => {

      server = new Hapi.Server();
      server.connection(port);

      return server.register([{"register": Plugin}])
        .then(() => server.initialize());
    });

    test("must return a 404 for a non-existant url", () =>{

      const request = {
        "method": "GET",
        "url": "/asdasdasdasd"
      };

      return server
        .inject(request)
        .then(response => {

          expect(response.statusCode).to.equal(404);
        });

    });

    test("must return a 200 API comes back", () =>{

      const request = {
        "method": "GET",
        "url": "/api?page=1"
      };

      return server
        .inject(request)
        .then(response => {

          expect(response.statusCode).to.equal(200);
          expect(response.result).to.equal("iSuck");
        });

    });

  });

  experiment("when registered with a URL prefix", () => {

    beforeEach(() => {

      server = new Hapi.Server();
      server.connection({"port": "1337"});

      return server.register([{"register": Plugin}], {"routes": {"prefix": "/v1"}})
        .then(() => server.initialize());
    });

    test("API comes back", () =>{

      const request = {
        "method": "GET",
        "url": "/v1/api?page=1"
      };

      return server
        .inject(request)
        .then(response => {

          expect(response.statusCode).to.equal(200);
          expect(response.result).to.equal("iSuck");
        });

    });

  });

});
