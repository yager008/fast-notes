//
// const textPathContent = document.getElementById("textPathID");
// const dropBox = document.getElementById("dropdown");
//
// chrome.runtime.sendMessage({cmd: "popupOpened", body: {}}, (response) => {
//     const El = document.getElementById("amogus");
//     if (response && response.value !== undefined) {
//         El.innerHTML = response.value;
//         console.log(response.value);
//         textPathContent.value = response.value;
//         dropBox.
//     } else {
//         console.error("Error: No valid response received.");
//         // Handle error, e.g., display a default message
//         El.innerHTML = "Error: No valid response received.";
//     }
// });
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
});
dropBox.addEventListener('change', function() {
    textPathContent.value = this.value;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.cmd === "animationSuccess") {
        alert('success');
    }
    if (message.cmd === "animationFail") {
        alert('fail');
    }
});