export function htmlDecode(content) {
    let e = document.createElement('div');
    e.innerHTML = content;
    const value = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    const valueCopy = (' ' + value).slice(1);

    e.remove();

    return valueCopy;
}