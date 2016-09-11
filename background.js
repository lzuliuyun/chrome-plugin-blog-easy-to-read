function getDomainFromUrl(url) {
    var host = "null";
    if (typeof url == "undefined" || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
    if (getDomainFromUrl(tab.url).toLowerCase() == "www.imooc.com") {
        chrome.pageAction.show(tabId);
    }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("ibacground" + sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({ farewell: "I'm backgroud,goodbye!" });
    });

// function createNewPage() {
//     chrome.tabs.sendMessage(tabId, { greeting: "Watch your back." }, function(response) {
//             console.log(response)
//         })
//         // chrome.runtime.sendMessage({
//         //     type: 'get-imooc-page',
//         //     content: "get-imooc-page1"
//         // })
// }

// function clipCurPage() {

// }

// function saveAsPDF() {

// }