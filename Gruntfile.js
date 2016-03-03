
module.exports = function(grunt) {
  grunt.initConfig({

    watchify: {
      options: {
        debug: true
      },
      dist: {
        src: ['./index.js'],
        dest: 'dist/model.js'
      },
    }

  });

  grunt.loadNpmTasks('grunt-watchify');

  grunt.registerTask('default', [
    'watchify',
  ]);
};