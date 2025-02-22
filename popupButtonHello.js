function extractOptions(selectId) {
    let select = document.getElementById(selectId);
    let options = [];

    for (let i = 0; i < select.options.length; i++) {
        options.push([select.options[i].value]);
    }

    console.log(options); // Output the options array
    return options; // Optionally, you can return the options array
}

function sendDataToBackground(bCreateFileIfNotExist) {
    let sCreateFileIfNotExist;

    if (bCreateFileIfNotExist) {
        sCreateFileIfNotExist = "true ";
    }
    else
    {
        sCreateFileIfNotExist = "false ";
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
    const formattedDate = `${year}-${month}-${day}`;
    const arrayOfOptions = extractOptions("dropdown");

    addLoader();
    const str = sCreateFileIfNotExist + textarea.value;
    let formattedStr = str.replace(/\r?\n/g, '\\n');
    const textPathValue = textPath.value;

    const sendMessage = (formattedTextPathValue) => {
        if (textarea.value !== "") {
            chrome.runtime.sendMessage({ cmd: "executeScript", body: { text: formattedStr, textPath: formattedTextPathValue, arrayOfOptions: arrayOfOptions } }, () => {
                // Your callback code here
            });
        } else {
            alert('nothing to send');
        }

        const option = document.createElement('option');
        option.value = textPath.value;
        option.textContent = textPath.value;

        let bOptionExist = false;
        const allOptions = document.getElementsByTagName("option");

        for (let i = 0; i < allOptions.length; i++) {
            if (allOptions[i].value === option.value) {
                bOptionExist = true;
            }
        }

        if (!bOptionExist) {
            dropBoxDown.appendChild(option);

            setSelectedValue(dropBoxDown, textPath.value);

            function setSelectedValue(selectObj, valueToSet) {
                for (let i = 0; i < selectObj.options.length; i++) {
                    if (dropBoxDown.options[i].text === valueToSet) {
                        selectObj.options[i].selected = true;
                        return;
                    }
                }
            }

            // alert("option added");
        }
    };

    if (textPathValue.includes("{hostname}")) {
        getCurrentTabUrl(function (url) {
            let fullURL = new URL(url);
            let siteName = fullURL.hostname;
            let formattedTextPathValue = textPathValue.replace("{hostname}", siteName);
            alert(formattedTextPathValue);
            sendMessage(formattedTextPathValue);
        });
    } else {
        let formattedTextPathValue = textPathValue.replace("{today}", formattedDate);
        sendMessage(formattedTextPathValue);
    }
}

const button = document.getElementById("buttonID");
const textarea = document.getElementById("textareaID");
const textPath = document.getElementById("textPathID");
// const updateButton = document.getElementById("updateOptionListButtonID");
const dropBoxDown = document.getElementById("dropdown");
const deleteOptionsButton = document.getElementById("deleteOptionListButtonID");

button.addEventListener("click", () => sendDataToBackground( false));

function updateOptionList() {

    const arrayOfOptions = extractOptions("dropdown");
    addLoader();
    const str = textarea.value;
    const newStr = str.replace(/\n/g, ' ');

    const uniqueValues = [...new Set(arrayOfOptions)];

    chrome.runtime.sendMessage({ cmd: "updateOptionScript", body: { text: newStr, textPath: textPath.value, arrayOfOptions: uniqueValues} }, () => {
        // Your callback code here
    });

}

deleteOptionsButton.addEventListener("click", () => {
    alert('hello worlds');
    chrome.runtime.sendMessage({ cmd: "updateOptionScript", body: {arrayOfOptions: [""]} }, () => {
        // Your callback code here
    });
    while (dropBoxDown.options.length > 0) {
        dropBoxDown.remove(0);
    }
});

