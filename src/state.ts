import { save, load } from "./storage"
import { Notification } from "./notifications"
import { ModalState } from "./modal"

const notificationsUpdated = new Event("notificationsUpdated")
const menuUpdated = new Event("menuUpdated")
const modalUpdated = new Event("modalUpdated")

export const state = {
    textbox: {
        key: "textbox",
        value: () => {
            return load(state.textbox.key) || ""
        },
    },
    menu: {
        visible: false,
    },
    notifications: [] as Notification[],
    modal: "hidden" as ModalState
}


export const actions = {
    setTextbox: (textbox: HTMLTextAreaElement) => {
        save(state.textbox.key, textbox.value)
    },
    toggleMenu: () => {
        state.menu.visible = !state.menu.visible
        document.dispatchEvent(menuUpdated)
    },
    pushNotification: (text: string, type: "success" | "error", timeout?: number) => {
        const notification = new Notification(text, type)
        state.notifications.push(notification)
        document.dispatchEvent(notificationsUpdated)
        if (timeout) setTimeout(() => actions.popNotification(notification.id), timeout)
    },
    popNotification: (id: string) => {
        state.notifications = state.notifications.filter(notification => notification.id !== id)
        document.dispatchEvent(notificationsUpdated)
    },
    setModalState: (modalState: ModalState) => {
        state.modal = modalState
        document.dispatchEvent(modalUpdated)
    }
}

export type State = typeof state
export type Actions = typeof actions