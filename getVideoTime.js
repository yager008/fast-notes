const getTimeButton = document.getElementById("getVideoTime");
const timeWatchedElement = document.getElementById("timeWatched");

// getTimeButton.addEventListener('click', function() {
//     chrome.runtime.sendMessage({cmd: "getVideoTime", body: {}}, (response) => {
//         timeWatchedElement.innerText = response.body;
//
//         return true;
//     });
// });
// const getTimeButton = document.getElementById("getVideoTime");
// const timeWatchedElement = document.getElementById("timeWatched");

// getTimeButton.addEventListener('click', function() {
//     chrome.runtime.sendMessage({cmd: "getVideoTime", body: {}}, (response) => {
//         timeWatchedElement.innerText = response.body;
//
//         return true;
//     });
// });
getTimeButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({cmd: "getVideoTime"}, (response) => {
        if (response && response.body) {
            timeWatchedElement.innerText = response.body;
        } else {
            timeWatchedElement.innerText = "Error: Response is undefined or does not have expected structure";
        }
    });
});
