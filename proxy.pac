var http = "PROXY 182.92.214.222:5088";

var socks5 = "SOCKS5 localhost:1080";

function FindProxyForURL(url, host) {
    if (shExpMatch(host,"*qunar*")
        || shExpMatch(host,"*feling.io")
        || shExpMatch(host,"*feling.net")
        || shExpMatch(host,"*.cn")
        || shExpMatch(host,"*baidu*")
        || shExpMatch(host,"*bdstatic*")
        || shExpMatch(host,"*aliyun*")
        || shExpMatch(host,"*alicdn*")
        || shExpMatch(host,"*mmstat*")
        || shExpMatch(host,"*alipay*")
        ) {
        return "DIRECT"; 
    }

    if (shExpMatch(host,"*google*")
        || shExpMatch(host,"*gstatic*")
        || shExpMatch(host,"*youtube*")
        || shExpMatch(host,"*ytimg*")
        || shExpMatch(host,"*ggpht*")
        || shExpMatch(host,"*facebook*")
        || shExpMatch(host,"*fbcdn*")
        || shExpMatch(host,"*twitter*")
        || shExpMatch(host,"*twimg*")
        || shExpMatch(host,"*gist*")
        || shExpMatch(host,"*github*")
        || shExpMatch(host,"*wikipedia*")
        || shExpMatch(host,"*wikimedia*")
        || shExpMatch(host,"*xvideos*")
        || shExpMatch(host,"*porn*")
        || shExpMatch(host,"*sis001*")
        || shExpMatch(host,"*rubygems*")
        || shExpMatch(host,"*weather*")
        ) {
        return socks5 + ";" + http; 
    }

    return "DIRECT"; 
} 
