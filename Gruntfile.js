/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */

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
                      'src/gui_easy_scrubber.js',
                      'src/gui_easy_popper.js',
                      'src/gui_easy_popper_rules.js',
                      'src/gui_easy_popper_extra.js',
                      'src/gui_easy_pitcher.js',
                      'src/gui_easy_butler.js',
                      'src/gui_easy_tender.js',
                      'src/gui_easy_ini.js',
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
                  'build/temp/mini.min.js': [
                      'src/index-minimal.js'
                  ]
              }
          }
      },
// minify html
      htmlmin: {
          dist: {
              options: {
                  removeComments: true,
                  collapseWhitespace: true
              },
              files: {
                  'build/temp/index.min.html': 'build/temp/index.min.html',
                  'build/temp/no-dash.index.min.html': 'build/temp/no-dash.index.min.html',
                  'build/temp/mini.index.min.html': 'build/temp/mini.index.min.html'
              }
          },
      },
// minify css
      cssmin: {
          options: {
              mergeIntoShorthands: false,
              roundingPrecision: -1
          },
          target: {
              files: {
                  'build/temp/gui.min.css': ['src/gui_easy.css'],
                  'build/temp/mini.min.css': ['src/index-minimal.css']
              }
          }
      },
// make one file of them all
      processhtml: {
                main: {
                    files: {'build/temp/index.min.html': ['src/index.html']}
                },
                noDash: {
                  files: {'build/temp/no-dash.index.min.html': ['src/no-dash.index.html']}
                },
                mini: {
                  files: {'build/temp/mini.index.min.html': ['src/index-minimal.html']}
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
          test: {
              src: ['build/0.0.0.0.0']
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
                  src: ['build/temp/mini.index.min.html'],
                  dest: 'build/temp/mini/index.htm.gz'
              }]
          }
      },
