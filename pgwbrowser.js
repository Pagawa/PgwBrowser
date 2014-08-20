/**
 * PgwBrowser - Version 1.2
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
        pgwBrowser.viewport = {};
        pgwBrowser.os = {};        
        resizeEvent = null;

        // The order of the following arrays is important, be careful if you change it.

        var browserData = [
            { name: 'Chrome Mobile',     group: 'Chrome',   identifier: 'Chrome/([0-9.]*) Mobile', versionIdentifier: 'Chrome/([0-9.]*)'},
            { name: 'Chrome',            group: 'Chrome',   identifier: 'Chrome/([0-9.]*)'         },
            { name: 'Chromium',          group: 'Chrome',   identifier: 'Chromium/([0-9.]*)'       },
            { name: 'Chrome for iOS',    group: 'Chrome',   identifier: 'CriOS/([0-9.]*)'          },
            { name: 'Android Browser',   group: 'Chrome',   identifier: 'CrMo/([0-9.]*)'           },
            { name: 'Firefox',           group: 'Firefox',  identifier: 'Firefox/([0-9.]*)'        },
            { name: 'Opera Mini',        group: 'Opera',    identifier: 'Opera Mini/([0-9.]*)'     },
            { name: 'Opera',             group: 'Opera',    identifier: 'Opera ([0-9.]*)'          },
            { name: 'Opera',             group: 'Opera',    identifier: 'Opera/([0-9.]*)',         versionIdentifier: 'Version/([0-9.]*)' },
            { name: 'IEMobile',          group: 'Explorer', identifier: 'IEMobile/([0-9.]*)'       },
            { name: 'Internet Explorer', group: 'Explorer', identifier: 'MSIE ([a-zA-Z0-9.]*)'     },
            { name: 'Internet Explorer', group: 'Explorer', identifier: 'Trident/([0-9.]*)',       versionIdentifier: 'rv:([0-9.]*)' },
            { name: 'Safari',            group: 'Safari',   identifier: 'Safari/([0-9.]*)',        versionIdentifier: 'Version/([0-9.]*)' }
        ];

        var osData = [
            { name: 'Windows 2000',           group: 'Windows',       identifier: 'Windows NT 5.0',                  version: '5.0' },
            { name: 'Windows XP',             group: 'Windows',       identifier: 'Windows NT 5.1',                  version: '5.1' },
            { name: 'Windows Vista',          group: 'Windows',       identifier: 'Windows NT 6.0',                  version: '6.0' },
            { name: 'Windows 7',              group: 'Windows',       identifier: 'Windows NT 6.1',                  version: '7.0' },
            { name: 'Windows 8',              group: 'Windows',       identifier: 'Windows NT 6.2',                  version: '8.0' },
            { name: 'Windows 8.1',            group: 'Windows',       identifier: 'Windows NT 6.3',                  version: '8.1' },
            { name: 'Windows Phone',          group: 'Windows Phone', identifier: 'Windows Phone ([0-9.]*)',         },
            { name: 'Windows Phone',          group: 'Windows Phone', identifier: 'Windows Phone OS ([0-9.]*)',      },
            { name: 'Windows',                group: 'Windows',       identifier: 'Windows',                         },
            { name: 'Chrome OS',              group: 'Chrome OS',     identifier: 'CrOS',                            },
            { name: 'Android',                group: 'Android',       identifier: 'Android',                         versionIdentifier: 'Android ([a-zA-Z0-9.-]*)' },
            { name: 'iPad',                   group: 'iOS',           identifier: 'iPad',                            versionIdentifier: 'OS ([0-9_]*)', versionSeparator: '([_|.])' },
            { name: 'iPod',                   group: 'iOS',           identifier: 'iPod',                            versionIdentifier: 'OS ([0-9_]*)', versionSeparator: '([_|.])' },
            { name: 'iPhone',                 group: 'iOS',           identifier: 'iPhone OS',                       versionIdentifier: 'OS ([0-9_]*)', versionSeparator: '([_|.])' },
            { name: 'Mac OS X Cheetah',       group: 'Mac OS',        identifier: 'Mac OS X (10([_|.])0([0-9_.]*))', versionSeparator: '([_|.])' },
            { name: 'Mac OS X Puma',          group: 'Mac OS',        identifier: 'Mac OS X (10([_|.])1([0-9_.]*))', versionSeparator: '([_|.])' },
            { name: 'Mac OS X Jaguar',        group: 'Mac OS',        identifier: 'Mac OS X (10([_|.])2([0-9_.]*))', versionSeparator: '([_|.])' },
            { name: 'Mac OS X Panther',       group: 'Mac OS',        identifier: 'Mac OS X (10([_|.])3([0-9_.]*))', versionSeparator: '([_|.])' },
            { name: 'Mac OS X Tiger',         group: 'Mac OS',        identifier: 'Mac OS X (10([_|.])4([0-9_.]*))', versionSeparator: '([_|.])' },
            { name: 'Mac OS X Leopard',       group: 'Mac OS',        identifier: 'Mac OS X (10([_|.])5([0-9_.]*))', versionSeparator: '([_|.])' },
            { name: 'Mac OS X Snow Leopard',  group: 'Mac OS',        identifier: 'Mac OS X (10([_|.])6([0-9_.]*))', versionSeparator: '([_|.])' },
            { name: 'Mac OS X Lion',          group: 'Mac OS',        identifier: 'Mac OS X (10([_|.])7([0-9_.]*))', versionSeparator: '([_|.])' },
            { name: 'Mac OS X Mountain Lion', group: 'Mac OS',        identifier: 'Mac OS X (10([_|.])8([0-9_.]*))', versionSeparator: '([_|.])' },
            { name: 'Mac OS X Mavericks',     group: 'Mac OS',        identifier: 'Mac OS X (10([_|.])9([0-9_.]*))', versionSeparator: '([_|.])' },
            { name: 'Mac OS',                 group: 'Mac OS',        identifier: 'Mac OS'                           },
            { name: 'Ubuntu',                 group: 'Linux',         identifier: 'Ubuntu',                          versionIdentifier: 'Ubuntu/([0-9.]*)' },
            { name: 'Debian',                 group: 'Linux',         identifier: 'Debian',                          },
            { name: 'Gentoo',                 group: 'Linux',         identifier: 'Gentoo',                          },
            { name: 'Linux',                  group: 'Linux',         identifier: 'Linux',                           },
            { name: 'BlackBerry',             group: 'BlackBerry',    identifier: 'BlackBerry',                      }
        ];

        //  Set browser data
        var setBrowserData = function() {
            var userAgent = pgwBrowser.userAgent.toLowerCase();

            // Check browser type
            for (i in browserData) {
                var browserRegExp = new RegExp(browserData[i].identifier.toLowerCase());
                var browserRegExpResult = browserRegExp.exec(userAgent);

                if (browserRegExpResult != null && browserRegExpResult[1]) {
                    pgwBrowser.browser.name = browserData[i].name;
                    pgwBrowser.browser.group = browserData[i].group;

                    // Check version
                    if (browserData[i].versionIdentifier) {
                        var versionRegExp = new RegExp(browserData[i].versionIdentifier.toLowerCase());
                        var versionRegExpResult = versionRegExp.exec(userAgent);

                        if (versionRegExpResult != null && versionRegExpResult[1]) {
                            setBrowserVersion(versionRegExpResult[1]);
                        }

                    } else {
                        setBrowserVersion(browserRegExpResult[1]);
                    }

                    break;
                }
            }

            return true;
        };

        // Set browser version
        var setBrowserVersion = function(version) {
            var splitVersion = version.split('.', 2);
            pgwBrowser.browser.fullVersion = version;

            // Major version
            if (splitVersion[0]) {
                pgwBrowser.browser.majorVersion = parseInt(splitVersion[0]);
            }

            // Minor version
            if (splitVersion[1]) {
                pgwBrowser.browser.minorVersion = parseInt(splitVersion[1]);
            }

            return true;
        };

        //  Set OS data
        var setOsData = function() {
            var userAgent = pgwBrowser.userAgent.toLowerCase();

            // Check browser type
            for (i in osData) {
                var osRegExp = new RegExp(osData[i].identifier.toLowerCase());
                var osRegExpResult = osRegExp.exec(userAgent);

                if (osRegExpResult != null) {
                    pgwBrowser.os.name = osData[i].name;
                    pgwBrowser.os.group = osData[i].group;

                    // Version defined
                    if (osData[i].version) {
                        setOsVersion(osData[i].version, (osData[i].versionSeparator) ? osData[i].versionSeparator : '.');

                    // Version detected
                    } else if (osRegExpResult[1]) {
                        setOsVersion(osRegExpResult[1], (osData[i].versionSeparator) ? osData[i].versionSeparator : '.');

                    // Version identifier
                    } else if (osData[i].versionIdentifier) {
                        var versionRegExp = new RegExp(osData[i].versionIdentifier.toLowerCase());
                        var versionRegExpResult = versionRegExp.exec(userAgent);

                        if (versionRegExpResult != null && versionRegExpResult[1]) {
                            setOsVersion(versionRegExpResult[1], (osData[i].versionSeparator) ? osData[i].versionSeparator : '.');
                        }
                    }

                    break;
                }
            }

            return true;
        };

        // Set OS version
        var setOsVersion = function(version, separator) {
            var splitVersion = version.split(separator, 2);

            if (separator != '.') {
                version = version.replace(new RegExp(separator, 'g'), '.');
            }

            pgwBrowser.os.fullVersion = version;

            // Major version
            if (splitVersion[0]) {
                pgwBrowser.os.majorVersion = parseInt(splitVersion[0]);
            }

            // Minor version
            if (splitVersion[1]) {
                pgwBrowser.os.minorVersion = parseInt(splitVersion[1]);
            }

            return true;
        };

        // Set viewport size
        var setViewportSize = function(init) {
            pgwBrowser.viewport.width = $(window).width();
            pgwBrowser.viewport.height = $(window).height();

            // Resize triggers
            if (typeof init == 'undefined') {
                if (resizeEvent == null) {
                    $(window).trigger('PgwBrowser::StartResizing');
                } else {
                    clearTimeout(resizeEvent);
                }

                resizeEvent = setTimeout(function() {
                    $(window).trigger('PgwBrowser::StopResizing');
                    clearTimeout(resizeEvent);
                    resizeEvent = null;
                }, 300);
            }
            
            return true;
        };

        // Set viewport orientation
        var setViewportOrientation = function() {
            if (typeof window.orientation == 'undefined') {

                if (pgwBrowser.viewport.width >= pgwBrowser.viewport.height) {
                    pgwBrowser.viewport.orientation = 'landscape';
                } else {
                    pgwBrowser.viewport.orientation = 'portrait';
                }

            } else {
                switch(window.orientation) {
                    case -90:
                    case 90:
                        pgwBrowser.viewport.orientation = 'landscape';
                        break;
                    default:
                        pgwBrowser.viewport.orientation = 'portrait';
                        break; 
                }
            }

            // Orientation trigger
            $(window).trigger('PgwBrowser::OrientationChange');

            return true;
        };

        // Replace default value for the user-agent tester on pgwjs.com
        if (typeof window.pgwJsUserAgentTester != 'undefined') {
            pgwBrowser.userAgent = window.pgwJsUserAgentTester;
        }

        // Initialization
        setBrowserData();
        setOsData();
        setViewportSize(true);
        setViewportOrientation();

        // Triggers
        $(window).on('orientationchange', function(e) {
            setViewportOrientation();
        });

        $(window).resize(function(e) {
            setViewportSize();
        });

        return pgwBrowser;
    }
})(window.Zepto || window.jQuery);
