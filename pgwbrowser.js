/**
 * PgwBrowser - Version 1.0
 *
 * Copyright 2014, Jonathan M. Piat
 * http://pgwjs.com - http://pagawa.com
 * 
 * Released under the GNU GPLv3 license - http://opensource.org/licenses/gpl-3.0
 */
;(function($){
    $.pgwBrowser = function() {

        var pgwBrowser = {};        
        pgwBrowser.userAgent = navigator.userAgent;
        pgwBrowser.browser = {};
        pgwBrowser.os = {};

        var browserData = [
            { name: 'Chrome',  identifier: 'Chrome/([0-9.]*)',   versionSeparator: '.' },
            { name: 'Chrome',  identifier: 'Chromium/([0-9.]*)', versionSeparator: '.' },
            { name: 'Firefox', identifier: 'Firefox/([0-9.]*)',  versionSeparator: '.' },
            { name: 'Safari',  identifier: 'Safari/([0-9.]*)',   versionSeparator: '.' },
            { name: 'MSIE',    identifier: 'MSIE/([0-9.]*)',     versionSeparator: '.' },
            { name: 'Trident', identifier: 'Trident/([0-9.]*)',  versionSeparator: '.' },
            { name: 'Opera',   identifier: 'Opera/([0-9.]*)',    versionSeparator: '.' }
        ];

        var osData = [
            { name: 'Windows 2000',           group: 'windows', identifier: 'Windows NT 5.0',          versionSeparator: null },
            { name: 'Windows XP',             group: 'windows', identifier: 'Windows NT 5.1',          versionSeparator: null },
            { name: 'Windows Vista',          group: 'windows', identifier: 'Windows NT 6.0',          versionSeparator: null },
            { name: 'Windows 7',              group: 'windows', identifier: 'Windows NT 6.1',          versionSeparator: null },
            { name: 'Windows 8',              group: 'windows', identifier: 'Windows NT 6.2',          versionSeparator: null },
            { name: 'Windows 8.1',            group: 'windows', identifier: 'Windows NT 6.3',          versionSeparator: null },
            { name: 'Mac OS X Cheetah',       group: 'mac',     identifier: 'Max OS X 10_0([0-9_]*)',  versionSeparator: '_' },
            { name: 'Mac OS X Puma',          group: 'mac',     identifier: 'Max OS X 10_1([0-9_]*)',  versionSeparator: '_' },
            { name: 'Mac OS X Jaguar',        group: 'mac',     identifier: 'Max OS X 10_2([0-9_]*)+', versionSeparator: '_' },
            { name: 'Mac OS X Panther',       group: 'mac',     identifier: 'Max OS X 10_3([0-9_]*)+', versionSeparator: '_' },
            { name: 'Mac OS X Tiger',         group: 'mac',     identifier: 'Max OS X 10_4([0-9_]*)+', versionSeparator: '_' },
            { name: 'Mac OS X Leopard',       group: 'mac',     identifier: 'Max OS X 10_5([0-9_]*)+', versionSeparator: '_' },
            { name: 'Mac OS X Snow Leopard',  group: 'mac',     identifier: 'Max OS X 10_6([0-9_]*)+', versionSeparator: '_' },
            { name: 'Mac OS X Lion',          group: 'mac',     identifier: 'Max OS X 10_7([0-9_]*)+', versionSeparator: '_' },
            { name: 'Mac OS X Mountain Lion', group: 'mac',     identifier: 'Max OS X 10_8([0-9_]*)+', versionSeparator: '_' },
            { name: 'Mac OS X Mavericks',     group: 'mac',     identifier: 'Max OS X 10_9([0-9_]*)+', versionSeparator: '_' },
            { name: 'Ubuntu',                 group: 'linux',   identifier: 'Ubuntu/([0-9_]*)+',       versionSeparator: '.' },
            { name: 'Debian',                 group: 'linux',   identifier: 'Debian',                  versionSeparator: null },
            { name: 'Gentoo',                 group: 'linux',   identifier: 'Gentoo',                  versionSeparator: null },
            { name: 'Linux',                  group: 'linux',   identifier: 'Linux',                   versionSeparator: null }
        ];

        //  Set browser
        var setBrowserData = function() {
            for (i in browserData) {
                var regExp = new RegExp(browserData[i].identifier);
                var regExpResult = regExp.exec(pgwBrowser.userAgent);
                
                if (regExpResult != null && regExpResult[1]) {
                    getVersion(regExpResult[1], browserData[i].versionSeparator);
                }
            }
        };
        
        // Get version
        var getVersion = function(version, separator) {
            console.log(version, separator);
        };
      
        // Set data
        setBrowserData();
        
        return pgwBrowser;
    }
})(window.Zepto || window.jQuery);
