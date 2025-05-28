import { TW } from "@/shared/tailwindMixin";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

const TwLitElement = TW(LitElement);

@customElement("app-logo")
export class AppLogo extends TwLitElement {
  @property() classes = "size-10";

  render() {
    return html`
      <svg
        class="${this.classes}"
        viewBox="0 0 151 265"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M62.0504 171.107C87.9483 171.107 108.942 192.103 108.942 218C108.942 243.898 87.9485 264.892 62.0504 264.892C36.1526 264.892 15.1573 243.898 15.1571 218V171.107H62.0504ZM61.5595 2.06124C102.254 -5.29751 141.349 22.4934 148.88 64.1345C156.41 105.776 129.524 145.498 88.8289 152.858L15.1444 166.182L1.50884 90.7843C-6.02178 49.143 20.8645 9.42036 61.5595 2.06124Z"
          fill="url(#paint0_linear_42_193)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_42_193"
            x1="0.244632"
            y1="264.892"
            x2="267.963"
            y2="111.896"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FFEA00" />
            <stop offset="1" stop-color="#FFA600" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
}
