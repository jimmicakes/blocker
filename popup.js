//popup.js only gets/sets stored in the storage and send the mode info., it does nothing else
//A simple UI is made with css

const port = chrome.runtime.connect({ name: "send the current mode" });

document.addEventListener('DOMContentLoaded', () => {
    let dropdown = document.getElementById('dropdown');

    //get current mode
    chrome.storage.sync.get('mode', mode =>
        dropdown.value = mode.mode);

    dropdown.addEventListener('change', () => {
        let mode = dropdown.value  //set new mode
        chrome.storage.sync.set({ mode }); //store the new mode in storage
        port.postMessage({ mode }); //send mode selected to background
    })
});