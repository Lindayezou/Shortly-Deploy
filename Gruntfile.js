module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      build: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/condensedFiles.min.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }, 

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      build: {
        src: ['public/dist/condensedFiles.min.js'],
        dest: 'public/dist/app.min.js'
      }
    },

    eslint: {
      target: [
        'public/client/**/*.js', 'app/**/*.js', 'views/**/*.ejs'
      ]
    },

    cssmin: {
      build: {
        src: 'public/style.css',
        dest: 'public/dist/css.min.css'
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    gitpush: {
      your_target: {
        options: {
          remote: 'live',
          branch: 'master'
        }
      }
    },

    shell: {
      prodServer: {
      }
    }

    // script to change the css and js asset files to point to minified version
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git');

  ////////////////////////////////////////////////////
  // Main grunt tasks for remote - prod
  ////////////////////////////////////////////////////

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) { // grunt upload --prod or grunt upload --prod=blah
      // add your production server task here
      grunt.task.run([ 'start-prod' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });


  grunt.registerTask('start-prod', [
    'build', 'nodemon'
  ]);
 
  grunt.registerTask('build', [
    'concat', 'uglify'
  ]);


  ////////////////////////////////////////////////////
  // Main grunt tasks for local testing purposes - dev
  ////////////////////////////////////////////////////

  // runs a watch that will re-run concat & uglify every time a file changes
  // insde of 'public/client/**/*.js' & 'public/lib/**/*.js',
  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  grunt.registerTask('start', [
    'nodemon'
  ]);

  // this runs all our tests and starts the server
  // assumption: we do not need the server to be running in order to execute the tests
  grunt.registerTask('test', [
    'eslint', 'mochaTest', 'start'
  ]);
 
  grunt.registerTask('deploy', [
    // this will push code to remote server (prod)
    'gitpush'
    // somehow trigger grunt test to run on remote server
  ]);


};
