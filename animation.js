function addLoader() {
    let span = document.createElement('span');
    span.className = 'loader';
    span.id = 'loaderID';
    document.body.appendChild(span);
    setTimeout(() => removeLoader(span), 800);
    return span;
}

function removeLoader(span) {
    if (span && span.parentNode) {
        span.parentNode.removeChild(span);
    }
}

function fail(loader) {
    loader.classList.add('fail');
    setTimeout(() => removeLoader(loader), 800);
}

function success(loader) {
    loader.classList.add('success');
    setTimeout(() => removeLoader(loader), 800);
}

function reset(loader) {
    loader.classList.remove('fail');
    loader.classList.remove('success');
}
