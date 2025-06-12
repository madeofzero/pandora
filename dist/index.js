/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, mt = J.ShadowRoot && (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ft = Symbol(), St = /* @__PURE__ */ new WeakMap();
let ce = class {
  constructor(t, r, i) {
    if (this._$cssResult$ = !0, i !== Ft) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (mt && t === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (t = St.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && St.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Dt = (e) => new ce(typeof e == "string" ? e : e + "", void 0, Ft), Vt = (e, t) => {
  if (mt) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const i = document.createElement("style"), n = J.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = r.cssText, e.appendChild(i);
  }
}, Ot = mt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const i of t.cssRules) r += i.cssText;
  return Dt(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: de, defineProperty: ue, getOwnPropertyDescriptor: he, getOwnPropertyNames: pe, getOwnPropertySymbols: fe, getPrototypeOf: ge } = Object, rt = globalThis, Nt = rt.trustedTypes, Ce = Nt ? Nt.emptyScript : "", ve = rt.reactiveElementPolyfillSupport, z = (e, t) => e, X = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ce : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, wt = (e, t) => !de(e, t), Lt = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ??= Symbol("metadata"), rt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let N = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Lt) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, r);
      n !== void 0 && ue(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, r, i) {
    const { get: n, set: s } = he(this.prototype, t) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
    } };
    return { get: n, set(o) {
      const l = n?.call(this);
      s?.call(this, o), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = ge(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const r = this.properties, i = [...pe(r), ...fe(r)];
      for (const n of i) this.createProperty(n, r[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [i, n] of r) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, i] of this.elementProperties) {
      const n = this._$Eu(r, i);
      n !== void 0 && this._$Eh.set(n, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) r.unshift(Ot(n));
    } else t !== void 0 && r.push(Ot(t));
    return r;
  }
  static _$Eu(t, r) {
    const i = r.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const i of r.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Vt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, r, i) {
    this._$AK(t, i);
  }
  _$ET(t, r) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : X).toAttribute(r, i.type);
      this._$Em = t, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : X;
      this._$Em = n, this[n] = o.fromAttribute(r, s.type) ?? this._$Ej?.get(n) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, r, i) {
    if (t !== void 0) {
      const n = this.constructor, s = this[t];
      if (i ??= n.getPropertyOptions(t), !((i.hasChanged ?? wt)(s, r) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, r, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: i, reflect: n, wrapped: s }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? r ?? this[t]), s !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (r = void 0), this._$AL.set(t, r)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, s] of this._$Ep) this[n] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, s] of i) {
        const { wrapped: o } = s, l = this[n];
        o !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, s, l);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((r) => this._$ET(r, this[r])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[z("elementProperties")] = /* @__PURE__ */ new Map(), N[z("finalized")] = /* @__PURE__ */ new Map(), ve?.({ ReactiveElement: N }), (rt.reactiveElementVersions ??= []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = globalThis, Q = yt.trustedTypes, It = Q ? Q.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, jt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, Bt = "?" + _, me = `<${Bt}>`, A = document, D = () => A.createComment(""), V = (e) => e === null || typeof e != "object" && typeof e != "function", bt = Array.isArray, we = (e) => bt(e) || typeof e?.[Symbol.iterator] == "function", ot = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Tt = /-->/g, kt = />/g, x = RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Mt = /'/g, Ht = /"/g, Wt = /^(?:script|style|textarea|title)$/i, ye = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), $ = ye(1), P = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), Rt = /* @__PURE__ */ new WeakMap(), E = A.createTreeWalker(A, 129);
function Zt(e, t) {
  if (!bt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return It !== void 0 ? It.createHTML(t) : t;
}
const be = (e, t) => {
  const r = e.length - 1, i = [];
  let n, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = R;
  for (let l = 0; l < r; l++) {
    const a = e[l];
    let d, f, c = -1, v = 0;
    for (; v < a.length && (o.lastIndex = v, f = o.exec(a), f !== null); ) v = o.lastIndex, o === R ? f[1] === "!--" ? o = Tt : f[1] !== void 0 ? o = kt : f[2] !== void 0 ? (Wt.test(f[2]) && (n = RegExp("</" + f[2], "g")), o = x) : f[3] !== void 0 && (o = x) : o === x ? f[0] === ">" ? (o = n ?? R, c = -1) : f[1] === void 0 ? c = -2 : (c = o.lastIndex - f[2].length, d = f[1], o = f[3] === void 0 ? x : f[3] === '"' ? Ht : Mt) : o === Ht || o === Mt ? o = x : o === Tt || o === kt ? o = R : (o = x, n = void 0);
    const b = o === x && e[l + 1].startsWith("/>") ? " " : "";
    s += o === R ? a + me : c >= 0 ? (i.push(d), a.slice(0, c) + jt + a.slice(c) + _ + b) : a + _ + (c === -2 ? l : b);
  }
  return [Zt(e, s + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class j {
  constructor({ strings: t, _$litType$: r }, i) {
    let n;
    this.parts = [];
    let s = 0, o = 0;
    const l = t.length - 1, a = this.parts, [d, f] = be(t, r);
    if (this.el = j.createElement(d, i), E.currentNode = this.el.content, r === 2 || r === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = E.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(jt)) {
          const v = f[o++], b = n.getAttribute(c).split(_), O = /([.?@])?(.*)/.exec(v);
          a.push({ type: 1, index: s, name: O[2], strings: b, ctor: O[1] === "." ? _e : O[1] === "?" ? xe : O[1] === "@" ? Ee : it }), n.removeAttribute(c);
        } else c.startsWith(_) && (a.push({ type: 6, index: s }), n.removeAttribute(c));
        if (Wt.test(n.tagName)) {
          const c = n.textContent.split(_), v = c.length - 1;
          if (v > 0) {
            n.textContent = Q ? Q.emptyScript : "";
            for (let b = 0; b < v; b++) n.append(c[b], D()), E.nextNode(), a.push({ type: 2, index: ++s });
            n.append(c[v], D());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Bt) a.push({ type: 2, index: s });
      else {
        let c = -1;
        for (; (c = n.data.indexOf(_, c + 1)) !== -1; ) a.push({ type: 7, index: s }), c += _.length - 1;
      }
      s++;
    }
  }
  static createElement(t, r) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function I(e, t, r = e, i) {
  if (t === P) return t;
  let n = i !== void 0 ? r._$Co?.[i] : r._$Cl;
  const s = V(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(e), n._$AT(e, r, i)), i !== void 0 ? (r._$Co ??= [])[i] = n : r._$Cl = n), n !== void 0 && (t = I(e, n._$AS(e, t.values), n, i)), t;
}
class $e {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: i } = this._$AD, n = (t?.creationScope ?? A).importNode(r, !0);
    E.currentNode = n;
    let s = E.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new Z(s, s.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(s, a.name, a.strings, this, t) : a.type === 6 && (d = new Ae(s, this, t)), this._$AV.push(d), a = i[++l];
      }
      o !== a?.index && (s = E.nextNode(), o++);
    }
    return E.currentNode = A, n;
  }
  p(t) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, r), r += i.strings.length - 2) : i._$AI(t[r])), r++;
  }
}
class Z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, i, n) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && t?.nodeType === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = I(this, t, r), V(t) ? t === C || t == null || t === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : we(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== C && V(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = j.createElement(Zt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(r);
    else {
      const s = new $e(n, this), o = s.u(this.options);
      s.p(r), this.T(o), this._$AH = s;
    }
  }
  _$AC(t) {
    let r = Rt.get(t.strings);
    return r === void 0 && Rt.set(t.strings, r = new j(t)), r;
  }
  k(t) {
    bt(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, n = 0;
    for (const s of t) n === r.length ? r.push(i = new Z(this.O(D()), this.O(D()), this, this.options)) : i = r[n], i._$AI(s), n++;
    n < r.length && (this._$AR(i && i._$AB.nextSibling, n), r.length = n);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class it {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, i, n, s) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = t, this.name = r, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = C;
  }
  _$AI(t, r = this, i, n) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) t = I(this, t, r, 0), o = !V(t) || t !== this._$AH && t !== P, o && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = s[0], a = 0; a < s.length - 1; a++) d = I(this, l[i + a], r, a), d === P && (d = this._$AH[a]), o ||= !V(d) || d !== this._$AH[a], d === C ? t = C : t !== C && (t += (d ?? "") + s[a + 1]), this._$AH[a] = d;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class _e extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === C ? void 0 : t;
  }
}
class xe extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== C);
  }
}
class Ee extends it {
  constructor(t, r, i, n, s) {
    super(t, r, i, n, s), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = I(this, t, r, 0) ?? C) === P) return;
    const i = this._$AH, n = t === C && i !== C || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== C && (i === C || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ae {
  constructor(t, r, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const Pe = yt.litHtmlPolyfillSupport;
Pe?.(j, Z), (yt.litHtmlVersions ??= []).push("3.3.0");
const Se = (e, t, r) => {
  const i = r?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = r?.renderBefore ?? null;
    i._$litPart$ = n = new Z(t.insertBefore(D(), s), s, void 0, r ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis;
let U = class extends N {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Se(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return P;
  }
};
U._$litElement$ = !0, U.finalized = !0, $t.litElementHydrateSupport?.({ LitElement: U });
const Oe = $t.litElementPolyfillSupport;
Oe?.({ LitElement: U });
($t.litElementVersions ??= []).push("4.2.0");
const Ne = '/*! tailwindcss v4.1.7 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-border-style:solid;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-font-weight:initial;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-ease:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-white:#fff;--spacing:.25rem;--text-lg:1.125rem;--text-lg--line-height:calc(1.75/1.125);--font-weight-bold:700;--radius-xl:.75rem;--ease-out:cubic-bezier(0,0,.2,1);--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.collapse{visibility:collapse}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.right-4{right:calc(var(--spacing)*4)}.bottom-4{bottom:calc(var(--spacing)*4)}.z-\\[999999\\]{z-index:999999}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.m-0{margin:calc(var(--spacing)*0)}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.field-sizing-content{field-sizing:content}.size-0{width:calc(var(--spacing)*0);height:calc(var(--spacing)*0)}.size-5{width:calc(var(--spacing)*5);height:calc(var(--spacing)*5)}.size-6{width:calc(var(--spacing)*6);height:calc(var(--spacing)*6)}.size-10{width:calc(var(--spacing)*10);height:calc(var(--spacing)*10)}.h-auto{height:auto}.max-h-4{max-height:calc(var(--spacing)*4)}.max-h-96{max-height:calc(var(--spacing)*96)}.min-h-56{min-height:calc(var(--spacing)*56)}.w-96{width:calc(var(--spacing)*96)}.w-full{width:100%}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.translate-x-0{--tw-translate-x:calc(var(--spacing)*0);translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-y-0{--tw-translate-y:calc(var(--spacing)*0);translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-y-10{--tw-translate-y:calc(var(--spacing)*10);translate:var(--tw-translate-x)var(--tw-translate-y)}.scale-80{--tw-scale-x:80%;--tw-scale-y:80%;--tw-scale-z:80%;scale:var(--tw-scale-x)var(--tw-scale-y)}.scale-100{--tw-scale-x:100%;--tw-scale-y:100%;--tw-scale-z:100%;scale:var(--tw-scale-x)var(--tw-scale-y)}.scale-110{--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x)var(--tw-scale-y)}.cursor-pointer{cursor:pointer}.resize-none{resize:none}.flex-col{flex-direction:column}.items-center{align-items:center}.items-end{align-items:flex-end}.justify-center{justify-content:center}.justify-start{justify-content:flex-start}.gap-2{gap:calc(var(--spacing)*2)}.gap-4{gap:calc(var(--spacing)*4)}.overflow-auto{overflow:auto}.rounded-full{border-radius:3.40282e38px}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-solid{--tw-border-style:solid;border-style:solid}.border-\\[\\#6EB7FF\\]{border-color:#6eb7ff}.border-\\[\\#343330\\]{border-color:#343330}.border-transparent{border-color:#0000}.bg-\\[\\#15171B\\]{background-color:#15171b}.bg-gradient-to-b{--tw-gradient-position:to bottom in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.from-\\[\\#008CFF\\]{--tw-gradient-from:#008cff;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-0\\%{--tw-gradient-from-position:0%}.to-\\[\\#3F55FF\\]{--tw-gradient-to:#3f55ff;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-100\\%{--tw-gradient-to-position:100%}.p-4{padding:calc(var(--spacing)*4)}.px-6{padding-inline:calc(var(--spacing)*6)}.py-4{padding-block:calc(var(--spacing)*4)}.pl-2{padding-left:calc(var(--spacing)*2)}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.text-\\[\\#6EB7FF\\]{color:#6eb7ff}.text-\\[\\#F7F9FB\\]{color:#f7f9fb}.text-\\[\\#F7F9FB\\]\\/60{color:#f7f9fb99}.text-white{color:var(--color-white)}.text-white\\/80{color:#fffc}@supports (color:color-mix(in lab,red,red)){.text-white\\/80{color:color-mix(in oklab,var(--color-white)80%,transparent)}}.uppercase{text-transform:uppercase}.opacity-0{opacity:0}.opacity-100{opacity:1}.filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.select-none{-webkit-user-select:none;user-select:none}@media (hover:hover){.group-hover\\:scale-110:is(:where(.group):hover *),.hover\\:scale-110:hover{--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x)var(--tw-scale-y)}.hover\\:text-\\[\\#6EB7FF\\]:hover{color:#6eb7ff}.hover\\:underline:hover{text-decoration-line:underline}}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.\\[\\&\\>img\\,\\&\\>svg\\]\\:size-5>img,.\\[\\&\\>img\\,\\&\\>svg\\]\\:size-5>svg{width:calc(var(--spacing)*5);height:calc(var(--spacing)*5)}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}', Le = Dt(Ne), Ie = (e) => class extends e {
  connectedCallback() {
    super.connectedCallback(), this.shadowRoot && Vt(this.shadowRoot, [Le]);
  }
}, k = Ie(U);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = { attribute: !0, type: String, converter: X, reflect: !1, hasChanged: wt }, ke = (e = Te, t, r) => {
  const { kind: i, metadata: n } = r;
  let s = globalThis.litPropertyMetadata.get(n);
  if (s === void 0 && globalThis.litPropertyMetadata.set(n, s = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(r.name, e), i === "accessor") {
    const { name: o } = r;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, e);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, e, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = r;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, e);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function H(e) {
  return (t, r) => typeof r == "object" ? ke(e, t, r) : ((i, n, s) => {
    const o = n.hasOwnProperty(s);
    return n.constructor.createProperty(s, i), o ? Object.getOwnPropertyDescriptor(n, s) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function qt(e) {
  return H({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Me = { CHILD: 2 }, He = (e) => (...t) => ({ _$litDirective$: e, values: t });
class Re {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, r, i) {
    this._$Ct = t, this._$AM = r, this._$Ci = i;
  }
  _$AS(t, r) {
    return this.update(t, r);
  }
  update(t, r) {
    return this.render(...r);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ht extends Re {
  constructor(t) {
    if (super(t), this.it = C, t.type !== Me.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === C || t == null) return this._t = void 0, this.it = t;
    if (t === P) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const r = [t];
    return r.raw = r, this._t = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
}
ht.directiveName = "unsafeHTML", ht.resultType = 1;
const ze = He(ht);
var Ue = Object.defineProperty, Fe = (e, t, r) => t in e ? Ue(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, at = (e, t, r) => (Fe(e, typeof t != "symbol" ? t + "" : t, r), r), De = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
}, lt = (e, t) => {
  if (Object(t) !== t)
    throw TypeError('Cannot use the "in" operator on this value');
  return e.has(t);
}, G = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, zt = (e, t, r) => (De(e, t, "access private method"), r);
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function Gt(e, t) {
  return Object.is(e, t);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let g = null, F = !1, K = 1;
const Y = /* @__PURE__ */ Symbol("SIGNAL");
function L(e) {
  const t = g;
  return g = e, t;
}
function Ve() {
  return g;
}
function je() {
  return F;
}
const _t = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {
  },
  consumerMarkedDirty: () => {
  },
  consumerOnSignalRead: () => {
  }
};
function nt(e) {
  if (F)
    throw new Error(
      typeof ngDevMode < "u" && ngDevMode ? "Assertion error: signal read during notification phase" : ""
    );
  if (g === null)
    return;
  g.consumerOnSignalRead(e);
  const t = g.nextProducerIndex++;
  if (T(g), t < g.producerNode.length && g.producerNode[t] !== e && pt(g)) {
    const r = g.producerNode[t];
    st(r, g.producerIndexOfThis[t]);
  }
  g.producerNode[t] !== e && (g.producerNode[t] = e, g.producerIndexOfThis[t] = pt(g) ? Xt(e, g, t) : 0), g.producerLastReadVersion[t] = e.version;
}
function Be() {
  K++;
}
function Jt(e) {
  if (!(!e.dirty && e.lastCleanEpoch === K)) {
    if (!e.producerMustRecompute(e) && !Je(e)) {
      e.dirty = !1, e.lastCleanEpoch = K;
      return;
    }
    e.producerRecomputeValue(e), e.dirty = !1, e.lastCleanEpoch = K;
  }
}
function Kt(e) {
  if (e.liveConsumerNode === void 0)
    return;
  const t = F;
  F = !0;
  try {
    for (const r of e.liveConsumerNode)
      r.dirty || Ze(r);
  } finally {
    F = t;
  }
}
function We() {
  return g?.consumerAllowSignalWrites !== !1;
}
function Ze(e) {
  var t;
  e.dirty = !0, Kt(e), (t = e.consumerMarkedDirty) == null || t.call(e.wrapper ?? e);
}
function qe(e) {
  return e && (e.nextProducerIndex = 0), L(e);
}
function Ge(e, t) {
  if (L(t), !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0)) {
    if (pt(e))
      for (let r = e.nextProducerIndex; r < e.producerNode.length; r++)
        st(e.producerNode[r], e.producerIndexOfThis[r]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
  }
}
function Je(e) {
  T(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    const r = e.producerNode[t], i = e.producerLastReadVersion[t];
    if (i !== r.version || (Jt(r), i !== r.version))
      return !0;
  }
  return !1;
}
function Xt(e, t, r) {
  var i;
  if (xt(e), T(e), e.liveConsumerNode.length === 0) {
    (i = e.watched) == null || i.call(e.wrapper);
    for (let n = 0; n < e.producerNode.length; n++)
      e.producerIndexOfThis[n] = Xt(e.producerNode[n], e, n);
  }
  return e.liveConsumerIndexOfThis.push(r), e.liveConsumerNode.push(t) - 1;
}
function st(e, t) {
  var r;
  if (xt(e), T(e), typeof ngDevMode < "u" && ngDevMode && t >= e.liveConsumerNode.length)
    throw new Error(
      `Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`
    );
  if (e.liveConsumerNode.length === 1) {
    (r = e.unwatched) == null || r.call(e.wrapper);
    for (let n = 0; n < e.producerNode.length; n++)
      st(e.producerNode[n], e.producerIndexOfThis[n]);
  }
  const i = e.liveConsumerNode.length - 1;
  if (e.liveConsumerNode[t] = e.liveConsumerNode[i], e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[i], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, t < e.liveConsumerNode.length) {
    const n = e.liveConsumerIndexOfThis[t], s = e.liveConsumerNode[t];
    T(s), s.producerIndexOfThis[n] = t;
  }
}
function pt(e) {
  var t;
  return e.consumerIsAlwaysLive || (((t = e?.liveConsumerNode) == null ? void 0 : t.length) ?? 0) > 0;
}
function T(e) {
  e.producerNode ?? (e.producerNode = []), e.producerIndexOfThis ?? (e.producerIndexOfThis = []), e.producerLastReadVersion ?? (e.producerLastReadVersion = []);
}
function xt(e) {
  e.liveConsumerNode ?? (e.liveConsumerNode = []), e.liveConsumerIndexOfThis ?? (e.liveConsumerIndexOfThis = []);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function Qt(e) {
  if (Jt(e), nt(e), e.value === ft)
    throw e.error;
  return e.value;
}
function Ke(e) {
  const t = Object.create(Xe);
  t.computation = e;
  const r = () => Qt(t);
  return r[Y] = t, r;
}
const ct = /* @__PURE__ */ Symbol("UNSET"), dt = /* @__PURE__ */ Symbol("COMPUTING"), ft = /* @__PURE__ */ Symbol("ERRORED"), Xe = {
  ..._t,
  value: ct,
  dirty: !0,
  error: null,
  equal: Gt,
  producerMustRecompute(e) {
    return e.value === ct || e.value === dt;
  },
  producerRecomputeValue(e) {
    if (e.value === dt)
      throw new Error("Detected cycle in computations.");
    const t = e.value;
    e.value = dt;
    const r = qe(e);
    let i, n = !1;
    try {
      i = e.computation.call(e.wrapper), n = t !== ct && t !== ft && e.equal.call(e.wrapper, t, i);
    } catch (s) {
      i = ft, e.error = s;
    } finally {
      Ge(e, r);
    }
    if (n) {
      e.value = t;
      return;
    }
    e.value = i, e.version++;
  }
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function Qe() {
  throw new Error();
}
let Ye = Qe;
function tr() {
  Ye();
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function er(e) {
  const t = Object.create(nr);
  t.value = e;
  const r = () => (nt(t), t.value);
  return r[Y] = t, r;
}
function rr() {
  return nt(this), this.value;
}
function ir(e, t) {
  We() || tr(), e.equal.call(e.wrapper, e.value, t) || (e.value = t, sr(e));
}
const nr = {
  ..._t,
  equal: Gt,
  value: void 0
};
function sr(e) {
  e.version++, Be(), Kt(e);
}
/**
 * @license
 * Copyright 2024 Bloomberg Finance L.P.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const m = Symbol("node");
var B;
((e) => {
  var t, r, i, n;
  class s {
    constructor(a, d = {}) {
      G(this, r), at(this, t);
      const c = er(a)[Y];
      if (this[m] = c, c.wrapper = this, d) {
        const v = d.equals;
        v && (c.equal = v), c.watched = d[e.subtle.watched], c.unwatched = d[e.subtle.unwatched];
      }
    }
    get() {
      if (!(0, e.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.get");
      return rr.call(this[m]);
    }
    set(a) {
      if (!(0, e.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.set");
      if (je())
        throw new Error("Writes to signals not permitted during Watcher callback");
      const d = this[m];
      ir(d, a);
    }
  }
  t = m, r = /* @__PURE__ */ new WeakSet(), e.isState = (l) => typeof l == "object" && lt(r, l), e.State = s;
  class o {
    // Create a Signal which evaluates to the value returned by the callback.
    // Callback is called with this signal as the parameter.
    constructor(a, d) {
      G(this, n), at(this, i);
      const c = Ke(a)[Y];
      if (c.consumerAllowSignalWrites = !0, this[m] = c, c.wrapper = this, d) {
        const v = d.equals;
        v && (c.equal = v), c.watched = d[e.subtle.watched], c.unwatched = d[e.subtle.unwatched];
      }
    }
    get() {
      if (!(0, e.isComputed)(this))
        throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");
      return Qt(this[m]);
    }
  }
  i = m, n = /* @__PURE__ */ new WeakSet(), e.isComputed = (l) => typeof l == "object" && lt(n, l), e.Computed = o, ((l) => {
    var a, d, f, c;
    function v(p) {
      let h, u = null;
      try {
        u = L(null), h = p();
      } finally {
        L(u);
      }
      return h;
    }
    l.untrack = v;
    function b(p) {
      var h;
      if (!(0, e.isComputed)(p) && !(0, e.isWatcher)(p))
        throw new TypeError("Called introspectSources without a Computed or Watcher argument");
      return ((h = p[m].producerNode) == null ? void 0 : h.map((u) => u.wrapper)) ?? [];
    }
    l.introspectSources = b;
    function O(p) {
      var h;
      if (!(0, e.isComputed)(p) && !(0, e.isState)(p))
        throw new TypeError("Called introspectSinks without a Signal argument");
      return ((h = p[m].liveConsumerNode) == null ? void 0 : h.map((u) => u.wrapper)) ?? [];
    }
    l.introspectSinks = O;
    function ne(p) {
      if (!(0, e.isComputed)(p) && !(0, e.isState)(p))
        throw new TypeError("Called hasSinks without a Signal argument");
      const h = p[m].liveConsumerNode;
      return h ? h.length > 0 : !1;
    }
    l.hasSinks = ne;
    function se(p) {
      if (!(0, e.isComputed)(p) && !(0, e.isWatcher)(p))
        throw new TypeError("Called hasSources without a Computed or Watcher argument");
      const h = p[m].producerNode;
      return h ? h.length > 0 : !1;
    }
    l.hasSources = se;
    class oe {
      // When a (recursive) source of Watcher is written to, call this callback,
      // if it hasn't already been called since the last `watch` call.
      // No signals may be read or written during the notify.
      constructor(h) {
        G(this, d), G(this, f), at(this, a);
        let u = Object.create(_t);
        u.wrapper = this, u.consumerMarkedDirty = h, u.consumerIsAlwaysLive = !0, u.consumerAllowSignalWrites = !1, u.producerNode = [], this[m] = u;
      }
      // Add these signals to the Watcher's set, and set the watcher to run its
      // notify callback next time any signal in the set (or one of its dependencies) changes.
      // Can be called with no arguments just to reset the "notified" state, so that
      // the notify callback will be invoked again.
      watch(...h) {
        if (!(0, e.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        zt(this, f, c).call(this, h);
        const u = this[m];
        u.dirty = !1;
        const y = L(u);
        for (const q of h)
          nt(q[m]);
        L(y);
      }
      // Remove these signals from the watched set (e.g., for an effect which is disposed)
      unwatch(...h) {
        if (!(0, e.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        zt(this, f, c).call(this, h);
        const u = this[m];
        T(u);
        for (let y = u.producerNode.length - 1; y >= 0; y--)
          if (h.includes(u.producerNode[y].wrapper)) {
            st(u.producerNode[y], u.producerIndexOfThis[y]);
            const q = u.producerNode.length - 1;
            if (u.producerNode[y] = u.producerNode[q], u.producerIndexOfThis[y] = u.producerIndexOfThis[q], u.producerNode.length--, u.producerIndexOfThis.length--, u.nextProducerIndex--, y < u.producerNode.length) {
              const le = u.producerIndexOfThis[y], Pt = u.producerNode[y];
              xt(Pt), Pt.liveConsumerIndexOfThis[le] = y;
            }
          }
      }
      // Returns the set of computeds in the Watcher's set which are still yet
      // to be re-evaluated
      getPending() {
        if (!(0, e.isWatcher)(this))
          throw new TypeError("Called getPending without Watcher receiver");
        return this[m].producerNode.filter((u) => u.dirty).map((u) => u.wrapper);
      }
    }
    a = m, d = /* @__PURE__ */ new WeakSet(), f = /* @__PURE__ */ new WeakSet(), c = function(p) {
      for (const h of p)
        if (!(0, e.isComputed)(h) && !(0, e.isState)(h))
          throw new TypeError("Called watch/unwatch without a Computed or State argument");
    }, e.isWatcher = (p) => lt(d, p), l.Watcher = oe;
    function ae() {
      var p;
      return (p = Ve()) == null ? void 0 : p.wrapper;
    }
    l.currentComputed = ae, l.watched = Symbol("watched"), l.unwatched = Symbol("unwatched");
  })(e.subtle || (e.subtle = {}));
})(B || (B = {}));
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
new FinalizationRegistry(({ watcher: e, signal: t }) => {
  e.unwatch(t);
});
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
B.State;
B.Computed;
const or = (e, t) => new B.State(e, t), tt = or({
  siteId: null
}), S = "pandora-box", Yt = void 0;
async function ar(e) {
  if (e.length <= 0)
    return [];
  const t = new URLSearchParams();
  return t.set("filter", `property.id="${e}"`), await (await fetch(`${Yt}/api/collections/plugins/records?` + t.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })).json();
}
async function te(e) {
  return e.property ? (await fetch(`${Yt}/api/collections/plugins/records`, {
    method: "POST",
    body: JSON.stringify(e),
    headers: {
      "Content-Type": "application/json"
    }
  })).json() : {
    ...e,
    id: Math.random()
  };
}
const W = {
  plugin: {
    register: "pandora::register-plugin",
    icon: {
      update: "pandora::update-plugin-icon"
    }
  }
};
var lr = Object.defineProperty, cr = Object.getOwnPropertyDescriptor, Et = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? cr(t, r) : t, s = e.length - 1, o; s >= 0; s--) (o = e[s]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && lr(t, r, n), n;
};
let w = class extends k {
  constructor() {
    super(...arguments), this.activePlugin = null, this.siteId = "";
  }
  static registerPlugin(e) {
    if (!w.plugins.find((t) => t.id === e.id)) {
      w.plugins.push(e);
      const t = document.querySelector(S);
      if (!t) return;
      if (e.hooks) {
        const {
          onReady: r
        } = e.hooks;
        r && r();
      }
      t.requestUpdate();
    }
  }
  static unRegisterPlugin(e) {
    w.plugins = w.plugins.filter((r) => r.id !== e.id);
    const t = document.querySelector(S);
    t && t.requestUpdate();
  }
  async connectedCallback() {
    super.connectedCallback();
    const e = this.siteId.length > 0;
    tt.set({
      ...tt.get(),
      siteId: e ? this.siteId : null
    }), document.addEventListener(W.plugin.icon.update, this.onUpdatePluginIconImage.bind(this)), document.addEventListener(W.plugin.register, this.onRegisterPlugin.bind(this)), (await ar(this.siteId).then((i) => i.items)).map((i) => {
      const {
        id: n,
        created: s,
        updated: o,
        type: l,
        property: a,
        attributes: d
      } = i;
      return {
        created: s,
        updated: o,
        type: l,
        property: a,
        ...d,
        id: n
      };
    }).forEach((i) => w.registerPlugin(i));
  }
  async onUpdatePluginIconImage(e) {
    const t = e.detail, r = this.renderRoot.querySelectorAll(`div#${t.id}`);
    r.length > 0 && r[0] && (r[0].innerHTML = t.icon || "");
  }
  async onRegisterPlugin(e) {
    const t = e.detail, r = t.attributes;
    try {
      w.plugins.find((i) => i.id === r.id) ? alert("Duplicate plugin") : w.registerPlugin({
        ...r,
        ...t
      });
    } catch {
      this.deletePluginIcon(r.id);
    }
  }
  deletePluginIcon(e) {
    const t = this.renderRoot.getElementById(e);
    t && t.remove();
  }
  updatePluginIconImage(e, t) {
    const r = this.renderRoot.getElementById(e);
    if (r) {
      const i = r.querySelector("img");
      i.src = t;
    }
  }
  loadPluginById(e) {
    const t = w.plugins.find((a) => a.id === e), r = this.renderRoot.querySelector("#active-panel");
    if (!r || !t) return;
    const {
      element: i,
      icon: n,
      ...s
    } = t, o = document.createElement("template");
    o.innerHTML = i.trim();
    const l = o.content.firstChild;
    if (l instanceof Element) {
      if (Object.entries(s).forEach(([a, d]) => {
        l.setAttribute(a, d);
      }), this.activePlugin) {
        if (this.activePlugin?.hooks) {
          const {
            onUnmount: a
          } = this.activePlugin.hooks;
          a && a(r);
        }
        if (r.innerHTML = "", t.id === this.activePlugin?.id)
          return this.activePlugin = null, null;
      }
      if (r.appendChild(l), t.hooks) {
        const {
          onMount: a
        } = t.hooks;
        a && a(r, l);
      }
      this.activePlugin = t;
    }
  }
  render() {
    return $`
      <div
        class="fixed bottom-4 right-4 justify-center items-end flex flex-col gap-2 z-[999999]"
      >
        <!-- Panel -->
        <div
          id="active-panel"
          class="border border-solid bg-[#15171B] rounded-xl transition-all ease-out translate-x-0 ${this.activePlugin ? "translate-y-0 border-[#6EB7FF] p-4" : "translate-y-10 border-transparent"}"
        ></div>
        <!-- Bar -->
        <div
          class="bg-[#15171B] rounded-full px-6 py-4 border border-[#343330] border-solid transition-all inline-flex"
        >
          <div
            class="flex justify-start items-center ${w.plugins.length > 0 ? "gap-2" : ""}"
          >
            <pandora-logo
              classes="max-h-4 w-full transition-all"
            ></pandora-logo>
            <div
              class="flex border-l border-[#343330] border-solid justify-center items-center gap-4 ${w.plugins.length > 0 ? "pl-2" : ""}"
            >
              ${w.plugins.map((e) => {
      const t = this.activePlugin?.id === e.id, r = customElements.get(e.type), i = e.icon || r?.Icon && r?.Icon(e) || "";
      return $`<div
                  id="${e.id}-${e.type}"
                  class="relative flex justify-center items-center group select-none"
                  @click="${(n) => {
        n.stopPropagation(), this.loadPluginById(e.id);
      }}"
                >
                  <div
                    class="transition-all absolute bg-gradient-to-b from-0% from-[#008CFF] to-[#3F55FF] to-100% rounded-full ${t ? "scale-110 size-6 opacity-100" : "scale-100 size-0 opacity-0"}"
                  ></div>
                  <div
                    class="relative size-5 [&>img,&>svg]:size-5 transition-all cursor-pointer ${t ? "text-[#F7F9FB] scale-80" : "text-[#F7F9FB]/60 hover:text-[#6EB7FF] scale-100 group-hover:scale-110"}"
                  >
                    ${ze(i)}
                  </div>
                </div>`;
    })}
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
w.plugins = [];
Et([qt()], w.prototype, "activePlugin", 2);
Et([H({
  type: String,
  attribute: "site-id"
})], w.prototype, "siteId", 2);
w = Et([M(S)], w);
var dr = Object.defineProperty, ur = Object.getOwnPropertyDescriptor, ee = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? ur(t, r) : t, s = e.length - 1, o; s >= 0; s--) (o = e[s]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && dr(t, r, n), n;
};
let gt = class extends k {
  constructor() {
    super(...arguments), this.classes = "size-10";
  }
  render() {
    const e = "#3EA8FF";
    return $`
      <svg
        class="${this.classes}"
        viewBox="0 0 94 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.579102 7.00818C0.579102 3.41833 3.48974 0.508179 7.0802 0.508179C10.6707 0.508179 13.5813 3.41833 13.5813 7.00818C13.5813 10.598 10.6707 13.5082 7.0802 13.5082L0.579102 13.5082L0.579102 7.00818Z"
          fill="url(#paint0_linear_61_44)"
        />
        <path
          d="M91.4494 9.29318H88.8294L88.4094 10.5332H86.6194L89.1594 3.51318H91.1394L93.6794 10.5332H91.8694L91.4494 9.29318ZM91.0094 7.97318L90.1394 5.40318L89.2794 7.97318H91.0094Z"
          fill=${e}
        />
        <path
          d="M80.0168 10.5332L78.5568 7.88318H78.1468V10.5332H76.4368V3.51318H79.3068C79.8601 3.51318 80.3301 3.60985 80.7168 3.80318C81.1101 3.99652 81.4034 4.26318 81.5968 4.60318C81.7901 4.93652 81.8868 5.30985 81.8868 5.72318C81.8868 6.18985 81.7534 6.60652 81.4868 6.97318C81.2268 7.33985 80.8401 7.59985 80.3268 7.75318L81.9468 10.5332H80.0168ZM78.1468 6.67318H79.2068C79.5201 6.67318 79.7534 6.59652 79.9068 6.44318C80.0668 6.28985 80.1468 6.07318 80.1468 5.79318C80.1468 5.52652 80.0668 5.31652 79.9068 5.16318C79.7534 5.00985 79.5201 4.93318 79.2068 4.93318H78.1468V6.67318Z"
          fill=${e}
        />
        <path
          d="M67.7763 10.6032C67.1163 10.6032 66.5096 10.4499 65.9563 10.1432C65.4096 9.83654 64.9729 9.40987 64.6463 8.86321C64.3263 8.30987 64.1663 7.68987 64.1663 7.00321C64.1663 6.31654 64.3263 5.69987 64.6463 5.15321C64.9729 4.60654 65.4096 4.17987 65.9563 3.87321C66.5096 3.56654 67.1163 3.41321 67.7763 3.41321C68.4363 3.41321 69.0396 3.56654 69.5863 3.87321C70.1396 4.17987 70.5729 4.60654 70.8863 5.15321C71.2063 5.69987 71.3663 6.31654 71.3663 7.00321C71.3663 7.68987 71.2063 8.30987 70.8863 8.86321C70.5663 9.40987 70.1329 9.83654 69.5863 10.1432C69.0396 10.4499 68.4363 10.6032 67.7763 10.6032ZM67.7763 9.04321C68.3363 9.04321 68.7829 8.85654 69.1163 8.48321C69.4563 8.10987 69.6263 7.61654 69.6263 7.00321C69.6263 6.38321 69.4563 5.88987 69.1163 5.52321C68.7829 5.14987 68.3363 4.96321 67.7763 4.96321C67.2096 4.96321 66.7563 5.14654 66.4163 5.51321C66.0829 5.87987 65.9163 6.37654 65.9163 7.00321C65.9163 7.62321 66.0829 8.11987 66.4163 8.49321C66.7563 8.85987 67.2096 9.04321 67.7763 9.04321Z"
          fill=${e}
        />
        <path
          d="M55.7015 3.51318C56.4415 3.51318 57.0882 3.65985 57.6415 3.95318C58.1949 4.24652 58.6215 4.65985 58.9215 5.19318C59.2282 5.71985 59.3815 6.32985 59.3815 7.02318C59.3815 7.70985 59.2282 8.31985 58.9215 8.85318C58.6215 9.38652 58.1915 9.79985 57.6315 10.0932C57.0782 10.3865 56.4349 10.5332 55.7015 10.5332H53.0715V3.51318H55.7015ZM55.5915 9.05318C56.2382 9.05318 56.7415 8.87652 57.1015 8.52318C57.4615 8.16985 57.6415 7.66985 57.6415 7.02318C57.6415 6.37652 57.4615 5.87318 57.1015 5.51318C56.7415 5.15318 56.2382 4.97318 55.5915 4.97318H54.7815V9.05318H55.5915Z"
          fill=${e}
        />
        <path
          d="M47.7129 10.5332H46.0029L43.1429 6.20318V10.5332H41.4329V3.51318H43.1429L46.0029 7.86318V3.51318H47.7129V10.5332Z"
          fill=${e}
        />
        <path
          d="M34.3107 9.29318H31.6907L31.2707 10.5332H29.4807L32.0207 3.51318H34.0007L36.5407 10.5332H34.7307L34.3107 9.29318ZM33.8707 7.97318L33.0007 5.40318L32.1407 7.97318H33.8707Z"
          fill=${e}
        />
        <path
          d="M24.9313 5.77318C24.9313 6.17985 24.838 6.55318 24.6513 6.89318C24.4646 7.22652 24.178 7.49652 23.7913 7.70318C23.4046 7.90985 22.9246 8.01318 22.3513 8.01318H21.2913V10.5332H19.5813V3.51318H22.3513C22.9113 3.51318 23.3846 3.60985 23.7713 3.80318C24.158 3.99652 24.448 4.26318 24.6413 4.60318C24.8346 4.94318 24.9313 5.33318 24.9313 5.77318ZM22.2213 6.65318C22.548 6.65318 22.7913 6.57652 22.9513 6.42318C23.1113 6.26985 23.1913 6.05318 23.1913 5.77318C23.1913 5.49318 23.1113 5.27652 22.9513 5.12318C22.7913 4.96985 22.548 4.89318 22.2213 4.89318H21.2913V6.65318H22.2213Z"
          fill=${e}
        />
        <defs>
          <linearGradient
            id="paint0_linear_61_44"
            x1="0.579102"
            y1="13.5082"
            x2="15.8791"
            y2="-1.89442"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="${"#008CFF"}" />
            <stop offset="1" stop-color="${"#3F55FF"}" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
};
ee([H()], gt.prototype, "classes", 2);
gt = ee([M("pandora-logo")], gt);
var hr = Object.defineProperty, pr = Object.getOwnPropertyDescriptor, re = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? pr(t, r) : t, s = e.length - 1, o; s >= 0; s--) (o = e[s]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && hr(t, r, n), n;
};
let Ct = class extends k {
  constructor() {
    super(...arguments), this.link = void 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.openLink();
  }
  openLink() {
    this.link && window.open(this.link, "_blank");
  }
  async handleOnCreateLinkClick() {
    const e = prompt("Enter the link you want to create") ?? "";
    if (e) {
      const t = {
        property: tt.get().siteId,
        type: "pandora-link",
        attributes: {
          element: "<pandora-link></pandora-link>",
          link: e
        }
      }, r = await te(t);
      document.dispatchEvent(new CustomEvent(W.plugin.register, {
        detail: r,
        bubbles: !0
      }));
    }
  }
  static Icon(e) {
    return `<img src="https://www.google.com/s2/favicons?domain_url=${e.link}"></img>`;
  }
  render() {
    return this.link ? $`<div>
      <span @click="${this.openLink}" class="cursor-pointer hover:underline"
        >Open Link</span
      >
    </div>` : $`<svg
        xmlns="http://www.w3.org/2000/svg"
        @click="${this.handleOnCreateLinkClick}"
        class="size-6 cursor-pointer"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path
          d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM144.56,173.66l-21.45,21.45a44,44,0,0,1-62.22-62.22l21.45-21.46a8,8,0,0,1,11.32,11.31L72.2,144.2a28,28,0,0,0,39.6,39.6l21.45-21.46a8,8,0,0,1,11.31,11.32Zm-34.9-16a8,8,0,0,1-11.32-11.32l48-48a8,8,0,0,1,11.32,11.32Zm85.45-34.55-21.45,21.45a8,8,0,0,1-11.32-11.31L183.8,111.8a28,28,0,0,0-39.6-39.6L122.74,93.66a8,8,0,0,1-11.31-11.32l21.46-21.45a44,44,0,0,1,62.22,62.22Z"
        ></path>
      </svg>`;
  }
};
re([H()], Ct.prototype, "link", 2);
Ct = re([M("pandora-link")], Ct);
var fr = Object.defineProperty, gr = Object.getOwnPropertyDescriptor, At = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? gr(t, r) : t, s = e.length - 1, o; s >= 0; s--) (o = e[s]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && fr(t, r, n), n;
};
let et = class extends k {
  constructor() {
    super(...arguments), this.heading = void 0, this.note = void 0;
  }
  async handleOnCreateNoteClick() {
    const e = prompt("Enter your note title") ?? "", t = prompt("Enter your note") ?? "";
    if (e && t) {
      const r = {
        property: tt.get().siteId,
        type: "pandora-note",
        attributes: {
          element: "<pandora-note></pandora-note>",
          heading: e,
          note: t
        }
      }, i = await te(r);
      document.dispatchEvent(new CustomEvent(W.plugin.register, {
        detail: i,
        bubbles: !0
      }));
    }
  }
  static Icon(e) {
    return '<svg viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M0.410156 1.09937C0.410156 1.39676 0.651234 1.63784 0.948618 1.63784C1.94171 1.63784 2.60697 1.88611 3.01712 2.24499C3.41785 2.59564 3.64093 3.10919 3.64093 3.79168V7.02245H2.29477C1.99739 7.02245 1.75631 7.26353 1.75631 7.56091C1.75631 7.8583 1.99739 8.09938 2.29477 8.09938H3.64093V11.3301C3.64093 12.0126 3.41785 12.5262 3.01712 12.8768C2.60697 13.2357 1.94171 13.484 0.948618 13.484C0.651234 13.484 0.410156 13.7251 0.410156 14.0225C0.410156 14.3198 0.651234 14.5609 0.948618 14.5609C2.10938 14.5609 3.0595 14.2707 3.72627 13.6873C3.9012 13.5342 4.05197 13.3651 4.17939 13.1822C4.30681 13.3651 4.45758 13.5342 4.6325 13.6873C5.29928 14.2707 6.2494 14.5609 7.41016 14.5609C7.70754 14.5609 7.94862 14.3198 7.94862 14.0225C7.94862 13.7251 7.70754 13.484 7.41016 13.484C6.41707 13.484 5.75181 13.2357 5.34166 12.8768C4.94092 12.5262 4.71785 12.0126 4.71785 11.3301V8.09938H6.064C6.36139 8.09938 6.60247 7.8583 6.60247 7.56091C6.60247 7.26353 6.36139 7.02245 6.064 7.02245H4.71785V3.79168C4.71785 3.10919 4.94092 2.59564 5.34166 2.24499C5.75181 1.88611 6.41707 1.63784 7.41016 1.63784C7.70754 1.63784 7.94862 1.39676 7.94862 1.09937C7.94862 0.801991 7.70754 0.560913 7.41016 0.560913C6.2494 0.560913 5.29928 0.851097 4.6325 1.43453C4.45758 1.58758 4.30681 1.75676 4.17939 1.93962C4.05197 1.75676 3.90119 1.58758 3.72627 1.43453C3.0595 0.851097 2.10938 0.560913 0.948618 0.560913C0.651234 0.560913 0.410156 0.801991 0.410156 1.09937Z" fill="currentColor"/></svg>';
  }
  render() {
    return !this.heading || !this.note ? $`<svg
        @click="${this.handleOnCreateNoteClick}"
        class="size-6 cursor-pointer"
        viewBox="0 0 8 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.410156 1.09937C0.410156 1.39676 0.651234 1.63784 0.948618 1.63784C1.94171 1.63784 2.60697 1.88611 3.01712 2.24499C3.41785 2.59564 3.64093 3.10919 3.64093 3.79168V7.02245H2.29477C1.99739 7.02245 1.75631 7.26353 1.75631 7.56091C1.75631 7.8583 1.99739 8.09938 2.29477 8.09938H3.64093V11.3301C3.64093 12.0126 3.41785 12.5262 3.01712 12.8768C2.60697 13.2357 1.94171 13.484 0.948618 13.484C0.651234 13.484 0.410156 13.7251 0.410156 14.0225C0.410156 14.3198 0.651234 14.5609 0.948618 14.5609C2.10938 14.5609 3.0595 14.2707 3.72627 13.6873C3.9012 13.5342 4.05197 13.3651 4.17939 13.1822C4.30681 13.3651 4.45758 13.5342 4.6325 13.6873C5.29928 14.2707 6.2494 14.5609 7.41016 14.5609C7.70754 14.5609 7.94862 14.3198 7.94862 14.0225C7.94862 13.7251 7.70754 13.484 7.41016 13.484C6.41707 13.484 5.75181 13.2357 5.34166 12.8768C4.94092 12.5262 4.71785 12.0126 4.71785 11.3301V8.09938H6.064C6.36139 8.09938 6.60247 7.8583 6.60247 7.56091C6.60247 7.26353 6.36139 7.02245 6.064 7.02245H4.71785V3.79168C4.71785 3.10919 4.94092 2.59564 5.34166 2.24499C5.75181 1.88611 6.41707 1.63784 7.41016 1.63784C7.70754 1.63784 7.94862 1.39676 7.94862 1.09937C7.94862 0.801991 7.70754 0.560913 7.41016 0.560913C6.2494 0.560913 5.29928 0.851097 4.6325 1.43453C4.45758 1.58758 4.30681 1.75676 4.17939 1.93962C4.05197 1.75676 3.90119 1.58758 3.72627 1.43453C3.0595 0.851097 2.10938 0.560913 0.948618 0.560913C0.651234 0.560913 0.410156 0.801991 0.410156 1.09937Z"
          fill="currentColor"
        />
      </svg>` : $`<div
        class="w-96 h-auto min-h-56 max-h-96 overflow-auto inline-flex flex-col"
      >
        <svg
          class="size-5 text-[#6EB7FF] shrink-0"
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.410156 1.09937C0.410156 1.39676 0.651234 1.63784 0.948618 1.63784C1.94171 1.63784 2.60697 1.88611 3.01712 2.24499C3.41785 2.59564 3.64093 3.10919 3.64093 3.79168V7.02245H2.29477C1.99739 7.02245 1.75631 7.26353 1.75631 7.56091C1.75631 7.8583 1.99739 8.09938 2.29477 8.09938H3.64093V11.3301C3.64093 12.0126 3.41785 12.5262 3.01712 12.8768C2.60697 13.2357 1.94171 13.484 0.948618 13.484C0.651234 13.484 0.410156 13.7251 0.410156 14.0225C0.410156 14.3198 0.651234 14.5609 0.948618 14.5609C2.10938 14.5609 3.0595 14.2707 3.72627 13.6873C3.9012 13.5342 4.05197 13.3651 4.17939 13.1822C4.30681 13.3651 4.45758 13.5342 4.6325 13.6873C5.29928 14.2707 6.2494 14.5609 7.41016 14.5609C7.70754 14.5609 7.94862 14.3198 7.94862 14.0225C7.94862 13.7251 7.70754 13.484 7.41016 13.484C6.41707 13.484 5.75181 13.2357 5.34166 12.8768C4.94092 12.5262 4.71785 12.0126 4.71785 11.3301V8.09938H6.064C6.36139 8.09938 6.60247 7.8583 6.60247 7.56091C6.60247 7.26353 6.36139 7.02245 6.064 7.02245H4.71785V3.79168C4.71785 3.10919 4.94092 2.59564 5.34166 2.24499C5.75181 1.88611 6.41707 1.63784 7.41016 1.63784C7.70754 1.63784 7.94862 1.39676 7.94862 1.09937C7.94862 0.801991 7.70754 0.560913 7.41016 0.560913C6.2494 0.560913 5.29928 0.851097 4.6325 1.43453C4.45758 1.58758 4.30681 1.75676 4.17939 1.93962C4.05197 1.75676 3.90119 1.58758 3.72627 1.43453C3.0595 0.851097 2.10938 0.560913 0.948618 0.560913C0.651234 0.560913 0.410156 0.801991 0.410156 1.09937Z"
            fill="currentColor"
          />
        </svg>
        <textarea
          class="font-bold text-white m-0 uppercase text-lg field-sizing-content h-auto shrink-0 resize-none focus:outline-none"
          rows="3"
        >
${this.heading}</textarea
        >
        <textarea
          class="grow m-0 text-white/80 field-sizing-content w-full h-auto shrink-0 resize-none focus:outline-none"
        >
${this.note}</textarea
        >
      </div>`;
  }
};
At([H()], et.prototype, "heading", 2);
At([H()], et.prototype, "note", 2);
et = At([M("pandora-note")], et);
function ut(...e) {
  console.log("%cPandora%c%s", "display: flex; flex-direction: row; align-items: center; padding: 5px 10px; background: linear-gradient(44.81deg, #008CFF 0%, #3F55FF 118.08%); border: 1px solid #343330; border-radius: 60px;", "display: flex; flex-direction: row; align-items: center; padding: 5px 10px; background: #15171B; border: 1px solid #343330; border-radius: 60px;", ...e);
}
var Cr = Object.getOwnPropertyDescriptor, vr = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? Cr(t, r) : t, s = e.length - 1, o; s >= 0; s--) (o = e[s]) && (n = o(n) || n);
  return n;
};
let Ut = class extends k {
  static Icon() {
    return '<svg viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.47261 1.31531e-06C2.88826 1.31531e-06 2.31703 0.173282 1.83116 0.497932C1.34528 0.822581 0.966592 1.28402 0.742969 1.82389C0.519347 2.36376 0.460837 2.95782 0.574838 3.53095C0.68884 4.10407 0.970233 4.63052 1.38343 5.04372C1.79663 5.45692 2.32308 5.73832 2.89621 5.85232C3.46934 5.96632 4.0634 5.90781 4.60327 5.68419C5.14314 5.46057 5.60458 5.08188 5.92923 4.596C6.25388 4.11013 6.42716 3.5389 6.42716 2.95455C6.42716 2.17095 6.11588 1.41945 5.56179 0.865367C5.00771 0.311283 4.25621 1.31531e-06 3.47261 1.31531e-06ZM3.47261 4.72727C3.122 4.72727 2.77926 4.6233 2.48774 4.42851C2.19621 4.23372 1.969 3.95686 1.83483 3.63294C1.70065 3.30902 1.66555 2.95258 1.73395 2.6087C1.80235 2.26483 1.97118 1.94896 2.21911 1.70104C2.46703 1.45312 2.7829 1.28428 3.12677 1.21588C3.47065 1.14748 3.82708 1.18259 4.15101 1.31676C4.47493 1.45093 4.75179 1.67815 4.94658 1.96967C5.14137 2.2612 5.24534 2.60393 5.24534 2.95455C5.24534 3.4247 5.05857 3.8756 4.72612 4.20805C4.39367 4.5405 3.94277 4.72727 3.47261 4.72727ZM10.5635 5.90909C11.1479 5.90909 11.7191 5.73581 12.205 5.41116C12.6908 5.08651 13.0695 4.62507 13.2932 4.0852C13.5168 3.54533 13.5753 2.95127 13.4613 2.37814C13.3473 1.80502 13.0659 1.27857 12.6527 0.865367C12.2395 0.452167 11.713 0.170774 11.1399 0.0567721C10.5668 -0.0572297 9.97274 0.00128016 9.43286 0.224903C8.89299 0.448525 8.43155 0.827217 8.10691 1.31309C7.78226 1.79896 7.60897 2.37019 7.60897 2.95455C7.60897 3.73814 7.92026 4.48964 8.47434 5.04372C9.02843 5.59781 9.77993 5.90909 10.5635 5.90909ZM10.5635 1.18182C10.9141 1.18182 11.2569 1.28579 11.5484 1.48058C11.8399 1.67537 12.0671 1.95223 12.2013 2.27615C12.3355 2.60008 12.3706 2.95651 12.3022 3.30039C12.2338 3.64426 12.0649 3.96013 11.817 4.20805C11.5691 4.45597 11.2532 4.62481 10.9094 4.69321C10.5655 4.76161 10.209 4.72651 9.88513 4.59233C9.5612 4.45816 9.28434 4.23094 9.08955 3.93942C8.89476 3.6479 8.79079 3.30516 8.79079 2.95455C8.79079 2.48439 8.97756 2.03349 9.31001 1.70104C9.64246 1.36859 10.0934 1.18182 10.5635 1.18182ZM3.47261 7.09091C2.88826 7.09091 2.31703 7.26419 1.83116 7.58884C1.34528 7.91349 0.966592 8.37493 0.742969 8.9148C0.519347 9.45467 0.460837 10.0487 0.574838 10.6219C0.68884 11.195 0.970233 11.7214 1.38343 12.1346C1.79663 12.5478 2.32308 12.8292 2.89621 12.9432C3.46934 13.0572 4.0634 12.9987 4.60327 12.7751C5.14314 12.5515 5.60458 12.1728 5.92923 11.6869C6.25388 11.201 6.42716 10.6298 6.42716 10.0455C6.42716 9.26186 6.11588 8.51036 5.56179 7.95627C5.00771 7.40219 4.25621 7.09091 3.47261 7.09091ZM3.47261 11.8182C3.122 11.8182 2.77926 11.7142 2.48774 11.5194C2.19621 11.3246 1.969 11.0478 1.83483 10.7238C1.70065 10.3999 1.66555 10.0435 1.73395 9.69961C1.80235 9.35574 1.97118 9.03987 2.21911 8.79195C2.46703 8.54403 2.7829 8.37519 3.12677 8.30679C3.47065 8.23839 3.82708 8.27349 4.15101 8.40767C4.47493 8.54184 4.75179 8.76906 4.94658 9.06058C5.14137 9.3521 5.24534 9.69484 5.24534 10.0455C5.24534 10.5156 5.05857 10.9665 4.72612 11.299C4.39367 11.6314 3.94277 11.8182 3.47261 11.8182ZM13.5181 10.0455C13.5181 10.2022 13.4558 10.3525 13.345 10.4633C13.2342 10.5741 13.0839 10.6364 12.9272 10.6364H11.1544V12.4091C11.1544 12.5658 11.0922 12.7161 10.9814 12.8269C10.8705 12.9377 10.7202 13 10.5635 13C10.4068 13 10.2565 12.9377 10.1457 12.8269C10.0349 12.7161 9.97261 12.5658 9.97261 12.4091V10.6364H8.19988C8.04317 10.6364 7.89286 10.5741 7.78205 10.4633C7.67123 10.3525 7.60897 10.2022 7.60897 10.0455C7.60897 9.88873 7.67123 9.73843 7.78205 9.62762C7.89286 9.5168 8.04317 9.45454 8.19988 9.45454H9.97261V7.68182C9.97261 7.5251 10.0349 7.3748 10.1457 7.26398C10.2565 7.15316 10.4068 7.09091 10.5635 7.09091C10.7202 7.09091 10.8705 7.15316 10.9814 7.26398C11.0922 7.3748 11.1544 7.5251 11.1544 7.68182V9.45454H12.9272C13.0839 9.45454 13.2342 9.5168 13.345 9.62762C13.4558 9.73843 13.5181 9.88873 13.5181 10.0455Z" fill="currentColor"/></svg>';
  }
  render() {
    return $`
      <div class="flex flex-col gap-4">
        <pandora-link
          class="text-[#F7F9FB]/60 hover:text-[#6EB7FF] scale-100 hover:scale-110"
        ></pandora-link>
        <pandora-note
          class="text-[#F7F9FB]/60 hover:text-[#6EB7FF] scale-100 hover:scale-110"
        ></pandora-note>
      </div>
    `;
  }
};
Ut = vr([M("pandora-installer")], Ut);
customElements.whenDefined(S).then(() => {
  customElements.get(S).registerPlugin({
    id: "pandora-installer",
    type: "pandora-installer",
    label: "Installer Plugin",
    element: "<pandora-installer></pandora-installer>",
    hooks: {
      onReady: () => ut("Installer is initialized!"),
      onMount: (e) => ut("Installer is mounted!"),
      onUnmount: (e, t) => ut("Installer is destroyed")
    }
  });
});
var mr = Object.defineProperty, wr = Object.getOwnPropertyDescriptor, ie = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? wr(t, r) : t, s = e.length - 1, o; s >= 0; s--) (o = e[s]) && (n = (i ? o(t, r, n) : o(n)) || n);
  return i && n && mr(t, r, n), n;
};
let vt = class extends k {
  constructor() {
    super(), this.count = 0, this.originalConsoleError = console.error, this.overrideConsoleError(), this.attachGlobalListeners();
  }
  overrideConsoleError() {
    console.error = (...e) => {
      this.incrementCount(), this.originalConsoleError.apply(console, e);
    };
  }
  attachGlobalListeners() {
    window.addEventListener("error", () => this.incrementCount()), window.addEventListener("unhandledrejection", () => this.incrementCount());
  }
  incrementCount() {
    this.count += 1, document.dispatchEvent(new CustomEvent(W.plugin.icon.update, {
      detail: {
        id: "pandora-tracer",
        icon: `<span>${this.count}</span>`
      },
      bubbles: !0
    }));
  }
  render() {
    return $`<div class="text-white">Console Errors: ${this.count}</div>`;
  }
};
ie([qt()], vt.prototype, "count", 2);
vt = ie([M("pandora-tracer")], vt);
customElements.whenDefined(S).then(() => {
  customElements.get(S).registerPlugin({
    id: "pandora-tracer",
    label: "Tracer",
    element: "<pandora-tracer />",
    icon: '<svg viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.98057 3.51791C6.39094 3.51791 5.81456 3.69275 5.3243 4.02033C4.83404 4.34792 4.45193 4.81352 4.22629 5.35827C4.00064 5.90301 3.94161 6.50244 4.05664 7.08074C4.17167 7.65904 4.4556 8.19024 4.87253 8.60717C5.28946 9.0241 5.82067 9.30804 6.39897 9.42307C6.97727 9.5381 7.57669 9.47906 8.12144 9.25342C8.66619 9.02778 9.13179 8.64567 9.45937 8.15541C9.78695 7.66515 9.9618 7.08876 9.9618 6.49913C9.96097 5.70871 9.64662 4.9509 9.08771 4.392C8.5288 3.83309 7.77099 3.51873 6.98057 3.51791ZM6.98057 8.48661C6.58749 8.48661 6.20323 8.37005 5.87639 8.15166C5.54955 7.93327 5.29481 7.62287 5.14438 7.25971C4.99395 6.89654 4.9546 6.49692 5.03128 6.11139C5.10797 5.72586 5.29726 5.37172 5.57521 5.09377C5.85317 4.81581 6.2073 4.62652 6.59284 4.54984C6.97837 4.47315 7.37799 4.51251 7.74115 4.66294C8.10431 4.81336 8.41472 5.0681 8.6331 5.39494C8.85149 5.72178 8.96806 6.10604 8.96806 6.49913C8.96806 7.02624 8.75866 7.53176 8.38594 7.90449C8.01321 8.27722 7.50769 8.48661 6.98057 8.48661ZM12.4461 6.63328C12.4486 6.54385 12.4486 6.45441 12.4461 6.36497L13.3728 5.20727C13.4214 5.14648 13.455 5.07513 13.471 4.99897C13.487 4.92281 13.4848 4.84396 13.4647 4.76878C13.3128 4.19775 13.0856 3.64949 12.789 3.13842C12.7502 3.07154 12.6962 3.01465 12.6315 2.97228C12.5669 2.9299 12.4932 2.90321 12.4163 2.89434L10.9431 2.73037C10.8818 2.66578 10.8197 2.60367 10.7568 2.54404L10.5829 1.0671C10.5739 0.990213 10.5472 0.916483 10.5047 0.851784C10.4622 0.787085 10.4052 0.733206 10.3382 0.694443C9.82692 0.3984 9.2787 0.171384 8.70782 0.0193209C8.63259 -0.00068005 8.55371 -0.00272573 8.47755 0.0133487C8.40139 0.0294231 8.33006 0.0631679 8.26933 0.111863L7.11473 1.03356C7.02529 1.03356 6.93586 1.03356 6.84642 1.03356L5.68871 0.108758C5.62793 0.0601688 5.55658 0.0265366 5.48042 0.0105705C5.40425 -0.00539564 5.32541 -0.0032494 5.25022 0.0168365C4.67929 0.16902 4.13106 0.396249 3.61987 0.69258C3.55299 0.731414 3.4961 0.785324 3.45372 0.850019C3.41135 0.914713 3.38466 0.988406 3.37578 1.06523L3.21181 2.54094C3.14722 2.60263 3.08511 2.66474 3.02549 2.72726L1.54854 2.89682C1.47166 2.90577 1.39793 2.93255 1.33323 2.97503C1.26853 3.01752 1.21465 3.07453 1.17589 3.14153C0.879845 3.65279 0.65283 4.20101 0.500766 4.77188C0.480765 4.84711 0.47872 4.92599 0.494794 5.00215C0.510868 5.07832 0.544613 5.14964 0.593308 5.21037L1.515 6.36497C1.515 6.45441 1.515 6.54385 1.515 6.63328L0.590203 7.79099C0.541614 7.85178 0.507982 7.92312 0.492016 7.99929C0.47605 8.07545 0.478196 8.1543 0.498282 8.22948C0.650193 8.80051 0.877437 9.34877 1.17403 9.85983C1.21286 9.92671 1.26677 9.98361 1.33146 10.026C1.39616 10.0684 1.46985 10.095 1.54668 10.1039L3.0199 10.2679C3.08159 10.3325 3.1437 10.3946 3.20622 10.4542L3.37827 11.9312C3.38721 12.008 3.41399 12.0818 3.45648 12.1465C3.49896 12.2112 3.55598 12.2651 3.62297 12.3038C4.13423 12.5999 4.68245 12.8269 5.25333 12.9789C5.32856 12.9989 5.40743 13.001 5.4836 12.9849C5.55976 12.9688 5.63109 12.9351 5.69182 12.8864L6.84642 11.9647C6.93586 11.9672 7.02529 11.9672 7.11473 11.9647L8.27244 12.8914C8.33322 12.94 8.40457 12.9736 8.48073 12.9896C8.5569 13.0055 8.63574 13.0034 8.71093 12.9833C9.28195 12.8314 9.83022 12.6041 10.3413 12.3075C10.4082 12.2687 10.4651 12.2148 10.5074 12.1501C10.5498 12.0854 10.5765 12.0117 10.5854 11.9349L10.7493 10.4617C10.8139 10.4004 10.876 10.3383 10.9357 10.2753L12.4126 10.1014C12.4895 10.0925 12.5632 10.0657 12.6279 10.0232C12.6926 9.98074 12.7465 9.92373 12.7853 9.85673C13.0813 9.34547 13.3083 8.79725 13.4604 8.22637C13.4804 8.15114 13.4824 8.07227 13.4664 7.9961C13.4503 7.91994 13.4165 7.84862 13.3678 7.78789L12.4461 6.63328ZM11.4462 6.22958C11.4568 6.40912 11.4568 6.58913 11.4462 6.76868C11.4388 6.89161 11.4773 7.0129 11.5543 7.10904L12.4356 8.21023C12.3345 8.53162 12.205 8.84339 12.0487 9.14186L10.645 9.30086C10.5228 9.31443 10.4099 9.37285 10.3282 9.46482C10.2087 9.59928 10.0813 9.72662 9.94689 9.84617C9.85491 9.92782 9.79649 10.0407 9.78292 10.1629L9.62703 11.5653C9.3286 11.7217 9.01682 11.8512 8.6954 11.9523L7.59359 11.071C7.50542 11.0005 7.3959 10.9622 7.28304 10.9623H7.25323C7.07369 10.9728 6.89367 10.9728 6.71413 10.9623C6.5912 10.9549 6.46991 10.9934 6.37377 11.0703L5.26948 11.9523C4.94809 11.8512 4.63632 11.7217 4.33785 11.5653L4.17885 10.1635C4.16528 10.0413 4.10686 9.92844 4.01488 9.84679C3.88042 9.72724 3.75309 9.5999 3.63353 9.46544C3.55188 9.37347 3.43902 9.31505 3.31678 9.30148L1.91436 9.14496C1.75797 8.84653 1.62848 8.53475 1.52742 8.21333L2.40875 7.11152C2.4857 7.01538 2.52422 6.89409 2.51682 6.77117C2.50626 6.59162 2.50626 6.41161 2.51682 6.23206C2.52422 6.10914 2.4857 5.98785 2.40875 5.89171L1.52742 4.78803C1.62855 4.46664 1.75804 4.15487 1.91436 3.8564L3.31616 3.6974C3.4384 3.68383 3.55126 3.62541 3.63291 3.53344C3.75247 3.39898 3.8798 3.27164 4.01426 3.15209C4.1066 3.07038 4.16526 2.95726 4.17885 2.83471L4.33474 1.43292C4.63318 1.27652 4.94495 1.14703 5.26637 1.04598L6.36818 1.9273C6.46432 2.00426 6.58561 2.04277 6.70854 2.03537C6.88808 2.02481 7.0681 2.02481 7.24764 2.03537C7.37057 2.04277 7.49186 2.00426 7.588 1.9273L8.69167 1.04598C9.01306 1.14711 9.32483 1.2766 9.6233 1.43292L9.7823 2.83471C9.79587 2.95695 9.85429 3.06981 9.94627 3.15147C10.0807 3.27102 10.2081 3.39835 10.3276 3.53281C10.4093 3.62479 10.5221 3.68321 10.6444 3.69678L12.0468 3.85267C12.2032 4.15111 12.3327 4.46289 12.4337 4.78431L11.5524 5.88612C11.4747 5.98307 11.4361 6.10561 11.4443 6.22958H11.4462Z" fill="currentColor"/></svg>'
  });
});
export {
  gt as PandoraAppLogo,
  Ut as PandoraInstaller,
  Ct as PandoraLink,
  et as PandoraNote,
  vt as PandoraTracer,
  w as PandorasBox
};
//# sourceMappingURL=index.js.map
