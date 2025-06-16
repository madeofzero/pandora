import { createPlugin } from "@/web/api/plugins-api";
import { PANDORA_EVENTS } from "@/web/types/pandora-event.type";
import { PandoraPluginType } from "@/web/types/pandora-plugin.type";
import { PandoraState } from "@/web/utils/state";
import { TwLitElement } from "@/web/utils/tailwindMixin";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("pandora-link")
export class PandoraLink extends TwLitElement {
  @property() link: string | undefined = undefined;

  connectedCallback(): void {
    super.connectedCallback();
    // If link exists open it directly
    this.openLink();
  }

  private openLink(): void {
    if (this.link) window.open(this.link, "_blank");
  }

  private async handleOnCreateLinkClick() {
    const link = prompt("Enter the link you want to create") ?? "";

    // TODO: check if is link using Regex
    if (link) {
      const data = {
        property: PandoraState.get().siteId,
        type: "pandora-link",
        attributes: {
          element: "<pandora-link></pandora-link>",
          link: link,
        },
      };

      const result = await createPlugin(data);

      document.dispatchEvent(
        new CustomEvent(PANDORA_EVENTS.plugin.register, {
          detail: result,
          bubbles: true,
        })
      );
    }
  }

  static Icon(plugin: PandoraPluginType) {
    return `<img src="https://www.google.com/s2/favicons?domain_url=${plugin.link}"></img>`;
  }

  render() {
    // If link DOES NOT exists
    if (!this.link) {
      return html`<svg
        xmlns="http://www.w3.org/2000/svg"
        @click="${this.handleOnCreateLinkClick}"
        class="size-6 cursor-pointer"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path
          d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM144.56,173.66l-21.45,21.45a44,44,0,0,1-62.22-62.22l21.45-21.46a8,8,0,0,1,11.32,11.31L72.2,144.2a28,28,0,0,0,39.6,39.6l21.45-21.46a8,8,0,0,1,11.31,11.32Zm-34.9-16a8,8,0,0,1-11.32-11.32l48-48a8,8,0,0,1,11.32,11.32Zm85.45-34.55-21.45,21.45a8,8,0,0,1-11.32-11.31L183.8,111.8a28,28,0,0,0-39.6-39.6L122.74,93.66a8,8,0,0,1-11.31-11.32l21.46-21.45a44,44,0,0,1,62.22,62.22Z"
        ></path>
      </svg>`;
    }

    return html`<div>
      <span @click="${this.openLink}" class="cursor-pointer hover:underline"
        >Open Link</span
      >
    </div>`;
  }
}
