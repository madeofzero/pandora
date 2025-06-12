var jt = Object.defineProperty, Ht = Object.defineProperties;
var Rt = Object.getOwnPropertyDescriptors;
var H = Object.getOwnPropertySymbols, Nt = Object.getPrototypeOf, rt = Object.prototype.hasOwnProperty, st = Object.prototype.propertyIsEnumerable, It = Reflect.get;
var it = (s, t, e) => t in s ? jt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, at = (s, t) => {
  for (var e in t || (t = {}))
    rt.call(t, e) && it(s, e, t[e]);
  if (H)
    for (var e of H(t))
      st.call(t, e) && it(s, e, t[e]);
  return s;
}, ot = (s, t) => Ht(s, Rt(t));
var nt = (s, t) => {
  var e = {};
  for (var i in s)
    rt.call(s, i) && t.indexOf(i) < 0 && (e[i] = s[i]);
  if (s != null && H)
    for (var i of H(s))
      t.indexOf(i) < 0 && st.call(s, i) && (e[i] = s[i]);
  return e;
};
var lt = (s, t, e) => It(Nt(s), e, t);
var k = (s, t, e) => new Promise((i, r) => {
  var o = (n) => {
    try {
      l(e.next(n));
    } catch (c) {
      r(c);
    }
  }, a = (n) => {
    try {
      l(e.throw(n));
    } catch (c) {
      r(c);
    }
  }, l = (n) => n.done ? i(n.value) : Promise.resolve(n.value).then(o, a);
  l((e = e.apply(s, t)).next());
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, Q = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, kt = Symbol(), ct = /* @__PURE__ */ new WeakMap();
let Dt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== kt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ct.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ct.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Et = (s) => new Dt(typeof s == "string" ? s : s + "", void 0, kt), St = (s, t) => {
  if (Q) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = R.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, dt = Q ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Et(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Bt, defineProperty: Ft, getOwnPropertyDescriptor: qt, getOwnPropertyNames: Zt, getOwnPropertySymbols: Vt, getPrototypeOf: Wt } = Object, v = globalThis, pt = v.trustedTypes, Gt = pt ? pt.emptyScript : "", F = v.reactiveElementPolyfillSupport, S = (s, t) => s, N = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Gt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch (i) {
        e = null;
      }
  }
  return e;
} }, X = (s, t) => !Bt(s, t), ht = { attribute: !0, type: String, converter: N, reflect: !1, useDefault: !1, hasChanged: X };
var mt, $t;
(mt = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), ($t = v.litPropertyMetadata) != null || (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let x = class extends HTMLElement {
  static addInitializer(t) {
    var e;
    this._$Ei(), ((e = this.l) != null ? e : this.l = []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ht) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Ft(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    var a;
    const { get: r, set: o } = (a = qt(this.prototype, t)) != null ? a : { get() {
      return this[e];
    }, set(l) {
      this[e] = l;
    } };
    return { get: r, set(l) {
      const n = r == null ? void 0 : r.call(this);
      o == null || o.call(this, l), this.requestUpdate(t, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var e;
    return (e = this.elementProperties.get(t)) != null ? e : ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const t = Wt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const e = this.properties, i = [...Zt(e), ...Vt(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(dt(r));
    } else t !== void 0 && e.push(dt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$EO) != null ? e : this._$EO = /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) == null || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) != null ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return St(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t, e;
    (t = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostConnected) == null ? void 0 : r.call(i);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const a = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : N).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, a, l, n;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const c = i.getPropertyOptions(r), d = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((o = c.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? c.converter : N;
      this._$Em = r, this[r] = (n = (l = d.fromAttribute(e, c.type)) != null ? l : (a = this._$Ej) == null ? void 0 : a.get(r)) != null ? n : null, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    var r, o;
    if (t !== void 0) {
      const a = this.constructor, l = this[t];
      if (i != null || (i = a.getPropertyOptions(t)), !(((r = i.hasChanged) != null ? r : X)(l, e) || i.useDefault && i.reflect && l === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: o }, a) {
    var l, n, c;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (n = a != null ? a : e) != null ? n : this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(t));
  }
  _$EP() {
    return k(this, null, function* () {
      this.isUpdatePending = !0;
      try {
        yield this._$ES;
      } catch (e) {
        Promise.reject(e);
      }
      const t = this.scheduleUpdate();
      return t != null && (yield t), !this.isUpdatePending;
    });
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i, r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((i = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, l] of this._$Ep) this[a] = l;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [a, l] of o) {
        const { wrapped: n } = l, c = this[a];
        n !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, l, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (r = this._$EO) == null || r.forEach((o) => {
        var a;
        return (a = o.hostUpdate) == null ? void 0 : a.call(o);
      }), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
var Ct;
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[S("elementProperties")] = /* @__PURE__ */ new Map(), x[S("finalized")] = /* @__PURE__ */ new Map(), F == null || F({ ReactiveElement: x }), ((Ct = v.reactiveElementVersions) != null ? Ct : v.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, I = P.trustedTypes, ut = I ? I.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Pt = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, Tt = "?" + g, Jt = `<${Tt}>`, C = document, T = () => C.createComment(""), O = (s) => s === null || typeof s != "object" && typeof s != "function", Y = Array.isArray, Kt = (s) => Y(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", q = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ft = /-->/g, wt = />/g, b = RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, vt = /"/g, Ot = /^(?:script|style|textarea|title)$/i, Qt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), M = Qt(1), _ = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), m = C.createTreeWalker(C, 129);
function Mt(s, t) {
  if (!Y(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ut !== void 0 ? ut.createHTML(t) : t;
}
const Xt = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = E;
  for (let l = 0; l < e; l++) {
    const n = s[l];
    let c, d, p = -1, f = 0;
    for (; f < n.length && (a.lastIndex = f, d = a.exec(n), d !== null); ) f = a.lastIndex, a === E ? d[1] === "!--" ? a = ft : d[1] !== void 0 ? a = wt : d[2] !== void 0 ? (Ot.test(d[2]) && (r = RegExp("</" + d[2], "g")), a = b) : d[3] !== void 0 && (a = b) : a === b ? d[0] === ">" ? (a = r != null ? r : E, p = -1) : d[1] === void 0 ? p = -2 : (p = a.lastIndex - d[2].length, c = d[1], a = d[3] === void 0 ? b : d[3] === '"' ? vt : gt) : a === vt || a === gt ? a = b : a === ft || a === wt ? a = E : (a = b, r = void 0);
    const w = a === b && s[l + 1].startsWith("/>") ? " " : "";
    o += a === E ? n + Jt : p >= 0 ? (i.push(c), n.slice(0, p) + Pt + n.slice(p) + g + w) : n + g + (p === -2 ? l : w);
  }
  return [Mt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class z {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const l = t.length - 1, n = this.parts, [c, d] = Xt(t, e);
    if (this.el = z.createElement(c, i), m.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = m.nextNode()) !== null && n.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(Pt)) {
          const f = d[a++], w = r.getAttribute(p).split(g), j = /([.?@])?(.*)/.exec(f);
          n.push({ type: 1, index: o, name: j[2], strings: w, ctor: j[1] === "." ? te : j[1] === "?" ? ee : j[1] === "@" ? ie : D }), r.removeAttribute(p);
        } else p.startsWith(g) && (n.push({ type: 6, index: o }), r.removeAttribute(p));
        if (Ot.test(r.tagName)) {
          const p = r.textContent.split(g), f = p.length - 1;
          if (f > 0) {
            r.textContent = I ? I.emptyScript : "";
            for (let w = 0; w < f; w++) r.append(p[w], T()), m.nextNode(), n.push({ type: 2, index: ++o });
            r.append(p[f], T());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Tt) n.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(g, p + 1)) !== -1; ) n.push({ type: 7, index: o }), p += g.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = C.createElement("template");
    return i.innerHTML = t, i;
  }
}
function A(s, t, e = s, i) {
  var a, l, n;
  if (t === _) return t;
  let r = i !== void 0 ? (a = e._$Co) == null ? void 0 : a[i] : e._$Cl;
  const o = O(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? ((n = e._$Co) != null ? n : e._$Co = [])[i] = r : e._$Cl = r), r !== void 0 && (t = A(s, r._$AS(s, t.values), r, i)), t;
}
class Yt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var c;
    const { el: { content: e }, parts: i } = this._$AD, r = ((c = t == null ? void 0 : t.creationScope) != null ? c : C).importNode(e, !0);
    m.currentNode = r;
    let o = m.nextNode(), a = 0, l = 0, n = i[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let d;
        n.type === 2 ? d = new U(o, o.nextSibling, this, t) : n.type === 1 ? d = new n.ctor(o, n.name, n.strings, this, t) : n.type === 6 && (d = new re(o, this, t)), this._$AV.push(d), n = i[++l];
      }
      a !== (n == null ? void 0 : n.index) && (o = m.nextNode(), a++);
    }
    return m.currentNode = C, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class U {
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) == null ? void 0 : t._$AU) != null ? e : this._$Cv;
  }
  constructor(t, e, i, r) {
    var o;
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (o = r == null ? void 0 : r.isConnected) != null ? o : !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = A(this, t, e), O(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== _ && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Kt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = z.createElement(Mt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const a = new Yt(r, this), l = a.u(this.options);
      a.p(e), this.T(l), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = yt.get(t.strings);
    return e === void 0 && yt.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new U(this.O(T()), this.O(T()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class D {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = A(this, t, e, 0), a = !O(t) || t !== this._$AH && t !== _, a && (this._$AH = t);
    else {
      const l = t;
      let n, c;
      for (t = o[0], n = 0; n < o.length - 1; n++) c = A(this, l[i + n], e, n), c === _ && (c = this._$AH[n]), a || (a = !O(c) || c !== this._$AH[n]), c === h ? t = h : t !== h && (t += (c != null ? c : "") + o[n + 1]), this._$AH[n] = c;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class te extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class ee extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class ie extends D {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var a;
    if ((t = (a = A(this, t, e, 0)) != null ? a : h) === _) return;
    const i = this._$AH, r = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== h && (i === h || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) == null ? void 0 : e.host) != null ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class re {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    A(this, t);
  }
}
const Z = P.litHtmlPolyfillSupport;
var _t;
Z == null || Z(z, U), ((_t = P.litHtmlVersions) != null ? _t : P.litHtmlVersions = []).push("3.3.0");
const se = (s, t, e) => {
  var o, a;
  const i = (o = e == null ? void 0 : e.renderBefore) != null ? o : t;
  let r = i._$litPart$;
  if (r === void 0) {
    const l = (a = e == null ? void 0 : e.renderBefore) != null ? a : null;
    i._$litPart$ = r = new U(t.insertBefore(T(), l), l, void 0, e != null ? e : {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = globalThis;
let y = class extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, i;
    const t = super.createRenderRoot();
    return (i = (e = this.renderOptions).renderBefore) != null || (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = se(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return _;
  }
};
var xt;
y._$litElement$ = !0, y.finalized = !0, (xt = $.litElementHydrateSupport) == null || xt.call($, { LitElement: y });
const V = $.litElementPolyfillSupport;
V == null || V({ LitElement: y });
var At;
((At = $.litElementVersions) != null ? At : $.litElementVersions = []).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: X }, oe = (s = ae, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: a } = e;
    return { set(l) {
      const n = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(a, n, s);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(l) {
      const n = this[a];
      t.call(this, l), this.requestUpdate(a, n, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function L(s) {
  return (t, e) => typeof e == "object" ? oe(s, t, e) : ((i, r, o) => {
    const a = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), a ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ne(s) {
  return L(ot(at({}, s), { state: !0, attribute: !1 }));
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = { CHILD: 2 }, ce = (s) => (...t) => ({ _$litDirective$: s, values: t });
class de {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class W extends de {
  constructor(t) {
    if (super(t), this.it = h, t.type !== le.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === h || t == null) return this._t = void 0, this.it = t;
    if (t === _) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
W.directiveName = "unsafeHTML", W.resultType = 1;
const pe = ce(W), he = '/*! tailwindcss v4.1.7 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-border-style:solid;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial;--tw-ease:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-gray-900:oklch(21% .034 264.665);--color-black:#000;--color-white:#fff;--spacing:.25rem;--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--radius-lg:.5rem;--radius-xl:.75rem;--ease-out:cubic-bezier(0,0,.2,1);--blur-xl:24px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.pointer-events-none{pointer-events:none}.collapse{visibility:collapse}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.top-1\\/2{top:50%}.top-full{top:100%}.right-0{right:calc(var(--spacing)*0)}.right-4{right:calc(var(--spacing)*4)}.right-full{right:100%}.-bottom-1\\.5{bottom:calc(var(--spacing)*-1.5)}.-bottom-3\\.5{bottom:calc(var(--spacing)*-3.5)}.bottom-4{bottom:calc(var(--spacing)*4)}.bottom-full{bottom:100%}.left-0{left:calc(var(--spacing)*0)}.left-1\\/2{left:50%}.left-full{left:100%}.z-10{z-index:10}.z-\\[999999\\]{z-index:999999}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.mt-2{margin-top:calc(var(--spacing)*2)}.mr-2{margin-right:calc(var(--spacing)*2)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.ml-2{margin-left:calc(var(--spacing)*2)}.flex{display:flex}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.size-5{width:calc(var(--spacing)*5);height:calc(var(--spacing)*5)}.size-6{width:calc(var(--spacing)*6);height:calc(var(--spacing)*6)}.size-10{width:calc(var(--spacing)*10);height:calc(var(--spacing)*10)}.h-1{height:calc(var(--spacing)*1)}.w-1{width:calc(var(--spacing)*1)}.-translate-x-1\\/2{--tw-translate-x: -50% ;translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-x-0{--tw-translate-x:calc(var(--spacing)*0);translate:var(--tw-translate-x)var(--tw-translate-y)}.-translate-y-1\\/2{--tw-translate-y: -50% ;translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-y-0{--tw-translate-y:calc(var(--spacing)*0);translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-y-10{--tw-translate-y:calc(var(--spacing)*10);translate:var(--tw-translate-x)var(--tw-translate-y)}.scale-100{--tw-scale-x:100%;--tw-scale-y:100%;--tw-scale-z:100%;scale:var(--tw-scale-x)var(--tw-scale-y)}.scale-115{--tw-scale-x:115%;--tw-scale-y:115%;--tw-scale-z:115%;scale:var(--tw-scale-x)var(--tw-scale-y)}.scale-120{--tw-scale-x:120%;--tw-scale-y:120%;--tw-scale-z:120%;scale:var(--tw-scale-x)var(--tw-scale-y)}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.items-center{align-items:center}.items-end{align-items:flex-end}.justify-center{justify-content:center}.justify-start{justify-content:flex-start}.gap-2{gap:calc(var(--spacing)*2)}.overflow-hidden{overflow:hidden}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-solid{--tw-border-style:solid;border-style:solid}.border-white\\/15{border-color:#ffffff26}@supports (color:color-mix(in lab,red,red)){.border-white\\/15{border-color:color-mix(in oklab,var(--color-white)15%,transparent)}}.border-white\\/50{border-color:#ffffff80}@supports (color:color-mix(in lab,red,red)){.border-white\\/50{border-color:color-mix(in oklab,var(--color-white)50%,transparent)}}.bg-\\[\\#FF00A5\\]{background-color:#ff00a5}.bg-black\\/60{background-color:#0009}@supports (color:color-mix(in lab,red,red)){.bg-black\\/60{background-color:color-mix(in oklab,var(--color-black)60%,transparent)}}.bg-gray-900{background-color:var(--color-gray-900)}.bg-gradient-to-b{--tw-gradient-position:to bottom in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.from-\\[\\#0F0F0F\\]{--tw-gradient-from:#0f0f0f;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-0\\%{--tw-gradient-from-position:0%}.to-black{--tw-gradient-to:var(--color-black);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-100\\%{--tw-gradient-to-position:100%}.object-contain{object-fit:contain}.p-4{padding:calc(var(--spacing)*4)}.px-2{padding-inline:calc(var(--spacing)*2)}.px-4{padding-inline:calc(var(--spacing)*4)}.py-1{padding-block:calc(var(--spacing)*1)}.py-4{padding-block:calc(var(--spacing)*4)}.pl-2{padding-left:calc(var(--spacing)*2)}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-white{color:var(--color-white)}.opacity-0{opacity:0}.opacity-70{opacity:.7}.opacity-100{opacity:1}.grayscale{--tw-grayscale:grayscale(100%);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.grayscale-0{--tw-grayscale:grayscale(0%);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.backdrop-blur-xl{--tw-backdrop-blur:blur(var(--blur-xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.duration-200{--tw-duration:.2s;transition-duration:.2s}.duration-300{--tw-duration:.3s;transition-duration:.3s}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}@media (hover:hover){.group-hover\\:opacity-100:is(:where(.group):hover *){opacity:1}.hover\\:scale-105:hover{--tw-scale-x:105%;--tw-scale-y:105%;--tw-scale-z:105%;scale:var(--tw-scale-x)var(--tw-scale-y)}.hover\\:scale-120:hover{--tw-scale-x:120%;--tw-scale-y:120%;--tw-scale-z:120%;scale:var(--tw-scale-x)var(--tw-scale-y)}.hover\\:scale-135:hover{--tw-scale-x:135%;--tw-scale-y:135%;--tw-scale-z:135%;scale:var(--tw-scale-x)var(--tw-scale-y)}.hover\\:opacity-100:hover{opacity:1}.hover\\:grayscale-0:hover{--tw-grayscale:grayscale(0%);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}', ue = Et(he), tt = (s) => class extends s {
  connectedCallback() {
    super.connectedCallback(), this.shadowRoot && St(this.shadowRoot, [ue]);
  }
};
var fe = Object.defineProperty, we = Object.getOwnPropertyDescriptor, zt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? we(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && fe(t, e, r), r;
};
const ge = tt(y);
let G = class extends ge {
  constructor() {
    super(...arguments), this.classes = "size-10";
  }
  render() {
    return M`
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
};
zt([
  L()
], G.prototype, "classes", 2);
G = zt([
  B("app-logo")
], G);
var ve = Object.defineProperty, ye = Object.getOwnPropertyDescriptor, Ut = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ye(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && ve(t, e, r), r;
};
let J = class extends y {
  constructor() {
    super(...arguments), this.link = "";
  }
  connectedCallback() {
    window.open(this.link, "_blank");
  }
  render() {
    return M`<p>${this.link}</p>`;
  }
};
Ut([
  L()
], J.prototype, "link", 2);
J = Ut([
  B("pandora-link")
], J);
var be = Object.defineProperty, me = Object.getOwnPropertyDescriptor, Lt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? me(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && be(t, e, r), r;
};
const $e = tt(y);
let K = class extends $e {
  constructor() {
    super(...arguments), this.siteId = "";
  }
  handleOnCreateLinkClick() {
    var t;
    const s = (t = prompt("Enter the link you want to create")) != null ? t : "";
    if (s) {
      const e = {
        property: this.siteId,
        type: "pandora-link",
        attributes: {
          id: `pandora-link-${s}`,
          label: `Link to ${s} website`,
          component: "pandora-link",
          icon: `<img src="https://www.google.com/s2/favicons?domain_url=${s}"></img>`,
          link: s
        }
      };
      document.dispatchEvent(
        new CustomEvent("pandora::register-tile", {
          detail: e,
          bubbles: !0
        })
      );
    }
  }
  render() {
    return M`
      <svg
        @click="${this.handleOnCreateLinkClick}"
        class="size-6 cursor-pointer"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.3717 4.14637C9.41819 4.1928 9.45507 4.24794 9.48023 4.30864C9.50539 4.36934 9.51834 4.4344 9.51834 4.5001C9.51834 4.56581 9.50539 4.63087 9.48023 4.69157C9.45507 4.75226 9.41819 4.80741 9.3717 4.85384L5.37183 8.85371C5.32538 8.90016 5.27023 8.93701 5.20954 8.96215C5.14884 8.98729 5.08379 9.00023 5.0181 9.00023C4.9524 9.00023 4.88735 8.98729 4.82665 8.96215C4.76596 8.93701 4.71081 8.90016 4.66436 8.85371C4.6179 8.80726 4.58106 8.75211 4.55591 8.69141C4.53077 8.63072 4.51783 8.56567 4.51783 8.49997C4.51783 8.43428 4.53077 8.36922 4.55591 8.30853C4.58106 8.24783 4.6179 8.19269 4.66436 8.14623L8.66422 4.14637C8.71066 4.09988 8.7658 4.063 8.8265 4.03784C8.8872 4.01268 8.95226 3.99973 9.01796 3.99973C9.08367 3.99973 9.14873 4.01268 9.20943 4.03784C9.27012 4.063 9.32527 4.09988 9.3717 4.14637ZM12.4928 1.02522C12.1678 0.700187 11.782 0.442355 11.3574 0.266447C10.9327 0.090539 10.4776 0 10.0179 0C9.55829 0 9.10315 0.090539 8.6785 0.266447C8.25385 0.442355 7.86801 0.700187 7.54301 1.02522L5.66432 2.90328C5.57051 2.9971 5.5178 3.12434 5.5178 3.25702C5.5178 3.3897 5.57051 3.51694 5.66432 3.61076C5.75814 3.70457 5.88538 3.75728 6.01806 3.75728C6.15074 3.75728 6.27798 3.70457 6.3718 3.61076L8.25049 1.73582C8.72103 1.27562 9.35407 1.01954 10.0122 1.02317C10.6704 1.02679 11.3006 1.28982 11.766 1.75518C12.2315 2.22054 12.4946 2.85067 12.4983 3.50884C12.5021 4.167 12.2461 4.80008 11.786 5.2707L9.90668 7.14939C9.81287 7.24313 9.76013 7.37029 9.76007 7.50291C9.76001 7.63553 9.81264 7.76274 9.90637 7.85655C10.0001 7.95037 10.1273 8.00311 10.2599 8.00317C10.3925 8.00323 10.5197 7.9506 10.6135 7.85687L12.4928 5.97505C12.8179 5.65006 13.0757 5.26422 13.2516 4.83957C13.4275 4.41492 13.5181 3.95978 13.5181 3.50014C13.5181 3.0405 13.4275 2.58536 13.2516 2.16071C13.0757 1.73606 12.8179 1.35022 12.4928 1.02522ZM7.66426 9.38869L5.78557 11.2674C5.55438 11.5038 5.27859 11.6919 4.97417 11.821C4.66975 11.9501 4.34276 12.0175 4.01211 12.0193C3.68147 12.0211 3.35375 11.9573 3.04793 11.8316C2.74211 11.7059 2.46426 11.5208 2.23048 11.287C1.9967 11.0531 1.81162 10.7753 1.68597 10.4694C1.56032 10.1636 1.49659 9.83584 1.49847 9.5052C1.50035 9.17455 1.5678 8.84757 1.69692 8.54317C1.82604 8.23878 2.01426 7.96302 2.25069 7.73187L4.12875 5.85381C4.22257 5.75999 4.27527 5.63275 4.27527 5.50007C4.27527 5.36739 4.22257 5.24015 4.12875 5.14633C4.03493 5.05251 3.90769 4.99981 3.77501 4.99981C3.64233 4.99981 3.51509 5.05251 3.42127 5.14633L1.54321 7.02502C0.886822 7.68141 0.518066 8.57166 0.518066 9.49994C0.518066 10.4282 0.886822 11.3185 1.54321 11.9749C2.1996 12.6312 3.08985 13 4.01813 13C4.9464 13 5.83666 12.6312 6.49305 11.9749L8.37173 10.0955C8.46547 10.0017 8.5181 9.87452 8.51804 9.7419C8.51798 9.60928 8.46524 9.48211 8.37142 9.38838C8.2776 9.29464 8.15039 9.24202 8.01777 9.24208C7.88516 9.24214 7.75799 9.29487 7.66426 9.38869Z"
          fill="currentColor"
        />
      </svg>
    `;
  }
};
Lt([
  L({ type: String, attribute: "site-id" })
], K.prototype, "siteId", 2);
K = Lt([
  B("pandora-installer")
], K);
customElements.whenDefined("pandora-box").then(() => {
  customElements.get("pandora-box").registerTile({
    id: "pandora-installer",
    label: "Installer Tile",
    component: "pandora-installer",
    icon: '<svg viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.47261 1.31531e-06C2.88826 1.31531e-06 2.31703 0.173282 1.83116 0.497932C1.34528 0.822581 0.966592 1.28402 0.742969 1.82389C0.519347 2.36376 0.460837 2.95782 0.574838 3.53095C0.68884 4.10407 0.970233 4.63052 1.38343 5.04372C1.79663 5.45692 2.32308 5.73832 2.89621 5.85232C3.46934 5.96632 4.0634 5.90781 4.60327 5.68419C5.14314 5.46057 5.60458 5.08188 5.92923 4.596C6.25388 4.11013 6.42716 3.5389 6.42716 2.95455C6.42716 2.17095 6.11588 1.41945 5.56179 0.865367C5.00771 0.311283 4.25621 1.31531e-06 3.47261 1.31531e-06ZM3.47261 4.72727C3.122 4.72727 2.77926 4.6233 2.48774 4.42851C2.19621 4.23372 1.969 3.95686 1.83483 3.63294C1.70065 3.30902 1.66555 2.95258 1.73395 2.6087C1.80235 2.26483 1.97118 1.94896 2.21911 1.70104C2.46703 1.45312 2.7829 1.28428 3.12677 1.21588C3.47065 1.14748 3.82708 1.18259 4.15101 1.31676C4.47493 1.45093 4.75179 1.67815 4.94658 1.96967C5.14137 2.2612 5.24534 2.60393 5.24534 2.95455C5.24534 3.4247 5.05857 3.8756 4.72612 4.20805C4.39367 4.5405 3.94277 4.72727 3.47261 4.72727ZM10.5635 5.90909C11.1479 5.90909 11.7191 5.73581 12.205 5.41116C12.6908 5.08651 13.0695 4.62507 13.2932 4.0852C13.5168 3.54533 13.5753 2.95127 13.4613 2.37814C13.3473 1.80502 13.0659 1.27857 12.6527 0.865367C12.2395 0.452167 11.713 0.170774 11.1399 0.0567721C10.5668 -0.0572297 9.97274 0.00128016 9.43286 0.224903C8.89299 0.448525 8.43155 0.827217 8.10691 1.31309C7.78226 1.79896 7.60897 2.37019 7.60897 2.95455C7.60897 3.73814 7.92026 4.48964 8.47434 5.04372C9.02843 5.59781 9.77993 5.90909 10.5635 5.90909ZM10.5635 1.18182C10.9141 1.18182 11.2569 1.28579 11.5484 1.48058C11.8399 1.67537 12.0671 1.95223 12.2013 2.27615C12.3355 2.60008 12.3706 2.95651 12.3022 3.30039C12.2338 3.64426 12.0649 3.96013 11.817 4.20805C11.5691 4.45597 11.2532 4.62481 10.9094 4.69321C10.5655 4.76161 10.209 4.72651 9.88513 4.59233C9.5612 4.45816 9.28434 4.23094 9.08955 3.93942C8.89476 3.6479 8.79079 3.30516 8.79079 2.95455C8.79079 2.48439 8.97756 2.03349 9.31001 1.70104C9.64246 1.36859 10.0934 1.18182 10.5635 1.18182ZM3.47261 7.09091C2.88826 7.09091 2.31703 7.26419 1.83116 7.58884C1.34528 7.91349 0.966592 8.37493 0.742969 8.9148C0.519347 9.45467 0.460837 10.0487 0.574838 10.6219C0.68884 11.195 0.970233 11.7214 1.38343 12.1346C1.79663 12.5478 2.32308 12.8292 2.89621 12.9432C3.46934 13.0572 4.0634 12.9987 4.60327 12.7751C5.14314 12.5515 5.60458 12.1728 5.92923 11.6869C6.25388 11.201 6.42716 10.6298 6.42716 10.0455C6.42716 9.26186 6.11588 8.51036 5.56179 7.95627C5.00771 7.40219 4.25621 7.09091 3.47261 7.09091ZM3.47261 11.8182C3.122 11.8182 2.77926 11.7142 2.48774 11.5194C2.19621 11.3246 1.969 11.0478 1.83483 10.7238C1.70065 10.3999 1.66555 10.0435 1.73395 9.69961C1.80235 9.35574 1.97118 9.03987 2.21911 8.79195C2.46703 8.54403 2.7829 8.37519 3.12677 8.30679C3.47065 8.23839 3.82708 8.27349 4.15101 8.40767C4.47493 8.54184 4.75179 8.76906 4.94658 9.06058C5.14137 9.3521 5.24534 9.69484 5.24534 10.0455C5.24534 10.5156 5.05857 10.9665 4.72612 11.299C4.39367 11.6314 3.94277 11.8182 3.47261 11.8182ZM13.5181 10.0455C13.5181 10.2022 13.4558 10.3525 13.345 10.4633C13.2342 10.5741 13.0839 10.6364 12.9272 10.6364H11.1544V12.4091C11.1544 12.5658 11.0922 12.7161 10.9814 12.8269C10.8705 12.9377 10.7202 13 10.5635 13C10.4068 13 10.2565 12.9377 10.1457 12.8269C10.0349 12.7161 9.97261 12.5658 9.97261 12.4091V10.6364H8.19988C8.04317 10.6364 7.89286 10.5741 7.78205 10.4633C7.67123 10.3525 7.60897 10.2022 7.60897 10.0455C7.60897 9.88873 7.67123 9.73843 7.78205 9.62762C7.89286 9.5168 8.04317 9.45454 8.19988 9.45454H9.97261V7.68182C9.97261 7.5251 10.0349 7.3748 10.1457 7.26398C10.2565 7.15316 10.4068 7.09091 10.5635 7.09091C10.7202 7.09091 10.8705 7.15316 10.9814 7.26398C11.0922 7.3748 11.1544 7.5251 11.1544 7.68182V9.45454H12.9272C13.0839 9.45454 13.2342 9.5168 13.345 9.62762C13.4558 9.73843 13.5181 9.88873 13.5181 10.0455Z" fill="#E2E2E2"/></svg>'
  });
});
var Ce = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, et = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? _e(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && Ce(t, e, r), r;
};
const xe = tt(y), bt = "yourserver.url";
let u = class s extends xe {
  constructor() {
    super(...arguments), this.activeTile = null, this.siteId = "";
  }
  static log(...t) {
    console.log("PandoraBox // ", ...t);
  }
  connectedCallback() {
    return k(this, null, function* () {
      lt(s.prototype, this, "connectedCallback").call(this), document.addEventListener(
        "pandora::register-tile",
        this.onRegisterTile.bind(this)
      ), (yield this.fetchTilesForSite()).forEach((e) => u.registerTile(e));
    });
  }
  static registerTile(t) {
    u.tiles.find((e) => e.id === t.id) || (u.tiles.push(t), document.querySelector("pandora-box").requestUpdate());
  }
  static unRegisterTile(t) {
    u.tiles = u.tiles.filter((i) => i.id !== i.id), document.querySelector("pandora-box").requestUpdate();
  }
  fetchTilesForSite() {
    return k(this, null, function* () {
      const t = new URLSearchParams();
      return t.set("filter", `property.id="${this.siteId}"`), (yield (yield fetch(
        `${bt}/api/collections/tiles/records?` + t.toString(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
            // TODO: Figure out auth
          }
        }
      )).json().then((r) => r.items)).map((r) => r.attributes);
    });
  }
  onRegisterTile(t) {
    return k(this, null, function* () {
      const e = t.detail, i = e.attributes;
      try {
        if (u.tiles.find((r) => r.id === i.id))
          alert("Duplicate tile");
        else {
          u.registerTile(i);
          const r = yield fetch(
            `${bt}/api/collections/tiles/records`,
            {
              method: "POST",
              body: JSON.stringify(e),
              headers: {
                "Content-Type": "application/json"
                // TODO: Figure out auth
              }
            }
          );
          if (r.ok)
            this.updateTileIcon(
              i.id,
              `https://www.google.com/s2/favicons?domain_url=${i.link}`
            );
          else
            throw r.status;
        }
      } catch (r) {
        this.deleteTileIcon(i.id);
      }
    });
  }
  deleteTileIcon(t) {
    const e = this.renderRoot.getElementById(t);
    e && e.remove();
  }
  updateTileIcon(t, e) {
    const i = this.renderRoot.getElementById(t);
    if (i) {
      const r = i.querySelector("img");
      r.src = e;
    }
  }
  loadTileById(t) {
    var n;
    const e = u.tiles.find(
      (d) => d.id === t
    ), i = this.renderRoot.querySelector("#active-panel");
    if (!i || !e) return;
    if (this.activeTile && (i.innerHTML = "", i.classList.remove("mt-2"), e.id === ((n = this.activeTile) == null ? void 0 : n.id)))
      return this.activeTile = null, null;
    const c = e, { component: r, icon: o } = c, a = nt(c, ["component", "icon"]), l = document.createElement(r);
    Object.entries(a).forEach(([d, p]) => {
      l.setAttribute(d, p);
    }), l.setAttribute("site-id", this.siteId), i.classList.add("mt-2"), i.appendChild(l), this.activeTile = e;
  }
  render() {
    var t;
    return M`
      <div
        class="fixed bottom-4 right-4 justify-center items-end flex flex-col gap-2 z-[999999]"
      >
        <div
          id="active-panel"
          key="${((t = this.activeTile) == null ? void 0 : t.id) || "no-tiles"}"
          class="border border-solid  bg-black/60 text-white backdrop-blur-xl rounded-xl transition-all ease-out translate-x-0 ${this.activeTile ? "translate-y-0 border-white/15 p-4" : "translate-y-10"}"
        ></div>
        <div
          class="bg-gradient-to-b from-0% to-100% from-[#0F0F0F] to-black rounded-xl px-4 py-4 text-white border border-white/15 border-solid transition-all inline-flex"
        >
          <div
            class="flex justify-start items-center ${u.tiles.length > 0 ? "gap-2" : ""}"
          >
            <app-logo
              classes="size-6 scale-100 hover:scale-120 transition-all cursor-pointer"
            ></app-logo>
            <div
              class="flex border-l border-white/50 border-solid justify-center items-center gap-2 ${u.tiles.length > 0 ? "pl-2" : ""}"
            >
              ${u.tiles.map((e) => {
      var o;
      const i = ((o = this.activeTile) == null ? void 0 : o.id) === e.id, r = e.component === "pandora-link";
      return M`
                  <div
                    id="${e.id}"
                    title="${e.label}"
                    class="size-5 transition-all cursor-pointer flex justify-center items-center flex-col group relative ${i ? "text-white scale-115 rounded-xl duration-200 opacity-100" : "text-white"} ${r ? "scale-120 hover:scale-135" : "grayscale hover:grayscale-0 opacity-70 hover:opacity-100 scale-100 hover:scale-105"}"
                    aria-label="${e.label}"
                    @click="${(a) => {
        a.stopPropagation(), this.loadTileById(e.id);
      }}"
                  >
                    ${pe(e.icon)}
                    <div
                      class="bg-[#FF00A5] rounded-full duration-300 grayscale-0 w-1 h-1 overflow-hidden object-contain absolute transition-all ${i ? "-bottom-1.5 opacity-100" : "-bottom-3.5 opacity-0"}"
                    ></div>
                  </div>
                `;
    })}
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
u.tiles = [];
et([
  ne()
], u.prototype, "activeTile", 2);
et([
  L({ type: String, attribute: "site-id" })
], u.prototype, "siteId", 2);
u = et([
  B("pandora-box")
], u);
export {
  u as PandorasBox
};
