import { LitElement } from 'lit';
import { TemplateResult } from 'lit';

export declare class PandorasBox extends TwLitElement {
    activeTile: PandoraTileType | null;
    static tiles: Array<PandoraTileType>;
    siteId: string;
    static log(...logs: any): void;
    connectedCallback(): Promise<void>;
    static registerTile(newTile: PandoraTileType): void;
    static unRegisterTile(tile: PandoraTileType): void;
    private fetchTilesForSite;
    private onRegisterTile;
    private deleteTileIcon;
    private updateTileIcon;
    private loadTileById;
    render(): TemplateResult<1>;
}

declare type PandoraTileType = {
    id: string;
    label: string;
    component: string;
    icon: string;
    [attr: string]: string;
};

declare const TwLitElement: typeof LitElement;

export { }
