'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'app',
		dist: '/Users/troelsbusk/Projects/stagingGpeasy/themes/ratpack',

		favicons: {
		  options: {
		  	apple: true,
		  	appleTouchPadding: 0,
		  },
		  icons: {
		    src: '<%= app %>/images/logo.png',
		    dest: '<%= dist %>/images'
		  }
		},

		sass: {
			dist: {
				options: {
					style: 'expanded', // expanded or nested or compact or compressed
					loadPath: '<%= app %>/bower_components/foundation/scss',
					compass: true,
					quiet: true
				},
				files: {
					'<%= app %>/css/app.css': '<%= app %>/scss/app.scss'
				}
			}
		},

		jadephp: {
			compile: {
				options: {
					filename:'default',
					pretty: true,
					data: {
						debug: false
					}
				},
				files: [{
					expand: true,
					cwd: '<%= app %>/',
					src: ['**/template.jade', '!**/templates/**'],
					ext: '.php',
					dest: '<%= app %>/'
				}]
			}
		},

		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: false
					}
				},
				files: [{
					expand: true,
					cwd: '<%= app %>/interchange',
					src: ['**/*.jade', '!**/templates/**'],
					ext: '.html',
					dest: '<%= app %>/templates/interchange'
				}]
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= app %>/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['fonts/**', '**/*.html', '**/*.php', '!**/*.scss', '!bower_components/**'],
					dest: '<%= dist %>/'
				} , {
					expand: true,
					flatten: true,
					src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
					dest: '<%= dist %>/fonts/',
					filter: 'isFile'
				} ]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app %>/images/',
					src: ['**/*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%= dist %>/images/'
				}]
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= app %>/template.php'],
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			html: [ '<%= dist %>/**/*.php', '!<%= app %>/bower_components/**'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: '<%= app %>/scss/**/*.scss',
				tasks: ['sass']
			},
			jade: {
				files: [	'<%= app %>/**/*.jade', '<%= app %>/templates/**/*.jade','<%= app %>/pages/**/*.md',
									'<%= app %>/**/*.html', '<%= app %>/templates/**/*.html'],
				tasks: ['jade','jadephp']
			},
			livereload: {
				files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/interchange/**/*.html', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}','<%= app %>/pages/**/*.md'],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 9000,
					base: '<%= app %>/',
					open: {
						appName: 'Google Chrome'
					},
					livereload: true,
					hostname: '*'
				}
			},
			dist: {
				options: {
					port: 9001,
					base: '<%= dist %>/',
					open: true,
					keepalive: true,
					livereload: false,
					hostname: '*'
				}
			}
		},

		wiredep: {
			target: {
				src: [
					'<%= app %>/**/*.jade'
				],
				ignorePath: '../',
				exclude: [
					'modernizr',
					'font-awesome',
					'jquery-placeholder',
					'foundation'
				]
			}
		},

		lint5: {
			dirPath : '<%= app %>/',
		  default: {
		    // if you have used nunjucks and wanted to pass defaults value to the objects 
		    // for example: 
		    'email': 'a@a.com',
		    'username': 'abcd'
		  },
		  templates: [
		    'template.php'
		  ],
		  ignoreList: [
		    // the format of ignoreList is in the array format 
		    'Saw “<?”. Probable cause: Attempt to use an XML processing instruction in HTML. (XML processing instructions are not supported in HTML.)'
		    // you can simply copy the message you got from the returned on the console 
		    //for example this 
		    // 'Bad value “” for attribute “action” on element “form”: Must be non-empty.'
		  ]
		},

		// jadephp: {
		// 	views: {
		// 	    options: {
		// 	        pretty: false,
		// 	        filename: 'default',
		// 	        basedir: '<%= app %>/'
		// 	    }
		// 		},  
		//   compile: {
		//   	options: {
		//   	    pretty: true,
		//   	    filename: 'default',
		//   	    basedir: __dirname
		//   	},
		//     expand: true,
		//     cwd: '<%= app %>/',
		//     src: ['*.jade'],
		//     dest: '<%= app %>/',
		//     ext: '.php'
		//   }
		// }

	});
	
	grunt.loadNpmTasks('grunt-jade-php');
	grunt.loadNpmTasks('grunt-lint5');
	grunt.registerTask('compile-jade', [ 'jade','jadephp']);
	grunt.registerTask('lint-html', ['jade','jadephp', 'lint5']);
	grunt.loadNpmTasks('grunt-favicons');
	grunt.registerTask('compile-sass', ['sass']);
	grunt.registerTask('bower-install', ['wiredep']);
	
	grunt.registerTask('default', ['compile-jade', 'compile-sass', 'bower-install', 'connect:app', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
	
	grunt.registerTask('publish', ['compile-jade', 'compile-sass', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin', 'favicons']);

};
