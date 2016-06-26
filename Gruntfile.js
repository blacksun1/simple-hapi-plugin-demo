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
      "dist": ["./dist"]
    },

    "eslint": {
      "target": ["./lib/**/*.es6"]
    }

  });

  grunt.registerTask("build", [
    "clean",
    "babel"
  ]);

  grunt.registerTask("default", ["build"]);

};
