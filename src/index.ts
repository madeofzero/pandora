import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { TW } from "./shared/tailwindMixin";
import "./shared/app-logo";

// Default tools
import "./shared/pandora-installer";

type PandoraTileType = {
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
  @state() activeTile: PandoraTileType | null = null;
  static tiles: Array<PandoraTileType> = [];

  @property({ type: String, attribute: "site-id" }) siteId = "";

  static log(...logs: any) {
    console.log("PandoraBox // ", ...logs);
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();

    // Register events
    document.addEventListener(
      "pandora::register-tile",
      this.onRegisterTile.bind(this)
    );

    // TODO Fix flickering icons
    const updatedTiles = await this.fetchTilesForSite();
    updatedTiles.forEach((tile) => PandorasBox.registerTile(tile));
  }

  static registerTile(newTile: PandoraTileType) {
    if (!PandorasBox.tiles.find((tile) => tile.id === newTile.id)) {
      PandorasBox.tiles.push(newTile);
      const rootElm = document.querySelector("pandora-box") as any;
      rootElm.requestUpdate();
    }
  }

  static unRegisterTile(tile: PandoraTileType) {
    PandorasBox.tiles = PandorasBox.tiles.filter((tile) => tile.id !== tile.id);
    const rootElm = document.querySelector("pandora-box") as any;
    rootElm.requestUpdate();
  }

  private async fetchTilesForSite() {
    const searchParams = new URLSearchParams();
    searchParams.set("filter", `property.id="${this.siteId}"`);

    const result = await fetch(
      `${serverURL}/api/collections/tiles/records` +
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
      attributes: PandoraTileType;
    }>;

    return items.map((item) => item.attributes);
  }

  private async onRegisterTile(e: Event) {
    const newTile = (e as CustomEvent).detail;
    const attributes = newTile.attributes as PandoraTileType;
    try {
      if (PandorasBox.tiles.find((tile) => tile.id === attributes.id)) {
        alert("Duplicate tile");
      } else {
        // Optimistic adding
        PandorasBox.registerTile(attributes);

        const result = await fetch(
          `${serverURL}/api/collections/tiles/records`,
          {
            method: "POST",
            body: JSON.stringify(newTile),
            headers: {
              "Content-Type": "application/json",
              // TODO: Figure out auth
            },
          }
        );

        if (result.ok) {
          this.updateTileIcon(
            attributes.id,
            `https://www.google.com/s2/favicons?domain_url=${attributes.link}`
          );
        } else {
          throw result.status;
        }
      }
    } catch (error) {
      // TODO: Handle failed event
      this.deleteTileIcon(attributes.id);
    }
  }

  private deleteTileIcon(id: string) {
    const tile = (this.renderRoot as DocumentFragment).getElementById(id);
    if (tile) tile.remove();
  }

  private updateTileIcon(id: string, newIcon: string) {
    const tile = (this.renderRoot as DocumentFragment).getElementById(id);

    if (tile) {
      const tileImage = tile.querySelector("img") as HTMLImageElement;
      tileImage.src = newIcon;
    }
  }

  private loadTileById(id: string) {
    const selectedTile = PandorasBox.tiles.find(
      (activeTile) => activeTile.id === id
    );

    const container = this.renderRoot.querySelector("#active-panel");

    if (!container || !selectedTile) return;

    if (this.activeTile) {
      container.innerHTML = "";
      container.classList.remove("mt-2");
      if (selectedTile.id === this.activeTile?.id) {
        this.activeTile = null;
        return null;
      }
    }

    const { component, icon, ...attributes } = selectedTile;
    const newTileEle = document.createElement(component);

    Object.entries(attributes).forEach(([key, value]) => {
      newTileEle.setAttribute(key, value);
    });

    newTileEle.setAttribute("site-id", this.siteId);

    container.classList.add("mt-2");
    container.appendChild(newTileEle);
    this.activeTile = selectedTile;
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
          key="${this.activeTile?.id || "no-tiles"}"
          class="border border-solid  bg-black/60 text-white backdrop-blur-xl rounded-xl transition-all ease-out translate-x-0 ${this
            .activeTile
            ? "translate-y-0 border-white/15 p-4"
            : "translate-y-10"}"
        ></div>
        <div
          class="bg-gradient-to-b from-0% to-100% from-[#0F0F0F] to-black rounded-xl px-4 py-4 text-white border border-white/15 border-solid transition-all inline-flex"
        >
          <div
            class="flex justify-start items-center ${PandorasBox.tiles.length >
            0
              ? "gap-2"
              : ""}"
          >
            <app-logo
              classes="size-6 scale-100 hover:scale-120 transition-all cursor-pointer"
            ></app-logo>
            <div
              class="flex border-l border-white/50 border-solid justify-center items-center gap-2 ${PandorasBox
                .tiles.length > 0
                ? "pl-2"
                : ""}"
            >
              ${PandorasBox.tiles.map((tile) => {
                const isSelected = this.activeTile?.id === tile.id;
                const isLinkComponent = tile.component === "pandora-link";

                return html`
                  <div
                    id="${tile.id}"
                    title="${tile.label}"
                    class="size-5 transition-all cursor-pointer flex justify-center items-center flex-col group relative ${isSelected
                      ? "text-white scale-115 rounded-xl duration-200 opacity-100"
                      : "text-white"} ${!isLinkComponent
                      ? "grayscale hover:grayscale-0 opacity-70 hover:opacity-100 scale-100 hover:scale-105"
                      : "scale-120 hover:scale-135"}"
                    aria-label="${tile.label}"
                    @click="${(e: Event) => {
                      e.stopPropagation();
                      this.loadTileById(tile.id);
                    }}"
                  >
                    ${unsafeHTML(tile.icon)}
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
