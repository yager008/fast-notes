const elmHostName = document.getElementById("hostname");
const elmResult = document.getElementById("result");

const updateButton = document.getElementById("updateDetails");
const cancelButton = document.getElementById("cancel");
const dialog = document.getElementById("favDialog");
dialog.returnValue = "favAnimal";
dialog.showModal();

const getHostName = (url) => {
  return new URL(url).hostname;
}


// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   const hostname = getHostName(tabs[0].url);
//   elmHostName.innerText = hostname;
//
//   chrome.runtime.sendMessage({ hostname: hostname }, (response) => {
// //   elmResult.innerText = response.value;
//   });
// });
// // ;
