"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  require("time-grunt")(grunt);

  grunt.initConfig({

    //*** Очистка ***//
    clean: {
      build: ["build"]
    },

    //*** Копирование ***//
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src/",
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
          cwd: "src/",
          src: ["*.html"],
          dest: "build"
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: "src/",
          src: ["js/**/*.js"],
          dest: "build"
        }]
      }
    },

    //*** Сборка CSS из LESS ***//
    less: {
      style: {
        files: {
          "build/css/style.css": "src/less/style.less"
        }
      }
    },

    //*** Обработка CSS: префиксование и "упаковка" медиа-запросов ***//
    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: [
            "last 1 version",
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Opera versions",
            "last 2 Edge versions"
          ]}),
          require("css-mqpacker")({
            sort: true
          })
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },

    //*** "Причесывание" CSS ***//
    csscomb: {
      style: {
        options: {
          config: "csscomb.json"
        },
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },

    //*** Минификация CSS ***//
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

    //*** Сборка SVG-спрайта ***//
    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      sprite: {
        files: {
          "src/img/sprite.svg": ["src/img/sprite/*.svg"]
        }
      }
    },

    //*** Минификация SVG ***//
    svgmin: {
      allsvg: {
        files: [{
          expand: true,
          src: ["build/img/**/*.svg"]
        }]
      }
    },

    //*** Минификация остальной графики ***//
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

    //*** Минификация JS ***//
    uglify: {
      options: {
        mangle: false
      },
      scripts: {
        files: {
          "build/js/picturefill.min.js": ["build/js/picturefill.js"],
          "build/js/script.min.js": ["build/js/script.js"]
        }
      }
    },

    //*** Обработка txt-исходников типографом ***//
    typograf: {
      compile: {
        options: {
          lang: "ru",
          mode: "name"
        },
        files: {
          "src/txt/typo/index01.typo.txt": ["src/txt/index01.txt"],
          "src/txt/typo/index02.typo.txt": ["src/txt/index02.txt"],
          "src/txt/typo/index03.typo.txt": ["src/txt/index03.txt"],
          "src/txt/typo/index04.typo.txt": ["src/txt/index04.txt"],
          "src/txt/typo/index05.typo.txt": ["src/txt/index05.txt"],
          "src/txt/typo/index06.typo.txt": ["src/txt/index06.txt"],
          "src/txt/typo/index07.typo.txt": ["src/txt/index07.txt"],
          "src/txt/typo/index08.typo.txt": ["src/txt/index08.txt"],
          "src/txt/typo/index09.typo.txt": ["src/txt/index09.txt"],
          "src/txt/typo/index10.typo.txt": ["src/txt/index10.txt"],
          "src/txt/typo/index11.typo.txt": ["src/txt/index11.txt"],
          "src/txt/typo/photo01.typo.txt": ["src/txt/photo01.txt"],
          "src/txt/typo/photo02.typo.txt": ["src/txt/photo02.txt"],
          "src/txt/typo/form01.typo.txt":  ["src/txt/form01.txt"]
        }
      }
    },

    //*** Сборка и обработка HTML-файлов ***//
    processhtml: {
      target: {
        files: {
          "build/index.html": ["build/index.html"],
          "build/photo.html": ["build/photo.html"],
          "build/form.html": ["build/form.html"]
        }
      }
    },

    //*** Локальный сервер с обновлением браузера ***//
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

    //*** Отслеживание изменений в исходниках ***//
    watch: {
      html: {
        files: ["src/*.html"],
        tasks: ["copy:html", "processhtml"],
        options: {spawn: false}
      },
      style: {
        files: ["src/less/**/*.less"],
        tasks: ["less", "postcss", "csscomb", "csso"],
        options: {spawn: false}
      },
      scripts: {
        files: ["src/js/**/*.js"],
        tasks: ["copy:js","uglify"],
        options: {spawn: false}
      }
    },

    //*** Отправка сборки в удаленную ветку "gh-pages" ***//
    "gh-pages": {
      options: {
        base: "build"
      },
      src: "**/*"
    }

  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("svg", ["svgstore", "svgmin"]);
  grunt.registerTask("css", ["less", "postcss", "csscomb", "csso"]);
  grunt.registerTask("build", [
    "clean",
    "copy:build",
    "css",
    "svg",
    "imagemin",
    "uglify",
    "typograf",
    "processhtml"
  ]);

};
