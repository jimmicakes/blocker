//Content.js is the only one that can interact with DOM element of a page.
//Use it to block sites containing certain words

chrome.storage.sync.get('mode', mode => { //check current mode
    if (mode.mode === 'work') {
        //get contents and url of the webpage
        let content = document.body.innerHTML; //using innerText would be slower b/c it's aware of CSS styling
        let host = document.location.hostname;

        //set whitelist to pass and keywords for filtering
        let whitelist = /fullstack|github|slack|wikipedia|google|stackoverflow|mozila|chrome/;
        let keywords = ['game', 'gaming', 'dating'];

        //check if the site is in the whitelist
        let isGood = host.search(whitelist) > -1 ? true : false;
        if (!isGood) {
            for (key in keywords) {
                if (content.indexOf(keywords[key]) > -1) {
                    //you can get a glimpse of the site before it's blocked
                    document.body.setAttribute('style', 'display:none!important');
                    alert('Site Blocked');
                    break; //stop when the first keyword is found
                }
            }
        }
    }
});