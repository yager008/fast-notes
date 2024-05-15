
function addLoader() {
    let span = document.createElement('span');
    span.className = 'loader';
    document.body.appendChild(span);

    setTimeout(() => removeLoader(span), 2000);
}

function removeLoader(span) {
    if (span && span.parentNode) {
        span.parentNode.removeChild(span);
    }
}

const loader = document.querySelector('.loader');

function fail() {
    loader.classList.add('fail');
}
function success() {
    loader.classList.add('success');
}

function reset() {
    loader.classList.remove('fail')
}

