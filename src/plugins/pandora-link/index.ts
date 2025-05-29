import { TW } from "@/utils/tailwindMixin";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

const TwLitElement = TW(LitElement);

@customElement("pandora-link")
export class PandoraLink extends TwLitElement {
  @property() link = "";

  connectedCallback(): void {
    window.open(this.link, "_blank");
  }

  protected render() {
    return html`<p>${this.link}</p>`;
  }
}
