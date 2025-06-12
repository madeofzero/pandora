import { LitElement } from 'lit';
import { TemplateResult } from 'lit';

export declare class PandoraAppLogo extends TwLitElement {
    classes: string;
    render(): TemplateResult<1>;
}

export declare class PandoraInstaller extends TwLitElement {
    static Icon(): string;
    render(): TemplateResult<1>;
}

export declare class PandoraLink extends TwLitElement {
    link: string | undefined;
    connectedCallback(): void;
    private openLink;
    private handleOnCreateLinkClick;
    static Icon(plugin: PandoraPluginType): string;
    render(): TemplateResult<1>;
}

export declare class PandoraNote extends TwLitElement {
    heading: string | undefined;
    note: string | undefined;
    private handleOnCreateNoteClick;
    static Icon(plugin: PandoraPluginType): string;
    render(): TemplateResult<1>;
}

declare type PandoraPluginHooks = {
    onReady?: () => void;
    onMount?: (container: Element, pluginElement: Element) => void;
    onUnmount?: (container: Element) => void;
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

export declare class PandoraTracer extends TwLitElement {
    private count;
    private originalConsoleError;
    constructor();
    private overrideConsoleError;
    private attachGlobalListeners;
    private incrementCount;
    render(): TemplateResult<1>;
}

declare const TwLitElement: typeof LitElement;

export { }
