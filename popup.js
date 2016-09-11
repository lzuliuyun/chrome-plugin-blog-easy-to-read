// document.addEventListener('DOMContentLoaded', function() {
//     var data = chrome.extension.getBackgroundPage().articleData;
//     if (data.error) {
//         $("#message").text(data.error);
//         $("#content").hide();
//     } else {
//         $("#message").hide();
//         $("#content-title").text(data.title);
//         $("#content-author").text(data.author);
//         $("#content-date").text(data.postDate);
//         $("#content-first-access").text(data.firstAccess);
//     }
// });

$(function() {
    $('ul li').click(function() {
        var index = $('ul li').index($(this));
        if (index == 0) {
            doAction('clipCurPage');
        } else if (index == 1) {
            doAction('createNewPage');
        } else if (index == 2) {
            doAction('saveAsPDF');
        }
    });
})


function doAction(typeName) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: typeName }, function(response) {
            console.log("popup:" + response.farewell);
        });
    });
}

function createNewPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "createNewPage" }, function(response) {
            console.log("popup:" + response.farewell);
        });
    });
    //chrome.extension.getBackgroundPage().createNewPage();
}

function clipCurPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "clipCurPage" }, function(response) {
            console.log("popup:" + response.farewell);
        });
    });
    //chrome.extension.getBackgroundPage().clipCurPage();
}

function saveAsPDF() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "saveAsPDF" }, function(response) {
            console.log("popup:" + response.farewell);
        });
    });
    //chrome.extension.getBackgroundPage().saveAsPDF();
}