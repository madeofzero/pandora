import { TW } from "@/shared/tailwindMixin";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

// Default plugins
import "./plugins/app-logo";
import "./plugins/pandora-installer";

type PandoraPluginType = {
  id: string;
  label: string;
  component: string;
  icon: string;
  [attr: string]: string;
};

const TwLitElement = TW(LitElement);

const serverURL = import.meta.env.VITE_BACKEND_API_URL;

@customElement("pandora-box")
export class PandorasBox extends TwLitElement {
  @state() activePlugins: PandoraPluginType | null = null;
  static plugins: Array<PandoraPluginType> = [];

  @property({ type: String, attribute: "site-id" }) siteId = "";

  static log(...logs: any) {
    console.log("PandoraBox // ", ...logs);
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();

    // Register events
    document.addEventListener(
      "pandora::update-plugin-icon",
      this.onUpdatePluginIconImage.bind(this)
    );

    // Register events
    document.addEventListener(
      "pandora::register-plugin",
      this.onRegisterPlugin.bind(this)
    );

    // TODO Fix flickering icons
    const updatedPlugins = await this.fetchPluginsForSite();
    updatedPlugins.forEach((plugin) => PandorasBox.registerPlugin(plugin));
  }

  static registerPlugin(newPlugin: PandoraPluginType) {
    if (!PandorasBox.plugins.find((plugin) => plugin.id === newPlugin.id)) {
      PandorasBox.plugins.push(newPlugin);
      const rootElm = document.querySelector("pandora-box") as any;
      rootElm.requestUpdate();
    }
  }

  static unRegisterPlugin(toDeletePlugin: PandoraPluginType) {
    PandorasBox.plugins = PandorasBox.plugins.filter(
      (plugin) => plugin.id !== toDeletePlugin.id
    );
    const rootElm = document.querySelector("pandora-box") as any;
    rootElm.requestUpdate();
  }

  private async fetchPluginsForSite() {
    const searchParams = new URLSearchParams();
    searchParams.set("filter", `property.id="${this.siteId}"`);

    const result = await fetch(
      `${serverURL}/api/collections/plugins/records` +
        "?" +
        searchParams.toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // TODO: Figure out auth
        },
      }
    );

    const items = (await result.json().then((res) => res.items)) as Array<{
      attributes: PandoraPluginType;
    }>;

    return items.map((item) => item.attributes);
  }

  private async onUpdatePluginIconImage(e: Event) {
    const pluginData = (e as CustomEvent).detail;
    console.log(e);

    this.updatePluginIconElement(pluginData.id, pluginData.icon);
  }
  private async onRegisterPlugin(e: Event) {
    const newPlugin = (e as CustomEvent).detail;
    const attributes = newPlugin.attributes as PandoraPluginType;
    try {
      if (PandorasBox.plugins.find((plugin) => plugin.id === attributes.id)) {
        alert("Duplicate plugin");
      } else {
        // Optimistic adding
        PandorasBox.registerPlugin(attributes);

        const result = await fetch(
          `${serverURL}/api/collections/plugins/records`,
          {
            method: "POST",
            body: JSON.stringify(newPlugin),
            headers: {
              "Content-Type": "application/json",
              // TODO: Figure out auth
            },
          }
        );

        if (result.ok) {
          this.updatePluginIconImage(
            attributes.id,
            `https://www.google.com/s2/favicons?domain_url=${attributes.link}`
          );
        } else {
          throw result.status;
        }
      }
    } catch (error) {
      // TODO: Handle failed event
      this.deletePluginIcon(attributes.id);
    }
  }

  private deletePluginIcon(id: string) {
    const plugin = (this.renderRoot as DocumentFragment).getElementById(id);
    if (plugin) plugin.remove();
  }

  private updatePluginIconImage(id: string, newIcon: string) {
    const plugin = (this.renderRoot as DocumentFragment).getElementById(id);

    if (plugin) {
      const pluginImage = plugin.querySelector("img") as HTMLImageElement;
      pluginImage.src = newIcon;
    }
  }

  private updatePluginIconElement(id: string, element: string) {
    const plugins = this.renderRoot.querySelectorAll(`div#${id}`);

    if (plugins.length > 0 && plugins[0]) {
      plugins[0].innerHTML = element || "";
    }
  }

  private loadPluginById(id: string) {
    const selectedPlugin = PandorasBox.plugins.find(
      (activePlugins) => activePlugins.id === id
    );

    const container = this.renderRoot.querySelector("#active-panel");

    if (!container || !selectedPlugin) return;

    if (this.activePlugins) {
      container.innerHTML = "";
      container.classList.remove("mt-2");
      if (selectedPlugin.id === this.activePlugins?.id) {
        this.activePlugins = null;
        return null;
      }
    }

    const { component, icon, ...attributes } = selectedPlugin;
    const newPluginEle = document.createElement(component);

    Object.entries(attributes).forEach(([key, value]) => {
      newPluginEle.setAttribute(key, value);
    });

    newPluginEle.setAttribute("site-id", this.siteId);

    container.classList.add("mt-2");
    container.appendChild(newPluginEle);
    this.activePlugins = selectedPlugin;
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
          key="${this.activePlugins?.id || "no-plugins"}"
          class="border border-solid  bg-black/60 text-white backdrop-blur-xl rounded-xl transition-all ease-out translate-x-0 ${this
            .activePlugins
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
                const isSelected = this.activePlugins?.id === plugin.id;
                const isLinkComponent = plugin.component === "pandora-link";

                return html`
                  <div
                    id="${plugin.id}"
                    title="${plugin.label}"
                    class="size-5 transition-all cursor-pointer flex justify-center items-center flex-col group relative ${isSelected
                      ? "text-white scale-115 rounded-xl duration-200 opacity-100"
                      : "text-white"} ${!isLinkComponent
                      ? "grayscale hover:grayscale-0 opacity-70 hover:opacity-100 scale-100 hover:scale-105"
                      : "scale-120 hover:scale-135"}"
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
