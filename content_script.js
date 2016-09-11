//获取载入页面的信息，并使用chrome.runtime.sendMessage (msg) 发送信息
// var postInfo = $("div.postDesc");
// if (postInfo.length != 1) {
//     chrome.runtime.sendMessage({ type: "cnblog-article-information", error: "获取文章信息失败." });
// } else {
//     var msg = {
//         type: "cnblog-article-information",
//         title: $("#cb_post_title_url").text(),
//         postDate: postInfo.find("#post-date").text(),
//         author: postInfo.find("a").first().text(),
//         url: document.URL
//     };
//     chrome.runtime.sendMessage(msg);
// }

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var type = request.type;
        if (type == 'createNewPage') {
            createNewPage();
            //sendResponse({ farewell: "I'm contentscript,goodbye!" });
        } else if (type == 'clipCurPage') {
            clipCurPage();
        } else if (type == 'saveAsPDF') {
            saveAsPDF();
        }
    });

function createNewPage() {
    $('.dc-addon,.praise-box,.show-praise-wrap,.active-box').hide();

    var pageContent = $('.detail-content-wrap').html();

    var title = $('title').text();
    var link = $('link');
    var newPage = window.open("");

    var linkHtml = "";
    link.each(function(index, item) {
        linkHtml += "<link rel='stylesheet' type='text/css' href='" + getRightDomain($(item).attr('href')) + "'</link>";
    })

    var specialLink = "<style>h1 {font-size: 32px; font-weight: bold;}</style>";
    var html = "<!DOCTYPE html><html><head><title>" + title + "</title>" + linkHtml + specialLink + "</head><body><div style='margin:0 auto;width:840px;'>" + pageContent + "</div><body></html>";
    newPage.document.write(html);
}

function clipCurPage() {

}

function saveAsPDF() {

}

function getRightDomain(url) {
    var host = getDomainFromUrl(url);
    if (url.indexOf(host) == -1 && url.indexOf('http') == -1)
        return host + url;

    return url;
}

function getDomainFromUrl() {
    var url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}

// if (pageContent) {
//     chrome.runtime.sendMessage({
//         type: 'get-imooc-page',
//         content: pageContent.get(0)
//     });
// } else {
//     chrome.runtime.sendMessage({
//         type: 'get-imooc-page',
//         error: "获取文章信息失败."
//     });
// }


// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log("imcontentscript:");
//         if (request.greeting == "hello") {
//             sendResponse({ farewell: "I'm contentscript,goodbye!" });
//         }
//     });