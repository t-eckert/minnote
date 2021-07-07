import { State, Actions } from "./state"

export const registerTextbox = (textbox: HTMLTextAreaElement, state: State, actions: Actions) => {
    textbox.value = state.textbox.value()
    textbox.onkeyup = () => actions.setTextbox(textbox)
    window.onstorage = () => {
        textbox.value = state.textbox.value()
    }
}
