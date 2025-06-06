import React, { useEffect, useRef } from "react";

const ReactPandoraBox: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "pandora-box-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "/pandora-box@0.0.3.js";
      script.type = "module";
      script.id = scriptId;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("<pandora-box /> script loaded");
      };

      script.onerror = () => {
        console.error("Failed to load <pandora-box /> script");
      };
    }
  }, []);

  useEffect(() => {
    if (ref.current && !ref.current.querySelector("pandora-box")) {
      const el = document.createElement("pandora-box");
      Object.entries(props).forEach(([key, value]) => {
        el.setAttribute(key, String(value));
      });
      ref.current.appendChild(el);
    }
  }, [props]);

  return <div ref={ref}></div>;
};

export default ReactPandoraBox;
