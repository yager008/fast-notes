const button = document.getElementById("buttonID");
const textarea= document.getElementById("textareaID");

button.addEventListener("click", () => {
    const str = textarea.value;
    const newStr = str.replace(/\n/g, ' ');
    alert(newStr);
    chrome.runtime.sendMessage({cmd: "executeScript", body: newStr}, () => {
        // Your callback code here
    });
});