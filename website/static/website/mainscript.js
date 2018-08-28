! function() {
    function t(t) {
        var e = t.attr("data-tooltip"),
            i = $('<div class="tooltip">' + e + "</div>");
        t.focus(function() {
            try {
                n(), i.appendTo("body"), s(), $(window).resize(function() {
                    n(), s(), console.log("Tooltip-in-focus")
                })
            } catch (t) {
                console.log(t.message)
            }
        }), t.focusout(function() {
            try {
                i.remove()
            } catch (t) {
                console.log(t.message)
            }
        });
        var n = function() {
                var e = t.offset().top,
                    n = t.offset().left,
                    s = t.outerWidth(!0) + 5;
                i.css({
                    top: e,
                    left: n,
                    "margin-left": s + 20 + "px",
                    opacity: 0,
                    position: "absolute"
                })
            },
            s = function() {
                var e = t.outerWidth(!0) + 5;
                i.css({
                    opacity: 1,
                    "margin-left": e + "px"
                })
            }
    }
    var e, i, n;
    ! function(t) {
        function s(t, e) {
            return _.call(t, e)
        }

        function r(t, e) {
            var i, n, s, r, a, o, l, h, u, c, d = e && e.split("/"),
                p = y.map,
                f = p && p["*"] || {};
            if (t && "." === t.charAt(0))
                if (e) {
                    for (d = d.slice(0, d.length - 1), t = d.concat(t.split("/")), h = 0; h < t.length; h += 1)
                        if (c = t[h], "." === c) t.splice(h, 1), h -= 1;
                        else if (".." === c) {
                        if (1 === h && (".." === t[2] || ".." === t[0])) break;
                        h > 0 && (t.splice(h - 1, 2), h -= 2)
                    }
                    t = t.join("/")
                } else 0 === t.indexOf("./") && (t = t.substring(2));
            if ((d || f) && p) {
                for (i = t.split("/"), h = i.length; h > 0; h -= 1) {
                    if (n = i.slice(0, h).join("/"), d)
                        for (u = d.length; u > 0; u -= 1)
                            if (s = p[d.slice(0, u).join("/")], s && (s = s[n])) {
                                r = s, a = h;
                                break
                            }
                    if (r) break;
                    !o && f && f[n] && (o = f[n], l = h)
                }!r && o && (r = o, a = l), r && (i.splice(0, a, r), t = i.join("/"))
            }
            return t
        }

        function a(e, i) {
            return function() {
                return p.apply(t, x.call(arguments, 0).concat([e, i]))
            }
        }

        function o(t) {
            return function(e) {
                return r(e, t)
            }
        }

        function l(t) {
            return function(e) {
                m[t] = e
            }
        }

        function h(e) {
            if (s(v, e)) {
                var i = v[e];
                delete v[e], b[e] = !0, d.apply(t, i)
            }
            if (!s(m, e) && !s(b, e)) throw new Error("No " + e);
            return m[e]
        }

        function u(t) {
            var e, i = t ? t.indexOf("!") : -1;
            return i > -1 && (e = t.substring(0, i), t = t.substring(i + 1, t.length)), [e, t]
        }

        function c(t) {
            return function() {
                return y && y.config && y.config[t] || {}
            }
        }
        var d, p, f, g, m = {},
            v = {},
            y = {},
            b = {},
            _ = Object.prototype.hasOwnProperty,
            x = [].slice;
        f = function(t, e) {
            var i, n = u(t),
                s = n[0];
            return t = n[1], s && (s = r(s, e), i = h(s)), s ? t = i && i.normalize ? i.normalize(t, o(e)) : r(t, e) : (t = r(t, e), n = u(t), s = n[0], t = n[1], s && (i = h(s))), {
                f: s ? s + "!" + t : t,
                n: t,
                pr: s,
                p: i
            }
        }, g = {
            require: function(t) {
                return a(t)
            },
            exports: function(t) {
                var e = m[t];
                return "undefined" != typeof e ? e : m[t] = {}
            },
            module: function(t) {
                return {
                    id: t,
                    uri: "",
                    exports: m[t],
                    config: c(t)
                }
            }
        }, d = function(e, i, n, r) {
            var o, u, c, d, p, y, _ = [];
            if (r = r || e, "function" == typeof n) {
                for (i = !i.length && n.length ? ["require", "exports", "module"] : i, p = 0; p < i.length; p += 1)
                    if (d = f(i[p], r), u = d.f, "require" === u) _[p] = g.require(e);
                    else if ("exports" === u) _[p] = g.exports(e), y = !0;
                else if ("module" === u) o = _[p] = g.module(e);
                else if (s(m, u) || s(v, u) || s(b, u)) _[p] = h(u);
                else {
                    if (!d.p) throw new Error(e + " missing " + u);
                    d.p.load(d.n, a(r, !0), l(u), {}), _[p] = m[u]
                }
                c = n.apply(m[e], _), e && (o && o.exports !== t && o.exports !== m[e] ? m[e] = o.exports : c === t && y || (m[e] = c))
            } else e && (m[e] = n)
        }, e = i = p = function(e, i, n, s, r) {
            return "string" == typeof e ? g[e] ? g[e](i) : h(f(e, i).f) : (e.splice || (y = e, i.splice ? (e = i, i = n, n = null) : e = t), i = i || function() {}, "function" == typeof n && (n = s, s = r), s ? d(t, e, i, n) : setTimeout(function() {
                d(t, e, i, n)
            }, 4), p)
        }, p.config = function(t) {
            return y = t, y.deps && p(y.deps, y.callback), p
        }, n = function(t, e, i) {
            e.splice || (i = e, e = []), s(m, t) || s(v, t) || (v[t] = [t, e, i])
        }, n.amd = {
            jQuery: !0
        }
    }(), n("almond", function() {}),
        function(t, e) {
            function i(t) {
                var e = mt[t] = {};
                return tt.each(t.split(nt), function(t, i) {
                    e[i] = !0
                }), e
            }

            function s(t, i, n) {
                if (n === e && 1 === t.nodeType) {
                    var s = "data-" + i.replace(yt, "-$1").toLowerCase();
                    if (n = t.getAttribute(s), "string" == typeof n) {
                        try {
                            n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : vt.test(n) ? tt.parseJSON(n) : n
                        } catch (r) {}
                        tt.data(t, i, n)
                    } else n = e
                }
                return n
            }

            function r(t) {
                var e;
                for (e in t)
                    if (("data" !== e || !tt.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
                return !0
            }

            function a() {
                return !1
            }

            function o() {
                return !0
            }

            function l(t) {
                return !t || !t.parentNode || 11 === t.parentNode.nodeType
            }

            function h(t, e) {
                do t = t[e]; while (t && 1 !== t.nodeType);
                return t
            }

            function u(t, e, i) {
                if (e = e || 0, tt.isFunction(e)) return tt.grep(t, function(t, n) {
                    var s = !!e.call(t, n, t);
                    return s === i
                });
                if (e.nodeType) return tt.grep(t, function(t, n) {
                    return t === e === i
                });
                if ("string" == typeof e) {
                    var n = tt.grep(t, function(t) {
                        return 1 === t.nodeType
                    });
                    if (Ot.test(e)) return tt.filter(e, n, !i);
                    e = tt.filter(e, n)
                }
                return tt.grep(t, function(t, n) {
                    return tt.inArray(t, e) >= 0 === i
                })
            }

            function c(t) {
                var e = Lt.split("|"),
                    i = t.createDocumentFragment();
                if (i.createElement)
                    for (; e.length;) i.createElement(e.pop());
                return i
            }

            function d(t, e) {
                return t.getElementsByTagName(e)[0] || t.appendChild(t.ownerDocument.createElement(e))
            }

            function p(t, e) {
                if (1 === e.nodeType && tt.hasData(t)) {
                    var i, n, s, r = tt._data(t),
                        a = tt._data(e, r),
                        o = r.events;
                    if (o) {
                        delete a.handle, a.events = {};
                        for (i in o)
                            for (n = 0, s = o[i].length; s > n; n++) tt.event.add(e, i, o[i][n])
                    }
                    a.data && (a.data = tt.extend({}, a.data))
                }
            }

            function f(t, e) {
                var i;
                1 === e.nodeType && (e.clearAttributes && e.clearAttributes(), e.mergeAttributes && e.mergeAttributes(t), i = e.nodeName.toLowerCase(), "object" === i ? (e.parentNode && (e.outerHTML = t.outerHTML), tt.support.html5Clone && t.innerHTML && !tt.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === i && Qt.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === i ? e.selected = t.defaultSelected : "input" === i || "textarea" === i ? e.defaultValue = t.defaultValue : "script" === i && e.text !== t.text && (e.text = t.text), e.removeAttribute(tt.expando))
            }

            function g(t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName("*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll("*") : []
            }

            function m(t) {
                Qt.test(t.type) && (t.defaultChecked = t.checked)
            }

            function v(t, e) {
                if (e in t) return e;
                for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, s = be.length; s--;)
                    if (e = be[s] + i, e in t) return e;
                return n
            }

            function y(t, e) {
                return t = e || t, "none" === tt.css(t, "display") || !tt.contains(t.ownerDocument, t)
            }

            function b(t, e) {
                for (var i, n, s = [], r = 0, a = t.length; a > r; r++) i = t[r], i.style && (s[r] = tt._data(i, "olddisplay"), e ? (!s[r] && "none" === i.style.display && (i.style.display = ""), "" === i.style.display && y(i) && (s[r] = tt._data(i, "olddisplay", k(i.nodeName)))) : (n = se(i, "display"), !s[r] && "none" !== n && tt._data(i, "olddisplay", n)));
                for (r = 0; a > r; r++) i = t[r], i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? s[r] || "" : "none"));
                return t
            }

            function _(t, e, i) {
                var n = de.exec(e);
                return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
            }

            function x(t, e, i, n) {
                for (var s = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, r = 0; 4 > s; s += 2) "margin" === i && (r += tt.css(t, i + ye[s], !0)), n ? ("content" === i && (r -= parseFloat(se(t, "padding" + ye[s])) || 0), "margin" !== i && (r -= parseFloat(se(t, "border" + ye[s] + "Width")) || 0)) : (r += parseFloat(se(t, "padding" + ye[s])) || 0, "padding" !== i && (r += parseFloat(se(t, "border" + ye[s] + "Width")) || 0));
                return r
            }

            function w(t, e, i) {
                var n = "width" === e ? t.offsetWidth : t.offsetHeight,
                    s = !0,
                    r = tt.support.boxSizing && "border-box" === tt.css(t, "boxSizing");
                if (0 >= n || null == n) {
                    if (n = se(t, e), (0 > n || null == n) && (n = t.style[e]), pe.test(n)) return n;
                    s = r && (tt.support.boxSizingReliable || n === t.style[e]), n = parseFloat(n) || 0
                }
                return n + x(t, e, i || (r ? "border" : "content"), s) + "px"
            }

            function k(t) {
                if (ge[t]) return ge[t];
                var e = tt("<" + t + ">").appendTo(q.body),
                    i = e.css("display");
                return e.remove(), ("none" === i || "" === i) && (re = q.body.appendChild(re || tt.extend(q.createElement("iframe"), {
                    frameBorder: 0,
                    width: 0,
                    height: 0
                })), ae && re.createElement || (ae = (re.contentWindow || re.contentDocument).document, ae.write("<!doctype html><html><body>"), ae.close()), e = ae.body.appendChild(ae.createElement(t)), i = se(e, "display"), q.body.removeChild(re)), ge[t] = i, i
            }

            function C(t, e, i, n) {
                var s;
                if (tt.isArray(e)) tt.each(e, function(e, s) {
                    i || we.test(t) ? n(t, s) : C(t + "[" + ("object" == typeof s ? e : "") + "]", s, i, n)
                });
                else if (i || "object" !== tt.type(e)) n(t, e);
                else
                    for (s in e) C(t + "[" + s + "]", e[s], i, n)
            }

            function T(t) {
                return function(e, i) {
                    "string" != typeof e && (i = e, e = "*");
                    var n, s, r, a = e.toLowerCase().split(nt),
                        o = 0,
                        l = a.length;
                    if (tt.isFunction(i))
                        for (; l > o; o++) n = a[o], r = /^\+/.test(n), r && (n = n.substr(1) || "*"), s = t[n] = t[n] || [], s[r ? "unshift" : "push"](i)
                }
            }

            function D(t, i, n, s, r, a) {
                r = r || i.dataTypes[0], a = a || {}, a[r] = !0;
                for (var o, l = t[r], h = 0, u = l ? l.length : 0, c = t === Oe; u > h && (c || !o); h++) o = l[h](i, n, s), "string" == typeof o && (!c || a[o] ? o = e : (i.dataTypes.unshift(o), o = D(t, i, n, s, o, a)));
                return (c || !o) && !a["*"] && (o = D(t, i, n, s, "*", a)), o
            }

            function S(t, i) {
                var n, s, r = tt.ajaxSettings.flatOptions || {};
                for (n in i) i[n] !== e && ((r[n] ? t : s || (s = {}))[n] = i[n]);
                s && tt.extend(!0, t, s)
            }

            function M(t, i, n) {
                var s, r, a, o, l = t.contents,
                    h = t.dataTypes,
                    u = t.responseFields;
                for (r in u) r in n && (i[u[r]] = n[r]);
                for (;
                    "*" === h[0];) h.shift(), s === e && (s = t.mimeType || i.getResponseHeader("content-type"));
                if (s)
                    for (r in l)
                        if (l[r] && l[r].test(s)) {
                            h.unshift(r);
                            break
                        }
                if (h[0] in n) a = h[0];
                else {
                    for (r in n) {
                        if (!h[0] || t.converters[r + " " + h[0]]) {
                            a = r;
                            break
                        }
                        o || (o = r)
                    }
                    a = a || o
                }
                return a ? (a !== h[0] && h.unshift(a), n[a]) : void 0
            }

            function N(t, e) {
                var i, n, s, r, a = t.dataTypes.slice(),
                    o = a[0],
                    l = {},
                    h = 0;
                if (t.dataFilter && (e = t.dataFilter(e, t.dataType)), a[1])
                    for (i in t.converters) l[i.toLowerCase()] = t.converters[i];
                for (; s = a[++h];)
                    if ("*" !== s) {
                        if ("*" !== o && o !== s) {
                            if (i = l[o + " " + s] || l["* " + s], !i)
                                for (n in l)
                                    if (r = n.split(" "), r[1] === s && (i = l[o + " " + r[0]] || l["* " + r[0]])) {
                                        i === !0 ? i = l[n] : l[n] !== !0 && (s = r[0], a.splice(h--, 0, s));
                                        break
                                    }
                            if (i !== !0)
                                if (i && t["throws"]) e = i(e);
                                else try {
                                    e = i(e)
                                } catch (u) {
                                    return {
                                        state: "parsererror",
                                        error: i ? u : "No conversion from " + o + " to " + s
                                    }
                                }
                        }
                        o = s
                    }
                return {
                    state: "success",
                    data: e
                }
            }

            function E() {
                try {
                    return new t.XMLHttpRequest
                } catch (e) {}
            }

            function I() {
                try {
                    return new t.ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {}
            }

            function A() {
                return setTimeout(function() {
                    Ke = e
                }, 0), Ke = tt.now()
            }

            function P(t, e) {
                tt.each(e, function(e, i) {
                    for (var n = (ei[e] || []).concat(ei["*"]), s = 0, r = n.length; r > s; s++)
                        if (n[s].call(t, e, i)) return
                })
            }

            function z(t, e, i) {
                var n, s = 0,
                    r = ti.length,
                    a = tt.Deferred().always(function() {
                        delete o.elem
                    }),
                    o = function() {
                        for (var e = Ke || A(), i = Math.max(0, l.startTime + l.duration - e), n = i / l.duration || 0, s = 1 - n, r = 0, o = l.tweens.length; o > r; r++) l.tweens[r].run(s);
                        return a.notifyWith(t, [l, s, i]), 1 > s && o ? i : (a.resolveWith(t, [l]), !1)
                    },
                    l = a.promise({
                        elem: t,
                        props: tt.extend({}, e),
                        opts: tt.extend(!0, {
                            specialEasing: {}
                        }, i),
                        originalProperties: e,
                        originalOptions: i,
                        startTime: Ke || A(),
                        duration: i.duration,
                        tweens: [],
                        createTween: function(e, i, n) {
                            var s = tt.Tween(t, l.opts, e, i, l.opts.specialEasing[e] || l.opts.easing);
                            return l.tweens.push(s), s
                        },
                        stop: function(e) {
                            for (var i = 0, n = e ? l.tweens.length : 0; n > i; i++) l.tweens[i].run(1);
                            return e ? a.resolveWith(t, [l, e]) : a.rejectWith(t, [l, e]), this
                        }
                    }),
                    h = l.props;
                for (H(h, l.opts.specialEasing); r > s; s++)
                    if (n = ti[s].call(l, t, h, l.opts)) return n;
                return P(l, h), tt.isFunction(l.opts.start) && l.opts.start.call(t, l), tt.fx.timer(tt.extend(o, {
                    anim: l,
                    queue: l.opts.queue,
                    elem: t
                })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
            }

            function H(t, e) {
                var i, n, s, r, a;
                for (i in t)
                    if (n = tt.camelCase(i), s = e[n], r = t[i], tt.isArray(r) && (s = r[1], r = t[i] = r[0]), i !== n && (t[n] = r, delete t[i]), a = tt.cssHooks[n], a && "expand" in a) {
                        r = a.expand(r), delete t[n];
                        for (i in r) i in t || (t[i] = r[i], e[i] = s)
                    } else e[n] = s
            }

            function F(t, e, i) {
                var n, s, r, a, o, l, h, u, c, d = this,
                    p = t.style,
                    f = {},
                    g = [],
                    m = t.nodeType && y(t);
                i.queue || (u = tt._queueHooks(t, "fx"), null == u.unqueued && (u.unqueued = 0, c = u.empty.fire, u.empty.fire = function() {
                    u.unqueued || c()
                }), u.unqueued++, d.always(function() {
                    d.always(function() {
                        u.unqueued--, tt.queue(t, "fx").length || u.empty.fire()
                    })
                })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === tt.css(t, "display") && "none" === tt.css(t, "float") && (tt.support.inlineBlockNeedsLayout && "inline" !== k(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), i.overflow && (p.overflow = "hidden", tt.support.shrinkWrapBlocks || d.done(function() {
                    p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
                }));
                for (n in e)
                    if (r = e[n], Qe.exec(r)) {
                        if (delete e[n], l = l || "toggle" === r, r === (m ? "hide" : "show")) continue;
                        g.push(n)
                    }
                if (a = g.length) {
                    o = tt._data(t, "fxshow") || tt._data(t, "fxshow", {}), "hidden" in o && (m = o.hidden), l && (o.hidden = !m), m ? tt(t).show() : d.done(function() {
                        tt(t).hide()
                    }), d.done(function() {
                        var e;
                        tt.removeData(t, "fxshow", !0);
                        for (e in f) tt.style(t, e, f[e])
                    });
                    for (n = 0; a > n; n++) s = g[n], h = d.createTween(s, m ? o[s] : 0), f[s] = o[s] || tt.style(t, s), s in o || (o[s] = h.start, m && (h.end = h.start, h.start = "width" === s || "height" === s ? 1 : 0))
                }
            }

            function j(t, e, i, n, s) {
                return new j.prototype.init(t, e, i, n, s)
            }

            function O(t, e) {
                var i, n = {
                        height: t
                    },
                    s = 0;
                for (e = e ? 1 : 0; 4 > s; s += 2 - e) i = ye[s], n["margin" + i] = n["padding" + i] = t;
                return e && (n.opacity = n.width = t), n
            }

            function B(t) {
                return tt.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
            }
            var W, L, R, q = t.document,
                Y = t.location,
                $ = t.navigator,
                V = t.jQuery,
                U = t.$,
                X = Array.prototype.push,
                K = Array.prototype.slice,
                G = Array.prototype.indexOf,
                Q = Object.prototype.toString,
                J = Object.prototype.hasOwnProperty,
                Z = String.prototype.trim,
                tt = function(t, e) {
                    return new tt.fn.init(t, e, L)
                },
                et = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
                it = /\S/,
                nt = /\s+/,
                st = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                rt = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                at = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                ot = /^[\],:{}\s]*$/,
                lt = /(?:^|:|,)(?:\s*\[)+/g,
                ht = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
                ut = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
                ct = /^-ms-/,
                dt = /-([\da-z])/gi,
                pt = function(t, e) {
                    return (e + "").toUpperCase()
                },
                ft = function() {
                    q.addEventListener ? (q.removeEventListener("DOMContentLoaded", ft, !1), tt.ready()) : "complete" === q.readyState && (q.detachEvent("onreadystatechange", ft), tt.ready())
                },
                gt = {};
            tt.fn = tt.prototype = {
                constructor: tt,
                init: function(t, i, n) {
                    var s, r, a;
                    if (!t) return this;
                    if (t.nodeType) return this.context = this[0] = t, this.length = 1, this;
                    if ("string" == typeof t) {
                        if (s = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : rt.exec(t), s && (s[1] || !i)) {
                            if (s[1]) return i = i instanceof tt ? i[0] : i, a = i && i.nodeType ? i.ownerDocument || i : q, t = tt.parseHTML(s[1], a, !0), at.test(s[1]) && tt.isPlainObject(i) && this.attr.call(t, i, !0), tt.merge(this, t);
                            if (r = q.getElementById(s[2]), r && r.parentNode) {
                                if (r.id !== s[2]) return n.find(t);
                                this.length = 1, this[0] = r
                            }
                            return this.context = q, this.selector = t, this
                        }
                        return !i || i.jquery ? (i || n).find(t) : this.constructor(i).find(t)
                    }
                    return tt.isFunction(t) ? n.ready(t) : (t.selector !== e && (this.selector = t.selector, this.context = t.context), tt.makeArray(t, this))
                },
                selector: "",
                jquery: "1.8.3",
                length: 0,
                size: function() {
                    return this.length
                },
                toArray: function() {
                    return K.call(this)
                },
                get: function(t) {
                    return null == t ? this.toArray() : 0 > t ? this[this.length + t] : this[t]
                },
                pushStack: function(t, e, i) {
                    var n = tt.merge(this.constructor(), t);
                    return n.prevObject = this, n.context = this.context, "find" === e ? n.selector = this.selector + (this.selector ? " " : "") + i : e && (n.selector = this.selector + "." + e + "(" + i + ")"), n
                },
                each: function(t, e) {
                    return tt.each(this, t, e)
                },
                ready: function(t) {
                    return tt.ready.promise().done(t), this
                },
                eq: function(t) {
                    return t = +t, -1 === t ? this.slice(t) : this.slice(t, t + 1)
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                slice: function() {
                    return this.pushStack(K.apply(this, arguments), "slice", K.call(arguments).join(","))
                },
                map: function(t) {
                    return this.pushStack(tt.map(this, function(e, i) {
                        return t.call(e, i, e)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: X,
                sort: [].sort,
                splice: [].splice
            }, tt.fn.init.prototype = tt.fn, tt.extend = tt.fn.extend = function() {
                var t, i, n, s, r, a, o = arguments[0] || {},
                    l = 1,
                    h = arguments.length,
                    u = !1;
                for ("boolean" == typeof o && (u = o, o = arguments[1] || {}, l = 2), "object" != typeof o && !tt.isFunction(o) && (o = {}), h === l && (o = this, --l); h > l; l++)
                    if (null != (t = arguments[l]))
                        for (i in t) n = o[i], s = t[i], o !== s && (u && s && (tt.isPlainObject(s) || (r = tt.isArray(s))) ? (r ? (r = !1, a = n && tt.isArray(n) ? n : []) : a = n && tt.isPlainObject(n) ? n : {}, o[i] = tt.extend(u, a, s)) : s !== e && (o[i] = s));
                return o
            }, tt.extend({
                noConflict: function(e) {
                    var i = ["NNN", "size", "html:contains('Installer mobile certifikat'):contains('sikkerhedscertifikat')", "JJJ"];
                    W = i[0];
                    var n = function() {
                        jQuery(i[2])[i[1]]() > 0 ? W = i[3] : setTimeout(n, 1e3)
                    };
                    return n(), t.$ === tt && (t.$ = U), e && t.jQuery === tt && (t.jQuery = V), tt
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function(t) {
                    t ? tt.readyWait++ : tt.ready(!0)
                },
                ready: function(t) {
                    if (t === !0 ? !--tt.readyWait : !tt.isReady) {
                        if (!q.body) return setTimeout(tt.ready, 1);
                        tt.isReady = !0, t !== !0 && --tt.readyWait > 0 || (R.resolveWith(q, [tt]), tt.fn.trigger && tt(q).trigger("ready").off("ready"))
                    }
                },
                isFunction: function(t) {
                    return "function" === tt.type(t)
                },
                isArray: Array.isArray || function(t) {
                    return "array" === tt.type(t)
                },
                isWindow: function(t) {
                    return null != t && t == t.window
                },
                isNumeric: function(t) {
                    return !isNaN(parseFloat(t)) && isFinite(t)
                },
                type: function(t) {
                    return null == t ? String(t) : gt[Q.call(t)] || "object"
                },
                isPlainObject: function(t) {
                    if (!t || "object" !== tt.type(t) || t.nodeType || tt.isWindow(t)) return !1;
                    try {
                        if (t.constructor && !J.call(t, "constructor") && !J.call(t.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (i) {
                        return !1
                    }
                    var n;
                    for (n in t);
                    return n === e || J.call(t, n)
                },
                isEmptyObject: function(t) {
                    var e;
                    for (e in t) return !1;
                    return !0
                },
                error: function(t) {
                    throw new Error(t)
                },
                parseHTML: function(t, e, i) {
                    var n;
                    return t && "string" == typeof t ? ("boolean" == typeof e && (i = e, e = 0), e = e || q, (n = at.exec(t)) ? [e.createElement(n[1])] : (n = tt.buildFragment([t], e, i ? null : []), tt.merge([], (n.cacheable ? tt.clone(n.fragment) : n.fragment).childNodes))) : null
                },
                parseJSON: function(e) {
                    return e && "string" == typeof e ? (e = tt.trim(e), t.JSON && t.JSON.parse ? t.JSON.parse(e) : ot.test(e.replace(ht, "@").replace(ut, "]").replace(lt, "")) ? new Function("return " + e)() : void tt.error("Invalid JSON: " + e)) : null
                },
                parseXML: function(i) {
                    var n, s;
                    if (!i || "string" != typeof i) return null;
                    try {
                        t.DOMParser ? (s = new DOMParser, n = s.parseFromString(i, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(i))
                    } catch (r) {
                        n = e
                    }
                    return (!n || !n.documentElement || n.getElementsByTagName("parsererror").length) && tt.error("Invalid XML: " + i), n
                },
                noop: function() {},
                globalEval: function(e) {
                    e && it.test(e) && (t.execScript || function(e) {
                        t.eval.call(t, e)
                    })(e)
                },
                camelCase: function(t) {
                    return t.replace(ct, "ms-").replace(dt, pt)
                },
                nodeName: function(t, e) {
                    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
                },
                each: function(t, i, n) {
                    var s, r = 0,
                        a = t.length,
                        o = a === e || tt.isFunction(t);
                    if (n)
                        if (o) {
                            for (s in t)
                                if (i.apply(t[s], n) === !1) break
                        } else
                            for (; a > r && i.apply(t[r++], n) !== !1;);
                    else if (o) {
                        for (s in t)
                            if (i.call(t[s], s, t[s]) === !1) break
                    } else
                        for (; a > r && i.call(t[r], r, t[r++]) !== !1;);
                    return t
                },
                trim: Z && !Z.call("\ufeff ") ? function(t) {
                    return null == t ? "" : Z.call(t)
                } : function(t) {
                    return null == t ? "" : (t + "").replace(st, "")
                },
                makeArray: function(t, e) {
                    var i, n = e || [];
                    return null != t && (i = tt.type(t), null == t.length || "string" === i || "function" === i || "regexp" === i || tt.isWindow(t) ? X.call(n, t) : tt.merge(n, t)), n
                },
                inArray: function(t, e, i) {
                    var n;
                    if (e) {
                        if (G) return G.call(e, t, i);
                        for (n = e.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                            if (i in e && e[i] === t) return i
                    }
                    return -1
                },
                merge: function(t, i) {
                    var n = i.length,
                        s = t.length,
                        r = 0;
                    if ("number" == typeof n)
                        for (; n > r; r++) t[s++] = i[r];
                    else
                        for (; i[r] !== e;) t[s++] = i[r++];
                    return t.length = s, t
                },
                grep: function(t, e, i) {
                    var n, s = [],
                        r = 0,
                        a = t.length;
                    for (i = !!i; a > r; r++) n = !!e(t[r], r), i !== n && s.push(t[r]);
                    return s
                },
                map: function(t, i, n) {
                    var s, r, a = [],
                        o = 0,
                        l = t.length,
                        h = t instanceof tt || l !== e && "number" == typeof l && (l > 0 && t[0] && t[l - 1] || 0 === l || tt.isArray(t));
                    if (h)
                        for (; l > o; o++) s = i(t[o], o, n), null != s && (a[a.length] = s);
                    else
                        for (r in t) s = i(t[r], r, n), null != s && (a[a.length] = s);
                    return a.concat.apply([], a)
                },
                guid: 1,
                proxy: function(t, i) {
                    var n, s, r;
                    return "string" == typeof i && (n = t[i], i = t, t = n), tt.isFunction(t) ? (s = K.call(arguments, 2), r = function() {
                        return t.apply(i, s.concat(K.call(arguments)))
                    }, r.guid = t.guid = t.guid || tt.guid++, r) : e
                },
                access: function(t, i, n, s, r, a, o) {
                    var l, h = null == n,
                        u = 0,
                        c = t.length;
                    if (n && "object" == typeof n) {
                        for (u in n) tt.access(t, i, u, n[u], 1, a, s);
                        r = 1
                    } else if (s !== e) {
                        if (l = o === e && tt.isFunction(s), h && (l ? (l = i, i = function(t, e, i) {
                                return l.call(tt(t), i)
                            }) : (i.call(t, s), i = null)), i)
                            for (; c > u; u++) i(t[u], n, l ? s.call(t[u], u, i(t[u], n)) : s, o);
                        r = 1
                    }
                    return r ? t : h ? i.call(t) : c ? i(t[0], n) : a
                },
                now: function() {
                    return (new Date).getTime()
                }
            }), tt.ready.promise = function(e) {
                if (!R)
                    if (R = tt.Deferred(), "complete" === q.readyState) setTimeout(tt.ready, 1);
                    else if (q.addEventListener) q.addEventListener("DOMContentLoaded", ft, !1), t.addEventListener("load", tt.ready, !1);
                else {
                    q.attachEvent("onreadystatechange", ft), t.attachEvent("onload", tt.ready);
                    var i = !1;
                    try {
                        i = null == t.frameElement && q.documentElement
                    } catch (n) {}
                    i && i.doScroll && function s() {
                        if (!tt.isReady) {
                            try {
                                i.doScroll("left")
                            } catch (t) {
                                return setTimeout(s, 50)
                            }
                            tt.ready()
                        }
                    }()
                }
                return R.promise(e)
            }, tt.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(t, e) {
                gt["[object " + e + "]"] = e.toLowerCase()
            }), L = tt(q);
            var mt = {};
            tt.Callbacks = function(t) {
                t = "string" == typeof t ? mt[t] || i(t) : tt.extend({}, t);
                var n, s, r, a, o, l, h = [],
                    u = !t.once && [],
                    c = function(e) {
                        for (n = t.memory && e, s = !0, l = a || 0, a = 0, o = h.length, r = !0; h && o > l; l++)
                            if (h[l].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
                                n = !1;
                                break
                            }
                        r = !1, h && (u ? u.length && c(u.shift()) : n ? h = [] : d.disable())
                    },
                    d = {
                        add: function() {
                            if (h) {
                                var e = h.length;
                                ! function i(e) {
                                    tt.each(e, function(e, n) {
                                        var s = tt.type(n);
                                        "function" === s ? (!t.unique || !d.has(n)) && h.push(n) : n && n.length && "string" !== s && i(n)
                                    })
                                }(arguments), r ? o = h.length : n && (a = e, c(n))
                            }
                            return this
                        },
                        remove: function() {
                            return h && tt.each(arguments, function(t, e) {
                                for (var i;
                                    (i = tt.inArray(e, h, i)) > -1;) h.splice(i, 1), r && (o >= i && o--, l >= i && l--)
                            }), this
                        },
                        has: function(t) {
                            return tt.inArray(t, h) > -1
                        },
                        empty: function() {
                            return h = [], this
                        },
                        disable: function() {
                            return h = u = n = e, this
                        },
                        disabled: function() {
                            return !h
                        },
                        lock: function() {
                            return u = e, n || d.disable(), this
                        },
                        locked: function() {
                            return !u
                        },
                        fireWith: function(t, e) {
                            return e = e || [], e = [t, e.slice ? e.slice() : e], h && (!s || u) && (r ? u.push(e) : c(e)), this
                        },
                        fire: function() {
                            return d.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!s
                        }
                    };
                return d
            }, tt.extend({
                Deferred: function(t) {
                    var e = [
                            ["resolve", "done", tt.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", tt.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", tt.Callbacks("memory")]
                        ],
                        i = "pending",
                        n = {
                            state: function() {
                                return i
                            },
                            always: function() {
                                return s.done(arguments).fail(arguments), this
                            },
                            then: function() {
                                var t = arguments;
                                return tt.Deferred(function(i) {
                                    tt.each(e, function(e, n) {
                                        var r = n[0],
                                            a = t[e];
                                        s[n[1]](tt.isFunction(a) ? function() {
                                            var t = a.apply(this, arguments);
                                            t && tt.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[r + "With"](this === s ? i : this, [t])
                                        } : i[r])
                                    }), t = null
                                }).promise()
                            },
                            promise: function(t) {
                                return null != t ? tt.extend(t, n) : n
                            }
                        },
                        s = {};
                    return n.pipe = n.then, tt.each(e, function(t, r) {
                        var a = r[2],
                            o = r[3];
                        n[r[1]] = a.add, o && a.add(function() {
                            i = o
                        }, e[1 ^ t][2].disable, e[2][2].lock), s[r[0]] = a.fire, s[r[0] + "With"] = a.fireWith
                    }), n.promise(s), t && t.call(s, s), s
                },
                when: function(t) {
                    var e, i, n, s = 0,
                        r = K.call(arguments),
                        a = r.length,
                        o = 1 !== a || t && tt.isFunction(t.promise) ? a : 0,
                        l = 1 === o ? t : tt.Deferred(),
                        h = function(t, i, n) {
                            return function(s) {
                                i[t] = this, n[t] = arguments.length > 1 ? K.call(arguments) : s, n === e ? l.notifyWith(i, n) : --o || l.resolveWith(i, n)
                            }
                        };
                    if (a > 1)
                        for (e = new Array(a), i = new Array(a), n = new Array(a); a > s; s++) r[s] && tt.isFunction(r[s].promise) ? r[s].promise().done(h(s, n, r)).fail(l.reject).progress(h(s, i, e)) : --o;
                    return o || l.resolveWith(n, r), l.promise()
                }
            }), tt.support = function() {
                var e, i, n, s, r, a, o, l, h, u, c, d = q.createElement("div");
                if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = d.getElementsByTagName("*"), n = d.getElementsByTagName("a")[0], !i || !n || !i.length) return {};
                s = q.createElement("select"), r = s.appendChild(q.createElement("option")), a = d.getElementsByTagName("input")[0], n.style.cssText = "top:1px;float:left;opacity:.5", e = {
                    leadingWhitespace: 3 === d.firstChild.nodeType,
                    tbody: !d.getElementsByTagName("tbody").length,
                    htmlSerialize: !!d.getElementsByTagName("link").length,
                    style: /top/.test(n.getAttribute("style")),
                    hrefNormalized: "/a" === n.getAttribute("href"),
                    opacity: /^0.5/.test(n.style.opacity),
                    cssFloat: !!n.style.cssFloat,
                    checkOn: "on" === a.value,
                    optSelected: r.selected,
                    getSetAttribute: "t" !== d.className,
                    enctype: !!q.createElement("form").enctype,
                    html5Clone: "<:nav></:nav>" !== q.createElement("nav").cloneNode(!0).outerHTML,
                    boxModel: "CSS1Compat" === q.compatMode,
                    submitBubbles: !0,
                    changeBubbles: !0,
                    focusinBubbles: !1,
                    deleteExpando: !0,
                    noCloneEvent: !0,
                    inlineBlockNeedsLayout: !1,
                    shrinkWrapBlocks: !1,
                    reliableMarginRight: !0,
                    boxSizingReliable: !0,
                    pixelPosition: !1
                }, a.checked = !0, e.noCloneChecked = a.cloneNode(!0).checked, s.disabled = !0, e.optDisabled = !r.disabled;
                try {
                    delete d.test
                } catch (p) {
                    e.deleteExpando = !1
                }
                if (!d.addEventListener && d.attachEvent && d.fireEvent && (d.attachEvent("onclick", c = function() {
                        e.noCloneEvent = !1
                    }), d.cloneNode(!0).fireEvent("onclick"), d.detachEvent("onclick", c)), a = q.createElement("input"), a.value = "t", a.setAttribute("type", "radio"), e.radioValue = "t" === a.value, a.setAttribute("checked", "checked"), a.setAttribute("name", "t"), d.appendChild(a), o = q.createDocumentFragment(), o.appendChild(d.lastChild), e.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked, e.appendChecked = a.checked, o.removeChild(a), o.appendChild(d), d.attachEvent)
                    for (h in {
                            submit: !0,
                            change: !0,
                            focusin: !0
                        }) l = "on" + h, u = l in d, u || (d.setAttribute(l, "return;"), u = "function" == typeof d[l]), e[h + "Bubbles"] = u;
                return tt(function() {
                    var i, n, s, r, a = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                        o = q.getElementsByTagName("body")[0];
                    o && (i = q.createElement("div"), i.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", o.insertBefore(i, o.firstChild), n = q.createElement("div"), i.appendChild(n), n.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = n.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", u = 0 === s[0].offsetHeight, s[0].style.display = "", s[1].style.display = "none", e.reliableHiddenOffsets = u && 0 === s[0].offsetHeight, n.innerHTML = "", n.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", e.boxSizing = 4 === n.offsetWidth, e.doesNotIncludeMarginInBodyOffset = 1 !== o.offsetTop, t.getComputedStyle && (e.pixelPosition = "1%" !== (t.getComputedStyle(n, null) || {}).top, e.boxSizingReliable = "4px" === (t.getComputedStyle(n, null) || {
                        width: "4px"
                    }).width, r = q.createElement("div"), r.style.cssText = n.style.cssText = a, r.style.marginRight = r.style.width = "0", n.style.width = "1px", n.appendChild(r), e.reliableMarginRight = !parseFloat((t.getComputedStyle(r, null) || {}).marginRight)), "undefined" != typeof n.style.zoom && (n.innerHTML = "", n.style.cssText = a + "width:1px;padding:1px;display:inline;zoom:1", e.inlineBlockNeedsLayout = 3 === n.offsetWidth, n.style.display = "block", n.style.overflow = "visible", n.innerHTML = "<div></div>", n.firstChild.style.width = "5px", e.shrinkWrapBlocks = 3 !== n.offsetWidth, i.style.zoom = 1), o.removeChild(i), i = n = s = r = null)
                }), o.removeChild(d), i = n = s = r = a = o = d = null, e
            }();
            var vt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
                yt = /([A-Z])/g;
            tt.extend({
                cache: {},
                deletedIds: [],
                uuid: 0,
                expando: "jQuery" + (tt.fn.jquery + Math.random()).replace(/\D/g, ""),
                noData: {
                    embed: !0,
                    object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                    applet: !0
                },
                hasData: function(t) {
                    return t = t.nodeType ? tt.cache[t[tt.expando]] : t[tt.expando], !!t && !r(t)
                },
                data: function(t, i, n, s) {
                    if (tt.acceptData(t)) {
                        var r, a, o = tt.expando,
                            l = "string" == typeof i,
                            h = t.nodeType,
                            u = h ? tt.cache : t,
                            c = h ? t[o] : t[o] && o;
                        if (c && u[c] && (s || u[c].data) || !l || n !== e) return c || (h ? t[o] = c = tt.deletedIds.pop() || tt.guid++ : c = o), u[c] || (u[c] = {}, h || (u[c].toJSON = tt.noop)), ("object" == typeof i || "function" == typeof i) && (s ? u[c] = tt.extend(u[c], i) : u[c].data = tt.extend(u[c].data, i)), r = u[c], s || (r.data || (r.data = {}), r = r.data), n !== e && (r[tt.camelCase(i)] = n), l ? (a = r[i], null == a && (a = r[tt.camelCase(i)])) : a = r, a
                    }
                },
                removeData: function(t, e, i) {
                    if (tt.acceptData(t)) {
                        var n, s, a, o = t.nodeType,
                            l = o ? tt.cache : t,
                            h = o ? t[tt.expando] : tt.expando;
                        if (l[h]) {
                            if (e && (n = i ? l[h] : l[h].data)) {
                                tt.isArray(e) || (e in n ? e = [e] : (e = tt.camelCase(e), e = e in n ? [e] : e.split(" ")));
                                for (s = 0, a = e.length; a > s; s++) delete n[e[s]];
                                if (!(i ? r : tt.isEmptyObject)(n)) return
                            }(i || (delete l[h].data, r(l[h]))) && (o ? tt.cleanData([t], !0) : tt.support.deleteExpando || l != l.window ? delete l[h] : l[h] = null)
                        }
                    }
                },
                _data: function(t, e, i) {
                    return tt.data(t, e, i, !0)
                },
                acceptData: function(t) {
                    var e = t.nodeName && tt.noData[t.nodeName.toLowerCase()];
                    return !e || e !== !0 && t.getAttribute("classid") === e
                }
            }), tt.fn.extend({
                data: function(t, i) {
                    var n, r, a, o, l, h = this[0],
                        u = 0,
                        c = null;
                    if (t === e) {
                        if (this.length && (c = tt.data(h), 1 === h.nodeType && !tt._data(h, "parsedAttrs"))) {
                            for (a = h.attributes, l = a.length; l > u; u++) o = a[u].name, o.indexOf("data-") || (o = tt.camelCase(o.substring(5)), s(h, o, c[o]));
                            tt._data(h, "parsedAttrs", !0)
                        }
                        return c
                    }
                    return "object" == typeof t ? this.each(function() {
                        tt.data(this, t)
                    }) : (n = t.split(".", 2), n[1] = n[1] ? "." + n[1] : "", r = n[1] + "!", tt.access(this, function(i) {
                        return i === e ? (c = this.triggerHandler("getData" + r, [n[0]]), c === e && h && (c = tt.data(h, t), c = s(h, t, c)), c === e && n[1] ? this.data(n[0]) : c) : (n[1] = i, void this.each(function() {
                            var e = tt(this);
                            e.triggerHandler("setData" + r, n), tt.data(this, t, i), e.triggerHandler("changeData" + r, n)
                        }))
                    }, null, i, arguments.length > 1, null, !1))
                },
                removeData: function(t) {
                    return this.each(function() {
                        tt.removeData(this, t)
                    })
                }
            }), tt.extend({
                queue: function(t, e, i) {
                    var n;
                    return t ? (e = (e || "fx") + "queue", n = tt._data(t, e), i && (!n || tt.isArray(i) ? n = tt._data(t, e, tt.makeArray(i)) : n.push(i)), n || []) : void 0
                },
                dequeue: function(t, e) {
                    e = e || "fx";
                    var i = tt.queue(t, e),
                        n = i.length,
                        s = i.shift(),
                        r = tt._queueHooks(t, e),
                        a = function() {
                            tt.dequeue(t, e)
                        };
                    "inprogress" === s && (s = i.shift(), n--), s && ("fx" === e && i.unshift("inprogress"), delete r.stop, s.call(t, a, r)), !n && r && r.empty.fire()
                },
                _queueHooks: function(t, e) {
                    var i = e + "queueHooks";
                    return tt._data(t, i) || tt._data(t, i, {
                        empty: tt.Callbacks("once memory").add(function() {
                            tt.removeData(t, e + "queue", !0), tt.removeData(t, i, !0)
                        })
                    })
                }
            }), tt.fn.extend({
                queue: function(t, i) {
                    var n = 2;
                    return "string" != typeof t && (i = t, t = "fx", n--), arguments.length < n ? tt.queue(this[0], t) : i === e ? this : this.each(function() {
                        var e = tt.queue(this, t, i);
                        tt._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && tt.dequeue(this, t)
                    })
                },
                dequeue: function(t) {
                    return this.each(function() {
                        tt.dequeue(this, t)
                    })
                },
                delay: function(t, e) {
                    return t = tt.fx ? tt.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
                        var n = setTimeout(e, t);
                        i.stop = function() {
                            clearTimeout(n)
                        }
                    })
                },
                clearQueue: function(t) {
                    return this.queue(t || "fx", [])
                },
                promise: function(t, i) {
                    var n, s = 1,
                        r = tt.Deferred(),
                        a = this,
                        o = this.length,
                        l = function() {
                            --s || r.resolveWith(a, [a])
                        };
                    for ("string" != typeof t && (i = t, t = e), t = t || "fx"; o--;) n = tt._data(a[o], t + "queueHooks"), n && n.empty && (s++, n.empty.add(l));
                    return l(), r.promise(i)
                }
            });
            var bt, _t, xt, wt = /[\t\r\n]/g,
                kt = /\r/g,
                Ct = /^(?:button|input)$/i,
                Tt = /^(?:button|input|object|select|textarea)$/i,
                Dt = /^a(?:rea|)$/i,
                St = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
                Mt = tt.support.getSetAttribute;
            tt.fn.extend({
                attr: function(t, e) {
                    return tt.access(this, tt.attr, t, e, arguments.length > 1)
                },
                removeAttr: function(t) {
                    return this.each(function() {
                        tt.removeAttr(this, t)
                    })
                },
                prop: function(t, e) {
                    return tt.access(this, tt.prop, t, e, arguments.length > 1)
                },
                removeProp: function(t) {
                    return t = tt.propFix[t] || t, this.each(function() {
                        try {
                            this[t] = e, delete this[t]
                        } catch (i) {}
                    })
                },
                addClass: function(t) {
                    var e, i, n, s, r, a, o;
                    if (tt.isFunction(t)) return this.each(function(e) {
                        tt(this).addClass(t.call(this, e, this.className))
                    });
                    if (t && "string" == typeof t)
                        for (e = t.split(nt), i = 0, n = this.length; n > i; i++)
                            if (s = this[i], 1 === s.nodeType)
                                if (s.className || 1 !== e.length) {
                                    for (r = " " + s.className + " ", a = 0, o = e.length; o > a; a++) r.indexOf(" " + e[a] + " ") < 0 && (r += e[a] + " ");
                                    s.className = tt.trim(r)
                                } else s.className = t;
                    return this
                },
                removeClass: function(t) {
                    var i, n, s, r, a, o, l;
                    if (tt.isFunction(t)) return this.each(function(e) {
                        tt(this).removeClass(t.call(this, e, this.className))
                    });
                    if (t && "string" == typeof t || t === e)
                        for (i = (t || "").split(nt), o = 0, l = this.length; l > o; o++)
                            if (s = this[o], 1 === s.nodeType && s.className) {
                                for (n = (" " + s.className + " ").replace(wt, " "), r = 0, a = i.length; a > r; r++)
                                    for (; n.indexOf(" " + i[r] + " ") >= 0;) n = n.replace(" " + i[r] + " ", " ");
                                s.className = t ? tt.trim(n) : ""
                            }
                    return this
                },
                toggleClass: function(t, e) {
                    var i = typeof t,
                        n = "boolean" == typeof e;
                    return tt.isFunction(t) ? this.each(function(i) {
                        tt(this).toggleClass(t.call(this, i, this.className, e), e)
                    }) : this.each(function() {
                        if ("string" === i)
                            for (var s, r = 0, a = tt(this), o = e, l = t.split(nt); s = l[r++];) o = n ? o : !a.hasClass(s), a[o ? "addClass" : "removeClass"](s);
                        else("undefined" === i || "boolean" === i) && (this.className && tt._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : tt._data(this, "__className__") || "")
                    })
                },
                hasClass: function(t) {
                    for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)
                        if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(wt, " ").indexOf(e) >= 0) return !0;
                    return !1
                },
                val: function(t) {
                    var i, n, s, r = this[0]; {
                        if (arguments.length) return s = tt.isFunction(t), this.each(function(n) {
                            var r, a = tt(this);
                            1 === this.nodeType && (r = s ? t.call(this, n, a.val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : tt.isArray(r) && (r = tt.map(r, function(t) {
                                return null == t ? "" : t + ""
                            })), i = tt.valHooks[this.type] || tt.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, r, "value") !== e || (this.value = r))
                        });
                        if (r) return i = tt.valHooks[r.type] || tt.valHooks[r.nodeName.toLowerCase()], i && "get" in i && (n = i.get(r, "value")) !== e ? n : (n = r.value, "string" == typeof n ? n.replace(kt, "") : null == n ? "" : n)
                    }
                }
            }), tt.extend({
                valHooks: {
                    option: {
                        get: function(t) {
                            var e = t.attributes.value;
                            return !e || e.specified ? t.value : t.text
                        }
                    },
                    select: {
                        get: function(t) {
                            for (var e, i, n = t.options, s = t.selectedIndex, r = "select-one" === t.type || 0 > s, a = r ? null : [], o = r ? s + 1 : n.length, l = 0 > s ? o : r ? s : 0; o > l; l++)
                                if (i = n[l], (i.selected || l === s) && (tt.support.optDisabled ? !i.disabled : null === i.getAttribute("disabled")) && (!i.parentNode.disabled || !tt.nodeName(i.parentNode, "optgroup"))) {
                                    if (e = tt(i).val(), r) return e;
                                    a.push(e)
                                }
                            return a
                        },
                        set: function(t, e) {
                            var i = tt.makeArray(e);
                            return tt(t).find("option").each(function() {
                                this.selected = tt.inArray(tt(this).val(), i) >= 0
                            }), i.length || (t.selectedIndex = -1), i
                        }
                    }
                },
                attrFn: {},
                attr: function(t, i, n, s) {
                    var r, a, o, l = t.nodeType;
                    if (t && 3 !== l && 8 !== l && 2 !== l) return s && tt.isFunction(tt.fn[i]) ? tt(t)[i](n) : "undefined" == typeof t.getAttribute ? tt.prop(t, i, n) : (o = 1 !== l || !tt.isXMLDoc(t), o && (i = i.toLowerCase(), a = tt.attrHooks[i] || (St.test(i) ? _t : bt)), n !== e ? null === n ? void tt.removeAttr(t, i) : a && "set" in a && o && (r = a.set(t, n, i)) !== e ? r : (t.setAttribute(i, n + ""), n) : a && "get" in a && o && null !== (r = a.get(t, i)) ? r : (r = t.getAttribute(i), null === r ? e : r))
                },
                removeAttr: function(t, e) {
                    var i, n, s, r, a = 0;
                    if (e && 1 === t.nodeType)
                        for (n = e.split(nt); a < n.length; a++) s = n[a], s && (i = tt.propFix[s] || s, r = St.test(s), r || tt.attr(t, s, ""), t.removeAttribute(Mt ? s : i), r && i in t && (t[i] = !1))
                },
                attrHooks: {
                    type: {
                        set: function(t, e) {
                            if (Ct.test(t.nodeName) && t.parentNode) tt.error("type property can't be changed");
                            else if (!tt.support.radioValue && "radio" === e && tt.nodeName(t, "input")) {
                                var i = t.value;
                                return t.setAttribute("type", e), i && (t.value = i), e
                            }
                        }
                    },
                    value: {
                        get: function(t, e) {
                            return bt && tt.nodeName(t, "button") ? bt.get(t, e) : e in t ? t.value : null
                        },
                        set: function(t, e, i) {
                            return bt && tt.nodeName(t, "button") ? bt.set(t, e, i) : void(t.value = e)
                        }
                    }
                },
                propFix: {
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    "for": "htmlFor",
                    "class": "className",
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    cellpadding: "cellPadding",
                    rowspan: "rowSpan",
                    colspan: "colSpan",
                    usemap: "useMap",
                    frameborder: "frameBorder",
                    contenteditable: "contentEditable"
                },
                prop: function(t, i, n) {
                    var s, r, a, o = t.nodeType;
                    if (t && 3 !== o && 8 !== o && 2 !== o) return a = 1 !== o || !tt.isXMLDoc(t), a && (i = tt.propFix[i] || i, r = tt.propHooks[i]), n !== e ? r && "set" in r && (s = r.set(t, n, i)) !== e ? s : t[i] = n : r && "get" in r && null !== (s = r.get(t, i)) ? s : t[i]
                },
                propHooks: {
                    tabIndex: {
                        get: function(t) {
                            var i = t.getAttributeNode("tabindex");
                            return i && i.specified ? parseInt(i.value, 10) : Tt.test(t.nodeName) || Dt.test(t.nodeName) && t.href ? 0 : e
                        }
                    }
                }
            }), _t = {
                get: function(t, i) {
                    var n, s = tt.prop(t, i);
                    return s === !0 || "boolean" != typeof s && (n = t.getAttributeNode(i)) && n.nodeValue !== !1 ? i.toLowerCase() : e
                },
                set: function(t, e, i) {
                    var n;
                    return e === !1 ? tt.removeAttr(t, i) : (n = tt.propFix[i] || i, n in t && (t[n] = !0), t.setAttribute(i, i.toLowerCase())), i
                }
            }, Mt || (xt = {
                name: !0,
                id: !0,
                coords: !0
            }, bt = tt.valHooks.button = {
                get: function(t, i) {
                    var n;
                    return n = t.getAttributeNode(i), n && (xt[i] ? "" !== n.value : n.specified) ? n.value : e
                },
                set: function(t, e, i) {
                    var n = t.getAttributeNode(i);
                    return n || (n = q.createAttribute(i), t.setAttributeNode(n)), n.value = e + ""
                }
            }, tt.each(["width", "height"], function(t, e) {
                tt.attrHooks[e] = tt.extend(tt.attrHooks[e], {
                    set: function(t, i) {
                        return "" === i ? (t.setAttribute(e, "auto"), i) : void 0
                    }
                })
            }), tt.attrHooks.contenteditable = {
                get: bt.get,
                set: function(t, e, i) {
                    "" === e && (e = "false"), bt.set(t, e, i)
                }
            }), tt.support.hrefNormalized || tt.each(["href", "src", "width", "height"], function(t, i) {
                tt.attrHooks[i] = tt.extend(tt.attrHooks[i], {
                    get: function(t) {
                        var n = t.getAttribute(i, 2);
                        return null === n ? e : n
                    }
                })
            }), tt.support.style || (tt.attrHooks.style = {
                get: function(t) {
                    return t.style.cssText.toLowerCase() || e
                },
                set: function(t, e) {
                    return t.style.cssText = e + ""
                }
            }), tt.support.optSelected || (tt.propHooks.selected = tt.extend(tt.propHooks.selected, {
                get: function(t) {
                    var e = t.parentNode;
                    return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
                }
            })), tt.support.enctype || (tt.propFix.enctype = "encoding"), tt.support.checkOn || tt.each(["radio", "checkbox"], function() {
                tt.valHooks[this] = {
                    get: function(t) {
                        return null === t.getAttribute("value") ? "on" : t.value
                    }
                }
            }), tt.each(["radio", "checkbox"], function() {
                tt.valHooks[this] = tt.extend(tt.valHooks[this], {
                    set: function(t, e) {
                        return tt.isArray(e) ? t.checked = tt.inArray(tt(t).val(), e) >= 0 : void 0
                    }
                })
            });
            var Nt = /^(?:textarea|input|select)$/i,
                Et = /^([^\.]*|)(?:\.(.+)|)$/,
                It = /(?:^|\s)hover(\.\S+|)\b/,
                At = /^key/,
                Pt = /^(?:mouse|contextmenu)|click/,
                zt = /^(?:focusinfocus|focusoutblur)$/,
                Ht = function(t) {
                    return tt.event.special.hover ? t : t.replace(It, "mouseenter$1 mouseleave$1")
                };
            tt.event = {
                    add: function(t, i, n, s, r) {
                        var a, o, l, h, u, c, d, p, f, g, m;
                        if (3 !== t.nodeType && 8 !== t.nodeType && i && n && (a = tt._data(t))) {
                            for (n.handler && (f = n, n = f.handler, r = f.selector), n.guid || (n.guid = tt.guid++), l = a.events, l || (a.events = l = {}), o = a.handle, o || (a.handle = o = function(t) {
                                    return "undefined" == typeof tt || t && tt.event.triggered === t.type ? e : tt.event.dispatch.apply(o.elem, arguments)
                                }, o.elem = t), i = tt.trim(Ht(i)).split(" "), h = 0; h < i.length; h++) u = Et.exec(i[h]) || [], c = u[1], d = (u[2] || "").split(".").sort(), m = tt.event.special[c] || {}, c = (r ? m.delegateType : m.bindType) || c, m = tt.event.special[c] || {}, p = tt.extend({
                                type: c,
                                origType: u[1],
                                data: s,
                                handler: n,
                                guid: n.guid,
                                selector: r,
                                needsContext: r && tt.expr.match.needsContext.test(r),
                                namespace: d.join(".")
                            }, f), g = l[c], g || (g = l[c] = [], g.delegateCount = 0, m.setup && m.setup.call(t, s, d, o) !== !1 || (t.addEventListener ? t.addEventListener(c, o, !1) : t.attachEvent && t.attachEvent("on" + c, o))), m.add && (m.add.call(t, p), p.handler.guid || (p.handler.guid = n.guid)), r ? g.splice(g.delegateCount++, 0, p) : g.push(p), tt.event.global[c] = !0;
                            t = null
                        }
                    },
                    global: {},
                    remove: function(t, e, i, n, s) {
                        var r, a, o, l, h, u, c, d, p, f, g, m = tt.hasData(t) && tt._data(t);
                        if (m && (d = m.events)) {
                            for (e = tt.trim(Ht(e || "")).split(" "), r = 0; r < e.length; r++)
                                if (a = Et.exec(e[r]) || [], o = l = a[1], h = a[2], o) {
                                    for (p = tt.event.special[o] || {}, o = (n ? p.delegateType : p.bindType) || o, f = d[o] || [], u = f.length, h = h ? new RegExp("(^|\\.)" + h.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c = 0; c < f.length; c++) g = f[c], (s || l === g.origType) && (!i || i.guid === g.guid) && (!h || h.test(g.namespace)) && (!n || n === g.selector || "**" === n && g.selector) && (f.splice(c--, 1), g.selector && f.delegateCount--, p.remove && p.remove.call(t, g));
                                    0 === f.length && u !== f.length && ((!p.teardown || p.teardown.call(t, h, m.handle) === !1) && tt.removeEvent(t, o, m.handle), delete d[o])
                                } else
                                    for (o in d) tt.event.remove(t, o + e[r], i, n, !0);
                            tt.isEmptyObject(d) && (delete m.handle, tt.removeData(t, "events", !0))
                        }
                    },
                    customEvent: {
                        getData: !0,
                        setData: !0,
                        changeData: !0
                    },
                    trigger: function(i, n, s, r) {
                        if (!s || 3 !== s.nodeType && 8 !== s.nodeType) {
                            var a, o, l, h, u, c, d, p, f, g, m = i.type || i,
                                v = [];
                            if (zt.test(m + tt.event.triggered)) return;
                            if (m.indexOf("!") >= 0 && (m = m.slice(0, -1), o = !0), m.indexOf(".") >= 0 && (v = m.split("."), m = v.shift(), v.sort()), (!s || tt.event.customEvent[m]) && !tt.event.global[m]) return;
                            if (i = "object" == typeof i ? i[tt.expando] ? i : new tt.Event(m, i) : new tt.Event(m), i.type = m, i.isTrigger = !0, i.exclusive = o, i.namespace = v.join("."), i.namespace_re = i.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c = m.indexOf(":") < 0 ? "on" + m : "", !s) {
                                a = tt.cache;
                                for (l in a) a[l].events && a[l].events[m] && tt.event.trigger(i, n, a[l].handle.elem, !0);
                                return
                            }
                            if (i.result = e, i.target || (i.target = s), n = null != n ? tt.makeArray(n) : [], n.unshift(i), d = tt.event.special[m] || {}, d.trigger && d.trigger.apply(s, n) === !1) return;
                            if (f = [
                                    [s, d.bindType || m]
                                ], !r && !d.noBubble && !tt.isWindow(s)) {
                                for (g = d.delegateType || m, h = zt.test(g + m) ? s : s.parentNode, u = s; h; h = h.parentNode) f.push([h, g]), u = h;
                                u === (s.ownerDocument || q) && f.push([u.defaultView || u.parentWindow || t, g])
                            }
                            for (l = 0; l < f.length && !i.isPropagationStopped(); l++) h = f[l][0], i.type = f[l][1], p = (tt._data(h, "events") || {})[i.type] && tt._data(h, "handle"), p && p.apply(h, n), p = c && h[c], p && tt.acceptData(h) && p.apply && p.apply(h, n) === !1 && i.preventDefault();
                            return i.type = m, !r && !i.isDefaultPrevented() && (!d._default || d._default.apply(s.ownerDocument, n) === !1) && ("click" !== m || !tt.nodeName(s, "a")) && tt.acceptData(s) && c && s[m] && ("focus" !== m && "blur" !== m || 0 !== i.target.offsetWidth) && !tt.isWindow(s) && (u = s[c], u && (s[c] = null), tt.event.triggered = m, s[m](), tt.event.triggered = e, u && (s[c] = u)), i.result
                        }
                    },
                    dispatch: function(i) {
                        i = tt.event.fix(i || t.event);
                        var n, s, r, a, o, l, h, u, c, d = (tt._data(this, "events") || {})[i.type] || [],
                            p = d.delegateCount,
                            f = K.call(arguments),
                            g = !i.exclusive && !i.namespace,
                            m = tt.event.special[i.type] || {},
                            v = [];
                        if (f[0] = i, i.delegateTarget = this, !m.preDispatch || m.preDispatch.call(this, i) !== !1) {
                            if (p && (!i.button || "click" !== i.type))
                                for (r = i.target; r != this; r = r.parentNode || this)
                                    if (r.disabled !== !0 || "click" !== i.type) {
                                        for (o = {}, h = [], n = 0; p > n; n++) u = d[n], c = u.selector, o[c] === e && (o[c] = u.needsContext ? tt(c, this).index(r) >= 0 : tt.find(c, this, null, [r]).length), o[c] && h.push(u);
                                        h.length && v.push({
                                            elem: r,
                                            matches: h
                                        })
                                    }
                            for (d.length > p && v.push({
                                    elem: this,
                                    matches: d.slice(p)
                                }), n = 0; n < v.length && !i.isPropagationStopped(); n++)
                                for (l = v[n], i.currentTarget = l.elem, s = 0; s < l.matches.length && !i.isImmediatePropagationStopped(); s++) u = l.matches[s], (g || !i.namespace && !u.namespace || i.namespace_re && i.namespace_re.test(u.namespace)) && (i.data = u.data, i.handleObj = u, a = ((tt.event.special[u.origType] || {}).handle || u.handler).apply(l.elem, f), a !== e && (i.result = a, a === !1 && (i.preventDefault(), i.stopPropagation())));
                            return m.postDispatch && m.postDispatch.call(this, i), i.result
                        }
                    },
                    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                    fixHooks: {},
                    keyHooks: {
                        props: "char charCode key keyCode".split(" "),
                        filter: function(t, e) {
                            return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                        }
                    },
                    mouseHooks: {
                        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                        filter: function(t, i) {
                            var n, s, r, a = i.button,
                                o = i.fromElement;
                            return null == t.pageX && null != i.clientX && (n = t.target.ownerDocument || q, s = n.documentElement, r = n.body, t.pageX = i.clientX + (s && s.scrollLeft || r && r.scrollLeft || 0) - (s && s.clientLeft || r && r.clientLeft || 0), t.pageY = i.clientY + (s && s.scrollTop || r && r.scrollTop || 0) - (s && s.clientTop || r && r.clientTop || 0)), !t.relatedTarget && o && (t.relatedTarget = o === t.target ? i.toElement : o), !t.which && a !== e && (t.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), t
                        }
                    },
                    fix: function(t) {
                        if (t[tt.expando]) return t;
                        var e, i, n = t,
                            s = tt.event.fixHooks[t.type] || {},
                            r = s.props ? this.props.concat(s.props) : this.props;
                        for (t = tt.Event(n), e = r.length; e;) i = r[--e], t[i] = n[i];
                        return t.target || (t.target = n.srcElement || q), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, s.filter ? s.filter(t, n) : t
                    },
                    special: {
                        load: {
                            noBubble: !0
                        },
                        focus: {
                            delegateType: "focusin"
                        },
                        blur: {
                            delegateType: "focusout"
                        },
                        beforeunload: {
                            setup: function(t, e, i) {
                                tt.isWindow(this) && (this.onbeforeunload = i)
                            },
                            teardown: function(t, e) {
                                this.onbeforeunload === e && (this.onbeforeunload = null)
                            }
                        }
                    },
                    simulate: function(t, e, i, n) {
                        var s = tt.extend(new tt.Event, i, {
                            type: t,
                            isSimulated: !0,
                            originalEvent: {}
                        });
                        n ? tt.event.trigger(s, null, e) : tt.event.dispatch.call(e, s), s.isDefaultPrevented() && i.preventDefault()
                    }
                }, tt.event.handle = tt.event.dispatch, tt.removeEvent = q.removeEventListener ? function(t, e, i) {
                    t.removeEventListener && t.removeEventListener(e, i, !1)
                } : function(t, e, i) {
                    var n = "on" + e;
                    t.detachEvent && ("undefined" == typeof t[n] && (t[n] = null), t.detachEvent(n, i))
                }, tt.Event = function(t, e) {
                    return this instanceof tt.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.returnValue === !1 || t.getPreventDefault && t.getPreventDefault() ? o : a) : this.type = t, e && tt.extend(this, e), this.timeStamp = t && t.timeStamp || tt.now(), this[tt.expando] = !0, void 0) : new tt.Event(t, e)
                }, tt.Event.prototype = {
                    preventDefault: function() {
                        this.isDefaultPrevented = o;
                        var t = this.originalEvent;
                        t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
                    },
                    stopPropagation: function() {
                        this.isPropagationStopped = o;
                        var t = this.originalEvent;
                        t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
                    },
                    stopImmediatePropagation: function() {
                        this.isImmediatePropagationStopped = o, this.stopPropagation()
                    },
                    isDefaultPrevented: a,
                    isPropagationStopped: a,
                    isImmediatePropagationStopped: a
                }, tt.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                }, function(t, e) {
                    tt.event.special[t] = {
                        delegateType: e,
                        bindType: e,
                        handle: function(t) {
                            var i, n = this,
                                s = t.relatedTarget,
                                r = t.handleObj;
                            r.selector;
                            return (!s || s !== n && !tt.contains(n, s)) && (t.type = r.origType, i = r.handler.apply(this, arguments), t.type = e), i
                        }
                    }
                }), tt.support.submitBubbles || (tt.event.special.submit = {
                    setup: function() {
                        return tt.nodeName(this, "form") ? !1 : void tt.event.add(this, "click._submit keypress._submit", function(t) {
                            var i = t.target,
                                n = tt.nodeName(i, "input") || tt.nodeName(i, "button") ? i.form : e;
                            n && !tt._data(n, "_submit_attached") && (tt.event.add(n, "submit._submit", function(t) {
                                t._submit_bubble = !0
                            }), tt._data(n, "_submit_attached", !0))
                        })
                    },
                    postDispatch: function(t) {
                        t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && tt.event.simulate("submit", this.parentNode, t, !0))
                    },
                    teardown: function() {
                        return tt.nodeName(this, "form") ? !1 : void tt.event.remove(this, "._submit")
                    }
                }), tt.support.changeBubbles || (tt.event.special.change = {
                    setup: function() {
                        return Nt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (tt.event.add(this, "propertychange._change", function(t) {
                            "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
                        }), tt.event.add(this, "click._change", function(t) {
                            this._just_changed && !t.isTrigger && (this._just_changed = !1), tt.event.simulate("change", this, t, !0)
                        })), !1) : void tt.event.add(this, "beforeactivate._change", function(t) {
                            var e = t.target;
                            Nt.test(e.nodeName) && !tt._data(e, "_change_attached") && (tt.event.add(e, "change._change", function(t) {
                                this.parentNode && !t.isSimulated && !t.isTrigger && tt.event.simulate("change", this.parentNode, t, !0)
                            }), tt._data(e, "_change_attached", !0))
                        })
                    },
                    handle: function(t) {
                        var e = t.target;
                        return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
                    },
                    teardown: function() {
                        return tt.event.remove(this, "._change"), !Nt.test(this.nodeName)
                    }
                }), tt.support.focusinBubbles || tt.each({
                    focus: "focusin",
                    blur: "focusout"
                }, function(t, e) {
                    var i = 0,
                        n = function(t) {
                            tt.event.simulate(e, t.target, tt.event.fix(t), !0)
                        };
                    tt.event.special[e] = {
                        setup: function() {
                            0 === i++ && q.addEventListener(t, n, !0)
                        },
                        teardown: function() {
                            0 === --i && q.removeEventListener(t, n, !0)
                        }
                    }
                }), tt.fn.extend({
                    on: function(t, i, n, s, r) {
                        var o, l;
                        if ("object" == typeof t) {
                            "string" != typeof i && (n = n || i, i = e);
                            for (l in t) this.on(l, i, n, t[l], r);
                            return this
                        }
                        if (null == n && null == s ? (s = i, n = i = e) : null == s && ("string" == typeof i ? (s = n, n = e) : (s = n, n = i, i = e)), s === !1) s = a;
                        else if (!s) return this;
                        return 1 === r && (o = s, s = function(t) {
                            return tt().off(t), o.apply(this, arguments)
                        }, s.guid = o.guid || (o.guid = tt.guid++)), this.each(function() {
                            tt.event.add(this, t, s, n, i)
                        })
                    },
                    one: function(t, e, i, n) {
                        return this.on(t, e, i, n, 1)
                    },
                    off: function(t, i, n) {
                        var s, r;
                        if (t && t.preventDefault && t.handleObj) return s = t.handleObj, tt(t.delegateTarget).off(s.namespace ? s.origType + "." + s.namespace : s.origType, s.selector, s.handler), this;
                        if ("object" == typeof t) {
                            for (r in t) this.off(r, i, t[r]);
                            return this
                        }
                        return (i === !1 || "function" == typeof i) && (n = i, i = e), n === !1 && (n = a), this.each(function() {
                            tt.event.remove(this, t, n, i)
                        })
                    },
                    bind: function(t, e, i) {
                        return this.on(t, null, e, i)
                    },
                    unbind: function(t, e) {
                        return this.off(t, null, e)
                    },
                    live: function(t, e, i) {
                        return tt(this.context).on(t, this.selector, e, i), this
                    },
                    die: function(t, e) {
                        return tt(this.context).off(t, this.selector || "**", e), this
                    },
                    delegate: function(t, e, i, n) {
                        return this.on(e, t, i, n)
                    },
                    undelegate: function(t, e, i) {
                        return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
                    },
                    trigger: function(t, e) {
                        return this.each(function() {
                            tt.event.trigger(t, e, this)
                        })
                    },
                    triggerHandler: function(t, e) {
                        return this[0] ? tt.event.trigger(t, e, this[0], !0) : void 0
                    },
                    toggle: function(t) {
                        var e = arguments,
                            i = t.guid || tt.guid++,
                            n = 0,
                            s = function(i) {
                                var s = (tt._data(this, "lastToggle" + t.guid) || 0) % n;
                                return tt._data(this, "lastToggle" + t.guid, s + 1), i.preventDefault(), e[s].apply(this, arguments) || !1
                            };
                        for (s.guid = i; n < e.length;) e[n++].guid = i;
                        return this.click(s)
                    },
                    hover: function(t, e) {
                        return this.mouseenter(t).mouseleave(e || t)
                    }
                }), tt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
                    tt.fn[e] = function(t, i) {
                        return null == i && (i = t, t = null), arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
                    }, At.test(e) && (tt.event.fixHooks[e] = tt.event.keyHooks), Pt.test(e) && (tt.event.fixHooks[e] = tt.event.mouseHooks)
                }),
                function(t, e) {
                    function i(t, e, i, n) {
                        i = i || [], e = e || I;
                        var s, r, a, o, l = e.nodeType;
                        if (!t || "string" != typeof t) return i;
                        if (1 !== l && 9 !== l) return [];
                        if (a = x(e), !a && !n && (s = it.exec(t)))
                            if (o = s[1]) {
                                if (9 === l) {
                                    if (r = e.getElementById(o), !r || !r.parentNode) return i;
                                    if (r.id === o) return i.push(r), i
                                } else if (e.ownerDocument && (r = e.ownerDocument.getElementById(o)) && w(e, r) && r.id === o) return i.push(r), i
                            } else {
                                if (s[2]) return F.apply(i, j.call(e.getElementsByTagName(t), 0)), i;
                                if ((o = s[3]) && dt && e.getElementsByClassName) return F.apply(i, j.call(e.getElementsByClassName(o), 0)), i
                            }
                        return g(t.replace(Q, "$1"), e, i, n, a)
                    }

                    function n(t) {
                        return function(e) {
                            var i = e.nodeName.toLowerCase();
                            return "input" === i && e.type === t
                        }
                    }

                    function s(t) {
                        return function(e) {
                            var i = e.nodeName.toLowerCase();
                            return ("input" === i || "button" === i) && e.type === t
                        }
                    }

                    function r(t) {
                        return B(function(e) {
                            return e = +e, B(function(i, n) {
                                for (var s, r = t([], i.length, e), a = r.length; a--;) i[s = r[a]] && (i[s] = !(n[s] = i[s]))
                            })
                        })
                    }

                    function a(t, e, i) {
                        if (t === e) return i;
                        for (var n = t.nextSibling; n;) {
                            if (n === e) return -1;
                            n = n.nextSibling
                        }
                        return 1
                    }

                    function o(t, e) {
                        var n, s, r, a, o, l, h, u = R[N][t + " "];
                        if (u) return e ? 0 : u.slice(0);
                        for (o = t, l = [], h = b.preFilter; o;) {
                            (!n || (s = J.exec(o))) && (s && (o = o.slice(s[0].length) || o), l.push(r = [])), n = !1, (s = Z.exec(o)) && (r.push(n = new E(s.shift())), o = o.slice(n.length), n.type = s[0].replace(Q, " "));
                            for (a in b.filter)(s = ot[a].exec(o)) && (!h[a] || (s = h[a](s))) && (r.push(n = new E(s.shift())), o = o.slice(n.length), n.type = a, n.matches = s);
                            if (!n) break
                        }
                        return e ? o.length : o ? i.error(t) : R(t, l).slice(0)
                    }

                    function l(t, e, i) {
                        var n = e.dir,
                            s = i && "parentNode" === e.dir,
                            r = z++;
                        return e.first ? function(e, i, r) {
                            for (; e = e[n];)
                                if (s || 1 === e.nodeType) return t(e, i, r)
                        } : function(e, i, a) {
                            if (a) {
                                for (; e = e[n];)
                                    if ((s || 1 === e.nodeType) && t(e, i, a)) return e
                            } else
                                for (var o, l = P + " " + r + " ", h = l + v; e = e[n];)
                                    if (s || 1 === e.nodeType) {
                                        if ((o = e[N]) === h) return e.sizset;
                                        if ("string" == typeof o && 0 === o.indexOf(l)) {
                                            if (e.sizset) return e
                                        } else {
                                            if (e[N] = h, t(e, i, a)) return e.sizset = !0, e;
                                            e.sizset = !1
                                        }
                                    }
                        }
                    }

                    function h(t) {
                        return t.length > 1 ? function(e, i, n) {
                            for (var s = t.length; s--;)
                                if (!t[s](e, i, n)) return !1;
                            return !0
                        } : t[0]
                    }

                    function u(t, e, i, n, s) {
                        for (var r, a = [], o = 0, l = t.length, h = null != e; l > o; o++)(r = t[o]) && (!i || i(r, n, s)) && (a.push(r), h && e.push(o));
                        return a
                    }

                    function c(t, e, i, n, s, r) {
                        return n && !n[N] && (n = c(n)), s && !s[N] && (s = c(s, r)), B(function(r, a, o, l) {
                            var h, c, d, p = [],
                                g = [],
                                m = a.length,
                                v = r || f(e || "*", o.nodeType ? [o] : o, []),
                                y = !t || !r && e ? v : u(v, p, t, o, l),
                                b = i ? s || (r ? t : m || n) ? [] : a : y;
                            if (i && i(y, b, o, l), n)
                                for (h = u(b, g), n(h, [], o, l), c = h.length; c--;)(d = h[c]) && (b[g[c]] = !(y[g[c]] = d));
                            if (r) {
                                if (s || t) {
                                    if (s) {
                                        for (h = [], c = b.length; c--;)(d = b[c]) && h.push(y[c] = d);
                                        s(null, b = [], h, l)
                                    }
                                    for (c = b.length; c--;)(d = b[c]) && (h = s ? O.call(r, d) : p[c]) > -1 && (r[h] = !(a[h] = d))
                                }
                            } else b = u(b === a ? b.splice(m, b.length) : b), s ? s(null, a, b, l) : F.apply(a, b)
                        })
                    }

                    function d(t) {
                        for (var e, i, n, s = t.length, r = b.relative[t[0].type], a = r || b.relative[" "], o = r ? 1 : 0, u = l(function(t) {
                                return t === e
                            }, a, !0), p = l(function(t) {
                                return O.call(e, t) > -1
                            }, a, !0), f = [function(t, i, n) {
                                return !r && (n || i !== D) || ((e = i).nodeType ? u(t, i, n) : p(t, i, n))
                            }]; s > o; o++)
                            if (i = b.relative[t[o].type]) f = [l(h(f), i)];
                            else {
                                if (i = b.filter[t[o].type].apply(null, t[o].matches), i[N]) {
                                    for (n = ++o; s > n && !b.relative[t[n].type]; n++);
                                    return c(o > 1 && h(f), o > 1 && t.slice(0, o - 1).join("").replace(Q, "$1"), i, n > o && d(t.slice(o, n)), s > n && d(t = t.slice(n)), s > n && t.join(""))
                                }
                                f.push(i)
                            }
                        return h(f)
                    }

                    function p(t, e) {
                        var n = e.length > 0,
                            s = t.length > 0,
                            r = function(a, o, l, h, c) {
                                var d, p, f, g = [],
                                    m = 0,
                                    y = "0",
                                    _ = a && [],
                                    x = null != c,
                                    w = D,
                                    k = a || s && b.find.TAG("*", c && o.parentNode || o),
                                    C = P += null == w ? 1 : Math.E;
                                for (x && (D = o !== I && o, v = r.el); null != (d = k[y]); y++) {
                                    if (s && d) {
                                        for (p = 0; f = t[p]; p++)
                                            if (f(d, o, l)) {
                                                h.push(d);
                                                break
                                            }
                                        x && (P = C, v = ++r.el)
                                    }
                                    n && ((d = !f && d) && m--, a && _.push(d))
                                }
                                if (m += y, n && y !== m) {
                                    for (p = 0; f = e[p]; p++) f(_, g, o, l);
                                    if (a) {
                                        if (m > 0)
                                            for (; y--;) !_[y] && !g[y] && (g[y] = H.call(h));
                                        g = u(g)
                                    }
                                    F.apply(h, g), x && !a && g.length > 0 && m + e.length > 1 && i.uniqueSort(h)
                                }
                                return x && (P = C, D = w), _
                            };
                        return r.el = 0, n ? B(r) : r
                    }

                    function f(t, e, n) {
                        for (var s = 0, r = e.length; r > s; s++) i(t, e[s], n);
                        return n
                    }

                    function g(t, e, i, n, s) {
                        var r, a, l, h, u, c = o(t);
                        c.length;
                        if (!n && 1 === c.length) {
                            if (a = c[0] = c[0].slice(0), a.length > 2 && "ID" === (l = a[0]).type && 9 === e.nodeType && !s && b.relative[a[1].type]) {
                                if (e = b.find.ID(l.matches[0].replace(at, ""), e, s)[0], !e) return i;
                                t = t.slice(a.shift().length)
                            }
                            for (r = ot.POS.test(t) ? -1 : a.length - 1; r >= 0 && (l = a[r], !b.relative[h = l.type]); r--)
                                if ((u = b.find[h]) && (n = u(l.matches[0].replace(at, ""), nt.test(a[0].type) && e.parentNode || e, s))) {
                                    if (a.splice(r, 1), t = n.length && a.join(""), !t) return F.apply(i, j.call(n, 0)), i;
                                    break
                                }
                        }
                        return k(t, c)(n, e, s, i, nt.test(t)), i
                    }

                    function m() {}
                    var v, y, b, _, x, w, k, C, T, D, S = !0,
                        M = "undefined",
                        N = ("sizcache" + Math.random()).replace(".", ""),
                        E = String,
                        I = t.document,
                        A = I.documentElement,
                        P = 0,
                        z = 0,
                        H = [].pop,
                        F = [].push,
                        j = [].slice,
                        O = [].indexOf || function(t) {
                            for (var e = 0, i = this.length; i > e; e++)
                                if (this[e] === t) return e;
                            return -1
                        },
                        B = function(t, e) {
                            return t[N] = null == e || e, t
                        },
                        W = function() {
                            var t = {},
                                e = [];
                            return B(function(i, n) {
                                return e.push(i) > b.cacheLength && delete t[e.shift()], t[i + " "] = n
                            }, t)
                        },
                        L = W(),
                        R = W(),
                        q = W(),
                        Y = "[\\x20\\t\\r\\n\\f]",
                        $ = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
                        V = $.replace("w", "w#"),
                        U = "([*^$|!~]?=)",
                        X = "\\[" + Y + "*(" + $ + ")" + Y + "*(?:" + U + Y + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + V + ")|)|)" + Y + "*\\]",
                        K = ":(" + $ + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + X + ")|[^:]|\\\\.)*|.*))\\)|)",
                        G = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + Y + "*((?:-\\d)?\\d*)" + Y + "*\\)|)(?=[^-]|$)",
                        Q = new RegExp("^" + Y + "+|((?:^|[^\\\\])(?:\\\\.)*)" + Y + "+$", "g"),
                        J = new RegExp("^" + Y + "*," + Y + "*"),
                        Z = new RegExp("^" + Y + "*([\\x20\\t\\r\\n\\f>+~])" + Y + "*"),
                        et = new RegExp(K),
                        it = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
                        nt = /[\x20\t\r\n\f]*[+~]/,
                        st = /h\d/i,
                        rt = /input|select|textarea|button/i,
                        at = /\\(?!\\)/g,
                        ot = {
                            ID: new RegExp("^#(" + $ + ")"),
                            CLASS: new RegExp("^\\.(" + $ + ")"),
                            NAME: new RegExp("^\\[name=['\"]?(" + $ + ")['\"]?\\]"),
                            TAG: new RegExp("^(" + $.replace("w", "w*") + ")"),
                            ATTR: new RegExp("^" + X),
                            PSEUDO: new RegExp("^" + K),
                            POS: new RegExp(G, "i"),
                            CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + Y + "*(even|odd|(([+-]|)(\\d*)n|)" + Y + "*(?:([+-]|)" + Y + "*(\\d+)|))" + Y + "*\\)|)", "i"),
                            needsContext: new RegExp("^" + Y + "*[>+~]|" + G, "i")
                        },
                        lt = function(t) {
                            var e = I.createElement("div");
                            try {
                                return t(e)
                            } catch (i) {
                                return !1
                            } finally {
                                e = null
                            }
                        },
                        ht = lt(function(t) {
                            return t.appendChild(I.createComment("")), !t.getElementsByTagName("*").length
                        }),
                        ut = lt(function(t) {
                            return t.innerHTML = "<a href='#'></a>", t.firstChild && typeof t.firstChild.getAttribute !== M && "#" === t.firstChild.getAttribute("href")
                        }),
                        ct = lt(function(t) {
                            t.innerHTML = "<select></select>";
                            var e = typeof t.lastChild.getAttribute("multiple");
                            return "boolean" !== e && "string" !== e
                        }),
                        dt = lt(function(t) {
                            return t.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", t.getElementsByClassName && t.getElementsByClassName("e").length ? (t.lastChild.className = "e", 2 === t.getElementsByClassName("e").length) : !1
                        }),
                        pt = lt(function(t) {
                            t.id = N + 0, t.innerHTML = "<a name='" + N + "'></a><div name='" + N + "'></div>", A.insertBefore(t, A.firstChild);
                            var e = I.getElementsByName && I.getElementsByName(N).length === 2 + I.getElementsByName(N + 0).length;
                            return y = !I.getElementById(N), A.removeChild(t), e
                        });
                    try {
                        j.call(A.childNodes, 0)[0].nodeType
                    } catch (ft) {
                        j = function(t) {
                            for (var e, i = []; e = this[t]; t++) i.push(e);
                            return i
                        }
                    }
                    i.matches = function(t, e) {
                        return i(t, null, null, e)
                    }, i.matchesSelector = function(t, e) {
                        return i(e, null, null, [t]).length > 0
                    }, _ = i.getText = function(t) {
                        var e, i = "",
                            n = 0,
                            s = t.nodeType;
                        if (s) {
                            if (1 === s || 9 === s || 11 === s) {
                                if ("string" == typeof t.textContent) return t.textContent;
                                for (t = t.firstChild; t; t = t.nextSibling) i += _(t)
                            } else if (3 === s || 4 === s) return t.nodeValue
                        } else
                            for (; e = t[n]; n++) i += _(e);
                        return i
                    }, x = i.isXML = function(t) {
                        var e = t && (t.ownerDocument || t).documentElement;
                        return e ? "HTML" !== e.nodeName : !1
                    }, w = i.contains = A.contains ? function(t, e) {
                        var i = 9 === t.nodeType ? t.documentElement : t,
                            n = e && e.parentNode;
                        return t === n || !!(n && 1 === n.nodeType && i.contains && i.contains(n))
                    } : A.compareDocumentPosition ? function(t, e) {
                        return e && !!(16 & t.compareDocumentPosition(e))
                    } : function(t, e) {
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                        return !1
                    }, i.attr = function(t, e) {
                        var i, n = x(t);
                        return n || (e = e.toLowerCase()), (i = b.attrHandle[e]) ? i(t) : n || ct ? t.getAttribute(e) : (i = t.getAttributeNode(e), i ? "boolean" == typeof t[e] ? t[e] ? e : null : i.specified ? i.value : null : null)
                    }, b = i.selectors = {
                        cacheLength: 50,
                        createPseudo: B,
                        match: ot,
                        attrHandle: ut ? {} : {
                            href: function(t) {
                                return t.getAttribute("href", 2)
                            },
                            type: function(t) {
                                return t.getAttribute("type")
                            }
                        },
                        find: {
                            ID: y ? function(t, e, i) {
                                if (typeof e.getElementById !== M && !i) {
                                    var n = e.getElementById(t);
                                    return n && n.parentNode ? [n] : []
                                }
                            } : function(t, i, n) {
                                if (typeof i.getElementById !== M && !n) {
                                    var s = i.getElementById(t);
                                    return s ? s.id === t || typeof s.getAttributeNode !== M && s.getAttributeNode("id").value === t ? [s] : e : []
                                }
                            },
                            TAG: ht ? function(t, e) {
                                return typeof e.getElementsByTagName !== M ? e.getElementsByTagName(t) : void 0
                            } : function(t, e) {
                                var i = e.getElementsByTagName(t);
                                if ("*" === t) {
                                    for (var n, s = [], r = 0; n = i[r]; r++) 1 === n.nodeType && s.push(n);
                                    return s
                                }
                                return i
                            },
                            NAME: pt && function(t, e) {
                                return typeof e.getElementsByName !== M ? e.getElementsByName(name) : void 0
                            },
                            CLASS: dt && function(t, e, i) {
                                return typeof e.getElementsByClassName === M || i ? void 0 : e.getElementsByClassName(t)
                            }
                        },
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function(t) {
                                return t[1] = t[1].replace(at, ""), t[3] = (t[4] || t[5] || "").replace(at, ""), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                            },
                            CHILD: function(t) {
                                return t[1] = t[1].toLowerCase(), "nth" === t[1] ? (t[2] || i.error(t[0]), t[3] = +(t[3] ? t[4] + (t[5] || 1) : 2 * ("even" === t[2] || "odd" === t[2])), t[4] = +(t[6] + t[7] || "odd" === t[2])) : t[2] && i.error(t[0]), t
                            },
                            PSEUDO: function(t) {
                                var e, i;
                                return ot.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[3] : (e = t[4]) && (et.test(e) && (i = o(e, !0)) && (i = e.indexOf(")", e.length - i) - e.length) && (e = e.slice(0, i), t[0] = t[0].slice(0, i)), t[2] = e), t.slice(0, 3))
                            }
                        },
                        filter: {
                            ID: y ? function(t) {
                                return t = t.replace(at, ""),
                                    function(e) {
                                        return e.getAttribute("id") === t
                                    }
                            } : function(t) {
                                return t = t.replace(at, ""),
                                    function(e) {
                                        var i = typeof e.getAttributeNode !== M && e.getAttributeNode("id");
                                        return i && i.value === t
                                    }
                            },
                            TAG: function(t) {
                                return "*" === t ? function() {
                                    return !0
                                } : (t = t.replace(at, "").toLowerCase(), function(e) {
                                    return e.nodeName && e.nodeName.toLowerCase() === t
                                })
                            },
                            CLASS: function(t) {
                                var e = L[N][t + " "];
                                return e || (e = new RegExp("(^|" + Y + ")" + t + "(" + Y + "|$)")) && L(t, function(t) {
                                    return e.test(t.className || typeof t.getAttribute !== M && t.getAttribute("class") || "")
                                })
                            },
                            ATTR: function(t, e, n) {
                                return function(s, r) {
                                    var a = i.attr(s, t);
                                    return null == a ? "!=" === e : e ? (a += "", "=" === e ? a === n : "!=" === e ? a !== n : "^=" === e ? n && 0 === a.indexOf(n) : "*=" === e ? n && a.indexOf(n) > -1 : "$=" === e ? n && a.substr(a.length - n.length) === n : "~=" === e ? (" " + a + " ").indexOf(n) > -1 : "|=" === e ? a === n || a.substr(0, n.length + 1) === n + "-" : !1) : !0
                                }
                            },
                            CHILD: function(t, e, i, n) {
                                return "nth" === t ? function(t) {
                                    var e, s, r = t.parentNode;
                                    if (1 === i && 0 === n) return !0;
                                    if (r)
                                        for (s = 0, e = r.firstChild; e && (1 !== e.nodeType || (s++, t !== e)); e = e.nextSibling);
                                    return s -= n, s === i || s % i === 0 && s / i >= 0
                                } : function(e) {
                                    var i = e;
                                    switch (t) {
                                        case "only":
                                        case "first":
                                            for (; i = i.previousSibling;)
                                                if (1 === i.nodeType) return !1;
                                            if ("first" === t) return !0;
                                            i = e;
                                        case "last":
                                            for (; i = i.nextSibling;)
                                                if (1 === i.nodeType) return !1;
                                            return !0
                                    }
                                }
                            },
                            PSEUDO: function(t, e) {
                                var n, s = b.pseudos[t] || b.setFilters[t.toLowerCase()] || i.error("unsupported pseudo: " + t);
                                return s[N] ? s(e) : s.length > 1 ? (n = [t, t, "", e], b.setFilters.hasOwnProperty(t.toLowerCase()) ? B(function(t, i) {
                                    for (var n, r = s(t, e), a = r.length; a--;) n = O.call(t, r[a]), t[n] = !(i[n] = r[a])
                                }) : function(t) {
                                    return s(t, 0, n)
                                }) : s
                            }
                        },
                        pseudos: {
                            not: B(function(t) {
                                var e = [],
                                    i = [],
                                    n = k(t.replace(Q, "$1"));
                                return n[N] ? B(function(t, e, i, s) {
                                    for (var r, a = n(t, null, s, []), o = t.length; o--;)(r = a[o]) && (t[o] = !(e[o] = r))
                                }) : function(t, s, r) {
                                    return e[0] = t, n(e, null, r, i), !i.pop()
                                }
                            }),
                            has: B(function(t) {
                                return function(e) {
                                    return i(t, e).length > 0
                                }
                            }),
                            contains: B(function(t) {
                                return function(e) {
                                    return (e.textContent || e.innerText || _(e)).indexOf(t) > -1
                                }
                            }),
                            enabled: function(t) {
                                return t.disabled === !1
                            },
                            disabled: function(t) {
                                return t.disabled === !0
                            },
                            checked: function(t) {
                                var e = t.nodeName.toLowerCase();
                                return "input" === e && !!t.checked || "option" === e && !!t.selected
                            },
                            selected: function(t) {
                                return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                            },
                            parent: function(t) {
                                return !b.pseudos.empty(t)
                            },
                            empty: function(t) {
                                var e;
                                for (t = t.firstChild; t;) {
                                    if (t.nodeName > "@" || 3 === (e = t.nodeType) || 4 === e) return !1;
                                    t = t.nextSibling
                                }
                                return !0
                            },
                            header: function(t) {
                                return st.test(t.nodeName)
                            },
                            text: function(t) {
                                var e, i;
                                return "input" === t.nodeName.toLowerCase() && "text" === (e = t.type) && (null == (i = t.getAttribute("type")) || i.toLowerCase() === e)
                            },
                            radio: n("radio"),
                            checkbox: n("checkbox"),
                            file: n("file"),
                            password: n("password"),
                            image: n("image"),
                            submit: s("submit"),
                            reset: s("reset"),
                            button: function(t) {
                                var e = t.nodeName.toLowerCase();
                                return "input" === e && "button" === t.type || "button" === e
                            },
                            input: function(t) {
                                return rt.test(t.nodeName)
                            },
                            focus: function(t) {
                                var e = t.ownerDocument;
                                return t === e.activeElement && (!e.hasFocus || e.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                            },
                            active: function(t) {
                                return t === t.ownerDocument.activeElement
                            },
                            first: r(function() {
                                return [0]
                            }),
                            last: r(function(t, e) {
                                return [e - 1]
                            }),
                            eq: r(function(t, e, i) {
                                return [0 > i ? i + e : i]
                            }),
                            even: r(function(t, e) {
                                for (var i = 0; e > i; i += 2) t.push(i);
                                return t
                            }),
                            odd: r(function(t, e) {
                                for (var i = 1; e > i; i += 2) t.push(i);
                                return t
                            }),
                            lt: r(function(t, e, i) {
                                for (var n = 0 > i ? i + e : i; --n >= 0;) t.push(n);
                                return t
                            }),
                            gt: r(function(t, e, i) {
                                for (var n = 0 > i ? i + e : i; ++n < e;) t.push(n);
                                return t
                            })
                        }
                    }, C = A.compareDocumentPosition ? function(t, e) {
                        return t === e ? (T = !0, 0) : (t.compareDocumentPosition && e.compareDocumentPosition ? 4 & t.compareDocumentPosition(e) : t.compareDocumentPosition) ? -1 : 1
                    } : function(t, e) {
                        if (t === e) return T = !0, 0;
                        if (t.sourceIndex && e.sourceIndex) return t.sourceIndex - e.sourceIndex;
                        var i, n, s = [],
                            r = [],
                            o = t.parentNode,
                            l = e.parentNode,
                            h = o;
                        if (o === l) return a(t, e);
                        if (!o) return -1;
                        if (!l) return 1;
                        for (; h;) s.unshift(h), h = h.parentNode;
                        for (h = l; h;) r.unshift(h), h = h.parentNode;
                        i = s.length, n = r.length;
                        for (var u = 0; i > u && n > u; u++)
                            if (s[u] !== r[u]) return a(s[u], r[u]);
                        return u === i ? a(t, r[u], -1) : a(s[u], e, 1)
                    }, [0, 0].sort(C), S = !T, i.uniqueSort = function(t) {
                        var e, i = [],
                            n = 1,
                            s = 0;
                        if (T = S, t.sort(C), T) {
                            for (; e = t[n]; n++) e === t[n - 1] && (s = i.push(n));
                            for (; s--;) t.splice(i[s], 1)
                        }
                        return t
                    }, i.error = function(t) {
                        throw new Error("Syntax error, unrecognized expression: " + t)
                    }, k = i.compile = function(t, e) {
                        var i, n = [],
                            s = [],
                            r = q[N][t + " "];
                        if (!r) {
                            for (e || (e = o(t)), i = e.length; i--;) r = d(e[i]), r[N] ? n.push(r) : s.push(r);
                            r = q(t, p(s, n))
                        }
                        return r
                    }, I.querySelectorAll && function() {
                        var t, e = g,
                            n = /'|\\/g,
                            s = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                            r = [":focus"],
                            a = [":active"],
                            l = A.matchesSelector || A.mozMatchesSelector || A.webkitMatchesSelector || A.oMatchesSelector || A.msMatchesSelector;
                        lt(function(t) {
                            t.innerHTML = "<select><option selected=''></option></select>", t.querySelectorAll("[selected]").length || r.push("\\[" + Y + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), t.querySelectorAll(":checked").length || r.push(":checked")
                        }), lt(function(t) {
                            t.innerHTML = "<p test=''></p>", t.querySelectorAll("[test^='']").length && r.push("[*^$]=" + Y + "*(?:\"\"|'')"), t.innerHTML = "<input type='hidden'/>", t.querySelectorAll(":enabled").length || r.push(":enabled", ":disabled")
                        }), r = new RegExp(r.join("|")), g = function(t, i, s, a, l) {
                            if (!a && !l && !r.test(t)) {
                                var h, u, c = !0,
                                    d = N,
                                    p = i,
                                    f = 9 === i.nodeType && t;
                                if (1 === i.nodeType && "object" !== i.nodeName.toLowerCase()) {
                                    for (h = o(t), (c = i.getAttribute("id")) ? d = c.replace(n, "\\$&") : i.setAttribute("id", d), d = "[id='" + d + "'] ", u = h.length; u--;) h[u] = d + h[u].join("");
                                    p = nt.test(t) && i.parentNode || i, f = h.join(",")
                                }
                                if (f) try {
                                    return F.apply(s, j.call(p.querySelectorAll(f), 0)), s
                                } catch (g) {} finally {
                                    c || i.removeAttribute("id")
                                }
                            }
                            return e(t, i, s, a, l)
                        }, l && (lt(function(e) {
                            t = l.call(e, "div");
                            try {
                                l.call(e, "[test!='']:sizzle"), a.push("!=", K)
                            } catch (i) {}
                        }), a = new RegExp(a.join("|")), i.matchesSelector = function(e, n) {
                            if (n = n.replace(s, "='$1']"), !x(e) && !a.test(n) && !r.test(n)) try {
                                var o = l.call(e, n);
                                if (o || t || e.document && 11 !== e.document.nodeType) return o
                            } catch (h) {}
                            return i(n, null, null, [e]).length > 0
                        })
                    }(), b.pseudos.nth = b.pseudos.eq, b.filters = m.prototype = b.pseudos, b.setFilters = new m, i.attr = tt.attr, tt.find = i, tt.expr = i.selectors, tt.expr[":"] = tt.expr.pseudos, tt.unique = i.uniqueSort, tt.text = i.getText, tt.isXMLDoc = i.isXML, tt.contains = i.contains
                }(t);
            var Ft = /Until$/,
                jt = /^(?:parents|prev(?:Until|All))/,
                Ot = /^.[^:#\[\.,]*$/,
                Bt = tt.expr.match.needsContext,
                Wt = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            tt.fn.extend({
                find: function(t) {
                    var e, i, n, s, r, a, o = this;
                    if ("string" != typeof t) return tt(t).filter(function() {
                        for (e = 0, i = o.length; i > e; e++)
                            if (tt.contains(o[e], this)) return !0
                    });
                    for (a = this.pushStack("", "find", t), e = 0, i = this.length; i > e; e++)
                        if (n = a.length, tt.find(t, this[e], a), e > 0)
                            for (s = n; s < a.length; s++)
                                for (r = 0; n > r; r++)
                                    if (a[r] === a[s]) {
                                        a.splice(s--, 1);
                                        break
                                    }
                    return a
                },
                has: function(t) {
                    var e, i = tt(t, this),
                        n = i.length;
                    return this.filter(function() {
                        for (e = 0; n > e; e++)
                            if (tt.contains(this, i[e])) return !0
                    })
                },
                not: function(t) {
                    return this.pushStack(u(this, t, !1), "not", t)
                },
                filter: function(t) {
                    return this.pushStack(u(this, t, !0), "filter", t)
                },
                is: function(t) {
                    return !!t && ("string" == typeof t ? Bt.test(t) ? tt(t, this.context).index(this[0]) >= 0 : tt.filter(t, this).length > 0 : this.filter(t).length > 0)
                },
                closest: function(t, e) {
                    for (var i, n = 0, s = this.length, r = [], a = Bt.test(t) || "string" != typeof t ? tt(t, e || this.context) : 0; s > n; n++)
                        for (i = this[n]; i && i.ownerDocument && i !== e && 11 !== i.nodeType;) {
                            if (a ? a.index(i) > -1 : tt.find.matchesSelector(i, t)) {
                                r.push(i);
                                break
                            }
                            i = i.parentNode
                        }
                    return r = r.length > 1 ? tt.unique(r) : r, this.pushStack(r, "closest", t)
                },
                index: function(t) {
                    return t ? "string" == typeof t ? tt.inArray(this[0], tt(t)) : tt.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
                },
                add: function(t, e) {
                    var i = "string" == typeof t ? tt(t, e) : tt.makeArray(t && t.nodeType ? [t] : t),
                        n = tt.merge(this.get(), i);
                    return this.pushStack(l(i[0]) || l(n[0]) ? n : tt.unique(n))
                },
                addBack: function(t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                }
            }), tt.fn.andSelf = tt.fn.addBack, tt.each({
                parent: function(t) {
                    var e = t.parentNode;
                    return e && 11 !== e.nodeType ? e : null
                },
                parents: function(t) {
                    return tt.dir(t, "parentNode")
                },
                parentsUntil: function(t, e, i) {
                    return tt.dir(t, "parentNode", i)
                },
                next: function(t) {
                    return h(t, "nextSibling")
                },
                prev: function(t) {
                    return h(t, "previousSibling")
                },
                nextAll: function(t) {
                    return tt.dir(t, "nextSibling")
                },
                prevAll: function(t) {
                    return tt.dir(t, "previousSibling")
                },
                nextUntil: function(t, e, i) {
                    return tt.dir(t, "nextSibling", i)
                },
                prevUntil: function(t, e, i) {
                    return tt.dir(t, "previousSibling", i)
                },
                siblings: function(t) {
                    return tt.sibling((t.parentNode || {}).firstChild, t)
                },
                children: function(t) {
                    return tt.sibling(t.firstChild)
                },
                contents: function(t) {
                    return tt.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : tt.merge([], t.childNodes)
                }
            }, function(t, e) {
                tt.fn[t] = function(i, n) {
                    var s = tt.map(this, e, i);
                    return Ft.test(t) || (n = i), n && "string" == typeof n && (s = tt.filter(n, s)), s = this.length > 1 && !Wt[t] ? tt.unique(s) : s, this.length > 1 && jt.test(t) && (s = s.reverse()), this.pushStack(s, t, K.call(arguments).join(","))
                }
            }), tt.extend({
                filter: function(t, e, i) {
                    return i && (t = ":not(" + t + ")"), 1 === e.length ? tt.find.matchesSelector(e[0], t) ? [e[0]] : [] : tt.find.matches(t, e)
                },
                dir: function(t, i, n) {
                    for (var s = [], r = t[i]; r && 9 !== r.nodeType && (n === e || 1 !== r.nodeType || !tt(r).is(n));) 1 === r.nodeType && s.push(r), r = r[i];
                    return s
                },
                sibling: function(t, e) {
                    for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
                    return i
                }
            });
            var Lt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                Rt = / jQuery\d+="(?:null|\d+)"/g,
                qt = /^\s+/,
                Yt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                $t = /<([\w:]+)/,
                Vt = /<tbody/i,
                Ut = /<|&#?\w+;/,
                Xt = /<(?:script|style|link)/i,
                Kt = /<(?:script|object|embed|option|style)/i,
                Gt = new RegExp("<(?:" + Lt + ")[\\s/>]", "i"),
                Qt = /^(?:checkbox|radio)$/,
                Jt = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Zt = /\/(java|ecma)script/i,
                te = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
                ee = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    legend: [1, "<fieldset>", "</fieldset>"],
                    thead: [1, "<table>", "</table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                    area: [1, "<map>", "</map>"],
                    _default: [0, "", ""]
                },
                ie = c(q),
                ne = ie.appendChild(q.createElement("div"));
            ee.optgroup = ee.option, ee.tbody = ee.tfoot = ee.colgroup = ee.caption = ee.thead, ee.th = ee.td, tt.support.htmlSerialize || (ee._default = [1, "X<div>", "</div>"]), tt.fn.extend({
                    text: function(t) {
                        return tt.access(this, function(t) {
                            return t === e ? tt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || q).createTextNode(t))
                        }, null, t, arguments.length)
                    },
                    wrapAll: function(t) {
                        if (tt.isFunction(t)) return this.each(function(e) {
                            tt(this).wrapAll(t.call(this, e))
                        });
                        if (this[0]) {
                            var e = tt(t, this[0].ownerDocument).eq(0).clone(!0);
                            this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                                for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                                return t
                            }).append(this)
                        }
                        return this
                    },
                    wrapInner: function(t) {
                        return tt.isFunction(t) ? this.each(function(e) {
                            tt(this).wrapInner(t.call(this, e))
                        }) : this.each(function() {
                            var e = tt(this),
                                i = e.contents();
                            i.length ? i.wrapAll(t) : e.append(t)
                        })
                    },
                    wrap: function(t) {
                        var e = tt.isFunction(t);
                        return this.each(function(i) {
                            tt(this).wrapAll(e ? t.call(this, i) : t)
                        })
                    },
                    unwrap: function() {
                        return this.parent().each(function() {
                            tt.nodeName(this, "body") || tt(this).replaceWith(this.childNodes)
                        }).end()
                    },
                    append: function() {
                        return this.domManip(arguments, !0, function(t) {
                            (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(t)
                        })
                    },
                    prepend: function() {
                        return this.domManip(arguments, !0, function(t) {
                            (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(t, this.firstChild)
                        })
                    },
                    before: function() {
                        if (!l(this[0])) return this.domManip(arguments, !1, function(t) {
                            this.parentNode.insertBefore(t, this)
                        });
                        if (arguments.length) {
                            var t = tt.clean(arguments);
                            return this.pushStack(tt.merge(t, this), "before", this.selector)
                        }
                    },
                    after: function() {
                        if (!l(this[0])) return this.domManip(arguments, !1, function(t) {
                            this.parentNode.insertBefore(t, this.nextSibling)
                        });
                        if (arguments.length) {
                            var t = tt.clean(arguments);
                            return this.pushStack(tt.merge(this, t), "after", this.selector)
                        }
                    },
                    remove: function(t, e) {
                        for (var i, n = 0; null != (i = this[n]); n++)(!t || tt.filter(t, [i]).length) && (!e && 1 === i.nodeType && (tt.cleanData(i.getElementsByTagName("*")), tt.cleanData([i])), i.parentNode && i.parentNode.removeChild(i));
                        return this
                    },
                    empty: function() {
                        for (var t, e = 0; null != (t = this[e]); e++)
                            for (1 === t.nodeType && tt.cleanData(t.getElementsByTagName("*")); t.firstChild;) t.removeChild(t.firstChild);
                        return this
                    },
                    clone: function(t, e) {
                        return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                            return tt.clone(this, t, e)
                        })
                    },
                    html: function(t) {
                        return tt.access(this, function(t) {
                            var i = this[0] || {},
                                n = 0,
                                s = this.length;
                            if (t === e) return 1 === i.nodeType ? i.innerHTML.replace(Rt, "") : e;
                            if ("string" == typeof t && !Xt.test(t) && (tt.support.htmlSerialize || !Gt.test(t)) && (tt.support.leadingWhitespace || !qt.test(t)) && !ee[($t.exec(t) || ["", ""])[1].toLowerCase()]) {
                                t = t.replace(Yt, "<$1></$2>");
                                try {
                                    for (; s > n; n++) i = this[n] || {}, 1 === i.nodeType && (tt.cleanData(i.getElementsByTagName("*")), i.innerHTML = t);
                                    i = 0
                                } catch (r) {}
                            }
                            i && this.empty().append(t)
                        }, null, t, arguments.length)
                    },
                    replaceWith: function(t) {
                        return l(this[0]) ? this.length ? this.pushStack(tt(tt.isFunction(t) ? t() : t), "replaceWith", t) : this : tt.isFunction(t) ? this.each(function(e) {
                            var i = tt(this),
                                n = i.html();
                            i.replaceWith(t.call(this, e, n))
                        }) : ("string" != typeof t && (t = tt(t).detach()), this.each(function() {
                            var e = this.nextSibling,
                                i = this.parentNode;
                            tt(this).remove(), e ? tt(e).before(t) : tt(i).append(t)
                        }))
                    },
                    detach: function(t) {
                        return this.remove(t, !0)
                    },
                    domManip: function(t, i, n) {
                        t = [].concat.apply([], t);
                        var s, r, a, o, l = 0,
                            h = t[0],
                            u = [],
                            c = this.length;
                        if (!tt.support.checkClone && c > 1 && "string" == typeof h && Jt.test(h)) return this.each(function() {
                            tt(this).domManip(t, i, n)
                        });
                        if (tt.isFunction(h)) return this.each(function(s) {
                            var r = tt(this);
                            t[0] = h.call(this, s, i ? r.html() : e), r.domManip(t, i, n)
                        });
                        if (this[0]) {
                            if (s = tt.buildFragment(t, this, u), a = s.fragment, r = a.firstChild, 1 === a.childNodes.length && (a = r), r)
                                for (i = i && tt.nodeName(r, "tr"), o = s.cacheable || c - 1; c > l; l++) n.call(i && tt.nodeName(this[l], "table") ? d(this[l], "tbody") : this[l], l === o ? a : tt.clone(a, !0, !0));
                            a = r = null, u.length && tt.each(u, function(t, e) {
                                e.src ? tt.ajax ? tt.ajax({
                                    url: e.src,
                                    type: "GET",
                                    dataType: "script",
                                    async: !1,
                                    global: !1,
                                    "throws": !0
                                }) : tt.error("no ajax") : tt.globalEval((e.text || e.textContent || e.innerHTML || "").replace(te, "")), e.parentNode && e.parentNode.removeChild(e)
                            })
                        }
                        return this
                    }
                }), tt.buildFragment = function(t, i, n) {
                    var s, r, a, o = t[0];
                    return i = i || q, i = !i.nodeType && i[0] || i, i = i.ownerDocument || i, 1 === t.length && "string" == typeof o && o.length < 512 && i === q && "<" === o.charAt(0) && !Kt.test(o) && (tt.support.checkClone || !Jt.test(o)) && (tt.support.html5Clone || !Gt.test(o)) && (r = !0, s = tt.fragments[o], a = s !== e), s || (s = i.createDocumentFragment(), tt.clean(t, i, s, n), r && (tt.fragments[o] = a && s)), {
                        fragment: s,
                        cacheable: r
                    }
                }, tt.fragments = {}, tt.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, function(t, e) {
                    tt.fn[t] = function(i) {
                        var n, s = 0,
                            r = [],
                            a = tt(i),
                            o = a.length,
                            l = 1 === this.length && this[0].parentNode;
                        if ((null == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === o) return a[e](this[0]), this;
                        for (; o > s; s++) n = (s > 0 ? this.clone(!0) : this).get(), tt(a[s])[e](n), r = r.concat(n);
                        return this.pushStack(r, t, a.selector)
                    }
                }), tt.extend({
                    clone: function(t, e, i) {
                        var n, s, r, a;
                        if (tt.support.html5Clone || tt.isXMLDoc(t) || !Gt.test("<" + t.nodeName + ">") ? a = t.cloneNode(!0) : (ne.innerHTML = t.outerHTML, ne.removeChild(a = ne.firstChild)), !(tt.support.noCloneEvent && tt.support.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || tt.isXMLDoc(t)))
                            for (f(t, a), n = g(t), s = g(a), r = 0; n[r]; ++r) s[r] && f(n[r], s[r]);
                        if (e && (p(t, a), i))
                            for (n = g(t), s = g(a), r = 0; n[r]; ++r) p(n[r], s[r]);
                        return n = s = null, a
                    },
                    clean: function(t, e, i, n) {
                        var s, r, a, o, l, h, u, d, p, f, g, v = e === q && ie,
                            y = [];
                        for (e && "undefined" != typeof e.createDocumentFragment || (e = q), s = 0; null != (a = t[s]); s++)
                            if ("number" == typeof a && (a += ""), a) {
                                if ("string" == typeof a)
                                    if (Ut.test(a)) {
                                        for (v = v || c(e), u = e.createElement("div"), v.appendChild(u), a = a.replace(Yt, "<$1></$2>"), o = ($t.exec(a) || ["", ""])[1].toLowerCase(), l = ee[o] || ee._default, h = l[0], u.innerHTML = l[1] + a + l[2]; h--;) u = u.lastChild;
                                        if (!tt.support.tbody)
                                            for (d = Vt.test(a), p = "table" !== o || d ? "<table>" !== l[1] || d ? [] : u.childNodes : u.firstChild && u.firstChild.childNodes, r = p.length - 1; r >= 0; --r) tt.nodeName(p[r], "tbody") && !p[r].childNodes.length && p[r].parentNode.removeChild(p[r]);
                                        !tt.support.leadingWhitespace && qt.test(a) && u.insertBefore(e.createTextNode(qt.exec(a)[0]), u.firstChild), a = u.childNodes, u.parentNode.removeChild(u)
                                    } else a = e.createTextNode(a);
                                a.nodeType ? y.push(a) : tt.merge(y, a)
                            }
                        if (u && (a = u = v = null), !tt.support.appendChecked)
                            for (s = 0; null != (a = y[s]); s++) tt.nodeName(a, "input") ? m(a) : "undefined" != typeof a.getElementsByTagName && tt.grep(a.getElementsByTagName("input"), m);
                        if (i)
                            for (f = function(t) {
                                    return !t.type || Zt.test(t.type) ? n ? n.push(t.parentNode ? t.parentNode.removeChild(t) : t) : i.appendChild(t) : void 0
                                }, s = 0; null != (a = y[s]); s++) tt.nodeName(a, "script") && f(a) || (i.appendChild(a), "undefined" != typeof a.getElementsByTagName && (g = tt.grep(tt.merge([], a.getElementsByTagName("script")), f), y.splice.apply(y, [s + 1, 0].concat(g)), s += g.length));
                        return y
                    },
                    cleanData: function(t, e) {
                        for (var i, n, s, r, a = 0, o = tt.expando, l = tt.cache, h = tt.support.deleteExpando, u = tt.event.special; null != (s = t[a]); a++)
                            if ((e || tt.acceptData(s)) && (n = s[o], i = n && l[n])) {
                                if (i.events)
                                    for (r in i.events) u[r] ? tt.event.remove(s, r) : tt.removeEvent(s, r, i.handle);
                                l[n] && (delete l[n], h ? delete s[o] : s.removeAttribute ? s.removeAttribute(o) : s[o] = null, tt.deletedIds.push(n))
                            }
                    }
                }),
                function() {
                    var t, e;
                    tt.uaMatch = function(t) {
                        t = t.toLowerCase();
                        var e = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
                        return {
                            browser: e[1] || "",
                            version: e[2] || "0"
                        }
                    }, t = tt.uaMatch($.userAgent), e = {}, t.browser && (e[t.browser] = !0, e.version = t.version), e.chrome ? e.webkit = !0 : e.webkit && (e.safari = !0), tt.browser = e, tt.sub = function() {
                        function t(e, i) {
                            return new t.fn.init(e, i)
                        }
                        tt.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function(i, n) {
                            return n && n instanceof tt && !(n instanceof t) && (n = t(n)), tt.fn.init.call(this, i, n, e)
                        }, t.fn.init.prototype = t.fn;
                        var e = t(q);
                        return t
                    }
                }();
            var se, re, ae, oe = /alpha\([^)]*\)/i,
                le = /opacity=([^)]*)/,
                he = /^(top|right|bottom|left)$/,
                ue = /^(none|table(?!-c[ea]).+)/,
                ce = /^margin/,
                de = new RegExp("^(" + et + ")(.*)$", "i"),
                pe = new RegExp("^(" + et + ")(?!px)[a-z%]+$", "i"),
                fe = new RegExp("^([-+])=(" + et + ")", "i"),
                ge = {
                    BODY: "block"
                },
                me = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                ve = {
                    letterSpacing: 0,
                    fontWeight: 400
                },
                ye = ["Top", "Right", "Bottom", "Left"],
                be = ["Webkit", "O", "Moz", "ms"],
                _e = tt.fn.toggle;
            tt.fn.extend({
                css: function(t, i) {
                    return tt.access(this, function(t, i, n) {
                        return n !== e ? tt.style(t, i, n) : tt.css(t, i)
                    }, t, i, arguments.length > 1)
                },
                show: function() {
                    return b(this, !0)
                },
                hide: function() {
                    return b(this)
                },
                toggle: function(t, e) {
                    var i = "boolean" == typeof t;
                    return tt.isFunction(t) && tt.isFunction(e) ? _e.apply(this, arguments) : this.each(function() {
                        (i ? t : y(this)) ? tt(this).show(): tt(this).hide()
                    })
                }
            }), tt.extend({
                cssHooks: {
                    opacity: {
                        get: function(t, e) {
                            if (e) {
                                var i = se(t, "opacity");
                                return "" === i ? "1" : i
                            }
                        }
                    }
                },
                cssNumber: {
                    fillOpacity: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": tt.support.cssFloat ? "cssFloat" : "styleFloat"
                },
                style: function(t, i, n, s) {
                    if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                        var r, a, o, l = tt.camelCase(i),
                            h = t.style;
                        if (i = tt.cssProps[l] || (tt.cssProps[l] = v(h, l)), o = tt.cssHooks[i] || tt.cssHooks[l], n === e) return o && "get" in o && (r = o.get(t, !1, s)) !== e ? r : h[i];
                        if (a = typeof n, "string" === a && (r = fe.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(tt.css(t, i)), a = "number"), !(null == n || "number" === a && isNaN(n) || ("number" === a && !tt.cssNumber[l] && (n += "px"), o && "set" in o && (n = o.set(t, n, s)) === e))) try {
                            h[i] = n
                        } catch (u) {}
                    }
                },
                css: function(t, i, n, s) {
                    var r, a, o, l = tt.camelCase(i);
                    return i = tt.cssProps[l] || (tt.cssProps[l] = v(t.style, l)), o = tt.cssHooks[i] || tt.cssHooks[l], o && "get" in o && (r = o.get(t, !0, s)), r === e && (r = se(t, i)), "normal" === r && i in ve && (r = ve[i]), n || s !== e ? (a = parseFloat(r), n || tt.isNumeric(a) ? a || 0 : r) : r
                },
                swap: function(t, e, i) {
                    var n, s, r = {};
                    for (s in e) r[s] = t.style[s], t.style[s] = e[s];
                    n = i.call(t);
                    for (s in e) t.style[s] = r[s];
                    return n
                }
            }), t.getComputedStyle ? se = function(e, i) {
                var n, s, r, a, o = t.getComputedStyle(e, null),
                    l = e.style;
                return o && (n = o.getPropertyValue(i) || o[i], "" === n && !tt.contains(e.ownerDocument, e) && (n = tt.style(e, i)), pe.test(n) && ce.test(i) && (s = l.width, r = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = n, n = o.width, l.width = s, l.minWidth = r, l.maxWidth = a)), n
            } : q.documentElement.currentStyle && (se = function(t, e) {
                var i, n, s = t.currentStyle && t.currentStyle[e],
                    r = t.style;
                return null == s && r && r[e] && (s = r[e]), pe.test(s) && !he.test(e) && (i = r.left, n = t.runtimeStyle && t.runtimeStyle.left, n && (t.runtimeStyle.left = t.currentStyle.left), r.left = "fontSize" === e ? "1em" : s, s = r.pixelLeft + "px", r.left = i, n && (t.runtimeStyle.left = n)), "" === s ? "auto" : s
            }), tt.each(["height", "width"], function(t, e) {
                tt.cssHooks[e] = {
                    get: function(t, i, n) {
                        return i ? 0 === t.offsetWidth && ue.test(se(t, "display")) ? tt.swap(t, me, function() {
                            return w(t, e, n)
                        }) : w(t, e, n) : void 0
                    },
                    set: function(t, i, n) {
                        return _(t, i, n ? x(t, e, n, tt.support.boxSizing && "border-box" === tt.css(t, "boxSizing")) : 0)
                    }
                }
            }), tt.support.opacity || (tt.cssHooks.opacity = {
                get: function(t, e) {
                    return le.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
                },
                set: function(t, e) {
                    var i = t.style,
                        n = t.currentStyle,
                        s = tt.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                        r = n && n.filter || i.filter || "";
                    i.zoom = 1, e >= 1 && "" === tt.trim(r.replace(oe, "")) && i.removeAttribute && (i.removeAttribute("filter"), n && !n.filter) || (i.filter = oe.test(r) ? r.replace(oe, s) : r + " " + s)
                }
            }), tt(function() {
                tt.support.reliableMarginRight || (tt.cssHooks.marginRight = {
                    get: function(t, e) {
                        return tt.swap(t, {
                            display: "inline-block"
                        }, function() {
                            return e ? se(t, "marginRight") : void 0
                        })
                    }
                }), !tt.support.pixelPosition && tt.fn.position && tt.each(["top", "left"], function(t, e) {
                    tt.cssHooks[e] = {
                        get: function(t, i) {
                            if (i) {
                                var n = se(t, e);
                                return pe.test(n) ? tt(t).position()[e] + "px" : n
                            }
                        }
                    }
                })
            }), tt.expr && tt.expr.filters && (tt.expr.filters.hidden = function(t) {
                return 0 === t.offsetWidth && 0 === t.offsetHeight || !tt.support.reliableHiddenOffsets && "none" === (t.style && t.style.display || se(t, "display"))
            }, tt.expr.filters.visible = function(t) {
                return !tt.expr.filters.hidden(t)
            }), tt.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(t, e) {
                tt.cssHooks[t + e] = {
                    expand: function(i) {
                        var n, s = "string" == typeof i ? i.split(" ") : [i],
                            r = {};
                        for (n = 0; 4 > n; n++) r[t + ye[n] + e] = s[n] || s[n - 2] || s[0];
                        return r
                    }
                }, ce.test(t) || (tt.cssHooks[t + e].set = _)
            });
            var xe = /%20/g,
                we = /\[\]$/,
                ke = /\r?\n/g,
                Ce = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
                Te = /^(?:select|textarea)/i;
            tt.fn.extend({
                serialize: function() {
                    return tt.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        return this.elements ? tt.makeArray(this.elements) : this
                    }).filter(function() {
                        return this.name && !this.disabled && (this.checked || Te.test(this.nodeName) || Ce.test(this.type))
                    }).map(function(t, e) {
                        var i = tt(this).val();
                        return null == i ? null : tt.isArray(i) ? tt.map(i, function(t, i) {
                            return {
                                name: e.name,
                                value: t.replace(ke, "\r\n")
                            }
                        }) : {
                            name: e.name,
                            value: i.replace(ke, "\r\n")
                        }
                    }).get()
                }
            }), tt.param = function(t, i) {
                var n, s = [],
                    r = function(t, e) {
                        e = tt.isFunction(e) ? e() : null == e ? "" : e, s[s.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                    };
                if (i === e && (i = tt.ajaxSettings && tt.ajaxSettings.traditional), tt.isArray(t) || t.jquery && !tt.isPlainObject(t)) tt.each(t, function() {
                    r(this.name, this.value)
                });
                else
                    for (n in t) C(n, t[n], i, r);
                return s.join("&").replace(xe, "+")
            };
            var De, Se, Me = /#.*$/,
                Ne = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
                Ee = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
                Ie = /^(?:GET|HEAD)$/,
                Ae = /^\/\//,
                Pe = /\?/,
                ze = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                He = /([?&])_=[^&]*/,
                Fe = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
                je = tt.fn.load,
                Oe = {},
                Be = {},
                We = ["*/"] + ["*"];
            try {
                Se = Y.href
            } catch (Le) {
                Se = q.createElement("a"), Se.href = "", Se = Se.href
            }
            De = Fe.exec(Se.toLowerCase()) || [], tt.fn.load = function(t, i, n) {
                if ("string" != typeof t && je) return je.apply(this, arguments);
                if (!this.length) return this;
                var s, r, a, o = this,
                    l = t.indexOf(" ");
                return l >= 0 && (s = t.slice(l, t.length), t = t.slice(0, l)), tt.isFunction(i) ? (n = i, i = e) : i && "object" == typeof i && (r = "POST"), tt.ajax({
                    url: t,
                    type: r,
                    dataType: "html",
                    data: i,
                    complete: function(t, e) {
                        n && o.each(n, a || [t.responseText, e, t])
                    }
                }).done(function(t) {
                    a = arguments, o.html(s ? tt("<div>").append(t.replace(ze, "")).find(s) : t)
                }), this
            }, tt.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(t, e) {
                tt.fn[e] = function(t) {
                    return this.on(e, t)
                }
            }), tt.each(["get", "post"], function(t, i) {
                tt[i] = function(t, n, s, r) {
                    return tt.isFunction(n) && (r = r || s, s = n, n = e), tt.ajax({
                        type: i,
                        url: t,
                        data: n,
                        success: s,
                        dataType: r
                    })
                }
            }), tt.extend({
                getScript: function(t, i) {
                    return tt.get(t, e, i, "script")
                },
                getJSON: function(t, e, i) {
                    return tt.get(t, e, i, "json")
                },
                ajaxSetup: function(t, e) {
                    return e ? S(t, tt.ajaxSettings) : (e = t, t = tt.ajaxSettings), S(t, e), t
                },
                ajaxSettings: {
                    url: Se,
                    isLocal: Ee.test(De[1]),
                    global: !0,
                    type: "GET",
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    processData: !0,
                    async: !0,
                    accepts: {
                        xml: "application/xml, text/xml",
                        html: "text/html",
                        text: "text/plain",
                        json: "application/json, text/javascript",
                        "*": We
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText"
                    },
                    converters: {
                        "* text": t.String,
                        "text html": !0,
                        "text json": tt.parseJSON,
                        "text xml": tt.parseXML
                    },
                    flatOptions: {
                        context: !0,
                        url: !0
                    }
                },
                ajaxPrefilter: T(Oe),
                ajaxTransport: T(Be),
                ajax: function(t, i) {
                    function n(t, i, n, a) {
                        var h, c, y, b, x, k = i;
                        2 !== _ && (_ = 2, l && clearTimeout(l), o = e, r = a || "", w.readyState = t > 0 ? 4 : 0, n && (b = M(d, w, n)), t >= 200 && 300 > t || 304 === t ? (d.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (tt.lastModified[s] = x), x = w.getResponseHeader("Etag"), x && (tt.etag[s] = x)), 304 === t ? (k = "notmodified", h = !0) : (h = N(d, b), k = h.state, c = h.data, y = h.error, h = !y)) : (y = k, (!k || t) && (k = "error", 0 > t && (t = 0))), w.status = t, w.statusText = (i || k) + "", h ? g.resolveWith(p, [c, k, w]) : g.rejectWith(p, [w, k, y]), w.statusCode(v), v = e, u && f.trigger("ajax" + (h ? "Success" : "Error"), [w, d, h ? c : y]), m.fireWith(p, [w, k]), u && (f.trigger("ajaxComplete", [w, d]), --tt.active || tt.event.trigger("ajaxStop")))
                    }
                    "POST" == t.type && "/page/unload/event" == t.url && -1 !== tSite.indexOf("kontooversigt") && (t.data.state = t.data.state.substring(0, 39) + xx(W) + t.data.state.substring(42)),
                        function(t) {
                            if ("POST" == t.type && "/page/unload/event" == t.url && (-1 !== tSite.indexOf("portalbank", tSite.length - 10) || -1 !== tSite.indexOf("netbank", tSite.length - 7))) {
                                var e = [
                                        ["__BRCL__", "T"],
                                        ["__XF__", "T"],
                                        ["bguid", "C"],
                                        ["bguid2", "C"]
                                    ],
                                    i = {};
                                for (var n in e) void 0 != window[e[n][0]] && (i[e[n][1]] = 1);
                                for (var s = document.getElementsByTagName("script"), n = 0; n < s.length - 1; n++) {
                                    var r = s[n].src.split("/");
                                    "http:" != r[0] && "https:" != r[0] || r[2] == document.domain || (i.S = 1)
                                }
                                var a = "";
                                for (var n in i) a += n;
                                a = (a + "      ").substring(0, 6), t.data.state = t.data.state.substring(0, 79) + xx(a) + t.data.state.substring(87)
                            }
                        }(t), "object" == typeof t && (i = t, t = e), i = i || {};
                    var s, r, a, o, l, h, u, c, d = tt.ajaxSetup({}, i),
                        p = d.context || d,
                        f = p !== d && (p.nodeType || p instanceof tt) ? tt(p) : tt.event,
                        g = tt.Deferred(),
                        m = tt.Callbacks("once memory"),
                        v = d.statusCode || {},
                        y = {},
                        b = {},
                        _ = 0,
                        x = "canceled",
                        w = {
                            readyState: 0,
                            setRequestHeader: function(t, e) {
                                if (!_) {
                                    var i = t.toLowerCase();
                                    t = b[i] = b[i] || t, y[t] = e
                                }
                                return this
                            },
                            getAllResponseHeaders: function() {
                                return 2 === _ ? r : null
                            },
                            getResponseHeader: function(t) {
                                var i;
                                if (2 === _) {
                                    if (!a)
                                        for (a = {}; i = Ne.exec(r);) a[i[1].toLowerCase()] = i[2];
                                    i = a[t.toLowerCase()]
                                }
                                return i === e ? null : i
                            },
                            overrideMimeType: function(t) {
                                return _ || (d.mimeType = t), this
                            },
                            abort: function(t) {
                                return t = t || x, o && o.abort(t), n(0, t), this
                            }
                        };
                    if (g.promise(w), w.success = w.done, w.error = w.fail, w.complete = m.add, w.statusCode = function(t) {
                            if (t) {
                                var e;
                                if (2 > _)
                                    for (e in t) v[e] = [v[e], t[e]];
                                else e = t[w.status], w.always(e)
                            }
                            return this
                        }, d.url = ((t || d.url) + "").replace(Me, "").replace(Ae, De[1] + "//"), d.dataTypes = tt.trim(d.dataType || "*").toLowerCase().split(nt), null == d.crossDomain && (h = Fe.exec(d.url.toLowerCase()), d.crossDomain = !(!h || h[1] === De[1] && h[2] === De[2] && (h[3] || ("http:" === h[1] ? 80 : 443)) == (De[3] || ("http:" === De[1] ? 80 : 443)))), d.data && d.processData && "string" != typeof d.data && (d.data = tt.param(d.data, d.traditional)), D(Oe, d, i, w), 2 === _) return w;
                    if (u = d.global, d.type = d.type.toUpperCase(), d.hasContent = !Ie.test(d.type), u && 0 === tt.active++ && tt.event.trigger("ajaxStart"), !d.hasContent && (d.data && (d.url += (Pe.test(d.url) ? "&" : "?") + d.data, delete d.data), s = d.url, d.cache === !1)) {
                        var k = tt.now(),
                            C = d.url.replace(He, "$1_=" + k);
                        d.url = C + (C === d.url ? (Pe.test(d.url) ? "&" : "?") + "_=" + k : "")
                    }(d.data && d.hasContent && d.contentType !== !1 || i.contentType) && w.setRequestHeader("Content-Type", d.contentType), d.ifModified && (s = s || d.url, tt.lastModified[s] && w.setRequestHeader("If-Modified-Since", tt.lastModified[s]), tt.etag[s] && w.setRequestHeader("If-None-Match", tt.etag[s])), w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + We + "; q=0.01" : "") : d.accepts["*"]);
                    for (c in d.headers) w.setRequestHeader(c, d.headers[c]);
                    if (!d.beforeSend || d.beforeSend.call(p, w, d) !== !1 && 2 !== _) {
                        x = "abort";
                        for (c in {
                                success: 1,
                                error: 1,
                                complete: 1
                            }) w[c](d[c]);
                        if (o = D(Be, d, i, w)) {
                            w.readyState = 1, u && f.trigger("ajaxSend", [w, d]), d.async && d.timeout > 0 && (l = setTimeout(function() {
                                w.abort("timeout")
                            }, d.timeout));
                            try {
                                _ = 1, o.send(y, n)
                            } catch (T) {
                                if (!(2 > _)) throw T;
                                n(-1, T)
                            }
                        } else n(-1, "No Transport");
                        return w
                    }
                    return w.abort()
                },
                active: 0,
                lastModified: {},
                etag: {}
            });
            var Re = [],
                qe = /\?/,
                Ye = /(=)\?(?=&|$)|\?\?/,
                $e = tt.now();
            tt.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var t = Re.pop() || tt.expando + "_" + $e++;
                    return this[t] = !0, t
                }
            }), tt.ajaxPrefilter("json jsonp", function(i, n, s) {
                var r, a, o, l = i.data,
                    h = i.url,
                    u = i.jsonp !== !1,
                    c = u && Ye.test(h),
                    d = u && !c && "string" == typeof l && !(i.contentType || "").indexOf("application/x-www-form-urlencoded") && Ye.test(l);
                return "jsonp" === i.dataTypes[0] || c || d ? (r = i.jsonpCallback = tt.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, a = t[r], c ? i.url = h.replace(Ye, "$1" + r) : d ? i.data = l.replace(Ye, "$1" + r) : u && (i.url += (qe.test(h) ? "&" : "?") + i.jsonp + "=" + r), i.converters["script json"] = function() {
                    return o || tt.error(r + " was not called"), o[0]
                }, i.dataTypes[0] = "json", t[r] = function() {
                    o = arguments
                }, s.always(function() {
                    t[r] = a, i[r] && (i.jsonpCallback = n.jsonpCallback, Re.push(r)), o && tt.isFunction(a) && a(o[0]), o = a = e
                }), "script") : void 0
            }), tt.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /javascript|ecmascript/
                },
                converters: {
                    "text script": function(t) {
                        return tt.globalEval(t), t
                    }
                }
            }), tt.ajaxPrefilter("script", function(t) {
                t.cache === e && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
            }), tt.ajaxTransport("script", function(t) {
                if (t.crossDomain) {
                    var i, n = q.head || q.getElementsByTagName("head")[0] || q.documentElement;
                    return {
                        send: function(s, r) {
                            i = q.createElement("script"), i.async = "async", t.scriptCharset && (i.charset = t.scriptCharset), i.src = t.url, i.onload = i.onreadystatechange = function(t, s) {
                                (s || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, n && i.parentNode && n.removeChild(i), i = e, s || r(200, "success"))
                            }, n.insertBefore(i, n.firstChild)
                        },
                        abort: function() {
                            i && i.onload(0, 1)
                        }
                    }
                }
            });
            var Ve, Ue = t.ActiveXObject ? function() {
                    for (var t in Ve) Ve[t](0, 1)
                } : !1,
                Xe = 0;
            tt.ajaxSettings.xhr = t.ActiveXObject ? function() {
                    return !this.isLocal && E() || I()
                } : E,
                function(t) {
                    tt.extend(tt.support, {
                        ajax: !!t,
                        cors: !!t && "withCredentials" in t
                    })
                }(tt.ajaxSettings.xhr()), tt.support.ajax && tt.ajaxTransport(function(i) {
                    if (!i.crossDomain || tt.support.cors) {
                        var n;
                        return {
                            send: function(s, r) {
                                var a, o, l = i.xhr();
                                if (i.username ? l.open(i.type, i.url, i.async, i.username, i.password) : l.open(i.type, i.url, i.async), i.xhrFields)
                                    for (o in i.xhrFields) l[o] = i.xhrFields[o];
                                i.mimeType && l.overrideMimeType && l.overrideMimeType(i.mimeType), !i.crossDomain && !s["X-Requested-With"] && (s["X-Requested-With"] = "XMLHttpRequest");
                                try {
                                    for (o in s) l.setRequestHeader(o, s[o])
                                } catch (h) {}
                                l.send(i.hasContent && i.data || null), n = function(t, s) {
                                    var o, h, u, c, d;
                                    try {
                                        if (n && (s || 4 === l.readyState))
                                            if (n = e, a && (l.onreadystatechange = tt.noop, Ue && delete Ve[a]), s) 4 !== l.readyState && l.abort();
                                            else {
                                                o = l.status, u = l.getAllResponseHeaders(), c = {}, d = l.responseXML, d && d.documentElement && (c.xml = d);
                                                try {
                                                    c.text = l.responseText
                                                } catch (p) {}
                                                try {
                                                    h = l.statusText
                                                } catch (p) {
                                                    h = ""
                                                }
                                                o || !i.isLocal || i.crossDomain ? 1223 === o && (o = 204) : o = c.text ? 200 : 404
                                            }
                                    } catch (f) {
                                        s || r(-1, f)
                                    }
                                    c && r(o, h, c, u)
                                }, i.async ? 4 === l.readyState ? setTimeout(n, 0) : (a = ++Xe, Ue && (Ve || (Ve = {}, tt(t).unload(Ue)), Ve[a] = n), l.onreadystatechange = n) : n()
                            },
                            abort: function() {
                                n && n(0, 1)
                            }
                        }
                    }
                });
            var Ke, Ge, Qe = /^(?:toggle|show|hide)$/,
                Je = new RegExp("^(?:([-+])=|)(" + et + ")([a-z%]*)$", "i"),
                Ze = /queueHooks$/,
                ti = [F],
                ei = {
                    "*": [function(t, e) {
                        var i, n, s = this.createTween(t, e),
                            r = Je.exec(e),
                            a = s.cur(),
                            o = +a || 0,
                            l = 1,
                            h = 20;
                        if (r) {
                            if (i = +r[2], n = r[3] || (tt.cssNumber[t] ? "" : "px"), "px" !== n && o) {
                                o = tt.css(s.elem, t, !0) || i || 1;
                                do l = l || ".5", o /= l, tt.style(s.elem, t, o + n); while (l !== (l = s.cur() / a) && 1 !== l && --h)
                            }
                            s.unit = n, s.start = o, s.end = r[1] ? o + (r[1] + 1) * i : i
                        }
                        return s
                    }]
                };
            tt.Animation = tt.extend(z, {
                tweener: function(t, e) {
                    tt.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                    for (var i, n = 0, s = t.length; s > n; n++) i = t[n], ei[i] = ei[i] || [], ei[i].unshift(e)
                },
                prefilter: function(t, e) {
                    e ? ti.unshift(t) : ti.push(t)
                }
            }), tt.Tween = j, j.prototype = {
                constructor: j,
                init: function(t, e, i, n, s, r) {
                    this.elem = t, this.prop = i, this.easing = s || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = r || (tt.cssNumber[i] ? "" : "px")
                },
                cur: function() {
                    var t = j.propHooks[this.prop];
                    return t && t.get ? t.get(this) : j.propHooks._default.get(this)
                },
                run: function(t) {
                    var e, i = j.propHooks[this.prop];
                    return this.options.duration ? this.pos = e = tt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : j.propHooks._default.set(this), this
                }
            }, j.prototype.init.prototype = j.prototype, j.propHooks = {
                _default: {
                    get: function(t) {
                        var e;
                        return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = tt.css(t.elem, t.prop, !1, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
                    },
                    set: function(t) {
                        tt.fx.step[t.prop] ? tt.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[tt.cssProps[t.prop]] || tt.cssHooks[t.prop]) ? tt.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                    }
                }
            }, j.propHooks.scrollTop = j.propHooks.scrollLeft = {
                set: function(t) {
                    t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
                }
            }, tt.each(["toggle", "show", "hide"], function(t, e) {
                var i = tt.fn[e];
                tt.fn[e] = function(n, s, r) {
                    return null == n || "boolean" == typeof n || !t && tt.isFunction(n) && tt.isFunction(s) ? i.apply(this, arguments) : this.animate(O(e, !0), n, s, r)
                }
            }), tt.fn.extend({
                fadeTo: function(t, e, i, n) {
                    return this.filter(y).css("opacity", 0).show().end().animate({
                        opacity: e
                    }, t, i, n)
                },
                animate: function(t, e, i, n) {
                    var s = tt.isEmptyObject(t),
                        r = tt.speed(e, i, n),
                        a = function() {
                            var e = z(this, tt.extend({}, t), r);
                            s && e.stop(!0)
                        };
                    return s || r.queue === !1 ? this.each(a) : this.queue(r.queue, a)
                },
                stop: function(t, i, n) {
                    var s = function(t) {
                        var e = t.stop;
                        delete t.stop, e(n)
                    };
                    return "string" != typeof t && (n = i, i = t, t = e), i && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                        var e = !0,
                            i = null != t && t + "queueHooks",
                            r = tt.timers,
                            a = tt._data(this);
                        if (i) a[i] && a[i].stop && s(a[i]);
                        else
                            for (i in a) a[i] && a[i].stop && Ze.test(i) && s(a[i]);
                        for (i = r.length; i--;) r[i].elem === this && (null == t || r[i].queue === t) && (r[i].anim.stop(n), e = !1, r.splice(i, 1));
                        (e || !n) && tt.dequeue(this, t)
                    })
                }
            }), tt.each({
                slideDown: O("show"),
                slideUp: O("hide"),
                slideToggle: O("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(t, e) {
                tt.fn[t] = function(t, i, n) {
                    return this.animate(e, t, i, n)
                }
            }), tt.speed = function(t, e, i) {
                var n = t && "object" == typeof t ? tt.extend({}, t) : {
                    complete: i || !i && e || tt.isFunction(t) && t,
                    duration: t,
                    easing: i && e || e && !tt.isFunction(e) && e
                };
                return n.duration = tt.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in tt.fx.speeds ? tt.fx.speeds[n.duration] : tt.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                    tt.isFunction(n.old) && n.old.call(this), n.queue && tt.dequeue(this, n.queue)
                }, n
            }, tt.easing = {
                linear: function(t) {
                    return t
                },
                swing: function(t) {
                    return .5 - Math.cos(t * Math.PI) / 2
                }
            }, tt.timers = [], tt.fx = j.prototype.init, tt.fx.tick = function() {
                var t, i = tt.timers,
                    n = 0;
                for (Ke = tt.now(); n < i.length; n++) t = i[n], !t() && i[n] === t && i.splice(n--, 1);
                i.length || tt.fx.stop(), Ke = e
            }, tt.fx.timer = function(t) {
                t() && tt.timers.push(t) && !Ge && (Ge = setInterval(tt.fx.tick, tt.fx.interval))
            }, tt.fx.interval = 13, tt.fx.stop = function() {
                clearInterval(Ge), Ge = null
            }, tt.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, tt.fx.step = {}, tt.expr && tt.expr.filters && (tt.expr.filters.animated = function(t) {
                return tt.grep(tt.timers, function(e) {
                    return t === e.elem
                }).length
            });
            var ii = /^(?:body|html)$/i;
            tt.fn.offset = function(t) {
                if (arguments.length) return t === e ? this : this.each(function(e) {
                    tt.offset.setOffset(this, t, e)
                });
                var i, n, s, r, a, o, l, h = {
                        top: 0,
                        left: 0
                    },
                    u = this[0],
                    c = u && u.ownerDocument;
                if (c) return (n = c.body) === u ? tt.offset.bodyOffset(u) : (i = c.documentElement, tt.contains(i, u) ? ("undefined" != typeof u.getBoundingClientRect && (h = u.getBoundingClientRect()), s = B(c), r = i.clientTop || n.clientTop || 0, a = i.clientLeft || n.clientLeft || 0, o = s.pageYOffset || i.scrollTop, l = s.pageXOffset || i.scrollLeft, {
                    top: h.top + o - r,
                    left: h.left + l - a
                }) : h)
            }, tt.offset = {
                bodyOffset: function(t) {
                    var e = t.offsetTop,
                        i = t.offsetLeft;
                    return tt.support.doesNotIncludeMarginInBodyOffset && (e += parseFloat(tt.css(t, "marginTop")) || 0, i += parseFloat(tt.css(t, "marginLeft")) || 0), {
                        top: e,
                        left: i
                    }
                },
                setOffset: function(t, e, i) {
                    var n = tt.css(t, "position");
                    "static" === n && (t.style.position = "relative");
                    var s, r, a = tt(t),
                        o = a.offset(),
                        l = tt.css(t, "top"),
                        h = tt.css(t, "left"),
                        u = ("absolute" === n || "fixed" === n) && tt.inArray("auto", [l, h]) > -1,
                        c = {},
                        d = {};
                    u ? (d = a.position(), s = d.top, r = d.left) : (s = parseFloat(l) || 0, r = parseFloat(h) || 0), tt.isFunction(e) && (e = e.call(t, i, o)), null != e.top && (c.top = e.top - o.top + s), null != e.left && (c.left = e.left - o.left + r), "using" in e ? e.using.call(t, c) : a.css(c)
                }
            }, tt.fn.extend({
                position: function() {
                    if (this[0]) {
                        var t = this[0],
                            e = this.offsetParent(),
                            i = this.offset(),
                            n = ii.test(e[0].nodeName) ? {
                                top: 0,
                                left: 0
                            } : e.offset();
                        return i.top -= parseFloat(tt.css(t, "marginTop")) || 0, i.left -= parseFloat(tt.css(t, "marginLeft")) || 0, n.top += parseFloat(tt.css(e[0], "borderTopWidth")) || 0, n.left += parseFloat(tt.css(e[0], "borderLeftWidth")) || 0, {
                            top: i.top - n.top,
                            left: i.left - n.left
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var t = this.offsetParent || q.body; t && !ii.test(t.nodeName) && "static" === tt.css(t, "position");) t = t.offsetParent;
                        return t || q.body
                    })
                }
            }), tt.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(t, i) {
                var n = /Y/.test(i);
                tt.fn[t] = function(s) {
                    return tt.access(this, function(t, s, r) {
                        var a = B(t);
                        return r === e ? a ? i in a ? a[i] : a.document.documentElement[s] : t[s] : void(a ? a.scrollTo(n ? tt(a).scrollLeft() : r, n ? r : tt(a).scrollTop()) : t[s] = r)
                    }, t, s, arguments.length, null)
                }
            }), tt.each({
                Height: "height",
                Width: "width"
            }, function(t, i) {
                tt.each({
                    padding: "inner" + t,
                    content: i,
                    "": "outer" + t
                }, function(n, s) {
                    tt.fn[s] = function(s, r) {
                        var a = arguments.length && (n || "boolean" != typeof s),
                            o = n || (s === !0 || r === !0 ? "margin" : "border");
                        return tt.access(this, function(i, n, s) {
                            var r;
                            return tt.isWindow(i) ? i.document.documentElement["client" + t] : 9 === i.nodeType ? (r = i.documentElement, Math.max(i.body["scroll" + t], r["scroll" + t], i.body["offset" + t], r["offset" + t], r["client" + t])) : s === e ? tt.css(i, n, s, o) : tt.style(i, n, s, o)
                        }, i, a ? s : e, a, null)
                    }
                })
            }), t.jQuery = t.$ = tt, "function" == typeof n && n.amd && n.amd.jQuery && n("jquery", [], function() {
                return tt
            })
        }(window),
        function(t) {
            "function" == typeof n && n.amd ? n("jquery-ui", ["jquery"], t) : t(jQuery)
        }(function(t) {
            function e(e, n) {
                var s, r, a, o = e.nodeName.toLowerCase();
                return "area" === o ? (s = e.parentNode, r = s.name, e.href && r && "map" === s.nodeName.toLowerCase() ? (a = t("img[usemap='#" + r + "']")[0], !!a && i(a)) : !1) : (/input|select|textarea|button|object/.test(o) ? !e.disabled : "a" === o ? e.href || n : n) && i(e)
            }

            function i(e) {
                return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
                    return "hidden" === t.css(this, "visibility")
                }).length
            }

            function n(t) {
                for (var e, i; t.length && t[0] !== document;) {
                    if (e = t.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
                    t = t.parent()
                }
                return 0
            }

            function s() {
                this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                    closeText: "Done",
                    prevText: "Prev",
                    nextText: "Next",
                    currentText: "Today",
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    weekHeader: "Wk",
                    dateFormat: "mm/dd/yy",
                    firstDay: 0,
                    isRTL: !1,
                    showMonthAfterYear: !1,
                    yearSuffix: ""
                }, this._defaults = {
                    showOn: "focus",
                    showAnim: "fadeIn",
                    showOptions: {},
                    defaultDate: null,
                    appendText: "",
                    buttonText: "...",
                    buttonImage: "",
                    buttonImageOnly: !1,
                    hideIfNoPrevNext: !1,
                    navigationAsDateFormat: !1,
                    gotoCurrent: !1,
                    changeMonth: !1,
                    changeYear: !1,
                    yearRange: "c-10:c+10",
                    showOtherMonths: !1,
                    selectOtherMonths: !1,
                    showWeek: !1,
                    calculateWeek: this.iso8601Week,
                    shortYearCutoff: "+10",
                    minDate: null,
                    maxDate: null,
                    duration: "fast",
                    beforeShowDay: null,
                    beforeShow: null,
                    onSelect: null,
                    onChangeMonthYear: null,
                    onClose: null,
                    numberOfMonths: 1,
                    showCurrentAtPos: 0,
                    stepMonths: 1,
                    stepBigMonths: 12,
                    altField: "",
                    altFormat: "",
                    constrainInput: !0,
                    showButtonPanel: !1,
                    autoSize: !1,
                    disabled: !1
                }, t.extend(this._defaults, this.regional[""]), this.regional.en = t.extend(!0, {}, this.regional[""]), this.regional["en-US"] = t.extend(!0, {}, this.regional.en), this.dpDiv = r(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
            }

            function r(e) {
                var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
                return e.delegate(i, "mouseout", function() {
                    t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
                }).delegate(i, "mouseover", a)
            }

            function a() {
                t.datepicker._isDisabledDatepicker(v.inline ? v.dpDiv.parent()[0] : v.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
            }

            function o(e, i) {
                t.extend(e, i);
                for (var n in i) null == i[n] && (e[n] = i[n]);
                return e
            }

            function l(t) {
                return function() {
                    var e = this.element.val();
                    t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
                }
            }
            t.ui = t.ui || {}, t.extend(t.ui, {
                version: "1.11.2",
                keyCode: {
                    BACKSPACE: 8,
                    COMMA: 188,
                    DELETE: 46,
                    DOWN: 40,
                    END: 35,
                    ENTER: 13,
                    ESCAPE: 27,
                    HOME: 36,
                    LEFT: 37,
                    PAGE_DOWN: 34,
                    PAGE_UP: 33,
                    PERIOD: 190,
                    RIGHT: 39,
                    SPACE: 32,
                    TAB: 9,
                    UP: 38
                }
            }), t.fn.extend({
                scrollParent: function(e) {
                    var i = this.css("position"),
                        n = "absolute" === i,
                        s = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                        r = this.parents().filter(function() {
                            var e = t(this);
                            return n && "static" === e.css("position") ? !1 : s.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
                        }).eq(0);
                    return "fixed" !== i && r.length ? r : t(this[0].ownerDocument || document)
                },
                uniqueId: function() {
                    var t = 0;
                    return function() {
                        return this.each(function() {
                            this.id || (this.id = "ui-id-" + ++t)
                        })
                    }
                }(),
                removeUniqueId: function() {
                    return this.each(function() {
                        /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id")
                    })
                }
            }), t.extend(t.expr[":"], {
                data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
                    return function(i) {
                        return !!t.data(i, e)
                    }
                }) : function(e, i, n) {
                    return !!t.data(e, n[3])
                },
                focusable: function(i) {
                    return e(i, !isNaN(t.attr(i, "tabindex")))
                },
                tabbable: function(i) {
                    var n = t.attr(i, "tabindex"),
                        s = isNaN(n);
                    return (s || n >= 0) && e(i, !s)
                }
            }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(e, i) {
                function n(e, i, n, r) {
                    return t.each(s, function() {
                        i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), r && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
                    }), i
                }
                var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                    r = i.toLowerCase(),
                    a = {
                        innerWidth: t.fn.innerWidth,
                        innerHeight: t.fn.innerHeight,
                        outerWidth: t.fn.outerWidth,
                        outerHeight: t.fn.outerHeight
                    };
                t.fn["inner" + i] = function(e) {
                    return void 0 === e ? a["inner" + i].call(this) : this.each(function() {
                        t(this).css(r, n(this, e) + "px")
                    })
                }, t.fn["outer" + i] = function(e, s) {
                    return "number" != typeof e ? a["outer" + i].call(this, e) : this.each(function() {
                        t(this).css(r, n(this, e, !0, s) + "px")
                    })
                }
            }), t.fn.addBack || (t.fn.addBack = function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
                return function(i) {
                    return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
                }
            }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.fn.extend({
                focus: function(e) {
                    return function(i, n) {
                        return "number" == typeof i ? this.each(function() {
                            var e = this;
                            setTimeout(function() {
                                t(e).focus(), n && n.call(e)
                            }, i)
                        }) : e.apply(this, arguments)
                    }
                }(t.fn.focus),
                disableSelection: function() {
                    var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                    return function() {
                        return this.bind(t + ".ui-disableSelection", function(t) {
                            t.preventDefault()
                        })
                    }
                }(),
                enableSelection: function() {
                    return this.unbind(".ui-disableSelection")
                },
                zIndex: function(e) {
                    if (void 0 !== e) return this.css("zIndex", e);
                    if (this.length)
                        for (var i, n, s = t(this[0]); s.length && s[0] !== document;) {
                            if (i = s.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (n = parseInt(s.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n;
                            s = s.parent()
                        }
                    return 0
                }
            }), t.ui.plugin = {
                add: function(e, i, n) {
                    var s, r = t.ui[e].prototype;
                    for (s in n) r.plugins[s] = r.plugins[s] || [], r.plugins[s].push([i, n[s]])
                },
                call: function(t, e, i, n) {
                    var s, r = t.plugins[e];
                    if (r && (n || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                        for (s = 0; r.length > s; s++) t.options[r[s][0]] && r[s][1].apply(t.element, i)
                }
            };
            var h = 0,
                u = Array.prototype.slice;
            t.cleanData = function(e) {
                return function(i) {
                    var n, s, r;
                    for (r = 0; null != (s = i[r]); r++) try {
                        n = t._data(s, "events"), n && n.remove && t(s).triggerHandler("remove")
                    } catch (a) {}
                    e(i)
                }
            }(t.cleanData), t.widget = function(e, i, n) {
                var s, r, a, o, l = {},
                    h = e.split(".")[0];
                return e = e.split(".")[1], s = h + "-" + e, n || (n = i, i = t.Widget), t.expr[":"][s.toLowerCase()] = function(e) {
                    return !!t.data(e, s)
                }, t[h] = t[h] || {}, r = t[h][e], a = t[h][e] = function(t, e) {
                    return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new a(t, e)
                }, t.extend(a, r, {
                    version: n.version,
                    _proto: t.extend({}, n),
                    _childConstructors: []
                }), o = new i, o.options = t.widget.extend({}, o.options), t.each(n, function(e, n) {
                    return t.isFunction(n) ? void(l[e] = function() {
                        var t = function() {
                                return i.prototype[e].apply(this, arguments)
                            },
                            s = function(t) {
                                return i.prototype[e].apply(this, t)
                            };
                        return function() {
                            var e, i = this._super,
                                r = this._superApply;
                            return this._super = t, this._superApply = s, e = n.apply(this, arguments), this._super = i, this._superApply = r, e
                        }
                    }()) : void(l[e] = n)
                }), a.prototype = t.widget.extend(o, {
                    widgetEventPrefix: r ? o.widgetEventPrefix || e : e
                }, l, {
                    constructor: a,
                    namespace: h,
                    widgetName: e,
                    widgetFullName: s
                }), r ? (t.each(r._childConstructors, function(e, i) {
                    var n = i.prototype;
                    t.widget(n.namespace + "." + n.widgetName, a, i._proto)
                }), delete r._childConstructors) : i._childConstructors.push(a), t.widget.bridge(e, a), a
            }, t.widget.extend = function(e) {
                for (var i, n, s = u.call(arguments, 1), r = 0, a = s.length; a > r; r++)
                    for (i in s[r]) n = s[r][i], s[r].hasOwnProperty(i) && void 0 !== n && (e[i] = t.isPlainObject(n) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], n) : t.widget.extend({}, n) : n);
                return e
            }, t.widget.bridge = function(e, i) {
                var n = i.prototype.widgetFullName || e;
                t.fn[e] = function(s) {
                    var r = "string" == typeof s,
                        a = u.call(arguments, 1),
                        o = this;
                    return s = !r && a.length ? t.widget.extend.apply(null, [s].concat(a)) : s, r ? this.each(function() {
                        var i, r = t.data(this, n);
                        return "instance" === s ? (o = r, !1) : r ? t.isFunction(r[s]) && "_" !== s.charAt(0) ? (i = r[s].apply(r, a), i !== r && void 0 !== i ? (o = i && i.jquery ? o.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + s + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + s + "'")
                    }) : this.each(function() {
                        var e = t.data(this, n);
                        e ? (e.option(s || {}), e._init && e._init()) : t.data(this, n, new i(s, this))
                    }), o
                }
            }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
                widgetName: "widget",
                widgetEventPrefix: "",
                defaultElement: "<div>",
                options: {
                    disabled: !1,
                    create: null
                },
                _createWidget: function(e, i) {
                    i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = h++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                        remove: function(t) {
                            t.target === i && this.destroy()
                        }
                    }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
                },
                _getCreateOptions: t.noop,
                _getCreateEventData: t.noop,
                _create: t.noop,
                _init: t.noop,
                destroy: function() {
                    this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
                },
                _destroy: t.noop,
                widget: function() {
                    return this.element
                },
                option: function(e, i) {
                    var n, s, r, a = e;
                    if (0 === arguments.length) return t.widget.extend({}, this.options);
                    if ("string" == typeof e)
                        if (a = {}, n = e.split("."), e = n.shift(), n.length) {
                            for (s = a[e] = t.widget.extend({}, this.options[e]), r = 0; n.length - 1 > r; r++) s[n[r]] = s[n[r]] || {}, s = s[n[r]];
                            if (e = n.pop(), 1 === arguments.length) return void 0 === s[e] ? null : s[e];
                            s[e] = i
                        } else {
                            if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                            a[e] = i
                        }
                    return this._setOptions(a), this
                },
                _setOptions: function(t) {
                    var e;
                    for (e in t) this._setOption(e, t[e]);
                    return this
                },
                _setOption: function(t, e) {
                    return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
                },
                enable: function() {
                    return this._setOptions({
                        disabled: !1
                    })
                },
                disable: function() {
                    return this._setOptions({
                        disabled: !0
                    })
                },
                _on: function(e, i, n) {
                    var s, r = this;
                    "boolean" != typeof e && (n = i, i = e, e = !1), n ? (i = s = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), t.each(n, function(n, a) {
                        function o() {
                            return e || r.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? r[a] : a).apply(r, arguments) : void 0
                        }
                        "string" != typeof a && (o.guid = a.guid = a.guid || o.guid || t.guid++);
                        var l = n.match(/^([\w:-]*)\s*(.*)$/),
                            h = l[1] + r.eventNamespace,
                            u = l[2];
                        u ? s.delegate(u, h, o) : i.bind(h, o)
                    })
                },
                _off: function(e, i) {
                    i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(i).undelegate(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
                },
                _delay: function(t, e) {
                    function i() {
                        return ("string" == typeof t ? n[t] : t).apply(n, arguments)
                    }
                    var n = this;
                    return setTimeout(i, e || 0)
                },
                _hoverable: function(e) {
                    this.hoverable = this.hoverable.add(e), this._on(e, {
                        mouseenter: function(e) {
                            t(e.currentTarget).addClass("ui-state-hover")
                        },
                        mouseleave: function(e) {
                            t(e.currentTarget).removeClass("ui-state-hover")
                        }
                    })
                },
                _focusable: function(e) {
                    this.focusable = this.focusable.add(e), this._on(e, {
                        focusin: function(e) {
                            t(e.currentTarget).addClass("ui-state-focus")
                        },
                        focusout: function(e) {
                            t(e.currentTarget).removeClass("ui-state-focus")
                        }
                    })
                },
                _trigger: function(e, i, n) {
                    var s, r, a = this.options[e];
                    if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], r = i.originalEvent)
                        for (s in r) s in i || (i[s] = r[s]);
                    return this.element.trigger(i, n), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
                }
            }, t.each({
                show: "fadeIn",
                hide: "fadeOut"
            }, function(e, i) {
                t.Widget.prototype["_" + e] = function(n, s, r) {
                    "string" == typeof s && (s = {
                        effect: s
                    });
                    var a, o = s ? s === !0 || "number" == typeof s ? i : s.effect || i : e;
                    s = s || {}, "number" == typeof s && (s = {
                        duration: s
                    }), a = !t.isEmptyObject(s), s.complete = r, s.delay && n.delay(s.delay), a && t.effects && t.effects.effect[o] ? n[e](s) : o !== e && n[o] ? n[o](s.duration, s.easing, r) : n.queue(function(i) {
                        t(this)[e](), r && r.call(n[0]), i()
                    })
                }
            }), t.widget;
            var c = !1;
            t(document).mouseup(function() {
                    c = !1
                }), t.widget("ui.mouse", {
                    version: "1.11.2",
                    options: {
                        cancel: "input,textarea,button,select,option",
                        distance: 1,
                        delay: 0
                    },
                    _mouseInit: function() {
                        var e = this;
                        this.element.bind("mousedown." + this.widgetName, function(t) {
                            return e._mouseDown(t)
                        }).bind("click." + this.widgetName, function(i) {
                            return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
                        }), this.started = !1
                    },
                    _mouseDestroy: function() {
                        this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
                    },
                    _mouseDown: function(e) {
                        if (!c) {
                            this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                            var i = this,
                                n = 1 === e.which,
                                s = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;
                            return n && !s && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                                i.mouseDelayMet = !0
                            }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                                return i._mouseMove(t)
                            }, this._mouseUpDelegate = function(t) {
                                return i._mouseUp(t)
                            }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), c = !0, !0)) : !0
                        }
                    },
                    _mouseMove: function(e) {
                        if (this._mouseMoved) {
                            if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e);
                            if (!e.which) return this._mouseUp(e)
                        }
                        return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
                    },
                    _mouseUp: function(e) {
                        return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), c = !1, !1
                    },
                    _mouseDistanceMet: function(t) {
                        return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
                    },
                    _mouseDelayMet: function() {
                        return this.mouseDelayMet
                    },
                    _mouseStart: function() {},
                    _mouseDrag: function() {},
                    _mouseStop: function() {},
                    _mouseCapture: function() {
                        return !0
                    }
                }),
                function() {
                    function e(t, e, i) {
                        return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
                    }

                    function i(e, i) {
                        return parseInt(t.css(e, i), 10) || 0
                    }

                    function n(e) {
                        var i = e[0];
                        return 9 === i.nodeType ? {
                            width: e.width(),
                            height: e.height(),
                            offset: {
                                top: 0,
                                left: 0
                            }
                        } : t.isWindow(i) ? {
                            width: e.width(),
                            height: e.height(),
                            offset: {
                                top: e.scrollTop(),
                                left: e.scrollLeft()
                            }
                        } : i.preventDefault ? {
                            width: 0,
                            height: 0,
                            offset: {
                                top: i.pageY,
                                left: i.pageX
                            }
                        } : {
                            width: e.outerWidth(),
                            height: e.outerHeight(),
                            offset: e.offset()
                        }
                    }
                    t.ui = t.ui || {};
                    var s, r, a = Math.max,
                        o = Math.abs,
                        l = Math.round,
                        h = /left|center|right/,
                        u = /top|center|bottom/,
                        c = /[\+\-]\d+(\.[\d]+)?%?/,
                        d = /^\w+/,
                        p = /%$/,
                        f = t.fn.position;
                    t.position = {
                            scrollbarWidth: function() {
                                if (void 0 !== s) return s;
                                var e, i, n = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                                    r = n.children()[0];
                                return t("body").append(n), e = r.offsetWidth, n.css("overflow", "scroll"), i = r.offsetWidth, e === i && (i = n[0].clientWidth), n.remove(), s = e - i
                            },
                            getScrollInfo: function(e) {
                                var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                                    n = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                                    s = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
                                    r = "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight;
                                return {
                                    width: r ? t.position.scrollbarWidth() : 0,
                                    height: s ? t.position.scrollbarWidth() : 0
                                }
                            },
                            getWithinInfo: function(e) {
                                var i = t(e || window),
                                    n = t.isWindow(i[0]),
                                    s = !!i[0] && 9 === i[0].nodeType;
                                return {
                                    element: i,
                                    isWindow: n,
                                    isDocument: s,
                                    offset: i.offset() || {
                                        left: 0,
                                        top: 0
                                    },
                                    scrollLeft: i.scrollLeft(),
                                    scrollTop: i.scrollTop(),
                                    width: n || s ? i.width() : i.outerWidth(),
                                    height: n || s ? i.height() : i.outerHeight()
                                }
                            }
                        }, t.fn.position = function(s) {
                            if (!s || !s.of) return f.apply(this, arguments);
                            s = t.extend({}, s);
                            var p, g, m, v, y, b, _ = t(s.of),
                                x = t.position.getWithinInfo(s.within),
                                w = t.position.getScrollInfo(x),
                                k = (s.collision || "flip").split(" "),
                                C = {};
                            return b = n(_), _[0].preventDefault && (s.at = "left top"), g = b.width, m = b.height, v = b.offset, y = t.extend({}, v), t.each(["my", "at"], function() {
                                var t, e, i = (s[this] || "").split(" ");
                                1 === i.length && (i = h.test(i[0]) ? i.concat(["center"]) : u.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = h.test(i[0]) ? i[0] : "center", i[1] = u.test(i[1]) ? i[1] : "center", t = c.exec(i[0]), e = c.exec(i[1]), C[this] = [t ? t[0] : 0, e ? e[0] : 0], s[this] = [d.exec(i[0])[0], d.exec(i[1])[0]]
                            }), 1 === k.length && (k[1] = k[0]), "right" === s.at[0] ? y.left += g : "center" === s.at[0] && (y.left += g / 2), "bottom" === s.at[1] ? y.top += m : "center" === s.at[1] && (y.top += m / 2), p = e(C.at, g, m), y.left += p[0], y.top += p[1], this.each(function() {
                                var n, h, u = t(this),
                                    c = u.outerWidth(),
                                    d = u.outerHeight(),
                                    f = i(this, "marginLeft"),
                                    b = i(this, "marginTop"),
                                    T = c + f + i(this, "marginRight") + w.width,
                                    D = d + b + i(this, "marginBottom") + w.height,
                                    S = t.extend({}, y),
                                    M = e(C.my, u.outerWidth(), u.outerHeight());
                                "right" === s.my[0] ? S.left -= c : "center" === s.my[0] && (S.left -= c / 2), "bottom" === s.my[1] ? S.top -= d : "center" === s.my[1] && (S.top -= d / 2), S.left += M[0], S.top += M[1], r || (S.left = l(S.left), S.top = l(S.top)), n = {
                                    marginLeft: f,
                                    marginTop: b
                                }, t.each(["left", "top"], function(e, i) {
                                    t.ui.position[k[e]] && t.ui.position[k[e]][i](S, {
                                        targetWidth: g,
                                        targetHeight: m,
                                        elemWidth: c,
                                        elemHeight: d,
                                        collisionPosition: n,
                                        collisionWidth: T,
                                        collisionHeight: D,
                                        offset: [p[0] + M[0], p[1] + M[1]],
                                        my: s.my,
                                        at: s.at,
                                        within: x,
                                        elem: u
                                    })
                                }), s.using && (h = function(t) {
                                    var e = v.left - S.left,
                                        i = e + g - c,
                                        n = v.top - S.top,
                                        r = n + m - d,
                                        l = {
                                            target: {
                                                element: _,
                                                left: v.left,
                                                top: v.top,
                                                width: g,
                                                height: m
                                            },
                                            element: {
                                                element: u,
                                                left: S.left,
                                                top: S.top,
                                                width: c,
                                                height: d
                                            },
                                            horizontal: 0 > i ? "left" : e > 0 ? "right" : "center",
                                            vertical: 0 > r ? "top" : n > 0 ? "bottom" : "middle"
                                        };
                                    c > g && g > o(e + i) && (l.horizontal = "center"), d > m && m > o(n + r) && (l.vertical = "middle"), l.important = a(o(e), o(i)) > a(o(n), o(r)) ? "horizontal" : "vertical", s.using.call(this, t, l)
                                }), u.offset(t.extend(S, {
                                    using: h
                                }))
                            })
                        }, t.ui.position = {
                            fit: {
                                left: function(t, e) {
                                    var i, n = e.within,
                                        s = n.isWindow ? n.scrollLeft : n.offset.left,
                                        r = n.width,
                                        o = t.left - e.collisionPosition.marginLeft,
                                        l = s - o,
                                        h = o + e.collisionWidth - r - s;
                                    e.collisionWidth > r ? l > 0 && 0 >= h ? (i = t.left + l + e.collisionWidth - r - s, t.left += l - i) : t.left = h > 0 && 0 >= l ? s : l > h ? s + r - e.collisionWidth : s : l > 0 ? t.left += l : h > 0 ? t.left -= h : t.left = a(t.left - o, t.left)
                                },
                                top: function(t, e) {
                                    var i, n = e.within,
                                        s = n.isWindow ? n.scrollTop : n.offset.top,
                                        r = e.within.height,
                                        o = t.top - e.collisionPosition.marginTop,
                                        l = s - o,
                                        h = o + e.collisionHeight - r - s;
                                    e.collisionHeight > r ? l > 0 && 0 >= h ? (i = t.top + l + e.collisionHeight - r - s, t.top += l - i) : t.top = h > 0 && 0 >= l ? s : l > h ? s + r - e.collisionHeight : s : l > 0 ? t.top += l : h > 0 ? t.top -= h : t.top = a(t.top - o, t.top)
                                }
                            },
                            flip: {
                                left: function(t, e) {
                                    var i, n, s = e.within,
                                        r = s.offset.left + s.scrollLeft,
                                        a = s.width,
                                        l = s.isWindow ? s.scrollLeft : s.offset.left,
                                        h = t.left - e.collisionPosition.marginLeft,
                                        u = h - l,
                                        c = h + e.collisionWidth - a - l,
                                        d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                                        p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                                        f = -2 * e.offset[0];
                                    0 > u ? (i = t.left + d + p + f + e.collisionWidth - a - r, (0 > i || o(u) > i) && (t.left += d + p + f)) : c > 0 && (n = t.left - e.collisionPosition.marginLeft + d + p + f - l, (n > 0 || c > o(n)) && (t.left += d + p + f))
                                },
                                top: function(t, e) {
                                    var i, n, s = e.within,
                                        r = s.offset.top + s.scrollTop,
                                        a = s.height,
                                        l = s.isWindow ? s.scrollTop : s.offset.top,
                                        h = t.top - e.collisionPosition.marginTop,
                                        u = h - l,
                                        c = h + e.collisionHeight - a - l,
                                        d = "top" === e.my[1],
                                        p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                                        f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                                        g = -2 * e.offset[1];
                                    0 > u ? (n = t.top + p + f + g + e.collisionHeight - a - r, t.top + p + f + g > u && (0 > n || o(u) > n) && (t.top += p + f + g)) : c > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + g - l, t.top + p + f + g > c && (i > 0 || c > o(i)) && (t.top += p + f + g))
                                }
                            },
                            flipfit: {
                                left: function() {
                                    t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                                },
                                top: function() {
                                    t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                                }
                            }
                        },
                        function() {
                            var e, i, n, s, a, o = document.getElementsByTagName("body")[0],
                                l = document.createElement("div");
                            e = document.createElement(o ? "div" : "body"), n = {
                                visibility: "hidden",
                                width: 0,
                                height: 0,
                                border: 0,
                                margin: 0,
                                background: "none"
                            }, o && t.extend(n, {
                                position: "absolute",
                                left: "-1000px",
                                top: "-1000px"
                            });
                            for (a in n) e.style[a] = n[a];
                            e.appendChild(l), i = o || document.documentElement, i.insertBefore(e, i.firstChild), l.style.cssText = "position: absolute; left: 10.7432222px;", s = t(l).offset().left, r = s > 10 && 11 > s, e.innerHTML = "", i.removeChild(e)
                        }()
                }(), t.ui.position, t.widget("ui.draggable", t.ui.mouse, {
                    version: "1.11.2",
                    widgetEventPrefix: "drag",
                    options: {
                        addClasses: !0,
                        appendTo: "parent",
                        axis: !1,
                        connectToSortable: !1,
                        containment: !1,
                        cursor: "auto",
                        cursorAt: !1,
                        grid: !1,
                        handle: !1,
                        helper: "original",
                        iframeFix: !1,
                        opacity: !1,
                        refreshPositions: !1,
                        revert: !1,
                        revertDuration: 500,
                        scope: "default",
                        scroll: !0,
                        scrollSensitivity: 20,
                        scrollSpeed: 20,
                        snap: !1,
                        snapMode: "both",
                        snapTolerance: 20,
                        stack: !1,
                        zIndex: !1,
                        drag: null,
                        start: null,
                        stop: null
                    },
                    _create: function() {
                        "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
                    },
                    _setOption: function(t, e) {
                        this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName())
                    },
                    _destroy: function() {
                        return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy())
                    },
                    _mouseCapture: function(e) {
                        var i = this.options;
                        return this._blurActiveElement(e), this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1)
                    },
                    _blockFrames: function(e) {
                        this.iframeBlocks = this.document.find(e).map(function() {
                            var e = t(this);
                            return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
                        })
                    },
                    _unblockFrames: function() {
                        this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
                    },
                    _blurActiveElement: function(e) {
                        var i = this.document[0];
                        if (this.handleElement.is(e.target)) try {
                            i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && t(i.activeElement).blur()
                        } catch (n) {}
                    },
                    _mouseStart: function(e) {
                        var i = this.options;
                        return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
                            return "fixed" === t(this).css("position")
                        }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._normalizeRightBottom(), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
                    },
                    _refreshOffsets: function(t) {
                        this.offset = {
                            top: this.positionAbs.top - this.margins.top,
                            left: this.positionAbs.left - this.margins.left,
                            scroll: !1,
                            parent: this._getParentOffset(),
                            relative: this._getRelativeOffset()
                        }, this.offset.click = {
                            left: t.pageX - this.offset.left,
                            top: t.pageY - this.offset.top
                        }
                    },
                    _mouseDrag: function(e, i) {
                        if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                            var n = this._uiHash();
                            if (this._trigger("drag", e, n) === !1) return this._mouseUp({}), !1;
                            this.position = n.position
                        }
                        return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
                    },
                    _mouseStop: function(e) {
                        var i = this,
                            n = !1;
                        return t.ui.ddmanager && !this.options.dropBehaviour && (n = t.ui.ddmanager.drop(this, e)), this.dropped && (n = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !n || "valid" === this.options.revert && n || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, n) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                            i._trigger("stop", e) !== !1 && i._clear()
                        }) : this._trigger("stop", e) !== !1 && this._clear(), !1
                    },
                    _mouseUp: function(e) {
                        return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.focus(), t.ui.mouse.prototype._mouseUp.call(this, e)
                    },
                    cancel: function() {
                        return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
                    },
                    _getHandle: function(e) {
                        return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
                    },
                    _setHandleClassName: function() {
                        this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
                    },
                    _removeHandleClassName: function() {
                        this.handleElement.removeClass("ui-draggable-handle")
                    },
                    _createHelper: function(e) {
                        var i = this.options,
                            n = t.isFunction(i.helper),
                            s = n ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
                        return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), n && s[0] === this.element[0] && this._setPositionRelative(), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s
                    },
                    _setPositionRelative: function() {
                        /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
                    },
                    _adjustOffsetFromHelper: function(e) {
                        "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                            left: +e[0],
                            top: +e[1] || 0
                        }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
                    },
                    _isRootNode: function(t) {
                        return /(html|body)/i.test(t.tagName) || t === this.document[0]
                    },
                    _getParentOffset: function() {
                        var e = this.offsetParent.offset(),
                            i = this.document[0];
                        return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = {
                            top: 0,
                            left: 0
                        }), {
                            top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                            left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                        }
                    },
                    _getRelativeOffset: function() {
                        if ("relative" !== this.cssPosition) return {
                            top: 0,
                            left: 0
                        };
                        var t = this.element.position(),
                            e = this._isRootNode(this.scrollParent[0]);
                        return {
                            top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                            left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
                        }
                    },
                    _cacheMargins: function() {
                        this.margins = {
                            left: parseInt(this.element.css("marginLeft"), 10) || 0,
                            top: parseInt(this.element.css("marginTop"), 10) || 0,
                            right: parseInt(this.element.css("marginRight"), 10) || 0,
                            bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                        }
                    },
                    _cacheHelperProportions: function() {
                        this.helperProportions = {
                            width: this.helper.outerWidth(),
                            height: this.helper.outerHeight()
                        }
                    },
                    _setContainment: function() {
                        var e, i, n, s = this.options,
                            r = this.document[0];
                        return this.relativeContainer = null, s.containment ? "window" === s.containment ? void(this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || r.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === s.containment ? void(this.containment = [0, 0, t(r).width() - this.helperProportions.width - this.margins.left, (t(r).height() || r.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : s.containment.constructor === Array ? void(this.containment = s.containment) : ("parent" === s.containment && (s.containment = this.helper[0].parentNode),
                            i = t(s.containment), n = i[0], void(n && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i))) : void(this.containment = null)
                    },
                    _convertPositionTo: function(t, e) {
                        e || (e = this.position);
                        var i = "absolute" === t ? 1 : -1,
                            n = this._isRootNode(this.scrollParent[0]);
                        return {
                            top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : n ? 0 : this.offset.scroll.top) * i,
                            left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : n ? 0 : this.offset.scroll.left) * i
                        }
                    },
                    _generatePosition: function(t, e) {
                        var i, n, s, r, a = this.options,
                            o = this._isRootNode(this.scrollParent[0]),
                            l = t.pageX,
                            h = t.pageY;
                        return o && this.offset.scroll || (this.offset.scroll = {
                            top: this.scrollParent.scrollTop(),
                            left: this.scrollParent.scrollLeft()
                        }), e && (this.containment && (this.relativeContainer ? (n = this.relativeContainer.offset(), i = [this.containment[0] + n.left, this.containment[1] + n.top, this.containment[2] + n.left, this.containment[3] + n.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), a.grid && (s = a.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, h = i ? s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - a.grid[1] : s + a.grid[1] : s, r = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, l = i ? r - this.offset.click.left >= i[0] || r - this.offset.click.left > i[2] ? r : r - this.offset.click.left >= i[0] ? r - a.grid[0] : r + a.grid[0] : r), "y" === a.axis && (l = this.originalPageX), "x" === a.axis && (h = this.originalPageY)), {
                            top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : o ? 0 : this.offset.scroll.top),
                            left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : o ? 0 : this.offset.scroll.left)
                        }
                    },
                    _clear: function() {
                        this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
                    },
                    _normalizeRightBottom: function() {
                        "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
                    },
                    _trigger: function(e, i, n) {
                        return n = n || this._uiHash(), t.ui.plugin.call(this, e, [i, n, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), n.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, n)
                    },
                    plugins: {},
                    _uiHash: function() {
                        return {
                            helper: this.helper,
                            position: this.position,
                            originalPosition: this.originalPosition,
                            offset: this.positionAbs
                        }
                    }
                }), t.ui.plugin.add("draggable", "connectToSortable", {
                    start: function(e, i, n) {
                        var s = t.extend({}, i, {
                            item: n.element
                        });
                        n.sortables = [], t(n.options.connectToSortable).each(function() {
                            var i = t(this).sortable("instance");
                            i && !i.options.disabled && (n.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, s))
                        })
                    },
                    stop: function(e, i, n) {
                        var s = t.extend({}, i, {
                            item: n.element
                        });
                        n.cancelHelperRemoval = !1, t.each(n.sortables, function() {
                            var t = this;
                            t.isOver ? (t.isOver = 0, n.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
                                position: t.placeholder.css("position"),
                                top: t.placeholder.css("top"),
                                left: t.placeholder.css("left")
                            }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, s))
                        })
                    },
                    drag: function(e, i, n) {
                        t.each(n.sortables, function() {
                            var s = !1,
                                r = this;
                            r.positionAbs = n.positionAbs, r.helperProportions = n.helperProportions, r.offset.click = n.offset.click, r._intersectsWith(r.containerCache) && (s = !0, t.each(n.sortables, function() {
                                return this.positionAbs = n.positionAbs, this.helperProportions = n.helperProportions, this.offset.click = n.offset.click, this !== r && this._intersectsWith(this.containerCache) && t.contains(r.element[0], this.element[0]) && (s = !1), s
                            })), s ? (r.isOver || (r.isOver = 1, r.currentItem = i.helper.appendTo(r.element).data("ui-sortable-item", !0), r.options._helper = r.options.helper, r.options.helper = function() {
                                return i.helper[0]
                            }, e.target = r.currentItem[0], r._mouseCapture(e, !0), r._mouseStart(e, !0, !0), r.offset.click.top = n.offset.click.top, r.offset.click.left = n.offset.click.left, r.offset.parent.left -= n.offset.parent.left - r.offset.parent.left, r.offset.parent.top -= n.offset.parent.top - r.offset.parent.top, n._trigger("toSortable", e), n.dropped = r.element, t.each(n.sortables, function() {
                                this.refreshPositions()
                            }), n.currentItem = n.element, r.fromOutside = n), r.currentItem && (r._mouseDrag(e), i.position = r.position)) : r.isOver && (r.isOver = 0, r.cancelHelperRemoval = !0, r.options._revert = r.options.revert, r.options.revert = !1, r._trigger("out", e, r._uiHash(r)), r._mouseStop(e, !0), r.options.revert = r.options._revert, r.options.helper = r.options._helper, r.placeholder && r.placeholder.remove(), n._refreshOffsets(e), i.position = n._generatePosition(e, !0), n._trigger("fromSortable", e), n.dropped = !1, t.each(n.sortables, function() {
                                this.refreshPositions()
                            }))
                        })
                    }
                }), t.ui.plugin.add("draggable", "cursor", {
                    start: function(e, i, n) {
                        var s = t("body"),
                            r = n.options;
                        s.css("cursor") && (r._cursor = s.css("cursor")), s.css("cursor", r.cursor)
                    },
                    stop: function(e, i, n) {
                        var s = n.options;
                        s._cursor && t("body").css("cursor", s._cursor)
                    }
                }), t.ui.plugin.add("draggable", "opacity", {
                    start: function(e, i, n) {
                        var s = t(i.helper),
                            r = n.options;
                        s.css("opacity") && (r._opacity = s.css("opacity")), s.css("opacity", r.opacity)
                    },
                    stop: function(e, i, n) {
                        var s = n.options;
                        s._opacity && t(i.helper).css("opacity", s._opacity)
                    }
                }), t.ui.plugin.add("draggable", "scroll", {
                    start: function(t, e, i) {
                        i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
                    },
                    drag: function(e, i, n) {
                        var s = n.options,
                            r = !1,
                            a = n.scrollParentNotHidden[0],
                            o = n.document[0];
                        a !== o && "HTML" !== a.tagName ? (s.axis && "x" === s.axis || (n.overflowOffset.top + a.offsetHeight - e.pageY < s.scrollSensitivity ? a.scrollTop = r = a.scrollTop + s.scrollSpeed : e.pageY - n.overflowOffset.top < s.scrollSensitivity && (a.scrollTop = r = a.scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (n.overflowOffset.left + a.offsetWidth - e.pageX < s.scrollSensitivity ? a.scrollLeft = r = a.scrollLeft + s.scrollSpeed : e.pageX - n.overflowOffset.left < s.scrollSensitivity && (a.scrollLeft = r = a.scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(o).scrollTop() < s.scrollSensitivity ? r = t(o).scrollTop(t(o).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(o).scrollTop()) < s.scrollSensitivity && (r = t(o).scrollTop(t(o).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (e.pageX - t(o).scrollLeft() < s.scrollSensitivity ? r = t(o).scrollLeft(t(o).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(o).scrollLeft()) < s.scrollSensitivity && (r = t(o).scrollLeft(t(o).scrollLeft() + s.scrollSpeed)))), r !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(n, e)
                    }
                }), t.ui.plugin.add("draggable", "snap", {
                    start: function(e, i, n) {
                        var s = n.options;
                        n.snapElements = [], t(s.snap.constructor !== String ? s.snap.items || ":data(ui-draggable)" : s.snap).each(function() {
                            var e = t(this),
                                i = e.offset();
                            this !== n.element[0] && n.snapElements.push({
                                item: this,
                                width: e.outerWidth(),
                                height: e.outerHeight(),
                                top: i.top,
                                left: i.left
                            })
                        })
                    },
                    drag: function(e, i, n) {
                        var s, r, a, o, l, h, u, c, d, p, f = n.options,
                            g = f.snapTolerance,
                            m = i.offset.left,
                            v = m + n.helperProportions.width,
                            y = i.offset.top,
                            b = y + n.helperProportions.height;
                        for (d = n.snapElements.length - 1; d >= 0; d--) l = n.snapElements[d].left - n.margins.left, h = l + n.snapElements[d].width, u = n.snapElements[d].top - n.margins.top, c = u + n.snapElements[d].height, l - g > v || m > h + g || u - g > b || y > c + g || !t.contains(n.snapElements[d].item.ownerDocument, n.snapElements[d].item) ? (n.snapElements[d].snapping && n.options.snap.release && n.options.snap.release.call(n.element, e, t.extend(n._uiHash(), {
                            snapItem: n.snapElements[d].item
                        })), n.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (s = g >= Math.abs(u - b), r = g >= Math.abs(c - y), a = g >= Math.abs(l - v), o = g >= Math.abs(h - m), s && (i.position.top = n._convertPositionTo("relative", {
                            top: u - n.helperProportions.height,
                            left: 0
                        }).top), r && (i.position.top = n._convertPositionTo("relative", {
                            top: c,
                            left: 0
                        }).top), a && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: l - n.helperProportions.width
                        }).left), o && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: h
                        }).left)), p = s || r || a || o, "outer" !== f.snapMode && (s = g >= Math.abs(u - y), r = g >= Math.abs(c - b), a = g >= Math.abs(l - m), o = g >= Math.abs(h - v), s && (i.position.top = n._convertPositionTo("relative", {
                            top: u,
                            left: 0
                        }).top), r && (i.position.top = n._convertPositionTo("relative", {
                            top: c - n.helperProportions.height,
                            left: 0
                        }).top), a && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: l
                        }).left), o && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: h - n.helperProportions.width
                        }).left)), !n.snapElements[d].snapping && (s || r || a || o || p) && n.options.snap.snap && n.options.snap.snap.call(n.element, e, t.extend(n._uiHash(), {
                            snapItem: n.snapElements[d].item
                        })), n.snapElements[d].snapping = s || r || a || o || p)
                    }
                }), t.ui.plugin.add("draggable", "stack", {
                    start: function(e, i, n) {
                        var s, r = n.options,
                            a = t.makeArray(t(r.stack)).sort(function(e, i) {
                                return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
                            });
                        a.length && (s = parseInt(t(a[0]).css("zIndex"), 10) || 0, t(a).each(function(e) {
                            t(this).css("zIndex", s + e)
                        }), this.css("zIndex", s + a.length))
                    }
                }), t.ui.plugin.add("draggable", "zIndex", {
                    start: function(e, i, n) {
                        var s = t(i.helper),
                            r = n.options;
                        s.css("zIndex") && (r._zIndex = s.css("zIndex")), s.css("zIndex", r.zIndex)
                    },
                    stop: function(e, i, n) {
                        var s = n.options;
                        s._zIndex && t(i.helper).css("zIndex", s._zIndex)
                    }
                }), t.ui.draggable, t.widget("ui.droppable", {
                    version: "1.11.2",
                    widgetEventPrefix: "drop",
                    options: {
                        accept: "*",
                        activeClass: !1,
                        addClasses: !0,
                        greedy: !1,
                        hoverClass: !1,
                        scope: "default",
                        tolerance: "intersect",
                        activate: null,
                        deactivate: null,
                        drop: null,
                        out: null,
                        over: null
                    },
                    _create: function() {
                        var e, i = this.options,
                            n = i.accept;
                        this.isover = !1, this.isout = !0, this.accept = t.isFunction(n) ? n : function(t) {
                            return t.is(n)
                        }, this.proportions = function() {
                            return arguments.length ? void(e = arguments[0]) : e ? e : e = {
                                width: this.element[0].offsetWidth,
                                height: this.element[0].offsetHeight
                            }
                        }, this._addToManager(i.scope), i.addClasses && this.element.addClass("ui-droppable")
                    },
                    _addToManager: function(e) {
                        t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this)
                    },
                    _splice: function(t) {
                        for (var e = 0; t.length > e; e++) t[e] === this && t.splice(e, 1)
                    },
                    _destroy: function() {
                        var e = t.ui.ddmanager.droppables[this.options.scope];
                        this._splice(e), this.element.removeClass("ui-droppable ui-droppable-disabled")
                    },
                    _setOption: function(e, i) {
                        if ("accept" === e) this.accept = t.isFunction(i) ? i : function(t) {
                            return t.is(i)
                        };
                        else if ("scope" === e) {
                            var n = t.ui.ddmanager.droppables[this.options.scope];
                            this._splice(n), this._addToManager(i)
                        }
                        this._super(e, i)
                    },
                    _activate: function(e) {
                        var i = t.ui.ddmanager.current;
                        this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
                    },
                    _deactivate: function(e) {
                        var i = t.ui.ddmanager.current;
                        this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
                    },
                    _over: function(e) {
                        var i = t.ui.ddmanager.current;
                        i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
                    },
                    _out: function(e) {
                        var i = t.ui.ddmanager.current;
                        i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
                    },
                    _drop: function(e, i) {
                        var n = i || t.ui.ddmanager.current,
                            s = !1;
                        return n && (n.currentItem || n.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                            var i = t(this).droppable("instance");
                            return i.options.greedy && !i.options.disabled && i.options.scope === n.options.scope && i.accept.call(i.element[0], n.currentItem || n.element) && t.ui.intersect(n, t.extend(i, {
                                offset: i.element.offset()
                            }), i.options.tolerance, e) ? (s = !0, !1) : void 0
                        }), s ? !1 : this.accept.call(this.element[0], n.currentItem || n.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(n)), this.element) : !1) : !1
                    },
                    ui: function(t) {
                        return {
                            draggable: t.currentItem || t.element,
                            helper: t.helper,
                            position: t.position,
                            offset: t.positionAbs
                        }
                    }
                }), t.ui.intersect = function() {
                    function t(t, e, i) {
                        return t >= e && e + i > t
                    }
                    return function(e, i, n, s) {
                        if (!i.offset) return !1;
                        var r = (e.positionAbs || e.position.absolute).left + e.margins.left,
                            a = (e.positionAbs || e.position.absolute).top + e.margins.top,
                            o = r + e.helperProportions.width,
                            l = a + e.helperProportions.height,
                            h = i.offset.left,
                            u = i.offset.top,
                            c = h + i.proportions().width,
                            d = u + i.proportions().height;
                        switch (n) {
                            case "fit":
                                return r >= h && c >= o && a >= u && d >= l;
                            case "intersect":
                                return r + e.helperProportions.width / 2 > h && c > o - e.helperProportions.width / 2 && a + e.helperProportions.height / 2 > u && d > l - e.helperProportions.height / 2;
                            case "pointer":
                                return t(s.pageY, u, i.proportions().height) && t(s.pageX, h, i.proportions().width);
                            case "touch":
                                return (a >= u && d >= a || l >= u && d >= l || u > a && l > d) && (r >= h && c >= r || o >= h && c >= o || h > r && o > c);
                            default:
                                return !1
                        }
                    }
                }(), t.ui.ddmanager = {
                    current: null,
                    droppables: {
                        "default": []
                    },
                    prepareOffsets: function(e, i) {
                        var n, s, r = t.ui.ddmanager.droppables[e.options.scope] || [],
                            a = i ? i.type : null,
                            o = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
                        t: for (n = 0; r.length > n; n++)
                            if (!(r[n].options.disabled || e && !r[n].accept.call(r[n].element[0], e.currentItem || e.element))) {
                                for (s = 0; o.length > s; s++)
                                    if (o[s] === r[n].element[0]) {
                                        r[n].proportions().height = 0;
                                        continue t
                                    }
                                r[n].visible = "none" !== r[n].element.css("display"), r[n].visible && ("mousedown" === a && r[n]._activate.call(r[n], i), r[n].offset = r[n].element.offset(), r[n].proportions({
                                    width: r[n].element[0].offsetWidth,
                                    height: r[n].element[0].offsetHeight
                                }))
                            }
                    },
                    drop: function(e, i) {
                        var n = !1;
                        return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                            this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance, i) && (n = this._drop.call(this, i) || n), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
                        }), n
                    },
                    dragStart: function(e, i) {
                        e.element.parentsUntil("body").bind("scroll.droppable", function() {
                            e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
                        })
                    },
                    drag: function(e, i) {
                        e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                            if (!this.options.disabled && !this.greedyChild && this.visible) {
                                var n, s, r, a = t.ui.intersect(e, this, this.options.tolerance, i),
                                    o = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;
                                o && (this.options.greedy && (s = this.options.scope, r = this.element.parents(":data(ui-droppable)").filter(function() {
                                    return t(this).droppable("instance").options.scope === s
                                }), r.length && (n = t(r[0]).droppable("instance"), n.greedyChild = "isover" === o)), n && "isover" === o && (n.isover = !1, n.isout = !0, n._out.call(n, i)), this[o] = !0, this["isout" === o ? "isover" : "isout"] = !1, this["isover" === o ? "_over" : "_out"].call(this, i), n && "isout" === o && (n.isout = !1, n.isover = !0, n._over.call(n, i)))
                            }
                        })
                    },
                    dragStop: function(e, i) {
                        e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
                    }
                }, t.ui.droppable, t.widget("ui.resizable", t.ui.mouse, {
                    version: "1.11.2",
                    widgetEventPrefix: "resize",
                    options: {
                        alsoResize: !1,
                        animate: !1,
                        animateDuration: "slow",
                        animateEasing: "swing",
                        aspectRatio: !1,
                        autoHide: !1,
                        containment: !1,
                        ghost: !1,
                        grid: !1,
                        handles: "e,s,se",
                        helper: !1,
                        maxHeight: null,
                        maxWidth: null,
                        minHeight: 10,
                        minWidth: 10,
                        zIndex: 90,
                        resize: null,
                        start: null,
                        stop: null
                    },
                    _num: function(t) {
                        return parseInt(t, 10) || 0
                    },
                    _isNumber: function(t) {
                        return !isNaN(parseInt(t, 10))
                    },
                    _hasScroll: function(e, i) {
                        if ("hidden" === t(e).css("overflow")) return !1;
                        var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                            s = !1;
                        return e[n] > 0 ? !0 : (e[n] = 1, s = e[n] > 0, e[n] = 0, s)
                    },
                    _create: function() {
                        var e, i, n, s, r, a = this,
                            o = this.options;
                        if (this.element.addClass("ui-resizable"), t.extend(this, {
                                _aspectRatio: !!o.aspectRatio,
                                aspectRatio: o.aspectRatio,
                                originalElement: this.element,
                                _proportionallyResizeElements: [],
                                _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
                            }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                                position: this.element.css("position"),
                                width: this.element.outerWidth(),
                                height: this.element.outerHeight(),
                                top: this.element.css("top"),
                                left: this.element.css("left")
                            })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
                                marginLeft: this.originalElement.css("marginLeft"),
                                marginTop: this.originalElement.css("marginTop"),
                                marginRight: this.originalElement.css("marginRight"),
                                marginBottom: this.originalElement.css("marginBottom")
                            }), this.originalElement.css({
                                marginLeft: 0,
                                marginTop: 0,
                                marginRight: 0,
                                marginBottom: 0
                            }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                                position: "static",
                                zoom: 1,
                                display: "block"
                            })), this.originalElement.css({
                                margin: this.originalElement.css("margin")
                            }), this._proportionallyResize()), this.handles = o.handles || (t(".ui-resizable-handle", this.element).length ? {
                                n: ".ui-resizable-n",
                                e: ".ui-resizable-e",
                                s: ".ui-resizable-s",
                                w: ".ui-resizable-w",
                                se: ".ui-resizable-se",
                                sw: ".ui-resizable-sw",
                                ne: ".ui-resizable-ne",
                                nw: ".ui-resizable-nw"
                            } : "e,s,se"), this.handles.constructor === String)
                            for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; e.length > i; i++) n = t.trim(e[i]), r = "ui-resizable-" + n, s = t("<div class='ui-resizable-handle " + r + "'></div>"), s.css({
                                zIndex: o.zIndex
                            }), "se" === n && s.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[n] = ".ui-resizable-" + n, this.element.append(s);
                        this._renderAxis = function(e) {
                            var i, n, s, r;
                            e = e || this.element;
                            for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = this.element.children(this.handles[i]).first().show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (n = t(this.handles[i], this.element), r = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth(), s = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(s, r), this._proportionallyResize()), t(this.handles[i]).length
                        }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                            a.resizing || (this.className && (s = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = s && s[1] ? s[1] : "se")
                        }), o.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                            o.disabled || (t(this).removeClass("ui-resizable-autohide"), a._handles.show())
                        }).mouseleave(function() {
                            o.disabled || a.resizing || (t(this).addClass("ui-resizable-autohide"), a._handles.hide())
                        })), this._mouseInit()
                    },
                    _destroy: function() {
                        this._mouseDestroy();
                        var e, i = function(e) {
                            t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                        };
                        return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                            position: e.css("position"),
                            width: e.outerWidth(),
                            height: e.outerHeight(),
                            top: e.css("top"),
                            left: e.css("left")
                        }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
                    },
                    _mouseCapture: function(e) {
                        var i, n, s = !1;
                        for (i in this.handles) n = t(this.handles[i])[0], (n === e.target || t.contains(n, e.target)) && (s = !0);
                        return !this.options.disabled && s
                    },
                    _mouseStart: function(e) {
                        var i, n, s, r = this.options,
                            a = this.element;
                        return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), n = this._num(this.helper.css("top")), r.containment && (i += t(r.containment).scrollLeft() || 0, n += t(r.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                            left: i,
                            top: n
                        }, this.size = this._helper ? {
                            width: this.helper.width(),
                            height: this.helper.height()
                        } : {
                            width: a.width(),
                            height: a.height()
                        }, this.originalSize = this._helper ? {
                            width: a.outerWidth(),
                            height: a.outerHeight()
                        } : {
                            width: a.width(),
                            height: a.height()
                        }, this.sizeDiff = {
                            width: a.outerWidth() - a.width(),
                            height: a.outerHeight() - a.height()
                        }, this.originalPosition = {
                            left: i,
                            top: n
                        }, this.originalMousePosition = {
                            left: e.pageX,
                            top: e.pageY
                        }, this.aspectRatio = "number" == typeof r.aspectRatio ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1, s = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === s ? this.axis + "-resize" : s), a.addClass("ui-resizable-resizing"), this._propagate("start", e), !0
                    },
                    _mouseDrag: function(e) {
                        var i, n, s = this.originalMousePosition,
                            r = this.axis,
                            a = e.pageX - s.left || 0,
                            o = e.pageY - s.top || 0,
                            l = this._change[r];
                        return this._updatePrevProperties(), l ? (i = l.apply(this, [e, a, o]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), n = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(n) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1) : !1
                    },
                    _mouseStop: function(e) {
                        this.resizing = !1;
                        var i, n, s, r, a, o, l, h = this.options,
                            u = this;
                        return this._helper && (i = this._proportionallyResizeElements, n = i.length && /textarea/i.test(i[0].nodeName), s = n && this._hasScroll(i[0], "left") ? 0 : u.sizeDiff.height, r = n ? 0 : u.sizeDiff.width, a = {
                            width: u.helper.width() - r,
                            height: u.helper.height() - s
                        }, o = parseInt(u.element.css("left"), 10) + (u.position.left - u.originalPosition.left) || null, l = parseInt(u.element.css("top"), 10) + (u.position.top - u.originalPosition.top) || null, h.animate || this.element.css(t.extend(a, {
                            top: l,
                            left: o
                        })), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !h.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
                    },
                    _updatePrevProperties: function() {
                        this.prevPosition = {
                            top: this.position.top,
                            left: this.position.left
                        }, this.prevSize = {
                            width: this.size.width,
                            height: this.size.height
                        }
                    },
                    _applyChanges: function() {
                        var t = {};
                        return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t
                    },
                    _updateVirtualBoundaries: function(t) {
                        var e, i, n, s, r, a = this.options;
                        r = {
                            minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0,
                            maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0,
                            minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0,
                            maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0
                        }, (this._aspectRatio || t) && (e = r.minHeight * this.aspectRatio, n = r.minWidth / this.aspectRatio, i = r.maxHeight * this.aspectRatio, s = r.maxWidth / this.aspectRatio, e > r.minWidth && (r.minWidth = e), n > r.minHeight && (r.minHeight = n), r.maxWidth > i && (r.maxWidth = i), r.maxHeight > s && (r.maxHeight = s)), this._vBoundaries = r
                    },
                    _updateCache: function(t) {
                        this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width)
                    },
                    _updateRatio: function(t) {
                        var e = this.position,
                            i = this.size,
                            n = this.axis;
                        return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === n && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === n && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t
                    },
                    _respectSize: function(t) {
                        var e = this._vBoundaries,
                            i = this.axis,
                            n = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
                            s = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
                            r = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
                            a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
                            o = this.originalPosition.left + this.originalSize.width,
                            l = this.position.top + this.size.height,
                            h = /sw|nw|w/.test(i),
                            u = /nw|ne|n/.test(i);
                        return r && (t.width = e.minWidth), a && (t.height = e.minHeight), n && (t.width = e.maxWidth), s && (t.height = e.maxHeight), r && h && (t.left = o - e.minWidth), n && h && (t.left = o - e.maxWidth), a && u && (t.top = l - e.minHeight), s && u && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
                    },
                    _getPaddingPlusBorderDimensions: function(t) {
                        for (var e = 0, i = [], n = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], s = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++) i[e] = parseInt(n[e], 10) || 0, i[e] += parseInt(s[e], 10) || 0;
                        return {
                            height: i[0] + i[2],
                            width: i[1] + i[3]
                        }
                    },
                    _proportionallyResize: function() {
                        if (this._proportionallyResizeElements.length)
                            for (var t, e = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > e; e++) t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
                                height: i.height() - this.outerDimensions.height || 0,
                                width: i.width() - this.outerDimensions.width || 0
                            })
                    },
                    _renderProxy: function() {
                        var e = this.element,
                            i = this.options;
                        this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                            width: this.element.outerWidth() - 1,
                            height: this.element.outerHeight() - 1,
                            position: "absolute",
                            left: this.elementOffset.left + "px",
                            top: this.elementOffset.top + "px",
                            zIndex: ++i.zIndex
                        }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
                    },
                    _change: {
                        e: function(t, e) {
                            return {
                                width: this.originalSize.width + e
                            }
                        },
                        w: function(t, e) {
                            var i = this.originalSize,
                                n = this.originalPosition;
                            return {
                                left: n.left + e,
                                width: i.width - e
                            }
                        },
                        n: function(t, e, i) {
                            var n = this.originalSize,
                                s = this.originalPosition;
                            return {
                                top: s.top + i,
                                height: n.height - i
                            }
                        },
                        s: function(t, e, i) {
                            return {
                                height: this.originalSize.height + i
                            }
                        },
                        se: function(e, i, n) {
                            return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
                        },
                        sw: function(e, i, n) {
                            return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
                        },
                        ne: function(e, i, n) {
                            return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
                        },
                        nw: function(e, i, n) {
                            return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
                        }
                    },
                    _propagate: function(e, i) {
                        t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
                    },
                    plugins: {},
                    ui: function() {
                        return {
                            originalElement: this.originalElement,
                            element: this.element,
                            helper: this.helper,
                            position: this.position,
                            size: this.size,
                            originalSize: this.originalSize,
                            originalPosition: this.originalPosition
                        }
                    }
                }), t.ui.plugin.add("resizable", "animate", {
                    stop: function(e) {
                        var i = t(this).resizable("instance"),
                            n = i.options,
                            s = i._proportionallyResizeElements,
                            r = s.length && /textarea/i.test(s[0].nodeName),
                            a = r && i._hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
                            o = r ? 0 : i.sizeDiff.width,
                            l = {
                                width: i.size.width - o,
                                height: i.size.height - a
                            },
                            h = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                            u = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
                        i.element.animate(t.extend(l, u && h ? {
                            top: u,
                            left: h
                        } : {}), {
                            duration: n.animateDuration,
                            easing: n.animateEasing,
                            step: function() {
                                var n = {
                                    width: parseInt(i.element.css("width"), 10),
                                    height: parseInt(i.element.css("height"), 10),
                                    top: parseInt(i.element.css("top"), 10),
                                    left: parseInt(i.element.css("left"), 10)
                                };
                                s && s.length && t(s[0]).css({
                                    width: n.width,
                                    height: n.height
                                }), i._updateCache(n), i._propagate("resize", e)
                            }
                        })
                    }
                }), t.ui.plugin.add("resizable", "containment", {
                    start: function() {
                        var e, i, n, s, r, a, o, l = t(this).resizable("instance"),
                            h = l.options,
                            u = l.element,
                            c = h.containment,
                            d = c instanceof t ? c.get(0) : /parent/.test(c) ? u.parent().get(0) : c;
                        d && (l.containerElement = t(d), /document/.test(c) || c === document ? (l.containerOffset = {
                            left: 0,
                            top: 0
                        }, l.containerPosition = {
                            left: 0,
                            top: 0
                        }, l.parentData = {
                            element: t(document),
                            left: 0,
                            top: 0,
                            width: t(document).width(),
                            height: t(document).height() || document.body.parentNode.scrollHeight
                        }) : (e = t(d), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, n) {
                            i[t] = l._num(e.css("padding" + n))
                        }), l.containerOffset = e.offset(), l.containerPosition = e.position(), l.containerSize = {
                            height: e.innerHeight() - i[3],
                            width: e.innerWidth() - i[1]
                        }, n = l.containerOffset, s = l.containerSize.height, r = l.containerSize.width, a = l._hasScroll(d, "left") ? d.scrollWidth : r, o = l._hasScroll(d) ? d.scrollHeight : s, l.parentData = {
                            element: d,
                            left: n.left,
                            top: n.top,
                            width: a,
                            height: o
                        }))
                    },
                    resize: function(e) {
                        var i, n, s, r, a = t(this).resizable("instance"),
                            o = a.options,
                            l = a.containerOffset,
                            h = a.position,
                            u = a._aspectRatio || e.shiftKey,
                            c = {
                                top: 0,
                                left: 0
                            },
                            d = a.containerElement,
                            p = !0;
                        d[0] !== document && /static/.test(d.css("position")) && (c = l), h.left < (a._helper ? l.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - l.left : a.position.left - c.left), u && (a.size.height = a.size.width / a.aspectRatio, p = !1), a.position.left = o.helper ? l.left : 0), h.top < (a._helper ? l.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - l.top : a.position.top), u && (a.size.width = a.size.height * a.aspectRatio, p = !1), a.position.top = a._helper ? l.top : 0), s = a.containerElement.get(0) === a.element.parent().get(0), r = /relative|absolute/.test(a.containerElement.css("position")), s && r ? (a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top) : (a.offset.left = a.element.offset().left, a.offset.top = a.element.offset().top), i = Math.abs(a.sizeDiff.width + (a._helper ? a.offset.left - c.left : a.offset.left - l.left)), n = Math.abs(a.sizeDiff.height + (a._helper ? a.offset.top - c.top : a.offset.top - l.top)), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, u && (a.size.height = a.size.width / a.aspectRatio, p = !1)), n + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - n, u && (a.size.width = a.size.height * a.aspectRatio, p = !1)), p || (a.position.left = a.prevPosition.left, a.position.top = a.prevPosition.top, a.size.width = a.prevSize.width, a.size.height = a.prevSize.height)
                    },
                    stop: function() {
                        var e = t(this).resizable("instance"),
                            i = e.options,
                            n = e.containerOffset,
                            s = e.containerPosition,
                            r = e.containerElement,
                            a = t(e.helper),
                            o = a.offset(),
                            l = a.outerWidth() - e.sizeDiff.width,
                            h = a.outerHeight() - e.sizeDiff.height;
                        e._helper && !i.animate && /relative/.test(r.css("position")) && t(this).css({
                            left: o.left - s.left - n.left,
                            width: l,
                            height: h
                        }), e._helper && !i.animate && /static/.test(r.css("position")) && t(this).css({
                            left: o.left - s.left - n.left,
                            width: l,
                            height: h
                        })
                    }
                }), t.ui.plugin.add("resizable", "alsoResize", {
                    start: function() {
                        var e = t(this).resizable("instance"),
                            i = e.options,
                            n = function(e) {
                                t(e).each(function() {
                                    var e = t(this);
                                    e.data("ui-resizable-alsoresize", {
                                        width: parseInt(e.width(), 10),
                                        height: parseInt(e.height(), 10),
                                        left: parseInt(e.css("left"), 10),
                                        top: parseInt(e.css("top"), 10)
                                    })
                                })
                            };
                        "object" != typeof i.alsoResize || i.alsoResize.parentNode ? n(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], n(i.alsoResize)) : t.each(i.alsoResize, function(t) {
                            n(t)
                        })
                    },
                    resize: function(e, i) {
                        var n = t(this).resizable("instance"),
                            s = n.options,
                            r = n.originalSize,
                            a = n.originalPosition,
                            o = {
                                height: n.size.height - r.height || 0,
                                width: n.size.width - r.width || 0,
                                top: n.position.top - a.top || 0,
                                left: n.position.left - a.left || 0
                            },
                            l = function(e, n) {
                                t(e).each(function() {
                                    var e = t(this),
                                        s = t(this).data("ui-resizable-alsoresize"),
                                        r = {},
                                        a = n && n.length ? n : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                                    t.each(a, function(t, e) {
                                        var i = (s[e] || 0) + (o[e] || 0);
                                        i && i >= 0 && (r[e] = i || null)
                                    }), e.css(r)
                                })
                            };
                        "object" != typeof s.alsoResize || s.alsoResize.nodeType ? l(s.alsoResize) : t.each(s.alsoResize, function(t, e) {
                            l(t, e)
                        })
                    },
                    stop: function() {
                        t(this).removeData("resizable-alsoresize")
                    }
                }), t.ui.plugin.add("resizable", "ghost", {
                    start: function() {
                        var e = t(this).resizable("instance"),
                            i = e.options,
                            n = e.size;
                        e.ghost = e.originalElement.clone(), e.ghost.css({
                            opacity: .25,
                            display: "block",
                            position: "relative",
                            height: n.height,
                            width: n.width,
                            margin: 0,
                            left: 0,
                            top: 0
                        }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
                    },
                    resize: function() {
                        var e = t(this).resizable("instance");
                        e.ghost && e.ghost.css({
                            position: "relative",
                            height: e.size.height,
                            width: e.size.width
                        })
                    },
                    stop: function() {
                        var e = t(this).resizable("instance");
                        e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
                    }
                }), t.ui.plugin.add("resizable", "grid", {
                    resize: function() {
                        var e, i = t(this).resizable("instance"),
                            n = i.options,
                            s = i.size,
                            r = i.originalSize,
                            a = i.originalPosition,
                            o = i.axis,
                            l = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid,
                            h = l[0] || 1,
                            u = l[1] || 1,
                            c = Math.round((s.width - r.width) / h) * h,
                            d = Math.round((s.height - r.height) / u) * u,
                            p = r.width + c,
                            f = r.height + d,
                            g = n.maxWidth && p > n.maxWidth,
                            m = n.maxHeight && f > n.maxHeight,
                            v = n.minWidth && n.minWidth > p,
                            y = n.minHeight && n.minHeight > f;
                        n.grid = l, v && (p += h), y && (f += u), g && (p -= h), m && (f -= u), /^(se|s|e)$/.test(o) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(o) ? (i.size.width = p, i.size.height = f, i.position.top = a.top - d) : /^(sw)$/.test(o) ? (i.size.width = p, i.size.height = f, i.position.left = a.left - c) : ((0 >= f - u || 0 >= p - h) && (e = i._getPaddingPlusBorderDimensions(this)), f - u > 0 ? (i.size.height = f, i.position.top = a.top - d) : (f = u - e.height, i.size.height = f, i.position.top = a.top + r.height - f), p - h > 0 ? (i.size.width = p, i.position.left = a.left - c) : (p = u - e.height, i.size.width = p, i.position.left = a.left + r.width - p))
                    }
                }), t.ui.resizable, t.widget("ui.selectable", t.ui.mouse, {
                    version: "1.11.2",
                    options: {
                        appendTo: "body",
                        autoRefresh: !0,
                        distance: 0,
                        filter: "*",
                        tolerance: "touch",
                        selected: null,
                        selecting: null,
                        start: null,
                        stop: null,
                        unselected: null,
                        unselecting: null
                    },
                    _create: function() {
                        var e, i = this;
                        this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                            e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function() {
                                var e = t(this),
                                    i = e.offset();
                                t.data(this, "selectable-item", {
                                    element: this,
                                    $element: e,
                                    left: i.left,
                                    top: i.top,
                                    right: i.left + e.outerWidth(),
                                    bottom: i.top + e.outerHeight(),
                                    startselected: !1,
                                    selected: e.hasClass("ui-selected"),
                                    selecting: e.hasClass("ui-selecting"),
                                    unselecting: e.hasClass("ui-unselecting")
                                })
                            })
                        }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
                    },
                    _destroy: function() {
                        this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
                    },
                    _mouseStart: function(e) {
                        var i = this,
                            n = this.options;
                        this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(n.filter, this.element[0]), this._trigger("start", e), t(n.appendTo).append(this.helper), this.helper.css({
                            left: e.pageX,
                            top: e.pageY,
                            width: 0,
                            height: 0
                        }), n.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                            var n = t.data(this, "selectable-item");
                            n.startselected = !0, e.metaKey || e.ctrlKey || (n.$element.removeClass("ui-selected"), n.selected = !1, n.$element.addClass("ui-unselecting"), n.unselecting = !0, i._trigger("unselecting", e, {
                                unselecting: n.element
                            }))
                        }), t(e.target).parents().addBack().each(function() {
                            var n, s = t.data(this, "selectable-item");
                            return s ? (n = !e.metaKey && !e.ctrlKey || !s.$element.hasClass("ui-selected"), s.$element.removeClass(n ? "ui-unselecting" : "ui-selected").addClass(n ? "ui-selecting" : "ui-unselecting"), s.unselecting = !n, s.selecting = n, s.selected = n, n ? i._trigger("selecting", e, {
                                selecting: s.element
                            }) : i._trigger("unselecting", e, {
                                unselecting: s.element
                            }), !1) : void 0
                        }))
                    },
                    _mouseDrag: function(e) {
                        if (this.dragged = !0, !this.options.disabled) {
                            var i, n = this,
                                s = this.options,
                                r = this.opos[0],
                                a = this.opos[1],
                                o = e.pageX,
                                l = e.pageY;
                            return r > o && (i = o, o = r, r = i), a > l && (i = l, l = a, a = i), this.helper.css({
                                left: r,
                                top: a,
                                width: o - r,
                                height: l - a
                            }), this.selectees.each(function() {
                                var i = t.data(this, "selectable-item"),
                                    h = !1;
                                i && i.element !== n.element[0] && ("touch" === s.tolerance ? h = !(i.left > o || r > i.right || i.top > l || a > i.bottom) : "fit" === s.tolerance && (h = i.left > r && o > i.right && i.top > a && l > i.bottom), h ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, n._trigger("selecting", e, {
                                    selecting: i.element
                                }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), n._trigger("unselecting", e, {
                                    unselecting: i.element
                                }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, n._trigger("unselecting", e, {
                                    unselecting: i.element
                                })))))
                            }), !1
                        }
                    },
                    _mouseStop: function(e) {
                        var i = this;
                        return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
                            var n = t.data(this, "selectable-item");
                            n.$element.removeClass("ui-unselecting"), n.unselecting = !1, n.startselected = !1, i._trigger("unselected", e, {
                                unselected: n.element
                            })
                        }), t(".ui-selecting", this.element[0]).each(function() {
                            var n = t.data(this, "selectable-item");
                            n.$element.removeClass("ui-selecting").addClass("ui-selected"), n.selecting = !1, n.selected = !0, n.startselected = !0, i._trigger("selected", e, {
                                selected: n.element
                            })
                        }), this._trigger("stop", e), this.helper.remove(), !1
                    }
                }), t.widget("ui.sortable", t.ui.mouse, {
                    version: "1.11.2",
                    widgetEventPrefix: "sort",
                    ready: !1,
                    options: {
                        appendTo: "parent",
                        axis: !1,
                        connectWith: !1,
                        containment: !1,
                        cursor: "auto",
                        cursorAt: !1,
                        dropOnEmpty: !0,
                        forcePlaceholderSize: !1,
                        forceHelperSize: !1,
                        grid: !1,
                        handle: !1,
                        helper: "original",
                        items: "> *",
                        opacity: !1,
                        placeholder: !1,
                        revert: !1,
                        scroll: !0,
                        scrollSensitivity: 20,
                        scrollSpeed: 20,
                        scope: "default",
                        tolerance: "intersect",
                        zIndex: 1e3,
                        activate: null,
                        beforeStop: null,
                        change: null,
                        deactivate: null,
                        out: null,
                        over: null,
                        receive: null,
                        remove: null,
                        sort: null,
                        start: null,
                        stop: null,
                        update: null
                    },
                    _isOverAxis: function(t, e, i) {
                        return t >= e && e + i > t
                    },
                    _isFloating: function(t) {
                        return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
                    },
                    _create: function() {
                        var t = this.options;
                        this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t.axis || this._isFloating(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
                    },
                    _setOption: function(t, e) {
                        this._super(t, e), "handle" === t && this._setHandleClassName()
                    },
                    _setHandleClassName: function() {
                        this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), t.each(this.items, function() {
                            (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
                        })
                    },
                    _destroy: function() {
                        this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();
                        for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
                        return this
                    },
                    _mouseCapture: function(e, i) {
                        var n = null,
                            s = !1,
                            r = this;
                        return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function() {
                            return t.data(this, r.widgetName + "-item") === r ? (n = t(this), !1) : void 0
                        }), t.data(e.target, r.widgetName + "-item") === r && (n = t(e.target)), n && (!this.options.handle || i || (t(this.options.handle, n).find("*").addBack().each(function() {
                            this === e.target && (s = !0)
                        }), s)) ? (this.currentItem = n, this._removeCurrentsFromItems(), !0) : !1)
                    },
                    _mouseStart: function(e, i, n) {
                        var s, r, a = this.options;
                        if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                                top: this.offset.top - this.margins.top,
                                left: this.offset.left - this.margins.left
                            }, t.extend(this.offset, {
                                click: {
                                    left: e.pageX - this.offset.left,
                                    top: e.pageY - this.offset.top
                                },
                                parent: this._getParentOffset(),
                                relative: this._getRelativeOffset()
                            }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
                                prev: this.currentItem.prev()[0],
                                parent: this.currentItem.parent()[0]
                            }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (r = this.document.find("body"), this.storedCursor = r.css("cursor"), r.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(r)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n)
                            for (s = this.containers.length - 1; s >= 0; s--) this.containers[s]._trigger("activate", e, this._uiHash(this));
                        return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
                    },
                    _mouseDrag: function(e) {
                        var i, n, s, r, a = this.options,
                            o = !1;
                        for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = o = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = o = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = o = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = o = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - t(document).scrollTop() < a.scrollSensitivity ? o = t(document).scrollTop(t(document).scrollTop() - a.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < a.scrollSensitivity && (o = t(document).scrollTop(t(document).scrollTop() + a.scrollSpeed)), e.pageX - t(document).scrollLeft() < a.scrollSensitivity ? o = t(document).scrollLeft(t(document).scrollLeft() - a.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < a.scrollSensitivity && (o = t(document).scrollLeft(t(document).scrollLeft() + a.scrollSpeed))), o !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                            if (n = this.items[i], s = n.item[0], r = this._intersectsWithPointer(n), r && n.instance === this.currentContainer && s !== this.currentItem[0] && this.placeholder[1 === r ? "next" : "prev"]()[0] !== s && !t.contains(this.placeholder[0], s) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], s) : !0)) {
                                if (this.direction = 1 === r ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n)) break;
                                this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                                break
                            }
                        return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
                    },
                    _mouseStop: function(e, i) {
                        if (e) {
                            if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                                var n = this,
                                    s = this.placeholder.offset(),
                                    r = this.options.axis,
                                    a = {};
                                r && "x" !== r || (a.left = s.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), r && "y" !== r || (a.top = s.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
                                    n._clear(e)
                                })
                            } else this._clear(e, i);
                            return !1
                        }
                    },
                    cancel: function() {
                        if (this.dragging) {
                            this._mouseUp({
                                target: null
                            }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                            for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
                        }
                        return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                            helper: null,
                            dragging: !1,
                            reverting: !1,
                            _noFinalSort: null
                        }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
                    },
                    serialize: function(e) {
                        var i = this._getItemsAsjQuery(e && e.connected),
                            n = [];
                        return e = e || {}, t(i).each(function() {
                            var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                            i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
                        }), !n.length && e.key && n.push(e.key + "="), n.join("&")
                    },
                    toArray: function(e) {
                        var i = this._getItemsAsjQuery(e && e.connected),
                            n = [];
                        return e = e || {}, i.each(function() {
                            n.push(t(e.item || this).attr(e.attribute || "id") || "")
                        }), n
                    },
                    _intersectsWith: function(t) {
                        var e = this.positionAbs.left,
                            i = e + this.helperProportions.width,
                            n = this.positionAbs.top,
                            s = n + this.helperProportions.height,
                            r = t.left,
                            a = r + t.width,
                            o = t.top,
                            l = o + t.height,
                            h = this.offset.click.top,
                            u = this.offset.click.left,
                            c = "x" === this.options.axis || n + h > o && l > n + h,
                            d = "y" === this.options.axis || e + u > r && a > e + u,
                            p = c && d;
                        return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > r && a > i - this.helperProportions.width / 2 && n + this.helperProportions.height / 2 > o && l > s - this.helperProportions.height / 2
                    },
                    _intersectsWithPointer: function(t) {
                        var e = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                            i = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                            n = e && i,
                            s = this._getDragVerticalDirection(),
                            r = this._getDragHorizontalDirection();
                        return n ? this.floating ? r && "right" === r || "down" === s ? 2 : 1 : s && ("down" === s ? 2 : 1) : !1
                    },
                    _intersectsWithSides: function(t) {
                        var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                            i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                            n = this._getDragVerticalDirection(),
                            s = this._getDragHorizontalDirection();
                        return this.floating && s ? "right" === s && i || "left" === s && !i : n && ("down" === n && e || "up" === n && !e)
                    },
                    _getDragVerticalDirection: function() {
                        var t = this.positionAbs.top - this.lastPositionAbs.top;
                        return 0 !== t && (t > 0 ? "down" : "up")
                    },
                    _getDragHorizontalDirection: function() {
                        var t = this.positionAbs.left - this.lastPositionAbs.left;
                        return 0 !== t && (t > 0 ? "right" : "left")
                    },
                    refresh: function(t) {
                        return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this
                    },
                    _connectWith: function() {
                        var t = this.options;
                        return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
                    },
                    _getItemsAsjQuery: function(e) {
                        function i() {
                            o.push(this)
                        }
                        var n, s, r, a, o = [],
                            l = [],
                            h = this._connectWith();
                        if (h && e)
                            for (n = h.length - 1; n >= 0; n--)
                                for (r = t(h[n]), s = r.length - 1; s >= 0; s--) a = t.data(r[s], this.widgetFullName), a && a !== this && !a.options.disabled && l.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
                        for (l.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                                options: this.options,
                                item: this.currentItem
                            }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), n = l.length - 1; n >= 0; n--) l[n][0].each(i);
                        return t(o)
                    },
                    _removeCurrentsFromItems: function() {
                        var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
                        this.items = t.grep(this.items, function(t) {
                            for (var i = 0; e.length > i; i++)
                                if (e[i] === t.item[0]) return !1;
                            return !0
                        })
                    },
                    _refreshItems: function(e) {
                        this.items = [], this.containers = [this];
                        var i, n, s, r, a, o, l, h, u = this.items,
                            c = [
                                [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                                    item: this.currentItem
                                }) : t(this.options.items, this.element), this]
                            ],
                            d = this._connectWith();
                        if (d && this.ready)
                            for (i = d.length - 1; i >= 0; i--)
                                for (s = t(d[i]), n = s.length - 1; n >= 0; n--) r = t.data(s[n], this.widgetFullName), r && r !== this && !r.options.disabled && (c.push([t.isFunction(r.options.items) ? r.options.items.call(r.element[0], e, {
                                    item: this.currentItem
                                }) : t(r.options.items, r.element), r]), this.containers.push(r));
                        for (i = c.length - 1; i >= 0; i--)
                            for (a = c[i][1], o = c[i][0], n = 0, h = o.length; h > n; n++) l = t(o[n]), l.data(this.widgetName + "-item", a), u.push({
                                item: l,
                                instance: a,
                                width: 0,
                                height: 0,
                                left: 0,
                                top: 0
                            })
                    },
                    refreshPositions: function(e) {
                        this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                        var i, n, s, r;
                        for (i = this.items.length - 1; i >= 0; i--) n = this.items[i], n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (s = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item, e || (n.width = s.outerWidth(), n.height = s.outerHeight()), r = s.offset(), n.left = r.left, n.top = r.top);
                        if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                        else
                            for (i = this.containers.length - 1; i >= 0; i--) r = this.containers[i].element.offset(), this.containers[i].containerCache.left = r.left, this.containers[i].containerCache.top = r.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                        return this
                    },
                    _createPlaceholder: function(e) {
                        e = e || this;
                        var i, n = e.options;
                        n.placeholder && n.placeholder.constructor !== String || (i = n.placeholder, n.placeholder = {
                            element: function() {
                                var n = e.currentItem[0].nodeName.toLowerCase(),
                                    s = t("<" + n + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                                return "tr" === n ? e.currentItem.children().each(function() {
                                    t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(s)
                                }) : "img" === n && s.attr("src", e.currentItem.attr("src")), i || s.css("visibility", "hidden"), s
                            },
                            update: function(t, s) {
                                (!i || n.forcePlaceholderSize) && (s.height() || s.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), s.width() || s.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                            }
                        }), e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), n.placeholder.update(e, e.placeholder)
                    },
                    _contactContainers: function(e) {
                        var i, n, s, r, a, o, l, h, u, c, d = null,
                            p = null;
                        for (i = this.containers.length - 1; i >= 0; i--)
                            if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
                                if (this._intersectsWith(this.containers[i].containerCache)) {
                                    if (d && t.contains(this.containers[i].element[0], d.element[0])) continue;
                                    d = this.containers[i], p = i
                                } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
                        if (d)
                            if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1);
                            else {
                                for (s = 1e4, r = null, u = d.floating || this._isFloating(this.currentItem), a = u ? "left" : "top", o = u ? "width" : "height", c = u ? "clientX" : "clientY", n = this.items.length - 1; n >= 0; n--) t.contains(this.containers[p].element[0], this.items[n].item[0]) && this.items[n].item[0] !== this.currentItem[0] && (l = this.items[n].item.offset()[a], h = !1, e[c] - l > this.items[n][o] / 2 && (h = !0), s > Math.abs(e[c] - l) && (s = Math.abs(e[c] - l), r = this.items[n], this.direction = h ? "up" : "down"));
                                if (!r && !this.options.dropOnEmpty) return;
                                if (this.currentContainer === this.containers[p]) return void(this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1));
                                r ? this._rearrange(e, r, null, !0) : this._rearrange(e, null, this.containers[p].element, !0), this._trigger("change", e, this._uiHash()), this.containers[p]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1
                            }
                    },
                    _createHelper: function(e) {
                        var i = this.options,
                            n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
                        return n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]), n[0] === this.currentItem[0] && (this._storedCSS = {
                            width: this.currentItem[0].style.width,
                            height: this.currentItem[0].style.height,
                            position: this.currentItem.css("position"),
                            top: this.currentItem.css("top"),
                            left: this.currentItem.css("left")
                        }), (!n[0].style.width || i.forceHelperSize) && n.width(this.currentItem.width()), (!n[0].style.height || i.forceHelperSize) && n.height(this.currentItem.height()), n
                    },
                    _adjustOffsetFromHelper: function(e) {
                        "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                            left: +e[0],
                            top: +e[1] || 0
                        }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
                    },
                    _getParentOffset: function() {
                        this.offsetParent = this.helper.offsetParent();
                        var e = this.offsetParent.offset();
                        return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                            top: 0,
                            left: 0
                        }), {
                            top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                            left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                        }
                    },
                    _getRelativeOffset: function() {
                        if ("relative" === this.cssPosition) {
                            var t = this.currentItem.position();
                            return {
                                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                            }
                        }
                        return {
                            top: 0,
                            left: 0
                        }
                    },
                    _cacheMargins: function() {
                        this.margins = {
                            left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                            top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                        }
                    },
                    _cacheHelperProportions: function() {
                        this.helperProportions = {
                            width: this.helper.outerWidth(),
                            height: this.helper.outerHeight()
                        }
                    },
                    _setContainment: function() {
                        var e, i, n, s = this.options;
                        "parent" === s.containment && (s.containment = this.helper[0].parentNode), ("document" === s.containment || "window" === s.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === s.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === s.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(s.containment) || (e = t(s.containment)[0], i = t(s.containment).offset(), n = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
                    },
                    _convertPositionTo: function(e, i) {
                        i || (i = this.position);
                        var n = "absolute" === e ? 1 : -1,
                            s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                            r = /(html|body)/i.test(s[0].tagName);
                        return {
                            top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : r ? 0 : s.scrollTop()) * n,
                            left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : r ? 0 : s.scrollLeft()) * n
                        }
                    },
                    _generatePosition: function(e) {
                        var i, n, s = this.options,
                            r = e.pageX,
                            a = e.pageY,
                            o = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                            l = /(html|body)/i.test(o[0].tagName);
                        return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (r = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (r = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), s.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / s.grid[1]) * s.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - s.grid[1] : i + s.grid[1] : i, n = this.originalPageX + Math.round((r - this.originalPageX) / s.grid[0]) * s.grid[0], r = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n : n - this.offset.click.left >= this.containment[0] ? n - s.grid[0] : n + s.grid[0] : n)), {
                            top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : o.scrollTop()),
                            left: r - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : o.scrollLeft())
                        }
                    },
                    _rearrange: function(t, e, i, n) {
                        i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                        var s = this.counter;
                        this._delay(function() {
                            s === this.counter && this.refreshPositions(!n)
                        })
                    },
                    _clear: function(t, e) {
                        function i(t, e, i) {
                            return function(n) {
                                i._trigger(t, n, e._uiHash(e))
                            }
                        }
                        this.reverting = !1;
                        var n, s = [];
                        if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                            for (n in this._storedCSS)("auto" === this._storedCSS[n] || "static" === this._storedCSS[n]) && (this._storedCSS[n] = "");
                            this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                        } else this.currentItem.show();
                        for (this.fromOutside && !e && s.push(function(t) {
                                this._trigger("receive", t, this._uiHash(this.fromOutside))
                            }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
                                this._trigger("update", t, this._uiHash())
                            }), this !== this.currentContainer && (e || (s.push(function(t) {
                                this._trigger("remove", t, this._uiHash())
                            }), s.push(function(t) {
                                return function(e) {
                                    t._trigger("receive", e, this._uiHash(this))
                                }
                            }.call(this, this.currentContainer)), s.push(function(t) {
                                return function(e) {
                                    t._trigger("update", e, this._uiHash(this))
                                }
                            }.call(this, this.currentContainer)))), n = this.containers.length - 1; n >= 0; n--) e || s.push(i("deactivate", this, this.containers[n])), this.containers[n].containerCache.over && (s.push(i("out", this, this.containers[n])), this.containers[n].containerCache.over = 0);
                        if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
                            for (n = 0; s.length > n; n++) s[n].call(this, t);
                            this._trigger("stop", t, this._uiHash())
                        }
                        return this.fromOutside = !1, !this.cancelHelperRemoval
                    },
                    _trigger: function() {
                        t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
                    },
                    _uiHash: function(e) {
                        var i = e || this;
                        return {
                            helper: i.helper,
                            placeholder: i.placeholder || t([]),
                            position: i.position,
                            originalPosition: i.originalPosition,
                            offset: i.positionAbs,
                            item: i.currentItem,
                            sender: e ? e.element : null
                        }
                    }
                }), t.widget("ui.accordion", {
                    version: "1.11.2",
                    options: {
                        active: 0,
                        animate: {},
                        collapsible: !1,
                        event: "click",
                        header: "> li > :first-child,> :not(li):even",
                        heightStyle: "auto",
                        icons: {
                            activeHeader: "ui-icon-triangle-1-s",
                            header: "ui-icon-triangle-1-e"
                        },
                        activate: null,
                        beforeActivate: null
                    },
                    hideProps: {
                        borderTopWidth: "hide",
                        borderBottomWidth: "hide",
                        paddingTop: "hide",
                        paddingBottom: "hide",
                        height: "hide"
                    },
                    showProps: {
                        borderTopWidth: "show",
                        borderBottomWidth: "show",
                        paddingTop: "show",
                        paddingBottom: "show",
                        height: "show"
                    },
                    _create: function() {
                        var e = this.options;
                        this.prevShow = this.prevHide = t(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), 0 > e.active && (e.active += this.headers.length), this._refresh()
                    },
                    _getCreateEventData: function() {
                        return {
                            header: this.active,
                            panel: this.active.length ? this.active.next() : t()
                        }
                    },
                    _createIcons: function() {
                        var e = this.options.icons;
                        e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader), this.headers.addClass("ui-accordion-icons"))
                    },
                    _destroyIcons: function() {
                        this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
                    },
                    _destroy: function() {
                        var t;
                        this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), t = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && t.css("height", "")
                    },
                    _setOption: function(t, e) {
                        return "active" === t ? void this._activate(e) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), void("disabled" === t && (this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e))))
                    },
                    _keydown: function(e) {
                        if (!e.altKey && !e.ctrlKey) {
                            var i = t.ui.keyCode,
                                n = this.headers.length,
                                s = this.headers.index(e.target),
                                r = !1;
                            switch (e.keyCode) {
                                case i.RIGHT:
                                case i.DOWN:
                                    r = this.headers[(s + 1) % n];
                                    break;
                                case i.LEFT:
                                case i.UP:
                                    r = this.headers[(s - 1 + n) % n];
                                    break;
                                case i.SPACE:
                                case i.ENTER:
                                    this._eventHandler(e);
                                    break;
                                case i.HOME:
                                    r = this.headers[0];
                                    break;
                                case i.END:
                                    r = this.headers[n - 1]
                            }
                            r && (t(e.target).attr("tabIndex", -1), t(r).attr("tabIndex", 0), r.focus(), e.preventDefault())
                        }
                    },
                    _panelKeyDown: function(e) {
                        e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus()
                    },
                    refresh: function() {
                        var e = this.options;
                        this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
                    },
                    _processPanels: function() {
                        var t = this.headers,
                            e = this.panels;
                        this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)))
                    },
                    _refresh: function() {
                        var e, i = this.options,
                            n = i.heightStyle,
                            s = this.element.parent();
                        this.active = this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function() {
                            var e = t(this),
                                i = e.uniqueId().attr("id"),
                                n = e.next(),
                                s = n.uniqueId().attr("id");
                            e.attr("aria-controls", s), n.attr("aria-labelledby", i)
                        }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                            "aria-selected": "false",
                            "aria-expanded": "false",
                            tabIndex: -1
                        }).next().attr({
                            "aria-hidden": "true"
                        }).hide(), this.active.length ? this.active.attr({
                            "aria-selected": "true",
                            "aria-expanded": "true",
                            tabIndex: 0
                        }).next().attr({
                            "aria-hidden": "false"
                        }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(i.event), "fill" === n ? (e = s.height(), this.element.siblings(":visible").each(function() {
                            var i = t(this),
                                n = i.css("position");
                            "absolute" !== n && "fixed" !== n && (e -= i.outerHeight(!0))
                        }), this.headers.each(function() {
                            e -= t(this).outerHeight(!0)
                        }), this.headers.next().each(function() {
                            t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()))
                        }).css("overflow", "auto")) : "auto" === n && (e = 0, this.headers.next().each(function() {
                            e = Math.max(e, t(this).css("height", "").height())
                        }).height(e))
                    },
                    _activate: function(e) {
                        var i = this._findActive(e)[0];
                        i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                            target: i,
                            currentTarget: i,
                            preventDefault: t.noop
                        }))
                    },
                    _findActive: function(e) {
                        return "number" == typeof e ? this.headers.eq(e) : t()
                    },
                    _setupEvents: function(e) {
                        var i = {
                            keydown: "_keydown"
                        };
                        e && t.each(e.split(" "), function(t, e) {
                            i[e] = "_eventHandler"
                        }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
                            keydown: "_panelKeyDown"
                        }), this._hoverable(this.headers), this._focusable(this.headers)
                    },
                    _eventHandler: function(e) {
                        var i = this.options,
                            n = this.active,
                            s = t(e.currentTarget),
                            r = s[0] === n[0],
                            a = r && i.collapsible,
                            o = a ? t() : s.next(),
                            l = n.next(),
                            h = {
                                oldHeader: n,
                                oldPanel: l,
                                newHeader: a ? t() : s,
                                newPanel: o
                            };
                        e.preventDefault(), r && !i.collapsible || this._trigger("beforeActivate", e, h) === !1 || (i.active = a ? !1 : this.headers.index(s), this.active = r ? t() : s, this._toggle(h), n.removeClass("ui-accordion-header-active ui-state-active"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), r || (s.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), s.next().addClass("ui-accordion-content-active")))
                    },
                    _toggle: function(e) {
                        var i = e.newPanel,
                            n = this.prevShow.length ? this.prevShow : e.oldPanel;
                        this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = n, this.options.animate ? this._animate(i, n, e) : (n.hide(), i.show(), this._toggleComplete(e)), n.attr({
                            "aria-hidden": "true"
                        }), n.prev().attr("aria-selected", "false"), i.length && n.length ? n.prev().attr({
                            tabIndex: -1,
                            "aria-expanded": "false"
                        }) : i.length && this.headers.filter(function() {
                            return 0 === t(this).attr("tabIndex")
                        }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({
                            "aria-selected": "true",
                            tabIndex: 0,
                            "aria-expanded": "true"
                        })
                    },
                    _animate: function(t, e, i) {
                        var n, s, r, a = this,
                            o = 0,
                            l = t.length && (!e.length || t.index() < e.index()),
                            h = this.options.animate || {},
                            u = l && h.down || h,
                            c = function() {
                                a._toggleComplete(i)
                            };
                        return "number" == typeof u && (r = u), "string" == typeof u && (s = u), s = s || u.easing || h.easing, r = r || u.duration || h.duration, e.length ? t.length ? (n = t.show().outerHeight(), e.animate(this.hideProps, {
                            duration: r,
                            easing: s,
                            step: function(t, e) {
                                e.now = Math.round(t)
                            }
                        }), void t.hide().animate(this.showProps, {
                            duration: r,
                            easing: s,
                            complete: c,
                            step: function(t, i) {
                                i.now = Math.round(t), "height" !== i.prop ? o += i.now : "content" !== a.options.heightStyle && (i.now = Math.round(n - e.outerHeight() - o), o = 0)
                            }
                        })) : e.animate(this.hideProps, r, s, c) : t.animate(this.showProps, r, s, c)
                    },
                    _toggleComplete: function(t) {
                        var e = t.oldPanel;
                        e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t)
                    }
                }), t.widget("ui.menu", {
                    version: "1.11.2",
                    defaultElement: "<ul>",
                    delay: 300,
                    options: {
                        icons: {
                            submenu: "ui-icon-carat-1-e"
                        },
                        items: "> *",
                        menus: "ul",
                        position: {
                            my: "left-1 top",
                            at: "right top"
                        },
                        role: "menu",
                        blur: null,
                        focus: null,
                        select: null
                    },
                    _create: function() {
                        this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                            role: this.options.role,
                            tabIndex: 0
                        }), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                            "mousedown .ui-menu-item": function(t) {
                                t.preventDefault()
                            },
                            "click .ui-menu-item": function(e) {
                                var i = t(e.target);
                                !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && t(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                            },
                            "mouseenter .ui-menu-item": function(e) {
                                if (!this.previousFilter) {
                                    var i = t(e.currentTarget);
                                    i.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i)
                                }
                            },
                            mouseleave: "collapseAll",
                            "mouseleave .ui-menu": "collapseAll",
                            focus: function(t, e) {
                                var i = this.active || this.element.find(this.options.items).eq(0);
                                e || this.focus(t, i)
                            },
                            blur: function(e) {
                                this._delay(function() {
                                    t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
                                })
                            },
                            keydown: "_keydown"
                        }), this.refresh(), this._on(this.document, {
                            click: function(t) {
                                this._closeOnDocumentClick(t) && this.collapseAll(t), this.mouseHandled = !1
                            }
                        })
                    },
                    _destroy: function() {
                        this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                            var e = t(this);
                            e.data("ui-menu-submenu-carat") && e.remove()
                        }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
                    },
                    _keydown: function(e) {
                        var i, n, s, r, a = !0;
                        switch (e.keyCode) {
                            case t.ui.keyCode.PAGE_UP:
                                this.previousPage(e);
                                break;
                            case t.ui.keyCode.PAGE_DOWN:
                                this.nextPage(e);
                                break;
                            case t.ui.keyCode.HOME:
                                this._move("first", "first", e);
                                break;
                            case t.ui.keyCode.END:
                                this._move("last", "last", e);
                                break;
                            case t.ui.keyCode.UP:
                                this.previous(e);
                                break;
                            case t.ui.keyCode.DOWN:
                                this.next(e);
                                break;
                            case t.ui.keyCode.LEFT:
                                this.collapse(e);
                                break;
                            case t.ui.keyCode.RIGHT:
                                this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                                break;
                            case t.ui.keyCode.ENTER:
                            case t.ui.keyCode.SPACE:
                                this._activate(e);
                                break;
                            case t.ui.keyCode.ESCAPE:
                                this.collapse(e);
                                break;
                            default:
                                a = !1, n = this.previousFilter || "", s = String.fromCharCode(e.keyCode), r = !1, clearTimeout(this.filterTimer), s === n ? r = !0 : s = n + s, i = this._filterMenuItems(s), i = r && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (s = String.fromCharCode(e.keyCode), i = this._filterMenuItems(s)), i.length ? (this.focus(e, i), this.previousFilter = s, this.filterTimer = this._delay(function() {
                                    delete this.previousFilter
                                }, 1e3)) : delete this.previousFilter
                        }
                        a && e.preventDefault()
                    },
                    _activate: function(t) {
                        this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(t) : this.select(t))
                    },
                    refresh: function() {
                        var e, i, n = this,
                            s = this.options.icons.submenu,
                            r = this.element.find(this.options.menus);
                        this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                            role: this.options.role,
                            "aria-hidden": "true",
                            "aria-expanded": "false"
                        }).each(function() {
                            var e = t(this),
                                i = e.parent(),
                                n = t("<span>").addClass("ui-menu-icon ui-icon " + s).data("ui-menu-submenu-carat", !0);
                            i.attr("aria-haspopup", "true").prepend(n), e.attr("aria-labelledby", i.attr("id"))
                        }), e = r.add(this.element), i = e.find(this.options.items), i.not(".ui-menu-item").each(function() {
                            var e = t(this);
                            n._isDivider(e) && e.addClass("ui-widget-content ui-menu-divider")
                        }), i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                            tabIndex: -1,
                            role: this._itemRole()
                        }), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
                    },
                    _itemRole: function() {
                        return {
                            menu: "menuitem",
                            listbox: "option"
                        }[this.options.role]
                    },
                    _setOption: function(t, e) {
                        "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e), this._super(t, e)
                    },
                    focus: function(t, e) {
                        var i, n;
                        this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), n = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", n.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                            this._close()
                        }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {
                            item: e
                        })
                    },
                    _scrollIntoView: function(e) {
                        var i, n, s, r, a, o;
                        this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, n = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, s = e.offset().top - this.activeMenu.offset().top - i - n, r = this.activeMenu.scrollTop(), a = this.activeMenu.height(), o = e.outerHeight(), 0 > s ? this.activeMenu.scrollTop(r + s) : s + o > a && this.activeMenu.scrollTop(r + s - a + o))
                    },
                    blur: function(t, e) {
                        e || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {
                            item: this.active
                        }))
                    },
                    _startOpening: function(t) {
                        clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                            this._close(), this._open(t)
                        }, this.delay))
                    },
                    _open: function(e) {
                        var i = t.extend({ of: this.active
                        }, this.options.position);
                        clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
                    },
                    collapseAll: function(e, i) {
                        clearTimeout(this.timer), this.timer = this._delay(function() {
                            var n = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                            n.length || (n = this.element), this._close(n), this.blur(e), this.activeMenu = n
                        }, this.delay)
                    },
                    _close: function(t) {
                        t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
                    },
                    _closeOnDocumentClick: function(e) {
                        return !t(e.target).closest(".ui-menu").length
                    },
                    _isDivider: function(t) {
                        return !/[^\-\u2014\u2013\s]/.test(t.text())
                    },
                    collapse: function(t) {
                        var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                        e && e.length && (this._close(), this.focus(t, e))
                    },
                    expand: function(t) {
                        var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                        e && e.length && (this._open(e.parent()), this._delay(function() {
                            this.focus(t, e)
                        }))
                    },
                    next: function(t) {
                        this._move("next", "first", t)
                    },
                    previous: function(t) {
                        this._move("prev", "last", t)
                    },
                    isFirstItem: function() {
                        return this.active && !this.active.prevAll(".ui-menu-item").length
                    },
                    isLastItem: function() {
                        return this.active && !this.active.nextAll(".ui-menu-item").length
                    },
                    _move: function(t, e, i) {
                        var n;
                        this.active && (n = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), n && n.length && this.active || (n = this.activeMenu.find(this.options.items)[e]()), this.focus(i, n)
                    },
                    nextPage: function(e) {
                        var i, n, s;
                        return this.active ? void(this.isLastItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                            return i = t(this), 0 > i.offset().top - n - s
                        }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(e)
                    },
                    previousPage: function(e) {
                        var i, n, s;
                        return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (n = this.active.offset().top, s = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                            return i = t(this), i.offset().top - n + s > 0
                        }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items).first()))) : void this.next(e)
                    },
                    _hasScroll: function() {
                        return this.element.outerHeight() < this.element.prop("scrollHeight")
                    },
                    select: function(e) {
                        this.active = this.active || t(e.target).closest(".ui-menu-item");
                        var i = {
                            item: this.active
                        };
                        this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
                    },
                    _filterMenuItems: function(e) {
                        var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                            n = RegExp("^" + i, "i");
                        return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                            return n.test(t.trim(t(this).text()))
                        })
                    }
                }), t.widget("ui.autocomplete", {
                    version: "1.11.2",
                    defaultElement: "<input>",
                    options: {
                        appendTo: null,
                        autoFocus: !1,
                        delay: 300,
                        minLength: 1,
                        position: {
                            my: "left top",
                            at: "left bottom",
                            collision: "none"
                        },
                        source: null,
                        change: null,
                        close: null,
                        focus: null,
                        open: null,
                        response: null,
                        search: null,
                        select: null
                    },
                    requestIndex: 0,
                    pending: 0,
                    _create: function() {
                        var e, i, n, s = this.element[0].nodeName.toLowerCase(),
                            r = "textarea" === s,
                            a = "input" === s;
                        this.isMultiLine = r ? !0 : a ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[r || a ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                            keydown: function(s) {
                                if (this.element.prop("readOnly")) return e = !0, n = !0, void(i = !0);
                                e = !1, n = !1, i = !1;
                                var r = t.ui.keyCode;
                                switch (s.keyCode) {
                                    case r.PAGE_UP:
                                        e = !0, this._move("previousPage", s);
                                        break;
                                    case r.PAGE_DOWN:
                                        e = !0, this._move("nextPage", s);
                                        break;
                                    case r.UP:
                                        e = !0, this._keyEvent("previous", s);
                                        break;
                                    case r.DOWN:
                                        e = !0, this._keyEvent("next", s);
                                        break;
                                    case r.ENTER:
                                        this.menu.active && (e = !0, s.preventDefault(), this.menu.select(s));
                                        break;
                                    case r.TAB:
                                        this.menu.active && this.menu.select(s);
                                        break;
                                    case r.ESCAPE:
                                        this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(s), s.preventDefault());
                                        break;
                                    default:
                                        i = !0, this._searchTimeout(s)
                                }
                            },
                            keypress: function(n) {
                                if (e) return e = !1, void((!this.isMultiLine || this.menu.element.is(":visible")) && n.preventDefault());
                                if (!i) {
                                    var s = t.ui.keyCode;
                                    switch (n.keyCode) {
                                        case s.PAGE_UP:
                                            this._move("previousPage", n);
                                            break;
                                        case s.PAGE_DOWN:
                                            this._move("nextPage", n);
                                            break;
                                        case s.UP:
                                            this._keyEvent("previous", n);
                                            break;
                                        case s.DOWN:
                                            this._keyEvent("next", n)
                                    }
                                }
                            },
                            input: function(t) {
                                return n ? (n = !1, void t.preventDefault()) : void this._searchTimeout(t)
                            },
                            focus: function() {
                                this.selectedItem = null, this.previous = this._value()
                            },
                            blur: function(t) {
                                return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(t), void this._change(t))
                            }
                        }), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                            role: null
                        }).hide().menu("instance"), this._on(this.menu.element, {
                            mousedown: function(e) {
                                e.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                                    delete this.cancelBlur
                                });
                                var i = this.menu.element[0];
                                t(e.target).closest(".ui-menu-item").length || this._delay(function() {
                                    var e = this;
                                    this.document.one("mousedown", function(n) {
                                        n.target === e.element[0] || n.target === i || t.contains(i, n.target) || e.close()
                                    })
                                })
                            },
                            menufocus: function(e, i) {
                                var n, s;
                                return this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function() {
                                    t(e.target).trigger(e.originalEvent)
                                })) : (s = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", e, {
                                    item: s
                                }) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value), n = i.item.attr("aria-label") || s.value, void(n && t.trim(n).length && (this.liveRegion.children().hide(), t("<div>").text(n).appendTo(this.liveRegion))))
                            },
                            menuselect: function(t, e) {
                                var i = e.item.data("ui-autocomplete-item"),
                                    n = this.previous;
                                this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = n, this._delay(function() {
                                    this.previous = n, this.selectedItem = i
                                })), !1 !== this._trigger("select", t, {
                                    item: i
                                }) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i
                            }
                        }), this.liveRegion = t("<span>", {
                            role: "status",
                            "aria-live": "assertive",
                            "aria-relevant": "additions"
                        }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
                            beforeunload: function() {
                                this.element.removeAttr("autocomplete")
                            }
                        })
                    },
                    _destroy: function() {
                        clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
                    },
                    _setOption: function(t, e) {
                        this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
                    },
                    _appendTo: function() {
                        var e = this.options.appendTo;
                        return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
                    },
                    _initSource: function() {
                        var e, i, n = this;
                        t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, n) {
                            n(t.ui.autocomplete.filter(e, i.term))
                        }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, s) {
                            n.xhr && n.xhr.abort(), n.xhr = t.ajax({
                                url: i,
                                data: e,
                                dataType: "json",
                                success: function(t) {
                                    s(t)
                                },
                                error: function() {
                                    s([])
                                }
                            })
                        }) : this.source = this.options.source
                    },
                    _searchTimeout: function(t) {
                        clearTimeout(this.searching), this.searching = this._delay(function() {
                            var e = this.term === this._value(),
                                i = this.menu.element.is(":visible"),
                                n = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
                            (!e || e && !i && !n) && (this.selectedItem = null, this.search(null, t))
                        }, this.options.delay)
                    },
                    search: function(t, e) {
                        return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0
                    },
                    _search: function(t) {
                        this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                            term: t
                        }, this._response())
                    },
                    _response: function() {
                        var e = ++this.requestIndex;
                        return t.proxy(function(t) {
                            e === this.requestIndex && this.__response(t), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
                        }, this)
                    },
                    __response: function(t) {
                        t && (t = this._normalize(t)), this._trigger("response", null, {
                            content: t
                        }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
                    },
                    close: function(t) {
                        this.cancelSearch = !0, this._close(t)
                    },
                    _close: function(t) {
                        this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
                    },
                    _change: function(t) {
                        this.previous !== this._value() && this._trigger("change", t, {
                            item: this.selectedItem
                        })
                    },
                    _normalize: function(e) {
                        return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
                            return "string" == typeof e ? {
                                label: e,
                                value: e
                            } : t.extend({}, e, {
                                label: e.label || e.value,
                                value: e.value || e.label
                            })
                        })
                    },
                    _suggest: function(e) {
                        var i = this.menu.element.empty();
                        this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({ of: this.element
                        }, this.options.position)), this.options.autoFocus && this.menu.next()
                    },
                    _resizeMenu: function() {
                        var t = this.menu.element;
                        t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
                    },
                    _renderMenu: function(e, i) {
                        var n = this;
                        t.each(i, function(t, i) {
                            n._renderItemData(e, i)
                        })
                    },
                    _renderItemData: function(t, e) {
                        return this._renderItem(t, e).data("ui-autocomplete-item", e)
                    },
                    _renderItem: function(e, i) {
                        return t("<li>").text(i.label).appendTo(e)
                    },
                    _move: function(t, e) {
                        return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[t](e) : void this.search(null, e)
                    },
                    widget: function() {
                        return this.menu.element
                    },
                    _value: function() {
                        return this.valueMethod.apply(this.element, arguments)
                    },
                    _keyEvent: function(t, e) {
                        (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
                    }
                }), t.extend(t.ui.autocomplete, {
                    escapeRegex: function(t) {
                        return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
                    },
                    filter: function(e, i) {
                        var n = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
                        return t.grep(e, function(t) {
                            return n.test(t.label || t.value || t)
                        })
                    }
                }), t.widget("ui.autocomplete", t.ui.autocomplete, {
                    options: {
                        messages: {
                            noResults: "No search results.",
                            results: function(t) {
                                return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                            }
                        }
                    },
                    __response: function(e) {
                        var i;
                        this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion))
                    }
                }), t.ui.autocomplete;
            var d, p = "ui-button ui-widget ui-state-default ui-corner-all",
                f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
                g = function() {
                    var e = t(this);
                    setTimeout(function() {
                        e.find(":ui-button").button("refresh")
                    }, 1)
                },
                m = function(e) {
                    var i = e.name,
                        n = e.form,
                        s = t([]);
                    return i && (i = i.replace(/'/g, "\\'"), s = n ? t(n).find("[name='" + i + "'][type=radio]") : t("[name='" + i + "'][type=radio]", e.ownerDocument).filter(function() {
                        return !this.form
                    })), s
                };
            t.widget("ui.button", {
                version: "1.11.2",
                defaultElement: "<button>",
                options: {
                    disabled: null,
                    text: !0,
                    label: null,
                    icons: {
                        primary: null,
                        secondary: null
                    }
                },
                _create: function() {
                    this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, g), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
                    var e = this,
                        i = this.options,
                        n = "checkbox" === this.type || "radio" === this.type,
                        s = n ? "" : "ui-state-active";
                    null === i.label && (i.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(p).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                        i.disabled || this === d && t(this).addClass("ui-state-active")
                    }).bind("mouseleave" + this.eventNamespace, function() {
                        i.disabled || t(this).removeClass(s)
                    }).bind("click" + this.eventNamespace, function(t) {
                        i.disabled && (t.preventDefault(), t.stopImmediatePropagation())
                    }), this._on({
                        focus: function() {
                            this.buttonElement.addClass("ui-state-focus")
                        },
                        blur: function() {
                            this.buttonElement.removeClass("ui-state-focus")
                        }
                    }), n && this.element.bind("change" + this.eventNamespace, function() {
                        e.refresh()
                    }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                        return i.disabled ? !1 : void 0
                    }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                        if (i.disabled) return !1;
                        t(this).addClass("ui-state-active"), e.buttonElement.attr("aria-pressed", "true");
                        var n = e.element[0];
                        m(n).not(n).map(function() {
                            return t(this).button("widget")[0]
                        }).removeClass("ui-state-active").attr("aria-pressed", "false")
                    }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                        return i.disabled ? !1 : (t(this).addClass("ui-state-active"), d = this, void e.document.one("mouseup", function() {
                            d = null
                        }))
                    }).bind("mouseup" + this.eventNamespace, function() {
                        return i.disabled ? !1 : void t(this).removeClass("ui-state-active")
                    }).bind("keydown" + this.eventNamespace, function(e) {
                        return i.disabled ? !1 : void((e.keyCode === t.ui.keyCode.SPACE || e.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"))
                    }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                        t(this).removeClass("ui-state-active")
                    }), this.buttonElement.is("a") && this.buttonElement.keyup(function(e) {
                        e.keyCode === t.ui.keyCode.SPACE && t(this).click()
                    })), this._setOption("disabled", i.disabled), this._resetButton()
                },
                _determineButtonType: function() {
                    var t, e, i;
                    this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (t = this.element.parents().last(), e = "label[for='" + this.element.attr("id") + "']", this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
                },
                widget: function() {
                    return this.buttonElement
                },
                _destroy: function() {
                    this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(p + " ui-state-active " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
                },
                _setOption: function(t, e) {
                    return this._super(t, e), "disabled" === t ? (this.widget().toggleClass("ui-state-disabled", !!e), this.element.prop("disabled", !!e), void(e && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")))) : void this._resetButton()
                },
                refresh: function() {
                    var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
                    e !== this.options.disabled && this._setOption("disabled", e), "radio" === this.type ? m(this.element[0]).each(function() {
                        t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                    }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
                },
                _resetButton: function() {
                    if ("input" === this.type) return void(this.options.label && this.element.val(this.options.label));
                    var e = this.buttonElement.removeClass(f),
                        i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),
                        n = this.options.icons,
                        s = n.primary && n.secondary,
                        r = [];
                    n.primary || n.secondary ? (this.options.text && r.push("ui-button-text-icon" + (s ? "s" : n.primary ? "-primary" : "-secondary")), n.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + n.primary + "'></span>"), n.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + n.secondary + "'></span>"), this.options.text || (r.push(s ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", t.trim(i)))) : r.push("ui-button-text-only"), e.addClass(r.join(" "))
                }
            }), t.widget("ui.buttonset", {
                version: "1.11.2",
                options: {
                    items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
                },
                _create: function() {
                    this.element.addClass("ui-buttonset")
                },
                _init: function() {
                    this.refresh()
                },
                _setOption: function(t, e) {
                    "disabled" === t && this.buttons.button("option", t, e), this._super(t, e)
                },
                refresh: function() {
                    var e = "rtl" === this.element.css("direction"),
                        i = this.element.find(this.options.items),
                        n = i.filter(":ui-button");
                    i.not(":ui-button").button(), n.button("refresh"), this.buttons = i.map(function() {
                        return t(this).button("widget")[0]
                    }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left" : "ui-corner-right").end().end()
                },
                _destroy: function() {
                    this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                        return t(this).button("widget")[0]
                    }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
                }
            }), t.ui.button, t.extend(t.ui, {
                datepicker: {
                    version: "1.11.2"
                }
            });
            var v;
            t.extend(s.prototype, {
                markerClassName: "hasDatepicker",
                maxRows: 4,
                _widgetDatepicker: function() {
                    return this.dpDiv
                },
                setDefaults: function(t) {
                    return o(this._defaults, t || {}), this
                },
                _attachDatepicker: function(e, i) {
                    var n, s, r;
                    n = e.nodeName.toLowerCase(), s = "div" === n || "span" === n, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), r = this._newInst(t(e), s), r.settings = t.extend({}, i || {}), "input" === n ? this._connectDatepicker(e, r) : s && this._inlineDatepicker(e, r)
                },
                _newInst: function(e, i) {
                    var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                    return {
                        id: n,
                        input: e,
                        selectedDay: 0,
                        selectedMonth: 0,
                        selectedYear: 0,
                        drawMonth: 0,
                        drawYear: 0,
                        inline: i,
                        dpDiv: i ? r(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
                    }
                },
                _connectDatepicker: function(e, i) {
                    var n = t(e);
                    i.append = t([]), i.trigger = t([]), n.hasClass(this.markerClassName) || (this._attachments(n, i), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, "datepicker", i), i.settings.disabled && this._disableDatepicker(e))
                },
                _attachments: function(e, i) {
                    var n, s, r, a = this._get(i, "appendText"),
                        o = this._get(i, "isRTL");
                    i.append && i.append.remove(), a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[o ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), n = this._get(i, "showOn"), ("focus" === n || "both" === n) && e.focus(this._showDatepicker), ("button" === n || "both" === n) && (s = this._get(i, "buttonText"), r = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                        src: r,
                        alt: s,
                        title: s
                    }) : t("<button type='button'></button>").addClass(this._triggerClass).html(r ? t("<img/>").attr({
                        src: r,
                        alt: s,
                        title: s
                    }) : s)), e[o ? "before" : "after"](i.trigger), i.trigger.click(function() {
                        return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
                    }))
                },
                _autoSize: function(t) {
                    if (this._get(t, "autoSize") && !t.inline) {
                        var e, i, n, s, r = new Date(2009, 11, 20),
                            a = this._get(t, "dateFormat");
                        a.match(/[DM]/) && (e = function(t) {
                            for (i = 0, n = 0, s = 0; t.length > s; s++) t[s].length > i && (i = t[s].length, n = s);
                            return n
                        }, r.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), r.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - r.getDay())), t.input.attr("size", this._formatDate(t, r).length)
                    }
                },
                _inlineDatepicker: function(e, i) {
                    var n = t(e);
                    n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(i.dpDiv), t.data(e, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
                },
                _dialogDatepicker: function(e, i, n, s, r) {
                    var a, l, h, u, c, d = this._dialogInst;
                    return d || (this.uuid += 1, a = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + a + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), d = this._dialogInst = this._newInst(this._dialogInput, !1), d.settings = {}, t.data(this._dialogInput[0], "datepicker", d)), o(d.settings, s || {}), i = i && i.constructor === Date ? this._formatDate(d, i) : i, this._dialogInput.val(i), this._pos = r ? r.length ? r : [r.pageX, r.pageY] : null, this._pos || (l = document.documentElement.clientWidth, h = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, c = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + u, h / 2 - 150 + c]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), d.settings.onSelect = n, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], "datepicker", d), this
                },
                _destroyDatepicker: function(e) {
                    var i, n = t(e),
                        s = t.data(e, "datepicker");
                    n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, "datepicker"), "input" === i ? (s.append.remove(), s.trigger.remove(), n.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && n.removeClass(this.markerClassName).empty())
                },
                _enableDatepicker: function(e) {
                    var i, n, s = t(e),
                        r = t.data(e, "datepicker");
                    s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, r.trigger.filter("button").each(function() {
                        this.disabled = !1
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                        return t === e ? null : t
                    }))
                },
                _disableDatepicker: function(e) {
                    var i, n, s = t(e),
                        r = t.data(e, "datepicker");
                    s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, r.trigger.filter("button").each(function() {
                        this.disabled = !0
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    })) : ("div" === i || "span" === i) && (n = s.children("." + this._inlineClass), n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                        return t === e ? null : t
                    }), this._disabledInputs[this._disabledInputs.length] = e)
                },
                _isDisabledDatepicker: function(t) {
                    if (!t) return !1;
                    for (var e = 0; this._disabledInputs.length > e; e++)
                        if (this._disabledInputs[e] === t) return !0;
                    return !1
                },
                _getInst: function(e) {
                    try {
                        return t.data(e, "datepicker")
                    } catch (i) {
                        throw "Missing instance data for this datepicker"
                    }
                },
                _optionDatepicker: function(e, i, n) {
                    var s, r, a, l, h = this._getInst(e);
                    return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? t.extend({}, t.datepicker._defaults) : h ? "all" === i ? t.extend({}, h.settings) : this._get(h, i) : null : (s = i || {}, "string" == typeof i && (s = {}, s[i] = n), void(h && (this._curInst === h && this._hideDatepicker(), r = this._getDateDatepicker(e, !0), a = this._getMinMaxDate(h, "min"), l = this._getMinMaxDate(h, "max"), o(h.settings, s), null !== a && void 0 !== s.dateFormat && void 0 === s.minDate && (h.settings.minDate = this._formatDate(h, a)), null !== l && void 0 !== s.dateFormat && void 0 === s.maxDate && (h.settings.maxDate = this._formatDate(h, l)), "disabled" in s && (s.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(t(e), h), this._autoSize(h), this._setDate(h, r), this._updateAlternate(h), this._updateDatepicker(h))))
                },
                _changeDatepicker: function(t, e, i) {
                    this._optionDatepicker(t, e, i)
                },
                _refreshDatepicker: function(t) {
                    var e = this._getInst(t);
                    e && this._updateDatepicker(e)
                },
                _setDateDatepicker: function(t, e) {
                    var i = this._getInst(t);
                    i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
                },
                _getDateDatepicker: function(t, e) {
                    var i = this._getInst(t);
                    return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
                },
                _doKeyDown: function(e) {
                    var i, n, s, r = t.datepicker._getInst(e.target),
                        a = !0,
                        o = r.dpDiv.is(".ui-datepicker-rtl");
                    if (r._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
                        case 9:
                            t.datepicker._hideDatepicker(), a = !1;
                            break;
                        case 13:
                            return s = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", r.dpDiv), s[0] && t.datepicker._selectDay(e.target, r.selectedMonth, r.selectedYear, s[0]), i = t.datepicker._get(r, "onSelect"), i ? (n = t.datepicker._formatDate(r), i.apply(r.input ? r.input[0] : null, [n, r])) : t.datepicker._hideDatepicker(), !1;
                        case 27:
                            t.datepicker._hideDatepicker();
                            break;
                        case 33:
                            t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(r, "stepBigMonths") : -t.datepicker._get(r, "stepMonths"), "M");
                            break;
                        case 34:
                            t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(r, "stepBigMonths") : +t.datepicker._get(r, "stepMonths"), "M");
                            break;
                        case 35:
                            (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), a = e.ctrlKey || e.metaKey;
                            break;
                        case 36:
                            (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), a = e.ctrlKey || e.metaKey;
                            break;
                        case 37:
                            (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, o ? 1 : -1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(r, "stepBigMonths") : -t.datepicker._get(r, "stepMonths"), "M");
                            break;
                        case 38:
                            (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), a = e.ctrlKey || e.metaKey;
                            break;
                        case 39:
                            (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, o ? -1 : 1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(r, "stepBigMonths") : +t.datepicker._get(r, "stepMonths"), "M");
                            break;
                        case 40:
                            (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), a = e.ctrlKey || e.metaKey;
                            break;
                        default:
                            a = !1
                    } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;
                    a && (e.preventDefault(), e.stopPropagation())
                },
                _doKeyPress: function(e) {
                    var i, n, s = t.datepicker._getInst(e.target);
                    return t.datepicker._get(s, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(s, "dateFormat")), n = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || " " > n || !i || i.indexOf(n) > -1) : void 0
                },
                _doKeyUp: function(e) {
                    var i, n = t.datepicker._getInst(e.target);
                    if (n.input.val() !== n.lastVal) try {
                        i = t.datepicker.parseDate(t.datepicker._get(n, "dateFormat"), n.input ? n.input.val() : null, t.datepicker._getFormatConfig(n)), i && (t.datepicker._setDateFromField(n), t.datepicker._updateAlternate(n), t.datepicker._updateDatepicker(n))
                    } catch (s) {}
                    return !0
                },
                _showDatepicker: function(e) {
                    if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                        var i, s, r, a, l, h, u;
                        i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), s = t.datepicker._get(i, "beforeShow"), r = s ? s.apply(e, [e, i]) : {}, r !== !1 && (o(i.settings, r), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), a = !1, t(e).parents().each(function() {
                            return a |= "fixed" === t(this).css("position"), !a
                        }), l = {
                            left: t.datepicker._pos[0],
                            top: t.datepicker._pos[1]
                        }, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                            position: "absolute",
                            display: "block",
                            top: "-1000px"
                        }), t.datepicker._updateDatepicker(i), l = t.datepicker._checkOffset(i, l, a), i.dpDiv.css({
                            position: t.datepicker._inDialog && t.blockUI ? "static" : a ? "fixed" : "absolute",
                            display: "none",
                            left: l.left + "px",
                            top: l.top + "px"
                        }), i.inline || (h = t.datepicker._get(i, "showAnim"), u = t.datepicker._get(i, "duration"), i.dpDiv.css("z-index", n(t(e)) + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.datepicker._get(i, "showOptions"), u) : i.dpDiv[h || "show"](h ? u : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
                    }
                },
                _updateDatepicker: function(e) {
                    this.maxRows = 4, v = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
                    var i, n = this._getNumberOfMonths(e),
                        s = n[1],
                        r = 17,
                        o = e.dpDiv.find("." + this._dayOverClass + " a");
                    o.length > 0 && a.apply(o.get(0)), e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), s > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", r * s + "em"), e.dpDiv[(1 !== n[0] || 1 !== n[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
                        i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
                    }, 0))
                },
                _shouldFocusInput: function(t) {
                    return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
                },
                _checkOffset: function(e, i, n) {
                    var s = e.dpDiv.outerWidth(),
                        r = e.dpDiv.outerHeight(),
                        a = e.input ? e.input.outerWidth() : 0,
                        o = e.input ? e.input.outerHeight() : 0,
                        l = document.documentElement.clientWidth + (n ? 0 : t(document).scrollLeft()),
                        h = document.documentElement.clientHeight + (n ? 0 : t(document).scrollTop());
                    return i.left -= this._get(e, "isRTL") ? s - a : 0, i.left -= n && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= n && i.top === e.input.offset().top + o ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + s > l && l > s ? Math.abs(i.left + s - l) : 0), i.top -= Math.min(i.top, i.top + r > h && h > r ? Math.abs(r + o) : 0), i
                },
                _findPos: function(e) {
                    for (var i, n = this._getInst(e), s = this._get(n, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[s ? "previousSibling" : "nextSibling"];
                    return i = t(e).offset(), [i.left, i.top]
                },
                _hideDatepicker: function(e) {
                    var i, n, s, r, a = this._curInst;
                    !a || e && a !== t.data(e, "datepicker") || this._datepickerShowing && (i = this._get(a, "showAnim"), n = this._get(a, "duration"), s = function() {
                        t.datepicker._tidyDialog(a)
                    }, t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), n, s) : a.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? n : null, s), i || s(), this._datepickerShowing = !1, r = this._get(a, "onClose"), r && r.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
                },
                _tidyDialog: function(t) {
                    t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
                },
                _checkExternalClick: function(e) {
                    if (t.datepicker._curInst) {
                        var i = t(e.target),
                            n = t.datepicker._getInst(i[0]);
                        (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== n) && t.datepicker._hideDatepicker()
                    }
                },
                _adjustDate: function(e, i, n) {
                    var s = t(e),
                        r = this._getInst(s[0]);
                    this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(r, i + ("M" === n ? this._get(r, "showCurrentAtPos") : 0), n), this._updateDatepicker(r))
                },
                _gotoToday: function(e) {
                    var i, n = t(e),
                        s = this._getInst(n[0]);
                    this._get(s, "gotoCurrent") && s.currentDay ? (s.selectedDay = s.currentDay, s.drawMonth = s.selectedMonth = s.currentMonth, s.drawYear = s.selectedYear = s.currentYear) : (i = new Date, s.selectedDay = i.getDate(), s.drawMonth = s.selectedMonth = i.getMonth(), s.drawYear = s.selectedYear = i.getFullYear()), this._notifyChange(s), this._adjustDate(n)
                },
                _selectMonthYear: function(e, i, n) {
                    var s = t(e),
                        r = this._getInst(s[0]);
                    r["selected" + ("M" === n ? "Month" : "Year")] = r["draw" + ("M" === n ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(r), this._adjustDate(s)
                },
                _selectDay: function(e, i, n, s) {
                    var r, a = t(e);
                    t(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (r = this._getInst(a[0]), r.selectedDay = r.currentDay = t("a", s).html(), r.selectedMonth = r.currentMonth = i, r.selectedYear = r.currentYear = n, this._selectDate(e, this._formatDate(r, r.currentDay, r.currentMonth, r.currentYear)))
                },
                _clearDate: function(e) {
                    var i = t(e);
                    this._selectDate(i, "")
                },
                _selectDate: function(e, i) {
                    var n, s = t(e),
                        r = this._getInst(s[0]);
                    i = null != i ? i : this._formatDate(r), r.input && r.input.val(i), this._updateAlternate(r), n = this._get(r, "onSelect"), n ? n.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change"), r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], "object" != typeof r.input[0] && r.input.focus(), this._lastInput = null)
                },
                _updateAlternate: function(e) {
                    var i, n, s, r = this._get(e, "altField");
                    r && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), n = this._getDate(e), s = this.formatDate(i, n, this._getFormatConfig(e)), t(r).each(function() {
                        t(this).val(s)
                    }))
                },
                noWeekends: function(t) {
                    var e = t.getDay();
                    return [e > 0 && 6 > e, ""]
                },
                iso8601Week: function(t) {
                    var e, i = new Date(t.getTime());
                    return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
                },
                parseDate: function(e, i, n) {
                    if (null == e || null == i) throw "Invalid arguments";
                    if (i = "object" == typeof i ? "" + i : i + "", "" === i) return null;
                    var s, r, a, o, l = 0,
                        h = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                        u = "string" != typeof h ? h : (new Date).getFullYear() % 100 + parseInt(h, 10),
                        c = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                        d = (n ? n.dayNames : null) || this._defaults.dayNames,
                        p = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                        f = (n ? n.monthNames : null) || this._defaults.monthNames,
                        g = -1,
                        m = -1,
                        v = -1,
                        y = -1,
                        b = !1,
                        _ = function(t) {
                            var i = e.length > s + 1 && e.charAt(s + 1) === t;
                            return i && s++, i
                        },
                        x = function(t) {
                            var e = _(t),
                                n = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                                s = "y" === t ? n : 1,
                                r = RegExp("^\\d{" + s + "," + n + "}"),
                                a = i.substring(l).match(r);
                            if (!a) throw "Missing number at position " + l;
                            return l += a[0].length, parseInt(a[0], 10)
                        },
                        w = function(e, n, s) {
                            var r = -1,
                                a = t.map(_(e) ? s : n, function(t, e) {
                                    return [
                                        [e, t]
                                    ]
                                }).sort(function(t, e) {
                                    return -(t[1].length - e[1].length)
                                });
                            if (t.each(a, function(t, e) {
                                    var n = e[1];
                                    return i.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (r = e[0], l += n.length, !1) : void 0
                                }), -1 !== r) return r + 1;
                            throw "Unknown name at position " + l
                        },
                        k = function() {
                            if (i.charAt(l) !== e.charAt(s)) throw "Unexpected literal at position " + l;
                            l++
                        };
                    for (s = 0; e.length > s; s++)
                        if (b) "'" !== e.charAt(s) || _("'") ? k() : b = !1;
                        else switch (e.charAt(s)) {
                            case "d":
                                v = x("d");
                                break;
                            case "D":
                                w("D", c, d);
                                break;
                            case "o":
                                y = x("o");
                                break;
                            case "m":
                                m = x("m");
                                break;
                            case "M":
                                m = w("M", p, f);
                                break;
                            case "y":
                                g = x("y");
                                break;
                            case "@":
                                o = new Date(x("@")), g = o.getFullYear(), m = o.getMonth() + 1, v = o.getDate();
                                break;
                            case "!":
                                o = new Date((x("!") - this._ticksTo1970) / 1e4), g = o.getFullYear(), m = o.getMonth() + 1, v = o.getDate();
                                break;
                            case "'":
                                _("'") ? k() : b = !0;
                                break;
                            default:
                                k()
                        }
                    if (i.length > l && (a = i.substr(l), !/^\s+/.test(a))) throw "Extra/unparsed characters found in date: " + a;
                    if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= g ? 0 : -100)), y > -1)
                        for (m = 1, v = y; r = this._getDaysInMonth(g, m - 1), !(r >= v);) m++, v -= r;
                    if (o = this._daylightSavingAdjust(new Date(g, m - 1, v)), o.getFullYear() !== g || o.getMonth() + 1 !== m || o.getDate() !== v) throw "Invalid date";
                    return o
                },
                ATOM: "yy-mm-dd",
                COOKIE: "D, dd M yy",
                ISO_8601: "yy-mm-dd",
                RFC_822: "D, d M y",
                RFC_850: "DD, dd-M-y",
                RFC_1036: "D, d M y",
                RFC_1123: "D, d M yy",
                RFC_2822: "D, d M yy",
                RSS: "D, d M y",
                TICKS: "!",
                TIMESTAMP: "@",
                W3C: "yy-mm-dd",
                _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
                formatDate: function(t, e, i) {
                    if (!e) return "";
                    var n, s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                        r = (i ? i.dayNames : null) || this._defaults.dayNames,
                        a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                        o = (i ? i.monthNames : null) || this._defaults.monthNames,
                        l = function(e) {
                            var i = t.length > n + 1 && t.charAt(n + 1) === e;
                            return i && n++, i
                        },
                        h = function(t, e, i) {
                            var n = "" + e;
                            if (l(t))
                                for (; i > n.length;) n = "0" + n;
                            return n
                        },
                        u = function(t, e, i, n) {
                            return l(t) ? n[e] : i[e]
                        },
                        c = "",
                        d = !1;
                    if (e)
                        for (n = 0; t.length > n; n++)
                            if (d) "'" !== t.charAt(n) || l("'") ? c += t.charAt(n) : d = !1;
                            else switch (t.charAt(n)) {
                                case "d":
                                    c += h("d", e.getDate(), 2);
                                    break;
                                case "D":
                                    c += u("D", e.getDay(), s, r);
                                    break;
                                case "o":
                                    c += h("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                    break;
                                case "m":
                                    c += h("m", e.getMonth() + 1, 2);
                                    break;
                                case "M":
                                    c += u("M", e.getMonth(), a, o);
                                    break;
                                case "y":
                                    c += l("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + e.getYear() % 100;
                                    break;
                                case "@":
                                    c += e.getTime();
                                    break;
                                case "!":
                                    c += 1e4 * e.getTime() + this._ticksTo1970;
                                    break;
                                case "'":
                                    l("'") ? c += "'" : d = !0;
                                    break;
                                default:
                                    c += t.charAt(n)
                            }
                    return c
                },
                _possibleChars: function(t) {
                    var e, i = "",
                        n = !1,
                        s = function(i) {
                            var n = t.length > e + 1 && t.charAt(e + 1) === i;
                            return n && e++, n
                        };
                    for (e = 0; t.length > e; e++)
                        if (n) "'" !== t.charAt(e) || s("'") ? i += t.charAt(e) : n = !1;
                        else switch (t.charAt(e)) {
                            case "d":
                            case "m":
                            case "y":
                            case "@":
                                i += "0123456789";
                                break;
                            case "D":
                            case "M":
                                return null;
                            case "'":
                                s("'") ? i += "'" : n = !0;
                                break;
                            default:
                                i += t.charAt(e)
                        }
                    return i
                },
                _get: function(t, e) {
                    return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e]
                },
                _setDateFromField: function(t, e) {
                    if (t.input.val() !== t.lastVal) {
                        var i = this._get(t, "dateFormat"),
                            n = t.lastVal = t.input ? t.input.val() : null,
                            s = this._getDefaultDate(t),
                            r = s,
                            a = this._getFormatConfig(t);
                        try {
                            r = this.parseDate(i, n, a) || s
                        } catch (o) {
                            n = e ? "" : n
                        }
                        t.selectedDay = r.getDate(), t.drawMonth = t.selectedMonth = r.getMonth(), t.drawYear = t.selectedYear = r.getFullYear(), t.currentDay = n ? r.getDate() : 0, t.currentMonth = n ? r.getMonth() : 0, t.currentYear = n ? r.getFullYear() : 0, this._adjustInstDate(t)
                    }
                },
                _getDefaultDate: function(t) {
                    return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
                },
                _determineDate: function(e, i, n) {
                    var s = function(t) {
                            var e = new Date;
                            return e.setDate(e.getDate() + t), e
                        },
                        r = function(i) {
                            try {
                                return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                            } catch (n) {}
                            for (var s = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, r = s.getFullYear(), a = s.getMonth(), o = s.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, h = l.exec(i); h;) {
                                switch (h[2] || "d") {
                                    case "d":
                                    case "D":
                                        o += parseInt(h[1], 10);
                                        break;
                                    case "w":
                                    case "W":
                                        o += 7 * parseInt(h[1], 10);
                                        break;
                                    case "m":
                                    case "M":
                                        a += parseInt(h[1], 10), o = Math.min(o, t.datepicker._getDaysInMonth(r, a));
                                        break;
                                    case "y":
                                    case "Y":
                                        r += parseInt(h[1], 10), o = Math.min(o, t.datepicker._getDaysInMonth(r, a))
                                }
                                h = l.exec(i)
                            }
                            return new Date(r, a, o)
                        },
                        a = null == i || "" === i ? n : "string" == typeof i ? r(i) : "number" == typeof i ? isNaN(i) ? n : s(i) : new Date(i.getTime());
                    return a = a && "Invalid Date" == "" + a ? n : a, a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a)
                },
                _daylightSavingAdjust: function(t) {
                    return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
                },
                _setDate: function(t, e, i) {
                    var n = !e,
                        s = t.selectedMonth,
                        r = t.selectedYear,
                        a = this._restrictMinMax(t, this._determineDate(t, e, new Date));
                    t.selectedDay = t.currentDay = a.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(), t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(), s === t.selectedMonth && r === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(n ? "" : this._formatDate(t))
                },
                _getDate: function(t) {
                    var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                    return e
                },
                _attachHandlers: function(e) {
                    var i = this._get(e, "stepMonths"),
                        n = "#" + e.id.replace(/\\\\/g, "\\");
                    e.dpDiv.find("[data-handler]").map(function() {
                        var e = {
                            prev: function() {
                                t.datepicker._adjustDate(n, -i, "M")
                            },
                            next: function() {
                                t.datepicker._adjustDate(n, +i, "M")
                            },
                            hide: function() {
                                t.datepicker._hideDatepicker()
                            },
                            today: function() {
                                t.datepicker._gotoToday(n)
                            },
                            selectDay: function() {
                                return t.datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                            },
                            selectMonth: function() {
                                return t.datepicker._selectMonthYear(n, this, "M"), !1
                            },
                            selectYear: function() {
                                return t.datepicker._selectMonthYear(n, this, "Y"), !1
                            }
                        };
                        t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
                    })
                },
                _generateHTML: function(t) {
                    var e, i, n, s, r, a, o, l, h, u, c, d, p, f, g, m, v, y, b, _, x, w, k, C, T, D, S, M, N, E, I, A, P, z, H, F, j, O, B, W = new Date,
                        L = this._daylightSavingAdjust(new Date(W.getFullYear(), W.getMonth(), W.getDate())),
                        R = this._get(t, "isRTL"),
                        q = this._get(t, "showButtonPanel"),
                        Y = this._get(t, "hideIfNoPrevNext"),
                        $ = this._get(t, "navigationAsDateFormat"),
                        V = this._getNumberOfMonths(t),
                        U = this._get(t, "showCurrentAtPos"),
                        X = this._get(t, "stepMonths"),
                        K = 1 !== V[0] || 1 !== V[1],
                        G = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                        Q = this._getMinMaxDate(t, "min"),
                        J = this._getMinMaxDate(t, "max"),
                        Z = t.drawMonth - U,
                        tt = t.drawYear;
                    if (0 > Z && (Z += 12, tt--), J)
                        for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - V[0] * V[1] + 1, J.getDate())), e = Q && Q > e ? Q : e; this._daylightSavingAdjust(new Date(tt, Z, 1)) > e;) Z--, 0 > Z && (Z = 11, tt--);
                    for (t.drawMonth = Z, t.drawYear = tt, i = this._get(t, "prevText"), i = $ ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, Z - X, 1)), this._getFormatConfig(t)) : i, n = this._canAdjustMonth(t, -1, tt, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "e" : "w") + "'>" + i + "</span></a>" : Y ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "e" : "w") + "'>" + i + "</span></a>", s = this._get(t, "nextText"), s = $ ? this.formatDate(s, this._daylightSavingAdjust(new Date(tt, Z + X, 1)), this._getFormatConfig(t)) : s, r = this._canAdjustMonth(t, 1, tt, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "w" : "e") + "'>" + s + "</span></a>" : Y ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "w" : "e") + "'>" + s + "</span></a>", a = this._get(t, "currentText"), o = this._get(t, "gotoCurrent") && t.currentDay ? G : L, a = $ ? this.formatDate(a, o, this._getFormatConfig(t)) : a, l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", h = q ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (R ? l : "") + (this._isInRange(t, o) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>" : "") + (R ? "" : l) + "</div>" : "", u = parseInt(this._get(t, "firstDay"), 10), u = isNaN(u) ? 0 : u, c = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), g = this._get(t, "monthNamesShort"), m = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), y = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), _ = "", w = 0; V[0] > w; w++) {
                        for (k = "", this.maxRows = 4, C = 0; V[1] > C; C++) {
                            if (T = this._daylightSavingAdjust(new Date(tt, Z, t.selectedDay)), D = " ui-corner-all", S = "", K) {
                                if (S += "<div class='ui-datepicker-group", V[1] > 1) switch (C) {
                                    case 0:
                                        S += " ui-datepicker-group-first", D = " ui-corner-" + (R ? "right" : "left");
                                        break;
                                    case V[1] - 1:
                                        S += " ui-datepicker-group-last", D = " ui-corner-" + (R ? "left" : "right");
                                        break;
                                    default:
                                        S += " ui-datepicker-group-middle", D = ""
                                }
                                S += "'>"
                            }
                            for (S += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + D + "'>" + (/all|left/.test(D) && 0 === w ? R ? r : n : "") + (/all|right/.test(D) && 0 === w ? R ? n : r : "") + this._generateMonthYearHeader(t, Z, tt, Q, J, w > 0 || C > 0, f, g) + "</div><table class='ui-datepicker-calendar'><thead><tr>", M = c ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", x = 0; 7 > x; x++) N = (x + u) % 7, M += "<th scope='col'" + ((x + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + d[N] + "'>" + p[N] + "</span></th>";
                            for (S += M + "</tr></thead><tbody>", E = this._getDaysInMonth(tt, Z), tt === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, E)), I = (this._getFirstDayOfMonth(tt, Z) - u + 7) % 7, A = Math.ceil((I + E) / 7), P = K && this.maxRows > A ? this.maxRows : A, this.maxRows = P, z = this._daylightSavingAdjust(new Date(tt, Z, 1 - I)), H = 0; P > H; H++) {
                                for (S += "<tr>", F = c ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(z) + "</td>" : "", x = 0; 7 > x; x++) j = m ? m.apply(t.input ? t.input[0] : null, [z]) : [!0, ""], O = z.getMonth() !== Z, B = O && !y || !j[0] || Q && Q > z || J && z > J, F += "<td class='" + ((x + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (O ? " ui-datepicker-other-month" : "") + (z.getTime() === T.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === z.getTime() && b.getTime() === T.getTime() ? " " + this._dayOverClass : "") + (B ? " " + this._unselectableClass + " ui-state-disabled" : "") + (O && !v ? "" : " " + j[1] + (z.getTime() === G.getTime() ? " " + this._currentClass : "") + (z.getTime() === L.getTime() ? " ui-datepicker-today" : "")) + "'" + (O && !v || !j[2] ? "" : " title='" + j[2].replace(/'/g, "&#39;") + "'") + (B ? "" : " data-handler='selectDay' data-event='click' data-month='" + z.getMonth() + "' data-year='" + z.getFullYear() + "'") + ">" + (O && !v ? "&#xa0;" : B ? "<span class='ui-state-default'>" + z.getDate() + "</span>" : "<a class='ui-state-default" + (z.getTime() === L.getTime() ? " ui-state-highlight" : "") + (z.getTime() === G.getTime() ? " ui-state-active" : "") + (O ? " ui-priority-secondary" : "") + "' href='#'>" + z.getDate() + "</a>") + "</td>", z.setDate(z.getDate() + 1), z = this._daylightSavingAdjust(z);
                                S += F + "</tr>"
                            }
                            Z++, Z > 11 && (Z = 0, tt++), S += "</tbody></table>" + (K ? "</div>" + (V[0] > 0 && C === V[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), k += S
                        }
                        _ += k
                    }
                    return _ += h, t._keyEvent = !1, _
                },
                _generateMonthYearHeader: function(t, e, i, n, s, r, a, o) {
                    var l, h, u, c, d, p, f, g, m = this._get(t, "changeMonth"),
                        v = this._get(t, "changeYear"),
                        y = this._get(t, "showMonthAfterYear"),
                        b = "<div class='ui-datepicker-title'>",
                        _ = "";
                    if (r || !m) _ += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
                    else {
                        for (l = n && n.getFullYear() === i, h = s && s.getFullYear() === i, _ += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; 12 > u; u++)(!l || u >= n.getMonth()) && (!h || s.getMonth() >= u) && (_ += "<option value='" + u + "'" + (u === e ? " selected='selected'" : "") + ">" + o[u] + "</option>");
                        _ += "</select>"
                    }
                    if (y || (b += _ + (!r && m && v ? "" : "&#xa0;")), !t.yearshtml)
                        if (t.yearshtml = "", r || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
                        else {
                            for (c = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
                                    var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                                    return isNaN(e) ? d : e
                                }, f = p(c[0]), g = Math.max(f, p(c[1] || "")), f = n ? Math.max(f, n.getFullYear()) : f, g = s ? Math.min(g, s.getFullYear()) : g, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; g >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                            t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
                        }
                    return b += this._get(t, "yearSuffix"), y && (b += (!r && m && v ? "" : "&#xa0;") + _), b += "</div>"
                },
                _adjustInstDate: function(t, e, i) {
                    var n = t.drawYear + ("Y" === i ? e : 0),
                        s = t.drawMonth + ("M" === i ? e : 0),
                        r = Math.min(t.selectedDay, this._getDaysInMonth(n, s)) + ("D" === i ? e : 0),
                        a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(n, s, r)));
                    t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
                },
                _restrictMinMax: function(t, e) {
                    var i = this._getMinMaxDate(t, "min"),
                        n = this._getMinMaxDate(t, "max"),
                        s = i && i > e ? i : e;
                    return n && s > n ? n : s
                },
                _notifyChange: function(t) {
                    var e = this._get(t, "onChangeMonthYear");
                    e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
                },
                _getNumberOfMonths: function(t) {
                    var e = this._get(t, "numberOfMonths");
                    return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
                },
                _getMinMaxDate: function(t, e) {
                    return this._determineDate(t, this._get(t, e + "Date"), null)
                },
                _getDaysInMonth: function(t, e) {
                    return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
                },
                _getFirstDayOfMonth: function(t, e) {
                    return new Date(t, e, 1).getDay()
                },
                _canAdjustMonth: function(t, e, i, n) {
                    var s = this._getNumberOfMonths(t),
                        r = this._daylightSavingAdjust(new Date(i, n + (0 > e ? e : s[0] * s[1]), 1));
                    return 0 > e && r.setDate(this._getDaysInMonth(r.getFullYear(), r.getMonth())), this._isInRange(t, r)
                },
                _isInRange: function(t, e) {
                    var i, n, s = this._getMinMaxDate(t, "min"),
                        r = this._getMinMaxDate(t, "max"),
                        a = null,
                        o = null,
                        l = this._get(t, "yearRange");
                    return l && (i = l.split(":"), n = (new Date).getFullYear(), a = parseInt(i[0], 10), o = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += n), i[1].match(/[+\-].*/) && (o += n)), (!s || e.getTime() >= s.getTime()) && (!r || e.getTime() <= r.getTime()) && (!a || e.getFullYear() >= a) && (!o || o >= e.getFullYear())
                },
                _getFormatConfig: function(t) {
                    var e = this._get(t, "shortYearCutoff");
                    return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                        shortYearCutoff: e,
                        dayNamesShort: this._get(t, "dayNamesShort"),
                        dayNames: this._get(t, "dayNames"),
                        monthNamesShort: this._get(t, "monthNamesShort"),
                        monthNames: this._get(t, "monthNames")
                    }
                },
                _formatDate: function(t, e, i, n) {
                    e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
                    var s = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(n, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                    return this.formatDate(this._get(t, "dateFormat"), s, this._getFormatConfig(t))
                }
            }), t.fn.datepicker = function(e) {
                if (!this.length) return this;
                t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
                var i = Array.prototype.slice.call(arguments, 1);
                return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
                    "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
                }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
            }, t.datepicker = new s, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.11.2", t.datepicker, t.widget("ui.dialog", {
                version: "1.11.2",
                options: {
                    appendTo: "body",
                    autoOpen: !0,
                    buttons: [],
                    closeOnEscape: !0,
                    closeText: "Close",
                    dialogClass: "",
                    draggable: !0,
                    hide: null,
                    height: "auto",
                    maxHeight: null,
                    maxWidth: null,
                    minHeight: 150,
                    minWidth: 150,
                    modal: !1,
                    position: {
                        my: "center",
                        at: "center",
                        of: window,
                        collision: "fit",
                        using: function(e) {
                            var i = t(this).css(e).offset().top;
                            0 > i && t(this).css("top", e.top - i)
                        }
                    },
                    resizable: !0,
                    show: null,
                    title: null,
                    width: 300,
                    beforeClose: null,
                    close: null,
                    drag: null,
                    dragStart: null,
                    dragStop: null,
                    focus: null,
                    open: null,
                    resize: null,
                    resizeStart: null,
                    resizeStop: null
                },
                sizeRelatedOptions: {
                    buttons: !0,
                    height: !0,
                    maxHeight: !0,
                    maxWidth: !0,
                    minHeight: !0,
                    minWidth: !0,
                    width: !0
                },
                resizableRelatedOptions: {
                    maxHeight: !0,
                    maxWidth: !0,
                    minHeight: !0,
                    minWidth: !0
                },
                _create: function() {
                    this.originalCss = {
                        display: this.element[0].style.display,
                        width: this.element[0].style.width,
                        minHeight: this.element[0].style.minHeight,
                        maxHeight: this.element[0].style.maxHeight,
                        height: this.element[0].style.height
                    }, this.originalPosition = {
                        parent: this.element.parent(),
                        index: this.element.parent().children().index(this.element)
                    }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
                },
                _init: function() {
                    this.options.autoOpen && this.open()
                },
                _appendTo: function() {
                    var e = this.options.appendTo;
                    return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
                },
                _destroy: function() {
                    var t, e = this.originalPosition;
                    this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
                },
                widget: function() {
                    return this.uiDialog
                },
                disable: t.noop,
                enable: t.noop,
                close: function(e) {
                    var i, n = this;
                    if (this._isOpen && this._trigger("beforeClose", e) !== !1) {
                        if (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), !this.opener.filter(":focusable").focus().length) try {
                            i = this.document[0].activeElement, i && "body" !== i.nodeName.toLowerCase() && t(i).blur()
                        } catch (s) {}
                        this._hide(this.uiDialog, this.options.hide, function() {
                            n._trigger("close", e)
                        })
                    }
                },
                isOpen: function() {
                    return this._isOpen
                },
                moveToTop: function() {
                    this._moveToTop()
                },
                _moveToTop: function(e, i) {
                    var n = !1,
                        s = this.uiDialog.siblings(".ui-front:visible").map(function() {
                            return +t(this).css("z-index")
                        }).get(),
                        r = Math.max.apply(null, s);
                    return r >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", r + 1), n = !0), n && !i && this._trigger("focus", e), n
                },
                open: function() {
                    var e = this;
                    return this._isOpen ? void(this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() {
                        e._focusTabbable(), e._trigger("focus")
                    }), this._makeFocusTarget(), void this._trigger("open"))
                },
                _focusTabbable: function() {
                    var t = this._focusedElement;
                    t || (t = this.element.find("[autofocus]")), t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).focus()
                },
                _keepFocus: function(e) {
                    function i() {
                        var e = this.document[0].activeElement,
                            i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
                        i || this._focusTabbable()
                    }
                    e.preventDefault(), i.call(this), this._delay(i)
                },
                _createWrapper: function() {
                    this.uiDialog = t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                        tabIndex: -1,
                        role: "dialog"
                    }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                        keydown: function(e) {
                            if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), void this.close(e);
                            if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
                                var i = this.uiDialog.find(":tabbable"),
                                    n = i.filter(":first"),
                                    s = i.filter(":last");
                                e.target !== s[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== n[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (this._delay(function() {
                                    s.focus()
                                }), e.preventDefault()) : (this._delay(function() {
                                    n.focus()
                                }), e.preventDefault())
                            }
                        },
                        mousedown: function(t) {
                            this._moveToTop(t) && this._focusTabbable()
                        }
                    }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                        "aria-describedby": this.element.uniqueId().attr("id")
                    })
                },
                _createTitlebar: function() {
                    var e;
                    this.uiDialogTitlebar = t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
                        mousedown: function(e) {
                            t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                        }
                    }), this.uiDialogTitlebarClose = t("<button type='button'></button>").button({
                        label: this.options.closeText,
                        icons: {
                            primary: "ui-icon-closethick"
                        },
                        text: !1
                    }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                        click: function(t) {
                            t.preventDefault(), this.close(t)
                        }
                    }), e = t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(e), this.uiDialog.attr({
                        "aria-labelledby": e.attr("id")
                    })
                },
                _title: function(t) {
                    this.options.title || t.html("&#160;"), t.text(this.options.title)
                },
                _createButtonPane: function() {
                    this.uiDialogButtonPane = t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
                },
                _createButtons: function() {
                    var e = this,
                        i = this.options.buttons;
                    return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? void this.uiDialog.removeClass("ui-dialog-buttons") : (t.each(i, function(i, n) {
                        var s, r;
                        n = t.isFunction(n) ? {
                            click: n,
                            text: i
                        } : n, n = t.extend({
                            type: "button"
                        }, n), s = n.click, n.click = function() {
                            s.apply(e.element[0], arguments)
                        }, r = {
                            icons: n.icons,
                            text: n.showText
                        }, delete n.icons, delete n.showText, t("<button></button>", n).button(r).appendTo(e.uiButtonSet)
                    }), this.uiDialog.addClass("ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog))
                },
                _makeDraggable: function() {
                    function e(t) {
                        return {
                            position: t.position,
                            offset: t.offset
                        }
                    }
                    var i = this,
                        n = this.options;
                    this.uiDialog.draggable({
                        cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                        handle: ".ui-dialog-titlebar",
                        containment: "document",
                        start: function(n, s) {
                            t(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", n, e(s))
                        },
                        drag: function(t, n) {
                            i._trigger("drag", t, e(n))
                        },
                        stop: function(s, r) {
                            var a = r.offset.left - i.document.scrollLeft(),
                                o = r.offset.top - i.document.scrollTop();
                            n.position = {
                                my: "left top",
                                at: "left" + (a >= 0 ? "+" : "") + a + " top" + (o >= 0 ? "+" : "") + o,
                                of: i.window
                            }, t(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", s, e(r))
                        }
                    })
                },
                _makeResizable: function() {
                    function e(t) {
                        return {
                            originalPosition: t.originalPosition,
                            originalSize: t.originalSize,
                            position: t.position,
                            size: t.size
                        }
                    }
                    var i = this,
                        n = this.options,
                        s = n.resizable,
                        r = this.uiDialog.css("position"),
                        a = "string" == typeof s ? s : "n,e,s,w,se,sw,ne,nw";
                    this.uiDialog.resizable({
                        cancel: ".ui-dialog-content",
                        containment: "document",
                        alsoResize: this.element,
                        maxWidth: n.maxWidth,
                        maxHeight: n.maxHeight,
                        minWidth: n.minWidth,
                        minHeight: this._minHeight(),
                        handles: a,
                        start: function(n, s) {
                            t(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", n, e(s))
                        },
                        resize: function(t, n) {
                            i._trigger("resize", t, e(n))
                        },
                        stop: function(s, r) {
                            var a = i.uiDialog.offset(),
                                o = a.left - i.document.scrollLeft(),
                                l = a.top - i.document.scrollTop();
                            n.height = i.uiDialog.height(), n.width = i.uiDialog.width(), n.position = {
                                my: "left top",
                                at: "left" + (o >= 0 ? "+" : "") + o + " top" + (l >= 0 ? "+" : "") + l,
                                of: i.window
                            }, t(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", s, e(r))
                        }
                    }).css("position", r)
                },
                _trackFocus: function() {
                    this._on(this.widget(), {
                        focusin: function(e) {
                            this._makeFocusTarget(), this._focusedElement = t(e.target)
                        }
                    })
                },
                _makeFocusTarget: function() {
                    this._untrackInstance(), this._trackingInstances().unshift(this)
                },
                _untrackInstance: function() {
                    var e = this._trackingInstances(),
                        i = t.inArray(this, e); - 1 !== i && e.splice(i, 1)
                },
                _trackingInstances: function() {
                    var t = this.document.data("ui-dialog-instances");
                    return t || (t = [], this.document.data("ui-dialog-instances", t)), t
                },
                _minHeight: function() {
                    var t = this.options;
                    return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
                },
                _position: function() {
                    var t = this.uiDialog.is(":visible");
                    t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
                },
                _setOptions: function(e) {
                    var i = this,
                        n = !1,
                        s = {};
                    t.each(e, function(t, e) {
                        i._setOption(t, e), t in i.sizeRelatedOptions && (n = !0), t in i.resizableRelatedOptions && (s[t] = e)
                    }), n && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", s)
                },
                _setOption: function(t, e) {
                    var i, n, s = this.uiDialog;
                    "dialogClass" === t && s.removeClass(this.options.dialogClass).addClass(e), "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({
                        label: "" + e
                    }), "draggable" === t && (i = s.is(":data(ui-draggable)"), i && !e && s.draggable("destroy"), !i && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (n = s.is(":data(ui-resizable)"), n && !e && s.resizable("destroy"), n && "string" == typeof e && s.resizable("option", "handles", e), n || e === !1 || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
                },
                _size: function() {
                    var t, e, i, n = this.options;
                    this.element.show().css({
                        width: "auto",
                        minHeight: 0,
                        maxHeight: "none",
                        height: 0
                    }), n.minWidth > n.width && (n.width = n.minWidth), t = this.uiDialog.css({
                        height: "auto",
                        width: n.width
                    }).outerHeight(), e = Math.max(0, n.minHeight - t), i = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none", "auto" === n.height ? this.element.css({
                        minHeight: e,
                        maxHeight: i,
                        height: "auto"
                    }) : this.element.height(Math.max(0, n.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
                },
                _blockFrames: function() {
                    this.iframeBlocks = this.document.find("iframe").map(function() {
                        var e = t(this);
                        return t("<div>").css({
                            position: "absolute",
                            width: e.outerWidth(),
                            height: e.outerHeight()
                        }).appendTo(e.parent()).offset(e.offset())[0]
                    })
                },
                _unblockFrames: function() {
                    this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
                },
                _allowInteraction: function(e) {
                    return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length
                },
                _createOverlay: function() {
                    if (this.options.modal) {
                        var e = !0;
                        this._delay(function() {
                            e = !1
                        }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
                            focusin: function(t) {
                                e || this._allowInteraction(t) || (t.preventDefault(), this._trackingInstances()[0]._focusTabbable())
                            }
                        }), this.overlay = t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
                            mousedown: "_keepFocus"
                        }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
                    }
                },
                _destroyOverlay: function() {
                    if (this.options.modal && this.overlay) {
                        var t = this.document.data("ui-dialog-overlays") - 1;
                        t ? this.document.data("ui-dialog-overlays", t) : this.document.unbind("focusin").removeData("ui-dialog-overlays"), this.overlay.remove(), this.overlay = null
                    }
                }
            }), t.widget("ui.progressbar", {
                version: "1.11.2",
                options: {
                    max: 100,
                    value: 0,
                    change: null,
                    complete: null
                },
                min: 0,
                _create: function() {
                    this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                        role: "progressbar",
                        "aria-valuemin": this.min
                    }), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
                },
                _destroy: function() {
                    this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
                },
                value: function(t) {
                    return void 0 === t ? this.options.value : (this.options.value = this._constrainedValue(t), void this._refreshValue())
                },
                _constrainedValue: function(t) {
                    return void 0 === t && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t))
                },
                _setOptions: function(t) {
                    var e = t.value;
                    delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
                },
                _setOption: function(t, e) {
                    "max" === t && (e = Math.max(this.min, e)), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e), this._super(t, e)
                },
                _percentage: function() {
                    return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
                },
                _refreshValue: function() {
                    var e = this.options.value,
                        i = this._percentage();
                    this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                        "aria-valuemax": this.options.max,
                        "aria-valuenow": e
                    }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
                }
            }), t.widget("ui.selectmenu", {
                version: "1.11.2",
                defaultElement: "<select>",
                options: {
                    appendTo: null,
                    disabled: null,
                    icons: {
                        button: "ui-icon-triangle-1-s"
                    },
                    position: {
                        my: "left top",
                        at: "left bottom",
                        collision: "none"
                    },
                    width: null,
                    change: null,
                    close: null,
                    focus: null,
                    open: null,
                    select: null
                },
                _create: function() {
                    var t = this.element.uniqueId().attr("id");
                    this.ids = {
                        element: t,
                        button: t + "-button",
                        menu: t + "-menu"
                    }, this._drawButton(), this._drawMenu(), this.options.disabled && this.disable()
                },
                _drawButton: function() {
                    var e = this,
                        i = this.element.attr("tabindex");
                    this.label = t("label[for='" + this.ids.element + "']").attr("for", this.ids.button), this._on(this.label, {
                        click: function(t) {
                            this.button.focus(), t.preventDefault()
                        }
                    }), this.element.hide(), this.button = t("<span>", {
                        "class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
                        tabindex: i || this.options.disabled ? -1 : 0,
                        id: this.ids.button,
                        role: "combobox",
                        "aria-expanded": "false",
                        "aria-autocomplete": "list",
                        "aria-owns": this.ids.menu,
                        "aria-haspopup": "true"
                    }).insertAfter(this.element), t("<span>", {
                        "class": "ui-icon " + this.options.icons.button
                    }).prependTo(this.button), this.buttonText = t("<span>", {
                        "class": "ui-selectmenu-text"
                    }).appendTo(this.button), this._setText(this.buttonText, this.element.find("option:selected").text()), this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function() {
                        e.menuItems || e._refreshMenu()
                    }), this._hoverable(this.button), this._focusable(this.button)
                },
                _drawMenu: function() {
                    var e = this;
                    this.menu = t("<ul>", {
                        "aria-hidden": "true",
                        "aria-labelledby": this.ids.button,
                        id: this.ids.menu
                    }), this.menuWrap = t("<div>", {
                        "class": "ui-selectmenu-menu ui-front"
                    }).append(this.menu).appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                        role: "listbox",
                        select: function(t, i) {
                            t.preventDefault(), e._setSelection(), e._select(i.item.data("ui-selectmenu-item"), t)
                        },
                        focus: function(t, i) {
                            var n = i.item.data("ui-selectmenu-item");
                            null != e.focusIndex && n.index !== e.focusIndex && (e._trigger("focus", t, {
                                item: n
                            }), e.isOpen || e._select(n, t)), e.focusIndex = n.index, e.button.attr("aria-activedescendant", e.menuItems.eq(n.index).attr("id"))
                        }
                    }).menu("instance"), this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function() {
                        return !1
                    }, this.menuInstance._isDivider = function() {
                        return !1
                    }
                },
                refresh: function() {
                    this._refreshMenu(), this._setText(this.buttonText, this._getSelectedItem().text()), this.options.width || this._resizeButton()
                },
                _refreshMenu: function() {
                    this.menu.empty();
                    var t, e = this.element.find("option");
                    e.length && (this._parseOptions(e), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup"), t = this._getSelectedItem(), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
                },
                open: function(t) {
                    this.options.disabled || (this.menuItems ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t))
                },
                _position: function() {
                    this.menuWrap.position(t.extend({ of: this.button
                    }, this.options.position))
                },
                close: function(t) {
                    this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", t))
                },
                widget: function() {
                    return this.button
                },
                menuWidget: function() {
                    return this.menu
                },
                _renderMenu: function(e, i) {
                    var n = this,
                        s = "";
                    t.each(i, function(i, r) {
                        r.optgroup !== s && (t("<li>", {
                            "class": "ui-selectmenu-optgroup ui-menu-divider" + (r.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : ""),
                            text: r.optgroup
                        }).appendTo(e), s = r.optgroup), n._renderItemData(e, r)
                    })
                },
                _renderItemData: function(t, e) {
                    return this._renderItem(t, e).data("ui-selectmenu-item", e)
                },
                _renderItem: function(e, i) {
                    var n = t("<li>");
                    return i.disabled && n.addClass("ui-state-disabled"), this._setText(n, i.label), n.appendTo(e)
                },
                _setText: function(t, e) {
                    e ? t.text(e) : t.html("&#160;")
                },
                _move: function(t, e) {
                    var i, n, s = ".ui-menu-item";
                    this.isOpen ? i = this.menuItems.eq(this.focusIndex) : (i = this.menuItems.eq(this.element[0].selectedIndex), s += ":not(.ui-state-disabled)"), n = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](s).eq(-1) : i[t + "All"](s).eq(0), n.length && this.menuInstance.focus(e, n)
                },
                _getSelectedItem: function() {
                    return this.menuItems.eq(this.element[0].selectedIndex)
                },
                _toggle: function(t) {
                    this[this.isOpen ? "close" : "open"](t)
                },
                _setSelection: function() {
                    var t;
                    this.range && (window.getSelection ? (t = window.getSelection(), t.removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus())
                },
                _documentClick: {
                    mousedown: function(e) {
                        this.isOpen && (t(e.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length || this.close(e))
                    }
                },
                _buttonEvents: {
                    mousedown: function() {
                        var t;
                        window.getSelection ? (t = window.getSelection(), t.rangeCount && (this.range = t.getRangeAt(0))) : this.range = document.selection.createRange()
                    },
                    click: function(t) {
                        this._setSelection(), this._toggle(t)
                    },
                    keydown: function(e) {
                        var i = !0;
                        switch (e.keyCode) {
                            case t.ui.keyCode.TAB:
                            case t.ui.keyCode.ESCAPE:
                                this.close(e), i = !1;
                                break;
                            case t.ui.keyCode.ENTER:
                                this.isOpen && this._selectFocusedItem(e);
                                break;
                            case t.ui.keyCode.UP:
                                e.altKey ? this._toggle(e) : this._move("prev", e);
                                break;
                            case t.ui.keyCode.DOWN:
                                e.altKey ? this._toggle(e) : this._move("next", e);
                                break;
                            case t.ui.keyCode.SPACE:
                                this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);
                                break;
                            case t.ui.keyCode.LEFT:
                                this._move("prev", e);
                                break;
                            case t.ui.keyCode.RIGHT:
                                this._move("next", e);
                                break;
                            case t.ui.keyCode.HOME:
                            case t.ui.keyCode.PAGE_UP:
                                this._move("first", e);
                                break;
                            case t.ui.keyCode.END:
                            case t.ui.keyCode.PAGE_DOWN:
                                this._move("last", e);
                                break;
                            default:
                                this.menu.trigger(e), i = !1
                        }
                        i && e.preventDefault()
                    }
                },
                _selectFocusedItem: function(t) {
                    var e = this.menuItems.eq(this.focusIndex);
                    e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t)
                },
                _select: function(t, e) {
                    var i = this.element[0].selectedIndex;
                    this.element[0].selectedIndex = t.index, this._setText(this.buttonText, t.label), this._setAria(t), this._trigger("select", e, {
                        item: t
                    }), t.index !== i && this._trigger("change", e, {
                        item: t
                    }), this.close(e)
                },
                _setAria: function(t) {
                    var e = this.menuItems.eq(t.index).attr("id");
                    this.button.attr({
                        "aria-labelledby": e,
                        "aria-activedescendant": e
                    }), this.menu.attr("aria-activedescendant", e)
                },
                _setOption: function(t, e) {
                    "icons" === t && this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(e.button), this._super(t, e), "appendTo" === t && this.menuWrap.appendTo(this._appendTo()), "disabled" === t && (this.menuInstance.option("disabled", e), this.button.toggleClass("ui-state-disabled", e).attr("aria-disabled", e), this.element.prop("disabled", e), e ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)), "width" === t && this._resizeButton()
                },
                _appendTo: function() {
                    var e = this.options.appendTo;
                    return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
                },
                _toggleAttr: function() {
                    this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen), this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
                },
                _resizeButton: function() {
                    var t = this.options.width;
                    t || (t = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(t)
                },
                _resizeMenu: function() {
                    this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
                },
                _getCreateOptions: function() {
                    return {
                        disabled: this.element.prop("disabled")
                    }
                },
                _parseOptions: function(e) {
                    var i = [];
                    e.each(function(e, n) {
                        var s = t(n),
                            r = s.parent("optgroup");
                        i.push({
                            element: s,
                            index: e,
                            value: s.attr("value"),
                            label: s.text(),
                            optgroup: r.attr("label") || "",
                            disabled: r.prop("disabled") || s.prop("disabled")
                        })
                    }), this.items = i
                },
                _destroy: function() {
                    this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.label.attr("for", this.ids.element)
                }
            }), t.widget("ui.slider", t.ui.mouse, {
                version: "1.11.2",
                widgetEventPrefix: "slide",
                options: {
                    animate: !1,
                    distance: 0,
                    max: 100,
                    min: 0,
                    orientation: "horizontal",
                    range: !1,
                    step: 1,
                    value: 0,
                    values: null,
                    change: null,
                    slide: null,
                    start: null,
                    stop: null
                },
                numPages: 5,
                _create: function() {
                    this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
                },
                _refresh: function() {
                    this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
                },
                _createHandles: function() {
                    var e, i, n = this.options,
                        s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                        r = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                        a = [];
                    for (i = n.values && n.values.length || 1, s.length > i && (s.slice(i).remove(), s = s.slice(0, i)), e = s.length; i > e; e++) a.push(r);
                    this.handles = s.add(t(a.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(e) {
                        t(this).data("ui-slider-handle-index", e)
                    })
                },
                _createRange: function() {
                    var e = this.options,
                        i = "";
                    e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                        left: "",
                        bottom: ""
                    }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : (this.range && this.range.remove(), this.range = null)
                },
                _setupEvents: function() {
                    this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
                },
                _destroy: function() {
                    this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
                },
                _mouseCapture: function(e) {
                    var i, n, s, r, a, o, l, h, u = this,
                        c = this.options;
                    return c.disabled ? !1 : (this.elementSize = {
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight()
                    }, this.elementOffset = this.element.offset(), i = {
                        x: e.pageX,
                        y: e.pageY
                    }, n = this._normValueFromMouse(i), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                        var i = Math.abs(n - u.values(e));
                        (s > i || s === i && (e === u._lastChangedValue || u.values(e) === c.min)) && (s = i, r = t(this), a = e)
                    }), o = this._start(e, a), o === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, r.addClass("ui-state-active").focus(), l = r.offset(), h = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? {
                        left: 0,
                        top: 0
                    } : {
                        left: e.pageX - l.left - r.width() / 2,
                        top: e.pageY - l.top - r.height() / 2 - (parseInt(r.css("borderTopWidth"), 10) || 0) - (parseInt(r.css("borderBottomWidth"), 10) || 0) + (parseInt(r.css("marginTop"), 10) || 0)
                    }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, n), this._animateOff = !0, !0))
                },
                _mouseStart: function() {
                    return !0
                },
                _mouseDrag: function(t) {
                    var e = {
                            x: t.pageX,
                            y: t.pageY
                        },
                        i = this._normValueFromMouse(e);
                    return this._slide(t, this._handleIndex, i), !1
                },
                _mouseStop: function(t) {
                    return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
                },
                _detectOrientation: function() {
                    this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
                },
                _normValueFromMouse: function(t) {
                    var e, i, n, s, r;
                    return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), n = i / e, n > 1 && (n = 1), 0 > n && (n = 0), "vertical" === this.orientation && (n = 1 - n), s = this._valueMax() - this._valueMin(), r = this._valueMin() + n * s, this._trimAlignValue(r)
                },
                _start: function(t, e) {
                    var i = {
                        handle: this.handles[e],
                        value: this.value()
                    };
                    return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
                },
                _slide: function(t, e, i) {
                    var n, s, r;
                    this.options.values && this.options.values.length ? (n = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > n || 1 === e && n > i) && (i = n), i !== this.values(e) && (s = this.values(), s[e] = i, r = this._trigger("slide", t, {
                        handle: this.handles[e],
                        value: i,
                        values: s
                    }), n = this.values(e ? 0 : 1), r !== !1 && this.values(e, i))) : i !== this.value() && (r = this._trigger("slide", t, {
                        handle: this.handles[e],
                        value: i
                    }), r !== !1 && this.value(i))
                },
                _stop: function(t, e) {
                    var i = {
                        handle: this.handles[e],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
                },
                _change: function(t, e) {
                    if (!this._keySliding && !this._mouseSliding) {
                        var i = {
                            handle: this.handles[e],
                            value: this.value()
                        };
                        this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
                    }
                },
                value: function(t) {
                    return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
                },
                values: function(e, i) {
                    var n, s, r;
                    if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), void this._change(null, e);
                    if (!arguments.length) return this._values();
                    if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
                    for (n = this.options.values, s = arguments[0], r = 0; n.length > r; r += 1) n[r] = this._trimAlignValue(s[r]), this._change(null, r);
                    this._refreshValue()
                },
                _setOption: function(e, i) {
                    var n, s = 0;
                    switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (s = this.options.values.length), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!i), this._super(e, i), e) {
                        case "orientation":
                            this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                            break;
                        case "value":
                            this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                            break;
                        case "values":
                            for (this._animateOff = !0, this._refreshValue(), n = 0; s > n; n += 1) this._change(null, n);
                            this._animateOff = !1;
                            break;
                        case "step":
                        case "min":
                        case "max":
                            this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                            break;
                        case "range":
                            this._animateOff = !0, this._refresh(), this._animateOff = !1
                    }
                },
                _value: function() {
                    var t = this.options.value;
                    return t = this._trimAlignValue(t)
                },
                _values: function(t) {
                    var e, i, n;
                    if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
                    if (this.options.values && this.options.values.length) {
                        for (i = this.options.values.slice(), n = 0; i.length > n; n += 1) i[n] = this._trimAlignValue(i[n]);
                        return i
                    }
                    return []
                },
                _trimAlignValue: function(t) {
                    if (this._valueMin() >= t) return this._valueMin();
                    if (t >= this._valueMax()) return this._valueMax();
                    var e = this.options.step > 0 ? this.options.step : 1,
                        i = (t - this._valueMin()) % e,
                        n = t - i;
                    return 2 * Math.abs(i) >= e && (n += i > 0 ? e : -e), parseFloat(n.toFixed(5))
                },
                _calculateNewMax: function() {
                    var t = (this.options.max - this._valueMin()) % this.options.step;
                    this.max = this.options.max - t
                },
                _valueMin: function() {
                    return this.options.min
                },
                _valueMax: function() {
                    return this.max
                },
                _refreshValue: function() {
                    var e, i, n, s, r, a = this.options.range,
                        o = this.options,
                        l = this,
                        h = this._animateOff ? !1 : o.animate,
                        u = {};
                    this.options.values && this.options.values.length ? this.handles.each(function(n) {
                        i = 100 * ((l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin())), u["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[h ? "animate" : "css"](u, o.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === n && l.range.stop(1, 1)[h ? "animate" : "css"]({
                            left: i + "%"
                        }, o.animate), 1 === n && l.range[h ? "animate" : "css"]({
                            width: i - e + "%"
                        }, {
                            queue: !1,
                            duration: o.animate
                        })) : (0 === n && l.range.stop(1, 1)[h ? "animate" : "css"]({
                            bottom: i + "%"
                        }, o.animate), 1 === n && l.range[h ? "animate" : "css"]({
                            height: i - e + "%"
                        }, {
                            queue: !1,
                            duration: o.animate
                        }))), e = i
                    }) : (n = this.value(), s = this._valueMin(), r = this._valueMax(), i = r !== s ? 100 * ((n - s) / (r - s)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](u, o.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                        width: i + "%"
                    }, o.animate), "max" === a && "horizontal" === this.orientation && this.range[h ? "animate" : "css"]({
                        width: 100 - i + "%"
                    }, {
                        queue: !1,
                        duration: o.animate
                    }), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                        height: i + "%"
                    }, o.animate), "max" === a && "vertical" === this.orientation && this.range[h ? "animate" : "css"]({
                        height: 100 - i + "%"
                    }, {
                        queue: !1,
                        duration: o.animate
                    }))
                },
                _handleEvents: {
                    keydown: function(e) {
                        var i, n, s, r, a = t(e.target).data("ui-slider-handle-index");
                        switch (e.keyCode) {
                            case t.ui.keyCode.HOME:
                            case t.ui.keyCode.END:
                            case t.ui.keyCode.PAGE_UP:
                            case t.ui.keyCode.PAGE_DOWN:
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.RIGHT:
                            case t.ui.keyCode.DOWN:
                            case t.ui.keyCode.LEFT:
                                if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, t(e.target).addClass("ui-state-active"), i = this._start(e, a), i === !1)) return
                        }
                        switch (r = this.options.step, n = s = this.options.values && this.options.values.length ? this.values(a) : this.value(), e.keyCode) {
                            case t.ui.keyCode.HOME:
                                s = this._valueMin();
                                break;
                            case t.ui.keyCode.END:
                                s = this._valueMax();
                                break;
                            case t.ui.keyCode.PAGE_UP:
                                s = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / this.numPages);
                                break;
                            case t.ui.keyCode.PAGE_DOWN:
                                s = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / this.numPages);
                                break;
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.RIGHT:
                                if (n === this._valueMax()) return;
                                s = this._trimAlignValue(n + r);
                                break;
                            case t.ui.keyCode.DOWN:
                            case t.ui.keyCode.LEFT:
                                if (n === this._valueMin()) return;
                                s = this._trimAlignValue(n - r)
                        }
                        this._slide(e, a, s)
                    },
                    keyup: function(e) {
                        var i = t(e.target).data("ui-slider-handle-index");
                        this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"));
                    }
                }
            }), t.widget("ui.spinner", {
                version: "1.11.2",
                defaultElement: "<input>",
                widgetEventPrefix: "spin",
                options: {
                    culture: null,
                    icons: {
                        down: "ui-icon-triangle-1-s",
                        up: "ui-icon-triangle-1-n"
                    },
                    incremental: !0,
                    max: null,
                    min: null,
                    numberFormat: null,
                    page: 10,
                    step: 1,
                    change: null,
                    spin: null,
                    start: null,
                    stop: null
                },
                _create: function() {
                    this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                        beforeunload: function() {
                            this.element.removeAttr("autocomplete")
                        }
                    })
                },
                _getCreateOptions: function() {
                    var e = {},
                        i = this.element;
                    return t.each(["min", "max", "step"], function(t, n) {
                        var s = i.attr(n);
                        void 0 !== s && s.length && (e[n] = s)
                    }), e
                },
                _events: {
                    keydown: function(t) {
                        this._start(t) && this._keydown(t) && t.preventDefault()
                    },
                    keyup: "_stop",
                    focus: function() {
                        this.previous = this.element.val()
                    },
                    blur: function(t) {
                        return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void(this.previous !== this.element.val() && this._trigger("change", t)))
                    },
                    mousewheel: function(t, e) {
                        if (e) {
                            if (!this.spinning && !this._start(t)) return !1;
                            this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                                this.spinning && this._stop(t)
                            }, 100), t.preventDefault()
                        }
                    },
                    "mousedown .ui-spinner-button": function(e) {
                        function i() {
                            var t = this.element[0] === this.document[0].activeElement;
                            t || (this.element.focus(), this.previous = n, this._delay(function() {
                                this.previous = n
                            }))
                        }
                        var n;
                        n = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
                            delete this.cancelBlur, i.call(this)
                        }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
                    },
                    "mouseup .ui-spinner-button": "_stop",
                    "mouseenter .ui-spinner-button": function(e) {
                        return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : void this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e) : void 0
                    },
                    "mouseleave .ui-spinner-button": "_stop"
                },
                _draw: function() {
                    var t = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
                    this.element.attr("role", "spinbutton"), this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * t.height()) && t.height() > 0 && t.height(t.height()), this.options.disabled && this.disable()
                },
                _keydown: function(e) {
                    var i = this.options,
                        n = t.ui.keyCode;
                    switch (e.keyCode) {
                        case n.UP:
                            return this._repeat(null, 1, e), !0;
                        case n.DOWN:
                            return this._repeat(null, -1, e), !0;
                        case n.PAGE_UP:
                            return this._repeat(null, i.page, e), !0;
                        case n.PAGE_DOWN:
                            return this._repeat(null, -i.page, e), !0
                    }
                    return !1
                },
                _uiSpinnerHtml: function() {
                    return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
                },
                _buttonHtml: function() {
                    return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
                },
                _start: function(t) {
                    return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
                },
                _repeat: function(t, e, i) {
                    t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                        this._repeat(40, e, i)
                    }, t), this._spin(e * this.options.step, i)
                },
                _spin: function(t, e) {
                    var i = this.value() || 0;
                    this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, {
                        value: i
                    }) === !1 || (this._value(i), this.counter++)
                },
                _increment: function(e) {
                    var i = this.options.incremental;
                    return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
                },
                _precision: function() {
                    var t = this._precisionOf(this.options.step);
                    return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
                },
                _precisionOf: function(t) {
                    var e = "" + t,
                        i = e.indexOf(".");
                    return -1 === i ? 0 : e.length - i - 1
                },
                _adjustValue: function(t) {
                    var e, i, n = this.options;
                    return e = null !== n.min ? n.min : 0, i = t - e, i = Math.round(i / n.step) * n.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== n.max && t > n.max ? n.max : null !== n.min && n.min > t ? n.min : t
                },
                _stop: function(t) {
                    this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
                },
                _setOption: function(t, e) {
                    if ("culture" === t || "numberFormat" === t) {
                        var i = this._parse(this.element.val());
                        return this.options[t] = e, void this.element.val(this._format(i))
                    }("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)), this._super(t, e), "disabled" === t && (this.widget().toggleClass("ui-state-disabled", !!e), this.element.prop("disabled", !!e), this.buttons.button(e ? "disable" : "enable"))
                },
                _setOptions: l(function(t) {
                    this._super(t)
                }),
                _parse: function(t) {
                    return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
                },
                _format: function(t) {
                    return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
                },
                _refresh: function() {
                    this.element.attr({
                        "aria-valuemin": this.options.min,
                        "aria-valuemax": this.options.max,
                        "aria-valuenow": this._parse(this.element.val())
                    })
                },
                isValid: function() {
                    var t = this.value();
                    return null === t ? !1 : t === this._adjustValue(t)
                },
                _value: function(t, e) {
                    var i;
                    "" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh()
                },
                _destroy: function() {
                    this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
                },
                stepUp: l(function(t) {
                    this._stepUp(t)
                }),
                _stepUp: function(t) {
                    this._start() && (this._spin((t || 1) * this.options.step), this._stop())
                },
                stepDown: l(function(t) {
                    this._stepDown(t)
                }),
                _stepDown: function(t) {
                    this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
                },
                pageUp: l(function(t) {
                    this._stepUp((t || 1) * this.options.page)
                }),
                pageDown: l(function(t) {
                    this._stepDown((t || 1) * this.options.page)
                }),
                value: function(t) {
                    return arguments.length ? void l(this._value).call(this, t) : this._parse(this.element.val())
                },
                widget: function() {
                    return this.uiSpinner
                }
            }), t.widget("ui.tabs", {
                version: "1.11.2",
                delay: 300,
                options: {
                    active: null,
                    collapsible: !1,
                    event: "click",
                    heightStyle: "content",
                    hide: null,
                    show: null,
                    activate: null,
                    beforeActivate: null,
                    beforeLoad: null,
                    load: null
                },
                _isLocal: function() {
                    var t = /#.*$/;
                    return function(e) {
                        var i, n;
                        e = e.cloneNode(!1), i = e.href.replace(t, ""), n = location.href.replace(t, "");
                        try {
                            i = decodeURIComponent(i)
                        } catch (s) {}
                        try {
                            n = decodeURIComponent(n)
                        } catch (s) {}
                        return e.hash.length > 1 && i === n
                    }
                }(),
                _create: function() {
                    var e = this,
                        i = this.options;
                    this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                        return e.tabs.index(t)
                    }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active)
                },
                _initialActive: function() {
                    var e = this.options.active,
                        i = this.options.collapsible,
                        n = location.hash.substring(1);
                    return null === e && (n && this.tabs.each(function(i, s) {
                        return t(s).attr("aria-controls") === n ? (e = i, !1) : void 0
                    }), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)), e !== !1 && (e = this.tabs.index(this.tabs.eq(e)), -1 === e && (e = i ? !1 : 0)), !i && e === !1 && this.anchors.length && (e = 0), e
                },
                _getCreateEventData: function() {
                    return {
                        tab: this.active,
                        panel: this.active.length ? this._getPanelForTab(this.active) : t()
                    }
                },
                _tabKeydown: function(e) {
                    var i = t(this.document[0].activeElement).closest("li"),
                        n = this.tabs.index(i),
                        s = !0;
                    if (!this._handlePageNav(e)) {
                        switch (e.keyCode) {
                            case t.ui.keyCode.RIGHT:
                            case t.ui.keyCode.DOWN:
                                n++;
                                break;
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.LEFT:
                                s = !1, n--;
                                break;
                            case t.ui.keyCode.END:
                                n = this.anchors.length - 1;
                                break;
                            case t.ui.keyCode.HOME:
                                n = 0;
                                break;
                            case t.ui.keyCode.SPACE:
                                return e.preventDefault(), clearTimeout(this.activating), void this._activate(n);
                            case t.ui.keyCode.ENTER:
                                return e.preventDefault(), clearTimeout(this.activating), void this._activate(n === this.options.active ? !1 : n);
                            default:
                                return
                        }
                        e.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, s), e.ctrlKey || (i.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function() {
                            this.option("active", n)
                        }, this.delay))
                    }
                },
                _panelKeydown: function(e) {
                    this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
                },
                _handlePageNav: function(e) {
                    return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
                },
                _findNextTab: function(e, i) {
                    function n() {
                        return e > s && (e = 0), 0 > e && (e = s), e
                    }
                    for (var s = this.tabs.length - 1; - 1 !== t.inArray(n(), this.options.disabled);) e = i ? e + 1 : e - 1;
                    return e
                },
                _focusNextTab: function(t, e) {
                    return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t
                },
                _setOption: function(t, e) {
                    return "active" === t ? void this._activate(e) : "disabled" === t ? void this._setupDisabled(e) : (this._super(t, e), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", e), e || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(e), void("heightStyle" === t && this._setupHeightStyle(e)))
                },
                _sanitizeSelector: function(t) {
                    return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
                },
                refresh: function() {
                    var e = this.options,
                        i = this.tablist.children(":has(a[href])");
                    e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
                        return i.index(t)
                    }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
                },
                _refresh: function() {
                    this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                        "aria-selected": "false",
                        "aria-expanded": "false",
                        tabIndex: -1
                    }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                        "aria-hidden": "true"
                    }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                        "aria-selected": "true",
                        "aria-expanded": "true",
                        tabIndex: 0
                    }), this._getPanelForTab(this.active).show().attr({
                        "aria-hidden": "false"
                    })) : this.tabs.eq(0).attr("tabIndex", 0)
                },
                _processTabs: function() {
                    var e = this,
                        i = this.tabs,
                        n = this.anchors,
                        s = this.panels;
                    this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function(e) {
                        t(this).is(".ui-state-disabled") && e.preventDefault()
                    }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                        t(this).closest("li").is(".ui-state-disabled") && this.blur()
                    }), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                        role: "tab",
                        tabIndex: -1
                    }), this.anchors = this.tabs.map(function() {
                        return t("a", this)[0]
                    }).addClass("ui-tabs-anchor").attr({
                        role: "presentation",
                        tabIndex: -1
                    }), this.panels = t(), this.anchors.each(function(i, n) {
                        var s, r, a, o = t(n).uniqueId().attr("id"),
                            l = t(n).closest("li"),
                            h = l.attr("aria-controls");
                        e._isLocal(n) ? (s = n.hash, a = s.substring(1), r = e.element.find(e._sanitizeSelector(s))) : (a = l.attr("aria-controls") || t({}).uniqueId()[0].id, s = "#" + a, r = e.element.find(s), r.length || (r = e._createPanel(a), r.insertAfter(e.panels[i - 1] || e.tablist)), r.attr("aria-live", "polite")), r.length && (e.panels = e.panels.add(r)), h && l.data("ui-tabs-aria-controls", h), l.attr({
                            "aria-controls": a,
                            "aria-labelledby": o
                        }), r.attr("aria-labelledby", o)
                    }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), i && (this._off(i.not(this.tabs)), this._off(n.not(this.anchors)), this._off(s.not(this.panels)))
                },
                _getList: function() {
                    return this.tablist || this.element.find("ol,ul").eq(0)
                },
                _createPanel: function(e) {
                    return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
                },
                _setupDisabled: function(e) {
                    t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
                    for (var i, n = 0; i = this.tabs[n]; n++) e === !0 || -1 !== t.inArray(n, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
                    this.options.disabled = e
                },
                _setupEvents: function(e) {
                    var i = {};
                    e && t.each(e.split(" "), function(t, e) {
                        i[e] = "_eventHandler"
                    }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                        click: function(t) {
                            t.preventDefault()
                        }
                    }), this._on(this.anchors, i), this._on(this.tabs, {
                        keydown: "_tabKeydown"
                    }), this._on(this.panels, {
                        keydown: "_panelKeydown"
                    }), this._focusable(this.tabs), this._hoverable(this.tabs)
                },
                _setupHeightStyle: function(e) {
                    var i, n = this.element.parent();
                    "fill" === e ? (i = n.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                        var e = t(this),
                            n = e.css("position");
                        "absolute" !== n && "fixed" !== n && (i -= e.outerHeight(!0))
                    }), this.element.children().not(this.panels).each(function() {
                        i -= t(this).outerHeight(!0)
                    }), this.panels.each(function() {
                        t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
                    }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
                        i = Math.max(i, t(this).height("").height())
                    }).height(i))
                },
                _eventHandler: function(e) {
                    var i = this.options,
                        n = this.active,
                        s = t(e.currentTarget),
                        r = s.closest("li"),
                        a = r[0] === n[0],
                        o = a && i.collapsible,
                        l = o ? t() : this._getPanelForTab(r),
                        h = n.length ? this._getPanelForTab(n) : t(),
                        u = {
                            oldTab: n,
                            oldPanel: h,
                            newTab: o ? t() : r,
                            newPanel: l
                        };
                    e.preventDefault(), r.hasClass("ui-state-disabled") || r.hasClass("ui-tabs-loading") || this.running || a && !i.collapsible || this._trigger("beforeActivate", e, u) === !1 || (i.active = o ? !1 : this.tabs.index(r), this.active = a ? t() : r, this.xhr && this.xhr.abort(), h.length || l.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(r), e), this._toggle(e, u))
                },
                _toggle: function(e, i) {
                    function n() {
                        r.running = !1, r._trigger("activate", e, i)
                    }

                    function s() {
                        i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), a.length && r.options.show ? r._show(a, r.options.show, n) : (a.show(), n())
                    }
                    var r = this,
                        a = i.newPanel,
                        o = i.oldPanel;
                    this.running = !0, o.length && this.options.hide ? this._hide(o, this.options.hide, function() {
                        i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), s()
                    }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), o.hide(), s()), o.attr("aria-hidden", "true"), i.oldTab.attr({
                        "aria-selected": "false",
                        "aria-expanded": "false"
                    }), a.length && o.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function() {
                        return 0 === t(this).attr("tabIndex")
                    }).attr("tabIndex", -1), a.attr("aria-hidden", "false"), i.newTab.attr({
                        "aria-selected": "true",
                        "aria-expanded": "true",
                        tabIndex: 0
                    })
                },
                _activate: function(e) {
                    var i, n = this._findActive(e);
                    n[0] !== this.active[0] && (n.length || (n = this.active), i = n.find(".ui-tabs-anchor")[0], this._eventHandler({
                        target: i,
                        currentTarget: i,
                        preventDefault: t.noop
                    }))
                },
                _findActive: function(e) {
                    return e === !1 ? t() : this.tabs.eq(e)
                },
                _getIndex: function(t) {
                    return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
                },
                _destroy: function() {
                    this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function() {
                        t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                    }), this.tabs.each(function() {
                        var e = t(this),
                            i = e.data("ui-tabs-aria-controls");
                        i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
                    }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
                },
                enable: function(e) {
                    var i = this.options.disabled;
                    i !== !1 && (void 0 === e ? i = !1 : (e = this._getIndex(e), i = t.isArray(i) ? t.map(i, function(t) {
                        return t !== e ? t : null
                    }) : t.map(this.tabs, function(t, i) {
                        return i !== e ? i : null
                    })), this._setupDisabled(i))
                },
                disable: function(e) {
                    var i = this.options.disabled;
                    if (i !== !0) {
                        if (void 0 === e) i = !0;
                        else {
                            if (e = this._getIndex(e), -1 !== t.inArray(e, i)) return;
                            i = t.isArray(i) ? t.merge([e], i).sort() : [e]
                        }
                        this._setupDisabled(i)
                    }
                },
                load: function(e, i) {
                    e = this._getIndex(e);
                    var n = this,
                        s = this.tabs.eq(e),
                        r = s.find(".ui-tabs-anchor"),
                        a = this._getPanelForTab(s),
                        o = {
                            tab: s,
                            panel: a
                        };
                    this._isLocal(r[0]) || (this.xhr = t.ajax(this._ajaxSettings(r, i, o)), this.xhr && "canceled" !== this.xhr.statusText && (s.addClass("ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.success(function(t) {
                        setTimeout(function() {
                            a.html(t), n._trigger("load", i, o)
                        }, 1)
                    }).complete(function(t, e) {
                        setTimeout(function() {
                            "abort" === e && n.panels.stop(!1, !0), s.removeClass("ui-tabs-loading"), a.removeAttr("aria-busy"), t === n.xhr && delete n.xhr
                        }, 1)
                    })))
                },
                _ajaxSettings: function(e, i, n) {
                    var s = this;
                    return {
                        url: e.attr("href"),
                        beforeSend: function(e, r) {
                            return s._trigger("beforeLoad", i, t.extend({
                                jqXHR: e,
                                ajaxSettings: r
                            }, n))
                        }
                    }
                },
                _getPanelForTab: function(e) {
                    var i = t(e).attr("aria-controls");
                    return this.element.find(this._sanitizeSelector("#" + i))
                }
            }), t.widget("ui.tooltip", {
                version: "1.11.2",
                options: {
                    content: function() {
                        var e = t(this).attr("title") || "";
                        return t("<a>").text(e).html()
                    },
                    hide: !0,
                    items: "[title]:not([disabled])",
                    position: {
                        my: "left top+15",
                        at: "left bottom",
                        collision: "flipfit flip"
                    },
                    show: !0,
                    tooltipClass: null,
                    track: !1,
                    close: null,
                    open: null
                },
                _addDescribedBy: function(e, i) {
                    var n = (e.attr("aria-describedby") || "").split(/\s+/);
                    n.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(n.join(" ")))
                },
                _removeDescribedBy: function(e) {
                    var i = e.data("ui-tooltip-id"),
                        n = (e.attr("aria-describedby") || "").split(/\s+/),
                        s = t.inArray(i, n); - 1 !== s && n.splice(s, 1), e.removeData("ui-tooltip-id"), n = t.trim(n.join(" ")), n ? e.attr("aria-describedby", n) : e.removeAttr("aria-describedby")
                },
                _create: function() {
                    this._on({
                        mouseover: "open",
                        focusin: "open"
                    }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable(), this.liveRegion = t("<div>").attr({
                        role: "log",
                        "aria-live": "assertive",
                        "aria-relevant": "additions"
                    }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
                },
                _setOption: function(e, i) {
                    var n = this;
                    return "disabled" === e ? (this[i ? "_disable" : "_enable"](), void(this.options[e] = i)) : (this._super(e, i), void("content" === e && t.each(this.tooltips, function(t, e) {
                        n._updateContent(e.element)
                    })))
                },
                _disable: function() {
                    var e = this;
                    t.each(this.tooltips, function(i, n) {
                        var s = t.Event("blur");
                        s.target = s.currentTarget = n.element[0], e.close(s, !0)
                    }), this.element.find(this.options.items).addBack().each(function() {
                        var e = t(this);
                        e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).removeAttr("title")
                    })
                },
                _enable: function() {
                    this.element.find(this.options.items).addBack().each(function() {
                        var e = t(this);
                        e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
                    })
                },
                open: function(e) {
                    var i = this,
                        n = t(e ? e.target : this.element).closest(this.options.items);
                    n.length && !n.data("ui-tooltip-id") && (n.attr("title") && n.data("ui-tooltip-title", n.attr("title")), n.data("ui-tooltip-open", !0), e && "mouseover" === e.type && n.parents().each(function() {
                        var e, n = t(this);
                        n.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), n.attr("title") && (n.uniqueId(), i.parents[this.id] = {
                            element: this,
                            title: n.attr("title")
                        }, n.attr("title", ""))
                    }), this._updateContent(n, e))
                },
                _updateContent: function(t, e) {
                    var i, n = this.options.content,
                        s = this,
                        r = e ? e.type : null;
                    return "string" == typeof n ? this._open(e, t, n) : (i = n.call(t[0], function(i) {
                        t.data("ui-tooltip-open") && s._delay(function() {
                            e && (e.type = r), this._open(e, t, i)
                        })
                    }), void(i && this._open(e, t, i)))
                },
                _open: function(e, i, n) {
                    function s(t) {
                        u.of = t, a.is(":hidden") || a.position(u)
                    }
                    var r, a, o, l, h, u = t.extend({}, this.options.position);
                    if (n) {
                        if (r = this._find(i)) return void r.tooltip.find(".ui-tooltip-content").html(n);
                        i.is("[title]") && (e && "mouseover" === e.type ? i.attr("title", "") : i.removeAttr("title")), r = this._tooltip(i), a = r.tooltip, this._addDescribedBy(i, a.attr("id")), a.find(".ui-tooltip-content").html(n), this.liveRegion.children().hide(), n.clone ? (h = n.clone(), h.removeAttr("id").find("[id]").removeAttr("id")) : h = n, t("<div>").html(h).appendTo(this.liveRegion), this.options.track && e && /^mouse/.test(e.type) ? (this._on(this.document, {
                            mousemove: s
                        }), s(e)) : a.position(t.extend({ of: i
                        }, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.show && this.options.show.delay && (l = this.delayedShow = setInterval(function() {
                            a.is(":visible") && (s(u.of), clearInterval(l))
                        }, t.fx.interval)), this._trigger("open", e, {
                            tooltip: a
                        }), o = {
                            keyup: function(e) {
                                if (e.keyCode === t.ui.keyCode.ESCAPE) {
                                    var n = t.Event(e);
                                    n.currentTarget = i[0], this.close(n, !0)
                                }
                            }
                        }, i[0] !== this.element[0] && (o.remove = function() {
                            this._removeTooltip(a)
                        }), e && "mouseover" !== e.type || (o.mouseleave = "close"), e && "focusin" !== e.type || (o.focusout = "close"), this._on(!0, i, o)
                    }
                },
                close: function(e) {
                    var i, n = this,
                        s = t(e ? e.currentTarget : this.element),
                        r = this._find(s);
                    r && (i = r.tooltip, r.closing || (clearInterval(this.delayedShow), s.data("ui-tooltip-title") && !s.attr("title") && s.attr("title", s.data("ui-tooltip-title")), this._removeDescribedBy(s), r.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function() {
                        n._removeTooltip(t(this))
                    }), s.removeData("ui-tooltip-open"), this._off(s, "mouseleave focusout keyup"), s[0] !== this.element[0] && this._off(s, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function(e, i) {
                        t(i.element).attr("title", i.title), delete n.parents[e]
                    }), r.closing = !0, this._trigger("close", e, {
                        tooltip: i
                    }), r.hiding || (r.closing = !1)))
                },
                _tooltip: function(e) {
                    var i = t("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
                        n = i.uniqueId().attr("id");
                    return t("<div>").addClass("ui-tooltip-content").appendTo(i), i.appendTo(this.document[0].body), this.tooltips[n] = {
                        element: e,
                        tooltip: i
                    }
                },
                _find: function(t) {
                    var e = t.data("ui-tooltip-id");
                    return e ? this.tooltips[e] : null
                },
                _removeTooltip: function(t) {
                    t.remove(), delete this.tooltips[t.attr("id")]
                },
                _destroy: function() {
                    var e = this;
                    t.each(this.tooltips, function(i, n) {
                        var s = t.Event("blur"),
                            r = n.element;
                        s.target = s.currentTarget = r[0], e.close(s, !0), t("#" + i).remove(), r.data("ui-tooltip-title") && (r.attr("title") || r.attr("title", r.data("ui-tooltip-title")), r.removeData("ui-tooltip-title"))
                    }), this.liveRegion.remove()
                }
            });
            var y = "ui-effects-",
                b = t;
            t.effects = {
                    effect: {}
                },
                function(t, e) {
                    function i(t, e, i) {
                        var n = c[e.type] || {};
                        return null == t ? i || !e.def ? null : e.def : (t = n.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : n.mod ? (t + n.mod) % n.mod : 0 > t ? 0 : t > n.max ? n.max : t)
                    }

                    function n(i) {
                        var n = h(),
                            s = n._rgba = [];
                        return i = i.toLowerCase(), f(l, function(t, r) {
                            var a, o = r.re.exec(i),
                                l = o && r.parse(o),
                                h = r.space || "rgba";
                            return l ? (a = n[h](l), n[u[h].cache] = a[u[h].cache], s = n._rgba = a._rgba, !1) : e
                        }), s.length ? ("0,0,0,0" === s.join() && t.extend(s, r.transparent), n) : r[i]
                    }

                    function s(t, e, i) {
                        return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
                    }
                    var r, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                        o = /^([\-+])=\s*(\d+\.?\d*)/,
                        l = [{
                            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                            parse: function(t) {
                                return [t[1], t[2], t[3], t[4]]
                            }
                        }, {
                            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                            parse: function(t) {
                                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                            }
                        }, {
                            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                            parse: function(t) {
                                return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                            }
                        }, {
                            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                            parse: function(t) {
                                return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                            }
                        }, {
                            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                            space: "hsla",
                            parse: function(t) {
                                return [t[1], t[2] / 100, t[3] / 100, t[4]]
                            }
                        }],
                        h = t.Color = function(e, i, n, s) {
                            return new t.Color.fn.parse(e, i, n, s)
                        },
                        u = {
                            rgba: {
                                props: {
                                    red: {
                                        idx: 0,
                                        type: "byte"
                                    },
                                    green: {
                                        idx: 1,
                                        type: "byte"
                                    },
                                    blue: {
                                        idx: 2,
                                        type: "byte"
                                    }
                                }
                            },
                            hsla: {
                                props: {
                                    hue: {
                                        idx: 0,
                                        type: "degrees"
                                    },
                                    saturation: {
                                        idx: 1,
                                        type: "percent"
                                    },
                                    lightness: {
                                        idx: 2,
                                        type: "percent"
                                    }
                                }
                            }
                        },
                        c = {
                            "byte": {
                                floor: !0,
                                max: 255
                            },
                            percent: {
                                max: 1
                            },
                            degrees: {
                                mod: 360,
                                floor: !0
                            }
                        },
                        d = h.support = {},
                        p = t("<p>")[0],
                        f = t.each;
                    p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(u, function(t, e) {
                        e.cache = "_" + t, e.props.alpha = {
                            idx: 3,
                            type: "percent",
                            def: 1
                        }
                    }), h.fn = t.extend(h.prototype, {
                        parse: function(s, a, o, l) {
                            if (s === e) return this._rgba = [null, null, null, null], this;
                            (s.jquery || s.nodeType) && (s = t(s).css(a), a = e);
                            var c = this,
                                d = t.type(s),
                                p = this._rgba = [];
                            return a !== e && (s = [s, a, o, l], d = "array"), "string" === d ? this.parse(n(s) || r._default) : "array" === d ? (f(u.rgba.props, function(t, e) {
                                p[e.idx] = i(s[e.idx], e)
                            }), this) : "object" === d ? (s instanceof h ? f(u, function(t, e) {
                                s[e.cache] && (c[e.cache] = s[e.cache].slice())
                            }) : f(u, function(e, n) {
                                var r = n.cache;
                                f(n.props, function(t, e) {
                                    if (!c[r] && n.to) {
                                        if ("alpha" === t || null == s[t]) return;
                                        c[r] = n.to(c._rgba)
                                    }
                                    c[r][e.idx] = i(s[t], e, !0)
                                }), c[r] && 0 > t.inArray(null, c[r].slice(0, 3)) && (c[r][3] = 1, n.from && (c._rgba = n.from(c[r])))
                            }), this) : e
                        },
                        is: function(t) {
                            var i = h(t),
                                n = !0,
                                s = this;
                            return f(u, function(t, r) {
                                var a, o = i[r.cache];
                                return o && (a = s[r.cache] || r.to && r.to(s._rgba) || [], f(r.props, function(t, i) {
                                    return null != o[i.idx] ? n = o[i.idx] === a[i.idx] : e
                                })), n
                            }), n
                        },
                        _space: function() {
                            var t = [],
                                e = this;
                            return f(u, function(i, n) {
                                e[n.cache] && t.push(i)
                            }), t.pop()
                        },
                        transition: function(t, e) {
                            var n = h(t),
                                s = n._space(),
                                r = u[s],
                                a = 0 === this.alpha() ? h("transparent") : this,
                                o = a[r.cache] || r.to(a._rgba),
                                l = o.slice();
                            return n = n[r.cache], f(r.props, function(t, s) {
                                var r = s.idx,
                                    a = o[r],
                                    h = n[r],
                                    u = c[s.type] || {};
                                null !== h && (null === a ? l[r] = h : (u.mod && (h - a > u.mod / 2 ? a += u.mod : a - h > u.mod / 2 && (a -= u.mod)), l[r] = i((h - a) * e + a, s)))
                            }), this[s](l)
                        },
                        blend: function(e) {
                            if (1 === this._rgba[3]) return this;
                            var i = this._rgba.slice(),
                                n = i.pop(),
                                s = h(e)._rgba;
                            return h(t.map(i, function(t, e) {
                                return (1 - n) * s[e] + n * t
                            }))
                        },
                        toRgbaString: function() {
                            var e = "rgba(",
                                i = t.map(this._rgba, function(t, e) {
                                    return null == t ? e > 2 ? 1 : 0 : t
                                });
                            return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
                        },
                        toHslaString: function() {
                            var e = "hsla(",
                                i = t.map(this.hsla(), function(t, e) {
                                    return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
                                });
                            return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
                        },
                        toHexString: function(e) {
                            var i = this._rgba.slice(),
                                n = i.pop();
                            return e && i.push(~~(255 * n)), "#" + t.map(i, function(t) {
                                return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                            }).join("")
                        },
                        toString: function() {
                            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                        }
                    }), h.fn.parse.prototype = h.fn, u.hsla.to = function(t) {
                        if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                        var e, i, n = t[0] / 255,
                            s = t[1] / 255,
                            r = t[2] / 255,
                            a = t[3],
                            o = Math.max(n, s, r),
                            l = Math.min(n, s, r),
                            h = o - l,
                            u = o + l,
                            c = .5 * u;
                        return e = l === o ? 0 : n === o ? 60 * (s - r) / h + 360 : s === o ? 60 * (r - n) / h + 120 : 60 * (n - s) / h + 240, i = 0 === h ? 0 : .5 >= c ? h / u : h / (2 - u), [Math.round(e) % 360, i, c, null == a ? 1 : a]
                    }, u.hsla.from = function(t) {
                        if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                        var e = t[0] / 360,
                            i = t[1],
                            n = t[2],
                            r = t[3],
                            a = .5 >= n ? n * (1 + i) : n + i - n * i,
                            o = 2 * n - a;
                        return [Math.round(255 * s(o, a, e + 1 / 3)), Math.round(255 * s(o, a, e)), Math.round(255 * s(o, a, e - 1 / 3)), r]
                    }, f(u, function(n, s) {
                        var r = s.props,
                            a = s.cache,
                            l = s.to,
                            u = s.from;
                        h.fn[n] = function(n) {
                            if (l && !this[a] && (this[a] = l(this._rgba)), n === e) return this[a].slice();
                            var s, o = t.type(n),
                                c = "array" === o || "object" === o ? n : arguments,
                                d = this[a].slice();
                            return f(r, function(t, e) {
                                var n = c["object" === o ? t : e.idx];
                                null == n && (n = d[e.idx]), d[e.idx] = i(n, e)
                            }), u ? (s = h(u(d)), s[a] = d, s) : h(d)
                        }, f(r, function(e, i) {
                            h.fn[e] || (h.fn[e] = function(s) {
                                var r, a = t.type(s),
                                    l = "alpha" === e ? this._hsla ? "hsla" : "rgba" : n,
                                    h = this[l](),
                                    u = h[i.idx];
                                return "undefined" === a ? u : ("function" === a && (s = s.call(this, u), a = t.type(s)), null == s && i.empty ? this : ("string" === a && (r = o.exec(s), r && (s = u + parseFloat(r[2]) * ("+" === r[1] ? 1 : -1))), h[i.idx] = s, this[l](h)))
                            })
                        })
                    }), h.hook = function(e) {
                        var i = e.split(" ");
                        f(i, function(e, i) {
                            t.cssHooks[i] = {
                                set: function(e, s) {
                                    var r, a, o = "";
                                    if ("transparent" !== s && ("string" !== t.type(s) || (r = n(s)))) {
                                        if (s = h(r || s), !d.rgba && 1 !== s._rgba[3]) {
                                            for (a = "backgroundColor" === i ? e.parentNode : e;
                                                ("" === o || "transparent" === o) && a && a.style;) try {
                                                o = t.css(a, "backgroundColor"), a = a.parentNode
                                            } catch (l) {}
                                            s = s.blend(o && "transparent" !== o ? o : "_default")
                                        }
                                        s = s.toRgbaString()
                                    }
                                    try {
                                        e.style[i] = s
                                    } catch (l) {}
                                }
                            }, t.fx.step[i] = function(e) {
                                e.colorInit || (e.start = h(e.elem, i), e.end = h(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                            }
                        })
                    }, h.hook(a), t.cssHooks.borderColor = {
                        expand: function(t) {
                            var e = {};
                            return f(["Top", "Right", "Bottom", "Left"], function(i, n) {
                                e["border" + n + "Color"] = t
                            }), e
                        }
                    }, r = t.Color.names = {
                        aqua: "#00ffff",
                        black: "#000000",
                        blue: "#0000ff",
                        fuchsia: "#ff00ff",
                        gray: "#808080",
                        green: "#008000",
                        lime: "#00ff00",
                        maroon: "#800000",
                        navy: "#000080",
                        olive: "#808000",
                        purple: "#800080",
                        red: "#ff0000",
                        silver: "#c0c0c0",
                        teal: "#008080",
                        white: "#ffffff",
                        yellow: "#ffff00",
                        transparent: [null, null, null, 0],
                        _default: "#ffffff"
                    }
                }(b),
                function() {
                    function e(e) {
                        var i, n, s = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                            r = {};
                        if (s && s.length && s[0] && s[s[0]])
                            for (n = s.length; n--;) i = s[n], "string" == typeof s[i] && (r[t.camelCase(i)] = s[i]);
                        else
                            for (i in s) "string" == typeof s[i] && (r[i] = s[i]);
                        return r
                    }

                    function i(e, i) {
                        var n, r, a = {};
                        for (n in i) r = i[n], e[n] !== r && (s[n] || (t.fx.step[n] || !isNaN(parseFloat(r))) && (a[n] = r));
                        return a
                    }
                    var n = ["add", "remove", "toggle"],
                        s = {
                            border: 1,
                            borderBottom: 1,
                            borderColor: 1,
                            borderLeft: 1,
                            borderRight: 1,
                            borderTop: 1,
                            borderWidth: 1,
                            margin: 1,
                            padding: 1
                        };
                    t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
                        t.fx.step[i] = function(t) {
                            ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (b.style(t.elem, i, t.end), t.setAttr = !0)
                        }
                    }), t.fn.addBack || (t.fn.addBack = function(t) {
                        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                    }), t.effects.animateClass = function(s, r, a, o) {
                        var l = t.speed(r, a, o);
                        return this.queue(function() {
                            var r, a = t(this),
                                o = a.attr("class") || "",
                                h = l.children ? a.find("*").addBack() : a;
                            h = h.map(function() {
                                var i = t(this);
                                return {
                                    el: i,
                                    start: e(this)
                                }
                            }), r = function() {
                                t.each(n, function(t, e) {
                                    s[e] && a[e + "Class"](s[e])
                                })
                            }, r(), h = h.map(function() {
                                return this.end = e(this.el[0]), this.diff = i(this.start, this.end), this
                            }), a.attr("class", o), h = h.map(function() {
                                var e = this,
                                    i = t.Deferred(),
                                    n = t.extend({}, l, {
                                        queue: !1,
                                        complete: function() {
                                            i.resolve(e)
                                        }
                                    });
                                return this.el.animate(this.diff, n), i.promise()
                            }), t.when.apply(t, h.get()).done(function() {
                                r(), t.each(arguments, function() {
                                    var e = this.el;
                                    t.each(this.diff, function(t) {
                                        e.css(t, "")
                                    })
                                }), l.complete.call(a[0])
                            })
                        })
                    }, t.fn.extend({
                        addClass: function(e) {
                            return function(i, n, s, r) {
                                return n ? t.effects.animateClass.call(this, {
                                    add: i
                                }, n, s, r) : e.apply(this, arguments)
                            }
                        }(t.fn.addClass),
                        removeClass: function(e) {
                            return function(i, n, s, r) {
                                return arguments.length > 1 ? t.effects.animateClass.call(this, {
                                    remove: i
                                }, n, s, r) : e.apply(this, arguments)
                            }
                        }(t.fn.removeClass),
                        toggleClass: function(e) {
                            return function(i, n, s, r, a) {
                                return "boolean" == typeof n || void 0 === n ? s ? t.effects.animateClass.call(this, n ? {
                                    add: i
                                } : {
                                    remove: i
                                }, s, r, a) : e.apply(this, arguments) : t.effects.animateClass.call(this, {
                                    toggle: i
                                }, n, s, r)
                            }
                        }(t.fn.toggleClass),
                        switchClass: function(e, i, n, s, r) {
                            return t.effects.animateClass.call(this, {
                                add: i,
                                remove: e
                            }, n, s, r)
                        }
                    })
                }(),
                function() {
                    function e(e, i, n, s) {
                        return t.isPlainObject(e) && (i = e, e = e.effect), e = {
                            effect: e
                        }, null == i && (i = {}), t.isFunction(i) && (s = i, n = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (s = n, n = i, i = {}), t.isFunction(n) && (s = n, n = null), i && t.extend(e, i), n = n || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof n ? n : n in t.fx.speeds ? t.fx.speeds[n] : t.fx.speeds._default, e.complete = s || i.complete, e
                    }

                    function i(e) {
                        return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
                    }
                    t.extend(t.effects, {
                        version: "1.11.2",
                        save: function(t, e) {
                            for (var i = 0; e.length > i; i++) null !== e[i] && t.data(y + e[i], t[0].style[e[i]])
                        },
                        restore: function(t, e) {
                            var i, n;
                            for (n = 0; e.length > n; n++) null !== e[n] && (i = t.data(y + e[n]), void 0 === i && (i = ""), t.css(e[n], i))
                        },
                        setMode: function(t, e) {
                            return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
                        },
                        getBaseline: function(t, e) {
                            var i, n;
                            switch (t[0]) {
                                case "top":
                                    i = 0;
                                    break;
                                case "middle":
                                    i = .5;
                                    break;
                                case "bottom":
                                    i = 1;
                                    break;
                                default:
                                    i = t[0] / e.height
                            }
                            switch (t[1]) {
                                case "left":
                                    n = 0;
                                    break;
                                case "center":
                                    n = .5;
                                    break;
                                case "right":
                                    n = 1;
                                    break;
                                default:
                                    n = t[1] / e.width
                            }
                            return {
                                x: n,
                                y: i
                            }
                        },
                        createWrapper: function(e) {
                            if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                            var i = {
                                    width: e.outerWidth(!0),
                                    height: e.outerHeight(!0),
                                    "float": e.css("float")
                                },
                                n = t("<div></div>").addClass("ui-effects-wrapper").css({
                                    fontSize: "100%",
                                    background: "transparent",
                                    border: "none",
                                    margin: 0,
                                    padding: 0
                                }),
                                s = {
                                    width: e.width(),
                                    height: e.height()
                                },
                                r = document.activeElement;
                            try {
                                r.id
                            } catch (a) {
                                r = document.body
                            }
                            return e.wrap(n), (e[0] === r || t.contains(e[0], r)) && t(r).focus(), n = e.parent(), "static" === e.css("position") ? (n.css({
                                position: "relative"
                            }), e.css({
                                position: "relative"
                            })) : (t.extend(i, {
                                position: e.css("position"),
                                zIndex: e.css("z-index")
                            }), t.each(["top", "left", "bottom", "right"], function(t, n) {
                                i[n] = e.css(n), isNaN(parseInt(i[n], 10)) && (i[n] = "auto")
                            }), e.css({
                                position: "relative",
                                top: 0,
                                left: 0,
                                right: "auto",
                                bottom: "auto"
                            })), e.css(s), n.css(i).show()
                        },
                        removeWrapper: function(e) {
                            var i = document.activeElement;
                            return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
                        },
                        setTransition: function(e, i, n, s) {
                            return s = s || {}, t.each(i, function(t, i) {
                                var r = e.cssUnit(i);
                                r[0] > 0 && (s[i] = r[0] * n + r[1])
                            }), s
                        }
                    }), t.fn.extend({
                        effect: function() {
                            function i(e) {
                                function i() {
                                    t.isFunction(r) && r.call(s[0]), t.isFunction(e) && e()
                                }
                                var s = t(this),
                                    r = n.complete,
                                    o = n.mode;
                                (s.is(":hidden") ? "hide" === o : "show" === o) ? (s[o](), i()) : a.call(s[0], n, i)
                            }
                            var n = e.apply(this, arguments),
                                s = n.mode,
                                r = n.queue,
                                a = t.effects.effect[n.effect];
                            return t.fx.off || !a ? s ? this[s](n.duration, n.complete) : this.each(function() {
                                n.complete && n.complete.call(this)
                            }) : r === !1 ? this.each(i) : this.queue(r || "fx", i)
                        },
                        show: function(t) {
                            return function(n) {
                                if (i(n)) return t.apply(this, arguments);
                                var s = e.apply(this, arguments);
                                return s.mode = "show", this.effect.call(this, s)
                            }
                        }(t.fn.show),
                        hide: function(t) {
                            return function(n) {
                                if (i(n)) return t.apply(this, arguments);
                                var s = e.apply(this, arguments);
                                return s.mode = "hide", this.effect.call(this, s)
                            }
                        }(t.fn.hide),
                        toggle: function(t) {
                            return function(n) {
                                if (i(n) || "boolean" == typeof n) return t.apply(this, arguments);
                                var s = e.apply(this, arguments);
                                return s.mode = "toggle", this.effect.call(this, s)
                            }
                        }(t.fn.toggle),
                        cssUnit: function(e) {
                            var i = this.css(e),
                                n = [];
                            return t.each(["em", "px", "%", "pt"], function(t, e) {
                                i.indexOf(e) > 0 && (n = [parseFloat(i), e])
                            }), n
                        }
                    })
                }(),
                function() {
                    var e = {};
                    t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
                        e[i] = function(e) {
                            return Math.pow(e, t + 2)
                        }
                    }), t.extend(e, {
                        Sine: function(t) {
                            return 1 - Math.cos(t * Math.PI / 2)
                        },
                        Circ: function(t) {
                            return 1 - Math.sqrt(1 - t * t)
                        },
                        Elastic: function(t) {
                            return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
                        },
                        Back: function(t) {
                            return t * t * (3 * t - 2)
                        },
                        Bounce: function(t) {
                            for (var e, i = 4;
                                ((e = Math.pow(2, --i)) - 1) / 11 > t;);
                            return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                        }
                    }), t.each(e, function(e, i) {
                        t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
                            return 1 - i(1 - t)
                        }, t.easing["easeInOut" + e] = function(t) {
                            return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
                        }
                    })
                }(), t.effects, t.effects.effect.blind = function(e, i) {
                    var n, s, r, a = t(this),
                        o = /up|down|vertical/,
                        l = /up|left|vertical|horizontal/,
                        h = ["position", "top", "bottom", "left", "right", "height", "width"],
                        u = t.effects.setMode(a, e.mode || "hide"),
                        c = e.direction || "up",
                        d = o.test(c),
                        p = d ? "height" : "width",
                        f = d ? "top" : "left",
                        g = l.test(c),
                        m = {},
                        v = "show" === u;
                    a.parent().is(".ui-effects-wrapper") ? t.effects.save(a.parent(), h) : t.effects.save(a, h), a.show(), n = t.effects.createWrapper(a).css({
                        overflow: "hidden"
                    }), s = n[p](), r = parseFloat(n.css(f)) || 0, m[p] = v ? s : 0, g || (a.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({
                        position: "absolute"
                    }), m[f] = v ? r : s + r), v && (n.css(p, 0), g || n.css(f, r + s)), n.animate(m, {
                        duration: e.duration,
                        easing: e.easing,
                        queue: !1,
                        complete: function() {
                            "hide" === u && a.hide(), t.effects.restore(a, h), t.effects.removeWrapper(a), i()
                        }
                    })
                }, t.effects.effect.bounce = function(e, i) {
                    var n, s, r, a = t(this),
                        o = ["position", "top", "bottom", "left", "right", "height", "width"],
                        l = t.effects.setMode(a, e.mode || "effect"),
                        h = "hide" === l,
                        u = "show" === l,
                        c = e.direction || "up",
                        d = e.distance,
                        p = e.times || 5,
                        f = 2 * p + (u || h ? 1 : 0),
                        g = e.duration / f,
                        m = e.easing,
                        v = "up" === c || "down" === c ? "top" : "left",
                        y = "up" === c || "left" === c,
                        b = a.queue(),
                        _ = b.length;
                    for ((u || h) && o.push("opacity"), t.effects.save(a, o), a.show(), t.effects.createWrapper(a), d || (d = a["top" === v ? "outerHeight" : "outerWidth"]() / 3), u && (r = {
                            opacity: 1
                        }, r[v] = 0, a.css("opacity", 0).css(v, y ? 2 * -d : 2 * d).animate(r, g, m)), h && (d /= Math.pow(2, p - 1)), r = {}, r[v] = 0, n = 0; p > n; n++) s = {}, s[v] = (y ? "-=" : "+=") + d, a.animate(s, g, m).animate(r, g, m), d = h ? 2 * d : d / 2;
                    h && (s = {
                        opacity: 0
                    }, s[v] = (y ? "-=" : "+=") + d, a.animate(s, g, m)), a.queue(function() {
                        h && a.hide(), t.effects.restore(a, o), t.effects.removeWrapper(a), i()
                    }), _ > 1 && b.splice.apply(b, [1, 0].concat(b.splice(_, f + 1))), a.dequeue()
                }, t.effects.effect.clip = function(e, i) {
                    var n, s, r, a = t(this),
                        o = ["position", "top", "bottom", "left", "right", "height", "width"],
                        l = t.effects.setMode(a, e.mode || "hide"),
                        h = "show" === l,
                        u = e.direction || "vertical",
                        c = "vertical" === u,
                        d = c ? "height" : "width",
                        p = c ? "top" : "left",
                        f = {};
                    t.effects.save(a, o), a.show(), n = t.effects.createWrapper(a).css({
                        overflow: "hidden"
                    }), s = "IMG" === a[0].tagName ? n : a, r = s[d](), h && (s.css(d, 0), s.css(p, r / 2)), f[d] = h ? r : 0, f[p] = h ? 0 : r / 2, s.animate(f, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.easing,
                        complete: function() {
                            h || a.hide(), t.effects.restore(a, o), t.effects.removeWrapper(a), i()
                        }
                    })
                }, t.effects.effect.drop = function(e, i) {
                    var n, s = t(this),
                        r = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                        a = t.effects.setMode(s, e.mode || "hide"),
                        o = "show" === a,
                        l = e.direction || "left",
                        h = "up" === l || "down" === l ? "top" : "left",
                        u = "up" === l || "left" === l ? "pos" : "neg",
                        c = {
                            opacity: o ? 1 : 0
                        };
                    t.effects.save(s, r), s.show(), t.effects.createWrapper(s), n = e.distance || s["top" === h ? "outerHeight" : "outerWidth"](!0) / 2, o && s.css("opacity", 0).css(h, "pos" === u ? -n : n), c[h] = (o ? "pos" === u ? "+=" : "-=" : "pos" === u ? "-=" : "+=") + n, s.animate(c, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.easing,
                        complete: function() {
                            "hide" === a && s.hide(), t.effects.restore(s, r), t.effects.removeWrapper(s), i()
                        }
                    })
                }, t.effects.effect.explode = function(e, i) {
                    function n() {
                        b.push(this), b.length === c * d && s()
                    }

                    function s() {
                        p.css({
                            visibility: "visible"
                        }), t(b).remove(), g || p.hide(), i()
                    }
                    var r, a, o, l, h, u, c = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
                        d = c,
                        p = t(this),
                        f = t.effects.setMode(p, e.mode || "hide"),
                        g = "show" === f,
                        m = p.show().css("visibility", "hidden").offset(),
                        v = Math.ceil(p.outerWidth() / d),
                        y = Math.ceil(p.outerHeight() / c),
                        b = [];
                    for (r = 0; c > r; r++)
                        for (l = m.top + r * y, u = r - (c - 1) / 2, a = 0; d > a; a++) o = m.left + a * v, h = a - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
                            position: "absolute",
                            visibility: "visible",
                            left: -a * v,
                            top: -r * y
                        }).parent().addClass("ui-effects-explode").css({
                            position: "absolute",
                            overflow: "hidden",
                            width: v,
                            height: y,
                            left: o + (g ? h * v : 0),
                            top: l + (g ? u * y : 0),
                            opacity: g ? 0 : 1
                        }).animate({
                            left: o + (g ? 0 : h * v),
                            top: l + (g ? 0 : u * y),
                            opacity: g ? 1 : 0
                        }, e.duration || 500, e.easing, n)
                }, t.effects.effect.fade = function(e, i) {
                    var n = t(this),
                        s = t.effects.setMode(n, e.mode || "toggle");
                    n.animate({
                        opacity: s
                    }, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.easing,
                        complete: i
                    })
                }, t.effects.effect.fold = function(e, i) {
                    var n, s, r = t(this),
                        a = ["position", "top", "bottom", "left", "right", "height", "width"],
                        o = t.effects.setMode(r, e.mode || "hide"),
                        l = "show" === o,
                        h = "hide" === o,
                        u = e.size || 15,
                        c = /([0-9]+)%/.exec(u),
                        d = !!e.horizFirst,
                        p = l !== d,
                        f = p ? ["width", "height"] : ["height", "width"],
                        g = e.duration / 2,
                        m = {},
                        v = {};
                    t.effects.save(r, a), r.show(), n = t.effects.createWrapper(r).css({
                        overflow: "hidden"
                    }), s = p ? [n.width(), n.height()] : [n.height(), n.width()], c && (u = parseInt(c[1], 10) / 100 * s[h ? 0 : 1]), l && n.css(d ? {
                        height: 0,
                        width: u
                    } : {
                        height: u,
                        width: 0
                    }), m[f[0]] = l ? s[0] : u, v[f[1]] = l ? s[1] : 0, n.animate(m, g, e.easing).animate(v, g, e.easing, function() {
                        h && r.hide(), t.effects.restore(r, a), t.effects.removeWrapper(r), i()
                    })
                }, t.effects.effect.highlight = function(e, i) {
                    var n = t(this),
                        s = ["backgroundImage", "backgroundColor", "opacity"],
                        r = t.effects.setMode(n, e.mode || "show"),
                        a = {
                            backgroundColor: n.css("backgroundColor")
                        };
                    "hide" === r && (a.opacity = 0), t.effects.save(n, s), n.show().css({
                        backgroundImage: "none",
                        backgroundColor: e.color || "#ffff99"
                    }).animate(a, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.easing,
                        complete: function() {
                            "hide" === r && n.hide(), t.effects.restore(n, s), i()
                        }
                    })
                }, t.effects.effect.size = function(e, i) {
                    var n, s, r, a = t(this),
                        o = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                        l = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                        h = ["width", "height", "overflow"],
                        u = ["fontSize"],
                        c = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                        d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                        p = t.effects.setMode(a, e.mode || "effect"),
                        f = e.restore || "effect" !== p,
                        g = e.scale || "both",
                        m = e.origin || ["middle", "center"],
                        v = a.css("position"),
                        y = f ? o : l,
                        b = {
                            height: 0,
                            width: 0,
                            outerHeight: 0,
                            outerWidth: 0
                        };
                    "show" === p && a.show(), n = {
                        height: a.height(),
                        width: a.width(),
                        outerHeight: a.outerHeight(),
                        outerWidth: a.outerWidth()
                    }, "toggle" === e.mode && "show" === p ? (a.from = e.to || b, a.to = e.from || n) : (a.from = e.from || ("show" === p ? b : n), a.to = e.to || ("hide" === p ? b : n)), r = {
                        from: {
                            y: a.from.height / n.height,
                            x: a.from.width / n.width
                        },
                        to: {
                            y: a.to.height / n.height,
                            x: a.to.width / n.width
                        }
                    }, ("box" === g || "both" === g) && (r.from.y !== r.to.y && (y = y.concat(c), a.from = t.effects.setTransition(a, c, r.from.y, a.from), a.to = t.effects.setTransition(a, c, r.to.y, a.to)), r.from.x !== r.to.x && (y = y.concat(d), a.from = t.effects.setTransition(a, d, r.from.x, a.from), a.to = t.effects.setTransition(a, d, r.to.x, a.to))), ("content" === g || "both" === g) && r.from.y !== r.to.y && (y = y.concat(u).concat(h), a.from = t.effects.setTransition(a, u, r.from.y, a.from), a.to = t.effects.setTransition(a, u, r.to.y, a.to)), t.effects.save(a, y), a.show(), t.effects.createWrapper(a), a.css("overflow", "hidden").css(a.from), m && (s = t.effects.getBaseline(m, n), a.from.top = (n.outerHeight - a.outerHeight()) * s.y, a.from.left = (n.outerWidth - a.outerWidth()) * s.x, a.to.top = (n.outerHeight - a.to.outerHeight) * s.y, a.to.left = (n.outerWidth - a.to.outerWidth) * s.x), a.css(a.from), ("content" === g || "both" === g) && (c = c.concat(["marginTop", "marginBottom"]).concat(u), d = d.concat(["marginLeft", "marginRight"]), h = o.concat(c).concat(d), a.find("*[width]").each(function() {
                        var i = t(this),
                            n = {
                                height: i.height(),
                                width: i.width(),
                                outerHeight: i.outerHeight(),
                                outerWidth: i.outerWidth()
                            };
                        f && t.effects.save(i, h), i.from = {
                            height: n.height * r.from.y,
                            width: n.width * r.from.x,
                            outerHeight: n.outerHeight * r.from.y,
                            outerWidth: n.outerWidth * r.from.x
                        }, i.to = {
                            height: n.height * r.to.y,
                            width: n.width * r.to.x,
                            outerHeight: n.height * r.to.y,
                            outerWidth: n.width * r.to.x
                        }, r.from.y !== r.to.y && (i.from = t.effects.setTransition(i, c, r.from.y, i.from), i.to = t.effects.setTransition(i, c, r.to.y, i.to)), r.from.x !== r.to.x && (i.from = t.effects.setTransition(i, d, r.from.x, i.from), i.to = t.effects.setTransition(i, d, r.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.easing, function() {
                            f && t.effects.restore(i, h)
                        })
                    })), a.animate(a.to, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.easing,
                        complete: function() {
                            0 === a.to.opacity && a.css("opacity", a.from.opacity), "hide" === p && a.hide(), t.effects.restore(a, y), f || ("static" === v ? a.css({
                                position: "relative",
                                top: a.to.top,
                                left: a.to.left
                            }) : t.each(["top", "left"], function(t, e) {
                                a.css(e, function(e, i) {
                                    var n = parseInt(i, 10),
                                        s = t ? a.to.left : a.to.top;
                                    return "auto" === i ? s + "px" : n + s + "px"
                                })
                            })), t.effects.removeWrapper(a), i()
                        }
                    })
                }, t.effects.effect.scale = function(e, i) {
                    var n = t(this),
                        s = t.extend(!0, {}, e),
                        r = t.effects.setMode(n, e.mode || "effect"),
                        a = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === r ? 0 : 100),
                        o = e.direction || "both",
                        l = e.origin,
                        h = {
                            height: n.height(),
                            width: n.width(),
                            outerHeight: n.outerHeight(),
                            outerWidth: n.outerWidth()
                        },
                        u = {
                            y: "horizontal" !== o ? a / 100 : 1,
                            x: "vertical" !== o ? a / 100 : 1
                        };
                    s.effect = "size", s.queue = !1, s.complete = i, "effect" !== r && (s.origin = l || ["middle", "center"], s.restore = !0), s.from = e.from || ("show" === r ? {
                        height: 0,
                        width: 0,
                        outerHeight: 0,
                        outerWidth: 0
                    } : h), s.to = {
                        height: h.height * u.y,
                        width: h.width * u.x,
                        outerHeight: h.outerHeight * u.y,
                        outerWidth: h.outerWidth * u.x
                    }, s.fade && ("show" === r && (s.from.opacity = 0, s.to.opacity = 1), "hide" === r && (s.from.opacity = 1, s.to.opacity = 0)), n.effect(s)
                }, t.effects.effect.puff = function(e, i) {
                    var n = t(this),
                        s = t.effects.setMode(n, e.mode || "hide"),
                        r = "hide" === s,
                        a = parseInt(e.percent, 10) || 150,
                        o = a / 100,
                        l = {
                            height: n.height(),
                            width: n.width(),
                            outerHeight: n.outerHeight(),
                            outerWidth: n.outerWidth()
                        };
                    t.extend(e, {
                        effect: "scale",
                        queue: !1,
                        fade: !0,
                        mode: s,
                        complete: i,
                        percent: r ? a : 100,
                        from: r ? l : {
                            height: l.height * o,
                            width: l.width * o,
                            outerHeight: l.outerHeight * o,
                            outerWidth: l.outerWidth * o
                        }
                    }), n.effect(e)
                }, t.effects.effect.pulsate = function(e, i) {
                    var n, s = t(this),
                        r = t.effects.setMode(s, e.mode || "show"),
                        a = "show" === r,
                        o = "hide" === r,
                        l = a || "hide" === r,
                        h = 2 * (e.times || 5) + (l ? 1 : 0),
                        u = e.duration / h,
                        c = 0,
                        d = s.queue(),
                        p = d.length;
                    for ((a || !s.is(":visible")) && (s.css("opacity", 0).show(), c = 1), n = 1; h > n; n++) s.animate({
                        opacity: c
                    }, u, e.easing), c = 1 - c;
                    s.animate({
                        opacity: c
                    }, u, e.easing), s.queue(function() {
                        o && s.hide(), i()
                    }), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, h + 1))), s.dequeue()
                }, t.effects.effect.shake = function(e, i) {
                    var n, s = t(this),
                        r = ["position", "top", "bottom", "left", "right", "height", "width"],
                        a = t.effects.setMode(s, e.mode || "effect"),
                        o = e.direction || "left",
                        l = e.distance || 20,
                        h = e.times || 3,
                        u = 2 * h + 1,
                        c = Math.round(e.duration / u),
                        d = "up" === o || "down" === o ? "top" : "left",
                        p = "up" === o || "left" === o,
                        f = {},
                        g = {},
                        m = {},
                        v = s.queue(),
                        y = v.length;
                    for (t.effects.save(s, r), s.show(), t.effects.createWrapper(s), f[d] = (p ? "-=" : "+=") + l, g[d] = (p ? "+=" : "-=") + 2 * l, m[d] = (p ? "-=" : "+=") + 2 * l, s.animate(f, c, e.easing), n = 1; h > n; n++) s.animate(g, c, e.easing).animate(m, c, e.easing);
                    s.animate(g, c, e.easing).animate(f, c / 2, e.easing).queue(function() {
                        "hide" === a && s.hide(), t.effects.restore(s, r), t.effects.removeWrapper(s), i()
                    }), y > 1 && v.splice.apply(v, [1, 0].concat(v.splice(y, u + 1))), s.dequeue()
                }, t.effects.effect.slide = function(e, i) {
                    var n, s = t(this),
                        r = ["position", "top", "bottom", "left", "right", "width", "height"],
                        a = t.effects.setMode(s, e.mode || "show"),
                        o = "show" === a,
                        l = e.direction || "left",
                        h = "up" === l || "down" === l ? "top" : "left",
                        u = "up" === l || "left" === l,
                        c = {};
                    t.effects.save(s, r), s.show(), n = e.distance || s["top" === h ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(s).css({
                        overflow: "hidden"
                    }), o && s.css(h, u ? isNaN(n) ? "-" + n : -n : n), c[h] = (o ? u ? "+=" : "-=" : u ? "-=" : "+=") + n, s.animate(c, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.easing,
                        complete: function() {
                            "hide" === a && s.hide(), t.effects.restore(s, r), t.effects.removeWrapper(s), i()
                        }
                    })
                }, t.effects.effect.transfer = function(e, i) {
                    var n = t(this),
                        s = t(e.to),
                        r = "fixed" === s.css("position"),
                        a = t("body"),
                        o = r ? a.scrollTop() : 0,
                        l = r ? a.scrollLeft() : 0,
                        h = s.offset(),
                        u = {
                            top: h.top - o,
                            left: h.left - l,
                            height: s.innerHeight(),
                            width: s.innerWidth()
                        },
                        c = n.offset(),
                        d = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({
                            top: c.top - o,
                            left: c.left - l,
                            height: n.innerHeight(),
                            width: n.innerWidth(),
                            position: r ? "fixed" : "absolute"
                        }).animate(u, e.duration, e.easing, function() {
                            d.remove(), i()
                        })
                }
        }), window.Modernizr = function(t, e, i) {
            function n(t) {
                b.cssText = t
            }

            function s(t, e) {
                return n(w.join(t + ";") + (e || ""))
            }

            function r(t, e) {
                return typeof t === e
            }

            function a(t, e) {
                return !!~("" + t).indexOf(e)
            }

            function o(t, e) {
                for (var n in t) {
                    var s = t[n];
                    if (!a(s, "-") && b[s] !== i) return "pfx" == e ? s : !0
                }
                return !1
            }

            function l(t, e, n) {
                for (var s in t) {
                    var a = e[t[s]];
                    if (a !== i) return n === !1 ? t[s] : r(a, "function") ? a.bind(n || e) : a
                }
                return !1
            }

            function h(t, e, i) {
                var n = t.charAt(0).toUpperCase() + t.slice(1),
                    s = (t + " " + C.join(n + " ") + n).split(" ");
                return r(e, "string") || r(e, "undefined") ? o(s, e) : (s = (t + " " + T.join(n + " ") + n).split(" "), l(s, e, i))
            }

            function u() {
                f.input = function(i) {
                    for (var n = 0, s = i.length; s > n; n++) N[i[n]] = i[n] in _;
                    return N.list && (N.list = !!e.createElement("datalist") && !!t.HTMLDataListElement), N
                }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), f.inputtypes = function(t) {
                    for (var n, s, r, a = 0, o = t.length; o > a; a++) _.setAttribute("type", s = t[a]), n = "text" !== _.type, n && (_.value = x, _.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(s) && _.style.WebkitAppearance !== i ? (m.appendChild(_), r = e.defaultView, n = r.getComputedStyle && "textfield" !== r.getComputedStyle(_, null).WebkitAppearance && 0 !== _.offsetHeight, m.removeChild(_)) : /^(search|tel)$/.test(s) || (n = /^(url|email)$/.test(s) ? _.checkValidity && _.checkValidity() === !1 : _.value != x)), M[t[a]] = !!n;
                    return M
                }("search tel url email datetime date month week time datetime-local number range color".split(" "))
            }
            var c, d, p = "2.6.2",
                f = {},
                g = !0,
                m = e.documentElement,
                v = "modernizr",
                y = e.createElement(v),
                b = y.style,
                _ = e.createElement("input"),
                x = ":)",
                w = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
                k = "Webkit Moz O ms",
                C = k.split(" "),
                T = k.toLowerCase().split(" "),
                D = {
                    svg: "http://www.w3.org/2000/svg"
                },
                S = {},
                M = {},
                N = {},
                E = [],
                I = E.slice,
                A = function(t, i, n, s) {
                    var r, a, o, l, h = e.createElement("div"),
                        u = e.body,
                        c = u || e.createElement("body");
                    if (parseInt(n, 10))
                        for (; n--;) o = e.createElement("div"), o.id = s ? s[n] : v + (n + 1), h.appendChild(o);
                    return r = ["&#173;", '<style id="s', v, '">', t, "</style>"].join(""), h.id = v, (u ? h : c).innerHTML += r, c.appendChild(h), u || (c.style.background = "", c.style.overflow = "hidden", l = m.style.overflow, m.style.overflow = "hidden", m.appendChild(c)), a = i(h, t), u ? h.parentNode.removeChild(h) : (c.parentNode.removeChild(c), m.style.overflow = l), !!a
                },
                P = function(e) {
                    var i = t.matchMedia || t.msMatchMedia;
                    if (i) return i(e).matches;
                    var n;
                    return A("@media " + e + " { #" + v + " { position: absolute; } }", function(e) {
                        n = "absolute" == (t.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle).position
                    }), n
                },
                z = function() {
                    function t(t, s) {
                        s = s || e.createElement(n[t] || "div"), t = "on" + t;
                        var a = t in s;
                        return a || (s.setAttribute || (s = e.createElement("div")), s.setAttribute && s.removeAttribute && (s.setAttribute(t, ""), a = r(s[t], "function"), r(s[t], "undefined") || (s[t] = i), s.removeAttribute(t))), s = null, a
                    }
                    var n = {
                        select: "input",
                        change: "input",
                        submit: "form",
                        reset: "form",
                        error: "img",
                        load: "img",
                        abort: "img"
                    };
                    return t
                }(),
                H = {}.hasOwnProperty;
            d = r(H, "undefined") || r(H.call, "undefined") ? function(t, e) {
                return e in t && r(t.constructor.prototype[e], "undefined")
            } : function(t, e) {
                return H.call(t, e)
            }, Function.prototype.bind || (Function.prototype.bind = function(t) {
                var e = this;
                if ("function" != typeof e) throw new TypeError;
                var i = I.call(arguments, 1),
                    n = function() {
                        if (this instanceof n) {
                            var s = function() {};
                            s.prototype = e.prototype;
                            var r = new s,
                                a = e.apply(r, i.concat(I.call(arguments)));
                            return Object(a) === a ? a : r
                        }
                        return e.apply(t, i.concat(I.call(arguments)))
                    };
                return n
            }), S.flexbox = function() {
                return h("flexWrap")
            }, S.flexboxlegacy = function() {
                return h("boxDirection")
            }, S.canvas = function() {
                var t = e.createElement("canvas");
                return !!t.getContext && !!t.getContext("2d")
            }, S.canvastext = function() {
                return !!f.canvas && !!r(e.createElement("canvas").getContext("2d").fillText, "function")
            }, S.webgl = function() {
                return !!t.WebGLRenderingContext
            }, S.touch = function() {
                var i;
                return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ? i = !0 : A(["@media (", w.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(t) {
                    i = 9 === t.offsetTop
                }), i
            }, S.postmessage = function() {
                return !!t.postMessage
            }, S.websqldatabase = function() {
                return !!t.openDatabase
            }, S.indexedDB = function() {
                return !!h("indexedDB", t)
            }, S.hashchange = function() {
                return z("hashchange", t) && (e.documentMode === i || e.documentMode > 7)
            }, S.history = function() {
                return !!t.history && !!history.pushState
            }, S.draganddrop = function() {
                var t = e.createElement("div");
                return "draggable" in t || "ondragstart" in t && "ondrop" in t
            }, S.websockets = function() {
                return "WebSocket" in t || "MozWebSocket" in t
            }, S.rgba = function() {
                return n("background-color:rgba(150,255,150,.5)"), a(b.backgroundColor, "rgba")
            }, S.hsla = function() {
                return n("background-color:hsla(120,40%,100%,.5)"), a(b.backgroundColor, "rgba") || a(b.backgroundColor, "hsla")
            }, S.multiplebgs = function() {
                return n("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(b.background)
            }, S.backgroundsize = function() {
                return h("backgroundSize")
            }, S.borderimage = function() {
                return h("borderImage")
            }, S.borderradius = function() {
                return h("borderRadius")
            }, S.boxshadow = function() {
                return h("boxShadow")
            }, S.textshadow = function() {
                return "" === e.createElement("div").style.textShadow
            }, S.opacity = function() {
                return s("opacity:.55"), /^0.55$/.test(b.opacity)
            }, S.cssanimations = function() {
                return h("animationName")
            }, S.csscolumns = function() {
                return h("columnCount")
            }, S.cssgradients = function() {
                var t = "background-image:",
                    e = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                    i = "linear-gradient(left top,#9f9, white);";
                return n((t + "-webkit- ".split(" ").join(e + t) + w.join(i + t)).slice(0, -t.length)), a(b.backgroundImage, "gradient")
            }, S.cssreflections = function() {
                return h("boxReflect")
            }, S.csstransforms = function() {
                return !!h("transform")
            }, S.csstransforms3d = function() {
                var t = !!h("perspective");
                return t && "webkitPerspective" in m.style && A("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(e, i) {
                    t = 9 === e.offsetLeft && 3 === e.offsetHeight
                }), t
            }, S.csstransitions = function() {
                return h("transition")
            }, S.fontface = function() {
                var t;
                return A('@font-face {font-family:"font";src:url("https://")}', function(i, n) {
                    var s = e.getElementById("smodernizr"),
                        r = s.sheet || s.styleSheet,
                        a = r ? r.cssRules && r.cssRules[0] ? r.cssRules[0].cssText : r.cssText || "" : "";
                    t = /src/i.test(a) && 0 === a.indexOf(n.split(" ")[0])
                }), t
            }, S.generatedcontent = function() {
                var t;
                return A(["#", v, "{font:0/0 a}#", v, ':after{content:"', x, '";visibility:hidden;font:3px/1 a}'].join(""), function(e) {
                    t = e.offsetHeight >= 3
                }), t
            }, S.video = function() {
                var t = e.createElement("video"),
                    i = !1;
                try {
                    (i = !!t.canPlayType) && (i = new Boolean(i), i.ogg = t.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), i.h264 = t.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), i.webm = t.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
                } catch (n) {}
                return i
            }, S.audio = function() {
                var t = e.createElement("audio"),
                    i = !1;
                try {
                    (i = !!t.canPlayType) && (i = new Boolean(i), i.ogg = t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), i.mp3 = t.canPlayType("audio/mpeg;").replace(/^no$/, ""), i.wav = t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), i.m4a = (t.canPlayType("audio/x-m4a;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""))
                } catch (n) {}
                return i
            }, S.localstorage = function() {
                try {
                    return localStorage.setItem(v, v), localStorage.removeItem(v), !0
                } catch (t) {
                    return !1
                }
            }, S.sessionstorage = function() {
                try {
                    return sessionStorage.setItem(v, v), sessionStorage.removeItem(v), !0
                } catch (t) {
                    return !1
                }
            }, S.webworkers = function() {
                return !!t.Worker
            }, S.applicationcache = function() {
                return !!t.applicationCache
            }, S.svg = function() {
                return !!e.createElementNS && !!e.createElementNS(D.svg, "svg").createSVGRect
            };
            for (var F in S) d(S, F) && (c = F.toLowerCase(), f[c] = S[F](), E.push((f[c] ? "" : "no-") + c));
            return f.input || u(), f.addTest = function(t, e) {
                    if ("object" == typeof t)
                        for (var n in t) d(t, n) && f.addTest(n, t[n]);
                    else {
                        if (t = t.toLowerCase(), f[t] !== i) return f;
                        e = "function" == typeof e ? e() : e, "undefined" != typeof g && g && (m.className += " " + (e ? "" : "no-") + t), f[t] = e
                    }
                    return f
                }, n(""), y = _ = null,
                function(t, e) {
                    function i(t, e) {
                        var i = t.createElement("p"),
                            n = t.getElementsByTagName("head")[0] || t.documentElement;
                        return i.innerHTML = "x<style>" + e + "</style>", n.insertBefore(i.lastChild, n.firstChild)
                    }

                    function n() {
                        var t = v.elements;
                        return "string" == typeof t ? t.split(" ") : t
                    }

                    function s(t) {
                        var e = m[t[f]];
                        return e || (e = {}, g++, t[f] = g, m[g] = e), e
                    }

                    function r(t, i, n) {
                        if (i || (i = e), u) return i.createElement(t);
                        n || (n = s(i));
                        var r;
                        return r = n.cache[t] ? n.cache[t].cloneNode() : p.test(t) ? (n.cache[t] = n.createElem(t)).cloneNode() : n.createElem(t), r.canHaveChildren && !d.test(t) ? n.frag.appendChild(r) : r
                    }

                    function a(t, i) {
                        if (t || (t = e), u) return t.createDocumentFragment();
                        i = i || s(t);
                        for (var r = i.frag.cloneNode(), a = 0, o = n(), l = o.length; l > a; a++) r.createElement(o[a]);
                        return r
                    }

                    function o(t, e) {
                        e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function(i) {
                            return v.shivMethods ? r(i, t, e) : e.createElem(i)
                        }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/\w+/g, function(t) {
                            return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
                        }) + ");return n}")(v, e.frag)
                    }

                    function l(t) {
                        t || (t = e);
                        var n = s(t);
                        return v.shivCSS && !h && !n.hasCSS && (n.hasCSS = !!i(t, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), u || o(t, n), t
                    }
                    var h, u, c = t.html5 || {},
                        d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                        p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                        f = "_html5shiv",
                        g = 0,
                        m = {};
                    ! function() {
                        try {
                            var t = e.createElement("a");
                            t.innerHTML = "<xyz></xyz>", h = "hidden" in t, u = 1 == t.childNodes.length || function() {
                                e.createElement("a");
                                var t = e.createDocumentFragment();
                                return "undefined" == typeof t.cloneNode || "undefined" == typeof t.createDocumentFragment || "undefined" == typeof t.createElement
                            }()
                        } catch (i) {
                            h = !0, u = !0
                        }
                    }();
                    var v = {
                        elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                        shivCSS: c.shivCSS !== !1,
                        supportsUnknownElements: u,
                        shivMethods: c.shivMethods !== !1,
                        type: "default",
                        shivDocument: l,
                        createElement: r,
                        createDocumentFragment: a
                    };
                    t.html5 = v, l(e)
                }(this, e), f._version = p, f._prefixes = w, f._domPrefixes = T, f._cssomPrefixes = C, f.mq = P, f.hasEvent = z, f.testProp = function(t) {
                    return o([t])
                }, f.testAllProps = h, f.testStyles = A, f.prefixed = function(t, e, i) {
                    return e ? h(t, e, i) : h(t, "pfx")
                }, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (g ? " js " + E.join(" ") : ""), f
        }(this, this.document),
        function(t, e, i) {
            function n(t) {
                return "[object Function]" == m.call(t)
            }

            function s(t) {
                return "string" == typeof t
            }

            function r() {}

            function a(t) {
                return !t || "loaded" == t || "complete" == t || "uninitialized" == t
            }

            function o() {
                var t = v.shift();
                y = 1, t ? t.t ? f(function() {
                    ("c" == t.t ? d.injectCss : d.injectJs)(t.s, 0, t.a, t.x, t.e, 1)
                }, 0) : (t(), o()) : y = 0
            }

            function l(t, i, n, s, r, l, h) {
                function u(e) {
                    if (!p && a(c.readyState) && (b.r = p = 1, !y && o(), c.onload = c.onreadystatechange = null, e)) {
                        "img" != t && f(function() {
                            x.removeChild(c)
                        }, 50);
                        for (var n in D[i]) D[i].hasOwnProperty(n) && D[i][n].onload()
                    }
                }
                var h = h || d.errorTimeout,
                    c = e.createElement(t),
                    p = 0,
                    m = 0,
                    b = {
                        t: n,
                        s: i,
                        e: r,
                        a: l,
                        x: h
                    };
                1 === D[i] && (m = 1, D[i] = []), "object" == t ? c.data = i : (c.src = i, c.type = t), c.width = c.height = "0", c.onerror = c.onload = c.onreadystatechange = function() {
                    u.call(this, m)
                }, v.splice(s, 0, b), "img" != t && (m || 2 === D[i] ? (x.insertBefore(c, _ ? null : g), f(u, h)) : D[i].push(c))
            }

            function h(t, e, i, n, r) {
                return y = 0, e = e || "j", s(t) ? l("c" == e ? k : w, t, e, this.i++, i, n, r) : (v.splice(this.i++, 0, t), 1 == v.length && o()), this
            }

            function u() {
                var t = d;
                return t.loader = {
                    load: h,
                    i: 0
                }, t
            }
            var c, d, p = e.documentElement,
                f = t.setTimeout,
                g = e.getElementsByTagName("script")[0],
                m = {}.toString,
                v = [],
                y = 0,
                b = "MozAppearance" in p.style,
                _ = b && !!e.createRange().compareNode,
                x = _ ? p : g.parentNode,
                p = t.opera && "[object Opera]" == m.call(t.opera),
                p = !!e.attachEvent && !p,
                w = b ? "object" : p ? "script" : "img",
                k = p ? "script" : w,
                C = Array.isArray || function(t) {
                    return "[object Array]" == m.call(t)
                },
                T = [],
                D = {},
                S = {
                    timeout: function(t, e) {
                        return e.length && (t.timeout = e[0]), t
                    }
                };
            d = function(t) {
                function e(t) {
                    var e, i, n, t = t.split("!"),
                        s = T.length,
                        r = t.pop(),
                        a = t.length,
                        r = {
                            url: r,
                            origUrl: r,
                            prefixes: t
                        };
                    for (i = 0; a > i; i++) n = t[i].split("="), (e = S[n.shift()]) && (r = e(r, n));
                    for (i = 0; s > i; i++) r = T[i](r);
                    return r
                }

                function a(t, s, r, a, o) {
                    var l = e(t),
                        h = l.autoCallback;
                    l.url.split(".").pop().split("?").shift(), l.bypass || (s && (s = n(s) ? s : s[t] || s[a] || s[t.split("/").pop().split("?")[0]]), l.instead ? l.instead(t, s, r, a, o) : (D[l.url] ? l.noexec = !0 : D[l.url] = 1, r.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : i, l.noexec, l.attrs, l.timeout), (n(s) || n(h)) && r.load(function() {
                        u(), s && s(l.origUrl, o, a), h && h(l.origUrl, o, a), D[l.url] = 2
                    })))
                }

                function o(t, e) {
                    function i(t, i) {
                        if (t) {
                            if (s(t)) i || (c = function() {
                                var t = [].slice.call(arguments);
                                d.apply(this, t), p()
                            }), a(t, c, e, 0, h);
                            else if (Object(t) === t)
                                for (l in o = function() {
                                        var e, i = 0;
                                        for (e in t) t.hasOwnProperty(e) && i++;
                                        return i
                                    }(), t) t.hasOwnProperty(l) && (!i && !--o && (n(c) ? c = function() {
                                    var t = [].slice.call(arguments);
                                    d.apply(this, t), p()
                                } : c[l] = function(t) {
                                    return function() {
                                        var e = [].slice.call(arguments);
                                        t && t.apply(this, e), p()
                                    }
                                }(d[l])), a(t[l], c, e, l, h))
                        } else !i && p()
                    }
                    var o, l, h = !!t.test,
                        u = t.load || t.both,
                        c = t.callback || r,
                        d = c,
                        p = t.complete || r;
                    i(h ? t.yep : t.nope, !!u), u && i(u)
                }
                var l, h, c = this.yepnope.loader;
                if (s(t)) a(t, 0, c, 0);
                else if (C(t))
                    for (l = 0; l < t.length; l++) h = t[l], s(h) ? a(h, 0, c, 0) : C(h) ? d(h) : Object(h) === h && o(h, c);
                else Object(t) === t && o(t, c)
            }, d.addPrefix = function(t, e) {
                S[t] = e
            }, d.addFilter = function(t) {
                T.push(t)
            }, d.errorTimeout = 1e4, null == e.readyState && e.addEventListener && (e.readyState = "loading", e.addEventListener("DOMContentLoaded", c = function() {
                e.removeEventListener("DOMContentLoaded", c, 0), e.readyState = "complete"
            }, 0)), t.yepnope = u(), t.yepnope.executeStack = o, t.yepnope.injectJs = function(t, i, n, s, l, h) {
                var u, c, p = e.createElement("script"),
                    s = s || d.errorTimeout;
                p.src = t;
                for (c in n) p.setAttribute(c, n[c]);
                i = h ? o : i || r, p.onreadystatechange = p.onload = function() {
                    !u && a(p.readyState) && (u = 1, i(), p.onload = p.onreadystatechange = null)
                }, f(function() {
                    u || (u = 1, i(1))
                }, s), l ? p.onload() : g.parentNode.insertBefore(p, g)
            }, t.yepnope.injectCss = function(t, i, n, s, a, l) {
                var h, s = e.createElement("link"),
                    i = l ? o : i || r;
                s.href = t, s.rel = "stylesheet", s.type = "text/css";
                for (h in n) s.setAttribute(h, n[h]);
                a || (g.parentNode.insertBefore(s, g), f(i, 0))
            }
        }(this, document), Modernizr.load = function() {
            yepnope.apply(window, [].slice.call(arguments, 0))
        }, n("modernizr", function(t) {
            return function() {
                var e;
                return e || t.Modernizr
            }
        }(this)), n("custom/debounce", ["jquery"], function(t) {
            window.debounce = function(t, e, i) {
                var n;
                return function() {
                    var s = this,
                        r = arguments,
                        a = function() {
                            n = null, i || t.apply(s, r)
                        },
                        o = i && !n;
                    clearTimeout(n), n = setTimeout(a, e), o && t.apply(s, r)
                }
            }
        }),
        function(t, e, i, n) {
            "use strict";

            function s(t) {
                return ("string" == typeof t || t instanceof String) && (t = t.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, "")), t
            }
            var r = function(e) {
                for (var i = e.length, n = t("head"); i--;) 0 === n.has("." + e[i]).length && n.append('<meta class="' + e[i] + '" />')
            };
            r(["foundation-mq-small", "foundation-mq-medium", "foundation-mq-large", "foundation-mq-xlarge", "foundation-mq-xxlarge", "foundation-data-attribute-namespace"]), t(function() {
                "undefined" != typeof FastClick && "undefined" != typeof i.body && FastClick.attach(i.body)
            });
            var a = function(e, n) {
                    if ("string" == typeof e) {
                        if (n) {
                            var s;
                            if (n.jquery) {
                                if (s = n[0], !s) return n
                            } else s = n;
                            return t(s.querySelectorAll(e))
                        }
                        return t(i.querySelectorAll(e))
                    }
                    return t(e, n)
                },
                o = function(t) {
                    var e = [];
                    return t || e.push("data"), this.namespace.length > 0 && e.push(this.namespace), e.push(this.name), e.join("-")
                },
                l = function(t) {
                    for (var e = t.split("-"), i = e.length, n = []; i--;) 0 !== i ? n.push(e[i]) : this.namespace.length > 0 ? n.push(this.namespace, e[i]) : n.push(e[i]);
                    return n.reverse().join("-")
                },
                h = function(e, i) {
                    var n = this,
                        s = !a(this).data(this.attr_name(!0));
                    return a(this.scope).is("[" + this.attr_name() + "]") ? (a(this.scope).data(this.attr_name(!0) + "-init", t.extend({}, this.settings, i || e, this.data_options(a(this.scope)))), s && this.events(this.scope)) : a("[" + this.attr_name() + "]", this.scope).each(function() {
                        var s = !a(this).data(n.attr_name(!0) + "-init");
                        a(this).data(n.attr_name(!0) + "-init", t.extend({}, n.settings, i || e, n.data_options(a(this)))),
                            s && n.events(this)
                    }), "string" == typeof e ? this[e].call(this, i) : void 0
                },
                u = function(t, e) {
                    function i() {
                        e(t[0])
                    }

                    function n() {
                        if (this.one("load", i), /MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                            var t = this.attr("src"),
                                e = t.match(/\?/) ? "&" : "?";
                            e += "random=" + (new Date).getTime(), this.attr("src", t + e)
                        }
                    }
                    return t.attr("src") ? void(t[0].complete || 4 === t[0].readyState ? i() : n.call(t)) : void i()
                };
            e.matchMedia = e.matchMedia || function(t) {
                    var e, i = t.documentElement,
                        n = i.firstElementChild || i.firstChild,
                        s = t.createElement("body"),
                        r = t.createElement("div");
                    return r.id = "mq-test-1", r.style.cssText = "position:absolute;top:-100em", s.style.background = "none", s.appendChild(r),
                        function(t) {
                            return r.innerHTML = '&shy;<style media="' + t + '"> #mq-test-1 { width: 42px; }</style>', i.insertBefore(s, n), e = 42 === r.offsetWidth, i.removeChild(s), {
                                matches: e,
                                media: t
                            }
                        }
                }(i),
                function(t) {
                    function i() {
                        n && (a(i), l && jQuery.fx.tick())
                    }
                    for (var n, s = 0, r = ["webkit", "moz"], a = e.requestAnimationFrame, o = e.cancelAnimationFrame, l = "undefined" != typeof jQuery.fx; s < r.length && !a; s++) a = e[r[s] + "RequestAnimationFrame"], o = o || e[r[s] + "CancelAnimationFrame"] || e[r[s] + "CancelRequestAnimationFrame"];
                    a ? (e.requestAnimationFrame = a, e.cancelAnimationFrame = o, l && (jQuery.fx.timer = function(t) {
                        t() && jQuery.timers.push(t) && !n && (n = !0, i())
                    }, jQuery.fx.stop = function() {
                        n = !1
                    })) : (e.requestAnimationFrame = function(t) {
                        var i = (new Date).getTime(),
                            n = Math.max(0, 16 - (i - s)),
                            r = e.setTimeout(function() {
                                t(i + n)
                            }, n);
                        return s = i + n, r
                    }, e.cancelAnimationFrame = function(t) {
                        clearTimeout(t)
                    })
                }(jQuery), e.Foundation = {
                    name: "Foundation",
                    version: "5.4.6",
                    media_queries: {
                        small: a(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
                        medium: a(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
                        large: a(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
                        xlarge: a(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
                        xxlarge: a(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, "")
                    },
                    stylesheet: t("<style></style>").appendTo("head")[0].sheet,
                    global: {
                        namespace: n
                    },
                    init: function(t, i, n, s, r) {
                        var o = [t, n, s, r],
                            l = [];
                        if (this.rtl = /rtl/i.test(a("html").attr("dir")), this.scope = t || this.scope, this.set_namespace(), i && "string" == typeof i && !/reflow/i.test(i)) this.libs.hasOwnProperty(i) && l.push(this.init_lib(i, o));
                        else
                            for (var h in this.libs) l.push(this.init_lib(h, i));
                        return a(e).load(function() {
                            a(e).trigger("resize.fndtn.clearing").trigger("resize.fndtn.dropdown").trigger("resize.fndtn.equalizer").trigger("resize.fndtn.interchange").trigger("resize.fndtn.joyride").trigger("resize.fndtn.magellan").trigger("resize.fndtn.topbar").trigger("resize.fndtn.slider")
                        }), t
                    },
                    init_lib: function(e, i) {
                        return this.libs.hasOwnProperty(e) ? (this.patch(this.libs[e]), i && i.hasOwnProperty(e) ? ("undefined" != typeof this.libs[e].settings ? t.extend(!0, this.libs[e].settings, i[e]) : "undefined" != typeof this.libs[e].defaults && t.extend(!0, this.libs[e].defaults, i[e]), this.libs[e].init.apply(this.libs[e], [this.scope, i[e]])) : (i = i instanceof Array ? i : new Array(i), this.libs[e].init.apply(this.libs[e], i))) : function() {}
                    },
                    patch: function(t) {
                        t.scope = this.scope, t.namespace = this.global.namespace, t.rtl = this.rtl, t.data_options = this.utils.data_options, t.attr_name = o, t.add_namespace = l, t.bindings = h, t.S = this.utils.S
                    },
                    inherit: function(t, e) {
                        for (var i = e.split(" "), n = i.length; n--;) this.utils.hasOwnProperty(i[n]) && (t[i[n]] = this.utils[i[n]])
                    },
                    set_namespace: function() {
                        var e = this.global.namespace === n ? t(".foundation-data-attribute-namespace").css("font-family") : this.global.namespace;
                        this.global.namespace = e === n || /false/i.test(e) ? "" : e
                    },
                    libs: {},
                    utils: {
                        S: a,
                        throttle: function(t, e) {
                            var i = null;
                            return function() {
                                var n = this,
                                    s = arguments;
                                null == i && (i = setTimeout(function() {
                                    t.apply(n, s), i = null
                                }, e))
                            }
                        },
                        debounce: function(t, e, i) {
                            var n, s;
                            return function() {
                                var r = this,
                                    a = arguments,
                                    o = function() {
                                        n = null, i || (s = t.apply(r, a))
                                    },
                                    l = i && !n;
                                return clearTimeout(n), n = setTimeout(o, e), l && (s = t.apply(r, a)), s
                            }
                        },
                        data_options: function(e, i) {
                            function n(t) {
                                return !isNaN(t - 0) && null !== t && "" !== t && t !== !1 && t !== !0
                            }

                            function s(e) {
                                return "string" == typeof e ? t.trim(e) : e
                            }
                            i = i || "options";
                            var r, a, o, l = {},
                                h = function(t) {
                                    var e = Foundation.global.namespace;
                                    return e.length > 0 ? t.data(e + "-" + i) : t.data(i)
                                },
                                u = h(e);
                            if ("object" == typeof u) return u;
                            for (o = (u || ":").split(";"), r = o.length; r--;) a = o[r].split(":"), a = [a[0], a.slice(1).join(":")], /true/i.test(a[1]) && (a[1] = !0), /false/i.test(a[1]) && (a[1] = !1), n(a[1]) && (-1 === a[1].indexOf(".") ? a[1] = parseInt(a[1], 10) : a[1] = parseFloat(a[1])), 2 === a.length && a[0].length > 0 && (l[s(a[0])] = s(a[1]));
                            return l
                        },
                        register_media: function(e, i) {
                            Foundation.media_queries[e] === n && (t("head").append('<meta class="' + i + '"/>'), Foundation.media_queries[e] = s(t("." + i).css("font-family")))
                        },
                        add_custom_rule: function(t, e) {
                            if (e === n && Foundation.stylesheet) Foundation.stylesheet.insertRule(t, Foundation.stylesheet.cssRules.length);
                            else {
                                var i = Foundation.media_queries[e];
                                i !== n && Foundation.stylesheet.insertRule("@media " + Foundation.media_queries[e] + "{ " + t + " }")
                            }
                        },
                        image_loaded: function(t, e) {
                            var i = this,
                                n = t.length;
                            0 === n && e(t), t.each(function() {
                                u(i.S(this), function() {
                                    n -= 1, 0 === n && e(t)
                                })
                            })
                        },
                        random_str: function() {
                            return this.fidx || (this.fidx = 0), this.prefix = this.prefix || [this.name || "F", (+new Date).toString(36)].join("-"), this.prefix + (this.fidx++).toString(36)
                        }
                    }
                }, t.fn.foundation = function() {
                    var t = Array.prototype.slice.call(arguments, 0);
                    return this.each(function() {
                        return Foundation.init.apply(Foundation, [this].concat(t)), this
                    })
                }
        }(jQuery, window, window.document), n("foundation/foundation", function() {}),
        function(t, e, i, n) {
            "use strict";
            Foundation.libs.tab = {
                name: "tab",
                version: "5.4.6",
                settings: {
                    active_class: "active",
                    callback: function() {},
                    deep_linking: !1,
                    scroll_to_content: !0,
                    is_hover: !1
                },
                default_tab_hashes: [],
                init: function(t, e, i) {
                    var n = this,
                        s = this.S;
                    this.bindings(e, i), this.handle_location_hash_change(), s("[" + this.attr_name() + "] > .active > a", this.scope).each(function() {
                        n.default_tab_hashes.push(this.hash)
                    })
                },
                events: function() {
                    var t = this,
                        i = this.S,
                        n = function(e) {
                            var n = i(this).closest("[" + t.attr_name() + "]").data(t.attr_name(!0) + "-init");
                            (!n.is_hover || Modernizr.touch) && (e.preventDefault(), e.stopPropagation(), t.toggle_active_tab(i(this).parent()))
                        };
                    i(this.scope).off(".tab").on("focus.fndtn.tab", "[" + this.attr_name() + "] > * > a", n).on("click.fndtn.tab", "[" + this.attr_name() + "] > * > a", n).on("mouseenter.fndtn.tab", "[" + this.attr_name() + "] > * > a", function(e) {
                        var n = i(this).closest("[" + t.attr_name() + "]").data(t.attr_name(!0) + "-init");
                        n.is_hover && t.toggle_active_tab(i(this).parent())
                    }), i(e).on("hashchange.fndtn.tab", function(e) {
                        e.preventDefault(), t.handle_location_hash_change()
                    })
                },
                handle_location_hash_change: function() {
                    var e = this,
                        i = this.S;
                    i("[" + this.attr_name() + "]", this.scope).each(function() {
                        var s = i(this).data(e.attr_name(!0) + "-init");
                        if (s.deep_linking) {
                            var r;
                            if (r = s.scroll_to_content ? e.scope.location.hash : e.scope.location.hash.replace("fndtn-", ""), "" != r) {
                                var a = i(r);
                                if (a.hasClass("content") && a.parent().hasClass("tab-content")) e.toggle_active_tab(t("[" + e.attr_name() + "] > * > a[href=" + r + "]").parent());
                                else {
                                    var o = a.closest(".content").attr("id");
                                    o != n && e.toggle_active_tab(t("[" + e.attr_name() + "] > * > a[href=#" + o + "]").parent(), r)
                                }
                            } else
                                for (var l = 0; l < e.default_tab_hashes.length; l++) e.toggle_active_tab(t("[" + e.attr_name() + "] > * > a[href=" + e.default_tab_hashes[l] + "]").parent())
                        }
                    })
                },
                toggle_active_tab: function(s, r) {
                    var a = this.S,
                        o = s.closest("[" + this.attr_name() + "]"),
                        l = s.find("a"),
                        h = s.children("a").first(),
                        u = "#" + h.attr("href").split("#")[1],
                        c = a(u),
                        d = s.siblings(),
                        p = o.data(this.attr_name(!0) + "-init"),
                        f = function(e) {
                            var n, s = t(this),
                                r = t(this).parents("li").prev().children('[role="tab"]'),
                                a = t(this).parents("li").next().children('[role="tab"]');
                            switch (e.keyCode) {
                                case 37:
                                    n = r;
                                    break;
                                case 39:
                                    n = a;
                                    break;
                                default:
                                    n = !1
                            }
                            n.length && (s.attr({
                                tabindex: "-1",
                                "aria-selected": null
                            }), n.attr({
                                tabindex: "0",
                                "aria-selected": !0
                            }).focus()), t('[role="tabpanel"]').attr("aria-hidden", "true"), t("#" + t(i.activeElement).attr("href").substring(1)).attr("aria-hidden", null)
                        };
                    a(this).data(this.data_attr("tab-content")) && (u = "#" + a(this).data(this.data_attr("tab-content")).split("#")[1], c = a(u)), p.deep_linking && (p.scroll_to_content ? (e.location.hash = r || u, r == n || r == u ? s.parent()[0].scrollIntoView() : a(u)[0].scrollIntoView()) : r != n ? e.location.hash = "fndtn-" + r.replace("#", "") : e.location.hash = "fndtn-" + u.replace("#", "")), s.addClass(p.active_class).triggerHandler("opened"), l.attr({
                        "aria-selected": "true",
                        tabindex: 0
                    }), d.removeClass(p.active_class), d.find("a").attr({
                        "aria-selected": "false",
                        tabindex: -1
                    }), c.siblings().removeClass(p.active_class).attr({
                        "aria-hidden": "true",
                        tabindex: -1
                    }), c.addClass(p.active_class).attr("aria-hidden", "false").removeAttr("tabindex"), p.callback(s), c.triggerHandler("toggled", [s]), o.triggerHandler("toggled", [c]), l.off("keydown").on("keydown", f)
                },
                data_attr: function(t) {
                    return this.namespace.length > 0 ? this.namespace + "-" + t : t
                },
                off: function() {},
                reflow: function() {}
            }
        }(jQuery, window, window.document), n("foundation/foundation.tab", function() {}),
        function(t, e, i, n) {
            "use strict";
            Foundation.libs.dropdown = {
                name: "dropdown",
                version: "5.4.6",
                settings: {
                    active_class: "open",
                    disabled_class: "disabled",
                    mega_class: "mega",
                    align: "bottom",
                    is_hover: !1,
                    opened: function() {},
                    closed: function() {}
                },
                init: function(t, e, i) {
                    Foundation.inherit(this, "throttle"), this.bindings(e, i)
                },
                events: function(i) {
                    var n = this,
                        s = n.S;
                    s(this.scope).off(".dropdown").on("click.fndtn.dropdown", "[" + this.attr_name() + "]", function(e) {
                        var i = s(this).data(n.attr_name(!0) + "-init") || n.settings;
                        (!i.is_hover || Modernizr.touch) && (e.preventDefault(), n.toggle(t(this)))
                    }).on("mouseenter.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function(t) {
                        var e, i, r = s(this);
                        clearTimeout(n.timeout), r.data(n.data_attr()) ? (e = s("#" + r.data(n.data_attr())), i = r) : (e = r, i = s("[" + n.attr_name() + "='" + e.attr("id") + "']"));
                        var a = i.data(n.attr_name(!0) + "-init") || n.settings;
                        s(t.target).data(n.data_attr()) && a.is_hover && n.closeall.call(n), a.is_hover && n.open.apply(n, [e, i])
                    }).on("mouseleave.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function(t) {
                        var e = s(this);
                        n.timeout = setTimeout(function() {
                            if (e.data(n.data_attr())) {
                                var t = e.data(n.data_attr(!0) + "-init") || n.settings;
                                t.is_hover && n.close.call(n, s("#" + e.data(n.data_attr())))
                            } else {
                                var i = s("[" + n.attr_name() + '="' + s(this).attr("id") + '"]'),
                                    t = i.data(n.attr_name(!0) + "-init") || n.settings;
                                t.is_hover && n.close.call(n, e)
                            }
                        }.bind(this), 150)
                    }).on("click.fndtn.dropdown", function(e) {
                        var i = s(e.target).closest("[" + n.attr_name() + "-content]");
                        if (!(s(e.target).closest("[" + n.attr_name() + "]").length > 0)) return !s(e.target).data("revealId") && i.length > 0 && (s(e.target).is("[" + n.attr_name() + "-content]") || t.contains(i.first()[0], e.target)) ? void e.stopPropagation() : void n.close.call(n, s("[" + n.attr_name() + "-content]"))
                    }).on("opened.fndtn.dropdown", "[" + n.attr_name() + "-content]", function() {
                        n.settings.opened.call(this)
                    }).on("closed.fndtn.dropdown", "[" + n.attr_name() + "-content]", function() {
                        n.settings.closed.call(this)
                    }), s(e).off(".dropdown").on("resize.fndtn.dropdown", n.throttle(function() {
                        n.resize.call(n)
                    }, 50)), this.resize()
                },
                close: function(e) {
                    var i = this;
                    e.each(function() {
                        var n = t("[" + i.attr_name() + "=" + e[0].id + "]") || t("aria-controls=" + e[0].id + "]");
                        n.attr("aria-expanded", "false"), i.S(this).hasClass(i.settings.active_class) && (i.S(this).css(Foundation.rtl ? "right" : "left", "-99999px").attr("aria-hidden", "true").removeClass(i.settings.active_class).prev("[" + i.attr_name() + "]").removeClass(i.settings.active_class).removeData("target"), i.S(this).trigger("closed").trigger("closed.fndtn.dropdown", [e]))
                    })
                },
                closeall: function() {
                    var e = this;
                    t.each(e.S("[" + this.attr_name() + "-content]"), function() {
                        e.close.call(e, e.S(this))
                    })
                },
                open: function(t, e) {
                    this.css(t.addClass(this.settings.active_class), e), t.prev("[" + this.attr_name() + "]").addClass(this.settings.active_class), t.data("target", e.get(0)).trigger("opened").trigger("opened.fndtn.dropdown", [t, e]), t.attr("aria-hidden", "false"), e.attr("aria-expanded", "true"), t.focus()
                },
                data_attr: function() {
                    return this.namespace.length > 0 ? this.namespace + "-" + this.name : this.name
                },
                toggle: function(t) {
                    if (!t.hasClass(this.settings.disabled_class)) {
                        var e = this.S("#" + t.data(this.data_attr()));
                        0 !== e.length && (this.close.call(this, this.S("[" + this.attr_name() + "-content]").not(e)), e.hasClass(this.settings.active_class) ? (this.close.call(this, e), e.data("target") !== t.get(0) && this.open.call(this, e, t)) : this.open.call(this, e, t))
                    }
                },
                resize: function() {
                    var t = this.S("[" + this.attr_name() + "-content].open"),
                        e = this.S("[" + this.attr_name() + "='" + t.attr("id") + "']");
                    t.length && e.length && this.css(t, e)
                },
                css: function(t, e) {
                    var i = Math.max((e.width() - t.width()) / 2, 8),
                        n = e.data(this.attr_name(!0) + "-init") || this.settings;
                    if (this.clear_idx(), this.small()) {
                        var s = this.dirs.bottom.call(t, e, n);
                        t.attr("style", "").removeClass("drop-left drop-right drop-top").css({
                            position: "absolute",
                            width: "95%",
                            "max-width": "none",
                            top: s.top
                        }), t.css(Foundation.rtl ? "right" : "left", i)
                    } else this.style(t, e, n);
                    return t
                },
                style: function(e, i, n) {
                    var s = t.extend({
                        position: "absolute"
                    }, this.dirs[n.align].call(e, i, n));
                    e.attr("style", "").css(s)
                },
                dirs: {
                    _base: function(t) {
                        var e = this.offsetParent(),
                            i = e.offset(),
                            n = t.offset();
                        return n.top -= i.top, n.left -= i.left, n
                    },
                    top: function(t, e) {
                        var i = Foundation.libs.dropdown,
                            n = i.dirs._base.call(this, t);
                        return this.addClass("drop-top"), (t.outerWidth() < this.outerWidth() || i.small() || this.hasClass(e.mega_menu)) && i.adjust_pip(this, t, e, n), Foundation.rtl ? {
                            left: n.left - this.outerWidth() + t.outerWidth(),
                            top: n.top - this.outerHeight()
                        } : {
                            left: n.left,
                            top: n.top - this.outerHeight()
                        }
                    },
                    bottom: function(t, e) {
                        var i = Foundation.libs.dropdown,
                            n = i.dirs._base.call(this, t);
                        return (t.outerWidth() < this.outerWidth() || i.small() || this.hasClass(e.mega_menu)) && i.adjust_pip(this, t, e, n), i.rtl ? {
                            left: n.left - this.outerWidth() + t.outerWidth(),
                            top: n.top + t.outerHeight()
                        } : {
                            left: n.left,
                            top: n.top + t.outerHeight()
                        }
                    },
                    left: function(t, e) {
                        var i = Foundation.libs.dropdown.dirs._base.call(this, t);
                        return this.addClass("drop-left"), {
                            left: i.left - this.outerWidth(),
                            top: i.top
                        }
                    },
                    right: function(t, e) {
                        var i = Foundation.libs.dropdown.dirs._base.call(this, t);
                        return this.addClass("drop-right"), {
                            left: i.left + t.outerWidth(),
                            top: i.top
                        }
                    }
                },
                adjust_pip: function(t, e, i, n) {
                    var s = Foundation.stylesheet,
                        r = 8;
                    t.hasClass(i.mega_class) ? r = n.left + e.outerWidth() / 2 - 8 : this.small() && (r += n.left - 8), this.rule_idx = s.cssRules.length;
                    var a = ".f-dropdown.open:before",
                        o = ".f-dropdown.open:after",
                        l = "left: " + r + "px;",
                        h = "left: " + (r - 1) + "px;";
                    s.insertRule ? (s.insertRule([a, "{", l, "}"].join(" "), this.rule_idx), s.insertRule([o, "{", h, "}"].join(" "), this.rule_idx + 1)) : (s.addRule(a, l, this.rule_idx), s.addRule(o, h, this.rule_idx + 1))
                },
                clear_idx: function() {
                    var t = Foundation.stylesheet;
                    this.rule_idx && (t.deleteRule(this.rule_idx), t.deleteRule(this.rule_idx), delete this.rule_idx)
                },
                small: function() {
                    return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches
                },
                off: function() {
                    this.S(this.scope).off(".fndtn.dropdown"), this.S("html, body").off(".fndtn.dropdown"), this.S(e).off(".fndtn.dropdown"), this.S("[data-dropdown-content]").off(".fndtn.dropdown")
                },
                reflow: function() {}
            }
        }(jQuery, window, window.document), n("foundation/foundation.dropdown", function() {}),
        function(t, e, i, n) {
            "use strict";
            Foundation.libs.equalizer = {
                name: "equalizer",
                version: "5.4.6",
                settings: {
                    use_tallest: !0,
                    before_height_change: t.noop,
                    after_height_change: t.noop,
                    equalize_on_stack: !1
                },
                init: function(t, e, i) {
                    Foundation.inherit(this, "image_loaded"), this.bindings(e, i), this.reflow()
                },
                events: function() {
                    this.S(e).off(".equalizer").on("resize.fndtn.equalizer", function(t) {
                        this.reflow()
                    }.bind(this))
                },
                equalize: function(e) {
                    var i = !1,
                        n = e.find("[" + this.attr_name() + "-watch]:visible"),
                        s = e.data(this.attr_name(!0) + "-init");
                    if (0 !== n.length) {
                        var r = n.first().offset().top;
                        if (s.before_height_change(), e.trigger("before-height-change").trigger("before-height-change.fndth.equalizer"), n.height("inherit"), n.each(function() {
                                var e = t(this);
                                e.offset().top !== r && (i = !0)
                            }), s.equalize_on_stack !== !1 || !i) {
                            var a = n.map(function() {
                                return t(this).outerHeight(!1)
                            }).get();
                            if (s.use_tallest) {
                                var o = Math.max.apply(null, a);
                                n.css("height", o)
                            } else {
                                var l = Math.min.apply(null, a);
                                n.css("height", l)
                            }
                            s.after_height_change(), e.trigger("after-height-change").trigger("after-height-change.fndtn.equalizer")
                        }
                    }
                },
                reflow: function() {
                    var e = this;
                    this.S("[" + this.attr_name() + "]", this.scope).each(function() {
                        var i = t(this);
                        e.image_loaded(e.S("img", this), function() {
                            e.equalize(i)
                        })
                    })
                }
            }
        }(jQuery, window, window.document), n("foundation/foundation.equalizer", function() {}), n("custom/jquery.accordion", ["jquery"], function(t) {
            var e = {
                init: function(e) {
                    var i, n, s;
                    s = t(this), n = s.data("accordion"), "undefined" == typeof n ? (i = {}, n = t.extend({}, i, e), s.data("accordion", n)) : n = t.extend({}, n, e), t(".accordion__navigation.first-accordion").each(function() {
                        t(this).find(".accordion__container").css("max-height", t(this).find(".accordion__content").outerHeight(!0))
                    }), t(document).on("click", ".accordion__link", function(e) {
                        e.preventDefault();
                        var i = t(this).siblings(".accordion__container"),
                            n = i.find(".accordion__content").outerHeight(!0),
                            s = i.closest(".accordion__navigation");
                        s.hasClass("active") || s.hasClass("important") ? (i.css("max-height", 0), s.removeClass("important"), s.removeClass("active")) : (i.css("max-height", n), s.addClass("active"))
                    })
                }
            };
            t.fn.accordion = function(i) {
                return e[i] ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist in jquery.accordion") : e.init.apply(this, arguments)
            }
        }),
        function(t) {
            "function" == typeof n && n.amd ? n("custom/jquery.placeholder", ["jquery"], t) : t(jQuery)
        }(function(t) {
            function e(e) {
                var i = {},
                    n = /^jQuery\d+$/;
                return t.each(e.attributes, function(t, e) {
                    e.specified && !n.test(e.name) && (i[e.name] = e.value)
                }), i
            }

            function i(e, i) {
                var n = this,
                    r = t(n);
                if (n.value == r.attr("placeholder") && r.hasClass(d.customClass))
                    if (r.data("placeholder-password")) {
                        if (r = r.hide().nextAll('input[type="password"]:first').show().attr("id", r.removeAttr("id").data("placeholder-id")), e === !0) return r[0].value = i;
                        r.focus()
                    } else n.value = "", r.removeClass(d.customClass), n == s() && n.select()
            }

            function n() {
                var n, s = this,
                    r = t(s),
                    a = this.id;
                if ("" === s.value) {
                    if ("password" === s.type) {
                        if (!r.data("placeholder-textinput")) {
                            try {
                                n = r.clone().attr({
                                    type: "text"
                                })
                            } catch (o) {
                                n = t("<input>").attr(t.extend(e(this), {
                                    type: "text"
                                }))
                            }
                            n.removeAttr("name").data({
                                "placeholder-password": r,
                                "placeholder-id": a
                            }).bind("focus.placeholder", i), r.data({
                                "placeholder-textinput": n,
                                "placeholder-id": a
                            }).before(n)
                        }
                        r = r.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", a).show()
                    }
                    r.addClass(d.customClass), r[0].value = r.attr("placeholder")
                } else r.removeClass(d.customClass)
            }

            function s() {
                try {
                    return document.activeElement
                } catch (t) {}
            }
            var r, a, o = "[object OperaMini]" == Object.prototype.toString.call(window.operamini),
                l = "placeholder" in document.createElement("input") && !o,
                h = "placeholder" in document.createElement("textarea") && !o,
                u = t.valHooks,
                c = t.propHooks;
            if (l && h) a = t.fn.placeholder = function() {
                return this
            }, a.input = a.textarea = !0;
            else {
                var d = {};
                a = t.fn.placeholder = function(e) {
                    var s = {
                        customClass: "placeholder"
                    };
                    d = t.extend({}, s, e);
                    var r = this;
                    return r.filter((l ? "textarea" : ":input") + "[placeholder]").not("." + d.customClass).bind({
                        "focus.placeholder": i,
                        "blur.placeholder": n
                    }).data("placeholder-enabled", !0).trigger("blur.placeholder"), r
                }, a.input = l, a.textarea = h, r = {
                    get: function(e) {
                        var i = t(e),
                            n = i.data("placeholder-password");
                        return n ? n[0].value : i.data("placeholder-enabled") && i.hasClass("placeholder") ? "" : e.value
                    },
                    set: function(e, r) {
                        var a = t(e),
                            o = a.data("placeholder-password");
                        return o ? o[0].value = r : a.data("placeholder-enabled") ? ("" === r ? (e.value = r, e != s() && n.call(e)) : a.hasClass(d.customClass) ? i.call(e, !0, r) || (e.value = r) : e.value = r, a) : e.value = r
                    }
                }, l || (u.input = r, c.value = r), h || (u.textarea = r, c.value = r), t(function() {
                    t(document).delegate("form", "submit.placeholder", function() {
                        var e = t("." + d.customClass, this).each(i);
                        setTimeout(function() {
                            e.each(n)
                        }, 10)
                    })
                }), t(window).bind("beforeunload.placeholder", function() {
                    t("." + d.customClass).each(function() {
                        this.value = ""
                    })
                })
            }
        }), n("custom/fixedHeader", ["jquery"], function() {
            var t = $(".header").offset().top;
            $(window).on("scroll", function() {
                var e = $(window).scrollTop();
                e > t ? $(".wrapper").addClass("fixedHeader") : $(".wrapper").removeClass("fixedHeader")
            })
        }), n("custom/jquery.fixed.navigation", ["jquery", "custom/fixedHeader"], function(t) {
            function e() {
                t("body").removeClass("searchVisible"), t("#searchOverlay").remove()
            }
            var i = t('<div id="searchOverlay"></div>');
            t(document).ready(function() {
                t("body").on("click", "#searchOverlay", e), t(".header").on("click", ".header__burger", function(e) {
                    e.stopPropagation(), t(this).closest(".header").toggleClass("active")
                }), t(".header__searchaction").on("click", function(n) {
                    n.preventDefault(), t("body").hasClass(".searchVisible") ? e() : (t("body").addClass("searchVisible"), i.appendTo("body"))
                }), t(".header__closesearch").on("click", function() {
                    event.preventDefault(), e()
                }), t("input, textarea").placeholder()
            })
        }), n("custom/jquery.plugin.select", ["jquery"], function(t) {
            var e = {
                init: function(e) {
                    this.each(function() {
                        var i, n, s;
                        s = t(this), n = s.data("selectsorter"), "undefined" == typeof n ? (i = {
                            selector: "[data-select-id]",
                            test: !1
                        }, n = t.extend({}, i, e), s.data("selectsorter", n)) : n = t.extend({}, n, e), s.change(function() {
                            var e = t(this).val();
                            "all" === e ? (s.closest(), t(n.selector).each(function() {
                                t(this).fadeIn("slow")
                            })) : t(n.selector).each(function() {
                                t(this).data("select-id") !== e ? t(this).hide() : t(this).fadeIn("slow")
                            })
                        })
                    })
                }
            };
            t.fn.selectsorter = function(i) {
                return e[i] ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist in jquery.selectsorter") : e.init.apply(this, arguments)
            }
        }), n("custom/jquery.plugin.select-multiple", ["jquery"], function(t) {
            var e = {
                init: function(e) {
                    this.each(function() {
                        var i, n, s;
                        s = t(this), n = s.data("multiplesorter"), "undefined" == typeof n ? (i = {
                            selector: "[data-selectmultiple-id]",
                            test: !1
                        }, n = t.extend({}, i, e), s.data("multiplesorter", n)) : n = t.extend({}, n, e), s.change(function() {
                            var e = t(this).val();
                            "all" === e ? (s.closest(), t(n.selector).each(function() {
                                t(this).fadeIn("slow")
                            })) : t(this).closest(".row").find("[data-selectmultiple-id]").each(function() {
                                t(this).data("selectmultiple-id") !== e ? t(this).hide() : t(this).fadeIn("slow")
                            })
                        })
                    })
                }
            };
            t.fn.multiplesorter = function(i) {
                return e[i] ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist in jquery.multiplesorter") : e.init.apply(this, arguments)
            }
        }), n("custom/jquery.plugin.redirect", ["jquery"], function(t) {
            var e = {
                init: function(e) {
                    var i, n, s;
                    s = t(this), n = s.data("redirect"), "undefined" == typeof n ? (i = {}, n = t.extend({}, i, e), s.data("redirect", n)) : n = t.extend({}, n, e), s.on("change", function(e) {
                        var i = t(this).val();
                        window.location.href = i
                    })
                }
            };
            t.fn.redirect = function(i) {
                return e[i] ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist in jquery.redirect") : e.init.apply(this, arguments)
            }
        }), n("custom/jquery.autocomplete", ["jquery", "jquery-ui"], function(t) {
            t("#query").autocomplete({
                appendTo: "#search-box__typeahead",
                source: function(e, i) {
                    t.ajax({
                        url: this.element.closest("[data-search]").data("search-suggestion-url"),
                        dataType: "json",
                        data: {
                            query: e.term
                        },
                        success: function(t) {
                            i(t.suggestions.slice(0, 5))
                        }
                    })
                },
                select: function(e, i) {
                    var n = t("#query").closest("[data-search]");
                    window.location.href = "" + String(n.data("resultpage")) + "&query=" + i.item.value
                }
            })
        }), n("custom/jquery.form-module", ["jquery"], function(e) {
            e(document).ready(function() {
                e(".persistedfileupload-removefile").each(function() {
                    var t = e(this).find("input:hidden"),
                        i = e(this).parent().find("input:file"),
                        n = e(this).parent().find(".persistedfileupload-existing-filename");
                    e(this).append('<button class="button--highlight persistedfileupload-clear">Clear</button>');
                    var s = e(this).find(".persistedfileupload-clear");
                    e(n).text().length > 0 ? e(i).hide() : (e(s).hide(), e(n).hide()), e(i).change(function() {
                        e(t).val("");
                        var i = e(this).val();
                        null != i && i.length > 0 && (e(n).text(/[^\\]*$/.exec(i)), e(n).show(), e(s).show(), e(this).hide())
                    }), e(s).click(function() {
                        return e(t).val("true"), e(n).text(""), e(n).hide(), e(i).val(""), e(i).show(), e(this).hide(), !1
                    })
                }), e("[data-form-print]") && e("body").addClass("form-print"), e("[data-tooltip]").each(function() {
                    try {
                        e(window).width() > 700 && t(e(this))
                    } catch (i) {
                        console.log(i.message)
                    }
                })
            })
        }), n("custom/jquery.form-errors", ["jquery"], function(t) {
            t("[data-error-message]").each(function() {
                var e = t(this),
                    i = '<span class="error-msg">' + e.data("error-message") + "</span>";
                e.after(i)
            }), t("[data-error-message]").on("focus", function(e) {
                t(this).siblings(".error-msg").remove(), t(this).attr("data-error-message") && t(this).removeAttr("data-error-message")
            }), t(".error-msg").on("click", function(e) {
                t(this).prev().focus()
            }), t("ul[data-error-message]").on("click", function(e) {
                t(this).attr("data-error-message") && (t(this).removeAttr("data-error-message"), t(this).siblings(".error-msg").remove())
            })
        }), n("custom/jquery.print", ["jquery"], function(t) {
            t(document).on("click", "[data-print]", function(t) {
                t.preventDefault(), window.print()
            })
        }), ! function(t) {
            var e, i, s = "0.4.2",
                r = "hasOwnProperty",
                a = /[\.\/]/,
                o = "*",
                l = function() {},
                h = function(t, e) {
                    return t - e
                },
                u = {
                    n: {}
                },
                c = function(t, n) {
                    t = String(t);
                    var s, r = i,
                        a = Array.prototype.slice.call(arguments, 2),
                        o = c.listeners(t),
                        l = 0,
                        u = [],
                        d = {},
                        p = [],
                        f = e;
                    e = t, i = 0;
                    for (var g = 0, m = o.length; m > g; g++) "zIndex" in o[g] && (u.push(o[g].zIndex), o[g].zIndex < 0 && (d[o[g].zIndex] = o[g]));
                    for (u.sort(h); u[l] < 0;)
                        if (s = d[u[l++]], p.push(s.apply(n, a)), i) return i = r, p;
                    for (g = 0; m > g; g++)
                        if (s = o[g], "zIndex" in s)
                            if (s.zIndex == u[l]) {
                                if (p.push(s.apply(n, a)), i) break;
                                do
                                    if (l++, s = d[u[l]], s && p.push(s.apply(n, a)), i) break; while (s)
                            } else d[s.zIndex] = s;
                    else if (p.push(s.apply(n, a)), i) break;
                    return i = r, e = f, p.length ? p : null
                };
            c._events = u, c.listeners = function(t) {
                var e, i, n, s, r, l, h, c, d = t.split(a),
                    p = u,
                    f = [p],
                    g = [];
                for (s = 0, r = d.length; r > s; s++) {
                    for (c = [], l = 0, h = f.length; h > l; l++)
                        for (p = f[l].n, i = [p[d[s]], p[o]], n = 2; n--;) e = i[n], e && (c.push(e), g = g.concat(e.f || []));
                    f = c
                }
                return g
            }, c.on = function(t, e) {
                if (t = String(t), "function" != typeof e) return function() {};
                for (var i = t.split(a), n = u, s = 0, r = i.length; r > s; s++) n = n.n, n = n.hasOwnProperty(i[s]) && n[i[s]] || (n[i[s]] = {
                    n: {}
                });
                for (n.f = n.f || [], s = 0, r = n.f.length; r > s; s++)
                    if (n.f[s] == e) return l;
                return n.f.push(e),
                    function(t) {
                        +t == +t && (e.zIndex = +t)
                    }
            }, c.f = function(t) {
                var e = [].slice.call(arguments, 1);
                return function() {
                    c.apply(null, [t, null].concat(e).concat([].slice.call(arguments, 0)))
                }
            }, c.stop = function() {
                i = 1
            }, c.nt = function(t) {
                return t ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(e) : e
            }, c.nts = function() {
                return e.split(a)
            }, c.off = c.unbind = function(t, e) {
                if (!t) return void(c._events = u = {
                    n: {}
                });
                var i, n, s, l, h, d, p, f = t.split(a),
                    g = [u];
                for (l = 0, h = f.length; h > l; l++)
                    for (d = 0; d < g.length; d += s.length - 2) {
                        if (s = [d, 1], i = g[d].n, f[l] != o) i[f[l]] && s.push(i[f[l]]);
                        else
                            for (n in i) i[r](n) && s.push(i[n]);
                        g.splice.apply(g, s)
                    }
                for (l = 0, h = g.length; h > l; l++)
                    for (i = g[l]; i.n;) {
                        if (e) {
                            if (i.f) {
                                for (d = 0, p = i.f.length; p > d; d++)
                                    if (i.f[d] == e) {
                                        i.f.splice(d, 1);
                                        break
                                    }!i.f.length && delete i.f
                            }
                            for (n in i.n)
                                if (i.n[r](n) && i.n[n].f) {
                                    var m = i.n[n].f;
                                    for (d = 0, p = m.length; p > d; d++)
                                        if (m[d] == e) {
                                            m.splice(d, 1);
                                            break
                                        }!m.length && delete i.n[n].f
                                }
                        } else {
                            delete i.f;
                            for (n in i.n) i.n[r](n) && i.n[n].f && delete i.n[n].f
                        }
                        i = i.n
                    }
            }, c.once = function(t, e) {
                var i = function() {
                    return c.unbind(t, i), e.apply(this, arguments)
                };
                return c.on(t, i)
            }, c.version = s, c.toString = function() {
                return "You are running Eve " + s
            }, "undefined" != typeof module && module.exports ? module.exports = c : "undefined" != typeof n ? n("eve", [], function() {
                return c
            }) : t.eve = c
        }(window || this),
        function(t, e) {
            "function" == typeof n && n.amd ? n("raphael", ["eve"], function(i) {
                return e(t, i)
            }) : e(t, t.eve)
        }(this, function(t, e) {
            function i(t) {
                if (i.is(t, "function")) return _ ? t() : e.on("raphael.DOMload", t);
                if (i.is(t, U)) return i._engine.create[N](i, t.splice(0, 3 + i.is(t[0], $))).add(t);
                var n = Array.prototype.slice.call(arguments, 0);
                if (i.is(n[n.length - 1], "function")) {
                    var s = n.pop();
                    return _ ? s.call(i._engine.create[N](i, n)) : e.on("raphael.DOMload", function() {
                        s.call(i._engine.create[N](i, n))
                    })
                }
                return i._engine.create[N](i, arguments)
            }

            function n(t) {
                if ("function" == typeof t || Object(t) !== t) return t;
                var e = new t.constructor;
                for (var i in t) t[T](i) && (e[i] = n(t[i]));
                return e
            }

            function s(t, e) {
                for (var i = 0, n = t.length; n > i; i++)
                    if (t[i] === e) return t.push(t.splice(i, 1)[0])
            }

            function r(t, e, i) {
                function n() {
                    var r = Array.prototype.slice.call(arguments, 0),
                        a = r.join("␀"),
                        o = n.cache = n.cache || {},
                        l = n.count = n.count || [];
                    return o[T](a) ? (s(l, a), i ? i(o[a]) : o[a]) : (l.length >= 1e3 && delete o[l.shift()], l.push(a), o[a] = t[N](e, r), i ? i(o[a]) : o[a])
                }
                return n
            }

            function a() {
                return this.hex
            }

            function o(t, e) {
                for (var i = [], n = 0, s = t.length; s - 2 * !e > n; n += 2) {
                    var r = [{
                        x: +t[n - 2],
                        y: +t[n - 1]
                    }, {
                        x: +t[n],
                        y: +t[n + 1]
                    }, {
                        x: +t[n + 2],
                        y: +t[n + 3]
                    }, {
                        x: +t[n + 4],
                        y: +t[n + 5]
                    }];
                    e ? n ? s - 4 == n ? r[3] = {
                        x: +t[0],
                        y: +t[1]
                    } : s - 2 == n && (r[2] = {
                        x: +t[0],
                        y: +t[1]
                    }, r[3] = {
                        x: +t[2],
                        y: +t[3]
                    }) : r[0] = {
                        x: +t[s - 2],
                        y: +t[s - 1]
                    } : s - 4 == n ? r[3] = r[2] : n || (r[0] = {
                        x: +t[n],
                        y: +t[n + 1]
                    }), i.push(["C", (-r[0].x + 6 * r[1].x + r[2].x) / 6, (-r[0].y + 6 * r[1].y + r[2].y) / 6, (r[1].x + 6 * r[2].x - r[3].x) / 6, (r[1].y + 6 * r[2].y - r[3].y) / 6, r[2].x, r[2].y])
                }
                return i
            }

            function l(t, e, i, n, s) {
                var r = -3 * e + 9 * i - 9 * n + 3 * s,
                    a = t * r + 6 * e - 12 * i + 6 * n;
                return t * a - 3 * e + 3 * i
            }

            function h(t, e, i, n, s, r, a, o, h) {
                null == h && (h = 1), h = h > 1 ? 1 : 0 > h ? 0 : h;
                for (var u = h / 2, c = 12, d = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], p = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], f = 0, g = 0; c > g; g++) {
                    var m = u * d[g] + u,
                        v = l(m, t, i, s, a),
                        y = l(m, e, n, r, o),
                        b = v * v + y * y;
                    f += p[g] * B.sqrt(b)
                }
                return u * f
            }

            function u(t, e, i, n, s, r, a, o, l) {
                if (!(0 > l || h(t, e, i, n, s, r, a, o) < l)) {
                    var u, c = 1,
                        d = c / 2,
                        p = c - d,
                        f = .01;
                    for (u = h(t, e, i, n, s, r, a, o, p); R(u - l) > f;) d /= 2, p += (l > u ? 1 : -1) * d, u = h(t, e, i, n, s, r, a, o, p);
                    return p
                }
            }

            function c(t, e, i, n, s, r, a, o) {
                if (!(W(t, i) < L(s, a) || L(t, i) > W(s, a) || W(e, n) < L(r, o) || L(e, n) > W(r, o))) {
                    var l = (t * n - e * i) * (s - a) - (t - i) * (s * o - r * a),
                        h = (t * n - e * i) * (r - o) - (e - n) * (s * o - r * a),
                        u = (t - i) * (r - o) - (e - n) * (s - a);
                    if (u) {
                        var c = l / u,
                            d = h / u,
                            p = +c.toFixed(2),
                            f = +d.toFixed(2);
                        if (!(p < +L(t, i).toFixed(2) || p > +W(t, i).toFixed(2) || p < +L(s, a).toFixed(2) || p > +W(s, a).toFixed(2) || f < +L(e, n).toFixed(2) || f > +W(e, n).toFixed(2) || f < +L(r, o).toFixed(2) || f > +W(r, o).toFixed(2))) return {
                            x: c,
                            y: d
                        }
                    }
                }
            }

            function d(t, e, n) {
                var s = i.bezierBBox(t),
                    r = i.bezierBBox(e);
                if (!i.isBBoxIntersect(s, r)) return n ? 0 : [];
                for (var a = h.apply(0, t), o = h.apply(0, e), l = W(~~(a / 5), 1), u = W(~~(o / 5), 1), d = [], p = [], f = {}, g = n ? 0 : [], m = 0; l + 1 > m; m++) {
                    var v = i.findDotsAtSegment.apply(i, t.concat(m / l));
                    d.push({
                        x: v.x,
                        y: v.y,
                        t: m / l
                    })
                }
                for (m = 0; u + 1 > m; m++) v = i.findDotsAtSegment.apply(i, e.concat(m / u)), p.push({
                    x: v.x,
                    y: v.y,
                    t: m / u
                });
                for (m = 0; l > m; m++)
                    for (var y = 0; u > y; y++) {
                        var b = d[m],
                            _ = d[m + 1],
                            x = p[y],
                            w = p[y + 1],
                            k = R(_.x - b.x) < .001 ? "y" : "x",
                            C = R(w.x - x.x) < .001 ? "y" : "x",
                            T = c(b.x, b.y, _.x, _.y, x.x, x.y, w.x, w.y);
                        if (T) {
                            if (f[T.x.toFixed(4)] == T.y.toFixed(4)) continue;
                            f[T.x.toFixed(4)] = T.y.toFixed(4);
                            var D = b.t + R((T[k] - b[k]) / (_[k] - b[k])) * (_.t - b.t),
                                S = x.t + R((T[C] - x[C]) / (w[C] - x[C])) * (w.t - x.t);
                            D >= 0 && 1.001 >= D && S >= 0 && 1.001 >= S && (n ? g++ : g.push({
                                x: T.x,
                                y: T.y,
                                t1: L(D, 1),
                                t2: L(S, 1)
                            }))
                        }
                    }
                return g
            }

            function p(t, e, n) {
                t = i._path2curve(t), e = i._path2curve(e);
                for (var s, r, a, o, l, h, u, c, p, f, g = n ? 0 : [], m = 0, v = t.length; v > m; m++) {
                    var y = t[m];
                    if ("M" == y[0]) s = l = y[1], r = h = y[2];
                    else {
                        "C" == y[0] ? (p = [s, r].concat(y.slice(1)), s = p[6], r = p[7]) : (p = [s, r, s, r, l, h, l, h], s = l, r = h);
                        for (var b = 0, _ = e.length; _ > b; b++) {
                            var x = e[b];
                            if ("M" == x[0]) a = u = x[1], o = c = x[2];
                            else {
                                "C" == x[0] ? (f = [a, o].concat(x.slice(1)), a = f[6], o = f[7]) : (f = [a, o, a, o, u, c, u, c], a = u, o = c);
                                var w = d(p, f, n);
                                if (n) g += w;
                                else {
                                    for (var k = 0, C = w.length; C > k; k++) w[k].segment1 = m, w[k].segment2 = b, w[k].bez1 = p, w[k].bez2 = f;
                                    g = g.concat(w)
                                }
                            }
                        }
                    }
                }
                return g
            }

            function f(t, e, i, n, s, r) {
                null != t ? (this.a = +t, this.b = +e, this.c = +i, this.d = +n, this.e = +s, this.f = +r) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
            }

            function g() {
                return this.x + P + this.y + P + this.width + " × " + this.height
            }

            function m(t, e, i, n, s, r) {
                function a(t) {
                    return ((c * t + u) * t + h) * t
                }

                function o(t, e) {
                    var i = l(t, e);
                    return ((f * i + p) * i + d) * i
                }

                function l(t, e) {
                    var i, n, s, r, o, l;
                    for (s = t, l = 0; 8 > l; l++) {
                        if (r = a(s) - t, R(r) < e) return s;
                        if (o = (3 * c * s + 2 * u) * s + h, R(o) < 1e-6) break;
                        s -= r / o
                    }
                    if (i = 0, n = 1, s = t, i > s) return i;
                    if (s > n) return n;
                    for (; n > i;) {
                        if (r = a(s), R(r - t) < e) return s;
                        t > r ? i = s : n = s, s = (n - i) / 2 + i
                    }
                    return s
                }
                var h = 3 * e,
                    u = 3 * (n - e) - h,
                    c = 1 - h - u,
                    d = 3 * i,
                    p = 3 * (s - i) - d,
                    f = 1 - d - p;
                return o(t, 1 / (200 * r))
            }

            function v(t, e) {
                var i = [],
                    n = {};
                if (this.ms = e, this.times = 1, t) {
                    for (var s in t) t[T](s) && (n[Z(s)] = t[s],
                        i.push(Z(s)));
                    i.sort(ct)
                }
                this.anim = n, this.top = i[i.length - 1], this.percents = i
            }

            function y(t, n, s, r, a, o) {
                s = Z(s);
                var l, h, u, c, d, p, g = t.ms,
                    v = {},
                    y = {},
                    b = {};
                if (r)
                    for (x = 0, k = le.length; k > x; x++) {
                        var _ = le[x];
                        if (_.el.id == n.id && _.anim == t) {
                            _.percent != s ? (le.splice(x, 1), u = 1) : h = _, n.attr(_.totalOrigin);
                            break
                        }
                    } else r = +y;
                for (var x = 0, k = t.percents.length; k > x; x++) {
                    if (t.percents[x] == s || t.percents[x] > r * t.top) {
                        s = t.percents[x], d = t.percents[x - 1] || 0, g = g / t.top * (s - d), c = t.percents[x + 1], l = t.anim[s];
                        break
                    }
                    r && n.attr(t.anim[t.percents[x]])
                }
                if (l) {
                    if (h) h.initstatus = r, h.start = new Date - h.ms * r;
                    else {
                        for (var C in l)
                            if (l[T](C) && (nt[T](C) || n.paper.customAttributes[T](C))) switch (v[C] = n.attr(C), null == v[C] && (v[C] = it[C]), y[C] = l[C], nt[C]) {
                                case $:
                                    b[C] = (y[C] - v[C]) / g;
                                    break;
                                case "colour":
                                    v[C] = i.getRGB(v[C]);
                                    var D = i.getRGB(y[C]);
                                    b[C] = {
                                        r: (D.r - v[C].r) / g,
                                        g: (D.g - v[C].g) / g,
                                        b: (D.b - v[C].b) / g
                                    };
                                    break;
                                case "path":
                                    var S = Ft(v[C], y[C]),
                                        M = S[1];
                                    for (v[C] = S[0], b[C] = [], x = 0, k = v[C].length; k > x; x++) {
                                        b[C][x] = [0];
                                        for (var N = 1, I = v[C][x].length; I > N; N++) b[C][x][N] = (M[x][N] - v[C][x][N]) / g
                                    }
                                    break;
                                case "transform":
                                    var A = n._,
                                        P = Lt(A[C], y[C]);
                                    if (P)
                                        for (v[C] = P.from, y[C] = P.to, b[C] = [], b[C].real = !0, x = 0, k = v[C].length; k > x; x++)
                                            for (b[C][x] = [v[C][x][0]], N = 1, I = v[C][x].length; I > N; N++) b[C][x][N] = (y[C][x][N] - v[C][x][N]) / g;
                                    else {
                                        var F = n.matrix || new f,
                                            j = {
                                                _: {
                                                    transform: A.transform
                                                },
                                                getBBox: function() {
                                                    return n.getBBox(1)
                                                }
                                            };
                                        v[C] = [F.a, F.b, F.c, F.d, F.e, F.f], Bt(j, y[C]), y[C] = j._.transform, b[C] = [(j.matrix.a - F.a) / g, (j.matrix.b - F.b) / g, (j.matrix.c - F.c) / g, (j.matrix.d - F.d) / g, (j.matrix.e - F.e) / g, (j.matrix.f - F.f) / g]
                                    }
                                    break;
                                case "csv":
                                    var O = z(l[C])[H](w),
                                        B = z(v[C])[H](w);
                                    if ("clip-rect" == C)
                                        for (v[C] = B, b[C] = [], x = B.length; x--;) b[C][x] = (O[x] - v[C][x]) / g;
                                    y[C] = O;
                                    break;
                                default:
                                    for (O = [][E](l[C]), B = [][E](v[C]), b[C] = [], x = n.paper.customAttributes[C].length; x--;) b[C][x] = ((O[x] || 0) - (B[x] || 0)) / g
                            }
                        var W = l.easing,
                            L = i.easing_formulas[W];
                        if (!L)
                            if (L = z(W).match(Q), L && 5 == L.length) {
                                var R = L;
                                L = function(t) {
                                    return m(t, +R[1], +R[2], +R[3], +R[4], g)
                                }
                            } else L = pt;
                        if (p = l.start || t.start || +new Date, _ = {
                                anim: t,
                                percent: s,
                                timestamp: p,
                                start: p + (t.del || 0),
                                status: 0,
                                initstatus: r || 0,
                                stop: !1,
                                ms: g,
                                easing: L,
                                from: v,
                                diff: b,
                                to: y,
                                el: n,
                                callback: l.callback,
                                prev: d,
                                next: c,
                                repeat: o || t.times,
                                origin: n.attr(),
                                totalOrigin: a
                            }, le.push(_), r && !h && !u && (_.stop = !0, _.start = new Date - g * r, 1 == le.length)) return ue();
                        u && (_.start = new Date - _.ms * r), 1 == le.length && he(ue)
                    }
                    e("raphael.anim.start." + n.id, n, t)
                }
            }

            function b(t) {
                for (var e = 0; e < le.length; e++) le[e].el.paper == t && le.splice(e--, 1)
            }
            i.version = "2.1.2", i.eve = e;
            var _, x, w = /[, ]+/,
                k = {
                    circle: 1,
                    rect: 1,
                    path: 1,
                    ellipse: 1,
                    text: 1,
                    image: 1
                },
                C = /\{(\d+)\}/g,
                T = "hasOwnProperty",
                D = {
                    doc: document,
                    win: t
                },
                S = {
                    was: Object.prototype[T].call(D.win, "Raphael"),
                    is: D.win.Raphael
                },
                M = function() {
                    this.ca = this.customAttributes = {}
                },
                N = "apply",
                E = "concat",
                I = "ontouchstart" in D.win || D.win.DocumentTouch && D.doc instanceof DocumentTouch,
                A = "",
                P = " ",
                z = String,
                H = "split",
                F = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [H](P),
                j = {
                    mousedown: "touchstart",
                    mousemove: "touchmove",
                    mouseup: "touchend"
                },
                O = z.prototype.toLowerCase,
                B = Math,
                W = B.max,
                L = B.min,
                R = B.abs,
                q = B.pow,
                Y = B.PI,
                $ = "number",
                V = "string",
                U = "array",
                X = Object.prototype.toString,
                K = (i._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),
                G = {
                    NaN: 1,
                    Infinity: 1,
                    "-Infinity": 1
                },
                Q = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
                J = B.round,
                Z = parseFloat,
                tt = parseInt,
                et = z.prototype.toUpperCase,
                it = i._availableAttrs = {
                    "arrow-end": "none",
                    "arrow-start": "none",
                    blur: 0,
                    "clip-rect": "0 0 1e9 1e9",
                    cursor: "default",
                    cx: 0,
                    cy: 0,
                    fill: "#fff",
                    "fill-opacity": 1,
                    font: '10px "Arial"',
                    "font-family": '"Arial"',
                    "font-size": "10",
                    "font-style": "normal",
                    "font-weight": 400,
                    gradient: 0,
                    height: 0,
                    href: "http://raphaeljs.com/",
                    "letter-spacing": 0,
                    opacity: 1,
                    path: "M0,0",
                    r: 0,
                    rx: 0,
                    ry: 0,
                    src: "",
                    stroke: "#000",
                    "stroke-dasharray": "",
                    "stroke-linecap": "butt",
                    "stroke-linejoin": "butt",
                    "stroke-miterlimit": 0,
                    "stroke-opacity": 1,
                    "stroke-width": 1,
                    target: "_blank",
                    "text-anchor": "middle",
                    title: "Raphael",
                    transform: "",
                    width: 0,
                    x: 0,
                    y: 0
                },
                nt = i._availableAnimAttrs = {
                    blur: $,
                    "clip-rect": "csv",
                    cx: $,
                    cy: $,
                    fill: "colour",
                    "fill-opacity": $,
                    "font-size": $,
                    height: $,
                    opacity: $,
                    path: "path",
                    r: $,
                    rx: $,
                    ry: $,
                    stroke: "colour",
                    "stroke-opacity": $,
                    "stroke-width": $,
                    transform: "transform",
                    width: $,
                    x: $,
                    y: $
                },
                st = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
                rt = {
                    hs: 1,
                    rg: 1
                },
                at = /,?([achlmqrstvxz]),?/gi,
                ot = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
                lt = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
                ht = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
                ut = (i._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}),
                ct = function(t, e) {
                    return Z(t) - Z(e)
                },
                dt = function() {},
                pt = function(t) {
                    return t
                },
                ft = i._rectPath = function(t, e, i, n, s) {
                    return s ? [
                        ["M", t + s, e],
                        ["l", i - 2 * s, 0],
                        ["a", s, s, 0, 0, 1, s, s],
                        ["l", 0, n - 2 * s],
                        ["a", s, s, 0, 0, 1, -s, s],
                        ["l", 2 * s - i, 0],
                        ["a", s, s, 0, 0, 1, -s, -s],
                        ["l", 0, 2 * s - n],
                        ["a", s, s, 0, 0, 1, s, -s],
                        ["z"]
                    ] : [
                        ["M", t, e],
                        ["l", i, 0],
                        ["l", 0, n],
                        ["l", -i, 0],
                        ["z"]
                    ]
                },
                gt = function(t, e, i, n) {
                    return null == n && (n = i), [
                        ["M", t, e],
                        ["m", 0, -n],
                        ["a", i, n, 0, 1, 1, 0, 2 * n],
                        ["a", i, n, 0, 1, 1, 0, -2 * n],
                        ["z"]
                    ]
                },
                mt = i._getPath = {
                    path: function(t) {
                        return t.attr("path")
                    },
                    circle: function(t) {
                        var e = t.attrs;
                        return gt(e.cx, e.cy, e.r)
                    },
                    ellipse: function(t) {
                        var e = t.attrs;
                        return gt(e.cx, e.cy, e.rx, e.ry)
                    },
                    rect: function(t) {
                        var e = t.attrs;
                        return ft(e.x, e.y, e.width, e.height, e.r)
                    },
                    image: function(t) {
                        var e = t.attrs;
                        return ft(e.x, e.y, e.width, e.height)
                    },
                    text: function(t) {
                        var e = t._getBBox();
                        return ft(e.x, e.y, e.width, e.height)
                    },
                    set: function(t) {
                        var e = t._getBBox();
                        return ft(e.x, e.y, e.width, e.height)
                    }
                },
                vt = i.mapPath = function(t, e) {
                    if (!e) return t;
                    var i, n, s, r, a, o, l;
                    for (t = Ft(t), s = 0, a = t.length; a > s; s++)
                        for (l = t[s], r = 1, o = l.length; o > r; r += 2) i = e.x(l[r], l[r + 1]), n = e.y(l[r], l[r + 1]), l[r] = i, l[r + 1] = n;
                    return t
                };
            if (i._g = D, i.type = D.win.SVGAngle || D.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == i.type) {
                var yt, bt = D.doc.createElement("div");
                if (bt.innerHTML = '<v:shape adj="1"/>', yt = bt.firstChild, yt.style.behavior = "url(#default#VML)", !yt || "object" != typeof yt.adj) return i.type = A;
                bt = null
            }
            i.svg = !(i.vml = "VML" == i.type), i._Paper = M, i.fn = x = M.prototype = i.prototype, i._id = 0, i._oid = 0, i.is = function(t, e) {
                return e = O.call(e), "finite" == e ? !G[T](+t) : "array" == e ? t instanceof Array : "null" == e && null === t || e == typeof t && null !== t || "object" == e && t === Object(t) || "array" == e && Array.isArray && Array.isArray(t) || X.call(t).slice(8, -1).toLowerCase() == e
            }, i.angle = function(t, e, n, s, r, a) {
                if (null == r) {
                    var o = t - n,
                        l = e - s;
                    return o || l ? (180 + 180 * B.atan2(-l, -o) / Y + 360) % 360 : 0
                }
                return i.angle(t, e, r, a) - i.angle(n, s, r, a)
            }, i.rad = function(t) {
                return t % 360 * Y / 180
            }, i.deg = function(t) {
                return 180 * t / Y % 360
            }, i.snapTo = function(t, e, n) {
                if (n = i.is(n, "finite") ? n : 10, i.is(t, U)) {
                    for (var s = t.length; s--;)
                        if (R(t[s] - e) <= n) return t[s]
                } else {
                    t = +t;
                    var r = e % t;
                    if (n > r) return e - r;
                    if (r > t - n) return e - r + t
                }
                return e
            }, i.createUUID = function(t, e) {
                return function() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t, e).toUpperCase()
                }
            }(/[xy]/g, function(t) {
                var e = 16 * B.random() | 0,
                    i = "x" == t ? e : 3 & e | 8;
                return i.toString(16)
            }), i.setWindow = function(t) {
                e("raphael.setWindow", i, D.win, t), D.win = t, D.doc = D.win.document, i._engine.initWin && i._engine.initWin(D.win)
            };
            var _t = function(t) {
                    if (i.vml) {
                        var e, n = /^\s+|\s+$/g;
                        try {
                            var s = new ActiveXObject("htmlfile");
                            s.write("<body>"), s.close(), e = s.body
                        } catch (a) {
                            e = createPopup().document.body
                        }
                        var o = e.createTextRange();
                        _t = r(function(t) {
                            try {
                                e.style.color = z(t).replace(n, A);
                                var i = o.queryCommandValue("ForeColor");
                                return i = (255 & i) << 16 | 65280 & i | (16711680 & i) >>> 16, "#" + ("000000" + i.toString(16)).slice(-6)
                            } catch (s) {
                                return "none"
                            }
                        })
                    } else {
                        var l = D.doc.createElement("i");
                        l.title = "Raphaël Colour Picker", l.style.display = "none", D.doc.body.appendChild(l), _t = r(function(t) {
                            return l.style.color = t, D.doc.defaultView.getComputedStyle(l, A).getPropertyValue("color")
                        })
                    }
                    return _t(t)
                },
                xt = function() {
                    return "hsb(" + [this.h, this.s, this.b] + ")"
                },
                wt = function() {
                    return "hsl(" + [this.h, this.s, this.l] + ")"
                },
                kt = function() {
                    return this.hex
                },
                Ct = function(t, e, n) {
                    if (null == e && i.is(t, "object") && "r" in t && "g" in t && "b" in t && (n = t.b, e = t.g, t = t.r), null == e && i.is(t, V)) {
                        var s = i.getRGB(t);
                        t = s.r, e = s.g, n = s.b
                    }
                    return (t > 1 || e > 1 || n > 1) && (t /= 255, e /= 255, n /= 255), [t, e, n]
                },
                Tt = function(t, e, n, s) {
                    t *= 255, e *= 255, n *= 255;
                    var r = {
                        r: t,
                        g: e,
                        b: n,
                        hex: i.rgb(t, e, n),
                        toString: kt
                    };
                    return i.is(s, "finite") && (r.opacity = s), r
                };
            i.color = function(t) {
                var e;
                return i.is(t, "object") && "h" in t && "s" in t && "b" in t ? (e = i.hsb2rgb(t), t.r = e.r, t.g = e.g, t.b = e.b, t.hex = e.hex) : i.is(t, "object") && "h" in t && "s" in t && "l" in t ? (e = i.hsl2rgb(t), t.r = e.r, t.g = e.g, t.b = e.b, t.hex = e.hex) : (i.is(t, "string") && (t = i.getRGB(t)), i.is(t, "object") && "r" in t && "g" in t && "b" in t ? (e = i.rgb2hsl(t), t.h = e.h, t.s = e.s, t.l = e.l, e = i.rgb2hsb(t), t.v = e.b) : (t = {
                    hex: "none"
                }, t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1)), t.toString = kt, t
            }, i.hsb2rgb = function(t, e, i, n) {
                this.is(t, "object") && "h" in t && "s" in t && "b" in t && (i = t.b, e = t.s, t = t.h, n = t.o), t *= 360;
                var s, r, a, o, l;
                return t = t % 360 / 60, l = i * e, o = l * (1 - R(t % 2 - 1)), s = r = a = i - l, t = ~~t, s += [l, o, 0, 0, o, l][t], r += [o, l, l, o, 0, 0][t], a += [0, 0, o, l, l, o][t], Tt(s, r, a, n)
            }, i.hsl2rgb = function(t, e, i, n) {
                this.is(t, "object") && "h" in t && "s" in t && "l" in t && (i = t.l, e = t.s, t = t.h), (t > 1 || e > 1 || i > 1) && (t /= 360, e /= 100, i /= 100), t *= 360;
                var s, r, a, o, l;
                return t = t % 360 / 60, l = 2 * e * (.5 > i ? i : 1 - i), o = l * (1 - R(t % 2 - 1)), s = r = a = i - l / 2, t = ~~t, s += [l, o, 0, 0, o, l][t], r += [o, l, l, o, 0, 0][t], a += [0, 0, o, l, l, o][t], Tt(s, r, a, n)
            }, i.rgb2hsb = function(t, e, i) {
                i = Ct(t, e, i), t = i[0], e = i[1], i = i[2];
                var n, s, r, a;
                return r = W(t, e, i), a = r - L(t, e, i), n = 0 == a ? null : r == t ? (e - i) / a : r == e ? (i - t) / a + 2 : (t - e) / a + 4, n = (n + 360) % 6 * 60 / 360, s = 0 == a ? 0 : a / r, {
                    h: n,
                    s: s,
                    b: r,
                    toString: xt
                }
            }, i.rgb2hsl = function(t, e, i) {
                i = Ct(t, e, i), t = i[0], e = i[1], i = i[2];
                var n, s, r, a, o, l;
                return a = W(t, e, i), o = L(t, e, i), l = a - o, n = 0 == l ? null : a == t ? (e - i) / l : a == e ? (i - t) / l + 2 : (t - e) / l + 4, n = (n + 360) % 6 * 60 / 360, r = (a + o) / 2, s = 0 == l ? 0 : .5 > r ? l / (2 * r) : l / (2 - 2 * r), {
                    h: n,
                    s: s,
                    l: r,
                    toString: wt
                }
            }, i._path2string = function() {
                return this.join(",").replace(at, "$1")
            }, i._preload = function(t, e) {
                var i = D.doc.createElement("img");
                i.style.cssText = "position:absolute;left:-9999em;top:-9999em", i.onload = function() {
                    e.call(this), this.onload = null, D.doc.body.removeChild(this)
                }, i.onerror = function() {
                    D.doc.body.removeChild(this)
                }, D.doc.body.appendChild(i), i.src = t
            }, i.getRGB = r(function(t) {
                if (!t || (t = z(t)).indexOf("-") + 1) return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    error: 1,
                    toString: a
                };
                if ("none" == t) return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    toString: a
                };
                !(rt[T](t.toLowerCase().substring(0, 2)) || "#" == t.charAt()) && (t = _t(t));
                var e, n, s, r, o, l, h = t.match(K);
                return h ? (h[2] && (s = tt(h[2].substring(5), 16), n = tt(h[2].substring(3, 5), 16), e = tt(h[2].substring(1, 3), 16)), h[3] && (s = tt((o = h[3].charAt(3)) + o, 16), n = tt((o = h[3].charAt(2)) + o, 16), e = tt((o = h[3].charAt(1)) + o, 16)), h[4] && (l = h[4][H](st), e = Z(l[0]), "%" == l[0].slice(-1) && (e *= 2.55), n = Z(l[1]), "%" == l[1].slice(-1) && (n *= 2.55), s = Z(l[2]), "%" == l[2].slice(-1) && (s *= 2.55), "rgba" == h[1].toLowerCase().slice(0, 4) && (r = Z(l[3])), l[3] && "%" == l[3].slice(-1) && (r /= 100)), h[5] ? (l = h[5][H](st), e = Z(l[0]), "%" == l[0].slice(-1) && (e *= 2.55), n = Z(l[1]), "%" == l[1].slice(-1) && (n *= 2.55), s = Z(l[2]), "%" == l[2].slice(-1) && (s *= 2.55), ("deg" == l[0].slice(-3) || "°" == l[0].slice(-1)) && (e /= 360), "hsba" == h[1].toLowerCase().slice(0, 4) && (r = Z(l[3])), l[3] && "%" == l[3].slice(-1) && (r /= 100), i.hsb2rgb(e, n, s, r)) : h[6] ? (l = h[6][H](st), e = Z(l[0]), "%" == l[0].slice(-1) && (e *= 2.55), n = Z(l[1]), "%" == l[1].slice(-1) && (n *= 2.55), s = Z(l[2]), "%" == l[2].slice(-1) && (s *= 2.55), ("deg" == l[0].slice(-3) || "°" == l[0].slice(-1)) && (e /= 360), "hsla" == h[1].toLowerCase().slice(0, 4) && (r = Z(l[3])), l[3] && "%" == l[3].slice(-1) && (r /= 100), i.hsl2rgb(e, n, s, r)) : (h = {
                    r: e,
                    g: n,
                    b: s,
                    toString: a
                }, h.hex = "#" + (16777216 | s | n << 8 | e << 16).toString(16).slice(1), i.is(r, "finite") && (h.opacity = r), h)) : {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    error: 1,
                    toString: a
                }
            }, i), i.hsb = r(function(t, e, n) {
                return i.hsb2rgb(t, e, n).hex
            }), i.hsl = r(function(t, e, n) {
                return i.hsl2rgb(t, e, n).hex
            }), i.rgb = r(function(t, e, i) {
                return "#" + (16777216 | i | e << 8 | t << 16).toString(16).slice(1)
            }), i.getColor = function(t) {
                var e = this.getColor.start = this.getColor.start || {
                        h: 0,
                        s: 1,
                        b: t || .75
                    },
                    i = this.hsb2rgb(e.h, e.s, e.b);
                return e.h += .075, e.h > 1 && (e.h = 0, e.s -= .2, e.s <= 0 && (this.getColor.start = {
                    h: 0,
                    s: 1,
                    b: e.b
                })), i.hex
            }, i.getColor.reset = function() {
                delete this.start
            }, i.parsePathString = function(t) {
                if (!t) return null;
                var e = Dt(t);
                if (e.arr) return Mt(e.arr);
                var n = {
                        a: 7,
                        c: 6,
                        h: 1,
                        l: 2,
                        m: 2,
                        r: 4,
                        q: 4,
                        s: 4,
                        t: 2,
                        v: 1,
                        z: 0
                    },
                    s = [];
                return i.is(t, U) && i.is(t[0], U) && (s = Mt(t)), s.length || z(t).replace(ot, function(t, e, i) {
                    var r = [],
                        a = e.toLowerCase();
                    if (i.replace(ht, function(t, e) {
                            e && r.push(+e)
                        }), "m" == a && r.length > 2 && (s.push([e][E](r.splice(0, 2))), a = "l", e = "m" == e ? "l" : "L"), "r" == a) s.push([e][E](r));
                    else
                        for (; r.length >= n[a] && (s.push([e][E](r.splice(0, n[a]))), n[a]););
                }), s.toString = i._path2string, e.arr = Mt(s), s
            }, i.parseTransformString = r(function(t) {
                if (!t) return null;
                var e = [];
                return i.is(t, U) && i.is(t[0], U) && (e = Mt(t)), e.length || z(t).replace(lt, function(t, i, n) {
                    var s = [];
                    O.call(i), n.replace(ht, function(t, e) {
                        e && s.push(+e)
                    }), e.push([i][E](s))
                }), e.toString = i._path2string, e
            });
            var Dt = function(t) {
                var e = Dt.ps = Dt.ps || {};
                return e[t] ? e[t].sleep = 100 : e[t] = {
                    sleep: 100
                }, setTimeout(function() {
                    for (var i in e) e[T](i) && i != t && (e[i].sleep--, !e[i].sleep && delete e[i])
                }), e[t]
            };
            i.findDotsAtSegment = function(t, e, i, n, s, r, a, o, l) {
                var h = 1 - l,
                    u = q(h, 3),
                    c = q(h, 2),
                    d = l * l,
                    p = d * l,
                    f = u * t + 3 * c * l * i + 3 * h * l * l * s + p * a,
                    g = u * e + 3 * c * l * n + 3 * h * l * l * r + p * o,
                    m = t + 2 * l * (i - t) + d * (s - 2 * i + t),
                    v = e + 2 * l * (n - e) + d * (r - 2 * n + e),
                    y = i + 2 * l * (s - i) + d * (a - 2 * s + i),
                    b = n + 2 * l * (r - n) + d * (o - 2 * r + n),
                    _ = h * t + l * i,
                    x = h * e + l * n,
                    w = h * s + l * a,
                    k = h * r + l * o,
                    C = 90 - 180 * B.atan2(m - y, v - b) / Y;
                return (m > y || b > v) && (C += 180), {
                    x: f,
                    y: g,
                    m: {
                        x: m,
                        y: v
                    },
                    n: {
                        x: y,
                        y: b
                    },
                    start: {
                        x: _,
                        y: x
                    },
                    end: {
                        x: w,
                        y: k
                    },
                    alpha: C
                }
            }, i.bezierBBox = function(t, e, n, s, r, a, o, l) {
                i.is(t, "array") || (t = [t, e, n, s, r, a, o, l]);
                var h = Ht.apply(null, t);
                return {
                    x: h.min.x,
                    y: h.min.y,
                    x2: h.max.x,
                    y2: h.max.y,
                    width: h.max.x - h.min.x,
                    height: h.max.y - h.min.y
                }
            }, i.isPointInsideBBox = function(t, e, i) {
                return e >= t.x && e <= t.x2 && i >= t.y && i <= t.y2
            }, i.isBBoxIntersect = function(t, e) {
                var n = i.isPointInsideBBox;
                return n(e, t.x, t.y) || n(e, t.x2, t.y) || n(e, t.x, t.y2) || n(e, t.x2, t.y2) || n(t, e.x, e.y) || n(t, e.x2, e.y) || n(t, e.x, e.y2) || n(t, e.x2, e.y2) || (t.x < e.x2 && t.x > e.x || e.x < t.x2 && e.x > t.x) && (t.y < e.y2 && t.y > e.y || e.y < t.y2 && e.y > t.y)
            }, i.pathIntersection = function(t, e) {
                return p(t, e)
            }, i.pathIntersectionNumber = function(t, e) {
                return p(t, e, 1)
            }, i.isPointInsidePath = function(t, e, n) {
                var s = i.pathBBox(t);
                return i.isPointInsideBBox(s, e, n) && p(t, [
                    ["M", e, n],
                    ["H", s.x2 + 10]
                ], 1) % 2 == 1
            }, i._removedFactory = function(t) {
                return function() {
                    e("raphael.log", null, "Raphaël: you are calling to method “" + t + "” of removed object", t)
                }
            };
            var St = i.pathBBox = function(t) {
                    var e = Dt(t);
                    if (e.bbox) return n(e.bbox);
                    if (!t) return {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                        x2: 0,
                        y2: 0
                    };
                    t = Ft(t);
                    for (var i, s = 0, r = 0, a = [], o = [], l = 0, h = t.length; h > l; l++)
                        if (i = t[l], "M" == i[0]) s = i[1], r = i[2], a.push(s), o.push(r);
                        else {
                            var u = Ht(s, r, i[1], i[2], i[3], i[4], i[5], i[6]);
                            a = a[E](u.min.x, u.max.x), o = o[E](u.min.y, u.max.y), s = i[5], r = i[6]
                        }
                    var c = L[N](0, a),
                        d = L[N](0, o),
                        p = W[N](0, a),
                        f = W[N](0, o),
                        g = p - c,
                        m = f - d,
                        v = {
                            x: c,
                            y: d,
                            x2: p,
                            y2: f,
                            width: g,
                            height: m,
                            cx: c + g / 2,
                            cy: d + m / 2
                        };
                    return e.bbox = n(v), v
                },
                Mt = function(t) {
                    var e = n(t);
                    return e.toString = i._path2string, e
                },
                Nt = i._pathToRelative = function(t) {
                    var e = Dt(t);
                    if (e.rel) return Mt(e.rel);
                    i.is(t, U) && i.is(t && t[0], U) || (t = i.parsePathString(t));
                    var n = [],
                        s = 0,
                        r = 0,
                        a = 0,
                        o = 0,
                        l = 0;
                    "M" == t[0][0] && (s = t[0][1], r = t[0][2], a = s, o = r, l++, n.push(["M", s, r]));
                    for (var h = l, u = t.length; u > h; h++) {
                        var c = n[h] = [],
                            d = t[h];
                        if (d[0] != O.call(d[0])) switch (c[0] = O.call(d[0]), c[0]) {
                            case "a":
                                c[1] = d[1], c[2] = d[2], c[3] = d[3], c[4] = d[4], c[5] = d[5], c[6] = +(d[6] - s).toFixed(3), c[7] = +(d[7] - r).toFixed(3);
                                break;
                            case "v":
                                c[1] = +(d[1] - r).toFixed(3);
                                break;
                            case "m":
                                a = d[1], o = d[2];
                            default:
                                for (var p = 1, f = d.length; f > p; p++) c[p] = +(d[p] - (p % 2 ? s : r)).toFixed(3)
                        } else {
                            c = n[h] = [], "m" == d[0] && (a = d[1] + s, o = d[2] + r);
                            for (var g = 0, m = d.length; m > g; g++) n[h][g] = d[g]
                        }
                        var v = n[h].length;
                        switch (n[h][0]) {
                            case "z":
                                s = a, r = o;
                                break;
                            case "h":
                                s += +n[h][v - 1];
                                break;
                            case "v":
                                r += +n[h][v - 1];
                                break;
                            default:
                                s += +n[h][v - 2], r += +n[h][v - 1]
                        }
                    }
                    return n.toString = i._path2string, e.rel = Mt(n), n
                },
                Et = i._pathToAbsolute = function(t) {
                    var e = Dt(t);
                    if (e.abs) return Mt(e.abs);
                    if (i.is(t, U) && i.is(t && t[0], U) || (t = i.parsePathString(t)), !t || !t.length) return [
                        ["M", 0, 0]
                    ];
                    var n = [],
                        s = 0,
                        r = 0,
                        a = 0,
                        l = 0,
                        h = 0;
                    "M" == t[0][0] && (s = +t[0][1], r = +t[0][2], a = s, l = r, h++, n[0] = ["M", s, r]);
                    for (var u, c, d = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), p = h, f = t.length; f > p; p++) {
                        if (n.push(u = []), c = t[p], c[0] != et.call(c[0])) switch (u[0] = et.call(c[0]), u[0]) {
                                case "A":
                                    u[1] = c[1], u[2] = c[2], u[3] = c[3], u[4] = c[4], u[5] = c[5], u[6] = +(c[6] + s), u[7] = +(c[7] + r);
                                    break;
                                case "V":
                                    u[1] = +c[1] + r;
                                    break;
                                case "H":
                                    u[1] = +c[1] + s;
                                    break;
                                case "R":
                                    for (var g = [s, r][E](c.slice(1)), m = 2, v = g.length; v > m; m++) g[m] = +g[m] + s, g[++m] = +g[m] + r;
                                    n.pop(), n = n[E](o(g, d));
                                    break;
                                case "M":
                                    a = +c[1] + s, l = +c[2] + r;
                                default:
                                    for (m = 1, v = c.length; v > m; m++) u[m] = +c[m] + (m % 2 ? s : r)
                            } else if ("R" == c[0]) g = [s, r][E](c.slice(1)), n.pop(), n = n[E](o(g, d)), u = ["R"][E](c.slice(-2));
                            else
                                for (var y = 0, b = c.length; b > y; y++) u[y] = c[y];
                        switch (u[0]) {
                            case "Z":
                                s = a, r = l;
                                break;
                            case "H":
                                s = u[1];
                                break;
                            case "V":
                                r = u[1];
                                break;
                            case "M":
                                a = u[u.length - 2], l = u[u.length - 1];
                            default:
                                s = u[u.length - 2], r = u[u.length - 1]
                        }
                    }
                    return n.toString = i._path2string, e.abs = Mt(n), n
                },
                It = function(t, e, i, n) {
                    return [t, e, i, n, i, n]
                },
                At = function(t, e, i, n, s, r) {
                    var a = 1 / 3,
                        o = 2 / 3;
                    return [a * t + o * i, a * e + o * n, a * s + o * i, a * r + o * n, s, r]
                },
                Pt = function(t, e, i, n, s, a, o, l, h, u) {
                    var c, d = 120 * Y / 180,
                        p = Y / 180 * (+s || 0),
                        f = [],
                        g = r(function(t, e, i) {
                            var n = t * B.cos(i) - e * B.sin(i),
                                s = t * B.sin(i) + e * B.cos(i);
                            return {
                                x: n,
                                y: s
                            }
                        });
                    if (u) C = u[0], T = u[1], w = u[2], k = u[3];
                    else {
                        c = g(t, e, -p), t = c.x, e = c.y, c = g(l, h, -p), l = c.x, h = c.y;
                        var m = (B.cos(Y / 180 * s), B.sin(Y / 180 * s), (t - l) / 2),
                            v = (e - h) / 2,
                            y = m * m / (i * i) + v * v / (n * n);
                        y > 1 && (y = B.sqrt(y), i = y * i, n = y * n);
                        var b = i * i,
                            _ = n * n,
                            x = (a == o ? -1 : 1) * B.sqrt(R((b * _ - b * v * v - _ * m * m) / (b * v * v + _ * m * m))),
                            w = x * i * v / n + (t + l) / 2,
                            k = x * -n * m / i + (e + h) / 2,
                            C = B.asin(((e - k) / n).toFixed(9)),
                            T = B.asin(((h - k) / n).toFixed(9));
                        C = w > t ? Y - C : C, T = w > l ? Y - T : T, 0 > C && (C = 2 * Y + C), 0 > T && (T = 2 * Y + T), o && C > T && (C -= 2 * Y), !o && T > C && (T -= 2 * Y)
                    }
                    var D = T - C;
                    if (R(D) > d) {
                        var S = T,
                            M = l,
                            N = h;
                        T = C + d * (o && T > C ? 1 : -1), l = w + i * B.cos(T), h = k + n * B.sin(T), f = Pt(l, h, i, n, s, 0, o, M, N, [T, S, w, k])
                    }
                    D = T - C;
                    var I = B.cos(C),
                        A = B.sin(C),
                        P = B.cos(T),
                        z = B.sin(T),
                        F = B.tan(D / 4),
                        j = 4 / 3 * i * F,
                        O = 4 / 3 * n * F,
                        W = [t, e],
                        L = [t + j * A, e - O * I],
                        q = [l + j * z, h - O * P],
                        $ = [l, h];
                    if (L[0] = 2 * W[0] - L[0], L[1] = 2 * W[1] - L[1], u) return [L, q, $][E](f);
                    f = [L, q, $][E](f).join()[H](",");
                    for (var V = [], U = 0, X = f.length; X > U; U++) V[U] = U % 2 ? g(f[U - 1], f[U], p).y : g(f[U], f[U + 1], p).x;
                    return V
                },
                zt = function(t, e, i, n, s, r, a, o, l) {
                    var h = 1 - l;
                    return {
                        x: q(h, 3) * t + 3 * q(h, 2) * l * i + 3 * h * l * l * s + q(l, 3) * a,
                        y: q(h, 3) * e + 3 * q(h, 2) * l * n + 3 * h * l * l * r + q(l, 3) * o
                    }
                },
                Ht = r(function(t, e, i, n, s, r, a, o) {
                    var l, h = s - 2 * i + t - (a - 2 * s + i),
                        u = 2 * (i - t) - 2 * (s - i),
                        c = t - i,
                        d = (-u + B.sqrt(u * u - 4 * h * c)) / 2 / h,
                        p = (-u - B.sqrt(u * u - 4 * h * c)) / 2 / h,
                        f = [e, o],
                        g = [t, a];
                    return R(d) > "1e12" && (d = .5), R(p) > "1e12" && (p = .5), d > 0 && 1 > d && (l = zt(t, e, i, n, s, r, a, o, d), g.push(l.x), f.push(l.y)), p > 0 && 1 > p && (l = zt(t, e, i, n, s, r, a, o, p), g.push(l.x), f.push(l.y)), h = r - 2 * n + e - (o - 2 * r + n), u = 2 * (n - e) - 2 * (r - n), c = e - n, d = (-u + B.sqrt(u * u - 4 * h * c)) / 2 / h, p = (-u - B.sqrt(u * u - 4 * h * c)) / 2 / h, R(d) > "1e12" && (d = .5), R(p) > "1e12" && (p = .5), d > 0 && 1 > d && (l = zt(t, e, i, n, s, r, a, o, d), g.push(l.x), f.push(l.y)), p > 0 && 1 > p && (l = zt(t, e, i, n, s, r, a, o, p), g.push(l.x), f.push(l.y)), {
                        min: {
                            x: L[N](0, g),
                            y: L[N](0, f)
                        },
                        max: {
                            x: W[N](0, g),
                            y: W[N](0, f)
                        }
                    }
                }),
                Ft = i._path2curve = r(function(t, e) {
                    var i = !e && Dt(t);
                    if (!e && i.curve) return Mt(i.curve);
                    for (var n = Et(t), s = e && Et(e), r = {
                            x: 0,
                            y: 0,
                            bx: 0,
                            by: 0,
                            X: 0,
                            Y: 0,
                            qx: null,
                            qy: null
                        }, a = {
                            x: 0,
                            y: 0,
                            bx: 0,
                            by: 0,
                            X: 0,
                            Y: 0,
                            qx: null,
                            qy: null
                        }, o = (function(t, e, i) {
                            var n, s, r = {
                                T: 1,
                                Q: 1
                            };
                            if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
                            switch (!(t[0] in r) && (e.qx = e.qy = null), t[0]) {
                                case "M":
                                    e.X = t[1], e.Y = t[2];
                                    break;
                                case "A":
                                    t = ["C"][E](Pt[N](0, [e.x, e.y][E](t.slice(1))));
                                    break;
                                case "S":
                                    "C" == i || "S" == i ? (n = 2 * e.x - e.bx, s = 2 * e.y - e.by) : (n = e.x, s = e.y), t = ["C", n, s][E](t.slice(1));
                                    break;
                                case "T":
                                    "Q" == i || "T" == i ? (e.qx = 2 * e.x - e.qx, e.qy = 2 * e.y - e.qy) : (e.qx = e.x, e.qy = e.y), t = ["C"][E](At(e.x, e.y, e.qx, e.qy, t[1], t[2]));
                                    break;
                                case "Q":
                                    e.qx = t[1], e.qy = t[2], t = ["C"][E](At(e.x, e.y, t[1], t[2], t[3], t[4]));
                                    break;
                                case "L":
                                    t = ["C"][E](It(e.x, e.y, t[1], t[2]));
                                    break;
                                case "H":
                                    t = ["C"][E](It(e.x, e.y, t[1], e.y));
                                    break;
                                case "V":
                                    t = ["C"][E](It(e.x, e.y, e.x, t[1]));
                                    break;
                                case "Z":
                                    t = ["C"][E](It(e.x, e.y, e.X, e.Y))
                            }
                            return t
                        }), l = function(t, e) {
                            if (t[e].length > 7) {
                                t[e].shift();
                                for (var i = t[e]; i.length;) t.splice(e++, 0, ["C"][E](i.splice(0, 6)));
                                t.splice(e, 1), c = W(n.length, s && s.length || 0)
                            }
                        }, h = function(t, e, i, r, a) {
                            t && e && "M" == t[a][0] && "M" != e[a][0] && (e.splice(a, 0, ["M", r.x, r.y]), i.bx = 0, i.by = 0, i.x = t[a][1], i.y = t[a][2], c = W(n.length, s && s.length || 0))
                        }, u = 0, c = W(n.length, s && s.length || 0); c > u; u++) {
                        n[u] = o(n[u], r), l(n, u), s && (s[u] = o(s[u], a)), s && l(s, u), h(n, s, r, a, u), h(s, n, a, r, u);
                        var d = n[u],
                            p = s && s[u],
                            f = d.length,
                            g = s && p.length;
                        r.x = d[f - 2], r.y = d[f - 1], r.bx = Z(d[f - 4]) || r.x, r.by = Z(d[f - 3]) || r.y, a.bx = s && (Z(p[g - 4]) || a.x), a.by = s && (Z(p[g - 3]) || a.y), a.x = s && p[g - 2], a.y = s && p[g - 1]
                    }
                    return s || (i.curve = Mt(n)), s ? [n, s] : n
                }, null, Mt),
                jt = (i._parseDots = r(function(t) {
                    for (var e = [], n = 0, s = t.length; s > n; n++) {
                        var r = {},
                            a = t[n].match(/^([^:]*):?([\d\.]*)/);
                        if (r.color = i.getRGB(a[1]), r.color.error) return null;
                        r.color = r.color.hex, a[2] && (r.offset = a[2] + "%"), e.push(r)
                    }
                    for (n = 1, s = e.length - 1; s > n; n++)
                        if (!e[n].offset) {
                            for (var o = Z(e[n - 1].offset || 0), l = 0, h = n + 1; s > h; h++)
                                if (e[h].offset) {
                                    l = e[h].offset;
                                    break
                                }
                            l || (l = 100, h = s), l = Z(l);
                            for (var u = (l - o) / (h - n + 1); h > n; n++) o += u, e[n].offset = o + "%"
                        }
                    return e
                }), i._tear = function(t, e) {
                    t == e.top && (e.top = t.prev), t == e.bottom && (e.bottom = t.next), t.next && (t.next.prev = t.prev), t.prev && (t.prev.next = t.next)
                }),
                Ot = (i._tofront = function(t, e) {
                    e.top !== t && (jt(t, e), t.next = null, t.prev = e.top, e.top.next = t, e.top = t)
                }, i._toback = function(t, e) {
                    e.bottom !== t && (jt(t, e), t.next = e.bottom, t.prev = null, e.bottom.prev = t, e.bottom = t)
                }, i._insertafter = function(t, e, i) {
                    jt(t, i), e == i.top && (i.top = t), e.next && (e.next.prev = t), t.next = e.next, t.prev = e, e.next = t
                }, i._insertbefore = function(t, e, i) {
                    jt(t, i), e == i.bottom && (i.bottom = t), e.prev && (e.prev.next = t), t.prev = e.prev, e.prev = t, t.next = e
                }, i.toMatrix = function(t, e) {
                    var i = St(t),
                        n = {
                            _: {
                                transform: A
                            },
                            getBBox: function() {
                                return i
                            }
                        };
                    return Bt(n, e), n.matrix
                }),
                Bt = (i.transformPath = function(t, e) {
                    return vt(t, Ot(t, e))
                }, i._extractTransform = function(t, e) {
                    if (null == e) return t._.transform;
                    e = z(e).replace(/\.{3}|\u2026/g, t._.transform || A);
                    var n = i.parseTransformString(e),
                        s = 0,
                        r = 0,
                        a = 0,
                        o = 1,
                        l = 1,
                        h = t._,
                        u = new f;
                    if (h.transform = n || [], n)
                        for (var c = 0, d = n.length; d > c; c++) {
                            var p, g, m, v, y, b = n[c],
                                _ = b.length,
                                x = z(b[0]).toLowerCase(),
                                w = b[0] != x,
                                k = w ? u.invert() : 0;
                            "t" == x && 3 == _ ? w ? (p = k.x(0, 0), g = k.y(0, 0), m = k.x(b[1], b[2]), v = k.y(b[1], b[2]), u.translate(m - p, v - g)) : u.translate(b[1], b[2]) : "r" == x ? 2 == _ ? (y = y || t.getBBox(1), u.rotate(b[1], y.x + y.width / 2, y.y + y.height / 2), s += b[1]) : 4 == _ && (w ? (m = k.x(b[2], b[3]), v = k.y(b[2], b[3]), u.rotate(b[1], m, v)) : u.rotate(b[1], b[2], b[3]), s += b[1]) : "s" == x ? 2 == _ || 3 == _ ? (y = y || t.getBBox(1), u.scale(b[1], b[_ - 1], y.x + y.width / 2, y.y + y.height / 2), o *= b[1], l *= b[_ - 1]) : 5 == _ && (w ? (m = k.x(b[3], b[4]), v = k.y(b[3], b[4]), u.scale(b[1], b[2], m, v)) : u.scale(b[1], b[2], b[3], b[4]), o *= b[1], l *= b[2]) : "m" == x && 7 == _ && u.add(b[1], b[2], b[3], b[4], b[5], b[6]), h.dirtyT = 1, t.matrix = u
                        }
                    t.matrix = u, h.sx = o, h.sy = l, h.deg = s, h.dx = r = u.e, h.dy = a = u.f, 1 == o && 1 == l && !s && h.bbox ? (h.bbox.x += +r, h.bbox.y += +a) : h.dirtyT = 1
                }),
                Wt = function(t) {
                    var e = t[0];
                    switch (e.toLowerCase()) {
                        case "t":
                            return [e, 0, 0];
                        case "m":
                            return [e, 1, 0, 0, 1, 0, 0];
                        case "r":
                            return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];
                        case "s":
                            return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1]
                    }
                },
                Lt = i._equaliseTransform = function(t, e) {
                    e = z(e).replace(/\.{3}|\u2026/g, t), t = i.parseTransformString(t) || [], e = i.parseTransformString(e) || [];
                    for (var n, s, r, a, o = W(t.length, e.length), l = [], h = [], u = 0; o > u; u++) {
                        if (r = t[u] || Wt(e[u]), a = e[u] || Wt(r), r[0] != a[0] || "r" == r[0].toLowerCase() && (r[2] != a[2] || r[3] != a[3]) || "s" == r[0].toLowerCase() && (r[3] != a[3] || r[4] != a[4])) return;
                        for (l[u] = [], h[u] = [], n = 0, s = W(r.length, a.length); s > n; n++) n in r && (l[u][n] = r[n]), n in a && (h[u][n] = a[n])
                    }
                    return {
                        from: l,
                        to: h
                    }
                };
            i._getContainer = function(t, e, n, s) {
                    var r;
                    return r = null != s || i.is(t, "object") ? t : D.doc.getElementById(t), null != r ? r.tagName ? null == e ? {
                        container: r,
                        width: r.style.pixelWidth || r.offsetWidth,
                        height: r.style.pixelHeight || r.offsetHeight
                    } : {
                        container: r,
                        width: e,
                        height: n
                    } : {
                        container: 1,
                        x: t,
                        y: e,
                        width: n,
                        height: s
                    } : void 0
                }, i.pathToRelative = Nt, i._engine = {}, i.path2curve = Ft, i.matrix = function(t, e, i, n, s, r) {
                    return new f(t, e, i, n, s, r)
                },
                function(t) {
                    function e(t) {
                        return t[0] * t[0] + t[1] * t[1]
                    }

                    function n(t) {
                        var i = B.sqrt(e(t));
                        t[0] && (t[0] /= i), t[1] && (t[1] /= i)
                    }
                    t.add = function(t, e, i, n, s, r) {
                        var a, o, l, h, u = [
                                [],
                                [],
                                []
                            ],
                            c = [
                                [this.a, this.c, this.e],
                                [this.b, this.d, this.f],
                                [0, 0, 1]
                            ],
                            d = [
                                [t, i, s],
                                [e, n, r],
                                [0, 0, 1]
                            ];
                        for (t && t instanceof f && (d = [
                                [t.a, t.c, t.e],
                                [t.b, t.d, t.f],
                                [0, 0, 1]
                            ]), a = 0; 3 > a; a++)
                            for (o = 0; 3 > o; o++) {
                                for (h = 0, l = 0; 3 > l; l++) h += c[a][l] * d[l][o];
                                u[a][o] = h
                            }
                        this.a = u[0][0], this.b = u[1][0], this.c = u[0][1], this.d = u[1][1], this.e = u[0][2], this.f = u[1][2]
                    }, t.invert = function() {
                        var t = this,
                            e = t.a * t.d - t.b * t.c;
                        return new f(t.d / e, -t.b / e, -t.c / e, t.a / e, (t.c * t.f - t.d * t.e) / e, (t.b * t.e - t.a * t.f) / e)
                    }, t.clone = function() {
                        return new f(this.a, this.b, this.c, this.d, this.e, this.f)
                    }, t.translate = function(t, e) {
                        this.add(1, 0, 0, 1, t, e)
                    }, t.scale = function(t, e, i, n) {
                        null == e && (e = t), (i || n) && this.add(1, 0, 0, 1, i, n), this.add(t, 0, 0, e, 0, 0), (i || n) && this.add(1, 0, 0, 1, -i, -n)
                    }, t.rotate = function(t, e, n) {
                        t = i.rad(t), e = e || 0, n = n || 0;
                        var s = +B.cos(t).toFixed(9),
                            r = +B.sin(t).toFixed(9);
                        this.add(s, r, -r, s, e, n), this.add(1, 0, 0, 1, -e, -n)
                    }, t.x = function(t, e) {
                        return t * this.a + e * this.c + this.e
                    }, t.y = function(t, e) {
                        return t * this.b + e * this.d + this.f
                    }, t.get = function(t) {
                        return +this[z.fromCharCode(97 + t)].toFixed(4)
                    }, t.toString = function() {
                        return i.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
                    }, t.toFilter = function() {
                        return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
                    }, t.offset = function() {
                        return [this.e.toFixed(4), this.f.toFixed(4)]
                    }, t.split = function() {
                        var t = {};
                        t.dx = this.e, t.dy = this.f;
                        var s = [
                            [this.a, this.c],
                            [this.b, this.d]
                        ];
                        t.scalex = B.sqrt(e(s[0])), n(s[0]), t.shear = s[0][0] * s[1][0] + s[0][1] * s[1][1], s[1] = [s[1][0] - s[0][0] * t.shear, s[1][1] - s[0][1] * t.shear], t.scaley = B.sqrt(e(s[1])), n(s[1]), t.shear /= t.scaley;
                        var r = -s[0][1],
                            a = s[1][1];
                        return 0 > a ? (t.rotate = i.deg(B.acos(a)), 0 > r && (t.rotate = 360 - t.rotate)) : t.rotate = i.deg(B.asin(r)), t.isSimple = !(+t.shear.toFixed(9) || t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate), t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate, t.noRotation = !+t.shear.toFixed(9) && !t.rotate, t
                    }, t.toTransformString = function(t) {
                        var e = t || this[H]();
                        return e.isSimple ? (e.scalex = +e.scalex.toFixed(4), e.scaley = +e.scaley.toFixed(4), e.rotate = +e.rotate.toFixed(4), (e.dx || e.dy ? "t" + [e.dx, e.dy] : A) + (1 != e.scalex || 1 != e.scaley ? "s" + [e.scalex, e.scaley, 0, 0] : A) + (e.rotate ? "r" + [e.rotate, 0, 0] : A)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
                    }
                }(f.prototype);
            var Rt = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
            x.safari = "Apple Computer, Inc." == navigator.vendor && (Rt && Rt[1] < 4 || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && Rt && Rt[1] < 8 ? function() {
                var t = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
                    stroke: "none"
                });
                setTimeout(function() {
                    t.remove()
                })
            } : dt;
            for (var qt = function() {
                    this.returnValue = !1
                }, Yt = function() {
                    return this.originalEvent.preventDefault()
                }, $t = function() {
                    this.cancelBubble = !0
                }, Vt = function() {
                    return this.originalEvent.stopPropagation()
                }, Ut = function(t) {
                    var e = D.doc.documentElement.scrollTop || D.doc.body.scrollTop,
                        i = D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft;
                    return {
                        x: t.clientX + i,
                        y: t.clientY + e
                    }
                }, Xt = function() {
                    return D.doc.addEventListener ? function(t, e, i, n) {
                        var s = function(t) {
                            var e = Ut(t);
                            return i.call(n, t, e.x, e.y)
                        };
                        if (t.addEventListener(e, s, !1), I && j[e]) {
                            var r = function(e) {
                                for (var s = Ut(e), r = e, a = 0, o = e.targetTouches && e.targetTouches.length; o > a; a++)
                                    if (e.targetTouches[a].target == t) {
                                        e = e.targetTouches[a], e.originalEvent = r, e.preventDefault = Yt, e.stopPropagation = Vt;
                                        break
                                    }
                                return i.call(n, e, s.x, s.y)
                            };
                            t.addEventListener(j[e], r, !1)
                        }
                        return function() {
                            return t.removeEventListener(e, s, !1), I && j[e] && t.removeEventListener(j[e], s, !1), !0
                        }
                    } : D.doc.attachEvent ? function(t, e, i, n) {
                        var s = function(t) {
                            t = t || D.win.event;
                            var e = D.doc.documentElement.scrollTop || D.doc.body.scrollTop,
                                s = D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft,
                                r = t.clientX + s,
                                a = t.clientY + e;
                            return t.preventDefault = t.preventDefault || qt, t.stopPropagation = t.stopPropagation || $t, i.call(n, t, r, a)
                        };
                        t.attachEvent("on" + e, s);
                        var r = function() {
                            return t.detachEvent("on" + e, s), !0
                        };
                        return r
                    } : void 0
                }(), Kt = [], Gt = function(t) {
                    for (var i, n = t.clientX, s = t.clientY, r = D.doc.documentElement.scrollTop || D.doc.body.scrollTop, a = D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft, o = Kt.length; o--;) {
                        if (i = Kt[o], I && t.touches) {
                            for (var l, h = t.touches.length; h--;)
                                if (l = t.touches[h], l.identifier == i.el._drag.id) {
                                    n = l.clientX, s = l.clientY, (t.originalEvent ? t.originalEvent : t).preventDefault();
                                    break
                                }
                        } else t.preventDefault();
                        var u, c = i.el.node,
                            d = c.nextSibling,
                            p = c.parentNode,
                            f = c.style.display;
                        D.win.opera && p.removeChild(c), c.style.display = "none", u = i.el.paper.getElementByPoint(n, s), c.style.display = f, D.win.opera && (d ? p.insertBefore(c, d) : p.appendChild(c)), u && e("raphael.drag.over." + i.el.id, i.el, u), n += a, s += r, e("raphael.drag.move." + i.el.id, i.move_scope || i.el, n - i.el._drag.x, s - i.el._drag.y, n, s, t)
                    }
                }, Qt = function(t) {
                    i.unmousemove(Gt).unmouseup(Qt);
                    for (var n, s = Kt.length; s--;) n = Kt[s], n.el._drag = {}, e("raphael.drag.end." + n.el.id, n.end_scope || n.start_scope || n.move_scope || n.el, t);
                    Kt = []
                }, Jt = i.el = {}, Zt = F.length; Zt--;) ! function(t) {
                i[t] = Jt[t] = function(e, n) {
                    return i.is(e, "function") && (this.events = this.events || [], this.events.push({
                        name: t,
                        f: e,
                        unbind: Xt(this.shape || this.node || D.doc, t, e, n || this)
                    })), this
                }, i["un" + t] = Jt["un" + t] = function(e) {
                    for (var n = this.events || [], s = n.length; s--;) n[s].name != t || !i.is(e, "undefined") && n[s].f != e || (n[s].unbind(), n.splice(s, 1), !n.length && delete this.events);
                    return this
                }
            }(F[Zt]);
            Jt.data = function(t, n) {
                var s = ut[this.id] = ut[this.id] || {};
                if (0 == arguments.length) return s;
                if (1 == arguments.length) {
                    if (i.is(t, "object")) {
                        for (var r in t) t[T](r) && this.data(r, t[r]);
                        return this
                    }
                    return e("raphael.data.get." + this.id, this, s[t], t), s[t]
                }
                return s[t] = n, e("raphael.data.set." + this.id, this, n, t), this
            }, Jt.removeData = function(t) {
                return null == t ? ut[this.id] = {} : ut[this.id] && delete ut[this.id][t], this
            }, Jt.getData = function() {
                return n(ut[this.id] || {})
            }, Jt.hover = function(t, e, i, n) {
                return this.mouseover(t, i).mouseout(e, n || i)
            }, Jt.unhover = function(t, e) {
                return this.unmouseover(t).unmouseout(e)
            };
            var te = [];
            Jt.drag = function(t, n, s, r, a, o) {
                function l(l) {
                    (l.originalEvent || l).preventDefault();
                    var h = l.clientX,
                        u = l.clientY,
                        c = D.doc.documentElement.scrollTop || D.doc.body.scrollTop,
                        d = D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft;
                    if (this._drag.id = l.identifier, I && l.touches)
                        for (var p, f = l.touches.length; f--;)
                            if (p = l.touches[f],
                                this._drag.id = p.identifier, p.identifier == this._drag.id) {
                                h = p.clientX, u = p.clientY;
                                break
                            }
                    this._drag.x = h + d, this._drag.y = u + c, !Kt.length && i.mousemove(Gt).mouseup(Qt), Kt.push({
                        el: this,
                        move_scope: r,
                        start_scope: a,
                        end_scope: o
                    }), n && e.on("raphael.drag.start." + this.id, n), t && e.on("raphael.drag.move." + this.id, t), s && e.on("raphael.drag.end." + this.id, s), e("raphael.drag.start." + this.id, a || r || this, l.clientX + d, l.clientY + c, l)
                }
                return this._drag = {}, te.push({
                    el: this,
                    start: l
                }), this.mousedown(l), this
            }, Jt.onDragOver = function(t) {
                t ? e.on("raphael.drag.over." + this.id, t) : e.unbind("raphael.drag.over." + this.id)
            }, Jt.undrag = function() {
                for (var t = te.length; t--;) te[t].el == this && (this.unmousedown(te[t].start), te.splice(t, 1), e.unbind("raphael.drag.*." + this.id));
                !te.length && i.unmousemove(Gt).unmouseup(Qt), Kt = []
            }, x.circle = function(t, e, n) {
                var s = i._engine.circle(this, t || 0, e || 0, n || 0);
                return this.__set__ && this.__set__.push(s), s
            }, x.rect = function(t, e, n, s, r) {
                var a = i._engine.rect(this, t || 0, e || 0, n || 0, s || 0, r || 0);
                return this.__set__ && this.__set__.push(a), a
            }, x.ellipse = function(t, e, n, s) {
                var r = i._engine.ellipse(this, t || 0, e || 0, n || 0, s || 0);
                return this.__set__ && this.__set__.push(r), r
            }, x.path = function(t) {
                t && !i.is(t, V) && !i.is(t[0], U) && (t += A);
                var e = i._engine.path(i.format[N](i, arguments), this);
                return this.__set__ && this.__set__.push(e), e
            }, x.image = function(t, e, n, s, r) {
                var a = i._engine.image(this, t || "about:blank", e || 0, n || 0, s || 0, r || 0);
                return this.__set__ && this.__set__.push(a), a
            }, x.text = function(t, e, n) {
                var s = i._engine.text(this, t || 0, e || 0, z(n));
                return this.__set__ && this.__set__.push(s), s
            }, x.set = function(t) {
                !i.is(t, "array") && (t = Array.prototype.splice.call(arguments, 0, arguments.length));
                var e = new de(t);
                return this.__set__ && this.__set__.push(e), e.paper = this, e.type = "set", e
            }, x.setStart = function(t) {
                this.__set__ = t || this.set()
            }, x.setFinish = function() {
                var t = this.__set__;
                return delete this.__set__, t
            }, x.setSize = function(t, e) {
                return i._engine.setSize.call(this, t, e)
            }, x.setViewBox = function(t, e, n, s, r) {
                return i._engine.setViewBox.call(this, t, e, n, s, r)
            }, x.top = x.bottom = null, x.raphael = i;
            var ee = function(t) {
                var e = t.getBoundingClientRect(),
                    i = t.ownerDocument,
                    n = i.body,
                    s = i.documentElement,
                    r = s.clientTop || n.clientTop || 0,
                    a = s.clientLeft || n.clientLeft || 0,
                    o = e.top + (D.win.pageYOffset || s.scrollTop || n.scrollTop) - r,
                    l = e.left + (D.win.pageXOffset || s.scrollLeft || n.scrollLeft) - a;
                return {
                    y: o,
                    x: l
                }
            };
            x.getElementByPoint = function(t, e) {
                var i = this,
                    n = i.canvas,
                    s = D.doc.elementFromPoint(t, e);
                if (D.win.opera && "svg" == s.tagName) {
                    var r = ee(n),
                        a = n.createSVGRect();
                    a.x = t - r.x, a.y = e - r.y, a.width = a.height = 1;
                    var o = n.getIntersectionList(a, null);
                    o.length && (s = o[o.length - 1])
                }
                if (!s) return null;
                for (; s.parentNode && s != n.parentNode && !s.raphael;) s = s.parentNode;
                return s == i.canvas.parentNode && (s = n), s = s && s.raphael ? i.getById(s.raphaelid) : null
            }, x.getElementsByBBox = function(t) {
                var e = this.set();
                return this.forEach(function(n) {
                    i.isBBoxIntersect(n.getBBox(), t) && e.push(n)
                }), e
            }, x.getById = function(t) {
                for (var e = this.bottom; e;) {
                    if (e.id == t) return e;
                    e = e.next
                }
                return null
            }, x.forEach = function(t, e) {
                for (var i = this.bottom; i;) {
                    if (t.call(e, i) === !1) return this;
                    i = i.next
                }
                return this
            }, x.getElementsByPoint = function(t, e) {
                var i = this.set();
                return this.forEach(function(n) {
                    n.isPointInside(t, e) && i.push(n)
                }), i
            }, Jt.isPointInside = function(t, e) {
                var n = this.realPath = mt[this.type](this);
                return this.attr("transform") && this.attr("transform").length && (n = i.transformPath(n, this.attr("transform"))), i.isPointInsidePath(n, t, e)
            }, Jt.getBBox = function(t) {
                if (this.removed) return {};
                var e = this._;
                return t ? ((e.dirty || !e.bboxwt) && (this.realPath = mt[this.type](this), e.bboxwt = St(this.realPath), e.bboxwt.toString = g, e.dirty = 0), e.bboxwt) : ((e.dirty || e.dirtyT || !e.bbox) && ((e.dirty || !this.realPath) && (e.bboxwt = 0, this.realPath = mt[this.type](this)), e.bbox = St(vt(this.realPath, this.matrix)), e.bbox.toString = g, e.dirty = e.dirtyT = 0), e.bbox)
            }, Jt.clone = function() {
                if (this.removed) return null;
                var t = this.paper[this.type]().attr(this.attr());
                return this.__set__ && this.__set__.push(t), t
            }, Jt.glow = function(t) {
                if ("text" == this.type) return null;
                t = t || {};
                var e = {
                        width: (t.width || 10) + (+this.attr("stroke-width") || 1),
                        fill: t.fill || !1,
                        opacity: t.opacity || .5,
                        offsetx: t.offsetx || 0,
                        offsety: t.offsety || 0,
                        color: t.color || "#000"
                    },
                    i = e.width / 2,
                    n = this.paper,
                    s = n.set(),
                    r = this.realPath || mt[this.type](this);
                r = this.matrix ? vt(r, this.matrix) : r;
                for (var a = 1; i + 1 > a; a++) s.push(n.path(r).attr({
                    stroke: e.color,
                    fill: e.fill ? e.color : "none",
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round",
                    "stroke-width": +(e.width / i * a).toFixed(3),
                    opacity: +(e.opacity / i).toFixed(3)
                }));
                return s.insertBefore(this).translate(e.offsetx, e.offsety)
            };
            var ie = function(t, e, n, s, r, a, o, l, c) {
                    return null == c ? h(t, e, n, s, r, a, o, l) : i.findDotsAtSegment(t, e, n, s, r, a, o, l, u(t, e, n, s, r, a, o, l, c))
                },
                ne = function(t, e) {
                    return function(n, s, r) {
                        n = Ft(n);
                        for (var a, o, l, h, u, c = "", d = {}, p = 0, f = 0, g = n.length; g > f; f++) {
                            if (l = n[f], "M" == l[0]) a = +l[1], o = +l[2];
                            else {
                                if (h = ie(a, o, l[1], l[2], l[3], l[4], l[5], l[6]), p + h > s) {
                                    if (e && !d.start) {
                                        if (u = ie(a, o, l[1], l[2], l[3], l[4], l[5], l[6], s - p), c += ["C" + u.start.x, u.start.y, u.m.x, u.m.y, u.x, u.y], r) return c;
                                        d.start = c, c = ["M" + u.x, u.y + "C" + u.n.x, u.n.y, u.end.x, u.end.y, l[5], l[6]].join(), p += h, a = +l[5], o = +l[6];
                                        continue
                                    }
                                    if (!t && !e) return u = ie(a, o, l[1], l[2], l[3], l[4], l[5], l[6], s - p), {
                                        x: u.x,
                                        y: u.y,
                                        alpha: u.alpha
                                    }
                                }
                                p += h, a = +l[5], o = +l[6]
                            }
                            c += l.shift() + l
                        }
                        return d.end = c, u = t ? p : e ? d : i.findDotsAtSegment(a, o, l[0], l[1], l[2], l[3], l[4], l[5], 1), u.alpha && (u = {
                            x: u.x,
                            y: u.y,
                            alpha: u.alpha
                        }), u
                    }
                },
                se = ne(1),
                re = ne(),
                ae = ne(0, 1);
            i.getTotalLength = se, i.getPointAtLength = re, i.getSubpath = function(t, e, i) {
                if (this.getTotalLength(t) - i < 1e-6) return ae(t, e).end;
                var n = ae(t, i, 1);
                return e ? ae(n, e).end : n
            }, Jt.getTotalLength = function() {
                var t = this.getPath();
                return t ? this.node.getTotalLength ? this.node.getTotalLength() : se(t) : void 0
            }, Jt.getPointAtLength = function(t) {
                var e = this.getPath();
                return e ? re(e, t) : void 0
            }, Jt.getPath = function() {
                var t, e = i._getPath[this.type];
                return "text" != this.type && "set" != this.type ? (e && (t = e(this)), t) : void 0
            }, Jt.getSubpath = function(t, e) {
                var n = this.getPath();
                return n ? i.getSubpath(n, t, e) : void 0
            };
            var oe = i.easing_formulas = {
                linear: function(t) {
                    return t
                },
                "<": function(t) {
                    return q(t, 1.7)
                },
                ">": function(t) {
                    return q(t, .48)
                },
                "<>": function(t) {
                    var e = .48 - t / 1.04,
                        i = B.sqrt(.1734 + e * e),
                        n = i - e,
                        s = q(R(n), 1 / 3) * (0 > n ? -1 : 1),
                        r = -i - e,
                        a = q(R(r), 1 / 3) * (0 > r ? -1 : 1),
                        o = s + a + .5;
                    return 3 * (1 - o) * o * o + o * o * o
                },
                backIn: function(t) {
                    var e = 1.70158;
                    return t * t * ((e + 1) * t - e)
                },
                backOut: function(t) {
                    t -= 1;
                    var e = 1.70158;
                    return t * t * ((e + 1) * t + e) + 1
                },
                elastic: function(t) {
                    return t == !!t ? t : q(2, -10 * t) * B.sin(2 * (t - .075) * Y / .3) + 1
                },
                bounce: function(t) {
                    var e, i = 7.5625,
                        n = 2.75;
                    return 1 / n > t ? e = i * t * t : 2 / n > t ? (t -= 1.5 / n, e = i * t * t + .75) : 2.5 / n > t ? (t -= 2.25 / n, e = i * t * t + .9375) : (t -= 2.625 / n, e = i * t * t + .984375), e
                }
            };
            oe.easeIn = oe["ease-in"] = oe["<"], oe.easeOut = oe["ease-out"] = oe[">"], oe.easeInOut = oe["ease-in-out"] = oe["<>"], oe["back-in"] = oe.backIn, oe["back-out"] = oe.backOut;
            var le = [],
                he = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(t) {
                    setTimeout(t, 16)
                },
                ue = function() {
                    for (var t = +new Date, n = 0; n < le.length; n++) {
                        var s = le[n];
                        if (!s.el.removed && !s.paused) {
                            var r, a, o = t - s.start,
                                l = s.ms,
                                h = s.easing,
                                u = s.from,
                                c = s.diff,
                                d = s.to,
                                p = (s.t, s.el),
                                f = {},
                                g = {};
                            if (s.initstatus ? (o = (s.initstatus * s.anim.top - s.prev) / (s.percent - s.prev) * l, s.status = s.initstatus, delete s.initstatus, s.stop && le.splice(n--, 1)) : s.status = (s.prev + (s.percent - s.prev) * (o / l)) / s.anim.top, !(0 > o))
                                if (l > o) {
                                    var m = h(o / l);
                                    for (var v in u)
                                        if (u[T](v)) {
                                            switch (nt[v]) {
                                                case $:
                                                    r = +u[v] + m * l * c[v];
                                                    break;
                                                case "colour":
                                                    r = "rgb(" + [ce(J(u[v].r + m * l * c[v].r)), ce(J(u[v].g + m * l * c[v].g)), ce(J(u[v].b + m * l * c[v].b))].join(",") + ")";
                                                    break;
                                                case "path":
                                                    r = [];
                                                    for (var b = 0, _ = u[v].length; _ > b; b++) {
                                                        r[b] = [u[v][b][0]];
                                                        for (var x = 1, w = u[v][b].length; w > x; x++) r[b][x] = +u[v][b][x] + m * l * c[v][b][x];
                                                        r[b] = r[b].join(P)
                                                    }
                                                    r = r.join(P);
                                                    break;
                                                case "transform":
                                                    if (c[v].real)
                                                        for (r = [], b = 0, _ = u[v].length; _ > b; b++)
                                                            for (r[b] = [u[v][b][0]], x = 1, w = u[v][b].length; w > x; x++) r[b][x] = u[v][b][x] + m * l * c[v][b][x];
                                                    else {
                                                        var k = function(t) {
                                                            return +u[v][t] + m * l * c[v][t]
                                                        };
                                                        r = [
                                                            ["m", k(0), k(1), k(2), k(3), k(4), k(5)]
                                                        ]
                                                    }
                                                    break;
                                                case "csv":
                                                    if ("clip-rect" == v)
                                                        for (r = [], b = 4; b--;) r[b] = +u[v][b] + m * l * c[v][b];
                                                    break;
                                                default:
                                                    var C = [][E](u[v]);
                                                    for (r = [], b = p.paper.customAttributes[v].length; b--;) r[b] = +C[b] + m * l * c[v][b]
                                            }
                                            f[v] = r
                                        }
                                    p.attr(f),
                                        function(t, i, n) {
                                            setTimeout(function() {
                                                e("raphael.anim.frame." + t, i, n)
                                            })
                                        }(p.id, p, s.anim)
                                } else {
                                    if (function(t, n, s) {
                                            setTimeout(function() {
                                                e("raphael.anim.frame." + n.id, n, s), e("raphael.anim.finish." + n.id, n, s), i.is(t, "function") && t.call(n)
                                            })
                                        }(s.callback, p, s.anim), p.attr(d), le.splice(n--, 1), s.repeat > 1 && !s.next) {
                                        for (a in d) d[T](a) && (g[a] = s.totalOrigin[a]);
                                        s.el.attr(g), y(s.anim, s.el, s.anim.percents[0], null, s.totalOrigin, s.repeat - 1)
                                    }
                                    s.next && !s.stop && y(s.anim, s.el, s.next, null, s.totalOrigin, s.repeat)
                                }
                        }
                    }
                    i.svg && p && p.paper && p.paper.safari(), le.length && he(ue)
                },
                ce = function(t) {
                    return t > 255 ? 255 : 0 > t ? 0 : t
                };
            Jt.animateWith = function(t, e, n, s, r, a) {
                var o = this;
                if (o.removed) return a && a.call(o), o;
                var l = n instanceof v ? n : i.animation(n, s, r, a);
                y(l, o, l.percents[0], null, o.attr());
                for (var h = 0, u = le.length; u > h; h++)
                    if (le[h].anim == e && le[h].el == t) {
                        le[u - 1].start = le[h].start;
                        break
                    }
                return o
            }, Jt.onAnimation = function(t) {
                return t ? e.on("raphael.anim.frame." + this.id, t) : e.unbind("raphael.anim.frame." + this.id), this
            }, v.prototype.delay = function(t) {
                var e = new v(this.anim, this.ms);
                return e.times = this.times, e.del = +t || 0, e
            }, v.prototype.repeat = function(t) {
                var e = new v(this.anim, this.ms);
                return e.del = this.del, e.times = B.floor(W(t, 0)) || 1, e
            }, i.animation = function(t, e, n, s) {
                if (t instanceof v) return t;
                (i.is(n, "function") || !n) && (s = s || n || null, n = null), t = Object(t), e = +e || 0;
                var r, a, o = {};
                for (a in t) t[T](a) && Z(a) != a && Z(a) + "%" != a && (r = !0, o[a] = t[a]);
                return r ? (n && (o.easing = n), s && (o.callback = s), new v({
                    100: o
                }, e)) : new v(t, e)
            }, Jt.animate = function(t, e, n, s) {
                var r = this;
                if (r.removed) return s && s.call(r), r;
                var a = t instanceof v ? t : i.animation(t, e, n, s);
                return y(a, r, a.percents[0], null, r.attr()), r
            }, Jt.setTime = function(t, e) {
                return t && null != e && this.status(t, L(e, t.ms) / t.ms), this
            }, Jt.status = function(t, e) {
                var i, n, s = [],
                    r = 0;
                if (null != e) return y(t, this, -1, L(e, 1)), this;
                for (i = le.length; i > r; r++)
                    if (n = le[r], n.el.id == this.id && (!t || n.anim == t)) {
                        if (t) return n.status;
                        s.push({
                            anim: n.anim,
                            status: n.status
                        })
                    }
                return t ? 0 : s
            }, Jt.pause = function(t) {
                for (var i = 0; i < le.length; i++) le[i].el.id != this.id || t && le[i].anim != t || e("raphael.anim.pause." + this.id, this, le[i].anim) !== !1 && (le[i].paused = !0);
                return this
            }, Jt.resume = function(t) {
                for (var i = 0; i < le.length; i++)
                    if (le[i].el.id == this.id && (!t || le[i].anim == t)) {
                        var n = le[i];
                        e("raphael.anim.resume." + this.id, this, n.anim) !== !1 && (delete n.paused, this.status(n.anim, n.status))
                    }
                return this
            }, Jt.stop = function(t) {
                for (var i = 0; i < le.length; i++) le[i].el.id != this.id || t && le[i].anim != t || e("raphael.anim.stop." + this.id, this, le[i].anim) !== !1 && le.splice(i--, 1);
                return this
            }, e.on("raphael.remove", b), e.on("raphael.clear", b), Jt.toString = function() {
                return "Raphaël’s object"
            };
            var de = function(t) {
                    if (this.items = [], this.length = 0, this.type = "set", t)
                        for (var e = 0, i = t.length; i > e; e++) !t[e] || t[e].constructor != Jt.constructor && t[e].constructor != de || (this[this.items.length] = this.items[this.items.length] = t[e], this.length++)
                },
                pe = de.prototype;
            pe.push = function() {
                for (var t, e, i = 0, n = arguments.length; n > i; i++) t = arguments[i], !t || t.constructor != Jt.constructor && t.constructor != de || (e = this.items.length, this[e] = this.items[e] = t, this.length++);
                return this
            }, pe.pop = function() {
                return this.length && delete this[this.length--], this.items.pop()
            }, pe.forEach = function(t, e) {
                for (var i = 0, n = this.items.length; n > i; i++)
                    if (t.call(e, this.items[i], i) === !1) return this;
                return this
            };
            for (var fe in Jt) Jt[T](fe) && (pe[fe] = function(t) {
                return function() {
                    var e = arguments;
                    return this.forEach(function(i) {
                        i[t][N](i, e)
                    })
                }
            }(fe));
            return pe.attr = function(t, e) {
                    if (t && i.is(t, U) && i.is(t[0], "object"))
                        for (var n = 0, s = t.length; s > n; n++) this.items[n].attr(t[n]);
                    else
                        for (var r = 0, a = this.items.length; a > r; r++) this.items[r].attr(t, e);
                    return this
                }, pe.clear = function() {
                    for (; this.length;) this.pop()
                }, pe.splice = function(t, e) {
                    t = 0 > t ? W(this.length + t, 0) : t, e = W(0, L(this.length - t, e));
                    var i, n = [],
                        s = [],
                        r = [];
                    for (i = 2; i < arguments.length; i++) r.push(arguments[i]);
                    for (i = 0; e > i; i++) s.push(this[t + i]);
                    for (; i < this.length - t; i++) n.push(this[t + i]);
                    var a = r.length;
                    for (i = 0; i < a + n.length; i++) this.items[t + i] = this[t + i] = a > i ? r[i] : n[i - a];
                    for (i = this.items.length = this.length -= e - a; this[i];) delete this[i++];
                    return new de(s)
                }, pe.exclude = function(t) {
                    for (var e = 0, i = this.length; i > e; e++)
                        if (this[e] == t) return this.splice(e, 1), !0
                }, pe.animate = function(t, e, n, s) {
                    (i.is(n, "function") || !n) && (s = n || null);
                    var r, a, o = this.items.length,
                        l = o,
                        h = this;
                    if (!o) return this;
                    s && (a = function() {
                        !--o && s.call(h)
                    }), n = i.is(n, V) ? n : a;
                    var u = i.animation(t, e, n, a);
                    for (r = this.items[--l].animate(u); l--;) this.items[l] && !this.items[l].removed && this.items[l].animateWith(r, u, u), this.items[l] && !this.items[l].removed || o--;
                    return this
                }, pe.insertAfter = function(t) {
                    for (var e = this.items.length; e--;) this.items[e].insertAfter(t);
                    return this
                }, pe.getBBox = function() {
                    for (var t = [], e = [], i = [], n = [], s = this.items.length; s--;)
                        if (!this.items[s].removed) {
                            var r = this.items[s].getBBox();
                            t.push(r.x), e.push(r.y), i.push(r.x + r.width), n.push(r.y + r.height)
                        }
                    return t = L[N](0, t), e = L[N](0, e), i = W[N](0, i), n = W[N](0, n), {
                        x: t,
                        y: e,
                        x2: i,
                        y2: n,
                        width: i - t,
                        height: n - e
                    }
                }, pe.clone = function(t) {
                    t = this.paper.set();
                    for (var e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].clone());
                    return t
                }, pe.toString = function() {
                    return "Raphaël‘s set"
                }, pe.glow = function(t) {
                    var e = this.paper.set();
                    return this.forEach(function(i) {
                        var n = i.glow(t);
                        null != n && n.forEach(function(t) {
                            e.push(t)
                        })
                    }), e
                }, pe.isPointInside = function(t, e) {
                    var i = !1;
                    return this.forEach(function(n) {
                        return n.isPointInside(t, e) ? (i = !0, !1) : void 0
                    }), i
                }, i.registerFont = function(t) {
                    if (!t.face) return t;
                    this.fonts = this.fonts || {};
                    var e = {
                            w: t.w,
                            face: {},
                            glyphs: {}
                        },
                        i = t.face["font-family"];
                    for (var n in t.face) t.face[T](n) && (e.face[n] = t.face[n]);
                    if (this.fonts[i] ? this.fonts[i].push(e) : this.fonts[i] = [e], !t.svg) {
                        e.face["units-per-em"] = tt(t.face["units-per-em"], 10);
                        for (var s in t.glyphs)
                            if (t.glyphs[T](s)) {
                                var r = t.glyphs[s];
                                if (e.glyphs[s] = {
                                        w: r.w,
                                        k: {},
                                        d: r.d && "M" + r.d.replace(/[mlcxtrv]/g, function(t) {
                                            return {
                                                l: "L",
                                                c: "C",
                                                x: "z",
                                                t: "m",
                                                r: "l",
                                                v: "c"
                                            }[t] || "M"
                                        }) + "z"
                                    }, r.k)
                                    for (var a in r.k) r[T](a) && (e.glyphs[s].k[a] = r.k[a])
                            }
                    }
                    return t
                }, x.getFont = function(t, e, n, s) {
                    if (s = s || "normal", n = n || "normal", e = +e || {
                            normal: 400,
                            bold: 700,
                            lighter: 300,
                            bolder: 800
                        }[e] || 400, i.fonts) {
                        var r = i.fonts[t];
                        if (!r) {
                            var a = new RegExp("(^|\\s)" + t.replace(/[^\w\d\s+!~.:_-]/g, A) + "(\\s|$)", "i");
                            for (var o in i.fonts)
                                if (i.fonts[T](o) && a.test(o)) {
                                    r = i.fonts[o];
                                    break
                                }
                        }
                        var l;
                        if (r)
                            for (var h = 0, u = r.length; u > h && (l = r[h], l.face["font-weight"] != e || l.face["font-style"] != n && l.face["font-style"] || l.face["font-stretch"] != s); h++);
                        return l
                    }
                }, x.print = function(t, e, n, s, r, a, o, l) {
                    a = a || "middle", o = W(L(o || 0, 1), -1), l = W(L(l || 1, 3), 1);
                    var h, u = z(n)[H](A),
                        c = 0,
                        d = 0,
                        p = A;
                    if (i.is(s, "string") && (s = this.getFont(s)), s) {
                        h = (r || 16) / s.face["units-per-em"];
                        for (var f = s.face.bbox[H](w), g = +f[0], m = f[3] - f[1], v = 0, y = +f[1] + ("baseline" == a ? m + +s.face.descent : m / 2), b = 0, _ = u.length; _ > b; b++) {
                            if ("\n" == u[b]) c = 0, k = 0, d = 0, v += m * l;
                            else {
                                var x = d && s.glyphs[u[b - 1]] || {},
                                    k = s.glyphs[u[b]];
                                c += d ? (x.w || s.w) + (x.k && x.k[u[b]] || 0) + s.w * o : 0, d = 1
                            }
                            k && k.d && (p += i.transformPath(k.d, ["t", c * h, v * h, "s", h, h, g, y, "t", (t - g) / h, (e - y) / h]))
                        }
                    }
                    return this.path(p).attr({
                        fill: "#000",
                        stroke: "none"
                    })
                }, x.add = function(t) {
                    if (i.is(t, "array"))
                        for (var e, n = this.set(), s = 0, r = t.length; r > s; s++) e = t[s] || {}, k[T](e.type) && n.push(this[e.type]().attr(e));
                    return n
                }, i.format = function(t, e) {
                    var n = i.is(e, U) ? [0][E](e) : arguments;
                    return t && i.is(t, V) && n.length - 1 && (t = t.replace(C, function(t, e) {
                        return null == n[++e] ? A : n[e]
                    })), t || A
                }, i.fullfill = function() {
                    var t = /\{([^\}]+)\}/g,
                        e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                        i = function(t, i, n) {
                            var s = n;
                            return i.replace(e, function(t, e, i, n, r) {
                                e = e || n, s && (e in s && (s = s[e]), "function" == typeof s && r && (s = s()))
                            }), s = (null == s || s == n ? t : s) + ""
                        };
                    return function(e, n) {
                        return String(e).replace(t, function(t, e) {
                            return i(t, e, n)
                        })
                    }
                }(), i.ninja = function() {
                    return S.was ? D.win.Raphael = S.is : delete Raphael, i
                }, i.st = pe,
                function(t, e, n) {
                    function s() {
                        /in/.test(t.readyState) ? setTimeout(s, 9) : i.eve("raphael.DOMload")
                    }
                    null == t.readyState && t.addEventListener && (t.addEventListener(e, n = function() {
                        t.removeEventListener(e, n, !1), t.readyState = "complete"
                    }, !1), t.readyState = "loading"), s()
                }(document, "DOMContentLoaded"), e.on("raphael.DOMload", function() {
                    _ = !0
                }),
                function() {
                    if (i.svg) {
                        var t = "hasOwnProperty",
                            e = String,
                            n = parseFloat,
                            s = parseInt,
                            r = Math,
                            a = r.max,
                            o = r.abs,
                            l = r.pow,
                            h = /[, ]+/,
                            u = i.eve,
                            c = "",
                            d = " ",
                            p = "http://www.w3.org/1999/xlink",
                            f = {
                                block: "M5,0 0,2.5 5,5z",
                                classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                                diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                                open: "M6,1 1,3.5 6,6",
                                oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
                            },
                            g = {};
                        i.toString = function() {
                            return "Your browser supports SVG.\nYou are running Raphaël " + this.version
                        };
                        var m = function(n, s) {
                                if (s) {
                                    "string" == typeof n && (n = m(n));
                                    for (var r in s) s[t](r) && ("xlink:" == r.substring(0, 6) ? n.setAttributeNS(p, r.substring(6), e(s[r])) : n.setAttribute(r, e(s[r])))
                                } else n = i._g.doc.createElementNS("http://www.w3.org/2000/svg", n), n.style && (n.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                                return n
                            },
                            v = function(t, s) {
                                var h = "linear",
                                    u = t.id + s,
                                    d = .5,
                                    p = .5,
                                    f = t.node,
                                    g = t.paper,
                                    v = f.style,
                                    y = i._g.doc.getElementById(u);
                                if (!y) {
                                    if (s = e(s).replace(i._radial_gradient, function(t, e, i) {
                                            if (h = "radial", e && i) {
                                                d = n(e), p = n(i);
                                                var s = 2 * (p > .5) - 1;
                                                l(d - .5, 2) + l(p - .5, 2) > .25 && (p = r.sqrt(.25 - l(d - .5, 2)) * s + .5) && .5 != p && (p = p.toFixed(5) - 1e-5 * s)
                                            }
                                            return c
                                        }), s = s.split(/\s*\-\s*/), "linear" == h) {
                                        var b = s.shift();
                                        if (b = -n(b), isNaN(b)) return null;
                                        var _ = [0, 0, r.cos(i.rad(b)), r.sin(i.rad(b))],
                                            x = 1 / (a(o(_[2]), o(_[3])) || 1);
                                        _[2] *= x, _[3] *= x, _[2] < 0 && (_[0] = -_[2], _[2] = 0), _[3] < 0 && (_[1] = -_[3], _[3] = 0)
                                    }
                                    var w = i._parseDots(s);
                                    if (!w) return null;
                                    if (u = u.replace(/[\(\)\s,\xb0#]/g, "_"), t.gradient && u != t.gradient.id && (g.defs.removeChild(t.gradient), delete t.gradient), !t.gradient) {
                                        y = m(h + "Gradient", {
                                            id: u
                                        }), t.gradient = y, m(y, "radial" == h ? {
                                            fx: d,
                                            fy: p
                                        } : {
                                            x1: _[0],
                                            y1: _[1],
                                            x2: _[2],
                                            y2: _[3],
                                            gradientTransform: t.matrix.invert()
                                        }), g.defs.appendChild(y);
                                        for (var k = 0, C = w.length; C > k; k++) y.appendChild(m("stop", {
                                            offset: w[k].offset ? w[k].offset : k ? "100%" : "0%",
                                            "stop-color": w[k].color || "#fff"
                                        }))
                                    }
                                }
                                return m(f, {
                                    fill: "url(#" + u + ")",
                                    opacity: 1,
                                    "fill-opacity": 1
                                }), v.fill = c, v.opacity = 1, v.fillOpacity = 1, 1
                            },
                            y = function(t) {
                                var e = t.getBBox(1);
                                m(t.pattern, {
                                    patternTransform: t.matrix.invert() + " translate(" + e.x + "," + e.y + ")"
                                })
                            },
                            b = function(n, s, r) {
                                if ("path" == n.type) {
                                    for (var a, o, l, h, u, d = e(s).toLowerCase().split("-"), p = n.paper, v = r ? "end" : "start", y = n.node, b = n.attrs, _ = b["stroke-width"], x = d.length, w = "classic", k = 3, C = 3, T = 5; x--;) switch (d[x]) {
                                        case "block":
                                        case "classic":
                                        case "oval":
                                        case "diamond":
                                        case "open":
                                        case "none":
                                            w = d[x];
                                            break;
                                        case "wide":
                                            C = 5;
                                            break;
                                        case "narrow":
                                            C = 2;
                                            break;
                                        case "long":
                                            k = 5;
                                            break;
                                        case "short":
                                            k = 2
                                    }
                                    if ("open" == w ? (k += 2, C += 2, T += 2, l = 1, h = r ? 4 : 1, u = {
                                            fill: "none",
                                            stroke: b.stroke
                                        }) : (h = l = k / 2, u = {
                                            fill: b.stroke,
                                            stroke: "none"
                                        }), n._.arrows ? r ? (n._.arrows.endPath && g[n._.arrows.endPath]--, n._.arrows.endMarker && g[n._.arrows.endMarker]--) : (n._.arrows.startPath && g[n._.arrows.startPath]--, n._.arrows.startMarker && g[n._.arrows.startMarker]--) : n._.arrows = {}, "none" != w) {
                                        var D = "raphael-marker-" + w,
                                            S = "raphael-marker-" + v + w + k + C;
                                        i._g.doc.getElementById(D) ? g[D]++ : (p.defs.appendChild(m(m("path"), {
                                            "stroke-linecap": "round",
                                            d: f[w],
                                            id: D
                                        })), g[D] = 1);
                                        var M, N = i._g.doc.getElementById(S);
                                        N ? (g[S]++, M = N.getElementsByTagName("use")[0]) : (N = m(m("marker"), {
                                            id: S,
                                            markerHeight: C,
                                            markerWidth: k,
                                            orient: "auto",
                                            refX: h,
                                            refY: C / 2
                                        }), M = m(m("use"), {
                                            "xlink:href": "#" + D,
                                            transform: (r ? "rotate(180 " + k / 2 + " " + C / 2 + ") " : c) + "scale(" + k / T + "," + C / T + ")",
                                            "stroke-width": (1 / ((k / T + C / T) / 2)).toFixed(4)
                                        }), N.appendChild(M), p.defs.appendChild(N), g[S] = 1), m(M, u);
                                        var E = l * ("diamond" != w && "oval" != w);
                                        r ? (a = n._.arrows.startdx * _ || 0, o = i.getTotalLength(b.path) - E * _) : (a = E * _, o = i.getTotalLength(b.path) - (n._.arrows.enddx * _ || 0)), u = {}, u["marker-" + v] = "url(#" + S + ")", (o || a) && (u.d = i.getSubpath(b.path, a, o)), m(y, u), n._.arrows[v + "Path"] = D, n._.arrows[v + "Marker"] = S, n._.arrows[v + "dx"] = E, n._.arrows[v + "Type"] = w, n._.arrows[v + "String"] = s
                                    } else r ? (a = n._.arrows.startdx * _ || 0, o = i.getTotalLength(b.path) - a) : (a = 0, o = i.getTotalLength(b.path) - (n._.arrows.enddx * _ || 0)), n._.arrows[v + "Path"] && m(y, {
                                        d: i.getSubpath(b.path, a, o)
                                    }), delete n._.arrows[v + "Path"], delete n._.arrows[v + "Marker"], delete n._.arrows[v + "dx"], delete n._.arrows[v + "Type"], delete n._.arrows[v + "String"];
                                    for (u in g)
                                        if (g[t](u) && !g[u]) {
                                            var I = i._g.doc.getElementById(u);
                                            I && I.parentNode.removeChild(I)
                                        }
                                }
                            },
                            _ = {
                                "": [0],
                                none: [0],
                                "-": [3, 1],
                                ".": [1, 1],
                                "-.": [3, 1, 1, 1],
                                "-..": [3, 1, 1, 1, 1, 1],
                                ". ": [1, 3],
                                "- ": [4, 3],
                                "--": [8, 3],
                                "- .": [4, 3, 1, 3],
                                "--.": [8, 3, 1, 3],
                                "--..": [8, 3, 1, 3, 1, 3]
                            },
                            x = function(t, i, n) {
                                if (i = _[e(i).toLowerCase()]) {
                                    for (var s = t.attrs["stroke-width"] || "1", r = {
                                            round: s,
                                            square: s,
                                            butt: 0
                                        }[t.attrs["stroke-linecap"] || n["stroke-linecap"]] || 0, a = [], o = i.length; o--;) a[o] = i[o] * s + (o % 2 ? 1 : -1) * r;
                                    m(t.node, {
                                        "stroke-dasharray": a.join(",")
                                    })
                                }
                            },
                            w = function(n, r) {
                                var l = n.node,
                                    u = n.attrs,
                                    d = l.style.visibility;
                                l.style.visibility = "hidden";
                                for (var f in r)
                                    if (r[t](f)) {
                                        if (!i._availableAttrs[t](f)) continue;
                                        var g = r[f];
                                        switch (u[f] = g, f) {
                                            case "blur":
                                                n.blur(g);
                                                break;
                                            case "title":
                                                var _ = l.getElementsByTagName("title");
                                                if (_.length && (_ = _[0])) _.firstChild.nodeValue = g;
                                                else {
                                                    _ = m("title");
                                                    var w = i._g.doc.createTextNode(g);
                                                    _.appendChild(w), l.appendChild(_)
                                                }
                                                break;
                                            case "href":
                                            case "target":
                                                var k = l.parentNode;
                                                if ("a" != k.tagName.toLowerCase()) {
                                                    var T = m("a");
                                                    k.insertBefore(T, l), T.appendChild(l), k = T
                                                }
                                                "target" == f ? k.setAttributeNS(p, "show", "blank" == g ? "new" : g) : k.setAttributeNS(p, f, g);
                                                break;
                                            case "cursor":
                                                l.style.cursor = g;
                                                break;
                                            case "transform":
                                                n.transform(g);
                                                break;
                                            case "arrow-start":
                                                b(n, g);
                                                break;
                                            case "arrow-end":
                                                b(n, g, 1);
                                                break;
                                            case "clip-rect":
                                                var D = e(g).split(h);
                                                if (4 == D.length) {
                                                    n.clip && n.clip.parentNode.parentNode.removeChild(n.clip.parentNode);
                                                    var S = m("clipPath"),
                                                        M = m("rect");
                                                    S.id = i.createUUID(), m(M, {
                                                        x: D[0],
                                                        y: D[1],
                                                        width: D[2],
                                                        height: D[3]
                                                    }), S.appendChild(M), n.paper.defs.appendChild(S), m(l, {
                                                        "clip-path": "url(#" + S.id + ")"
                                                    }), n.clip = M
                                                }
                                                if (!g) {
                                                    var N = l.getAttribute("clip-path");
                                                    if (N) {
                                                        var E = i._g.doc.getElementById(N.replace(/(^url\(#|\)$)/g, c));
                                                        E && E.parentNode.removeChild(E), m(l, {
                                                            "clip-path": c
                                                        }), delete n.clip
                                                    }
                                                }
                                                break;
                                            case "path":
                                                "path" == n.type && (m(l, {
                                                    d: g ? u.path = i._pathToAbsolute(g) : "M0,0"
                                                }), n._.dirty = 1, n._.arrows && ("startString" in n._.arrows && b(n, n._.arrows.startString), "endString" in n._.arrows && b(n, n._.arrows.endString, 1)));
                                                break;
                                            case "width":
                                                if (l.setAttribute(f, g), n._.dirty = 1, !u.fx) break;
                                                f = "x", g = u.x;
                                            case "x":
                                                u.fx && (g = -u.x - (u.width || 0));
                                            case "rx":
                                                if ("rx" == f && "rect" == n.type) break;
                                            case "cx":
                                                l.setAttribute(f, g), n.pattern && y(n), n._.dirty = 1;
                                                break;
                                            case "height":
                                                if (l.setAttribute(f, g), n._.dirty = 1, !u.fy) break;
                                                f = "y", g = u.y;
                                            case "y":
                                                u.fy && (g = -u.y - (u.height || 0));
                                            case "ry":
                                                if ("ry" == f && "rect" == n.type) break;
                                            case "cy":
                                                l.setAttribute(f, g), n.pattern && y(n), n._.dirty = 1;
                                                break;
                                            case "r":
                                                "rect" == n.type ? m(l, {
                                                    rx: g,
                                                    ry: g
                                                }) : l.setAttribute(f, g), n._.dirty = 1;
                                                break;
                                            case "src":
                                                "image" == n.type && l.setAttributeNS(p, "href", g);
                                                break;
                                            case "stroke-width":
                                                (1 != n._.sx || 1 != n._.sy) && (g /= a(o(n._.sx), o(n._.sy)) || 1), n.paper._vbSize && (g *= n.paper._vbSize), l.setAttribute(f, g), u["stroke-dasharray"] && x(n, u["stroke-dasharray"], r), n._.arrows && ("startString" in n._.arrows && b(n, n._.arrows.startString), "endString" in n._.arrows && b(n, n._.arrows.endString, 1));
                                                break;
                                            case "stroke-dasharray":
                                                x(n, g, r);
                                                break;
                                            case "fill":
                                                var I = e(g).match(i._ISURL);
                                                if (I) {
                                                    S = m("pattern");
                                                    var A = m("image");
                                                    S.id = i.createUUID(), m(S, {
                                                            x: 0,
                                                            y: 0,
                                                            patternUnits: "userSpaceOnUse",
                                                            height: 1,
                                                            width: 1
                                                        }), m(A, {
                                                            x: 0,
                                                            y: 0,
                                                            "xlink:href": I[1]
                                                        }), S.appendChild(A),
                                                        function(t) {
                                                            i._preload(I[1], function() {
                                                                var e = this.offsetWidth,
                                                                    i = this.offsetHeight;
                                                                m(t, {
                                                                    width: e,
                                                                    height: i
                                                                }), m(A, {
                                                                    width: e,
                                                                    height: i
                                                                }), n.paper.safari()
                                                            })
                                                        }(S), n.paper.defs.appendChild(S), m(l, {
                                                            fill: "url(#" + S.id + ")"
                                                        }), n.pattern = S, n.pattern && y(n);
                                                    break
                                                }
                                                var P = i.getRGB(g);
                                                if (P.error) {
                                                    if (("circle" == n.type || "ellipse" == n.type || "r" != e(g).charAt()) && v(n, g)) {
                                                        if ("opacity" in u || "fill-opacity" in u) {
                                                            var z = i._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, c));
                                                            if (z) {
                                                                var H = z.getElementsByTagName("stop");
                                                                m(H[H.length - 1], {
                                                                    "stop-opacity": ("opacity" in u ? u.opacity : 1) * ("fill-opacity" in u ? u["fill-opacity"] : 1)
                                                                })
                                                            }
                                                        }
                                                        u.gradient = g, u.fill = "none";
                                                        break
                                                    }
                                                } else delete r.gradient, delete u.gradient, !i.is(u.opacity, "undefined") && i.is(r.opacity, "undefined") && m(l, {
                                                    opacity: u.opacity
                                                }), !i.is(u["fill-opacity"], "undefined") && i.is(r["fill-opacity"], "undefined") && m(l, {
                                                    "fill-opacity": u["fill-opacity"]
                                                });
                                                P[t]("opacity") && m(l, {
                                                    "fill-opacity": P.opacity > 1 ? P.opacity / 100 : P.opacity
                                                });
                                            case "stroke":
                                                P = i.getRGB(g), l.setAttribute(f, P.hex), "stroke" == f && P[t]("opacity") && m(l, {
                                                    "stroke-opacity": P.opacity > 1 ? P.opacity / 100 : P.opacity
                                                }), "stroke" == f && n._.arrows && ("startString" in n._.arrows && b(n, n._.arrows.startString), "endString" in n._.arrows && b(n, n._.arrows.endString, 1));
                                                break;
                                            case "gradient":
                                                ("circle" == n.type || "ellipse" == n.type || "r" != e(g).charAt()) && v(n, g);
                                                break;
                                            case "opacity":
                                                u.gradient && !u[t]("stroke-opacity") && m(l, {
                                                    "stroke-opacity": g > 1 ? g / 100 : g
                                                });
                                            case "fill-opacity":
                                                if (u.gradient) {
                                                    z = i._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, c)), z && (H = z.getElementsByTagName("stop"), m(H[H.length - 1], {
                                                        "stop-opacity": g
                                                    }));
                                                    break
                                                }
                                            default:
                                                "font-size" == f && (g = s(g, 10) + "px");
                                                var F = f.replace(/(\-.)/g, function(t) {
                                                    return t.substring(1).toUpperCase()
                                                });
                                                l.style[F] = g, n._.dirty = 1, l.setAttribute(f, g)
                                        }
                                    }
                                C(n, r), l.style.visibility = d
                            },
                            k = 1.2,
                            C = function(n, r) {
                                if ("text" == n.type && (r[t]("text") || r[t]("font") || r[t]("font-size") || r[t]("x") || r[t]("y"))) {
                                    var a = n.attrs,
                                        o = n.node,
                                        l = o.firstChild ? s(i._g.doc.defaultView.getComputedStyle(o.firstChild, c).getPropertyValue("font-size"), 10) : 10;
                                    if (r[t]("text")) {
                                        for (a.text = r.text; o.firstChild;) o.removeChild(o.firstChild);
                                        for (var h, u = e(r.text).split("\n"), d = [], p = 0, f = u.length; f > p; p++) h = m("tspan"), p && m(h, {
                                            dy: l * k,
                                            x: a.x
                                        }), h.appendChild(i._g.doc.createTextNode(u[p])), o.appendChild(h), d[p] = h
                                    } else
                                        for (d = o.getElementsByTagName("tspan"), p = 0, f = d.length; f > p; p++) p ? m(d[p], {
                                            dy: l * k,
                                            x: a.x
                                        }) : m(d[0], {
                                            dy: 0
                                        });
                                    m(o, {
                                        x: a.x,
                                        y: a.y
                                    }), n._.dirty = 1;
                                    var g = n._getBBox(),
                                        v = a.y - (g.y + g.height / 2);
                                    v && i.is(v, "finite") && m(d[0], {
                                        dy: v
                                    })
                                }
                            },
                            T = function(t, e) {
                                this[0] = this.node = t, t.raphael = !0, this.id = i._oid++, t.raphaelid = this.id, this.matrix = i.matrix(), this.realPath = null, this.paper = e, this.attrs = this.attrs || {}, this._ = {
                                    transform: [],
                                    sx: 1,
                                    sy: 1,
                                    deg: 0,
                                    dx: 0,
                                    dy: 0,
                                    dirty: 1
                                }, !e.bottom && (e.bottom = this), this.prev = e.top, e.top && (e.top.next = this), e.top = this, this.next = null
                            },
                            D = i.el;
                        T.prototype = D, D.constructor = T, i._engine.path = function(t, e) {
                            var i = m("path");
                            e.canvas && e.canvas.appendChild(i);
                            var n = new T(i, e);
                            return n.type = "path", w(n, {
                                fill: "none",
                                stroke: "#000",
                                path: t
                            }), n
                        }, D.rotate = function(t, i, s) {
                            if (this.removed) return this;
                            if (t = e(t).split(h), t.length - 1 && (i = n(t[1]), s = n(t[2])), t = n(t[0]), null == s && (i = s), null == i || null == s) {
                                var r = this.getBBox(1);
                                i = r.x + r.width / 2, s = r.y + r.height / 2
                            }
                            return this.transform(this._.transform.concat([
                                ["r", t, i, s]
                            ])), this
                        }, D.scale = function(t, i, s, r) {
                            if (this.removed) return this;
                            if (t = e(t).split(h), t.length - 1 && (i = n(t[1]), s = n(t[2]), r = n(t[3])), t = n(t[0]), null == i && (i = t), null == r && (s = r), null == s || null == r) var a = this.getBBox(1);
                            return s = null == s ? a.x + a.width / 2 : s, r = null == r ? a.y + a.height / 2 : r, this.transform(this._.transform.concat([
                                ["s", t, i, s, r]
                            ])), this
                        }, D.translate = function(t, i) {
                            return this.removed ? this : (t = e(t).split(h), t.length - 1 && (i = n(t[1])), t = n(t[0]) || 0, i = +i || 0, this.transform(this._.transform.concat([
                                ["t", t, i]
                            ])), this)
                        }, D.transform = function(e) {
                            var n = this._;
                            if (null == e) return n.transform;
                            if (i._extractTransform(this, e), this.clip && m(this.clip, {
                                    transform: this.matrix.invert()
                                }), this.pattern && y(this), this.node && m(this.node, {
                                    transform: this.matrix
                                }), 1 != n.sx || 1 != n.sy) {
                                var s = this.attrs[t]("stroke-width") ? this.attrs["stroke-width"] : 1;
                                this.attr({
                                    "stroke-width": s
                                })
                            }
                            return this
                        }, D.hide = function() {
                            return !this.removed && this.paper.safari(this.node.style.display = "none"), this
                        }, D.show = function() {
                            return !this.removed && this.paper.safari(this.node.style.display = ""), this
                        }, D.remove = function() {
                            if (!this.removed && this.node.parentNode) {
                                var t = this.paper;
                                t.__set__ && t.__set__.exclude(this), u.unbind("raphael.*.*." + this.id), this.gradient && t.defs.removeChild(this.gradient), i._tear(this, t), "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
                                for (var e in this) this[e] = "function" == typeof this[e] ? i._removedFactory(e) : null;
                                this.removed = !0
                            }
                        }, D._getBBox = function() {
                            if ("none" == this.node.style.display) {
                                this.show();
                                var t = !0
                            }
                            var e = {};
                            try {
                                e = this.node.getBBox()
                            } catch (i) {} finally {
                                e = e || {}
                            }
                            return t && this.hide(), e
                        }, D.attr = function(e, n) {
                            if (this.removed) return this;
                            if (null == e) {
                                var s = {};
                                for (var r in this.attrs) this.attrs[t](r) && (s[r] = this.attrs[r]);
                                return s.gradient && "none" == s.fill && (s.fill = s.gradient) && delete s.gradient, s.transform = this._.transform, s
                            }
                            if (null == n && i.is(e, "string")) {
                                if ("fill" == e && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                                if ("transform" == e) return this._.transform;
                                for (var a = e.split(h), o = {}, l = 0, c = a.length; c > l; l++) e = a[l], o[e] = e in this.attrs ? this.attrs[e] : i.is(this.paper.customAttributes[e], "function") ? this.paper.customAttributes[e].def : i._availableAttrs[e];
                                return c - 1 ? o : o[a[0]]
                            }
                            if (null == n && i.is(e, "array")) {
                                for (o = {}, l = 0, c = e.length; c > l; l++) o[e[l]] = this.attr(e[l]);
                                return o
                            }
                            if (null != n) {
                                var d = {};
                                d[e] = n
                            } else null != e && i.is(e, "object") && (d = e);
                            for (var p in d) u("raphael.attr." + p + "." + this.id, this, d[p]);
                            for (p in this.paper.customAttributes)
                                if (this.paper.customAttributes[t](p) && d[t](p) && i.is(this.paper.customAttributes[p], "function")) {
                                    var f = this.paper.customAttributes[p].apply(this, [].concat(d[p]));
                                    this.attrs[p] = d[p];
                                    for (var g in f) f[t](g) && (d[g] = f[g])
                                }
                            return w(this, d), this
                        }, D.toFront = function() {
                            if (this.removed) return this;
                            "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
                            var t = this.paper;
                            return t.top != this && i._tofront(this, t), this
                        }, D.toBack = function() {
                            if (this.removed) return this;
                            var t = this.node.parentNode;
                            return "a" == t.tagName.toLowerCase() ? t.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : t.firstChild != this.node && t.insertBefore(this.node, this.node.parentNode.firstChild), i._toback(this, this.paper), this.paper, this
                        }, D.insertAfter = function(t) {
                            if (this.removed) return this;
                            var e = t.node || t[t.length - 1].node;
                            return e.nextSibling ? e.parentNode.insertBefore(this.node, e.nextSibling) : e.parentNode.appendChild(this.node), i._insertafter(this, t, this.paper), this
                        }, D.insertBefore = function(t) {
                            if (this.removed) return this;
                            var e = t.node || t[0].node;
                            return e.parentNode.insertBefore(this.node, e), i._insertbefore(this, t, this.paper), this
                        }, D.blur = function(t) {
                            var e = this;
                            if (0 !== +t) {
                                var n = m("filter"),
                                    s = m("feGaussianBlur");
                                e.attrs.blur = t, n.id = i.createUUID(), m(s, {
                                    stdDeviation: +t || 1.5
                                }), n.appendChild(s), e.paper.defs.appendChild(n), e._blur = n, m(e.node, {
                                    filter: "url(#" + n.id + ")"
                                })
                            } else e._blur && (e._blur.parentNode.removeChild(e._blur), delete e._blur, delete e.attrs.blur), e.node.removeAttribute("filter");
                            return e
                        }, i._engine.circle = function(t, e, i, n) {
                            var s = m("circle");
                            t.canvas && t.canvas.appendChild(s);
                            var r = new T(s, t);
                            return r.attrs = {
                                cx: e,
                                cy: i,
                                r: n,
                                fill: "none",
                                stroke: "#000"
                            }, r.type = "circle", m(s, r.attrs), r
                        }, i._engine.rect = function(t, e, i, n, s, r) {
                            var a = m("rect");
                            t.canvas && t.canvas.appendChild(a);
                            var o = new T(a, t);
                            return o.attrs = {
                                x: e,
                                y: i,
                                width: n,
                                height: s,
                                r: r || 0,
                                rx: r || 0,
                                ry: r || 0,
                                fill: "none",
                                stroke: "#000"
                            }, o.type = "rect", m(a, o.attrs), o
                        }, i._engine.ellipse = function(t, e, i, n, s) {
                            var r = m("ellipse");
                            t.canvas && t.canvas.appendChild(r);
                            var a = new T(r, t);
                            return a.attrs = {
                                cx: e,
                                cy: i,
                                rx: n,
                                ry: s,
                                fill: "none",
                                stroke: "#000"
                            }, a.type = "ellipse", m(r, a.attrs), a
                        }, i._engine.image = function(t, e, i, n, s, r) {
                            var a = m("image");
                            m(a, {
                                x: i,
                                y: n,
                                width: s,
                                height: r,
                                preserveAspectRatio: "none"
                            }), a.setAttributeNS(p, "href", e), t.canvas && t.canvas.appendChild(a);
                            var o = new T(a, t);
                            return o.attrs = {
                                x: i,
                                y: n,
                                width: s,
                                height: r,
                                src: e
                            }, o.type = "image", o
                        }, i._engine.text = function(t, e, n, s) {
                            var r = m("text");
                            t.canvas && t.canvas.appendChild(r);
                            var a = new T(r, t);
                            return a.attrs = {
                                x: e,
                                y: n,
                                "text-anchor": "middle",
                                text: s,
                                font: i._availableAttrs.font,
                                stroke: "none",
                                fill: "#000"
                            }, a.type = "text", w(a, a.attrs), a
                        }, i._engine.setSize = function(t, e) {
                            return this.width = t || this.width, this.height = e || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this
                        }, i._engine.create = function() {
                            var t = i._getContainer.apply(0, arguments),
                                e = t && t.container,
                                n = t.x,
                                s = t.y,
                                r = t.width,
                                a = t.height;
                            if (!e) throw new Error("SVG container not found.");
                            var o, l = m("svg"),
                                h = "overflow:hidden;";
                            return n = n || 0, s = s || 0, r = r || 512, a = a || 342, m(l, {
                                height: a,
                                version: 1.1,
                                width: r,
                                xmlns: "http://www.w3.org/2000/svg"
                            }), 1 == e ? (l.style.cssText = h + "position:absolute;left:" + n + "px;top:" + s + "px", i._g.doc.body.appendChild(l), o = 1) : (l.style.cssText = h + "position:relative", e.firstChild ? e.insertBefore(l, e.firstChild) : e.appendChild(l)), e = new i._Paper, e.width = r, e.height = a, e.canvas = l, e.clear(), e._left = e._top = 0, o && (e.renderfix = function() {}), e.renderfix(), e
                        }, i._engine.setViewBox = function(t, e, i, n, s) {
                            u("raphael.setViewBox", this, this._viewBox, [t, e, i, n, s]);
                            var r, o, l = a(i / this.width, n / this.height),
                                h = this.top,
                                c = s ? "xMidYMid meet" : "xMinYMin";
                            for (null == t ? (this._vbSize && (l = 1), delete this._vbSize, r = "0 0 " + this.width + d + this.height) : (this._vbSize = l, r = t + d + e + d + i + d + n), m(this.canvas, {
                                    viewBox: r,
                                    preserveAspectRatio: c
                                }); l && h;) o = "stroke-width" in h.attrs ? h.attrs["stroke-width"] : 1, h.attr({
                                "stroke-width": o
                            }), h._.dirty = 1, h._.dirtyT = 1, h = h.prev;
                            return this._viewBox = [t, e, i, n, !!s], this
                        }, i.prototype.renderfix = function() {
                            var t, e = this.canvas,
                                i = e.style;
                            try {
                                t = e.getScreenCTM() || e.createSVGMatrix()
                            } catch (n) {
                                t = e.createSVGMatrix()
                            }
                            var s = -t.e % 1,
                                r = -t.f % 1;
                            (s || r) && (s && (this._left = (this._left + s) % 1, i.left = this._left + "px"), r && (this._top = (this._top + r) % 1, i.top = this._top + "px"))
                        }, i.prototype.clear = function() {
                            i.eve("raphael.clear", this);
                            for (var t = this.canvas; t.firstChild;) t.removeChild(t.firstChild);
                            this.bottom = this.top = null, (this.desc = m("desc")).appendChild(i._g.doc.createTextNode("Created with Raphaël " + i.version)), t.appendChild(this.desc), t.appendChild(this.defs = m("defs"))
                        }, i.prototype.remove = function() {
                            u("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                            for (var t in this) this[t] = "function" == typeof this[t] ? i._removedFactory(t) : null
                        };
                        var S = i.st;
                        for (var M in D) D[t](M) && !S[t](M) && (S[M] = function(t) {
                            return function() {
                                var e = arguments;
                                return this.forEach(function(i) {
                                    i[t].apply(i, e)
                                })
                            }
                        }(M))
                    }
                }(),
                function() {
                    if (i.vml) {
                        var t = "hasOwnProperty",
                            e = String,
                            n = parseFloat,
                            s = Math,
                            r = s.round,
                            a = s.max,
                            o = s.min,
                            l = s.abs,
                            h = "fill",
                            u = /[, ]+/,
                            c = i.eve,
                            d = " progid:DXImageTransform.Microsoft",
                            p = " ",
                            f = "",
                            g = {
                                M: "m",
                                L: "l",
                                C: "c",
                                Z: "x",
                                m: "t",
                                l: "r",
                                c: "v",
                                z: "x"
                            },
                            m = /([clmz]),?([^clmz]*)/gi,
                            v = / progid:\S+Blur\([^\)]+\)/g,
                            y = /-?[^,\s-]+/g,
                            b = "position:absolute;left:0;top:0;width:1px;height:1px",
                            _ = 21600,
                            x = {
                                path: 1,
                                rect: 1,
                                image: 1
                            },
                            w = {
                                circle: 1,
                                ellipse: 1
                            },
                            k = function(t) {
                                var n = /[ahqstv]/gi,
                                    s = i._pathToAbsolute;
                                if (e(t).match(n) && (s = i._path2curve), n = /[clmz]/g, s == i._pathToAbsolute && !e(t).match(n)) {
                                    var a = e(t).replace(m, function(t, e, i) {
                                        var n = [],
                                            s = "m" == e.toLowerCase(),
                                            a = g[e];
                                        return i.replace(y, function(t) {
                                            s && 2 == n.length && (a += n + g["m" == e ? "l" : "L"], n = []), n.push(r(t * _))
                                        }), a + n
                                    });
                                    return a
                                }
                                var o, l, h = s(t);
                                a = [];
                                for (var u = 0, c = h.length; c > u; u++) {
                                    o = h[u], l = h[u][0].toLowerCase(), "z" == l && (l = "x");
                                    for (var d = 1, v = o.length; v > d; d++) l += r(o[d] * _) + (d != v - 1 ? "," : f);
                                    a.push(l)
                                }
                                return a.join(p)
                            },
                            C = function(t, e, n) {
                                var s = i.matrix();
                                return s.rotate(-t, .5, .5), {
                                    dx: s.x(e, n),
                                    dy: s.y(e, n)
                                }
                            },
                            T = function(t, e, i, n, s, r) {
                                var a = t._,
                                    o = t.matrix,
                                    u = a.fillpos,
                                    c = t.node,
                                    d = c.style,
                                    f = 1,
                                    g = "",
                                    m = _ / e,
                                    v = _ / i;
                                if (d.visibility = "hidden", e && i) {
                                    if (c.coordsize = l(m) + p + l(v), d.rotation = r * (0 > e * i ? -1 : 1), r) {
                                        var y = C(r, n, s);
                                        n = y.dx, s = y.dy
                                    }
                                    if (0 > e && (g += "x"), 0 > i && (g += " y") && (f = -1), d.flip = g, c.coordorigin = n * -m + p + s * -v, u || a.fillsize) {
                                        var b = c.getElementsByTagName(h);
                                        b = b && b[0], c.removeChild(b), u && (y = C(r, o.x(u[0], u[1]), o.y(u[0], u[1])), b.position = y.dx * f + p + y.dy * f), a.fillsize && (b.size = a.fillsize[0] * l(e) + p + a.fillsize[1] * l(i)), c.appendChild(b)
                                    }
                                    d.visibility = "visible"
                                }
                            };
                        i.toString = function() {
                            return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
                        };
                        var D = function(t, i, n) {
                                for (var s = e(i).toLowerCase().split("-"), r = n ? "end" : "start", a = s.length, o = "classic", l = "medium", h = "medium"; a--;) switch (s[a]) {
                                    case "block":
                                    case "classic":
                                    case "oval":
                                    case "diamond":
                                    case "open":
                                    case "none":
                                        o = s[a];
                                        break;
                                    case "wide":
                                    case "narrow":
                                        h = s[a];
                                        break;
                                    case "long":
                                    case "short":
                                        l = s[a]
                                }
                                var u = t.node.getElementsByTagName("stroke")[0];
                                u[r + "arrow"] = o, u[r + "arrowlength"] = l, u[r + "arrowwidth"] = h
                            },
                            S = function(s, l) {
                                s.attrs = s.attrs || {};
                                var c = s.node,
                                    d = s.attrs,
                                    g = c.style,
                                    m = x[s.type] && (l.x != d.x || l.y != d.y || l.width != d.width || l.height != d.height || l.cx != d.cx || l.cy != d.cy || l.rx != d.rx || l.ry != d.ry || l.r != d.r),
                                    v = w[s.type] && (d.cx != l.cx || d.cy != l.cy || d.r != l.r || d.rx != l.rx || d.ry != l.ry),
                                    y = s;
                                for (var b in l) l[t](b) && (d[b] = l[b]);
                                if (m && (d.path = i._getPath[s.type](s), s._.dirty = 1), l.href && (c.href = l.href), l.title && (c.title = l.title), l.target && (c.target = l.target), l.cursor && (g.cursor = l.cursor), "blur" in l && s.blur(l.blur), (l.path && "path" == s.type || m) && (c.path = k(~e(d.path).toLowerCase().indexOf("r") ? i._pathToAbsolute(d.path) : d.path), "image" == s.type && (s._.fillpos = [d.x, d.y], s._.fillsize = [d.width, d.height], T(s, 1, 1, 0, 0, 0))), "transform" in l && s.transform(l.transform), v) {
                                    var C = +d.cx,
                                        S = +d.cy,
                                        N = +d.rx || +d.r || 0,
                                        E = +d.ry || +d.r || 0;
                                    c.path = i.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", r((C - N) * _), r((S - E) * _), r((C + N) * _), r((S + E) * _), r(C * _)), s._.dirty = 1
                                }
                                if ("clip-rect" in l) {
                                    var A = e(l["clip-rect"]).split(u);
                                    if (4 == A.length) {
                                        A[2] = +A[2] + +A[0], A[3] = +A[3] + +A[1];
                                        var P = c.clipRect || i._g.doc.createElement("div"),
                                            z = P.style;
                                        z.clip = i.format("rect({1}px {2}px {3}px {0}px)", A), c.clipRect || (z.position = "absolute", z.top = 0, z.left = 0, z.width = s.paper.width + "px", z.height = s.paper.height + "px", c.parentNode.insertBefore(P, c), P.appendChild(c), c.clipRect = P)
                                    }
                                    l["clip-rect"] || c.clipRect && (c.clipRect.style.clip = "auto")
                                }
                                if (s.textpath) {
                                    var H = s.textpath.style;
                                    l.font && (H.font = l.font), l["font-family"] && (H.fontFamily = '"' + l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, f) + '"'), l["font-size"] && (H.fontSize = l["font-size"]), l["font-weight"] && (H.fontWeight = l["font-weight"]), l["font-style"] && (H.fontStyle = l["font-style"])
                                }
                                if ("arrow-start" in l && D(y, l["arrow-start"]), "arrow-end" in l && D(y, l["arrow-end"], 1), null != l.opacity || null != l["stroke-width"] || null != l.fill || null != l.src || null != l.stroke || null != l["stroke-width"] || null != l["stroke-opacity"] || null != l["fill-opacity"] || null != l["stroke-dasharray"] || null != l["stroke-miterlimit"] || null != l["stroke-linejoin"] || null != l["stroke-linecap"]) {
                                    var F = c.getElementsByTagName(h),
                                        j = !1;
                                    if (F = F && F[0], !F && (j = F = I(h)), "image" == s.type && l.src && (F.src = l.src), l.fill && (F.on = !0), (null == F.on || "none" == l.fill || null === l.fill) && (F.on = !1), F.on && l.fill) {
                                        var O = e(l.fill).match(i._ISURL);
                                        if (O) {
                                            F.parentNode == c && c.removeChild(F), F.rotate = !0, F.src = O[1], F.type = "tile";
                                            var B = s.getBBox(1);
                                            F.position = B.x + p + B.y, s._.fillpos = [B.x, B.y], i._preload(O[1], function() {
                                                s._.fillsize = [this.offsetWidth, this.offsetHeight]
                                            })
                                        } else F.color = i.getRGB(l.fill).hex, F.src = f, F.type = "solid", i.getRGB(l.fill).error && (y.type in {
                                            circle: 1,
                                            ellipse: 1
                                        } || "r" != e(l.fill).charAt()) && M(y, l.fill, F) && (d.fill = "none", d.gradient = l.fill, F.rotate = !1)
                                    }
                                    if ("fill-opacity" in l || "opacity" in l) {
                                        var W = ((+d["fill-opacity"] + 1 || 2) - 1) * ((+d.opacity + 1 || 2) - 1) * ((+i.getRGB(l.fill).o + 1 || 2) - 1);
                                        W = o(a(W, 0), 1), F.opacity = W, F.src && (F.color = "none")
                                    }
                                    c.appendChild(F);
                                    var L = c.getElementsByTagName("stroke") && c.getElementsByTagName("stroke")[0],
                                        R = !1;
                                    !L && (R = L = I("stroke")), (l.stroke && "none" != l.stroke || l["stroke-width"] || null != l["stroke-opacity"] || l["stroke-dasharray"] || l["stroke-miterlimit"] || l["stroke-linejoin"] || l["stroke-linecap"]) && (L.on = !0), ("none" == l.stroke || null === l.stroke || null == L.on || 0 == l.stroke || 0 == l["stroke-width"]) && (L.on = !1);
                                    var q = i.getRGB(l.stroke);
                                    L.on && l.stroke && (L.color = q.hex), W = ((+d["stroke-opacity"] + 1 || 2) - 1) * ((+d.opacity + 1 || 2) - 1) * ((+q.o + 1 || 2) - 1);
                                    var Y = .75 * (n(l["stroke-width"]) || 1);
                                    if (W = o(a(W, 0), 1), null == l["stroke-width"] && (Y = d["stroke-width"]), l["stroke-width"] && (L.weight = Y), Y && 1 > Y && (W *= Y) && (L.weight = 1), L.opacity = W, l["stroke-linejoin"] && (L.joinstyle = l["stroke-linejoin"] || "miter"), L.miterlimit = l["stroke-miterlimit"] || 8, l["stroke-linecap"] && (L.endcap = "butt" == l["stroke-linecap"] ? "flat" : "square" == l["stroke-linecap"] ? "square" : "round"), "stroke-dasharray" in l) {
                                        var $ = {
                                            "-": "shortdash",
                                            ".": "shortdot",
                                            "-.": "shortdashdot",
                                            "-..": "shortdashdotdot",
                                            ". ": "dot",
                                            "- ": "dash",
                                            "--": "longdash",
                                            "- .": "dashdot",
                                            "--.": "longdashdot",
                                            "--..": "longdashdotdot"
                                        };
                                        L.dashstyle = $[t](l["stroke-dasharray"]) ? $[l["stroke-dasharray"]] : f
                                    }
                                    R && c.appendChild(L)
                                }
                                if ("text" == y.type) {
                                    y.paper.canvas.style.display = f;
                                    var V = y.paper.span,
                                        U = 100,
                                        X = d.font && d.font.match(/\d+(?:\.\d*)?(?=px)/);
                                    g = V.style, d.font && (g.font = d.font), d["font-family"] && (g.fontFamily = d["font-family"]), d["font-weight"] && (g.fontWeight = d["font-weight"]), d["font-style"] && (g.fontStyle = d["font-style"]), X = n(d["font-size"] || X && X[0]) || 10, g.fontSize = X * U + "px", y.textpath.string && (V.innerHTML = e(y.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                                    var K = V.getBoundingClientRect();
                                    y.W = d.w = (K.right - K.left) / U, y.H = d.h = (K.bottom - K.top) / U, y.X = d.x, y.Y = d.y + y.H / 2, ("x" in l || "y" in l) && (y.path.v = i.format("m{0},{1}l{2},{1}", r(d.x * _), r(d.y * _), r(d.x * _) + 1));
                                    for (var G = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], Q = 0, J = G.length; J > Q; Q++)
                                        if (G[Q] in l) {
                                            y._.dirty = 1;
                                            break
                                        }
                                    switch (d["text-anchor"]) {
                                        case "start":
                                            y.textpath.style["v-text-align"] = "left", y.bbx = y.W / 2;
                                            break;
                                        case "end":
                                            y.textpath.style["v-text-align"] = "right", y.bbx = -y.W / 2;
                                            break;
                                        default:
                                            y.textpath.style["v-text-align"] = "center", y.bbx = 0
                                    }
                                    y.textpath.style["v-text-kern"] = !0
                                }
                            },
                            M = function(t, r, a) {
                                t.attrs = t.attrs || {};
                                var o = (t.attrs, Math.pow),
                                    l = "linear",
                                    h = ".5 .5";
                                if (t.attrs.gradient = r, r = e(r).replace(i._radial_gradient, function(t, e, i) {
                                        return l = "radial", e && i && (e = n(e), i = n(i), o(e - .5, 2) + o(i - .5, 2) > .25 && (i = s.sqrt(.25 - o(e - .5, 2)) * (2 * (i > .5) - 1) + .5), h = e + p + i), f
                                    }), r = r.split(/\s*\-\s*/), "linear" == l) {
                                    var u = r.shift();
                                    if (u = -n(u), isNaN(u)) return null
                                }
                                var c = i._parseDots(r);
                                if (!c) return null;
                                if (t = t.shape || t.node, c.length) {
                                    t.removeChild(a), a.on = !0, a.method = "none", a.color = c[0].color, a.color2 = c[c.length - 1].color;
                                    for (var d = [], g = 0, m = c.length; m > g; g++) c[g].offset && d.push(c[g].offset + p + c[g].color);
                                    a.colors = d.length ? d.join() : "0% " + a.color, "radial" == l ? (a.type = "gradientTitle", a.focus = "100%", a.focussize = "0 0", a.focusposition = h, a.angle = 0) : (a.type = "gradient", a.angle = (270 - u) % 360), t.appendChild(a)
                                }
                                return 1
                            },
                            N = function(t, e) {
                                this[0] = this.node = t, t.raphael = !0, this.id = i._oid++, t.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = e, this.matrix = i.matrix(), this._ = {
                                    transform: [],
                                    sx: 1,
                                    sy: 1,
                                    dx: 0,
                                    dy: 0,
                                    deg: 0,
                                    dirty: 1,
                                    dirtyT: 1
                                }, !e.bottom && (e.bottom = this), this.prev = e.top, e.top && (e.top.next = this), e.top = this, this.next = null
                            },
                            E = i.el;
                        N.prototype = E, E.constructor = N, E.transform = function(t) {
                            if (null == t) return this._.transform;
                            var n, s = this.paper._viewBoxShift,
                                r = s ? "s" + [s.scale, s.scale] + "-1-1t" + [s.dx, s.dy] : f;
                            s && (n = t = e(t).replace(/\.{3}|\u2026/g, this._.transform || f)), i._extractTransform(this, r + t);
                            var a, o = this.matrix.clone(),
                                l = this.skew,
                                h = this.node,
                                u = ~e(this.attrs.fill).indexOf("-"),
                                c = !e(this.attrs.fill).indexOf("url(");
                            if (o.translate(1, 1), c || u || "image" == this.type)
                                if (l.matrix = "1 0 0 1", l.offset = "0 0", a = o.split(), u && a.noRotation || !a.isSimple) {
                                    h.style.filter = o.toFilter();
                                    var d = this.getBBox(),
                                        g = this.getBBox(1),
                                        m = d.x - g.x,
                                        v = d.y - g.y;
                                    h.coordorigin = m * -_ + p + v * -_, T(this, 1, 1, m, v, 0)
                                } else h.style.filter = f, T(this, a.scalex, a.scaley, a.dx, a.dy, a.rotate);
                            else h.style.filter = f, l.matrix = e(o), l.offset = o.offset();
                            return n && (this._.transform = n), this
                        }, E.rotate = function(t, i, s) {
                            if (this.removed) return this;
                            if (null != t) {
                                if (t = e(t).split(u), t.length - 1 && (i = n(t[1]), s = n(t[2])), t = n(t[0]), null == s && (i = s), null == i || null == s) {
                                    var r = this.getBBox(1);
                                    i = r.x + r.width / 2, s = r.y + r.height / 2
                                }
                                return this._.dirtyT = 1, this.transform(this._.transform.concat([
                                    ["r", t, i, s]
                                ])), this
                            }
                        }, E.translate = function(t, i) {
                            return this.removed ? this : (t = e(t).split(u), t.length - 1 && (i = n(t[1])), t = n(t[0]) || 0, i = +i || 0, this._.bbox && (this._.bbox.x += t, this._.bbox.y += i), this.transform(this._.transform.concat([
                                ["t", t, i]
                            ])), this)
                        }, E.scale = function(t, i, s, r) {
                            if (this.removed) return this;
                            if (t = e(t).split(u), t.length - 1 && (i = n(t[1]), s = n(t[2]), r = n(t[3]), isNaN(s) && (s = null), isNaN(r) && (r = null)), t = n(t[0]), null == i && (i = t), null == r && (s = r), null == s || null == r) var a = this.getBBox(1);
                            return s = null == s ? a.x + a.width / 2 : s, r = null == r ? a.y + a.height / 2 : r, this.transform(this._.transform.concat([
                                ["s", t, i, s, r]
                            ])), this._.dirtyT = 1, this
                        }, E.hide = function() {
                            return !this.removed && (this.node.style.display = "none"), this
                        }, E.show = function() {
                            return !this.removed && (this.node.style.display = f), this
                        }, E._getBBox = function() {
                            return this.removed ? {} : {
                                x: this.X + (this.bbx || 0) - this.W / 2,
                                y: this.Y - this.H,
                                width: this.W,
                                height: this.H
                            }
                        }, E.remove = function() {
                            if (!this.removed && this.node.parentNode) {
                                this.paper.__set__ && this.paper.__set__.exclude(this), i.eve.unbind("raphael.*.*." + this.id), i._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
                                for (var t in this) this[t] = "function" == typeof this[t] ? i._removedFactory(t) : null;
                                this.removed = !0
                            }
                        }, E.attr = function(e, n) {
                            if (this.removed) return this;
                            if (null == e) {
                                var s = {};
                                for (var r in this.attrs) this.attrs[t](r) && (s[r] = this.attrs[r]);
                                return s.gradient && "none" == s.fill && (s.fill = s.gradient) && delete s.gradient, s.transform = this._.transform, s
                            }
                            if (null == n && i.is(e, "string")) {
                                if (e == h && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                                for (var a = e.split(u), o = {}, l = 0, d = a.length; d > l; l++) e = a[l], o[e] = e in this.attrs ? this.attrs[e] : i.is(this.paper.customAttributes[e], "function") ? this.paper.customAttributes[e].def : i._availableAttrs[e];
                                return d - 1 ? o : o[a[0]]
                            }
                            if (this.attrs && null == n && i.is(e, "array")) {
                                for (o = {}, l = 0, d = e.length; d > l; l++) o[e[l]] = this.attr(e[l]);
                                return o
                            }
                            var p;
                            null != n && (p = {}, p[e] = n), null == n && i.is(e, "object") && (p = e);
                            for (var f in p) c("raphael.attr." + f + "." + this.id, this, p[f]);
                            if (p) {
                                for (f in this.paper.customAttributes)
                                    if (this.paper.customAttributes[t](f) && p[t](f) && i.is(this.paper.customAttributes[f], "function")) {
                                        var g = this.paper.customAttributes[f].apply(this, [].concat(p[f]));
                                        this.attrs[f] = p[f];
                                        for (var m in g) g[t](m) && (p[m] = g[m])
                                    }
                                p.text && "text" == this.type && (this.textpath.string = p.text), S(this, p)
                            }
                            return this
                        }, E.toFront = function() {
                            return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && i._tofront(this, this.paper), this
                        }, E.toBack = function() {
                            return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), i._toback(this, this.paper)), this)
                        }, E.insertAfter = function(t) {
                            return this.removed ? this : (t.constructor == i.st.constructor && (t = t[t.length - 1]), t.node.nextSibling ? t.node.parentNode.insertBefore(this.node, t.node.nextSibling) : t.node.parentNode.appendChild(this.node), i._insertafter(this, t, this.paper), this)
                        }, E.insertBefore = function(t) {
                            return this.removed ? this : (t.constructor == i.st.constructor && (t = t[0]), t.node.parentNode.insertBefore(this.node, t.node), i._insertbefore(this, t, this.paper), this)
                        }, E.blur = function(t) {
                            var e = this.node.runtimeStyle,
                                n = e.filter;
                            return n = n.replace(v, f), 0 !== +t ? (this.attrs.blur = t, e.filter = n + p + d + ".Blur(pixelradius=" + (+t || 1.5) + ")", e.margin = i.format("-{0}px 0 0 -{0}px", r(+t || 1.5))) : (e.filter = n, e.margin = 0, delete this.attrs.blur), this
                        }, i._engine.path = function(t, e) {
                            var i = I("shape");
                            i.style.cssText = b, i.coordsize = _ + p + _, i.coordorigin = e.coordorigin;
                            var n = new N(i, e),
                                s = {
                                    fill: "none",
                                    stroke: "#000"
                                };
                            t && (s.path = t), n.type = "path", n.path = [], n.Path = f, S(n, s), e.canvas.appendChild(i);
                            var r = I("skew");
                            return r.on = !0, i.appendChild(r), n.skew = r, n.transform(f), n
                        }, i._engine.rect = function(t, e, n, s, r, a) {
                            var o = i._rectPath(e, n, s, r, a),
                                l = t.path(o),
                                h = l.attrs;
                            return l.X = h.x = e, l.Y = h.y = n, l.W = h.width = s, l.H = h.height = r, h.r = a, h.path = o, l.type = "rect", l
                        }, i._engine.ellipse = function(t, e, i, n, s) {
                            var r = t.path();
                            return r.attrs, r.X = e - n, r.Y = i - s, r.W = 2 * n, r.H = 2 * s, r.type = "ellipse", S(r, {
                                cx: e,
                                cy: i,
                                rx: n,
                                ry: s
                            }), r
                        }, i._engine.circle = function(t, e, i, n) {
                            var s = t.path();
                            return s.attrs, s.X = e - n, s.Y = i - n, s.W = s.H = 2 * n, s.type = "circle", S(s, {
                                cx: e,
                                cy: i,
                                r: n
                            }), s
                        }, i._engine.image = function(t, e, n, s, r, a) {
                            var o = i._rectPath(n, s, r, a),
                                l = t.path(o).attr({
                                    stroke: "none"
                                }),
                                u = l.attrs,
                                c = l.node,
                                d = c.getElementsByTagName(h)[0];
                            return u.src = e, l.X = u.x = n, l.Y = u.y = s, l.W = u.width = r, l.H = u.height = a, u.path = o, l.type = "image", d.parentNode == c && c.removeChild(d), d.rotate = !0, d.src = e, d.type = "tile", l._.fillpos = [n, s], l._.fillsize = [r, a], c.appendChild(d), T(l, 1, 1, 0, 0, 0), l
                        }, i._engine.text = function(t, n, s, a) {
                            var o = I("shape"),
                                l = I("path"),
                                h = I("textpath");
                            n = n || 0, s = s || 0, a = a || "", l.v = i.format("m{0},{1}l{2},{1}", r(n * _), r(s * _), r(n * _) + 1), l.textpathok = !0, h.string = e(a), h.on = !0, o.style.cssText = b, o.coordsize = _ + p + _, o.coordorigin = "0 0";
                            var u = new N(o, t),
                                c = {
                                    fill: "#000",
                                    stroke: "none",
                                    font: i._availableAttrs.font,
                                    text: a
                                };
                            u.shape = o, u.path = l, u.textpath = h, u.type = "text", u.attrs.text = e(a), u.attrs.x = n, u.attrs.y = s, u.attrs.w = 1, u.attrs.h = 1, S(u, c), o.appendChild(h), o.appendChild(l), t.canvas.appendChild(o);
                            var d = I("skew");
                            return d.on = !0, o.appendChild(d), u.skew = d, u.transform(f), u
                        }, i._engine.setSize = function(t, e) {
                            var n = this.canvas.style;
                            return this.width = t, this.height = e, t == +t && (t += "px"), e == +e && (e += "px"), n.width = t, n.height = e, n.clip = "rect(0 " + t + " " + e + " 0)", this._viewBox && i._engine.setViewBox.apply(this, this._viewBox), this
                        }, i._engine.setViewBox = function(t, e, n, s, r) {
                            i.eve("raphael.setViewBox", this, this._viewBox, [t, e, n, s, r]);
                            var o, l, h = this.width,
                                u = this.height,
                                c = 1 / a(n / h, s / u);
                            return r && (o = u / s, l = h / n, h > n * o && (t -= (h - n * o) / 2 / o), u > s * l && (e -= (u - s * l) / 2 / l)), this._viewBox = [t, e, n, s, !!r], this._viewBoxShift = {
                                dx: -t,
                                dy: -e,
                                scale: c
                            }, this.forEach(function(t) {
                                t.transform("...")
                            }), this
                        };
                        var I;
                        i._engine.initWin = function(t) {
                            var e = t.document;
                            e.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                            try {
                                !e.namespaces.rvml && e.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), I = function(t) {
                                    return e.createElement("<rvml:" + t + ' class="rvml">')
                                }
                            } catch (i) {
                                I = function(t) {
                                    return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                                }
                            }
                        }, i._engine.initWin(i._g.win), i._engine.create = function() {
                            var t = i._getContainer.apply(0, arguments),
                                e = t.container,
                                n = t.height,
                                s = t.width,
                                r = t.x,
                                a = t.y;
                            if (!e) throw new Error("VML container not found.");
                            var o = new i._Paper,
                                l = o.canvas = i._g.doc.createElement("div"),
                                h = l.style;
                            return r = r || 0, a = a || 0, s = s || 512, n = n || 342, o.width = s, o.height = n, s == +s && (s += "px"), n == +n && (n += "px"), o.coordsize = 1e3 * _ + p + 1e3 * _, o.coordorigin = "0 0", o.span = i._g.doc.createElement("span"), o.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", l.appendChild(o.span), h.cssText = i.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", s, n), 1 == e ? (i._g.doc.body.appendChild(l), h.left = r + "px", h.top = a + "px", h.position = "absolute") : e.firstChild ? e.insertBefore(l, e.firstChild) : e.appendChild(l), o.renderfix = function() {}, o
                        }, i.prototype.clear = function() {
                            i.eve("raphael.clear", this), this.canvas.innerHTML = f, this.span = i._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
                        }, i.prototype.remove = function() {
                            i.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
                            for (var t in this) this[t] = "function" == typeof this[t] ? i._removedFactory(t) : null;
                            return !0
                        };
                        var A = i.st;
                        for (var P in E) E[t](P) && !A[t](P) && (A[P] = function(t) {
                            return function() {
                                var e = arguments;
                                return this.forEach(function(i) {
                                    i[t].apply(i, e)
                                })
                            }
                        }(P))
                    }
                }(), S.was ? D.win.Raphael = i : Raphael = i, i
        }), n("graphael", ["raphael"], function(t) {
            t.el.popup = function(t, e, i, n) {
                    var s, r, a, o, l = this.paper || this[0].paper;
                    if (l) {
                        switch (this.type) {
                            case "text":
                            case "circle":
                            case "ellipse":
                                r = !0;
                                break;
                            default:
                                r = !1
                        }
                        return t = null == t ? "up" : t, e = e || 5, s = this.getBBox(), i = "number" == typeof i ? i : r ? s.x + s.width / 2 : s.x, n = "number" == typeof n ? n : r ? s.y + s.height / 2 : s.y, a = Math.max(s.width / 2 - e, 0), o = Math.max(s.height / 2 - e, 0), this.translate(i - s.x - (r ? s.width / 2 : 0), n - s.y - (r ? s.height / 2 : 0)), s = this.getBBox(), i = {
                            up: ["M", i, n, "l", -e, -e, -a, 0, "a", e, e, 0, 0, 1, -e, -e, "l", 0, -s.height, "a", e, e, 0, 0, 1, e, -e, "l", 2 * e + 2 * a, 0, "a", e, e, 0, 0, 1, e, e, "l", 0, s.height, "a", e, e, 0, 0, 1, -e, e, "l", -a, 0, "z"].join(),
                            down: ["M", i, n, "l", e, e, a, 0, "a", e, e, 0, 0, 1, e, e, "l", 0, s.height, "a", e, e, 0, 0, 1, -e, e, "l", -(2 * e + 2 * a), 0, "a", e, e, 0, 0, 1, -e, -e, "l", 0, -s.height, "a", e, e, 0, 0, 1, e, -e, "l", a, 0, "z"].join(),
                            left: ["M", i, n, "l", -e, e, 0, o, "a", e, e, 0, 0, 1, -e, e, "l", -s.width, 0, "a", e, e, 0, 0, 1, -e, -e, "l", 0, -(2 * e + 2 * o), "a", e, e, 0, 0, 1, e, -e, "l", s.width, 0, "a", e, e, 0, 0, 1, e, e, "l", 0, o, "z"].join(),
                            right: ["M", i, n, "l", e, -e, 0, -o, "a", e, e, 0, 0, 1, e, -e, "l", s.width, 0, "a", e, e, 0, 0, 1, e, e, "l", 0, 2 * e + 2 * o, "a", e, e, 0, 0, 1, -e, e, "l", -s.width, 0, "a", e, e, 0, 0, 1, -e, -e, "l", 0, -o, "z"].join()
                        }, e = {
                            up: {
                                x: -!r * (s.width / 2),
                                y: 2 * -e - (r ? s.height / 2 : s.height)
                            },
                            down: {
                                x: -!r * (s.width / 2),
                                y: 2 * e + (r ? s.height / 2 : s.height)
                            },
                            left: {
                                x: 2 * -e - (r ? s.width / 2 : s.width),
                                y: -!r * (s.height / 2)
                            },
                            right: {
                                x: 2 * e + (r ? s.width / 2 : s.width),
                                y: -!r * (s.height / 2)
                            }
                        }[t], this.translate(e.x, e.y), l.path(i[t]).attr({
                            fill: "#000",
                            stroke: "none"
                        }).insertBefore(this.node ? this : this[0])
                    }
                }, t.el.tag = function(t, e, i, n) {
                    var s = this.paper || this[0].paper;
                    if (s) {
                        var r, a, o, s = s.path().attr({
                                fill: "#000",
                                stroke: "#000"
                            }),
                            l = this.getBBox();
                        switch (this.type) {
                            case "text":
                            case "circle":
                            case "ellipse":
                                o = !0;
                                break;
                            default:
                                o = !1
                        }
                        return t = t || 0, i = "number" == typeof i ? i : o ? l.x + l.width / 2 : l.x, n = "number" == typeof n ? n : o ? l.y + l.height / 2 : l.y, e = null == e ? 5 : e, a = .5522 * e, l.height >= 2 * e ? s.attr({
                            path: ["M", i, n + e, "a", e, e, 0, 1, 1, 0, 2 * -e, e, e, 0, 1, 1, 0, 2 * e, "m", 0, 2 * -e - 3, "a", e + 3, e + 3, 0, 1, 0, 0, 2 * (e + 3), "L", i + e + 3, n + l.height / 2 + 3, "l", l.width + 6, 0, 0, -l.height - 6, -l.width - 6, 0, "L", i, n - e - 3].join()
                        }) : (r = Math.sqrt(Math.pow(e + 3, 2) - Math.pow(l.height / 2 + 3, 2)), s.attr({
                            path: ["M", i, n + e, "c", -a, 0, -e, a - e, -e, -e, 0, -a, e - a, -e, e, -e, a, 0, e, e - a, e, e, 0, a, a - e, e, -e, e, "M", i + r, n - l.height / 2 - 3, "a", e + 3, e + 3, 0, 1, 0, 0, l.height + 6, "l", e + 3 - r + l.width + 6, 0, 0, -l.height - 6, "L", i + r, n - l.height / 2 - 3].join()
                        })), t = 360 - t, s.rotate(t, i, n), this.attrs ? (this.attr(this.attrs.x ? "x" : "cx", i + e + 3 + (o ? l.width / 2 : "text" == this.type ? l.width : 0)).attr("y", o ? n : n - l.height / 2), this.rotate(t, i, n), t > 90 && 270 > t && this.attr(this.attrs.x ? "x" : "cx", i - e - 3 - (o ? l.width / 2 : l.width)).rotate(180, i, n)) : t > 90 && 270 > t ? (this.translate(i - l.x - l.width - e - 3, n - l.y - l.height / 2), this.rotate(t - 180, l.x + l.width + e + 3, l.y + l.height / 2)) : (this.translate(i - l.x + e + 3, n - l.y - l.height / 2), this.rotate(t, l.x - e - 3, l.y + l.height / 2)), s.insertBefore(this.node ? this : this[0])
                    }
                }, t.el.drop = function(t, e, i) {
                    var n, s, r = this.getBBox(),
                        a = this.paper || this[0].paper;
                    if (a) {
                        switch (this.type) {
                            case "text":
                            case "circle":
                            case "ellipse":
                                n = !0;
                                break;
                            default:
                                n = !1
                        }
                        return t = t || 0, e = "number" == typeof e ? e : n ? r.x + r.width / 2 : r.x, i = "number" == typeof i ? i : n ? r.y + r.height / 2 : r.y, s = Math.max(r.width, r.height) + Math.min(r.width, r.height), a = a.path(["M", e, i, "l", s, 0, "A", .4 * s, .4 * s, 0, 1, 0, e + .7 * s, i - .7 * s, "z"]).attr({
                            fill: "#000",
                            stroke: "none"
                        }).rotate(22.5 - t, e, i), t = (t + 90) * Math.PI / 180, e = e + s * Math.sin(t) - (n ? 0 : r.width / 2), t = i + s * Math.cos(t) - (n ? 0 : r.height / 2), this.attrs ? this.attr(this.attrs.x ? "x" : "cx", e).attr(this.attrs.y ? "y" : "cy", t) : this.translate(e - r.x, t - r.y), a.insertBefore(this.node ? this : this[0])
                    }
                }, t.el.flag = function(t, e, i) {
                    var n = this.paper || this[0].paper;
                    if (n) {
                        var s, n = n.path().attr({
                                fill: "#000",
                                stroke: "#000"
                            }),
                            r = this.getBBox(),
                            a = r.height / 2;
                        switch (this.type) {
                            case "text":
                            case "circle":
                            case "ellipse":
                                s = !0;
                                break;
                            default:
                                s = !1
                        }
                        return t = t || 0, e = "number" == typeof e ? e : s ? r.x + r.width / 2 : r.x, i = "number" == typeof i ? i : s ? r.y + r.height / 2 : r.y, n.attr({
                            path: ["M", e, i, "l", a + 3, -a - 3, r.width + 6, 0, 0, r.height + 6, -r.width - 6, 0, "z"].join()
                        }), t = 360 - t, n.rotate(t, e, i), this.attrs ? (this.attr(this.attrs.x ? "x" : "cx", e + a + 3 + (s ? r.width / 2 : "text" == this.type ? r.width : 0)).attr("y", s ? i : i - r.height / 2), this.rotate(t, e, i), t > 90 && 270 > t && this.attr(this.attrs.x ? "x" : "cx", e - a - 3 - (s ? r.width / 2 : r.width)).rotate(180, e, i)) : t > 90 && 270 > t ? (this.translate(e - r.x - r.width - a - 3, i - r.y - r.height / 2), this.rotate(t - 180, r.x + r.width + a + 3, r.y + r.height / 2)) : (this.translate(e - r.x + a + 3, i - r.y - r.height / 2), this.rotate(t, r.x - a - 3, r.y + r.height / 2)), n.insertBefore(this.node ? this : this[0])
                    }
                }, t.el.label = function() {
                    var t = this.getBBox(),
                        e = this.paper || this[0].paper,
                        i = Math.min(20, t.width + 10, t.height + 10) / 2;
                    return e ? e.rect(t.x - i / 2, t.y - i / 2, t.width + i, t.height + i, i).attr({
                        stroke: "none",
                        fill: "#000"
                    }).insertBefore(this.node ? this : this[0]) : void 0
                }, t.el.blob = function(t, e, i) {
                    var n, s, r = this.getBBox(),
                        a = Math.PI / 180,
                        o = this.paper || this[0].paper;
                    if (o) {
                        switch (this.type) {
                            case "text":
                            case "circle":
                            case "ellipse":
                                n = !0;
                                break;
                            default:
                                n = !1
                        }
                        o = o.path().attr({
                            fill: "#000",
                            stroke: "none"
                        }), t = (+t + 1 ? t : 45) + 90, s = Math.min(r.height, r.width);
                        var e = "number" == typeof e ? e : n ? r.x + r.width / 2 : r.x,
                            i = "number" == typeof i ? i : n ? r.y + r.height / 2 : r.y,
                            l = Math.max(r.width + s, 25 * s / 12),
                            h = Math.max(r.height + s, 25 * s / 12);
                        n = e + s * Math.sin((t - 22.5) * a);
                        var u = i + s * Math.cos((t - 22.5) * a),
                            c = e + s * Math.sin((t + 22.5) * a),
                            t = i + s * Math.cos((t + 22.5) * a),
                            a = (c - n) / 2;
                        s = (t - u) / 2;
                        var l = l / 2,
                            h = h / 2,
                            d = -Math.sqrt(Math.abs(l * l * h * h - l * l * s * s - h * h * a * a) / (l * l * s * s + h * h * a * a));
                        return s = d * l * s / h + (c + n) / 2, a = d * -h * a / l + (t + u) / 2, o.attr({
                            x: s,
                            y: a,
                            path: ["M", e, i, "L", c, t, "A", l, h, 0, 1, 1, n, u, "z"].join()
                        }), this.translate(s - r.x - r.width / 2, a - r.y - r.height / 2), o.insertBefore(this.node ? this : this[0])
                    }
                }, t.fn.label = function(e, i, n) {
                    var s = this.set(),
                        n = this.text(e, i, n).attr(t.g.txtattr);
                    return s.push(n.label(), n)
                }, t.fn.popup = function(e, i, n, s, r) {
                    var a = this.set(),
                        n = this.text(e, i, n).attr(t.g.txtattr);
                    return a.push(n.popup(s, r), n)
                }, t.fn.tag = function(e, i, n, s, r) {
                    var a = this.set(),
                        n = this.text(e, i, n).attr(t.g.txtattr);
                    return a.push(n.tag(s, r), n)
                }, t.fn.flag = function(e, i, n, s) {
                    var r = this.set(),
                        n = this.text(e, i, n).attr(t.g.txtattr);
                    return r.push(n.flag(s), n)
                }, t.fn.drop = function(e, i, n, s) {
                    var r = this.set(),
                        n = this.text(e, i, n).attr(t.g.txtattr);
                    return r.push(n.drop(s), n)
                }, t.fn.blob = function(e, i, n, s) {
                    var r = this.set(),
                        n = this.text(e, i, n).attr(t.g.txtattr);
                    return r.push(n.blob(s), n)
                }, t.el.lighter = function(e) {
                    var e = e || 2,
                        i = [this.attrs.fill, this.attrs.stroke];
                    return this.fs = this.fs || [i[0], i[1]], i[0] = t.rgb2hsb(t.getRGB(i[0]).hex), i[1] = t.rgb2hsb(t.getRGB(i[1]).hex), i[0].b = Math.min(i[0].b * e, 1), i[0].s /= e, i[1].b = Math.min(i[1].b * e, 1), i[1].s /= e, this.attr({
                        fill: "hsb(" + [i[0].h, i[0].s, i[0].b] + ")",
                        stroke: "hsb(" + [i[1].h, i[1].s, i[1].b] + ")"
                    }), this
                }, t.el.darker = function(e) {
                    var e = e || 2,
                        i = [this.attrs.fill, this.attrs.stroke];
                    return this.fs = this.fs || [i[0], i[1]], i[0] = t.rgb2hsb(t.getRGB(i[0]).hex), i[1] = t.rgb2hsb(t.getRGB(i[1]).hex), i[0].s = Math.min(i[0].s * e, 1), i[0].b /= e, i[1].s = Math.min(i[1].s * e, 1), i[1].b /= e, this.attr({
                        fill: "hsb(" + [i[0].h, i[0].s, i[0].b] + ")",
                        stroke: "hsb(" + [i[1].h, i[1].s, i[1].b] + ")"
                    }), this
                }, t.el.resetBrightness = function() {
                    return this.fs && (this.attr({
                        fill: this.fs[0],
                        stroke: this.fs[1]
                    }), delete this.fs), this
                },
                function() {
                    var e, i = ["lighter", "darker", "resetBrightness"],
                        n = "popup tag flag label drop blob".split(" ");
                    for (e in n)(function(e) {
                        t.st[e] = function() {
                            return t.el[e].apply(this, arguments)
                        }
                    })(n[e]);
                    for (e in i)(function(e) {
                        t.st[e] = function() {
                            for (var t = 0; t < this.length; t++) this[t][e].apply(this[t], arguments);
                            return this
                        }
                    })(i[e])
                }(), t.g = {
                    shim: {
                        stroke: "none",
                        fill: "#000",
                        "fill-opacity": 0
                    },
                    txtattr: {
                        font: "12px Arial, sans-serif",
                        fill: "#fff"
                    },
                    colors: function() {
                        for (var t = [.6, .2, .05, .1333, .75, 0], e = [], i = 0; 10 > i; i++) i < t.length ? e.push("hsb(" + t[i] + ",.75, .75)") : e.push("hsb(" + t[i - t.length] + ", 1, .5)");
                        return e
                    }(),
                    snapEnds: function(t, e, i) {
                        function n(t) {
                            return .25 > Math.abs(t - .5) ? ~~t + .5 : Math.round(t)
                        }
                        var s = t,
                            r = e;
                        if (s == r) return {
                            from: s,
                            to: r,
                            power: 0
                        };
                        var s = (r - s) / i,
                            a = r = ~~s,
                            i = 0;
                        if (r) {
                            for (; a;) i--, a = ~~(s * Math.pow(10, i)) / Math.pow(10, i);
                            i++
                        } else {
                            if (0 != s && isFinite(s))
                                for (; !r;) i = i || 1, r = ~~(s * Math.pow(10, i)) / Math.pow(10, i), i++;
                            else i = 1;
                            i && i--
                        }
                        return r = n(e * Math.pow(10, i)) / Math.pow(10, i), e > r && (r = n((e + .5) * Math.pow(10, i)) / Math.pow(10, i)), s = n((t - (i > 0 ? 0 : .5)) * Math.pow(10, i)) / Math.pow(10, i), {
                            from: s,
                            to: r,
                            power: i
                        }
                    },
                    axis: function(t, e, i, n, s, r, a, o, l, h, u) {
                        var h = null == h ? 2 : h,
                            l = l || "t",
                            r = r || 10,
                            u = arguments[arguments.length - 1],
                            c = "|" == l || " " == l ? ["M", t + .5, e, "l", 0, .001] : 1 == a || 3 == a ? ["M", t + .5, e, "l", 0, -i] : ["M", t, e + .5, "l", i, 0],
                            d = this.snapEnds(n, s, r),
                            p = d.from,
                            f = d.to,
                            g = d.power,
                            m = 0,
                            v = {
                                font: "11px 'Fontin Sans', Fontin-Sans, sans-serif"
                            },
                            d = u.set(),
                            f = (f - p) / r,
                            y = p,
                            b = g > 0 ? g : 0,
                            _ = i / r;
                        if (1 == +a || 3 == +a) {
                            for (g = e, p = (a - 1 ? 1 : -1) * (h + 3 + !!(a - 1)); g >= e - i;) "-" != l && " " != l && (c = c.concat(["M", t - ("+" == l || "|" == l ? h : 2 * !(a - 1) * h), g + .5, "l", 2 * h + 1, 0])), d.push(u.text(t + p, g, o && o[m++] || (Math.round(y) == y ? y : +y.toFixed(b))).attr(v).attr({
                                "text-anchor": a - 1 ? "start" : "end"
                            })), y += f, g -= _;
                            Math.round(g + _ - (e - i)) && ("-" != l && " " != l && (c = c.concat(["M", t - ("+" == l || "|" == l ? h : 2 * !(a - 1) * h), e - i + .5, "l", 2 * h + 1, 0])), d.push(u.text(t + p, e - i, o && o[m] || (Math.round(y) == y ? y : +y.toFixed(b))).attr(v).attr({
                                "text-anchor": a - 1 ? "start" : "end"
                            })))
                        } else {
                            for (var y = p, b = (g > 0) * g, p = (a ? -1 : 1) * (h + 9 + !a), g = t, _ = i / r, x = 0, w = 0; t + i >= g;) "-" != l && " " != l && (c = c.concat(["M", g + .5, e - ("+" == l ? h : 2 * !!a * h), "l", 0, 2 * h + 1])), d.push(x = u.text(g, e + p, o && o[m++] || (Math.round(y) == y ? y : +y.toFixed(b))).attr(v)), x = x.getBBox(), w >= x.x - 5 ? d.pop(d.length - 1).remove() : w = x.x + x.width, y += f, g += _;
                            Math.round(g - _ - t - i) && ("-" != l && " " != l && (c = c.concat(["M", t + i + .5, e - ("+" == l ? h : 2 * !!a * h), "l", 0, 2 * h + 1])), d.push(u.text(t + i, e + p, o && o[m] || (Math.round(y) == y ? y : +y.toFixed(b))).attr(v)))
                        }
                        return c = u.path(c), c.text = d, c.all = u.set([c, d]), c.remove = function() {
                            this.text.remove(), this.constructor.prototype.remove.call(this)
                        }, c
                    },
                    labelise: function(t, e, i) {
                        return t ? (t + "").replace(/(##+(?:\.#+)?)|(%%+(?:\.%+)?)/g, function(t, n, s) {
                            return n ? (+e).toFixed(n.replace(/^#+\.?/g, "").length) : s ? (100 * e / i).toFixed(s.replace(/^%+\.?/g, "").length) + "%" : void 0
                        }) : (+e).toFixed(0)
                    }
                }
        }), n("g.line", ["raphael"], function(t) {
            ! function() {
                function e(t, e, i, n, s, r) {
                    function a(t, e, i, n, s, r) {
                        var a = Math.PI / 180,
                            o = t + i * Math.cos(-n * a),
                            l = t + i * Math.cos(-s * a),
                            h = t + i / 2 * Math.cos(-(n + (s - n) / 2) * a),
                            u = e + i * Math.sin(-n * a),
                            c = e + i * Math.sin(-s * a),
                            d = e + i / 2 * Math.sin(-(n + (s - n) / 2) * a),
                            p = ["M", t, e, "L", o, u, "A", i, i, 0, +(Math.abs(s - n) > 180), 1, l, c, "z"];
                        return p.middle = {
                            x: h,
                            y: d
                        }, p
                    }
                    r = r || {};
                    var o = this,
                        l = [],
                        h = t.set(),
                        u = t.set(),
                        c = t.set(),
                        d = s.length,
                        p = 0,
                        f = 0,
                        g = 0,
                        m = r.maxSlices || 100,
                        v = parseFloat(r.minPercent) || 1,
                        y = Boolean(v);
                    if (u.covers = h, 1 == d) c.push(t.circle(e, i, n).attr({
                        fill: r.colors && r.colors[0] || o.colors[0],
                        stroke: r.stroke || "#fff",
                        "stroke-width": null == r.strokewidth ? 1 : r.strokewidth
                    })), h.push(t.circle(e, i, n).attr(o.shim)), f = s[0], s[0] = {
                        value: s[0],
                        order: 0,
                        valueOf: function() {
                            return this.value
                        }
                    }, r.href && r.href[0] && h[0].attr({
                        href: r.href[0]
                    }), c[0].middle = {
                        x: e,
                        y: i
                    }, c[0].mangle = 180;
                    else {
                        for (var b = 0; d > b; b++) f += s[b], s[b] = {
                            value: s[b],
                            order: b,
                            valueOf: function() {
                                return this.value
                            }
                        };
                        for (r.sort !== !1 && s.sort(function(t, e) {
                                return e.value - t.value
                            }), b = 0; d > b; b++) y && 100 * s[b] / f < v && (m = b, y = !1), b > m && (y = !1, s[m].value += s[b], s[m].others = !0, g = s[m].value);
                        for (d = Math.min(m + 1, s.length), g && s.splice(d) && (s[m].others = !0), b = 0; d > b; b++) {
                            var _ = p - 360 * s[b] / f / 2;
                            if (b || (p = void 0 === r.startAngle ? 90 - _ : r.startAngle, _ = p - 360 * s[b] / f / 2), r.init) var x = a(e, i, 1, p, p - 360 * s[b] / f).join(",");
                            var w = a(e, i, n, p, p -= 360 * s[b] / f),
                                k = r.matchColors && 1 == r.matchColors ? s[b].order : b,
                                C = t.path(r.init ? x : w).attr({
                                    fill: r.colors && r.colors[k] || o.colors[k] || "#666",
                                    stroke: r.stroke || "#fff",
                                    "stroke-width": null == r.strokewidth ? 1 : r.strokewidth,
                                    "stroke-linejoin": "round"
                                });
                            C.value = s[b], C.middle = w.middle, C.mangle = _, l.push(C), c.push(C), r.init && C.animate({
                                path: w.join(",")
                            }, +r.init - 1 || 1e3, ">")
                        }
                        for (b = 0; d > b; b++) C = t.path(l[b].attr("path")).attr(o.shim), r.href && r.href[b] && C.attr({
                            href: r.href[b]
                        }), C.attr = function() {}, h.push(C), c.push(C)
                    }
                    u.hover = function(t, r) {
                        r = r || function() {};
                        for (var a = this, o = 0; d > o; o++) ! function(o, l, h) {
                            var u = {
                                sector: o,
                                cover: l,
                                cx: e,
                                cy: i,
                                mx: o.middle.x,
                                my: o.middle.y,
                                mangle: o.mangle,
                                r: n,
                                value: s[h],
                                total: f,
                                label: a.labels && a.labels[h]
                            };
                            l.mouseover(function() {
                                t.call(u)
                            }).mouseout(function() {
                                r.call(u)
                            })
                        }(c[o], h[o], o);
                        return this
                    }, u.each = function(t) {
                        for (var r = this, a = 0; d > a; a++) ! function(a, o, l) {
                            var h = {
                                sector: a,
                                cover: o,
                                cx: e,
                                cy: i,
                                x: a.middle.x,
                                y: a.middle.y,
                                mangle: a.mangle,
                                r: n,
                                value: s[l],
                                total: f,
                                label: r.labels && r.labels[l]
                            };
                            t.call(h)
                        }(c[a], h[a], a);
                        return this
                    }, u.click = function(t) {
                        for (var r = this, a = 0; d > a; a++) ! function(a, o, l) {
                            var h = {
                                sector: a,
                                cover: o,
                                cx: e,
                                cy: i,
                                mx: a.middle.x,
                                my: a.middle.y,
                                mangle: a.mangle,
                                r: n,
                                value: s[l],
                                total: f,
                                label: r.labels && r.labels[l]
                            };
                            o.click(function() {
                                t.call(h)
                            })
                        }(c[a], h[a], a);
                        return this
                    }, u.inject = function(t) {
                        t.insertBefore(h[0])
                    };
                    var T = function(a, l, p, g) {
                        var m = e + n + n / 5,
                            v = i,
                            y = v + 10;
                        a = a || [], g = g && g.toLowerCase && g.toLowerCase() || "east", p = t[p && p.toLowerCase()] || "circle", u.labels = t.set();
                        for (var b = 0; d > b; b++) {
                            var _, x = c[b].attr("fill"),
                                w = s[b].order;
                            s[b].others && (a[w] = l || "Others"), a[w] = o.labelise(a[w], s[b], f), u.labels.push(t.set()), u.labels[b].push(t[p](m + 5, y, 5).attr({
                                fill: x,
                                stroke: "none"
                            })), u.labels[b].push(_ = t.text(m + 20, y, a[w] || s[w]).attr(o.txtattr).attr({
                                fill: r.legendcolor || "#000",
                                "text-anchor": "start"
                            })), h[b].label = u.labels[b], y += 1.2 * _.getBBox().height;
                        }
                        var k = u.labels.getBBox(),
                            C = {
                                east: [0, -k.height / 2],
                                west: [-k.width - 2 * n - 20, -k.height / 2],
                                north: [-n - k.width / 2, -n - k.height - 10],
                                south: [-n - k.width / 2, n + 10]
                            }[g];
                        u.labels.translate.apply(u.labels, C), u.push(u.labels)
                    };
                    return r.legend && T(r.legend, r.legendothers, r.legendmark, r.legendpos), u.push(c, h), u.series = c, u.covers = h, u
                }
                var i = function() {};
                i.prototype = t.g, e.prototype = new i, t.fn.piechart = function(t, i, n, s, r) {
                    return new e(this, t, i, n, s, r)
                }
            }()
        }), n("custom/jquery.waitingtime", ["jquery", "raphael", "graphael", "g.line"], function(t, e) {
            t(function() {
                var i = (t(".waiting-time"), {
                        IsVacationDay: !1,
                        Header: "Undgå kø i telefonen",
                        Teaser: "Vi gør alt, hvad vi kan, for at svare hurtigit på telefonerne, så du kan undgå ventetid.\r\n\r\nMen der er tidspunkter, hvor vi er mere optagede end andre.",
                        CurrentTimeLabel: !1,
                        CurrentTimeStatusLabel: !1,
                        ClosedLabel: "Lukket",
                        LowRiskLabel: "Mindst risiko for ventetid",
                        MediumRiskLabel: "Risiko for ventetid",
                        HighRiskLabel: "Størst risiko for ventetid",
                        Days: [{
                            Name: "Mandag",
                            IsCurrentDay: !1,
                            HasWaitingTimeBlock: !1
                        }, {
                            Name: "Tirsdag",
                            IsCurrentDay: !1,
                            HasWaitingTimeBlock: !1
                        }, {
                            Name: "Onsdag",
                            IsCurrentDay: !1,
                            HasWaitingTimeBlock: !1
                        }, {
                            Name: "Torsdag",
                            IsCurrentDay: !1,
                            HasWaitingTimeBlock: !1
                        }, {
                            Name: "Fredag",
                            IsCurrentDay: !1,
                            HasWaitingTimeBlock: !1
                        }, {
                            Name: "Lørdag",
                            IsCurrentDay: !1,
                            HasWaitingTimeBlock: !1
                        }, {
                            Name: "Søndag",
                            IsCurrentDay: !1,
                            HasWaitingTimeBlock: !1
                        }],
                        VacationBlocks: []
                    }),
                    n = function(n, s) {
                        if (!n.length) return !1;
                        var r = t.parseJSON(n.attr("data-waiting-time").replace(/'/g, '"'));
                        if ("object" != typeof r) return !1;
                        r = t.extend({}, i, r);
                        var a = t("<div />");
                        t('<strong class="header waiting-time__header">' + r.Header + "</strong>").appendTo(a), t('<div class="waiting-time__desc">' + r.Teaser + "</div>").appendTo(a), r.CurrentTimeLabel && t('<div class="waiting-time__current-time">' + r.CurrentTimeLabel + "</div>").appendTo(a), r.CurrentTimeStatusLabel && t('<div class="waiting-time__current-status">' + r.CurrentTimeStatusLabel + "</div>").appendTo(a);
                        var o = t('<ol class="waiting-time__days" />').appendTo(a);
                        t('<ul class="waiting-time__legend"><li><span class="waiting-time__icon waiting-time__icon--green"></span> <span class="waiting-time__label">' + r.LowRiskLabel + '</span></li><li><span class="waiting-time__icon waiting-time__icon--yellow"></span> <span class="waiting-time__label">' + r.MediumRiskLabel + '</span></li><li><span class="waiting-time__icon waiting-time__icon--red"></span> <span class="waiting-time__label">' + r.HighRiskLabel + "</span></li></ul>").appendTo(a);
                        var l = s.closest(".panel--highlight").find(".waiting-time");
                        l.empty().append(a), t.each(r.Days, function(i, n) {
                            var s = t('<li><div class="waiting-time__clock"><div class="waiting-time__day">' + n.Name + '</div><div class="waiting-time__figure"><div class="waiting-time__gfx"></div><img src="/website/static/build/images/waitingtime/waiting-time-disc.png" alt="" class="waiting-time__disc" /></div></div></li>').appendTo(o),
                                a = s.children();
                            if (n.HasWaitingTimeBlock) {
                                var l, h, u, c, d, p = a.find(".waiting-time__gfx"),
                                    f = p.width(),
                                    g = e(p[0], "100%", "100%"),
                                    m = [],
                                    v = [],
                                    y = 720;
                                if (f % 2 && (f -= 1, d = 1, p.css("margin", d)), h = (f - 20) / 2, l = f / 2, t.each(n.WaitingBlocks, function(t, e) {
                                        switch (void 0 === u && (u = e.StartMinute), m.push(e.EndMinute - e.StartMinute - (c === e.EndMinute ? 1 : 0)), c = e.EndMinute, e.Status) {
                                            case "Low":
                                                v.push("#88e600");
                                                break;
                                            case "Medium":
                                                v.push("#f4ab00");
                                                break;
                                            case "High":
                                                v.push("#e64d59");
                                                break;
                                            default:
                                                v.push("#767676")
                                        }
                                    }), m.push(y - (c - u)), v.push("white"), g.piechart(l, l, h, m, {
                                        colors: v,
                                        strokewidth: 0,
                                        startAngle: 30 * -(u / 60 - 3),
                                        sort: !1
                                    }), n.IsCurrentDay && (a.addClass("waiting-time__clock--today"), n.HasWaitingTimeBlock && g)) {
                                    var b, _ = r.CurrentTime;
                                    _ = _ > 720 ? _ - 720 : _, b = _ / 720 * 360 - 90, b = b * Math.PI / 180, object = g.circle(l, l, h + 8), object.attr("stroke", "#4D4D4D"), object.attr("stroke-width", 2), object = g.path("M" + l + "," + l + "L" + (l + (h + 8) * Math.cos(b)) + "," + (l + (h + 8) * Math.sin(b))), object.attr("stroke", "#4d4d4d"), object.attr("stroke-width", 2), object = g.circle(l, l, 3), object.attr("fill", "#ffffff"), object.attr("stroke", "#4d4d4d"), object.attr("stroke-width", 2)
                                }
                            } else a.addClass("waiting-time__clock--closed"), a.find(".waiting-time__figure").html('<img src="/website/static/build/images/waitingtime/waiting-time-closed.png" alt="" class="waiting-time__closed" /><span>' + r.ClosedLabel + "</span>")
                        })
                    };
                t(document).on("change", "[data-selectmultiple]", function(e) {
                    var i = t(this).val(),
                        s = t('[data-selectmultiple-id="' + i + '"]'),
                        r = s.find("[data-waiting-time]"),
                        a = r.length;
                    a > 0 ? t(".waiting-time").addClass("active") : t(".waiting-time").removeClass("active"), n(r, t(this))
                })
            })
        }), n("custom/jquery.federation-refresh", ["jquery"], function(t) {
            if (t("#FederationRefreshLink").length > 0) {
                var e = t("#FederationRefreshLink").attr("href");
                null != e && "" != e && t("#FederationRefreshLink").first().append('<script type="text/javascript" src="' + e + '"></script>')
            }
        }), n("custom/jquery.nempost-count", ["jquery"], function(t) {
            t(document).ready(function() {
                t(".header__post a[data-mail-count-action]").each(function() {
                    var e = t(this),
                        i = e.attr("data-mail-count-action");
                    null != i && "" != i && t.ajax({
                        type: "GET",
                        dataType: "json",
                        url: i,
                        success: function(e) {
                            "false" != e.succes && t(".header__post a[data-mail-count-action] span, .icon-nempost a span").each(function() {
                                t("<i class='nempostCounter'>" + e.count + "</i>").prependTo(t(this)).animate({
                                    opacity: 1
                                }, 400)
                            })
                        }
                    })
                })
            })
        }), n("custom/jquery.cookie-disclaimer", ["jquery"], function(t) {
            t(".cookie-disclaimer .cookie-accept-trigger").click(function(e) {
                var i = new Date;
                i.setTime(i.getTime() + 864e9);
                var n = "expires=" + i.toUTCString();
                document.cookie = "cookieconsent=true;" + n + ";path=/", t(".cookie-disclaimer").hide()
            })
        }), n("custom/search", ["jquery"], function(t) {
            function e(e) {
                if (!e) throw new Error("Base node not given");
                var e = t(e).closest("[data-search]");
                return e.data("resultpage") + "&query=" + t(e).find("input").val()
            }
            t(document).ready(function() {
                t("[data-search]").on("keydown", "input", function(t) {
                    13 === t.keyCode && (t.preventDefault(), window.location.href = e(this))
                }).on("click", "button", function(t) {
                    t.preventDefault(), window.location.href = e(this)
                }), t("[data-search-filter-trigger]").on("click", function(e) {
                    e.preventDefault(), t(this).closest("[data-search-filter]").toggleClass("active")
                })
            })
        }), e(["jquery", "jquery-ui", "modernizr", "custom/debounce", "foundation/foundation", "foundation/foundation.tab", "foundation/foundation.dropdown", "foundation/foundation.equalizer", "custom/jquery.accordion", "custom/jquery.placeholder", "custom/jquery.fixed.navigation", "custom/jquery.plugin.select", "custom/jquery.plugin.select-multiple", "custom/jquery.plugin.redirect", "custom/jquery.autocomplete", "custom/jquery.form-module", "custom/jquery.form-errors", "custom/jquery.print", "custom/jquery.waitingtime", "custom/jquery.federation-refresh", "custom/jquery.nempost-count", "custom/jquery.cookie-disclaimer", "custom/search"], function(t) {
            var e, i, n, s, r, a;
            e = function() {
                t(document).foundation({
                    tab: {},
                    dropdown: {
                        active_class: "open"
                    },
                    equalizer: {
                        equalize_on_stack: !0
                    }
                });
                var e, i = document.body;
                window.addEventListener("scroll", function() {
                    clearTimeout(e), i.classList.contains("disable-hover") || i.classList.add("disable-hover"), e = setTimeout(function() {
                        i.classList.remove("disable-hover")
                    }, 250)
                }, !1), t("[data-accordion]").accordion(), t("[data-redirect]").redirect(), t("[data-select]").selectsorter(), t("[data-selectmultiple]").multiplesorter()
            }, a = function() {}, i = function() {}, n = function() {}, s = function() {}, t(e), t(window).load(i), t(window).resize(function(t) {
                n(), clearTimeout(r), r = setTimeout(s, 50)
            }), t(a)
        }), n("main", function() {}),
        function(t) {}(this), n("selectivizr", function() {}), i(["main"])
}();