//background.js interact with web requests
//It can be used to block specific websites

//set default mode to when extension launched
let mode = 'work';
chrome.storage.sync.set({ mode });

chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(msg => mode = msg.mode) //receives the mode sent by popup.js
});

//these requests will be cancelled, don't have to check the sites' contents. 
chrome.webRequest.onBeforeRequest.addListener(
    details => {
        if (mode === 'work') return { cancel: true };
    },
    {
        urls: ["*://www.facebook.com/*",
            "*://www.reddit.com/*",
            "*://www.instagram.com/*",
            "*://www.amazon.com/*",
            "*://9gag.com/*"]
    },
    ["blocking"]);