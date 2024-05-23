const getTimeButton = document.getElementById("getVideoTime");
const timeWatchedElement = document.getElementById("timeWatched");
// const textTypeArea = document.getElementById("textareaID");

getTimeButton.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { cmd: "getVideoURL" }, (response) => {
            if (response && response.body) {
                timeWatchedElement.innerText = response.body;
                const inputText = document.getElementById('textareaID');
                if (!Number.isNaN(response.body)) {
                    inputText.value = inputText.value + "\n" + response.body + " ";
                    inputText.focus();
                }
            } else {
                timeWatchedElement.innerText = "Error: Response is undefined or does not have expected structure";
            }
        });
    });
});