import { PANDORA_ELEMENT_IDENTIFIER } from "@/web/types/pandora-plugin.type";
import {
  PandorasBox,
  PandoraNote,
  PandoraLink,
  PandoraInstaller,
  PandoraTracer,
} from "@/web/plugins";

declare global {
  interface HTMLElementTagNameMap {
    [PANDORA_ELEMENT_IDENTIFIER]: PandorasBox;
    "pandora-installer": PandoraInstaller;
    "pandora-link": PandoraLink;
    "pandora-note": PandoraNote;
    "pandora-tracer": PandoraTracer;
  }
}
