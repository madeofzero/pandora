import { signal } from "@lit-labs/signals";

export const PandoraState = signal<{
  siteId: string | null;
}>({
  siteId: null,
});
