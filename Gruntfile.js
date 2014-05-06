module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: { // 
            dist: { // 一个子任务
                files: [{
                    expand: true,
                    cwd: 'static/sass',
                    src: ['**/*.sass'],
                    dest: 'static/css',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            app_task: {
                files: [{
                    expand: true,
                    cwd: 'static/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'static/js',
                    ext: '.min.js'
                }]
            }
        },
        watch: {
            css: {
                files: ['static/sass/*.sass', 'static/sass/blog/*.sass'],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['static/js/*.js', '!static/js/*.min.js'],
                tasks: ['uglify'],
                options: {
                    livereload: 5027
                }
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('default', ['sass', 'uglify', 'watch']);
};