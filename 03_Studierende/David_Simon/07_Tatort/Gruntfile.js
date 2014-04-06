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
                files: ['html/tpl/**', 'html/scss/**', 'html/media/**', 'html/js/**'],
                tasks: ['jshint', 'htmlbuild', 'sass:dev']
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
        },
        htmlbuild: {
            options: {
                beautify: true,
                relative: true,
                sections: {
                    layout: {
                        header: 'html/tpl/header.tpl.html',
                        footer: 'html/tpl/footer.tpl.html',
                        sidebar: 'html/tpl/sidebar.tpl.html',
                        'main-content': 'html/tpl/main-content.tpl.html',
                        'detail-content': 'html/tpl/detail-content.tpl.html'
                    }
                }
            },
            index: {
                src: 'html/tpl/index.tpl.html',
                dest: 'html/index.html'
            },
            detail: {
                src: 'html/tpl/detail.tpl.html',
                dest: 'html/detail.html'
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('server', ['server:local']);
    grunt.registerTask('server:local', ['jshint', 'sass:dev', 'htmlbuild', 'connect:server', 'watch:main']);

    grunt.registerTask('default', ['server']);

};
