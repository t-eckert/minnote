import { State, Actions } from "./state"

export class Notification {
    id: string
    text: string
    type: "success" | "error"

    constructor(text: string, type: "success" | "error") {
        // Generate a unique `id` for the notification
        this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })

        this.text = text
        this.type = type
    }

    toHtml(): string {
        const icon = this.type === "success"
            ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`

        return `<div class="notification">
    <div>${icon}</div>
    <p>${this.text}</p>
</div>`
    }
}

export const registerNotifications = (notificationSection: HTMLDivElement, state: State, _: Actions) => {
    document.addEventListener("notificationsUpdated", () => {
        notificationSection.innerHTML = state.notifications.map(notification => notification.toHtml()).join("")
    })
}
