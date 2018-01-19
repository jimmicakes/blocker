let port = chrome.runtime.connect({ name: "communicate with background" });
document.addEventListener('DOMContentLoaded', () => {
    let dropdown = document.getElementById('dropdown');
    dropdown.addEventListener('change', () => {
        let mode = dropdown.value;
        port.postMessage({ mode }); //send mode selected to background
        dropdown.getElementById(mode).selected = 'selected';//mark and keep track of the selected mode
    })
});