// copyright
      file_append: {
          copyright: {
              files: [
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
                  },
                  {
                      prepend: '<!-- GUIEasy  Copyright (C) 2019-' + new Date().getFullYear() + '  Jimmy "Grovkillen" Westberg  -->',
                      input: 'build/temp/index.min.html'
                  },
                  {
                      prepend: '<!-- GUIEasy  Copyright (C) 2019-' + new Date().getFullYear() + '  Jimmy "Grovkillen" Westberg  -->',
                      input: 'build/temp/no-dash.index.min.html'
                  },
                  {
                      prepend: '<!-- GUIEasy  Copyright (C) 2019-' + new Date().getFullYear() + '  Jimmy "Grovkillen" Westberg  -->',
                      input: 'build/temp/mini.index.min.html'
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
          },
          test: {
              files: [
                  {
                      src: ['build/temp'],
                      dest: 'build/0.0.0.0.0'
                  }
              ]
          }
      },
// file size report
      size_report: {
          source_files: {
              options: {
                  header: 'source files:'
              },
              files: {
                  list: ['src/*']
              }
          },
          release_files: {
              options: {
                  header: 'release files:'
              },
              files: {
                  list: ['build/temp/*/*.gz']
              }
          }
      },
// source report
      folder_list : {
              files :
                  {
                      src: ['**'],
                      dest: 'build/temp/info/source_files.json',
                      cwd: 'src/'
                  }
      },
// release files
      filesize: {
          release: {
              files: [
                  {
                      expand: true,
                      cwd: 'build/temp',
                      src: ['main/*.gz', 'noDash/*.gz', 'mini/*.gz']
                  }
              ],
              options: {
                  output: [
                        {
                            path: "build/release_sizes.txt",
                            format: "{filename}:{size}",
                            append: true
                        }
                    ]
              }
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
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks('grunt-folder-list');
    grunt.loadNpmTasks('grunt-size-report');
    grunt.loadNpmTasks('grunt-filesize');

    // the 'default' task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', [
      'buildGuiEasy'
    ]);

    grunt.registerTask('test', [
        'buildGuiEasy:test'
    ]);
    // build gui easy task
    grunt.registerTask('buildGuiEasy', 'Will build the project',
      function (type = "new") {
        let settings = grunt.file.read('src/gui_easy_settings.js');
        settings = settings.match(/--GRUNT-START--([\s\S]*?)\/\/--GRUNT-END--/)[1];
        let guiEasy = "{" + settings + "}";
        guiEasy = guiEasy.replace(/'/g,"\"");
        guiEasy = JSON.parse(guiEasy);
        let version;
        if (guiEasy.development === true && guiEasy.releaseCandidate > 0) {
          version = guiEasy.major + '.' + guiEasy.minor + '.rc' + guiEasy.releaseCandidate + '.' + guiEasy.revision;
        } else if (guiEasy.development === true) {
          version = guiEasy.major + '.' + guiEasy.minor + '.nightly.' + guiEasy.revision;
        } else {
          version = guiEasy.major + '.' + guiEasy.minor + '.' + guiEasy.revision;
        }
        let semVer = guiEasy.major + '.' + guiEasy.minor + '.' + guiEasy.revision;
        // create a file with no dash (to save space)
        let noDashDoc = grunt.file.read('src/index.html');
        noDashDoc = noDashDoc.replace(/<!-- build:js inline ..\/build\/temp\/dash.min.js -->([\s\S]*?)<!-- \/build -->/, "");
        grunt.file.write('src/no-dash.index.html', noDashDoc);
        // update the package.json
        let packageJSON = grunt.file.read('package.json');
        packageJSON = JSON.parse(packageJSON);
        packageJSON.version = guiEasy.major + '.' + guiEasy.minor + '.' + guiEasy.revision;
        packageJSON.versionName = version;
        packageJSON.main = "build/" + version + "/main/index.html.gz";
        if (type === "new") {
            packageJSON.timestamp = Date.now();
            grunt.file.write('package.json',
                JSON.stringify(packageJSON,null,2)
            );
            // add version as a property for the grunt ini loop
            grunt.config("version", version);
            grunt.config("semVer", semVer);
            grunt.log.ok('writing release info file');
            grunt.file.write('release.txt',
                'timestamp:' + packageJSON.timestamp + '\nmajor:' + guiEasy.major + '\nminor:' + guiEasy.minor + '\nrevision:' + guiEasy.revision + '\nrc:' + guiEasy.releaseCandidate + '\ndev:' + guiEasy.development
            );
            grunt.task.run(
                'verifyCopyright',
                'clean:temp',
                'clean:version',
                'minimalVersionInjection:' + version,
                'uglify',
                'cssmin',
                'processhtml',
                'htmlmin',
                'file_append',
                'compress',
                'clean:tempFiles',
                'clean:noDash',
                'folder_list',
                'filesize',
                'size_report',
                'copy',
                'rename',
                'clean:releaseInfo',
                'listBuilds',
                'minimalVersionInjection',
                'releaseFileSizes',
                'gruntDone:' + version
            );
        } else {
            let timestamp = Date.now();
            grunt.config("version", version);
            grunt.config("semVer", semVer);
            grunt.task.run(
                'testBuild:' + timestamp,
                'verifyCopyright',
                'clean:temp',
                'clean:test',
                'minimalVersionInjection:' + version + '-test-' + timestamp,
                'uglify',
                'cssmin',
                'processhtml',
                'htmlmin',
                'file_append',
                'compress',
                'clean:tempFiles',
                'clean:noDash',
                'copy',
                'rename:test',
                'minimalVersionInjection',
                'testBuild',
                'gruntDone:' + version + "-test-" + timestamp
            );
        }
    });

    grunt.registerTask('gruntDone', function (version) {
        grunt.log.ok(version + '  <--- this one is compiled');
        grunt.log.ok('DONE!');
    });

    grunt.registerTask('testBuild', function (timestamp) {
        let settings = grunt.file.read('src/gui_easy_settings.js');
        if (timestamp > 0) {
            grunt.log.ok('adding temporary test timestamp');
            settings = settings.replace(/'test': null,/, "'test': " + timestamp + ",");
        } else {
            grunt.log.ok('removing temporary test timestamp');
            settings = settings.replace(/'test': \d*,/, "'test': null,");
        }
        grunt.file.write( 'src/gui_easy_settings.js', settings);
    });

    grunt.registerTask('minimalVersionInjection', function (version) {
        let data = grunt.file.read('src/index-minimal.js');
        if (version !== undefined) {
            grunt.log.ok('adding temporary mini version');
            data = data.replace(/"v": "" \/\/FRONTEND/, '"v": "' + version + '" //FRONTEND');
        } else {
            grunt.log.ok('removing temporary mini version');
            data = data.replace(/(?<="v": ).*(?= \/\/FRONTEND)/, '""');
        }
        grunt.file.write( 'src/index-minimal.js', data);
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
        grunt.log.ok('looking for release folders...');
        let folders = "";
        grunt.file.expand(
            {filter: 'isDirectory', cwd: 'build/'},
            ['*'])
            .forEach(function (dir) {
                if (dir !== "0.0.0.0.0") {
                    folders += dir + "\n";
                }
        });
        grunt.log.ok((folders.split(/\n/).length - 1) + " releases found.");
        grunt.file.write( 'build/releases.txt', folders);
    });

    grunt.registerTask('releaseFileSizes', function () {
        grunt.log.ok('parsing release file sizes...');
        let files = "files:[";
        let packageJSON = grunt.file.read('package.json');
        let version = JSON.parse(packageJSON).versionName;
        let releaseInfo = grunt.file.read('build/' + version + '/info/release.txt');
        let fileSizes = grunt.file.read('build/release_sizes.txt');
        grunt.file.delete('build/release_sizes.txt');
        fileSizes = fileSizes.split(/\n/);
        fileSizes.forEach(function (file) {
                if (file.length > 0) {
                    let build = file.split(":")[0].split(/[\\/]/);
                    build = build[(build.length - 2)];
                    let size = file.split(":")[1];
                    files += '{"build":"' + build + '","size":' + size + "}";
                }
            }
        );
        files += "]";
        files = files.replace(/}{/g, "},{");
        files = files.replace(/\r?\n|\r/g, "");
        grunt.file.write( 'build/' + version + '/info/release.txt', releaseInfo + "\n" + files);
    });

    grunt.registerTask('bump', function(level) {
            let settings_from = grunt.file.read('src/gui_easy_settings.js');
            let settings = settings_from.match(/--GRUNT-START--([\s\S]*?)\/\/--GRUNT-END--/)[1];
            let guiEasy = "{" + settings + "}";
            guiEasy = guiEasy.replace(/'/g,"\"");
            guiEasy = JSON.parse(guiEasy);
            let version_from;
            if (guiEasy.development === true && guiEasy.releaseCandidate > 0) {
                version_from = guiEasy.major + '.' + guiEasy.minor + '.rc' + guiEasy.releaseCandidate + '.' + guiEasy.revision;
            } else if (guiEasy.development === true) {
                version_from = guiEasy.major + '.' + guiEasy.minor + '.nightly.' + guiEasy.revision;
            } else {
                version_from = guiEasy.major + '.' + guiEasy.minor + '.' + guiEasy.revision;
            }
            if (level === "revision") {
                guiEasy.revision++;
                guiEasy.development = true;
            }
            if (level === "minor") {
                guiEasy.minor++;
                guiEasy.revision = 0;
                guiEasy.releaseCandidate = 0;
                guiEasy.development = false;
            }
            if (level === "major") {
                guiEasy.major++;
                guiEasy.minor = 0;
                guiEasy.revision = 0;
                guiEasy.releaseCandidate = 0;
                guiEasy.development = false;
            }
            if (level === "rc") {
                guiEasy.revision++;
                guiEasy.releaseCandidate++;
                guiEasy.development = true;
            }
            if (level === "dev=true") {
                guiEasy.development = true;
            }
            if (level === "dev=false") {
                guiEasy.development = false;
            }
            let version_to;
            if (guiEasy.development === true && guiEasy.releaseCandidate > 0) {
                version_to = guiEasy.major + '.' + guiEasy.minor + '.rc' + guiEasy.releaseCandidate + '.' + guiEasy.revision;
            } else if (guiEasy.development === true) {
                version_to = guiEasy.major + '.' + guiEasy.minor + '.nightly.' + guiEasy.revision;
            } else {
                version_to = guiEasy.major + '.' + guiEasy.minor + '.' + guiEasy.revision;
            }
            if (version_from === version_to) {
                grunt.log.ok(version_from);
            } else {
                let replaceText = "//--GRUNT-START--\n" +
                    "        'major': " + guiEasy.major + ",\n" +
                    "        'minor': " + guiEasy.minor + ",\n" +
                    "        'revision': " + guiEasy.revision + ",\n" +
                    "        'development': " + guiEasy.development + ",\n" +
                    "        'releaseCandidate': " + guiEasy.releaseCandidate + "\n" +
                    "        //--GRUNT-END--"
                ;
                settings = settings_from.replace(/\/\/--GRUNT-START--([\s\S]*?)\/\/--GRUNT-END--/, replaceText);
                grunt.file.write( 'src/gui_easy_settings.js', settings);
                grunt.log.ok(version_from + " --> " + version_to);
            }
        }
    );
};