/**
 * 获取操作系统信息
 * @returns
 */
export function getOS() {
    var sUserAgent = navigator.userAgent;
    var isWin =
        navigator.platform == 'Win32' || navigator.platform == 'Windows';
    var isMac =
        navigator.platform == 'Mac68K' ||
        navigator.platform == 'MacPPC' ||
        navigator.platform == 'Macintosh' ||
        navigator.platform == 'MacIntel';
    if (isMac) return 'Mac';
    var isUnix = navigator.platform == 'X11' && !isWin && !isMac;
    if (isUnix) return 'Unix';
    var isLinux = String(navigator.platform).indexOf('Linux') > -1;
    if (isLinux) return 'Linux';
    if (isWin) {
        var isWin2K =
            sUserAgent.indexOf('Windows NT 5.0') > -1 ||
            sUserAgent.indexOf('Windows 2000') > -1;
        if (isWin2K) return 'Win2000';
        var isWinXP =
            sUserAgent.indexOf('Windows NT 5.1') > -1 ||
            sUserAgent.indexOf('Windows XP') > -1;
        if (isWinXP) return 'WinXP';
        var isWin2003 =
            sUserAgent.indexOf('Windows NT 5.2') > -1 ||
            sUserAgent.indexOf('Windows 2003') > -1;
        if (isWin2003) return 'Win2003';
        var isWinVista =
            sUserAgent.indexOf('Windows NT 6.0') > -1 ||
            sUserAgent.indexOf('Windows Vista') > -1;
        if (isWinVista) return 'WinVista';
        var isWin7 =
            sUserAgent.indexOf('Windows NT 6.1') > -1 ||
            sUserAgent.indexOf('Windows 7') > -1;
        if (isWin7) return 'Win7';
        var isWin10 =
            sUserAgent.indexOf('Windows NT 10') > -1 ||
            sUserAgent.indexOf('Windows 10') > -1;
        if (isWin10) return 'Win10';
    }
    return 'other';
}

/**
 * 获取浏览器信息
 * @returns
 */
export function getBrowser() {
    var UserAgent = navigator.userAgent.toLowerCase();
    var browserInfo = {};
    var browserArray = {
        IE: window.ActiveXObject || 'ActiveXObject' in window, // IE
        Chrome:
            UserAgent.indexOf('chrome') > -1 &&
            UserAgent.indexOf('safari') > -1, // Chrome浏览器
        Firefox: UserAgent.indexOf('firefox') > -1, // 火狐浏览器
        Opera: UserAgent.indexOf('opera') > -1, // Opera浏览器
        Safari:
            UserAgent.indexOf('safari') > -1 &&
            UserAgent.indexOf('chrome') == -1, // safari浏览器
        Edge: UserAgent.indexOf('edge') > -1, // Edge浏览器
        QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
        WeixinBrowser: /MicroMessenger/i.test(UserAgent), // 微信浏览器
    };
    // console.log(browserArray)
    for (var i in browserArray) {
        if (browserArray[i]) {
            var versions = '';
            if (i == 'IE') {
                versions = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)[2];
            } else if (i == 'Chrome') {
                for (var mt in navigator.mimeTypes) {
                    //检测是否是360浏览器(测试只有pc端的360才起作用)
                    if (
                        navigator.mimeTypes[mt]['type'] ==
                        'application/360softmgrplugin'
                    ) {
                        i = '360';
                    }
                }
                versions = UserAgent.match(/chrome\/([\d.]+)/)[1];
            } else if (i == 'Firefox') {
                versions = UserAgent.match(/firefox\/([\d.]+)/)[1];
            } else if (i == 'Opera') {
                versions = UserAgent.match(/opera\/([\d.]+)/)[1];
            } else if (i == 'Safari') {
                versions = UserAgent.match(/version\/([\d.]+)/)[1];
            } else if (i == 'Edge') {
                versions = UserAgent.match(/edge\/([\d.]+)/)[1];
            } else if (i == 'QQBrowser') {
                versions = UserAgent.match(/qqbrowser\/([\d.]+)/)[1];
            }
            browserInfo.type = i;
            browserInfo.versions = parseInt(versions);
        }
    }
    return browserInfo;
}
