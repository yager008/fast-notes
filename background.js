// chrome.windows.onFocusChanged.addListener((windowId) => {
//     chrome.runtime.sendMessage({cmd: "popupClosed"}).then(r =>{
//       console.log("popup closed");
//       return false;
//     });
//     return false;
// })
// ;

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
  if (response === "2") {
    chrome.runtime.sendMessage({ cmd: "noFileFound" });
    console.log("no file found");
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
  if (message.cmd === "textAreaUpdated") {
    chrome.storage.local.set({textAreaBuffer: message.body.text}).then(r =>{
      chrome.storage.local.get(["textAreaBuffer"], (result) => {
        // console.log(result.textAreaBuffer);
      });
    });
  }

  if (message.cmd === "textPathUpdated") {
    chrome.storage.local.set({textPathBuffer: message.body.text}).then(r =>{
      chrome.storage.local.get(["textPathBuffer"], (result) => {
        // console.log(result.textPathBuffer);
      });
    });
  }

  if (message.cmd === "popupOpened") {
    chrome.storage.local.get(["previousLinks", "previousLink", "textAreaBuffer", "textPathBuffer"], (result) => {
      const previousLinks = result.previousLinks;
      const previousLink = result.previousLink;
      const textAreaBuffer = result.textAreaBuffer;
      const textPathBuffer = result.textPathBuffer;

      sendResponse({ value: previousLinks, previousLink: previousLink, textAreaBuffer: textAreaBuffer, textPathBuffer: textPathBuffer});
    });

    // Return true here to indicate that sendResponse will be called asynchronously
    return true;
  }

  if (message.cmd === "updateOptionScript") {
    console.log(message.body.arrayOfOptions);

    let uniqueOptions = [...new Set(message.body.arrayOfOptions)];

    chrome.storage.local.set({ previousLinks: uniqueOptions});

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
