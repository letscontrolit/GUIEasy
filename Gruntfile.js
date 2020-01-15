//TODO: add git commit functionality for auto-release tag (https://github.com/rubenv/grunt-git)

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
                  ],
                  'build/temp/patreon.min.js': [
                      'src/gui_easy_popper_extra.js'
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
                    files: {'build/temp/index.min.html': ['src/index.html']}
                },
                noDash: {
                  files: {'build/temp/no-dash.index.min.html': ['src/no-dash.index.html']}
                }
            },
// clean the release folder + nodash
      clean: {
          temp: {
              src: ['build/temp']
          },
          version: {
              src: ['build/<%= version %>']
          },
          noDash: {
              src: ['src/no-dash.index.html']
          },
          releaseInfo: {
              src: ['release.txt']
          },
          tempFiles: {
              src: ['build/temp/*.html', 'build/temp/*.js']
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
                      src: ['src/*','src/forms/*','src/dash/*','Gruntfile.js','package.json'],
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
                  expand: false,
                  src: ['build/temp/index.min.html'],
                  dest: 'build/temp/main/index.htm.gz'
              }]
          },
          noDash: {
              options: {
                  mode: 'gzip',
                  level: 9 //default is 1, max is 9
              },
              files: [{
                  expand: false,
                  src: ['build/temp/no-dash.index.min.html'],
                  dest: 'build/temp/noDash/index.htm.gz'
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
// copyright
      file_append: {
          copyright: {
              files: [
                  {
                      prepend: '<-- GUIEasy  Copyright (C) 2019-' + new Date().getFullYear() + '  Jimmy "Grovkillen" Westberg -->',
                      input: 'build/temp/index.min.html'
                  },
                  {
                      prepend: '/* GUIEasy  Copyright (C) 2019-' + new Date().getFullYear() + '  Jimmy "Grovkillen" Westberg */',
                      input: 'build/temp/gui.min.js'
                  },
                  {
                      prepend: '/* GUIEasy  Copyright (C) 2019-' + new Date().getFullYear() + '  Jimmy "Grovkillen" Westberg */',
                      input: 'build/temp/gui.min.css'
                  },
                  {
                      prepend: '/* GUIEasy  Copyright (C) 2019-' + new Date().getFullYear() + '  Jimmy "Grovkillen" Westberg */',
                      input: 'build/temp/forms.min.js'
                  },
                  {
                      prepend: '/* GUIEasy  Copyright (C) 2019-' + new Date().getFullYear() + '  Jimmy "Grovkillen" Westberg */',
                      input: 'build/temp/dash.min.js'
                  }
              ]
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
      },
// file sizes
      folder_list : {
              options: {
                  files: true,
                  folders: true
              },
              files:
                  {
                      src: ['**'],
                      dest: 'build/temp/info/source_files.json',
                      cwd: 'src/'
                  }
      },
// copy release info
      copy: {
          releaseInfo : {
              src: 'release.txt',
              dest: 'build/temp/info/',
              flatten: true,
              filter: 'isFile',
          },
          package : {
              src: 'package.json',
              dest: 'build/temp/info/',
              flatten: true,
              filter: 'isFile',
          }
      }
  });

    // Load the plugin(s)
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks('grunt-folder-list');

    // the 'default' task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', [
      'buildGuiEasy'
    ]);

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
        let semVer = guiEasy.major + '.' + guiEasy.minor + '.' + guiEasy.minimal;
        // create a file with no dash (to save space)
        let noDashDoc = grunt.file.read('src/index.html');
        noDashDoc = noDashDoc.replace(/<!-- build:js inline ..\/build\/temp\/dash.min.js -->([\s\S]*?)<!-- \/build -->/, "");
        grunt.file.write('src/no-dash.index.html', noDashDoc);
        // update the package.json
        let packageJSON = grunt.file.read('package.json');
        packageJSON = JSON.parse(packageJSON);
        packageJSON.version = guiEasy.major + '.' + guiEasy.minor + '.' + guiEasy.minimal;
        packageJSON.bin["index.html.gz"] = "build/main/" + version + "/";
        packageJSON.timestamp = Date.now();
        grunt.file.write('package.json',
            JSON.stringify(packageJSON,null,2)
        );
        grunt.file.write('release.txt',
          'major:' + guiEasy.major + '\nminor:' + guiEasy.minor + '\nminimal:' + guiEasy.minimal + '\nrc:' + guiEasy.releaseCandidate
        );
        grunt.log.ok(version);
        // add version as a property for the grunt ini loop
        grunt.config("version", version);
        grunt.config("semVer", semVer);
        grunt.task.run(
            'verifyCopyright',
            'clean:temp',
            'clean:version',
            'uglify',
            'cssmin',
            'processhtml',
            'file_append',
            'compress',
            'clean:tempFiles',
            'clean:noDash',
            'folder_list',
            'copy',
            'rename',
            'clean:releaseInfo',
            'listBuilds'
        );
    });

    grunt.registerTask('verifyCopyright', function () {

        let fileRead, firstLine, counter = 0, fileExtension, commentWrapper;
        let copyrightInfo = 'GUIEasy  Copyright (C) 2019-' + new Date().getFullYear() + '  Jimmy "Grovkillen" Westberg';

        //get file extension regex
        let re = /(?:\.([^.]+))?$/;

        grunt.log.writeln();

        // read all subdirectories from your modules folder
        grunt.file.expand(
            {filter: 'isFile', cwd: 'src/'},
            ["**/*.js", ['**/*.html', ['**/*.css']]])
            .forEach(function (dir) {
                fileRead = grunt.file.read('src/' + dir).split('\n');
                firstLine = fileRead[0];
                let startIndex = 0;
                //Deleting old copyright.
                if (firstLine.search("Copyright") > -1) {
                    startIndex = 1;
                }
                //Start updating copyright.
                counter++;
                if (startIndex > 0) {
                    grunt.log.ok(dir + " --> updating copyright text");
                } else {
                    grunt.log.ok(dir + " --> doesn't have copyright. Writing it.");
                }
                fileExtension = re.exec(dir)[1];
                switch (fileExtension) {
                    case 'js':
                        commentWrapper = '/* ' + copyrightInfo + ' */';
                        break;
                    case 'html':
                        commentWrapper = '<!-- ' + copyrightInfo + ' -->';
                        break;
                    case 'css':
                        commentWrapper = '/* ' + copyrightInfo + ' */';
                        break;
                    default:
                        commentWrapper = null;
                        grunt.log.writeln('file extension not recognized');
                        break;
                }

                if (commentWrapper) {
                    fileRead = fileRead.slice(startIndex).join('\n');
                    grunt.file.write( 'src/' + dir, commentWrapper + '\n' + fileRead);
                }
            });

        grunt.log.ok('Searched through', counter, 'files.');
    });

    grunt.registerTask('listBuilds', function () {
        let folders = "";
        grunt.file.expand(
            {filter: 'isDirectory', cwd: 'build/'},
            ['*'])
            .forEach(function (dir) {
                folders += dir + "\n";
        });
        grunt.file.write( 'build/releases.txt', folders);
    });
};