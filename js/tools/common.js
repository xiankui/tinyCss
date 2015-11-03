
//<a href="" onclick = "SetHome(this,window.location)">设为首页</a>
var SetHome = function(a, b) {
    try {
        a.style.behavior = "url(#default#homepage)", a.setHomePage(b)
    } catch (c) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch (c) {
                alert("此操作被浏览器拒绝！n请在浏览器地址栏输入“about:config”并回车n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。")
            }
            var d = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
            d.setCharPref("browser.startup.homepage", b)
        }
    }
}

//<a href="" onclick = "AddFavorite(window.location,document.title)">加入收藏</a>
var AddFavorite = function(a, b) {
    try {
        window.external.addFavorite(a, b)
    } catch (c) {
        try {
            window.sidebar.addPanel(b, a, "")
        } catch (c) {
            alert("加入收藏失败，请使用Ctrl+D进行添加")
        }
    }
}

//if(Browser.ie)  判断浏览器  （无法区分火狐和谷歌）
var Browser = {
    ie: /msie/.test(window.navigator.userAgent.toLowerCase()),
    moz: /gecko/.test(window.navigator.userAgent.toLowerCase()),
    opera: /opera/.test(window.navigator.userAgent.toLowerCase()),
    safari: /safari/.test(window.navigator.userAgent.toLowerCase())
}

//ie与ie6的判断
  var isIE = (document.all) ? true : false;
  var isIE6 = isIE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);
  //if(!-[1,]&&!window.XMLHttpRequest){如果是ie6。。。do something}

//getPos(node)
var getPos = function (obj) {
    var curleft = 0;
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop
        }
        while (obj = obj.offsetParent)
    } else if (obj.x) {
        curleft += obj.x;
        curtop += obj.y
    }
    return {
        'x': curleft,
        'y': curtop
    }
}
//getScroll(node)
var getScroll = function () {
    var t,
    l,
    w,
    h,
    ch,
    oh;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
        ch = document.documentElement.clientHeight;
        oh = document.documentElement.offsetHeight
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
        ch = document.body.clientHeight;
        oh = document.body.offsetHeight
    }
    return {
        t: t,
        l: l,
        w: w,
        h: h,
        ch: ch,
        oh: oh
    }
};
//about cookie
function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = (c_value.substring(c_start, c_end));
        //c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function checkCookie(c_name, value) {
    var mycookie = getCookie(c_name);
    if (mycookie == null || mycookie == "") {
        setCookie(c_name, value);
    }
}

function setCookie(c_name, c_value) {
    document.cookie = c_name + "=" + c_value;
}