import { State, Actions } from "./state"

const copyToClipboard = async (text: string): Promise<boolean> => {
    // Handle IE
    if (!navigator.clipboard) {
        copyToClipboardFallback(text)
        return true
    }

    try {
        await navigator.clipboard.writeText(text)
        return true
    }
    catch {
        return false
    }
}

const copyToClipboardFallback = (text: string) => {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    }
    finally {
        document.body.removeChild(textArea);
    }
}

export const registerCopyButton = (copyButton: HTMLButtonElement, state: State, actions: Actions) => {
    copyButton.onclick = () => {
        copyToClipboard(state.textbox.value()).then(
            (isSuccess: boolean) => {
                if (isSuccess)
                    actions.pushNotification("Copied to clipboard!", "success", 2000)
                else
                    actions.pushNotification("Could not copy to clipboard.", "error", 2000)
            }
        )
    }
}