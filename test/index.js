"use strict";

const Lab = require("lab");
const Code = require("code");
const Hapi = require("hapi");
const Plugin = require("../dist/index");


const expect = Code.expect;
const lab = exports.lab = Lab.script();
const experiment = lab.experiment;
const beforeEach = lab.beforeEach;
const test = lab.test;

let server;

experiment("bitcoin-server", () => {

  experiment("", () => {

    beforeEach(() => {

      server = new Hapi.Server();
      server.connection({"port": "1337"});
      return server.register([{"register": Plugin}])
        .then(() => server.initialize());
    });

    test("That nothing comes back", () =>{

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

    test("API comes back", () =>{

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

  experiment("", () => {

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
