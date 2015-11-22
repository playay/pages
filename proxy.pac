var http = "PROXY 182.92.214.222:5088";

var socks5 = "SOCKS5 182.92.214.222:2088";

function FindProxyForURL(url, host) {
    if (shExpMatch(host,"*qunar*")
        || shExpMatch(host,"*cn*")
        || shExpMatch(host,"*baidu*")
        || shExpMatch(host,"*bdstatic*")
        ) {
        return "DIRECT"; 
    }

    if (shExpMatch(host,"*google*")
        || shExpMatch(host,"*gstatic*")
        || shExpMatch(host,"*youtube*")
        || shExpMatch(host,"*ytimg*")
        || shExpMatch(host,"*facebook*")
        || shExpMatch(host,"*fbcdn*")
        || shExpMatch(host,"*twitter*")
        || shExpMatch(host,"*twimg*")
        || shExpMatch(host,"*gist*")
        || shExpMatch(host,"*wikipedia*")
        || shExpMatch(host,"*wikimedia*")
        ) {
        return http + ";" + socks5; 
    }

    return "DIRECT"; 
} 
