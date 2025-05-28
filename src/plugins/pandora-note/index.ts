import { TW } from "@/shared/tailwindMixin";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

const TwLitElement = TW(LitElement);

@customElement("pandora-note")
export class PandoraNote extends TwLitElement {
  @property() note = "";

  protected render() {
    return html`<p class="max-w-96 overflow-scroll">${this.note}</p>`;
  }
}
