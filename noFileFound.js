const dialog = document.getElementById("favDialog");
const yesButton= document.getElementById("yes");
const noButton= document.getElementById("no");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.cmd === "noFileFound") {
        dialog.showModal()
    }
});
noButton.addEventListener("click", () => {
    dialog.close("");
    fail();
});
yesButton.addEventListener("click", () => {
    sendDataToBackground(true);
    dialog.close("");
});