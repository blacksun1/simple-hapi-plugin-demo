"use strict";

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

    "pkg": grunt.file.readJSON("package.json"),

    "babel": {
      "dist": {
        "files": [{
          "expand": true,
          "cwd": "lib",
          "src": ["**/*.es6"],
          "dest": "dist",
          "ext": ".js"
        }]
      }
    },

    "clean": {
      "dist": ["./dist", "test/artifacts"]
    },

    "eslint": {
      "options": {
        "extensions": [".js", ".es6"],
        "format": require("eslint-html-reporter"),
        "outputFile": "test/artifacts/linting.html"
      },
      "target": ["lib", "test"]
    },

    "shell": {
      "options": {

      },
      "test": {
        "command": "npm run test"
      },
      "test-cover": {
        "command": "npm run test-cover"
      }
    }

  });

  grunt.registerTask("build", [
    "clean",
    "eslint",
    "babel"
  ]);

  grunt.registerTask("test", [
    "shell:test-cover"
  ]);

  grunt.registerTask("default", ["build"]);

};
