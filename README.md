# Minnote

A small, local text editor for the web.

### Clone repo and run locally with yarn

```bash
git clone https://github.com/t-eckert/minnote.git
cd minnote
yarn
yarn dev
```

This will tell [Vite](https://vitejs.dev/) to run the project and serve it to `localhost:3000`.

```
  > Local: http://localhost:3000/
  > Network: use `--host` to expose
```

### Run locally with npm instead of yarn

```bash
npm i
npm run dev
```

## Page hooks

The application is separated into hooks for:
* Entering text with `textbox`
* Copying text to the clipboard with `copy`
* Toggling the `menu` with `menuToggle`
* Saving the text to `localStorage` with `storage`

```ts
const textbox = document.getElementById("textbox") as HTMLTextAreaElement | null
const copy = document.getElementById("copy") as HTMLButtonElement
const menu = document.getElementById("menu")
const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement | null
const storage = window.localStorage
```

## State

The initial state of the menu is set to `closed`.

```ts
const key = "textbox"
let menuState: MenuState = "closed"
```

## Actions

Actions include:
* Handling storage with `saveToStorage`, `loadFromStorage`, `save`, and `load`
* Handling the clipboard with `copyToClipboard` and `copyToClipboardFallback`
* Handling menu state with `toggleMenu`

### Storage actions

```ts
const saveToStorage = (key: string, text: string) => {
  storage.setItem(key, text)
}

const loadFromStorage = (key: string): string | null => {
  return storage.getItem(key)
}

const save = (textbox: HTMLTextAreaElement) => {
  saveToStorage(key, textbox.value)
}

const load = (textbox: HTMLTextAreaElement) => {
  textbox.value = loadFromStorage(key) || ""
}
```

### Clipboard actions

```ts
const copyToClipboard = (text: string) => {
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
```

### Menu action

```ts
const toggleMenu = () => {
  if (menu && menuState === "closed") {
    menu.hidden = false
    menuState = "opened"
  } else if (menu && menuState === "opened") {
    menu.hidden = true
    menuState = "closed"
  }
}
```