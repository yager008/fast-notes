const dialog = document.getElementById("favDialog");
const yesButton= document.getElementById("no");
const noButton= document.getElementById("yes");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.cmd === "noFileFound") {
        dialog.showModal()
    }
});

noButton.addEventListener("click", () => {
    dialog.close("");
});
yesButton.addEventListener("click", () => {
    dialog.close("");
    chrome.runtime.sendMessage({cmd: "executeScript", body: {text: formattedStr, textPath: formattedTextPathValue, arrayOfOptions: arrayOfOptions}}, () => {
        // Your callback code here
    });

});
