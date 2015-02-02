var generators = require('yeoman-generator');

var chalk = require('chalk');
var yosay = require('yosay');


var githubOptions = {
  version: '3.0.0'
};

var GitHubApi = require('github');
var github = new GitHubApi(githubOptions);

var githubUserInfo = function(name, cb, log) {
  github.user.getFrom({
    user: name
  }, function(err, res) {
    if (err) {
      log.error('Cannot fetch your github profile. Make sure you\'ve typed it correctly.');
      res = {
        name: '',
        email: '',
        html_url: ''
      };
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

module.exports = generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
          'Welcome to the good' + chalk.red('Nearsoft\'s Apprentice') + ' generator!'
          ));

        var prompts = [{
          name: 'githubUser',
          message: 'Would you mind telling me your username on GitHub?',
          default: 'someuser'
        }];

        this.prompt(prompts, function(props) {
          this.githubUser = props.githubUser;

          done();
        }.bind(this));
      },

      userInfo: function() {
        var done = this.async();

        githubUserInfo(this.githubUser, function(res) {
          /*jshint camelcase:false */
          this.realname = res.name;
          this.email = res.email;
          this.githubUrl = res.html_url;
          done();
        }.bind(this), this.log);
      },

      scaffoldFolders: function() {
        this.mkdir("app");
        this.mkdir("test");
      },

      copyMainFiles: function(){

        this.template("_gruntfile.js", "Gruntfile.js");
        this.template("_package.json", "package.json");


      },

      installingDevDependencies: function() {
        this.npmInstall(['grunt', 'grunt-contrib-watch', 'grunt-mocha-test', 'mocha', 'should'],
         { 'saveDev': true },
         function(){
          console.log(chalk.green('Finishing loading Dependencies'));
        });
      },


      installingDependencies: function() {
        this.npmInstall(['grunt'], { 'save': true },
          function(){
            console.log(chalk.green('Everything is up and ready to go!'));
          });
},



});