import { LitElement } from 'lit';
import { TemplateResult } from 'lit';

declare type PandoraPluginHooks = {
    onReady?: () => void;
    onMount?: (element: Element) => void;
    onUnmount?: () => void;
};

declare type PandoraPluginType = {
    icon: string;
    element: string;
    label?: string;
    hooks?: PandoraPluginHooks;
    order?: number;
    [attr: string]: any;
};

export declare class PandorasBox extends TwLitElement {
    activePlugin: PandoraPluginType | null;
    static plugins: Array<PandoraPluginType>;
    siteId: string;
    static registerPlugin(newPlugin: PandoraPluginType): void;
    static unRegisterPlugin(toDeletePlugin: PandoraPluginType): void;
    connectedCallback(): Promise<void>;
    private onUpdatePluginIconImage;
    private onRegisterPlugin;
    private deletePluginIcon;
    private updatePluginIconImage;
    private loadPluginById;
    render(): TemplateResult<1>;
}

declare const TwLitElement: typeof LitElement;

export { }
