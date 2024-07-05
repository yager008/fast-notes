function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    // Add leading zero if seconds is less than 10
    remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    return minutes + ":" + remainingSeconds;
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.cmd === "popupClosed") {
        alert("popup closed");
    }

    if (message.cmd === "getVideoURL") {
        const video = document.querySelector('video');

        let currentTime = 0;

        if (video) {
            currentTime = video.currentTime;
            let roundedTime = Math.round(currentTime); // Round the currentTime to the nearest integer
            let formattedTime = formatTime(roundedTime);

            sendResponse({body: formattedTime});
        }
        else {
            sendResponse({body: 'no video found'});
        }
    }
    return true;
});
