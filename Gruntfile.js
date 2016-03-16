
function getPluginBanner () {
  var pluginBanner = '';
  pluginBanner += '/**\n';
  pluginBanner += ' * Plugin: Model\n';
  pluginBanner += ' * Author: Sundarasan Natarajan\n';
  pluginBanner += ' * GIT: https://github.com/Sujsun/Model.git\n';
  pluginBanner += ' * Version: 0.0.1\n';
  pluginBanner += ' * Date: ' + new Date().toUTCString() + '\n';
  pluginBanner += ' */\n';
  return pluginBanner;  
}

var pluginBanner = getPluginBanner();

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
    },

    uglify: {
      dist: {
        options: {
          banner: pluginBanner
        },
        files: {
          'dist/model.min.js': ['dist/model.js']
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-watchify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', [
    'watchify',
    'uglify',
  ]);

  grunt.registerTask('default', [
    'build',
  ]);
};