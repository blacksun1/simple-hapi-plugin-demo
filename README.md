# simple-hapi-plugin-demo

[![Build Status](https://travis-ci.org/blacksun1/simple-hapi-plugin-demo.svg?branch=master)](https://travis-ci.org/blacksun1/simple-hapi-plugin-demo)
[![Coverage Status](https://coveralls.io/repos/github/blacksun1/simple-hapi-plugin-demo/badge.svg?branch=master)](https://coveralls.io/github/blacksun1/simple-hapi-plugin-demo?branch=master)

Just an example. It doesn't really do anything. This is basically a starting point for a REAL Hapi Plugin. This plugin is all setup for development with:

* Grunt (build, -> clean, eslint and babel)
* Tests (Using lab and code, written in JavaScript)
* Code for the plugin is written in babel and is in the `./lib/` folder. Gets built to `./dist/`.

## Install

```bash
$ npm install bitcoin-server --save
```

## Usage

Just register in your Hapi server like any other plugin.

```js
const Hapi = require("hapi");
const server = new Hapi.Server();
server.connection({"port": 8080});
server.register([require("simple-hapi-plugin-demo")]);
server.start(err => {

    if (err) {
        throw err;
    }
});
```

# Development

When developing, tests go into the tests folder.

To run the tests

```bash
# Just run the tests
$ npm test
# Run the tests and show a verbose report
$ npm test -- -v
# Run the tests and produce a coverage report
$ npm run test-cover
```

to run a test server Hapi server while developing

```bash
npm start
```

or

```bash
$ npm run nodemon
```

to run under nodemon and watch for any changes.

## License

MIT
