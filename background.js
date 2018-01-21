//background.js interact with web requests
//It can be used to block specific websites

//set default mode to when extension launched
let mode = 'work';
chrome.storage.sync.set({ mode });

chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(msg => {
        mode = msg.mode; //receives the mode sent by popup.js
        checkMode(mode);
    });
});


function checkMode(state) {
    if (state === 'play') {
        let res = prompt('Say "daddy please"');
        if (res !== 'daddy please') {
            mode = 'work';
            chrome.storage.sync.set({ mode });
        } else {
            alert('You have 10 seconds.');
            setTimeout(() => {
                mode = 'work';
                chrome.storage.sync.set({ mode });
            }, 10000)
        }
    }
}

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