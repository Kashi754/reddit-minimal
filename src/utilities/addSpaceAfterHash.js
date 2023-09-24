export function addSpaceAfterHash(text) {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "#" && text[i + 1] !== "#" && text[i - 1] !== " ") {
            newText += "# ";
        } else {
            newText += text[i];
        }
    }
    return newText;
}