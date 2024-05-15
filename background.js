let processing = false;
const port = chrome.runtime.connectNative("ping");

// Function to handle response from the native application
function handleResponse(response) {
  console.log("Received: " + response);

  if (response === "0") {
    chrome.runtime.sendMessage({ cmd: "animationSuccess" });
    console.log("success");
  }

  if (response === "1") {
    chrome.runtime.sendMessage({ cmd: "animationFail" });
    console.log("fail");
  }

  processing = false;
}

// Add listener for messages from the native application
port.onMessage.addListener(handleResponse);

chrome.storage.local.set({ previousLink: 'C:/Users/Default' });

chrome.storage.local.get(["previousLink"], (result) => {
  key1value = result.previousLink;
  console.log("previous link: " + key1value);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);

  if (message.cmd === "popupOpened") {
    chrome.storage.local.get(["previousLinks", "previousLink"], (result) => {
      const previousLinks = result.previousLinks;
      const previousLink = result.previousLink;

      sendResponse({ value: previousLinks, previousLink: previousLink });
    });

    return true;
  }

  if (message.cmd === "executeScript") {
    if (processing) return;

    processing = true;

    chrome.storage.local.set({ previousLink: message.body.textPath });

    chrome.storage.local.get(["previousLinks"], (result) => {
      let previousLinks = result.previousLinks || [];

      if (!previousLinks.includes(message.body.textPath)) {
        previousLinks.push(message.body.textPath);

        chrome.storage.local.set({ previousLinks }, () => {
          console.log('Value appended successfully');
          console.log(previousLinks);
        });
      } else {
        console.log('Value already exists in the array');
        console.log(previousLinks);
      }
    });

    console.log("hostname=" + message.hostname)
    port.postMessage(message.body.textPath + " " + message.body.text);

    return true;
  }
});
