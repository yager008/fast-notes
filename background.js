chrome.windows.onFocusChanged.addListener((windowId) => {
    chrome.runtime.sendMessage({cmd: "popupClosed"}).then(r =>{
      console.log("popup closed");
      return false;
    });
    return false;
});


let processing = false;
const port = chrome.runtime.connectNative("ping");

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

  return true;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);

  if (message.cmd === "popupOpened") {
    chrome.storage.local.get(["previousLinks", "previousLink"], (result) => {
      const previousLinks = result.previousLinks;
      const previousLink = result.previousLink;

      sendResponse({ value: previousLinks, previousLink: previousLink });
    });

    // Return true here to indicate that sendResponse will be called asynchronously
    return true;
  }

  if (message.cmd === "updateOptionScript") {
    console.log(message.body.arrayOfOptions);
    console.log("shlepa");

    chrome.storage.local.set({ previousLinks: message.body.arrayOfOptions});

    // Return true here to indicate that sendResponse will be called asynchronously
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

      sendResponse(true);
    });

    console.log("hostname=" + message.hostname)
    port.postMessage(message.body.textPath + " " + message.body.text);

    return true;
  }
});
