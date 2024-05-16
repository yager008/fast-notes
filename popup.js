const textPathContent = document.getElementById("textPathID");
const dropBox = document.getElementById("dropdown");

chrome.runtime.sendMessage({cmd: "popupOpened", body: {}}, (response) => {
    const El = document.getElementById("amogus");
    if (response && response.value !== undefined && Array.isArray(response.value)) {
        El.innerHTML = response.previousLink;

        textPathContent.value = response.previousLink;

        // Clear existing options in the dropdown
        dropBox.innerHTML = '';

        // Add options from the array to the dropdown
        response.value.forEach((optionValue, index) => {
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
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === curTextValue) {
            select.remove(i);
            break;
        }
    }
    return true;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.cmd === "animationSuccess") {
        const loaderRef = document.getElementById("loaderID");
        success(loaderRef);
    }
    if (message.cmd === "animationFail") {
        const loaderRef = document.getElementById("loaderID");
        fail(loaderRef);
    }
    return true;
});
