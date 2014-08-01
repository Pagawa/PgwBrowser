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
        pgwBrowser.window = {};
        pgwBrowser.os = {};

        // The order of this array is important, be careful if you change it.
        var browserData = [
            { name: 'Chrome',   identifier: 'Chrome/([0-9.]*)'     },
            { name: 'Chrome',   identifier: 'Chromium/([0-9.]*)'   },
            { name: 'Firefox',  identifier: 'Firefox/([0-9.]*)'    },
            { name: 'Opera',    identifier: 'Opera ([0-9.]*)'      },
            { name: 'Opera',    identifier: 'Opera/([0-9.]*)',     versionIdentifier: 'Version/([0-9.]*)' },
            { name: 'Safari',   identifier: 'Safari/([0-9.]*)',    versionIdentifier: 'Version/([0-9.]*)' },              
            { name: 'Explorer', identifier: 'MSIE ([a-zA-Z0-9.]*)' },
            { name: 'Explorer', identifier: 'Trident/([0-9.]*)',   versionIdentifier: 'rv:([0-9.]*)' }
        ];

        /*var osData = [
            { name: 'Android',                group: 'android', identifier: 'Android',                 versionSeparator: null },
            { name: 'iPhone',                 group: 'ios',     identifier: 'iPhone OS',               versionSeparator: null },
            { name: 'iPad',                   group: 'ios',     identifier: 'iPad',                    versionSeparator: null },
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
        ];*/

        
        
        //pgwBrowser.userAgent = 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36';
        //pgwBrowser.userAgent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; da-dk) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1';
        //pgwBrowser.userAgent = 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25';
        //pgwBrowser.userAgent = 'Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 6.0)';
        //pgwBrowser.userAgent = 'Mozilla/4.0 (compatible; MSIE 5.5b1; Mac_PowerPC)';
        pgwBrowser.userAgent = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko ';
        pgwBrowser.userAgent = 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14';
        pgwBrowser.userAgent = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0) Opera 12.14';
        
        
        
        //  Set browser
        var setBrowser = function() {
            var userAgent = pgwBrowser.userAgent.toLowerCase();
            
            // Check browser type
            for (i in browserData) {
                var browserRegExp = new RegExp(browserData[i].identifier.toLowerCase());
                var browserRegExpResult = browserRegExp.exec(userAgent);
                
                if (browserRegExpResult != null && browserRegExpResult[1]) {
                    pgwBrowser.browser.name = browserData[i].name;
                
                    // Check version
                    if (browserData[i].versionIdentifier) {
                        var versionIdentifier = browserData[i].versionIdentifier.toLowerCase();
                        var versionRegExp = new RegExp(versionIdentifier);
                        var versionRegExpResult = versionRegExp.exec(userAgent);
                        
                        if (versionRegExpResult != null && versionRegExpResult[1]) {
                            setVersion(versionRegExpResult[1], '.');
                        }
                    } else {
                        setVersion(browserRegExpResult[1], '.');
                    }
                    
                    break;
                }
            }
        };
        
        // Get version
        var setVersion = function(version, separator) {
            pgwBrowser.browser.fullVersion = version;

            var splitVersion = version.split(separator, 2);

            // Major version
            if (splitVersion[0]) {
                pgwBrowser.browser.majorVersion = parseInt(splitVersion[0]);
            }

            // Minor version
            if (splitVersion[1]) {
                pgwBrowser.browser.minorVersion = parseInt(splitVersion[1]);
            }
        };
      
        // Set data
        setBrowser();
        
        return pgwBrowser;
    }
})(window.Zepto || window.jQuery);
