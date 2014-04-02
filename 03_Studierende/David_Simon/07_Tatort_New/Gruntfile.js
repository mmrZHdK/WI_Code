'use strict';

var time = require('time-grunt'),
    path = require('path'),
    folderMount = function folderMount(connect, point) {
        return connect.static(path.resolve(point));
    };

module.exports = function(grunt) {

    // Show elapsed time at the end
    time(grunt);

    // Project configuration.
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'html',
                    middleware: function(connect) {
                        return [
                            require('connect-livereload')(),
                            folderMount(connect, 'html/')
                        ];
                    }
                }
            }
        },
        watch: {
            main: {
                options: {
                    livereload: true
                },
                files: ['html/index.html', 'html/scss/**', 'html/media/**', 'html/js/**'],
                tasks: ['jshint', 'sass:dev']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            files: ['html/js/**/*.js']
        },
        sass: {
            dev: {
                options: {
                    loadPath: require('node-neat').includePaths
                },
                files: [{
                    expand: true,
                    cwd: 'html/scss/',
                    src: ['*.scss'],
                    dest: 'html/css',
                    ext: '.css'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('server', ['server:local']);
    grunt.registerTask('server:local', ['jshint', 'sass:dev', 'connect:server', 'watch:main']);

    grunt.registerTask('default', ['server']);

};
