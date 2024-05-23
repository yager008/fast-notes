function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    // Add leading zero if seconds is less than 10
    remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    return minutes + ":" + remainingSeconds;
}


const buttonTest= document.createElement('div');
buttonTest.setAttribute('class', 'post block bc2');
buttonTest.innerHTML = `
<form>
    <input type="button" id="helloButton" value="123213ello"> 
</form> `;

document.body.appendChild(buttonTest);

const helloButton= document.getElementById("helloButton");
helloButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({cmd: "executeScript"} , (response) => {
        alert(response);
    });
});

const preEls = document.querySelectorAll('pre');
const div = document.createElement('div');
div.setAttribute('class', 'post block bc2');
div.innerHTML = `
<dialog id="favDialog">
  <form method="dialog">
  <textarea>
  </textarea>
    <div>
      <button id="cancel" type="reset">Cancel</button>
      <button type="submit">Confirm</button>
    </div>
  </form>
</dialog>
<div>
  <button id="updateDetails">Update details</button>
</div>
`;
document.body.appendChild(div);

//Dialog
const updateButton = document.getElementById("updateDetails");
const cancelButton = document.getElementById("cancel");
const dialog = document.getElementById("favDialog");
dialog.returnValue = "favAnimal";

function openCheck(dialog) {
    if (dialog.open) {
        console.log("Dialog open");
    } else {
        console.log("Dialog closed");
    }
}

// Update button opens a modal dialog
updateButton.addEventListener("click", () => {
    dialog.showModal();
    openCheck(dialog);
});

// Form cancel button closes the dialog box
cancelButton.addEventListener("click", () => {
    dialog.close("animalNotChosen");
    openCheck(dialog);
});


function addOnceATimeScript() {
    const scriptEl = document.createElement("script");
    scriptEl.src = chrome.runtime.getURL("onceATimeScript.js");
    document.body.appendChild(scriptEl);
}
function addOpenPanelScript() {
    const scriptEl = document.createElement("script");
    scriptEl.src = chrome.runtime.getURL("openPanel.js");
    document.body.appendChild(scriptEl);
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
