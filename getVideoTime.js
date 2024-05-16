const getTimeButton = document.getElementById("getVideoTime");
const timeWatchedElement = document.getElementById("timeWatched");

getTimeButton.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { cmd: "getVideoURL" }, (response) => {
            if (response && response.body) {
                timeWatchedElement.innerText = response.body;

                const inputText = document.getElementById('textareaID');

                if (!Number.isNaN(response.body)) {
                    inputText.value = inputText.value + " " + response.body;
                }

            } else {
                timeWatchedElement.innerText = "Error: Response is undefined or does not have expected structure";
            }
        });
    });
});
