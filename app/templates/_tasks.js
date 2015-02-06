module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.initConfig({
		watch: {
			scripts: {
				files: ['src/**/*.js', 'test/**/*.js'],
				tasks: ['mochaTest']
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'nyan'
				},
				src: ['test/**/*.js']
			}
		}
	});
};