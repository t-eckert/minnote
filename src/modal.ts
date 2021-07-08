import { State, Actions } from "./state";

export type ModalState = "hidden" | "about"

const AboutModal: string =
    `<section id="modal">
    <header>
        <h1>About</h1>
        <button id="close-modal" class="token-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
    </header>
    <p>
        Minnote is a browser-based text editor that aims to provide a scratch pad for jotting down loose notes.
        All text is saved in the browser's <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="blank_" rel="noopener noreferrer">
        localStorage</a>. I was inspired to build it by this tweet from David Pierce:
    </p>
    <blockquote class="twitter-tweet">
        <p lang="en" dir="ltr">
            I really want there to be an app that&#39;s basically just a blank text box in my browser. Open a tab, type, copy and
            paste somewhere else, close the tab, move on.<br><br>
            Does this exist? Is this the worst idea ever?
        </p>
        &mdash; David Pierce (<a href="https://twitter.com/pierce" target="blank_" rel="noopener noreferrer">@pierce</a>) <a href="https://twitter.com/pierce/status/1409519886716506115?ref_src=twsrc%5Etfw" target="blank_" rel="noopener noreferrer">June 28, 2021</a>
    </blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    <p>
        I did not think it was the worst idea ever, so I made it. I have some ideas of how to improve this over time and I welcome tons of feedback.
        The <a href="https://github.com/t-eckert/minnote" target="blank_" rel="noopener noreferrer">code</a> is also open source and I'm happy to
        accept improvements. If you have an issue, but aren't able to fix it, feel free to
        <a href="http://github.com/t-eckert/minnote/issues" target="_blank" rel="noopener noreferrer">create an issue</a>
        or <a href="https://github.com/t-eckert/minnote/discussions" target="_blank" rel="noopener noreferrer">start a discussion</a>.
    </p>
    <p>
        My name is Thomas Eckert. You can learn more about me on <a href="https://thomaseckert.dev/" target="blank_" rel="noopener noreferrer">my website</a>.
    </p>
</section>`


const ModalHtml = (modalState: ModalState) => {
    return modalState === "hidden"
        ? ""
        : AboutModal
}

export const registerModal = (modalSection: HTMLDivElement, state: State, actions: Actions) => {
    document.addEventListener("modalUpdated", () => {
        modalSection.innerHTML = ModalHtml(state.modal)
        if (state.modal !== "hidden") {
            modalSection.classList.remove("hidden")
            modalSection.classList.add("visible")
            modalSection.hidden = false
            const closeModal = document.getElementById("close-modal")
            if (closeModal) closeModal.onclick = () => {
                actions.setModalState("hidden")
            }
        } else {
            modalSection.classList.remove("visible")
            modalSection.classList.add("hidden")
            modalSection.hidden = true
        }
    })
}

export const registerModalToggles = (modalToggles: HTMLElement[], actions: Actions) => {
    modalToggles.forEach(modalToggle => modalToggle.onclick = () => actions.setModalState(modalToggle.id as ModalState))
}