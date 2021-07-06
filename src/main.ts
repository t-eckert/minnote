import './style.css'
import { MenuState } from "./types"

// Page hooks
const textbox = document.getElementById("textbox") as HTMLTextAreaElement | null
const copy = document.getElementById("copy") as HTMLButtonElement
const menu = document.getElementById("menu")
const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement | null
const storage = window.localStorage

// State
const key = "textbox"
let menuState: MenuState = "closed"

// Actions
const saveToStorage = (key: string, text: string) => {
  storage.setItem(key, text)
}

const loadFromStorage = (key: string): string | null => {
  return storage.getItem(key)
}

const copyToClipboard = (text: string) => {
  // Handle IE
  if (!navigator.clipboard) {
    copyToClipboardFallback(text);
    return;
  }

  navigator.clipboard.writeText(text).then(function () {
  }, function (_) {
  });
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

const toggleMenu = () => {
  if (menu && menuState === "closed") {
    menu.hidden = false
    menuState = "opened"
  } else if (menu && menuState === "opened") {
    menu.hidden = true
    menuState = "closed"
  }
}

const save = (textbox: HTMLTextAreaElement) => {
  saveToStorage(key, textbox.value)
}

const load = (textbox: HTMLTextAreaElement) => {
  textbox.value = loadFromStorage(key) || ""
}

// Bindings
if (textbox) {
  textbox.value = loadFromStorage(key) || ""
  textbox.onkeyup = () => save(textbox)
  window.onstorage = () => load(textbox)
}

if (copy && textbox) {
  copy.onclick = () => copyToClipboard(textbox.value)
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu)
}