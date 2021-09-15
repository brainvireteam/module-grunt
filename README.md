# Grunt Module #

Enable Grunt to be used for compiling CSS. Add additional control, speed, sourcemaps and allows post compiliation tasks.


## !!!! PLEASE READ ME !!!!! ##

In addition to this module, each project will need a project specific Grunt 'theme' module to extend this. This is needed to configure the themes and locales (if multi-language) for the project, replacing the Blank & Luma theme in en_US grunt set-up. The module will be "type": "magento2-component" and just contain one file: grunt/grunt/configs/themes.js. 

An example of the themes.js & composer.json files for this are set out at the bottom of this README.


After installing this module npm install should be run to install node modules for Grunt. run: sudo npm install inside the project/gunt folder (at the same level as this module's Gruntfile.js.) This will create a local or server copy of node_modules. To check if the node modules installed matches those in the package.json list use ls -1 node_modules/.

Use the command grunt refresh --force to run all grunt tasks or a subset with grunt exec:en_US or grunt dev:en_US.

The project will still contain Magento's default Gruntfile.js - this should be ignored. If you run grunt at the project level (i.e. not in its grunt folder) it will not work properly.


If this module is upgraged and your project needs the new upgrade version, the node_modules folder will need to be deleted, after running composer update, it will need to be re-created using sudo npm install again.


### File functionality ###

Gruntfile.js 
*  dev task function to allow grunt tasks for specific locales - e.g. grunt dev:en_US
*  npm task to load post CSS routine: grunt.loadNpmTasks('grunt-postcss');

package.json 
*  postcss modules that run after Grunt has compiled the CSS stylesheet - (March 2015 = Autoprefixer, CSSnano, RTLcss)

dev/tools/grunt/configs/less.js
*  add sourceMapBasepath to pub/ for source maps



### composer.json mapping for project specific grunt theme module - replace {PROJECT}: ###

```
#!javascript

{
    "name": "{PROJECT}/module-grunt-theme",
    "description": "{PROJECT} Grunt Module",
    "license": "proprietary",
    "require": {
        "php": "~5.5.0|~5.6.0|~7.0.0",
        "magento/framework": "100.0.*",
        "{PROJECT}/theme-default": "*"
    },
    "type": "magento2-component",
    "extra": {
        "map": [
            [
                "grunt/grunt/configs/themes.js",
                "grunt/grunt/configs/themes.js"
            ]
        ]
    }
}
```

### themes.js example - this will need to be tailored to the project setup - also replace {PROJECT}: ###

```
#!javascript

module.exports = {
    ar_SA: {
        area: 'frontend',
        name: '{PROJECT}/arabic',
        locale: 'ar_SA',
        files: [
            'css/styles-m',
            'css/styles-l',
            'css/email'
        ],
        dsl: 'less'
    },
    en_US: {
        area: 'frontend',
        name: '{PROJECT}/default',
        locale: 'en_US',
        files: [
            'css/styles-m',
            'css/styles-l',
            'css/email'
        ],
        dsl: 'less'
    }
};
```