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
//addOnceATimeScript();

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

function sendMessageToBackground(message) {
    chrome.runtime.sendMessage({type: "youtube_time_request", data: message});
}

function getCurrentVideoTime() {
    const video = document.querySelector('video');
    if (video) {
        const currentTime = video.currentTime;
        sendMessageToBackground(currentTime);
        }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.cmd === "getVideoURL") {
        const video = document.querySelector('video');

        let currentTime = 0;

        if (video) {
            currentTime = video.currentTime;
            const roundedTime= video.currentTime;
            sendResponse({body: roundedTime});
        }
        else {
            sendResponse({body: 'no video found'});
        }


    }
    return true;
});
