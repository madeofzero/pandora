import { signal } from "@lit-labs/signals";

export const PandoraState = signal<{
  siteId: string;
}>({
  siteId: "",
});
