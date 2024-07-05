document.addEventListener('DOMContentLoaded', () => {
    const textPathContent = document.getElementById("textPathID");
    const textareavalue = document.getElementById("textareaID");
    const dropBox = document.getElementById("dropdown");
    const removeTextCheckbox= document.getElementById("checkboxID");

    textareavalue.addEventListener('input', () => {
            chrome.runtime.sendMessage({cmd: "textAreaUpdated", body: {text: textareavalue.value}}, (response) => {
        });
    });

    textPathContent.addEventListener('input', () => {
        chrome.runtime.sendMessage({cmd: "textPathUpdated", body: {text: textPathContent.value}}, (response) => {
        });
    });

    chrome.runtime.sendMessage({cmd: "popupOpened", body: {}}, (response) => {
        const El = document.getElementById("modifiedDiv");
        if (response && response.value !== undefined && Array.isArray(response.value)) {

            textareavalue.innerHTML = response.textAreaBuffer;

            El.innerHTML = response.previousLink;

            textPathContent.value = response.textPathBuffer;

            dropBox.innerHTML = '';

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
        const textPath = document.getElementById("textPathID");
        let select = document.getElementById("dropdown");
        const selectedOptionText = select.options[select.selectedIndex].text;
        //alert(selectedOptionText);

        let bTest = false;
        let alloptionsstring = "";

        // alert("options length: " + select.options.length);

        for (let i = 0; i < select.options.length; i++) {
            alloptionsstring = alloptionsstring + " id: " + i + " " + select.options[i].value;
        }

        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === selectedOptionText) {
                select.remove(i);
                bTest = true;
                break;
            }
        }

        if(!bTest) {
            // alert ("no found" + "curTextValue: " + selectedOptionText + "./select.options[0]: " + select.options[0]);
        }

        updateOptionList();

        textPath.value = select.options[select.selectedIndex].text;

        return true;
    });

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
