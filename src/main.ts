import './style.css'
import { state, actions } from "./state"
import { registerTextbox } from "./textbox"
import { registerMenu, registerMenuToggle } from "./menu"
import { registerCopyButton } from "./clipboard"
import { registerNotifications } from './notifications'
import { registerModal, registerModalToggles } from "./modal"

// Page hooks
const textbox = document.getElementById("textbox") as HTMLTextAreaElement | null
const copyButton = document.getElementById("copy-button") as HTMLButtonElement
const notificationSection = document.getElementById("notification-section") as HTMLDivElement | null
const menu = document.getElementById("menu")
const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement | null
const modalSection = document.getElementById("modal-section") as HTMLDivElement | null
const modalToggles = Array.from(document.getElementsByClassName("modal-toggle")) as HTMLElement[]

// Register hooks
if (textbox) registerTextbox(textbox, state, actions)
if (copyButton) registerCopyButton(copyButton, state, actions)
if (notificationSection) registerNotifications(notificationSection, state, actions)
if (menu) registerMenu(menu, state)
if (menuToggle) registerMenuToggle(menuToggle, actions)
if (modalSection) registerModal(modalSection, state, actions)
if (modalToggles) registerModalToggles(modalToggles, actions)
