module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
// minify js
      uglify: {
          options: {
              //sourceMap: true,
              compress: true,
              comments: false
          },
          main_thread: {
              files: {
                  'build/temp/gui.min.js': [
                      // THESE MUST BE IN CORRECT ORDER.... ADD NEW FILES HERE
                      'src/gui_easy_settings.js',
                      'src/gui_easy_settings_config_table.js',
                      'src/gui_easy_default_settings.js',
                      'src/gui_easy_helper.js',
                      'src/gui_easy_curly.js',
                      'src/gui_easy_curly_unit.js',
                      'src/gui_easy_curly_page.js',
                      'src/gui_easy_curly_icons.js',
                      'src/gui_easy_curly_forms.js',
                      'src/gui_easy_scrubber.js',
                      'src/gui_easy_popper.js',
                      'src/gui_easy_popper_rules.js',
                      'src/gui_easy_pitcher.js',
                      'src/gui_easy_butler.js',
                      'src/gui_easy_tender.js',
                      'src/gui_easy_ini.js'
                  ],
                  'build/temp/forms.min.js': [
                      'src/forms/gui_easy_forms.js',
                      'src/forms/gui_easy_forms_p*.js',
                      'src/forms/gui_easy_forms_c*.js',
                      'src/forms/gui_easy_forms_n*.js'
                  ],
                  'build/temp/dash.min.js': [
                      'src/dash/gui_easy_dash.js',
                      'src/dash/gui_easy_dash_d*.js'
                  ]
              }
          }
      },
// minify css
      cssmin: {
          options: {
              mergeIntoShorthands: false,
              roundingPrecision: -1
          },
          target: {
              files: {'build/temp/gui.min.css': ['src/gui_easy.css']}
          }
      },
// make one file of them all
      processhtml: {
                main: {
                    files: {'build/temp/index.min.html': ['index.html']}
                }
            },
// clean the release folder
      clean: {
          temp: {
              src: ['build/temp']
          },
          version: {
              src: ['build/<%= version %>']
          }
      },
// zip source to temp folder + gzip the gui html single file
      compress: {
          source: {
              options: {
                  archive: 'build/temp/src-<%= version %>.zip'
              },
              files: [
                  {
                      flatten: false,
                      src: ['src/*','src/forms/*','src/dash/*', 'index.html','Gruntfile.js','package.json'],
                      dest: '/',
                      filter: 'isFile'
                  }
              ]
          },
          main: {
              options: {
                  mode: 'gzip',
                  level: 9 //default is 1, max is 9
              },
              files: [{
                  expand: true,
                  src: ['build/temp/index.min.html'],
                  dest: '.',
                  ext: '.htm.gz'
              }]
          },
          mini: {
              options: {
                  mode: 'gzip',
                  level: 9
              },
              files: [{
                  expand: false,
                  src: ['src/index-minimal.html'],
                  dest: 'build/temp/mini/index.htm.gz'
              }]
          }
      },
// rename the temp folder
      rename: {
          temp: {
              files: [
                  {
                      src: ['build/temp'],
                      dest: 'build/<%= version %>'
                  }
              ]
          }
      }
});

  // Load the plugin(s)
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-rename');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-processhtml');

  // build gui easy task
  grunt.registerTask('buildGuiEasy', 'Will build the project',
      function () {
        let settings = grunt.file.read('src/gui_easy_settings.js');
        settings = settings.match(/--GRUNT-START--([\s\S]*?)\/\/--GRUNT-END--/)[1];
        let guiEasy = "{" + settings + "}";
        guiEasy = guiEasy.replace(/'/g,"\"");
        guiEasy = JSON.parse(guiEasy);
        let version;
        if (guiEasy.development === true && guiEasy.releaseCandidate > 0) {
          version = guiEasy.major + '.' + guiEasy.minor + '.rc' + guiEasy.releaseCandidate + '.' + guiEasy.minimal;
        } else if (guiEasy.development === true) {
          version = guiEasy.major + '.' + guiEasy.minor + '.nightly.' + guiEasy.minimal;
        } else {
          version = guiEasy.major + '.' + guiEasy.minor + '.' + guiEasy.minimal;
        }
        grunt.log.ok(version);
        // add version as a property for the grunt ini loop
        grunt.config("version", version);
        grunt.task.run(
            'clean',
            'uglify',
            'cssmin',
            'processhtml',
            'compress',
            'rename'
        )
    });

  // the 'default' task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', [
      'buildGuiEasy'
  ]);

};