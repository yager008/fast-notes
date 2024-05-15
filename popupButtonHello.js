const button = document.getElementById("buttonID");
const textarea= document.getElementById("textareaID");
//const file = document.getElementById("fileID");
const textPath= document.getElementById("textPathID");

button.addEventListener("click", () => {
    const str = textarea.value;
    const newStr = str.replace(/\n/g, ' ');
    chrome.runtime.sendMessage({cmd: "executeScript", body: {text: newStr, textPath: textPath.value}}, () => {
        // Your callback code here
    });
});