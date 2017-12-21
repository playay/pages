var http = "PROXY localhost:1087";

var socks5 = "SOCKS5 localhost:1086";

function FindProxyForURL(url, host) {
    if (shExpMatch(host,"*qunar*")
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
        || shExpMatch(host,"*chrome*")
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
        || shExpMatch(host,"*stackoverflow*")
        || shExpMatch(host,"*wikimedia*")
        || shExpMatch(host,"*xvideos*")
        || shExpMatch(host,"*porn*")
        || shExpMatch(host,"*sis001*")
        || shExpMatch(host,"*rubygems*")
        || shExpMatch(host,"*weather*")
        || shExpMatch(host,"*feling.net")
        || shExpMatch(host,"*feling.io")
        || shExpMatch(host,"*amazonaws*")
        ) {
        return socks5 + ";" + http; 
    }

    return "DIRECT"; 
} 
