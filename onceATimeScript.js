function displayDialog() {
    // Your code here
    const dialog = document.getElementById("favDialog");
    dialog.showModal();
} displayDialog();


function addOverlay() {
    // Create a new div for overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    // Style the overlay
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.color = '#fd0000';
    overlay.style.fontSize = '2em';

    const innerText= document.createElement('div');
    innerText.style.position = 'relative';
    innerText.style.top = '-100px';
    innerText.style.left = '0';
    innerText.innerHTML = 'HELLO WORLD'
    innerText.id = 'innerTextID';

    overlay.appendChild(innerText);

    // Add content to the overlay

    // Append the overlay to the body
    document.body.appendChild(overlay);
} addOverlay();

let time = 10;
function displayTimer() {
    time -= 0.1;
    time = Math.round(time * 100) / 100;


    if (time < 0) {
        time = 10;
    }
    const innerText = document.getElementById("innerTextID");
    innerText.innerHTML = time.toString();
}

setInterval(displayTimer, 100);