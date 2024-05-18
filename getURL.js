const checkboxURL = document.getElementById("checkboxURLID");

// Function to get the current tab URL
function getCurrentTabUrl(callback) {
    // Query the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Retrieve the URL of the first tab found
        let tab = tabs[0];
        let url = tab.url;
        callback(url);
    });
}

// Call the function to get the current tab URL and display it
const getURLButton = document.getElementById("pasteURLButtonID");

getURLButton.addEventListener('click', function() {
    getCurrentTabUrl(function(url) {
        const inputText = document.getElementById('textareaID');
        if (checkboxURL.checked) {
            inputText.value = "[[" + url + "]] " + inputText.value;
        }
        else {
            inputText.value = url + " " + inputText.value;
        }
    });
});
