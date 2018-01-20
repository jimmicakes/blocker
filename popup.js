const port = chrome.runtime.connect({ name: "communicate with background" });

document.addEventListener('DOMContentLoaded', () => {
    let dropdown = document.getElementById('dropdown');
    console.log(dropdown.value);
    chrome.storage.sync.get('mode', mode =>
        dropdown.value = mode.mode);

    dropdown.addEventListener('change', () => {
        var mode = dropdown.value;
        chrome.storage.sync.set({ mode });
        port.postMessage({ mode }); //send mode selected to background
    })
});