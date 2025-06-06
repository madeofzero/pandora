// example-react-app/src/types/custom-elements.d.ts
export {}; // ensure it's treated as a module

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "pandora-box": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
