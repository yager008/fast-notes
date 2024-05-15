let processing = false;
const port = chrome.runtime.connectNative("ping");

// chrome.storage.local.get(["previousLinks"], (result) => {
//   let previousLinks =  []; // If the array doesn't exist, initialize it as empty
//   // Step 2: Modify the array by appending new values
//
//   // Step 3: Save the modified array back to Chrome storage
//   chrome.storage.local.set({ previousLinks : previousLinks });
// });

chrome.storage.local.set({ previousLink: 'C:/Users/Default'}).then(() => {
});

chrome.storage.local.get(["previousLink"], (result) => {
  key1value = result.previousLink;
  console.log("previous link: " + key1value);
});

//сейчас он вообще на любой месседж откуда либо вызывает нейтив апликейшн
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
//  console.log(sender);

  if (message.cmd === "popupOpened") {

    chrome.storage.local.get(["previousLinks", "previousLink"], (result) => {
      const previousLinks = result.previousLinks;
      const previousLink = result.previousLink;

      sendResponse({ value: previousLinks, previousLink: previousLink });
    });

    return true;
  }

  if(message.cmd === "executeScript") {
    port.onMessage.addListener((response) => {
      console.log("Received: " + response);
      sendResponse({ value: response });
      processing = false;
    });

    chrome.storage.local.set({ previousLink: message.body.textPath}).then(() => {
    });

    chrome.storage.local.get(["previousLinks"], (result) => {
      let previousLinks = result.previousLinks || []; // If the array doesn't exist, initialize it as empty

      // Step 2: Check if the value already exists in the array
      if (!previousLinks.includes(message.body.textPath)) {
        // If the value doesn't exist, push it to the array
        previousLinks.push(message.body.textPath);

        // Step 3: Save the modified array back to Chrome storage
        chrome.storage.local.set({ previousLinks }, () => {
          console.log('Value appended successfully');
          console.log(previousLinks);
        });
      } else {
        console.log('Value already exists in the array');
        console.log(previousLinks);
      }
    });

    //если обрабатываем приходящее от порта сообщение то дальше код не выполняем
    if (processing) return;
    console.log("hostname=" + message.hostname)
    processing = true;
    //port.postMessage(message.body.textPath + " " + message.body.fileName + " " + message.body.text);
    port.postMessage(message.body.textPath + " " + message.body.text);

    return true;
  }
});