import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TW } from "./tailwindMixin";

const TwLitElement = TW(LitElement);

@customElement("tooltip-box")
export class TooltipBox extends TwLitElement {
  @property() text = "";
  @property() position: "top" | "bottom" | "left" | "right" = "top";

  getPositionClasses() {
    switch (this.position) {
      case "top":
        return "bottom-full mb-2 left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-full mt-2 left-1/2 -translate-x-1/2";
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
      default:
        return "";
    }
  }

  render() {
    return html`
      <div class="relative inline-block group">
        <slot></slot>
        <div
          class="absolute z-10 text-sm bg-gray-900 text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${this.getPositionClasses()}"
        >
          ${this.text}
        </div>
      </div>
    `;
  }
}
