import { PANDORA_ELEMENT_IDENTIFIER } from "@/types/pandora-plugin.type";
import { PandorasBox } from "@/plugins/pandora-box";
import { PandoraNote } from "@/plugins/pandora-installer/pandora-note";
import { PandoraLink } from "@/plugins/pandora-installer/pandora-link";
import { PandoraInstaller, PandoraTracer } from "@/plugins";

declare global {
  interface HTMLElementTagNameMap {
    [PANDORA_ELEMENT_IDENTIFIER]: PandorasBox;
    "pandora-installer": PandoraInstaller;
    "pandora-link": PandoraLink;
    "pandora-note": PandoraNote;
    "pandora-tracer": PandoraTracer;
  }
}
