import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { TW } from "./shared/tailwindMixin";
import "./shared/app-logo";
import "./shared/tooltip-box";

type PandoraPluginType = {
  id: string;
  label: string;
  component: string;
  icon: string;
};

const TwLitElement = TW(LitElement);

@customElement("pandora-box")
export class PandorasBox extends TwLitElement {
  @state() activePlugin: PandoraPluginType | null = null;
  static plugins: Array<PandoraPluginType> = [];

  static registerPlugin(plugin: PandoraPluginType) {
    PandorasBox.plugins.push(plugin);
  }

  private printLog(...logs: Array<string>) {
    console.debug(...logs);
  }
  private loadPluginById(id: string) {
    const selectedPlugin = PandorasBox.plugins.find(
      (activePlugin) => activePlugin.id === id
    );

    const container = this.renderRoot.querySelector("#active-panel");

    if (!container || !selectedPlugin) return;

    if (this.activePlugin) {
      this.printLog(
        "❌ Pandora-box // Plugin deactivated:",
        this.activePlugin?.id
      );
      container.innerHTML = "";
      container.classList.remove("mt-2");
      if (selectedPlugin.id === this.activePlugin?.id) {
        this.activePlugin = null;
        return null;
      }
    }

    const pluginElement = document.createElement(selectedPlugin.component);
    pluginElement.setAttribute("label", selectedPlugin.label);
    pluginElement.setAttribute("id", selectedPlugin.id);
    container.classList.add("mt-2");
    container.appendChild(pluginElement);
    this.activePlugin = selectedPlugin;
    this.printLog("✅ Pandora-box // Plugin active:", this.activePlugin.id);
  }

  render() {
    // TODO: Fix zIndexes for all divs
    // TODO: Currently the width of pandora-box component is 100%(because we use 'left-0 right-0' css properties) which interfers with other elements.
    return html`
      <div
        class="fixed bottom-4 right-4 justify-center items-end flex flex-col gap-2 z-[999999]"
      >
        <div
          id="active-panel"
          key="${this.activePlugin?.id || "no-plugin"}"
          class="border border-solid  bg-black/60 text-white backdrop-blur-xl rounded-xl transition-all ease-out translate-x-0 ${this
            .activePlugin
            ? "translate-y-0 border-white/15 p-4"
            : "translate-y-10"}"
        ></div>
        <div
          class="bg-gradient-to-b from-0% to-100% from-[#0F0F0F] to-black rounded-xl px-4 py-4 text-white border border-white/15 border-solid transition-all inline-flex"
        >
          <div
            class="flex justify-start items-center ${PandorasBox.plugins
              .length > 0
              ? "gap-2"
              : ""}"
          >
            <app-logo
              classes="size-6 scale-100 hover:scale-120 transition-all cursor-pointer"
            ></app-logo>
            <div
              class="flex border-l border-white/50 border-solid justify-center items-center gap-2 ${PandorasBox
                .plugins.length > 0
                ? "pl-2"
                : ""}"
            >
              ${PandorasBox.plugins.map((plugin) => {
                const isSelected = this.activePlugin?.id === plugin.id;

                return html`
                  <div
                    title="${plugin.label}"
                    class="size-5 transition-all cursor-pointer flex justify-center items-center flex-col group relative ${isSelected
                      ? "text-white scale-115 rounded-xl duration-200 opacity-100"
                      : "text-white grayscale hover:grayscale-0 scale-100 hover:scale-105 opacity-70 hover:opacity-100"}"
                    aria-label="${plugin.label}"
                    @click="${(e: Event) => {
                      e.stopPropagation();
                      this.loadPluginById(plugin.id);
                    }}"
                  >
                    ${unsafeHTML(plugin.icon)}
                    <div
                      class="bg-[#FF00A5] rounded-full duration-300 grayscale-0 w-1 h-1 overflow-hidden object-contain absolute transition-all ${isSelected
                        ? "-bottom-1.5 opacity-100"
                        : "-bottom-3.5 opacity-0"}"
                    ></div>
                  </div>
                `;
              })}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
