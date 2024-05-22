document.addEventListener('DOMContentLoaded', () => {
    const textPathContent = document.getElementById("textPathID");
    const textareavalue = document.getElementById("textareaID");
    const dropBox = document.getElementById("dropdown");
    const removeTextCheckbox= document.getElementById("checkboxID");
    const textarea = document.getElementById('myTextarea');

    textareavalue.addEventListener('input', () => {
            chrome.runtime.sendMessage({cmd: "textAreaUpdated", body: {text: textareavalue.value}}, (response) => {
        });
    });

    textPathContent.addEventListener('input', () => {
        chrome.runtime.sendMessage({cmd: "textPathUpdated", body: {text: textPathContent.value}}, (response) => {
        });
    });

    chrome.runtime.sendMessage({cmd: "popupOpened", body: {}}, (response) => {
        const El = document.getElementById("amogus");
        if (response && response.value !== undefined && Array.isArray(response.value)) {

            textareavalue.innerHTML = response.textAreaBuffer;

            El.innerHTML = response.previousLink;

            textPathContent.value = response.textPathBuffer;

            // Clear existing options in the dropdown
            dropBox.innerHTML = '';

            // Add options from the array to the dropdown
            // response.value.forEach((optionValue, index) => {
            //     const option = document.createElement('option');
            //     option.value = optionValue;
            //     option.textContent = optionValue;
            //     dropBox.appendChild(option);
            // });

            const uniqueValues = [...new Set(response.value)];

            uniqueValues.forEach((optionValue, index) => {
                const option = document.createElement('option');
                option.value = optionValue;
                option.textContent = optionValue;
                dropBox.appendChild(option);
            });

        } else {
            console.error("Error: No valid response received.");
            // Handle error, e.g., display a default message
            El.innerHTML = "Error: No valid response received.";
        }

        return true;
    });

    dropBox.addEventListener('change', function() {
        textPathContent.value = this.value;

        return true;
    });

    const removeOptionButton = document.getElementById("removeOptionButtonID");
    removeOptionButton.addEventListener('click', function() {
        const curTextValue = document.getElementById("textPathID").value;
        let select = document.getElementById("dropdown");
        let bTest = false;
        let alloptionsstring = "";

        for (let i = 0; i < select.options.length; i++) {
            alloptionsstring = alloptionsstring + " id: " + i + " " + select.options[i].value;
        }

        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === curTextValue) {
                select.remove(i);
                bTest = true;
                break;
            }
        }

        if(!bTest) {
            alert ("no found" + "curTextValue: " + curTextValue + "./select.options[0]: " + select.options[0]);
        }

        updateOptionList();
        return true;
    });

    // document.getElementById('removeOptionButton').addEventListener('click', function() {
    //     const curTextValue = document.getElementById("textPathID").value;
    //     let select = document.getElementById("dropdown");
    //     let bTest = false;
    //
    //     for (let i = 0; i < select.options.length; i++) {
    //         if (select.options[i].value === curTextValue) {
    //             select.remove(i);
    //             bTest = true;
    //             break;
    //         }
    //     }
    //
    //     if (!bTest) {
    //         alert("not found");
    //     }
    // });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.cmd === "animationSuccess") {
            const loaderRef = document.getElementById("loaderID");
            success(loaderRef);
            if (removeTextCheckbox.checked) {
                textareavalue.value = '';
            }
        }
        if (message.cmd === "animationFail") {
            const loaderRef = document.getElementById("loaderID");
            fail(loaderRef);
        }
        return true;
    });
});
