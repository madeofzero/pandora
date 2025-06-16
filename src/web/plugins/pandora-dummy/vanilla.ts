import { PANDORA_ELEMENT_IDENTIFIER } from "@/web/types/pandora-plugin.type";
import { log } from "@/web/utils/logger";

function clickable() {
  alert("Button clicked inside Dummy Plugin!");
  // You can run any script here
}

// Register the plugin directly using the static method
customElements.whenDefined(PANDORA_ELEMENT_IDENTIFIER).then(() => {
  (customElements.get(PANDORA_ELEMENT_IDENTIFIER) as any).registerPlugin({
    id: "pandora-dummy2",
    type: "pandora-dummy2",
    icon: `✅`,
    label: "Dummy Plugin",
    element: `<button id="123" class="text-white">Click me</button>`,
    hooks: {
      onReady: () => log("Pandora Dummy is initialized!"),
      onMount: (container: Element) => {
        const button = container;
        if (button) {
          button.addEventListener("click", clickable);
        }
      },
      onUnmount: (container: Element) => {
        container.removeEventListener("click", clickable);
        log("Pandora Dummy is destroyed");
      },
    },
  });
});
