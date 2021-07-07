import { State, Actions } from "./state"

export const registerMenu = (menu: HTMLElement, state: State) => {
    document.addEventListener("menuUpdated", () => {
        if (state.menu.visible) {
            menu.classList.remove("hidden")
            menu.hidden = false
        } else {
            menu.classList.add("hidden")
            menu.hidden = true
        }
    })
}

export const registerMenuToggle = (menuToggle: HTMLButtonElement, actions: Actions) => {
    menuToggle.onclick = actions.toggleMenu
}