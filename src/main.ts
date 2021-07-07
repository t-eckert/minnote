import './style.css'
import { registerTextbox } from "./textbox"
import { registerMenu, registerMenuToggle } from "./menu"
import { registerCopyButton } from "./clipboard"
import { state, actions } from "./state"
import { registerNotifications } from './notifications'

// Page hooks
const textbox = document.getElementById("textbox") as HTMLTextAreaElement | null
const copyButton = document.getElementById("copy-button") as HTMLButtonElement
const notificationSection = document.getElementById("notification-section") as HTMLDivElement | null
const menu = document.getElementById("menu")
const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement | null

// Register hooks
if (textbox) registerTextbox(textbox, state, actions)
if (copyButton) registerCopyButton(copyButton, state, actions)
if (notificationSection) registerNotifications(notificationSection, state, actions)
if (menu) registerMenu(menu, state)
if (menuToggle) registerMenuToggle(menuToggle, actions)