"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  require('time-grunt')(grunt);

  grunt.initConfig({

    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/*.{jpg,png,svg}",
            "tmp/ugc/*",
            "js/**/*.js",
            "video/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          src: ["*.html"],
          dest: "build"
        }]
      },
      js: {
        files: [{
          expand: true,
          src: ["js/**/*.js"],
          dest: "build"
        }]
      }
    },

    less: {
      style: {
        files: {
          "build/css/style.css": "less/style.less"
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
          ]})/*,
          require("css-mqpacker")({
            sort: true
          })*/
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    svgmin: {
      allsvg: {
        files: [{
          expand: true,
          src: ["build/img/**/*.svg"]
        }]
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
          "build/img/sprite.svg": ["img/sprite/*.svg"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}","build/tmp/ugc/**/*.{png,jpg,gif}"]
        }]
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      scripts: {
        files: {
          'build/js/picturefill.min.js': ['build/js/picturefill.js'],
          'build/js/script.min.js': ['build/js/script.js']
        }
      }
    },

    processhtml: {
      target: {
        files: {
          'build/index.html': ['build/index.html'],
          'build/photo.html': ['build/photo.html'],
          'build/form.html': ['build/form.html']
        }
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css",
            "build/js/*.js"
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html", "processhtml"],
        options: {spawn: false}
      },
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss", "csso"],
        options: {spawn: false}
      },
      scripts: {
        files: ["js/**/*.js"],
        tasks: ["copy:js","uglify"],
        options: {spawn: false}
      }
    }

  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("svg", ["svgmin", "svgstore"]);
  grunt.registerTask("css", ["less", "postcss", "csso"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "css",
    "svg",
    "imagemin",
    "uglify",
    "processhtml"
  ]);

};
