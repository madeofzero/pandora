var xe = Object.defineProperty, _e = Object.defineProperties;
var Ee = Object.getOwnPropertyDescriptors;
var X = Object.getOwnPropertySymbols, Ae = Object.getPrototypeOf, Mt = Object.prototype.hasOwnProperty, Ht = Object.prototype.propertyIsEnumerable, Se = Reflect.get;
var Tt = (e, t, r) => t in e ? xe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, x = (e, t) => {
  for (var r in t || (t = {}))
    Mt.call(t, r) && Tt(e, r, t[r]);
  if (X)
    for (var r of X(t))
      Ht.call(t, r) && Tt(e, r, t[r]);
  return e;
}, T = (e, t) => _e(e, Ee(t));
var Ft = (e, t) => {
  var r = {};
  for (var i in e)
    Mt.call(e, i) && t.indexOf(i) < 0 && (r[i] = e[i]);
  if (e != null && X)
    for (var i of X(e))
      t.indexOf(i) < 0 && Ht.call(e, i) && (r[i] = e[i]);
  return r;
};
var Lt = (e, t, r) => Se(Ae(e), r, t);
var $ = (e, t, r) => new Promise((i, s) => {
  var n = (a) => {
    try {
      l(r.next(a));
    } catch (c) {
      s(c);
    }
  }, o = (a) => {
    try {
      l(r.throw(a));
    } catch (c) {
      s(c);
    }
  }, l = (a) => a.done ? i(a.value) : Promise.resolve(a.value).then(n, o);
  l((r = r.apply(e, t)).next());
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis, Et = tt.ShadowRoot && (tt.ShadyCSS === void 0 || tt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, re = Symbol(), zt = /* @__PURE__ */ new WeakMap();
let Pe = class {
  constructor(t, r, i) {
    if (this._$cssResult$ = !0, i !== re) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Et && t === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (t = zt.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && zt.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ie = (e) => new Pe(typeof e == "string" ? e : e + "", void 0, re), se = (e, t) => {
  if (Et) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const i = document.createElement("style"), s = tt.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = r.cssText, e.appendChild(i);
  }
}, Rt = Et ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const i of t.cssRules) r += i.cssText;
  return ie(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ne, defineProperty: Oe, getOwnPropertyDescriptor: ke, getOwnPropertyNames: Ie, getOwnPropertySymbols: Te, getPrototypeOf: Me } = Object, E = globalThis, Ut = E.trustedTypes, He = Ut ? Ut.emptyScript : "", ut = E.reactiveElementPolyfillSupport, U = (e, t) => e, rt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? He : null;
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
      } catch (i) {
        r = null;
      }
  }
  return r;
} }, At = (e, t) => !Ne(e, t), Vt = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: At };
var Kt, Qt;
(Kt = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (Qt = E.litPropertyMetadata) != null || (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let M = class extends HTMLElement {
  static addInitializer(t) {
    var r;
    this._$Ei(), ((r = this.l) != null ? r : this.l = []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Vt) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, r);
      s !== void 0 && Oe(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, r, i) {
    var o;
    const { get: s, set: n } = (o = ke(this.prototype, t)) != null ? o : { get() {
      return this[r];
    }, set(l) {
      this[r] = l;
    } };
    return { get: s, set(l) {
      const a = s == null ? void 0 : s.call(this);
      n == null || n.call(this, l), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var r;
    return (r = this.elementProperties.get(t)) != null ? r : Vt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Me(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const r = this.properties, i = [...Ie(r), ...Te(r)];
      for (const s of i) this.createProperty(s, r[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [i, s] of r) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, i] of this.elementProperties) {
      const s = this._$Eu(r, i);
      s !== void 0 && this._$Eh.set(s, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) r.unshift(Rt(s));
    } else t !== void 0 && r.push(Rt(t));
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
    var t;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((r) => r(this));
  }
  addController(t) {
    var r, i;
    ((r = this._$EO) != null ? r : this._$EO = /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) == null || i.call(t));
  }
  removeController(t) {
    var r;
    (r = this._$EO) == null || r.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const i of r.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    var r;
    const t = (r = this.shadowRoot) != null ? r : this.attachShadow(this.constructor.shadowRootOptions);
    return se(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t, r;
    (t = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (r = this._$EO) == null || r.forEach((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var i;
      return (i = r.hostDisconnected) == null ? void 0 : i.call(r);
    });
  }
  attributeChangedCallback(t, r, i) {
    this._$AK(t, i);
  }
  _$ET(t, r) {
    var n;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : rt).toAttribute(r, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var n, o, l, a;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const c = i.getPropertyOptions(s), h = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : rt;
      this._$Em = s, this[s] = (a = (l = h.fromAttribute(r, c.type)) != null ? l : (o = this._$Ej) == null ? void 0 : o.get(s)) != null ? a : null, this._$Em = null;
    }
  }
  requestUpdate(t, r, i) {
    var s, n;
    if (t !== void 0) {
      const o = this.constructor, l = this[t];
      if (i != null || (i = o.getPropertyOptions(t)), !(((s = i.hasChanged) != null ? s : At)(l, r) || i.useDefault && i.reflect && l === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, r, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: i, reflect: s, wrapped: n }, o) {
    var l, a, c;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (a = o != null ? o : r) != null ? a : this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (r = void 0), this._$AL.set(t, r)), s === !0 && this._$Em !== t && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(t));
  }
  _$EP() {
    return $(this, null, function* () {
      this.isUpdatePending = !0;
      try {
        yield this._$ES;
      } catch (r) {
        Promise.reject(r);
      }
      const t = this.scheduleUpdate();
      return t != null && (yield t), !this.isUpdatePending;
    });
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i, s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((i = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, l] of this._$Ep) this[o] = l;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, l] of n) {
        const { wrapped: a } = l, c = this[o];
        a !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, l, c);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (s = this._$EO) == null || s.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(r)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var r;
    (r = this._$EO) == null || r.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
var Xt;
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[U("elementProperties")] = /* @__PURE__ */ new Map(), M[U("finalized")] = /* @__PURE__ */ new Map(), ut == null || ut({ ReactiveElement: M }), ((Xt = E.reactiveElementVersions) != null ? Xt : E.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, it = V.trustedTypes, Dt = it ? it.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ne = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, oe = "?" + _, Fe = `<${oe}>`, O = document, B = () => O.createComment(""), W = (e) => e === null || typeof e != "object" && typeof e != "function", St = Array.isArray, Le = (e) => St(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ht = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, jt = /-->/g, Bt = />/g, S = RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Wt = /'/g, Zt = /"/g, ae = /^(?:script|style|textarea|title)$/i, ze = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), A = ze(1), k = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), qt = /* @__PURE__ */ new WeakMap(), P = O.createTreeWalker(O, 129);
function le(e, t) {
  if (!St(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Dt !== void 0 ? Dt.createHTML(t) : t;
}
const Re = (e, t) => {
  const r = e.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = R;
  for (let l = 0; l < r; l++) {
    const a = e[l];
    let c, h, d = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, h = o.exec(a), h !== null); ) p = o.lastIndex, o === R ? h[1] === "!--" ? o = jt : h[1] !== void 0 ? o = Bt : h[2] !== void 0 ? (ae.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = S) : h[3] !== void 0 && (o = S) : o === S ? h[0] === ">" ? (o = s != null ? s : R, d = -1) : h[1] === void 0 ? d = -2 : (d = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? S : h[3] === '"' ? Zt : Wt) : o === Zt || o === Wt ? o = S : o === jt || o === Bt ? o = R : (o = S, s = void 0);
    const b = o === S && e[l + 1].startsWith("/>") ? " " : "";
    n += o === R ? a + Fe : d >= 0 ? (i.push(c), a.slice(0, d) + ne + a.slice(d) + _ + b) : a + _ + (d === -2 ? l : b);
  }
  return [le(e, n + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Z {
  constructor({ strings: t, _$litType$: r }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [c, h] = Re(t, r);
    if (this.el = Z.createElement(c, i), P.currentNode = this.el.content, r === 2 || r === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = P.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(ne)) {
          const p = h[o++], b = s.getAttribute(d).split(_), I = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: I[2], strings: b, ctor: I[1] === "." ? Ve : I[1] === "?" ? De : I[1] === "@" ? je : lt }), s.removeAttribute(d);
        } else d.startsWith(_) && (a.push({ type: 6, index: n }), s.removeAttribute(d));
        if (ae.test(s.tagName)) {
          const d = s.textContent.split(_), p = d.length - 1;
          if (p > 0) {
            s.textContent = it ? it.emptyScript : "";
            for (let b = 0; b < p; b++) s.append(d[b], B()), P.nextNode(), a.push({ type: 2, index: ++n });
            s.append(d[p], B());
          }
        }
      } else if (s.nodeType === 8) if (s.data === oe) a.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(_, d + 1)) !== -1; ) a.push({ type: 7, index: n }), d += _.length - 1;
      }
      n++;
    }
  }
  static createElement(t, r) {
    const i = O.createElement("template");
    return i.innerHTML = t, i;
  }
}
function F(e, t, r = e, i) {
  var o, l, a;
  if (t === k) return t;
  let s = i !== void 0 ? (o = r._$Co) == null ? void 0 : o[i] : r._$Cl;
  const n = W(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), n === void 0 ? s = void 0 : (s = new n(e), s._$AT(e, r, i)), i !== void 0 ? ((a = r._$Co) != null ? a : r._$Co = [])[i] = s : r._$Cl = s), s !== void 0 && (t = F(e, s._$AS(e, t.values), s, i)), t;
}
class Ue {
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
    var c;
    const { el: { content: r }, parts: i } = this._$AD, s = ((c = t == null ? void 0 : t.creationScope) != null ? c : O).importNode(r, !0);
    P.currentNode = s;
    let n = P.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new G(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new Be(n, this, t)), this._$AV.push(h), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (n = P.nextNode(), o++);
    }
    return P.currentNode = O, s;
  }
  p(t) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, r), r += i.strings.length - 2) : i._$AI(t[r])), r++;
  }
}
class G {
  get _$AU() {
    var t, r;
    return (r = (t = this._$AM) == null ? void 0 : t._$AU) != null ? r : this._$Cv;
  }
  constructor(t, r, i, s) {
    var n;
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = i, this.options = s, this._$Cv = (n = s == null ? void 0 : s.isConnected) != null ? n : !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = F(this, t, r), W(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== k && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Le(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && W(this._$AH) ? this._$AA.nextSibling.data = t : this.T(O.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: r, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Z.createElement(le(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(r);
    else {
      const o = new Ue(s, this), l = o.u(this.options);
      o.p(r), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let r = qt.get(t.strings);
    return r === void 0 && qt.set(t.strings, r = new Z(t)), r;
  }
  k(t) {
    St(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, s = 0;
    for (const n of t) s === r.length ? r.push(i = new G(this.O(B()), this.O(B()), this, this.options)) : i = r[s], i._$AI(n), s++;
    s < r.length && (this._$AR(i && i._$AB.nextSibling, s), r.length = s);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, r); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class lt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, i, s, n) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = r, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, r = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = F(this, t, r, 0), o = !W(t) || t !== this._$AH && t !== k, o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = F(this, l[i + a], r, a), c === k && (c = this._$AH[a]), o || (o = !W(c) || c !== this._$AH[a]), c === m ? t = m : t !== m && (t += (c != null ? c : "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Ve extends lt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class De extends lt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class je extends lt {
  constructor(t, r, i, s, n) {
    super(t, r, i, s, n), this.type = 5;
  }
  _$AI(t, r = this) {
    var o;
    if ((t = (o = F(this, t, r, 0)) != null ? o : m) === k) return;
    const i = this._$AH, s = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (r = this.options) == null ? void 0 : r.host) != null ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Be {
  constructor(t, r, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    F(this, t);
  }
}
const pt = V.litHtmlPolyfillSupport;
var Yt;
pt == null || pt(Z, G), ((Yt = V.litHtmlVersions) != null ? Yt : V.litHtmlVersions = []).push("3.3.0");
const We = (e, t, r) => {
  var n, o;
  const i = (n = r == null ? void 0 : r.renderBefore) != null ? n : t;
  let s = i._$litPart$;
  if (s === void 0) {
    const l = (o = r == null ? void 0 : r.renderBefore) != null ? o : null;
    i._$litPart$ = s = new G(t.insertBefore(B(), l), l, void 0, r != null ? r : {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis;
let D = class extends M {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r, i;
    const t = super.createRenderRoot();
    return (i = (r = this.renderOptions).renderBefore) != null || (r.renderBefore = t.firstChild), t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = We(r, this.renderRoot, this.renderOptions);
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
    return k;
  }
};
var te;
D._$litElement$ = !0, D.finalized = !0, (te = N.litElementHydrateSupport) == null || te.call(N, { LitElement: D });
const ft = N.litElementPolyfillSupport;
ft == null || ft({ LitElement: D });
var ee;
((ee = N.litElementVersions) != null ? ee : N.litElementVersions = []).push("4.2.0");
const Ze = '/*! tailwindcss v4.1.7 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-border-style:solid;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-font-weight:initial;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-ease:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-white:#fff;--spacing:.25rem;--text-lg:1.125rem;--text-lg--line-height:calc(1.75/1.125);--font-weight-bold:700;--radius-xl:.75rem;--ease-out:cubic-bezier(0,0,.2,1);--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.collapse{visibility:collapse}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.right-4{right:calc(var(--spacing)*4)}.bottom-4{bottom:calc(var(--spacing)*4)}.z-\\[999999\\]{z-index:999999}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.m-0{margin:calc(var(--spacing)*0)}.flex{display:flex}.inline-flex{display:inline-flex}.field-sizing-content{field-sizing:content}.size-0{width:calc(var(--spacing)*0);height:calc(var(--spacing)*0)}.size-5{width:calc(var(--spacing)*5);height:calc(var(--spacing)*5)}.size-6{width:calc(var(--spacing)*6);height:calc(var(--spacing)*6)}.size-10{width:calc(var(--spacing)*10);height:calc(var(--spacing)*10)}.h-auto{height:auto}.max-h-4{max-height:calc(var(--spacing)*4)}.max-h-96{max-height:calc(var(--spacing)*96)}.min-h-56{min-height:calc(var(--spacing)*56)}.w-96{width:calc(var(--spacing)*96)}.w-full{width:100%}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.translate-x-0{--tw-translate-x:calc(var(--spacing)*0);translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-y-0{--tw-translate-y:calc(var(--spacing)*0);translate:var(--tw-translate-x)var(--tw-translate-y)}.translate-y-10{--tw-translate-y:calc(var(--spacing)*10);translate:var(--tw-translate-x)var(--tw-translate-y)}.scale-80{--tw-scale-x:80%;--tw-scale-y:80%;--tw-scale-z:80%;scale:var(--tw-scale-x)var(--tw-scale-y)}.scale-100{--tw-scale-x:100%;--tw-scale-y:100%;--tw-scale-z:100%;scale:var(--tw-scale-x)var(--tw-scale-y)}.scale-110{--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x)var(--tw-scale-y)}.cursor-pointer{cursor:pointer}.resize-none{resize:none}.flex-col{flex-direction:column}.items-center{align-items:center}.items-end{align-items:flex-end}.justify-center{justify-content:center}.justify-start{justify-content:flex-start}.gap-2{gap:calc(var(--spacing)*2)}.gap-4{gap:calc(var(--spacing)*4)}.overflow-auto{overflow:auto}.rounded-full{border-radius:3.40282e38px}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-solid{--tw-border-style:solid;border-style:solid}.border-\\[\\#6EB7FF\\]{border-color:#6eb7ff}.border-\\[\\#343330\\]{border-color:#343330}.border-transparent{border-color:#0000}.bg-\\[\\#15171B\\]{background-color:#15171b}.bg-gradient-to-b{--tw-gradient-position:to bottom in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.from-\\[\\#008CFF\\]{--tw-gradient-from:#008cff;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-0\\%{--tw-gradient-from-position:0%}.to-\\[\\#3F55FF\\]{--tw-gradient-to:#3f55ff;--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-100\\%{--tw-gradient-to-position:100%}.p-4{padding:calc(var(--spacing)*4)}.px-6{padding-inline:calc(var(--spacing)*6)}.py-4{padding-block:calc(var(--spacing)*4)}.pl-2{padding-left:calc(var(--spacing)*2)}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.text-\\[\\#6EB7FF\\]{color:#6eb7ff}.text-\\[\\#F7F9FB\\]{color:#f7f9fb}.text-\\[\\#F7F9FB\\]\\/60{color:#f7f9fb99}.text-white{color:var(--color-white)}.text-white\\/80{color:#fffc}@supports (color:color-mix(in lab,red,red)){.text-white\\/80{color:color-mix(in oklab,var(--color-white)80%,transparent)}}.uppercase{text-transform:uppercase}.opacity-0{opacity:0}.opacity-100{opacity:1}.filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.select-none{-webkit-user-select:none;user-select:none}@media (hover:hover){.group-hover\\:scale-110:is(:where(.group):hover *),.hover\\:scale-110:hover{--tw-scale-x:110%;--tw-scale-y:110%;--tw-scale-z:110%;scale:var(--tw-scale-x)var(--tw-scale-y)}.hover\\:text-\\[\\#6EB7FF\\]:hover{color:#6eb7ff}.hover\\:underline:hover{text-decoration-line:underline}}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.\\[\\&\\>img\\,\\&\\>svg\\]\\:size-5>img,.\\[\\&\\>img\\,\\&\\>svg\\]\\:size-5>svg{width:calc(var(--spacing)*5);height:calc(var(--spacing)*5)}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}', qe = ie(Ze), Ge = (e) => class extends e {
  connectedCallback() {
    super.connectedCallback(), this.shadowRoot && se(this.shadowRoot, [qe]);
  }
}, J = Ge(D);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: At }, Ke = (e = Je, t, r) => {
  const { kind: i, metadata: s } = r;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(r.name, e), i === "accessor") {
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
function z(e) {
  return (t, r) => typeof r == "object" ? Ke(e, t, r) : ((i, s, n) => {
    const o = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Qe(e) {
  return z(T(x({}, e), { state: !0, attribute: !1 }));
}
var Xe = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, ce = (e, t, r, i) => {
  for (var s = i > 1 ? void 0 : i ? Ye(t, r) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (s = (i ? o(t, r, s) : o(s)) || s);
  return i && s && Xe(t, r, s), s;
};
let Ct = class extends J {
  constructor() {
    super(...arguments), this.classes = "size-10";
  }
  render() {
    return A`
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
          fill="#3EA8FF"
        />
        <path
          d="M80.0168 10.5332L78.5568 7.88318H78.1468V10.5332H76.4368V3.51318H79.3068C79.8601 3.51318 80.3301 3.60985 80.7168 3.80318C81.1101 3.99652 81.4034 4.26318 81.5968 4.60318C81.7901 4.93652 81.8868 5.30985 81.8868 5.72318C81.8868 6.18985 81.7534 6.60652 81.4868 6.97318C81.2268 7.33985 80.8401 7.59985 80.3268 7.75318L81.9468 10.5332H80.0168ZM78.1468 6.67318H79.2068C79.5201 6.67318 79.7534 6.59652 79.9068 6.44318C80.0668 6.28985 80.1468 6.07318 80.1468 5.79318C80.1468 5.52652 80.0668 5.31652 79.9068 5.16318C79.7534 5.00985 79.5201 4.93318 79.2068 4.93318H78.1468V6.67318Z"
          fill="#3EA8FF"
        />
        <path
          d="M67.7763 10.6032C67.1163 10.6032 66.5096 10.4499 65.9563 10.1432C65.4096 9.83654 64.9729 9.40987 64.6463 8.86321C64.3263 8.30987 64.1663 7.68987 64.1663 7.00321C64.1663 6.31654 64.3263 5.69987 64.6463 5.15321C64.9729 4.60654 65.4096 4.17987 65.9563 3.87321C66.5096 3.56654 67.1163 3.41321 67.7763 3.41321C68.4363 3.41321 69.0396 3.56654 69.5863 3.87321C70.1396 4.17987 70.5729 4.60654 70.8863 5.15321C71.2063 5.69987 71.3663 6.31654 71.3663 7.00321C71.3663 7.68987 71.2063 8.30987 70.8863 8.86321C70.5663 9.40987 70.1329 9.83654 69.5863 10.1432C69.0396 10.4499 68.4363 10.6032 67.7763 10.6032ZM67.7763 9.04321C68.3363 9.04321 68.7829 8.85654 69.1163 8.48321C69.4563 8.10987 69.6263 7.61654 69.6263 7.00321C69.6263 6.38321 69.4563 5.88987 69.1163 5.52321C68.7829 5.14987 68.3363 4.96321 67.7763 4.96321C67.2096 4.96321 66.7563 5.14654 66.4163 5.51321C66.0829 5.87987 65.9163 6.37654 65.9163 7.00321C65.9163 7.62321 66.0829 8.11987 66.4163 8.49321C66.7563 8.85987 67.2096 9.04321 67.7763 9.04321Z"
          fill="#3EA8FF"
        />
        <path
          d="M55.7015 3.51318C56.4415 3.51318 57.0882 3.65985 57.6415 3.95318C58.1949 4.24652 58.6215 4.65985 58.9215 5.19318C59.2282 5.71985 59.3815 6.32985 59.3815 7.02318C59.3815 7.70985 59.2282 8.31985 58.9215 8.85318C58.6215 9.38652 58.1915 9.79985 57.6315 10.0932C57.0782 10.3865 56.4349 10.5332 55.7015 10.5332H53.0715V3.51318H55.7015ZM55.5915 9.05318C56.2382 9.05318 56.7415 8.87652 57.1015 8.52318C57.4615 8.16985 57.6415 7.66985 57.6415 7.02318C57.6415 6.37652 57.4615 5.87318 57.1015 5.51318C56.7415 5.15318 56.2382 4.97318 55.5915 4.97318H54.7815V9.05318H55.5915Z"
          fill="#3EA8FF"
        />
        <path
          d="M47.7129 10.5332H46.0029L43.1429 6.20318V10.5332H41.4329V3.51318H43.1429L46.0029 7.86318V3.51318H47.7129V10.5332Z"
          fill="#3EA8FF"
        />
        <path
          d="M34.3107 9.29318H31.6907L31.2707 10.5332H29.4807L32.0207 3.51318H34.0007L36.5407 10.5332H34.7307L34.3107 9.29318ZM33.8707 7.97318L33.0007 5.40318L32.1407 7.97318H33.8707Z"
          fill="#3EA8FF"
        />
        <path
          d="M24.9313 5.77318C24.9313 6.17985 24.838 6.55318 24.6513 6.89318C24.4646 7.22652 24.178 7.49652 23.7913 7.70318C23.4046 7.90985 22.9246 8.01318 22.3513 8.01318H21.2913V10.5332H19.5813V3.51318H22.3513C22.9113 3.51318 23.3846 3.60985 23.7713 3.80318C24.158 3.99652 24.448 4.26318 24.6413 4.60318C24.8346 4.94318 24.9313 5.33318 24.9313 5.77318ZM22.2213 6.65318C22.548 6.65318 22.7913 6.57652 22.9513 6.42318C23.1113 6.26985 23.1913 6.05318 23.1913 5.77318C23.1913 5.49318 23.1113 5.27652 22.9513 5.12318C22.7913 4.96985 22.548 4.89318 22.2213 4.89318H21.2913V6.65318H22.2213Z"
          fill="#3EA8FF"
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
            <stop stop-color="#008CFF" />
            <stop offset="1" stop-color="#3F55FF" />
          </linearGradient>
        </defs>
      </svg>
    `;
  }
};
ce([
  z()
], Ct.prototype, "classes", 2);
Ct = ce([
  K("app-logo")
], Ct);
function gt(...e) {
  console.log("%cPandora%c%s", "display: flex; flex-direction: row; align-items: center; padding: 5px 10px; background: linear-gradient(44.81deg, #008CFF 0%, #3F55FF 118.08%); border: 1px solid #343330; border-radius: 60px;", "display: flex; flex-direction: row; align-items: center; padding: 5px 10px; background: #15171B; border: 1px solid #343330; border-radius: 60px;", ...e);
}
const de = "yourserver.url";
function tr(e) {
  return $(this, null, function* () {
    const t = new URLSearchParams();
    return t.set("filter", `property.id="${e}"`), yield (yield fetch(
      `${de}/api/collections/plugins/records?` + t.toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )).json();
  });
}
function ue(e) {
  return $(this, null, function* () {
    return yield fetch(`${de}/api/collections/plugins/records`, {
      method: "POST",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
}
const st = {
  plugin: {
    register: "pandora::register-plugin",
    icon: {
      update: "pandora::update-plugin-icon"
    }
  }
};
var er = Object.defineProperty, rr = (e, t, r) => t in e ? er(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, vt = (e, t, r) => (rr(e, typeof t != "symbol" ? t + "" : t, r), r), ir = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
}, mt = (e, t) => {
  if (Object(t) !== t)
    throw TypeError('Cannot use the "in" operator on this value');
  return e.has(t);
}, Y = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, Gt = (e, t, r) => (ir(e, t, "access private method"), r);
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function he(e, t) {
  return Object.is(e, t);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let v = null, j = !1, et = 1;
const nt = /* @__PURE__ */ Symbol("SIGNAL");
function H(e) {
  const t = v;
  return v = e, t;
}
function sr() {
  return v;
}
function nr() {
  return j;
}
const Pt = {
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
function ct(e) {
  if (j)
    throw new Error(
      typeof ngDevMode != "undefined" && ngDevMode ? "Assertion error: signal read during notification phase" : ""
    );
  if (v === null)
    return;
  v.consumerOnSignalRead(e);
  const t = v.nextProducerIndex++;
  if (L(v), t < v.producerNode.length && v.producerNode[t] !== e && bt(v)) {
    const r = v.producerNode[t];
    dt(r, v.producerIndexOfThis[t]);
  }
  v.producerNode[t] !== e && (v.producerNode[t] = e, v.producerIndexOfThis[t] = bt(v) ? ge(e, v, t) : 0), v.producerLastReadVersion[t] = e.version;
}
function or() {
  et++;
}
function pe(e) {
  if (!(!e.dirty && e.lastCleanEpoch === et)) {
    if (!e.producerMustRecompute(e) && !ur(e)) {
      e.dirty = !1, e.lastCleanEpoch = et;
      return;
    }
    e.producerRecomputeValue(e), e.dirty = !1, e.lastCleanEpoch = et;
  }
}
function fe(e) {
  if (e.liveConsumerNode === void 0)
    return;
  const t = j;
  j = !0;
  try {
    for (const r of e.liveConsumerNode)
      r.dirty || lr(r);
  } finally {
    j = t;
  }
}
function ar() {
  return (v == null ? void 0 : v.consumerAllowSignalWrites) !== !1;
}
function lr(e) {
  var r;
  var t;
  e.dirty = !0, fe(e), (t = e.consumerMarkedDirty) == null || t.call((r = e.wrapper) != null ? r : e);
}
function cr(e) {
  return e && (e.nextProducerIndex = 0), H(e);
}
function dr(e, t) {
  if (H(t), !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0)) {
    if (bt(e))
      for (let r = e.nextProducerIndex; r < e.producerNode.length; r++)
        dt(e.producerNode[r], e.producerIndexOfThis[r]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
  }
}
function ur(e) {
  L(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    const r = e.producerNode[t], i = e.producerLastReadVersion[t];
    if (i !== r.version || (pe(r), i !== r.version))
      return !0;
  }
  return !1;
}
function ge(e, t, r) {
  var i;
  if (Nt(e), L(e), e.liveConsumerNode.length === 0) {
    (i = e.watched) == null || i.call(e.wrapper);
    for (let s = 0; s < e.producerNode.length; s++)
      e.producerIndexOfThis[s] = ge(e.producerNode[s], e, s);
  }
  return e.liveConsumerIndexOfThis.push(r), e.liveConsumerNode.push(t) - 1;
}
function dt(e, t) {
  var r;
  if (Nt(e), L(e), typeof ngDevMode != "undefined" && ngDevMode && t >= e.liveConsumerNode.length)
    throw new Error(
      `Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`
    );
  if (e.liveConsumerNode.length === 1) {
    (r = e.unwatched) == null || r.call(e.wrapper);
    for (let s = 0; s < e.producerNode.length; s++)
      dt(e.producerNode[s], e.producerIndexOfThis[s]);
  }
  const i = e.liveConsumerNode.length - 1;
  if (e.liveConsumerNode[t] = e.liveConsumerNode[i], e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[i], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, t < e.liveConsumerNode.length) {
    const s = e.liveConsumerIndexOfThis[t], n = e.liveConsumerNode[t];
    L(n), n.producerIndexOfThis[s] = t;
  }
}
function bt(e) {
  var r;
  var t;
  return e.consumerIsAlwaysLive || ((r = (t = e == null ? void 0 : e.liveConsumerNode) == null ? void 0 : t.length) != null ? r : 0) > 0;
}
function L(e) {
  var t, r, i;
  (t = e.producerNode) != null || (e.producerNode = []), (r = e.producerIndexOfThis) != null || (e.producerIndexOfThis = []), (i = e.producerLastReadVersion) != null || (e.producerLastReadVersion = []);
}
function Nt(e) {
  var t, r;
  (t = e.liveConsumerNode) != null || (e.liveConsumerNode = []), (r = e.liveConsumerIndexOfThis) != null || (e.liveConsumerIndexOfThis = []);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function ve(e) {
  if (pe(e), ct(e), e.value === $t)
    throw e.error;
  return e.value;
}
function hr(e) {
  const t = Object.create(pr);
  t.computation = e;
  const r = () => ve(t);
  return r[nt] = t, r;
}
const wt = /* @__PURE__ */ Symbol("UNSET"), yt = /* @__PURE__ */ Symbol("COMPUTING"), $t = /* @__PURE__ */ Symbol("ERRORED"), pr = T(x({}, Pt), {
  value: wt,
  dirty: !0,
  error: null,
  equal: he,
  producerMustRecompute(e) {
    return e.value === wt || e.value === yt;
  },
  producerRecomputeValue(e) {
    if (e.value === yt)
      throw new Error("Detected cycle in computations.");
    const t = e.value;
    e.value = yt;
    const r = cr(e);
    let i, s = !1;
    try {
      i = e.computation.call(e.wrapper), s = t !== wt && t !== $t && e.equal.call(e.wrapper, t, i);
    } catch (n) {
      i = $t, e.error = n;
    } finally {
      dr(e, r);
    }
    if (s) {
      e.value = t;
      return;
    }
    e.value = i, e.version++;
  }
});
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function fr() {
  throw new Error();
}
let gr = fr;
function vr() {
  gr();
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function mr(e) {
  const t = Object.create(Cr);
  t.value = e;
  const r = () => (ct(t), t.value);
  return r[nt] = t, r;
}
function wr() {
  return ct(this), this.value;
}
function yr(e, t) {
  ar() || vr(), e.equal.call(e.wrapper, e.value, t) || (e.value = t, br(e));
}
const Cr = T(x({}, Pt), {
  equal: he,
  value: void 0
});
function br(e) {
  e.version++, or(), fe(e);
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
const y = Symbol("node");
var q;
((e) => {
  var t, r, i, s;
  class n {
    constructor(a, c = {}) {
      Y(this, r), vt(this, t);
      const d = mr(a)[nt];
      if (this[y] = d, d.wrapper = this, c) {
        const p = c.equals;
        p && (d.equal = p), d.watched = c[e.subtle.watched], d.unwatched = c[e.subtle.unwatched];
      }
    }
    get() {
      if (!(0, e.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.get");
      return wr.call(this[y]);
    }
    set(a) {
      if (!(0, e.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.set");
      if (nr())
        throw new Error("Writes to signals not permitted during Watcher callback");
      const c = this[y];
      yr(c, a);
    }
  }
  t = y, r = /* @__PURE__ */ new WeakSet(), e.isState = (l) => typeof l == "object" && mt(r, l), e.State = n;
  class o {
    // Create a Signal which evaluates to the value returned by the callback.
    // Callback is called with this signal as the parameter.
    constructor(a, c) {
      Y(this, s), vt(this, i);
      const d = hr(a)[nt];
      if (d.consumerAllowSignalWrites = !0, this[y] = d, d.wrapper = this, c) {
        const p = c.equals;
        p && (d.equal = p), d.watched = c[e.subtle.watched], d.unwatched = c[e.subtle.unwatched];
      }
    }
    get() {
      if (!(0, e.isComputed)(this))
        throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");
      return ve(this[y]);
    }
  }
  i = y, s = /* @__PURE__ */ new WeakSet(), e.isComputed = (l) => typeof l == "object" && mt(s, l), e.Computed = o, ((l) => {
    var a, c, h, d;
    function p(g) {
      let f, u = null;
      try {
        u = H(null), f = g();
      } finally {
        H(u);
      }
      return f;
    }
    l.untrack = p;
    function b(g) {
      var u;
      var f;
      if (!(0, e.isComputed)(g) && !(0, e.isWatcher)(g))
        throw new TypeError("Called introspectSources without a Computed or Watcher argument");
      return (u = (f = g[y].producerNode) == null ? void 0 : f.map((w) => w.wrapper)) != null ? u : [];
    }
    l.introspectSources = b;
    function I(g) {
      var u;
      var f;
      if (!(0, e.isComputed)(g) && !(0, e.isState)(g))
        throw new TypeError("Called introspectSinks without a Signal argument");
      return (u = (f = g[y].liveConsumerNode) == null ? void 0 : f.map((w) => w.wrapper)) != null ? u : [];
    }
    l.introspectSinks = I;
    function we(g) {
      if (!(0, e.isComputed)(g) && !(0, e.isState)(g))
        throw new TypeError("Called hasSinks without a Signal argument");
      const f = g[y].liveConsumerNode;
      return f ? f.length > 0 : !1;
    }
    l.hasSinks = we;
    function ye(g) {
      if (!(0, e.isComputed)(g) && !(0, e.isWatcher)(g))
        throw new TypeError("Called hasSources without a Computed or Watcher argument");
      const f = g[y].producerNode;
      return f ? f.length > 0 : !1;
    }
    l.hasSources = ye;
    class Ce {
      // When a (recursive) source of Watcher is written to, call this callback,
      // if it hasn't already been called since the last `watch` call.
      // No signals may be read or written during the notify.
      constructor(f) {
        Y(this, c), Y(this, h), vt(this, a);
        let u = Object.create(Pt);
        u.wrapper = this, u.consumerMarkedDirty = f, u.consumerIsAlwaysLive = !0, u.consumerAllowSignalWrites = !1, u.producerNode = [], this[y] = u;
      }
      // Add these signals to the Watcher's set, and set the watcher to run its
      // notify callback next time any signal in the set (or one of its dependencies) changes.
      // Can be called with no arguments just to reset the "notified" state, so that
      // the notify callback will be invoked again.
      watch(...f) {
        if (!(0, e.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        Gt(this, h, d).call(this, f);
        const u = this[y];
        u.dirty = !1;
        const w = H(u);
        for (const Q of f)
          ct(Q[y]);
        H(w);
      }
      // Remove these signals from the watched set (e.g., for an effect which is disposed)
      unwatch(...f) {
        if (!(0, e.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        Gt(this, h, d).call(this, f);
        const u = this[y];
        L(u);
        for (let w = u.producerNode.length - 1; w >= 0; w--)
          if (f.includes(u.producerNode[w].wrapper)) {
            dt(u.producerNode[w], u.producerIndexOfThis[w]);
            const Q = u.producerNode.length - 1;
            if (u.producerNode[w] = u.producerNode[Q], u.producerIndexOfThis[w] = u.producerIndexOfThis[Q], u.producerNode.length--, u.producerIndexOfThis.length--, u.nextProducerIndex--, w < u.producerNode.length) {
              const $e = u.producerIndexOfThis[w], It = u.producerNode[w];
              Nt(It), It.liveConsumerIndexOfThis[$e] = w;
            }
          }
      }
      // Returns the set of computeds in the Watcher's set which are still yet
      // to be re-evaluated
      getPending() {
        if (!(0, e.isWatcher)(this))
          throw new TypeError("Called getPending without Watcher receiver");
        return this[y].producerNode.filter((u) => u.dirty).map((u) => u.wrapper);
      }
    }
    a = y, c = /* @__PURE__ */ new WeakSet(), h = /* @__PURE__ */ new WeakSet(), d = function(g) {
      for (const f of g)
        if (!(0, e.isComputed)(f) && !(0, e.isState)(f))
          throw new TypeError("Called watch/unwatch without a Computed or State argument");
    }, e.isWatcher = (g) => mt(c, g), l.Watcher = Ce;
    function be() {
      var g;
      return (g = sr()) == null ? void 0 : g.wrapper;
    }
    l.currentComputed = be, l.watched = Symbol("watched"), l.unwatched = Symbol("unwatched");
  })(e.subtle || (e.subtle = {}));
})(q || (q = {}));
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
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $r = { CHILD: 2 }, xr = (e) => (...t) => ({ _$litDirective$: e, values: t });
class _r {
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
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
q.State;
q.Computed;
const Er = (e, t) => new q.State(e, t), ot = Er({
  siteId: ""
});
var Ar = Object.defineProperty, Sr = Object.getOwnPropertyDescriptor, me = (e, t, r, i) => {
  for (var s = i > 1 ? void 0 : i ? Sr(t, r) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (s = (i ? o(t, r, s) : o(s)) || s);
  return i && s && Ar(t, r, s), s;
};
let xt = class extends J {
  constructor() {
    super(...arguments), this.link = void 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.openLink();
  }
  openLink() {
    this.link && window.open(this.link, "_blank");
  }
  handleOnCreateLinkClick() {
    return $(this, null, function* () {
      var t;
      const e = (t = prompt("Enter the link you want to create")) != null ? t : "";
      if (e) {
        const r = {
          property: ot.get().siteId,
          type: "pandora-link",
          attributes: {
            element: "<pandora-link></pandora-link>",
            link: e
          }
        }, i = yield (yield ue(r)).json();
        document.dispatchEvent(
          new CustomEvent(st.plugin.register, {
            detail: i,
            bubbles: !0
          })
        );
      }
    });
  }
  static Icon(e) {
    return `<img src="https://www.google.com/s2/favicons?domain_url=${e.link}"></img>`;
  }
  render() {
    return this.link ? A`<div>
      <span @click="${this.openLink}" class="cursor-pointer hover:underline"
        >Open Link</span
      >
    </div>` : A`<svg
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
me([
  z()
], xt.prototype, "link", 2);
xt = me([
  K("pandora-link")
], xt);
var Pr = Object.defineProperty, Nr = Object.getOwnPropertyDescriptor, Ot = (e, t, r, i) => {
  for (var s = i > 1 ? void 0 : i ? Nr(t, r) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (s = (i ? o(t, r, s) : o(s)) || s);
  return i && s && Pr(t, r, s), s;
};
let at = class extends J {
  constructor() {
    super(...arguments), this.heading = void 0, this.note = void 0;
  }
  handleOnCreateNoteClick() {
    return $(this, null, function* () {
      var r, i;
      const e = (r = prompt("Enter your note title")) != null ? r : "", t = (i = prompt("Enter your note")) != null ? i : "";
      if (e && t) {
        const s = {
          property: ot.get().siteId,
          type: "pandora-note",
          attributes: {
            element: "<pandora-note></pandora-note>",
            heading: e,
            note: t
          }
        }, n = yield (yield ue(s)).json();
        document.dispatchEvent(
          new CustomEvent(st.plugin.register, {
            detail: n,
            bubbles: !0
          })
        );
      }
    });
  }
  static Icon(e) {
    return '<svg viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M0.410156 1.09937C0.410156 1.39676 0.651234 1.63784 0.948618 1.63784C1.94171 1.63784 2.60697 1.88611 3.01712 2.24499C3.41785 2.59564 3.64093 3.10919 3.64093 3.79168V7.02245H2.29477C1.99739 7.02245 1.75631 7.26353 1.75631 7.56091C1.75631 7.8583 1.99739 8.09938 2.29477 8.09938H3.64093V11.3301C3.64093 12.0126 3.41785 12.5262 3.01712 12.8768C2.60697 13.2357 1.94171 13.484 0.948618 13.484C0.651234 13.484 0.410156 13.7251 0.410156 14.0225C0.410156 14.3198 0.651234 14.5609 0.948618 14.5609C2.10938 14.5609 3.0595 14.2707 3.72627 13.6873C3.9012 13.5342 4.05197 13.3651 4.17939 13.1822C4.30681 13.3651 4.45758 13.5342 4.6325 13.6873C5.29928 14.2707 6.2494 14.5609 7.41016 14.5609C7.70754 14.5609 7.94862 14.3198 7.94862 14.0225C7.94862 13.7251 7.70754 13.484 7.41016 13.484C6.41707 13.484 5.75181 13.2357 5.34166 12.8768C4.94092 12.5262 4.71785 12.0126 4.71785 11.3301V8.09938H6.064C6.36139 8.09938 6.60247 7.8583 6.60247 7.56091C6.60247 7.26353 6.36139 7.02245 6.064 7.02245H4.71785V3.79168C4.71785 3.10919 4.94092 2.59564 5.34166 2.24499C5.75181 1.88611 6.41707 1.63784 7.41016 1.63784C7.70754 1.63784 7.94862 1.39676 7.94862 1.09937C7.94862 0.801991 7.70754 0.560913 7.41016 0.560913C6.2494 0.560913 5.29928 0.851097 4.6325 1.43453C4.45758 1.58758 4.30681 1.75676 4.17939 1.93962C4.05197 1.75676 3.90119 1.58758 3.72627 1.43453C3.0595 0.851097 2.10938 0.560913 0.948618 0.560913C0.651234 0.560913 0.410156 0.801991 0.410156 1.09937Z" fill="currentColor"/></svg>';
  }
  render() {
    return !this.heading || !this.note ? A`<svg
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
      </svg>` : A`<div
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
Ot([
  z()
], at.prototype, "heading", 2);
Ot([
  z()
], at.prototype, "note", 2);
at = Ot([
  K("pandora-note")
], at);
var Or = Object.getOwnPropertyDescriptor, kr = (e, t, r, i) => {
  for (var s = i > 1 ? void 0 : i ? Or(t, r) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (s = o(s) || s);
  return s;
};
let Jt = class extends J {
  static Icon() {
    return '<svg viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.47261 1.31531e-06C2.88826 1.31531e-06 2.31703 0.173282 1.83116 0.497932C1.34528 0.822581 0.966592 1.28402 0.742969 1.82389C0.519347 2.36376 0.460837 2.95782 0.574838 3.53095C0.68884 4.10407 0.970233 4.63052 1.38343 5.04372C1.79663 5.45692 2.32308 5.73832 2.89621 5.85232C3.46934 5.96632 4.0634 5.90781 4.60327 5.68419C5.14314 5.46057 5.60458 5.08188 5.92923 4.596C6.25388 4.11013 6.42716 3.5389 6.42716 2.95455C6.42716 2.17095 6.11588 1.41945 5.56179 0.865367C5.00771 0.311283 4.25621 1.31531e-06 3.47261 1.31531e-06ZM3.47261 4.72727C3.122 4.72727 2.77926 4.6233 2.48774 4.42851C2.19621 4.23372 1.969 3.95686 1.83483 3.63294C1.70065 3.30902 1.66555 2.95258 1.73395 2.6087C1.80235 2.26483 1.97118 1.94896 2.21911 1.70104C2.46703 1.45312 2.7829 1.28428 3.12677 1.21588C3.47065 1.14748 3.82708 1.18259 4.15101 1.31676C4.47493 1.45093 4.75179 1.67815 4.94658 1.96967C5.14137 2.2612 5.24534 2.60393 5.24534 2.95455C5.24534 3.4247 5.05857 3.8756 4.72612 4.20805C4.39367 4.5405 3.94277 4.72727 3.47261 4.72727ZM10.5635 5.90909C11.1479 5.90909 11.7191 5.73581 12.205 5.41116C12.6908 5.08651 13.0695 4.62507 13.2932 4.0852C13.5168 3.54533 13.5753 2.95127 13.4613 2.37814C13.3473 1.80502 13.0659 1.27857 12.6527 0.865367C12.2395 0.452167 11.713 0.170774 11.1399 0.0567721C10.5668 -0.0572297 9.97274 0.00128016 9.43286 0.224903C8.89299 0.448525 8.43155 0.827217 8.10691 1.31309C7.78226 1.79896 7.60897 2.37019 7.60897 2.95455C7.60897 3.73814 7.92026 4.48964 8.47434 5.04372C9.02843 5.59781 9.77993 5.90909 10.5635 5.90909ZM10.5635 1.18182C10.9141 1.18182 11.2569 1.28579 11.5484 1.48058C11.8399 1.67537 12.0671 1.95223 12.2013 2.27615C12.3355 2.60008 12.3706 2.95651 12.3022 3.30039C12.2338 3.64426 12.0649 3.96013 11.817 4.20805C11.5691 4.45597 11.2532 4.62481 10.9094 4.69321C10.5655 4.76161 10.209 4.72651 9.88513 4.59233C9.5612 4.45816 9.28434 4.23094 9.08955 3.93942C8.89476 3.6479 8.79079 3.30516 8.79079 2.95455C8.79079 2.48439 8.97756 2.03349 9.31001 1.70104C9.64246 1.36859 10.0934 1.18182 10.5635 1.18182ZM3.47261 7.09091C2.88826 7.09091 2.31703 7.26419 1.83116 7.58884C1.34528 7.91349 0.966592 8.37493 0.742969 8.9148C0.519347 9.45467 0.460837 10.0487 0.574838 10.6219C0.68884 11.195 0.970233 11.7214 1.38343 12.1346C1.79663 12.5478 2.32308 12.8292 2.89621 12.9432C3.46934 13.0572 4.0634 12.9987 4.60327 12.7751C5.14314 12.5515 5.60458 12.1728 5.92923 11.6869C6.25388 11.201 6.42716 10.6298 6.42716 10.0455C6.42716 9.26186 6.11588 8.51036 5.56179 7.95627C5.00771 7.40219 4.25621 7.09091 3.47261 7.09091ZM3.47261 11.8182C3.122 11.8182 2.77926 11.7142 2.48774 11.5194C2.19621 11.3246 1.969 11.0478 1.83483 10.7238C1.70065 10.3999 1.66555 10.0435 1.73395 9.69961C1.80235 9.35574 1.97118 9.03987 2.21911 8.79195C2.46703 8.54403 2.7829 8.37519 3.12677 8.30679C3.47065 8.23839 3.82708 8.27349 4.15101 8.40767C4.47493 8.54184 4.75179 8.76906 4.94658 9.06058C5.14137 9.3521 5.24534 9.69484 5.24534 10.0455C5.24534 10.5156 5.05857 10.9665 4.72612 11.299C4.39367 11.6314 3.94277 11.8182 3.47261 11.8182ZM13.5181 10.0455C13.5181 10.2022 13.4558 10.3525 13.345 10.4633C13.2342 10.5741 13.0839 10.6364 12.9272 10.6364H11.1544V12.4091C11.1544 12.5658 11.0922 12.7161 10.9814 12.8269C10.8705 12.9377 10.7202 13 10.5635 13C10.4068 13 10.2565 12.9377 10.1457 12.8269C10.0349 12.7161 9.97261 12.5658 9.97261 12.4091V10.6364H8.19988C8.04317 10.6364 7.89286 10.5741 7.78205 10.4633C7.67123 10.3525 7.60897 10.2022 7.60897 10.0455C7.60897 9.88873 7.67123 9.73843 7.78205 9.62762C7.89286 9.5168 8.04317 9.45454 8.19988 9.45454H9.97261V7.68182C9.97261 7.5251 10.0349 7.3748 10.1457 7.26398C10.2565 7.15316 10.4068 7.09091 10.5635 7.09091C10.7202 7.09091 10.8705 7.15316 10.9814 7.26398C11.0922 7.3748 11.1544 7.5251 11.1544 7.68182V9.45454H12.9272C13.0839 9.45454 13.2342 9.5168 13.345 9.62762C13.4558 9.73843 13.5181 9.88873 13.5181 10.0455Z" fill="currentColor"/></svg>';
  }
  render() {
    return A`
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
Jt = kr([
  K("pandora-installer")
], Jt);
customElements.whenDefined("pandora-box").then(() => {
  customElements.get("pandora-box").registerPlugin({
    id: "pandora-installer",
    type: "pandora-installer",
    label: "Installer Plugin",
    element: "<pandora-installer></pandora-installer>",
    hooks: {
      onReady: () => gt("Installer is initialized!"),
      onMount: (e) => gt("Installer is mounted!"),
      onUnmount: (e, t) => gt("Installer is destroyed")
    }
  });
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class _t extends _r {
  constructor(t) {
    if (super(t), this.it = m, t.type !== $r.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === m || t == null) return this._t = void 0, this.it = t;
    if (t === k) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const r = [t];
    return r.raw = r, this._t = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
}
_t.directiveName = "unsafeHTML", _t.resultType = 1;
const Ir = xr(_t);
var Tr = Object.defineProperty, Mr = Object.getOwnPropertyDescriptor, kt = (e, t, r, i) => {
  for (var s = i > 1 ? void 0 : i ? Mr(t, r) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (s = (i ? o(t, r, s) : o(s)) || s);
  return i && s && Tr(t, r, s), s;
};
let C = class e extends J {
  constructor() {
    super(...arguments), this.activePlugin = null, this.siteId = "";
  }
  static registerPlugin(t) {
    if (!C.plugins.find((r) => r.id === t.id)) {
      C.plugins.push(t);
      const r = document.querySelector("pandora-box");
      if (t.hooks) {
        const { onReady: i } = t.hooks;
        i && i();
      }
      r.requestUpdate();
    }
  }
  static unRegisterPlugin(t) {
    C.plugins = C.plugins.filter(
      (i) => i.id !== t.id
    ), document.querySelector("pandora-box").requestUpdate();
  }
  connectedCallback() {
    return $(this, null, function* () {
      Lt(e.prototype, this, "connectedCallback").call(this), ot.set(T(x({}, ot.get()), {
        siteId: this.siteId
      })), document.addEventListener(
        st.plugin.icon.update,
        this.onUpdatePluginIconImage.bind(this)
      ), document.addEventListener(
        st.plugin.register,
        this.onRegisterPlugin.bind(this)
      ), (yield tr(this.siteId).then((i) => i.items)).map((i) => {
        const { id: s, created: n, updated: o, type: l, property: a, attributes: c } = i;
        return T(x({ created: n, updated: o, type: l, property: a }, c), { id: s });
      }).forEach((i) => C.registerPlugin(i));
    });
  }
  onUpdatePluginIconImage(t) {
    return $(this, null, function* () {
      const r = t.detail, i = this.renderRoot.querySelectorAll(`div#${r.id}`);
      i.length > 0 && i[0] && (i[0].innerHTML = r.icon || "");
    });
  }
  onRegisterPlugin(t) {
    return $(this, null, function* () {
      const r = t.detail, i = r.attributes;
      try {
        C.plugins.find((s) => s.id === i.id) ? alert("Duplicate plugin") : C.registerPlugin(x(x({}, i), r));
      } catch (s) {
        this.deletePluginIcon(i.id);
      }
    });
  }
  deletePluginIcon(t) {
    const r = this.renderRoot.getElementById(t);
    r && r.remove();
  }
  updatePluginIconImage(t, r) {
    const i = this.renderRoot.getElementById(t);
    if (i) {
      const s = i.querySelector("img");
      s.src = r;
    }
  }
  loadPluginById(t) {
    var h, d;
    const r = C.plugins.find(
      (p) => p.id === t
    ), i = this.renderRoot.querySelector("#active-panel");
    if (!i || !r) return;
    const c = r, { element: s, icon: n } = c, o = Ft(c, ["element", "icon"]), l = document.createElement("template");
    l.innerHTML = s.trim();
    const a = l.content.firstChild;
    if (a instanceof Element) {
      if (Object.entries(o).forEach(([p, b]) => {
        a.setAttribute(p, b);
      }), this.activePlugin) {
        if ((h = this.activePlugin) != null && h.hooks) {
          const { onUnmount: p } = this.activePlugin.hooks;
          p && p(i);
        }
        if (i.innerHTML = "", r.id === ((d = this.activePlugin) == null ? void 0 : d.id))
          return this.activePlugin = null, null;
      }
      if (i.appendChild(a), r.hooks) {
        const { onMount: p } = r.hooks;
        p && p(i, a);
      }
      this.activePlugin = r;
    }
  }
  render() {
    return A`
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
            class="flex justify-start items-center ${C.plugins.length > 0 ? "gap-2" : ""}"
          >
            <app-logo classes="max-h-4 w-full transition-all"></app-logo>
            <div
              class="flex border-l border-[#343330] border-solid justify-center items-center gap-4 ${C.plugins.length > 0 ? "pl-2" : ""}"
            >
              ${C.plugins.map((t) => {
      var n;
      const r = ((n = this.activePlugin) == null ? void 0 : n.id) === t.id, i = customElements.get(t.type), s = t.icon || (i == null ? void 0 : i.Icon) && (i == null ? void 0 : i.Icon(t)) || "";
      return A`<div
                  id="${t.id}-${t.type}"
                  class="relative flex justify-center items-center group select-none"
                  @click="${(o) => {
        o.stopPropagation(), this.loadPluginById(t.id);
      }}"
                >
                  <div
                    class="transition-all absolute bg-gradient-to-b from-0% from-[#008CFF] to-[#3F55FF] to-100% rounded-full ${r ? "scale-110 size-6 opacity-100" : "scale-100 size-0 opacity-0"}"
                  ></div>
                  <div
                    class="relative size-5 [&>img,&>svg]:size-5 transition-all cursor-pointer ${r ? "text-[#F7F9FB] scale-80" : "text-[#F7F9FB]/60 hover:text-[#6EB7FF] scale-100 group-hover:scale-110"}"
                  >
                    ${Ir(s)}
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
C.plugins = [];
kt([
  Qe()
], C.prototype, "activePlugin", 2);
kt([
  z({ type: String, attribute: "site-id" })
], C.prototype, "siteId", 2);
C = kt([
  K("pandora-box")
], C);
export {
  C as PandorasBox
};
