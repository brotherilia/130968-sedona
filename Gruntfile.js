"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "css/style.css": "less/style.less"
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: [
            "last 1 version",
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Opera versions",
            "last 2 Edge versions"
          ]})
        ]
      },
      style: {
        src: "css/*.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "*.html",
            "css/*.css"
          ]
        },
        options: {
          server: ".",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      files: ["less/**/*.less"],
      tasks: ["less", "postcss"],
      options: {
        spawn: false
      }
    },

    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      sprite: {
        files: {
          "img/sprite.svg": ["img/sprite/*.svg"]
        }
      }
    },

    svgmin: {
      all: {
        files: [{
          expand: true,
          src: ["img/**/*.svg"]
        }]
      },
      sprite: {
        files: [{
          expand: true,
          src: ["img/sprite/*.svg"]
        }]
      }
    }

  });

  grunt.registerTask("svgminall", "svgmin:all");
  grunt.registerTask("sprite", ["svgmin:sprite", "svgstore"]);
  grunt.registerTask("serve", ["browserSync", "watch"]);
};
