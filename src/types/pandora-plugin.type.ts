export type PandoraPluginType = {
  icon: string;
  element: string;
  label?: string;
  hooks?: PandoraPluginHooks;
  order?: number;
  [attr: string]: any;
};

export type PandoraPluginHooks = {
  onReady?: () => void;
  onMount?: (container: Element, pluginElement: Element) => void;
  onUnmount?: (container: Element) => void;
};
