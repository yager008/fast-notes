function extractOptions(selectId) {
    let select = document.getElementById(selectId);
    let options = [];

    for (let i = 0; i < select.options.length; i++) {
        options.push([select.options[i].value]);
    }

    console.log(options); // Output the options array
    return options; // Optionally, you can return the options array
}

const button = document.getElementById("buttonID");
const textarea = document.getElementById("textareaID");
//const file = document.getElementById("fileID");
const textPath = document.getElementById("textPathID");
const updateButton = document.getElementById("updateOptionListButtonID")
const dropBoxDown= document.getElementById("dropdown")



button.addEventListener("click", () => {
    const arrayOfOptions = extractOptions("dropdown");
    addLoader()
    const str = textarea.value;
    const newStr = str.replace(/\n/g, ' ');


    if (textarea.value !== "") {
        chrome.runtime.sendMessage({cmd: "executeScript", body: {text: newStr, textPath: textPath.value, arrayOfOptions: arrayOfOptions}}, () => {
            // Your callback code here
        });
    }
    else {
        alert('nothing to send');
    }

    const option = document.createElement('option');
    option.value = textPath.value;
    option.textContent = textPath.value;

    let bOptionExist = false;
    const allOptions = document.getElementsByTagName("option")
    for (let i = 0; i < allOptions.length; i++) {
        if (allOptions[i].value === option.value) {
            bOptionExist = true;
        }
    }

    if(!bOptionExist) {
        dropBoxDown.appendChild(option);
        alert("option added");
    }

});
updateButton.addEventListener("click", () => {
    const arrayOfOptions = extractOptions("dropdown");
    addLoader();
    const str = textarea.value;
    const newStr = str.replace(/\n/g, ' ');
    chrome.runtime.sendMessage({cmd: "updateOptionScript", body: {text: newStr, textPath: textPath.value, arrayOfOptions: arrayOfOptions}}, () => {
        // Your callback code here
    });
});
