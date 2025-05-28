import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("pandora-link")
export class PandoraLink extends LitElement {
  @property() link = "";

  connectedCallback(): void {
    window.open(this.link, "_blank");
  }

  protected render() {
    return html`<p>${this.link}</p>`;
  }
}
