/** @copyright 2015 Redbox Digital */

var combo = require('./combo');

var themes = require('./themes');

var _ = require('underscore');

var themeOptions = {};

var themeAR = Object.keys(themes).filter(function(theme){ return theme.includes('ar')})
    .reduce(function(obj, key){
        obj[key] = themes[key];
        return obj;
    }, {});


_.each(themeAR, makeThemeConfig(themeOptions));


function makeThemeConfig (o) {
    var rtlcss = require('rtlcss');

    function inner (theme, name) {
        // Right to Left if in Arabic
        var rtl = theme.locale.indexOf('ar_') === 0;

        var processors = [];

        if (rtl) {
            processors.push(rtlcss());
        }

        processors.push(require('cssnano')());

        o[name] = {
            options: {
                map: false,
                processors: processors
            },
            src: _.map(theme.files, buildFile)
        };

        function buildFile(file) {
            return '../pub/static/' + theme.area + '/' + theme.name + '/' + theme.locale + '/' + file + '.css';
        }
    }

    return inner;
}


module.exports = themeOptions;
