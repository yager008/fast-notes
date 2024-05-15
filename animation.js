
function addLoader() {
    let span = document.createElement('span');
    span.className = 'loader';
    document.body.appendChild(span);

    setTimeout(() => fail(), 2000);
} addLoader()

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

