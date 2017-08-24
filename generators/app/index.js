'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the phenomenal ' + chalk.red('generator-webext-sidebar') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'title',
        message: 'Please enter the title of your extension',
        default: 'Some Random Extension'
      },
      {
        type: 'input',
        name: 'url',
        message: 'Please enter the URL to be shown in the sidebar',
        default: 'https://www.example.com/'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please enter the description of the sidebar',
        default: ''
      },
      {
        type: 'input',
        name: 'sidebarTitle',
        message: 'Please enter the title to be shown in the sidebar',
        default: 'Some Random Sidebar'
      },
      {
        type: 'input',
        name: 'iconPath',
        message: 'Please enter the absolute path for the icon. SVG is the only format accepted',
        default: this.templatePath('icon.svg')
      }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Var manifest = this.fs.readJSON('manifest.json');
    // manifest.description = this.props.description;
    // manifest.name = this.props.title;
    // manifest.sidebar_action.default_title = this.props.sidebarTitle;
    // Var manifest = {
    //   description: this.props.description,
    //   name: this.props.title,
    //   manifest_version: 2,
    //   version: '1.0.0',
    //   permissions: [],
    //   sidebar_action: {
    //     browser_style: false,
    //     default_title: this.props.sidebarTitle,
    //     default_icon: 'icon.svg',
    //     default_panel: 'sidebar.html'
    //   }
    // };
    this.fs.copy(
      this.templatePath('sidebar.html'),
      this.destinationPath('sidebar.html')
    );
    this.fs.copy(
      this.props.iconPath,
      this.destinationPath('icon.svg')
    );
    this.fs.copyTpl(
      this.templatePath('manifest.json'),
      this.destinationPath('manifest.json'), this.props
    );
    // This.fs.writeJSON('manifest.json', manifest);
    this.fs.write('sidebar.js', `window.location.href="${this.props.url}"`);
  }
};
