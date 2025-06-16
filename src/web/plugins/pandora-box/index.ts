import { TwLitElement } from "@/web/utils/tailwindMixin";
import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { PandoraState } from "@/web/utils/state";
import {
  PANDORA_ELEMENT_IDENTIFIER,
  PandoraPluginType,
} from "@/web/types/pandora-plugin.type";
import { fetchPlugins } from "@/web/api/plugins-api";
import { PANDORA_EVENTS } from "@/web/types/pandora-event.type";

@customElement(PANDORA_ELEMENT_IDENTIFIER)
export class PandorasBox extends TwLitElement {
  @state() activePlugin: PandoraPluginType | null = null;
  static plugins: Array<PandoraPluginType> = [];

  @property({ type: String, attribute: "site-id" }) siteId = "";

  static registerPlugin(newPlugin: PandoraPluginType) {
    if (!PandorasBox.plugins.find((plugin) => plugin.id === newPlugin.id)) {
      PandorasBox.plugins.push(newPlugin);
      const rootElm = document.querySelector(PANDORA_ELEMENT_IDENTIFIER) as any;
      if (!rootElm) return;

      if (newPlugin.hooks) {
        const { onReady } = newPlugin.hooks;
        if (onReady) {
          onReady();
        }
      }

      rootElm.requestUpdate();
    }
  }

  static unRegisterPlugin(toDeletePlugin: PandoraPluginType) {
    PandorasBox.plugins = PandorasBox.plugins.filter(
      (plugin) => plugin.id !== toDeletePlugin.id
    );
    const rootElm = document.querySelector(PANDORA_ELEMENT_IDENTIFIER) as any;
    if (!rootElm) return;
    rootElm.requestUpdate();
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    const hasSiteId = this.siteId.length > 0;
    // Set site-id globally
    PandoraState.set({
      ...PandoraState.get(),
      siteId: hasSiteId ? this.siteId : null,
    });

    // Register events
    document.addEventListener(
      PANDORA_EVENTS.plugin.icon.update,
      this.onUpdatePluginIconImage.bind(this)
    );

    document.addEventListener(
      PANDORA_EVENTS.plugin.register,
      this.onRegisterPlugin.bind(this)
    );

    // TODO Fix flickering icons
    const items: Array<{
      id: string;
      created: string;
      updated: string;
      type: string;
      property: string;
      attributes: PandoraPluginType;
    }> = await fetchPlugins(this.siteId).then((res) => res.items);

    const updatedPlugins = items.map((item) => {
      const { id, created, updated, type, property, attributes } = item;
      return { created, updated, type, property, ...attributes, id };
    });

    updatedPlugins.forEach((plugin) => PandorasBox.registerPlugin(plugin));
  }

  private async onUpdatePluginIconImage(e: Event) {
    const pluginData = (e as CustomEvent).detail;
    const plugins = this.renderRoot.querySelectorAll(`div#${pluginData.id}`);

    if (plugins.length > 0 && plugins[0]) {
      plugins[0].innerHTML = pluginData.icon || "";
    }
  }

  private async onRegisterPlugin(e: Event) {
    const newPlugin = (e as CustomEvent).detail;
    const attributes = newPlugin.attributes as PandoraPluginType;

    try {
      if (PandorasBox.plugins.find((plugin) => plugin.id === attributes.id)) {
        alert("Duplicate plugin");
      } else {
        PandorasBox.registerPlugin({ ...attributes, ...newPlugin });
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

  private loadPluginById(id: string) {
    const selectedPlugin = PandorasBox.plugins.find(
      (activePlugin) => activePlugin.id === id
    );

    const container = this.renderRoot.querySelector("#active-panel");

    if (!container || !selectedPlugin) return;

    const { element, icon, ...attributes } = selectedPlugin;

    const template = document.createElement("template");
    template.innerHTML = element.trim();

    const newPluginEle = template.content.firstChild;

    if (newPluginEle instanceof Element) {
      Object.entries(attributes).forEach(([key, value]) => {
        newPluginEle.setAttribute(key, value);
      });

      // Unmount existing element
      if (this.activePlugin) {
        if (this.activePlugin?.hooks) {
          const { onUnmount } = this.activePlugin.hooks;
          if (onUnmount) {
            onUnmount(container);
          }
        }
        container.innerHTML = "";

        if (selectedPlugin.id === this.activePlugin?.id) {
          this.activePlugin = null;
          return null;
        }
      }

      container.appendChild(newPluginEle);

      if (selectedPlugin.hooks) {
        const { onMount } = selectedPlugin.hooks;

        if (onMount) {
          onMount(container, newPluginEle);
        }
      }

      this.activePlugin = selectedPlugin;
    }
  }

  render() {
    // TODO: Fix zIndexes for all divs
    return html`
      <div
        class="fixed bottom-4 right-4 justify-center items-end flex flex-col gap-2 z-[999999]"
      >
        <!-- Panel -->
        <div
          id="active-panel"
          class="border border-solid bg-[#15171B] rounded-xl transition-all ease-out translate-x-0 ${this
            .activePlugin
            ? "translate-y-0 border-[#6EB7FF] p-4"
            : "translate-y-10 border-transparent"}"
        ></div>
        <!-- Bar -->
        <div
          class="bg-[#15171B] rounded-full px-6 py-4 border border-[#343330] border-solid transition-all inline-flex"
        >
          <div
            class="flex justify-start items-center ${PandorasBox.plugins
              .length > 0
              ? "gap-2"
              : ""}"
          >
            <pandora-logo
              classes="max-h-4 w-full transition-all"
            ></pandora-logo>
            <div
              class="flex border-l border-[#343330] border-solid justify-center items-center gap-4 ${PandorasBox
                .plugins.length > 0
                ? "pl-2"
                : ""}"
            >
              ${PandorasBox.plugins.map((plugin) => {
                const isSelected = this.activePlugin?.id === plugin.id;
                const ComponentClass = customElements.get(plugin.type) as any; // e.g. 'pandora-note'
                const iconSvg =
                  plugin.icon ||
                  (ComponentClass?.Icon && ComponentClass?.Icon(plugin)) ||
                  "";

                return html`<div
                  id="${plugin.id}-${plugin.type}"
                  class="relative flex justify-center items-center group select-none"
                  @click="${(e: Event) => {
                    e.stopPropagation();
                    this.loadPluginById(plugin.id);
                  }}"
                >
                  <div
                    class="transition-all absolute bg-gradient-to-b from-0% from-[#008CFF] to-[#3F55FF] to-100% rounded-full ${isSelected
                      ? "scale-110 size-6 opacity-100"
                      : "scale-100 size-0 opacity-0"}"
                  ></div>
                  <div
                    class="relative size-5 [&>img,&>svg]:size-5 transition-all cursor-pointer ${isSelected
                      ? "text-[#F7F9FB] scale-80"
                      : "text-[#F7F9FB]/60 hover:text-[#6EB7FF] scale-100 group-hover:scale-110"}"
                  >
                    ${unsafeHTML(iconSvg)}
                  </div>
                </div>`;
              })}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
