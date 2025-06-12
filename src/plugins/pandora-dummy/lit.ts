import { TwLitElement } from "@/utils/tailwindMixin";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { log } from "@/utils/logger";
import { PANDORA_ELEMENT_IDENTIFIER } from "@/types/pandora-plugin.type";

@customElement("pandora-dummy")
export class PandoraDummyLit extends TwLitElement {
  static Icon() {
    // Be sure to update this icon for your component for parent to use
    return `<svg viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0.5V11.5C0 11.6818 0.0986384 11.8492 0.257616 11.9373C0.416593 12.0254 0.610865 12.0203 0.765 11.924L4.5 9.58962L8.235 11.924C8.38914 12.0203 8.58341 12.0254 8.74238 11.9373C8.90136 11.8492 9 11.6818 9 11.5V0.5C9 0.223858 8.77614 0 8.5 0H0.5C0.223858 0 0 0.223858 0 0.5Z" fill="currentColor"/></svg>`;
  }

  render() {
    return html` <p class="text-white">Add all the logic you want here..</p> `;
  }
}

// Register the plugin directly using the static method
customElements.whenDefined(PANDORA_ELEMENT_IDENTIFIER).then(() => {
  (customElements.get(PANDORA_ELEMENT_IDENTIFIER) as any).registerPlugin({
    id: "pandora-dummy",
    type: "pandora-dummy",
    label: "Dummy Plugin",
    element: "<pandora-dummy></pandora-dummy>",
    hooks: {
      onReady: () => log("Pandora Dummy is initialized!"),
      onMount: (el: Element) => log("Pandora Dummy is mounted!"),
      onUnmount: (element: Element) => log("Pandora Dummy is destroyed"),
    },
  });
});
