let mode;

chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        mode = msg.mode; //receives the mode sent by popup.js
    });
});


chrome.webRequest.onBeforeRequest.addListener(
    details => {
        if (mode !== 'play') return { cancel: true };
    },
    { urls: ["*://www.facebook.com/*", "*://www.reddit.com/*", "*://www.instagram.com/*", "*://www.amazon.com/*", "*://9gag.com/*"] },
    ["blocking"]);

