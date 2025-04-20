export function showMessage(message) {
    let messageBox = document.getElementById("messageBox");
    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.id = "messageBox";
        document.body.appendChild(messageBox);
    }
    messageBox.textContent = message;
    setTimeout(() => messageBox.remove(), 3000);
}