let processing = false;
const port = chrome.runtime.connectNative("ping");

//сейчас он вообще на любой месседж откуда либо вызывает нейтив апликейшн
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
//  console.log(sender);

  if(message.cmd === "executeScript") {
    port.onMessage.addListener((response) => {
      console.log("Received: " + response);
      sendResponse({ value: response });
      processing = false;
    });

    //если обрабатываем приходящее от порта сообщение то дальше код не выполняем
    if (processing) return;
    console.log("hostname=" + message.hostname)
    processing = true;
    port.postMessage(message.body.textPath + " " + message.body.fileName + " " + message.body.text);

    return true;
  }
});