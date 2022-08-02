import { scrollToProduct } from "../../store/Department/components/scrollback";

!(function (e) {
    var t = {};
    function r(n) {
        if (t[n]) return t[n].exports;
        var o = (t[n] = { i: n, l: !1, exports: {} });
        return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    (r.m = e),
        (r.c = t),
        (r.d = function (e, t, n) {
            r.o(e, t) ||
                Object.defineProperty(e, t, { enumerable: !0, get: n });
        }),
        (r.r = function (e) {
            "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module",
                }),
                Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (r.t = function (e, t) {
            if ((1 & t && (e = r(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (
                (r.r(n),
                Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e,
                }),
                2 & t && "string" != typeof e)
            )
                for (var o in e)
                    r.d(
                        n,
                        o,
                        function (t) {
                            return e[t];
                        }.bind(null, o)
                    );
            return n;
        }),
        (r.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return r.d(t, "a", t), t;
        }),
        (r.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (r.p = "/dist/"),
        r((r.s = 4));
})([
    function (e, t, r) {
        var n, o, i;
        !(function (a, s) {
            "use strict";
            e.exports
                ? (e.exports = s(r(1), r(2), r(3)))
                : ((o = [r(1), r(2), r(3)]),
                  void 0 ===
                      (i = "function" == typeof (n = s) ? n.apply(t, o) : n) ||
                      (e.exports = i));
        })(0, function (e, t, r, n) {
            "use strict";
            var o = n && n.URI;
            function i(e, t) {
                var r = arguments.length >= 1,
                    n = arguments.length >= 2;
                if (!(this instanceof i))
                    return r ? (n ? new i(e, t) : new i(e)) : new i();
                if (void 0 === e) {
                    if (r)
                        throw new TypeError(
                            "undefined is not a valid argument for URI"
                        );
                    e =
                        "undefined" != typeof location
                            ? location.href + ""
                            : "";
                }
                if (null === e && r)
                    throw new TypeError("null is not a valid argument for URI");
                return this.href(e), void 0 !== t ? this.absoluteTo(t) : this;
            }
            i.version = "1.19.2";
            var a = i.prototype,
                s = Object.prototype.hasOwnProperty;
            function u(e) {
                return e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
            }
            function c(e) {
                return void 0 === e
                    ? "Undefined"
                    : String(Object.prototype.toString.call(e)).slice(8, -1);
            }
            function l(e) {
                return "Array" === c(e);
            }
            function p(e, t) {
                var r,
                    n,
                    o = {};
                if ("RegExp" === c(t)) o = null;
                else if (l(t))
                    for (r = 0, n = t.length; r < n; r++) o[t[r]] = !0;
                else o[t] = !0;
                for (r = 0, n = e.length; r < n; r++) {
                    ((o && void 0 !== o[e[r]]) || (!o && t.test(e[r]))) &&
                        (e.splice(r, 1), n--, r--);
                }
                return e;
            }
            function h(e, t) {
                var r, n;
                if (l(t)) {
                    for (r = 0, n = t.length; r < n; r++)
                        if (!h(e, t[r])) return !1;
                    return !0;
                }
                var o = c(t);
                for (r = 0, n = e.length; r < n; r++)
                    if ("RegExp" === o) {
                        if ("string" == typeof e[r] && e[r].match(t)) return !0;
                    } else if (e[r] === t) return !0;
                return !1;
            }
            function d(e, t) {
                if (!l(e) || !l(t)) return !1;
                if (e.length !== t.length) return !1;
                e.sort(), t.sort();
                for (var r = 0, n = e.length; r < n; r++)
                    if (e[r] !== t[r]) return !1;
                return !0;
            }
            function f(e) {
                return e.replace(/^\/+|\/+$/g, "");
            }
            function m(e) {
                return escape(e);
            }
            function g(e) {
                return encodeURIComponent(e)
                    .replace(/[!'()*]/g, m)
                    .replace(/\*/g, "%2A");
            }
            (i._parts = function () {
                return {
                    protocol: null,
                    username: null,
                    password: null,
                    hostname: null,
                    urn: null,
                    port: null,
                    path: null,
                    query: null,
                    fragment: null,
                    preventInvalidHostname: i.preventInvalidHostname,
                    duplicateQueryParameters: i.duplicateQueryParameters,
                    escapeQuerySpace: i.escapeQuerySpace,
                };
            }),
                (i.preventInvalidHostname = !1),
                (i.duplicateQueryParameters = !1),
                (i.escapeQuerySpace = !0),
                (i.protocol_expression = /^[a-z][a-z0-9.+-]*$/i),
                (i.idn_expression = /[^a-z0-9\._-]/i),
                (i.punycode_expression = /(xn--)/i),
                (i.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/),
                (i.ip6_expression =
                    /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/),
                (i.find_uri_expression =
                    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi),
                (i.findUri = {
                    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
                    end: /[\s\r\n]|$/,
                    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
                    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
                }),
                (i.defaultPorts = {
                    http: "80",
                    https: "443",
                    ftp: "21",
                    gopher: "70",
                    ws: "80",
                    wss: "443",
                }),
                (i.hostProtocols = ["http", "https"]),
                (i.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/),
                (i.domAttributes = {
                    a: "href",
                    blockquote: "cite",
                    link: "href",
                    base: "href",
                    script: "src",
                    form: "action",
                    img: "src",
                    area: "href",
                    iframe: "src",
                    embed: "src",
                    source: "src",
                    track: "src",
                    input: "src",
                    audio: "src",
                    video: "src",
                }),
                (i.getDomAttribute = function (e) {
                    if (e && e.nodeName) {
                        var t = e.nodeName.toLowerCase();
                        if ("input" !== t || "image" === e.type)
                            return i.domAttributes[t];
                    }
                }),
                (i.encode = g),
                (i.decode = decodeURIComponent),
                (i.iso8859 = function () {
                    (i.encode = escape), (i.decode = unescape);
                }),
                (i.unicode = function () {
                    (i.encode = g), (i.decode = decodeURIComponent);
                }),
                (i.characters = {
                    pathname: {
                        encode: {
                            expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
                            map: {
                                "%24": "$",
                                "%26": "&",
                                "%2B": "+",
                                "%2C": ",",
                                "%3B": ";",
                                "%3D": "=",
                                "%3A": ":",
                                "%40": "@",
                            },
                        },
                        decode: {
                            expression: /[\/\?#]/g,
                            map: { "/": "%2F", "?": "%3F", "#": "%23" },
                        },
                    },
                    reserved: {
                        encode: {
                            expression:
                                /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
                            map: {
                                "%3A": ":",
                                "%2F": "/",
                                "%3F": "?",
                                "%23": "#",
                                "%5B": "[",
                                "%5D": "]",
                                "%40": "@",
                                "%21": "!",
                                "%24": "$",
                                "%26": "&",
                                "%27": "'",
                                "%28": "(",
                                "%29": ")",
                                "%2A": "*",
                                "%2B": "+",
                                "%2C": ",",
                                "%3B": ";",
                                "%3D": "=",
                            },
                        },
                    },
                    urnpath: {
                        encode: {
                            expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/gi,
                            map: {
                                "%21": "!",
                                "%24": "$",
                                "%27": "'",
                                "%28": "(",
                                "%29": ")",
                                "%2A": "*",
                                "%2B": "+",
                                "%2C": ",",
                                "%3B": ";",
                                "%3D": "=",
                                "%40": "@",
                            },
                        },
                        decode: {
                            expression: /[\/\?#:]/g,
                            map: {
                                "/": "%2F",
                                "?": "%3F",
                                "#": "%23",
                                ":": "%3A",
                            },
                        },
                    },
                }),
                (i.encodeQuery = function (e, t) {
                    var r = i.encode(e + "");
                    return (
                        void 0 === t && (t = i.escapeQuerySpace),
                        t ? r.replace(/%20/g, "+") : r
                    );
                }),
                (i.decodeQuery = function (e, t) {
                    (e += ""), void 0 === t && (t = i.escapeQuerySpace);
                    try {
                        return i.decode(t ? e.replace(/\+/g, "%20") : e);
                    } catch (t) {
                        return e;
                    }
                });
            var v,
                y = { encode: "encode", decode: "decode" },
                b = function (e, t) {
                    return function (r) {
                        try {
                            return i[t](r + "").replace(
                                i.characters[e][t].expression,
                                function (r) {
                                    return i.characters[e][t].map[r];
                                }
                            );
                        } catch (e) {
                            return r;
                        }
                    };
                };
            for (v in y)
                (i[v + "PathSegment"] = b("pathname", y[v])),
                    (i[v + "UrnPathSegment"] = b("urnpath", y[v]));
            var _ = function (e, t, r) {
                return function (n) {
                    var o;
                    o = r
                        ? function (e) {
                              return i[t](i[r](e));
                          }
                        : i[t];
                    for (
                        var a = (n + "").split(e), s = 0, u = a.length;
                        s < u;
                        s++
                    )
                        a[s] = o(a[s]);
                    return a.join(e);
                };
            };
            function w(e) {
                return function (t, r) {
                    return void 0 === t
                        ? this._parts[e] || ""
                        : ((this._parts[e] = t || null), this.build(!r), this);
                };
            }
            function k(e, t) {
                return function (r, n) {
                    return void 0 === r
                        ? this._parts[e] || ""
                        : (null !== r &&
                              (r += "").charAt(0) === t &&
                              (r = r.substring(1)),
                          (this._parts[e] = r),
                          this.build(!n),
                          this);
                };
            }
            (i.decodePath = _("/", "decodePathSegment")),
                (i.decodeUrnPath = _(":", "decodeUrnPathSegment")),
                (i.recodePath = _("/", "encodePathSegment", "decode")),
                (i.recodeUrnPath = _(":", "encodeUrnPathSegment", "decode")),
                (i.encodeReserved = b("reserved", "encode")),
                (i.parse = function (e, t) {
                    var r;
                    return (
                        t ||
                            (t = {
                                preventInvalidHostname:
                                    i.preventInvalidHostname,
                            }),
                        (r = e.indexOf("#")) > -1 &&
                            ((t.fragment = e.substring(r + 1) || null),
                            (e = e.substring(0, r))),
                        (r = e.indexOf("?")) > -1 &&
                            ((t.query = e.substring(r + 1) || null),
                            (e = e.substring(0, r))),
                        "//" === e.substring(0, 2)
                            ? ((t.protocol = null),
                              (e = e.substring(2)),
                              (e = i.parseAuthority(e, t)))
                            : (r = e.indexOf(":")) > -1 &&
                              ((t.protocol = e.substring(0, r) || null),
                              t.protocol &&
                              !t.protocol.match(i.protocol_expression)
                                  ? (t.protocol = void 0)
                                  : "//" === e.substring(r + 1, r + 3)
                                  ? ((e = e.substring(r + 3)),
                                    (e = i.parseAuthority(e, t)))
                                  : ((e = e.substring(r + 1)), (t.urn = !0))),
                        (t.path = e),
                        t
                    );
                }),
                (i.parseHost = function (e, t) {
                    e || (e = "");
                    var r,
                        n,
                        o = (e = e.replace(/\\/g, "/")).indexOf("/");
                    if ((-1 === o && (o = e.length), "[" === e.charAt(0)))
                        (r = e.indexOf("]")),
                            (t.hostname = e.substring(1, r) || null),
                            (t.port = e.substring(r + 2, o) || null),
                            "/" === t.port && (t.port = null);
                    else {
                        var a = e.indexOf(":"),
                            s = e.indexOf("/"),
                            u = e.indexOf(":", a + 1);
                        -1 !== u && (-1 === s || u < s)
                            ? ((t.hostname = e.substring(0, o) || null),
                              (t.port = null))
                            : ((n = e.substring(0, o).split(":")),
                              (t.hostname = n[0] || null),
                              (t.port = n[1] || null));
                    }
                    return (
                        t.hostname &&
                            "/" !== e.substring(o).charAt(0) &&
                            (o++, (e = "/" + e)),
                        t.preventInvalidHostname &&
                            i.ensureValidHostname(t.hostname, t.protocol),
                        t.port && i.ensureValidPort(t.port),
                        e.substring(o) || "/"
                    );
                }),
                (i.parseAuthority = function (e, t) {
                    return (e = i.parseUserinfo(e, t)), i.parseHost(e, t);
                }),
                (i.parseUserinfo = function (e, t) {
                    var r,
                        n = e.indexOf("/"),
                        o = e.lastIndexOf("@", n > -1 ? n : e.length - 1);
                    return (
                        o > -1 && (-1 === n || o < n)
                            ? ((r = e.substring(0, o).split(":")),
                              (t.username = r[0] ? i.decode(r[0]) : null),
                              r.shift(),
                              (t.password = r[0]
                                  ? i.decode(r.join(":"))
                                  : null),
                              (e = e.substring(o + 1)))
                            : ((t.username = null), (t.password = null)),
                        e
                    );
                }),
                (i.parseQuery = function (e, t) {
                    if (!e) return {};
                    if (!(e = e.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, "")))
                        return {};
                    for (
                        var r,
                            n,
                            o,
                            a = {},
                            u = e.split("&"),
                            c = u.length,
                            l = 0;
                        l < c;
                        l++
                    )
                        (r = u[l].split("=")),
                            (n = i.decodeQuery(r.shift(), t)),
                            (o = r.length
                                ? i.decodeQuery(r.join("="), t)
                                : null),
                            s.call(a, n)
                                ? (("string" != typeof a[n] && null !== a[n]) ||
                                      (a[n] = [a[n]]),
                                  a[n].push(o))
                                : (a[n] = o);
                    return a;
                }),
                (i.build = function (e) {
                    var t = "",
                        r = !1;
                    return (
                        e.protocol && (t += e.protocol + ":"),
                        e.urn || (!t && !e.hostname) || ((t += "//"), (r = !0)),
                        (t += i.buildAuthority(e) || ""),
                        "string" == typeof e.path &&
                            ("/" !== e.path.charAt(0) && r && (t += "/"),
                            (t += e.path)),
                        "string" == typeof e.query &&
                            e.query &&
                            (t += "?" + e.query),
                        "string" == typeof e.fragment &&
                            e.fragment &&
                            (t += "#" + e.fragment),
                        t
                    );
                }),
                (i.buildHost = function (e) {
                    var t = "";
                    return e.hostname
                        ? (i.ip6_expression.test(e.hostname)
                              ? (t += "[" + e.hostname + "]")
                              : (t += e.hostname),
                          e.port && (t += ":" + e.port),
                          t)
                        : "";
                }),
                (i.buildAuthority = function (e) {
                    return i.buildUserinfo(e) + i.buildHost(e);
                }),
                (i.buildUserinfo = function (e) {
                    var t = "";
                    return (
                        e.username && (t += i.encode(e.username)),
                        e.password && (t += ":" + i.encode(e.password)),
                        t && (t += "@"),
                        t
                    );
                }),
                (i.buildQuery = function (e, t, r) {
                    var n,
                        o,
                        a,
                        u,
                        c = "";
                    for (o in e)
                        if (s.call(e, o))
                            if (l(e[o]))
                                for (n = {}, a = 0, u = e[o].length; a < u; a++)
                                    void 0 !== e[o][a] &&
                                        void 0 === n[e[o][a] + ""] &&
                                        ((c +=
                                            "&" +
                                            i.buildQueryParameter(
                                                o,
                                                e[o][a],
                                                r
                                            )),
                                        !0 !== t && (n[e[o][a] + ""] = !0));
                            else
                                void 0 !== e[o] &&
                                    (c +=
                                        "&" +
                                        i.buildQueryParameter(o, e[o], r));
                    return c.substring(1);
                }),
                (i.buildQueryParameter = function (e, t, r) {
                    return (
                        i.encodeQuery(e, r) +
                        (null !== t ? "=" + i.encodeQuery(t, r) : "")
                    );
                }),
                (i.addQuery = function (e, t, r) {
                    if ("object" == typeof t)
                        for (var n in t) s.call(t, n) && i.addQuery(e, n, t[n]);
                    else {
                        if ("string" != typeof t)
                            throw new TypeError(
                                "URI.addQuery() accepts an object, string as the name parameter"
                            );
                        if (void 0 === e[t]) return void (e[t] = r);
                        "string" == typeof e[t] && (e[t] = [e[t]]),
                            l(r) || (r = [r]),
                            (e[t] = (e[t] || []).concat(r));
                    }
                }),
                (i.setQuery = function (e, t, r) {
                    if ("object" == typeof t)
                        for (var n in t) s.call(t, n) && i.setQuery(e, n, t[n]);
                    else {
                        if ("string" != typeof t)
                            throw new TypeError(
                                "URI.setQuery() accepts an object, string as the name parameter"
                            );
                        e[t] = void 0 === r ? null : r;
                    }
                }),
                (i.removeQuery = function (e, t, r) {
                    var n, o, a;
                    if (l(t))
                        for (n = 0, o = t.length; n < o; n++) e[t[n]] = void 0;
                    else if ("RegExp" === c(t))
                        for (a in e) t.test(a) && (e[a] = void 0);
                    else if ("object" == typeof t)
                        for (a in t) s.call(t, a) && i.removeQuery(e, a, t[a]);
                    else {
                        if ("string" != typeof t)
                            throw new TypeError(
                                "URI.removeQuery() accepts an object, string, RegExp as the first parameter"
                            );
                        void 0 !== r
                            ? "RegExp" === c(r)
                                ? !l(e[t]) && r.test(e[t])
                                    ? (e[t] = void 0)
                                    : (e[t] = p(e[t], r))
                                : e[t] !== String(r) || (l(r) && 1 !== r.length)
                                ? l(e[t]) && (e[t] = p(e[t], r))
                                : (e[t] = void 0)
                            : (e[t] = void 0);
                    }
                }),
                (i.hasQuery = function (e, t, r, n) {
                    switch (c(t)) {
                        case "String":
                            break;
                        case "RegExp":
                            for (var o in e)
                                if (
                                    s.call(e, o) &&
                                    t.test(o) &&
                                    (void 0 === r || i.hasQuery(e, o, r))
                                )
                                    return !0;
                            return !1;
                        case "Object":
                            for (var a in t)
                                if (s.call(t, a) && !i.hasQuery(e, a, t[a]))
                                    return !1;
                            return !0;
                        default:
                            throw new TypeError(
                                "URI.hasQuery() accepts a string, regular expression or object as the name parameter"
                            );
                    }
                    switch (c(r)) {
                        case "Undefined":
                            return t in e;
                        case "Boolean":
                            return r === Boolean(l(e[t]) ? e[t].length : e[t]);
                        case "Function":
                            return !!r(e[t], t, e);
                        case "Array":
                            return !!l(e[t]) && (n ? h : d)(e[t], r);
                        case "RegExp":
                            return l(e[t])
                                ? !!n && h(e[t], r)
                                : Boolean(e[t] && e[t].match(r));
                        case "Number":
                            r = String(r);
                        case "String":
                            return l(e[t]) ? !!n && h(e[t], r) : e[t] === r;
                        default:
                            throw new TypeError(
                                "URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter"
                            );
                    }
                }),
                (i.joinPaths = function () {
                    for (
                        var e = [], t = [], r = 0, n = 0;
                        n < arguments.length;
                        n++
                    ) {
                        var o = new i(arguments[n]);
                        e.push(o);
                        for (var a = o.segment(), s = 0; s < a.length; s++)
                            "string" == typeof a[s] && t.push(a[s]),
                                a[s] && r++;
                    }
                    if (!t.length || !r) return new i("");
                    var u = new i("").segment(t);
                    return (
                        ("" !== e[0].path() &&
                            "/" !== e[0].path().slice(0, 1)) ||
                            u.path("/" + u.path()),
                        u.normalize()
                    );
                }),
                (i.commonPath = function (e, t) {
                    var r,
                        n = Math.min(e.length, t.length);
                    for (r = 0; r < n; r++)
                        if (e.charAt(r) !== t.charAt(r)) {
                            r--;
                            break;
                        }
                    return r < 1
                        ? e.charAt(0) === t.charAt(0) && "/" === e.charAt(0)
                            ? "/"
                            : ""
                        : (("/" === e.charAt(r) && "/" === t.charAt(r)) ||
                              (r = e.substring(0, r).lastIndexOf("/")),
                          e.substring(0, r + 1));
                }),
                (i.withinString = function (e, t, r) {
                    r || (r = {});
                    var n = r.start || i.findUri.start,
                        o = r.end || i.findUri.end,
                        a = r.trim || i.findUri.trim,
                        s = r.parens || i.findUri.parens,
                        u = /[a-z0-9-]=["']?$/i;
                    for (n.lastIndex = 0; ; ) {
                        var c = n.exec(e);
                        if (!c) break;
                        var l = c.index;
                        if (r.ignoreHtml) {
                            var p = e.slice(Math.max(l - 3, 0), l);
                            if (p && u.test(p)) continue;
                        }
                        for (
                            var h = l + e.slice(l).search(o),
                                d = e.slice(l, h),
                                f = -1;
                            ;

                        ) {
                            var m = s.exec(d);
                            if (!m) break;
                            var g = m.index + m[0].length;
                            f = Math.max(f, g);
                        }
                        if (
                            !(
                                (d =
                                    f > -1
                                        ? d.slice(0, f) +
                                          d.slice(f).replace(a, "")
                                        : d.replace(a, "")).length <=
                                    c[0].length ||
                                (r.ignore && r.ignore.test(d))
                            )
                        ) {
                            var v = t(d, l, (h = l + d.length), e);
                            void 0 !== v
                                ? ((v = String(v)),
                                  (e = e.slice(0, l) + v + e.slice(h)),
                                  (n.lastIndex = l + v.length))
                                : (n.lastIndex = h);
                        }
                    }
                    return (n.lastIndex = 0), e;
                }),
                (i.ensureValidHostname = function (t, r) {
                    var n = !!t,
                        o = !1;
                    if ((!!r && (o = h(i.hostProtocols, r)), o && !n))
                        throw new TypeError(
                            "Hostname cannot be empty, if protocol is " + r
                        );
                    if (t && t.match(i.invalid_hostname_characters)) {
                        if (!e)
                            throw new TypeError(
                                'Hostname "' +
                                    t +
                                    '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available'
                            );
                        if (e.toASCII(t).match(i.invalid_hostname_characters))
                            throw new TypeError(
                                'Hostname "' +
                                    t +
                                    '" contains characters other than [A-Z0-9.-:_]'
                            );
                    }
                }),
                (i.ensureValidPort = function (e) {
                    if (e) {
                        var t = Number(e);
                        if (!(/^[0-9]+$/.test(t) && t > 0 && t < 65536))
                            throw new TypeError(
                                'Port "' + e + '" is not a valid port'
                            );
                    }
                }),
                (i.noConflict = function (e) {
                    if (e) {
                        var t = { URI: this.noConflict() };
                        return (
                            n.URITemplate &&
                                "function" == typeof n.URITemplate.noConflict &&
                                (t.URITemplate = n.URITemplate.noConflict()),
                            n.IPv6 &&
                                "function" == typeof n.IPv6.noConflict &&
                                (t.IPv6 = n.IPv6.noConflict()),
                            n.SecondLevelDomains &&
                                "function" ==
                                    typeof n.SecondLevelDomains.noConflict &&
                                (t.SecondLevelDomains =
                                    n.SecondLevelDomains.noConflict()),
                            t
                        );
                    }
                    return n.URI === this && (n.URI = o), this;
                }),
                (a.build = function (e) {
                    return (
                        !0 === e
                            ? (this._deferred_build = !0)
                            : (void 0 === e || this._deferred_build) &&
                              ((this._string = i.build(this._parts)),
                              (this._deferred_build = !1)),
                        this
                    );
                }),
                (a.clone = function () {
                    return new i(this);
                }),
                (a.valueOf = a.toString =
                    function () {
                        return this.build(!1)._string;
                    }),
                (a.protocol = w("protocol")),
                (a.username = w("username")),
                (a.password = w("password")),
                (a.hostname = w("hostname")),
                (a.port = w("port")),
                (a.query = k("query", "?")),
                (a.fragment = k("fragment", "#")),
                (a.search = function (e, t) {
                    var r = this.query(e, t);
                    return "string" == typeof r && r.length ? "?" + r : r;
                }),
                (a.hash = function (e, t) {
                    var r = this.fragment(e, t);
                    return "string" == typeof r && r.length ? "#" + r : r;
                }),
                (a.pathname = function (e, t) {
                    if (void 0 === e || !0 === e) {
                        var r =
                            this._parts.path ||
                            (this._parts.hostname ? "/" : "");
                        return e
                            ? (this._parts.urn
                                  ? i.decodeUrnPath
                                  : i.decodePath)(r)
                            : r;
                    }
                    return (
                        this._parts.urn
                            ? (this._parts.path = e ? i.recodeUrnPath(e) : "")
                            : (this._parts.path = e ? i.recodePath(e) : "/"),
                        this.build(!t),
                        this
                    );
                }),
                (a.path = a.pathname),
                (a.href = function (e, t) {
                    var r;
                    if (void 0 === e) return this.toString();
                    (this._string = ""), (this._parts = i._parts());
                    var n = e instanceof i,
                        o =
                            "object" == typeof e &&
                            (e.hostname || e.path || e.pathname);
                    e.nodeName &&
                        ((e = e[i.getDomAttribute(e)] || ""), (o = !1));
                    if (
                        (!n && o && void 0 !== e.pathname && (e = e.toString()),
                        "string" == typeof e || e instanceof String)
                    )
                        this._parts = i.parse(String(e), this._parts);
                    else {
                        if (!n && !o) throw new TypeError("invalid input");
                        var a = n ? e._parts : e;
                        for (r in a)
                            "query" !== r &&
                                s.call(this._parts, r) &&
                                (this._parts[r] = a[r]);
                        a.query && this.query(a.query, !1);
                    }
                    return this.build(!t), this;
                }),
                (a.is = function (e) {
                    var t = !1,
                        n = !1,
                        o = !1,
                        a = !1,
                        s = !1,
                        u = !1,
                        c = !1,
                        l = !this._parts.urn;
                    switch (
                        (this._parts.hostname &&
                            ((l = !1),
                            (n = i.ip4_expression.test(this._parts.hostname)),
                            (o = i.ip6_expression.test(this._parts.hostname)),
                            (s =
                                (a = !(t = n || o)) &&
                                r &&
                                r.has(this._parts.hostname)),
                            (u =
                                a &&
                                i.idn_expression.test(this._parts.hostname)),
                            (c =
                                a &&
                                i.punycode_expression.test(
                                    this._parts.hostname
                                ))),
                        e.toLowerCase())
                    ) {
                        case "relative":
                            return l;
                        case "absolute":
                            return !l;
                        case "domain":
                        case "name":
                            return a;
                        case "sld":
                            return s;
                        case "ip":
                            return t;
                        case "ip4":
                        case "ipv4":
                        case "inet4":
                            return n;
                        case "ip6":
                        case "ipv6":
                        case "inet6":
                            return o;
                        case "idn":
                            return u;
                        case "url":
                            return !this._parts.urn;
                        case "urn":
                            return !!this._parts.urn;
                        case "punycode":
                            return c;
                    }
                    return null;
                });
            var x = a.protocol,
                Q = a.port,
                S = a.hostname;
            (a.protocol = function (e, t) {
                if (
                    e &&
                    !(e = e.replace(/:(\/\/)?$/, "")).match(
                        i.protocol_expression
                    )
                )
                    throw new TypeError(
                        'Protocol "' +
                            e +
                            "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]"
                    );
                return x.call(this, e, t);
            }),
                (a.scheme = a.protocol),
                (a.port = function (e, t) {
                    return this._parts.urn
                        ? void 0 === e
                            ? ""
                            : this
                        : (void 0 !== e &&
                              (0 === e && (e = null),
                              e &&
                                  (":" === (e += "").charAt(0) &&
                                      (e = e.substring(1)),
                                  i.ensureValidPort(e))),
                          Q.call(this, e, t));
                }),
                (a.hostname = function (e, t) {
                    if (this._parts.urn) return void 0 === e ? "" : this;
                    if (void 0 !== e) {
                        var r = {
                            preventInvalidHostname:
                                this._parts.preventInvalidHostname,
                        };
                        if ("/" !== i.parseHost(e, r))
                            throw new TypeError(
                                'Hostname "' +
                                    e +
                                    '" contains characters other than [A-Z0-9.-]'
                            );
                        (e = r.hostname),
                            this._parts.preventInvalidHostname &&
                                i.ensureValidHostname(e, this._parts.protocol);
                    }
                    return S.call(this, e, t);
                }),
                (a.origin = function (e, t) {
                    if (this._parts.urn) return void 0 === e ? "" : this;
                    if (void 0 === e) {
                        var r = this.protocol();
                        return this.authority()
                            ? (r ? r + "://" : "") + this.authority()
                            : "";
                    }
                    var n = i(e);
                    return (
                        this.protocol(n.protocol())
                            .authority(n.authority())
                            .build(!t),
                        this
                    );
                }),
                (a.host = function (e, t) {
                    if (this._parts.urn) return void 0 === e ? "" : this;
                    if (void 0 === e)
                        return this._parts.hostname
                            ? i.buildHost(this._parts)
                            : "";
                    if ("/" !== i.parseHost(e, this._parts))
                        throw new TypeError(
                            'Hostname "' +
                                e +
                                '" contains characters other than [A-Z0-9.-]'
                        );
                    return this.build(!t), this;
                }),
                (a.authority = function (e, t) {
                    if (this._parts.urn) return void 0 === e ? "" : this;
                    if (void 0 === e)
                        return this._parts.hostname
                            ? i.buildAuthority(this._parts)
                            : "";
                    if ("/" !== i.parseAuthority(e, this._parts))
                        throw new TypeError(
                            'Hostname "' +
                                e +
                                '" contains characters other than [A-Z0-9.-]'
                        );
                    return this.build(!t), this;
                }),
                (a.userinfo = function (e, t) {
                    if (this._parts.urn) return void 0 === e ? "" : this;
                    if (void 0 === e) {
                        var r = i.buildUserinfo(this._parts);
                        return r ? r.substring(0, r.length - 1) : r;
                    }
                    return (
                        "@" !== e[e.length - 1] && (e += "@"),
                        i.parseUserinfo(e, this._parts),
                        this.build(!t),
                        this
                    );
                }),
                (a.resource = function (e, t) {
                    var r;
                    return void 0 === e
                        ? this.path() + this.search() + this.hash()
                        : ((r = i.parse(e)),
                          (this._parts.path = r.path),
                          (this._parts.query = r.query),
                          (this._parts.fragment = r.fragment),
                          this.build(!t),
                          this);
                }),
                (a.subdomain = function (e, t) {
                    if (this._parts.urn) return void 0 === e ? "" : this;
                    if (void 0 === e) {
                        if (!this._parts.hostname || this.is("IP")) return "";
                        var r =
                            this._parts.hostname.length -
                            this.domain().length -
                            1;
                        return this._parts.hostname.substring(0, r) || "";
                    }
                    var n = this._parts.hostname.length - this.domain().length,
                        o = this._parts.hostname.substring(0, n),
                        a = new RegExp("^" + u(o));
                    if (
                        (e && "." !== e.charAt(e.length - 1) && (e += "."),
                        -1 !== e.indexOf(":"))
                    )
                        throw new TypeError("Domains cannot contain colons");
                    return (
                        e && i.ensureValidHostname(e, this._parts.protocol),
                        (this._parts.hostname = this._parts.hostname.replace(
                            a,
                            e
                        )),
                        this.build(!t),
                        this
                    );
                }),
                (a.domain = function (e, t) {
                    if (this._parts.urn) return void 0 === e ? "" : this;
                    if (
                        ("boolean" == typeof e && ((t = e), (e = void 0)),
                        void 0 === e)
                    ) {
                        if (!this._parts.hostname || this.is("IP")) return "";
                        var r = this._parts.hostname.match(/\./g);
                        if (r && r.length < 2) return this._parts.hostname;
                        var n =
                            this._parts.hostname.length -
                            this.tld(t).length -
                            1;
                        return (
                            (n =
                                this._parts.hostname.lastIndexOf(".", n - 1) +
                                1),
                            this._parts.hostname.substring(n) || ""
                        );
                    }
                    if (!e) throw new TypeError("cannot set domain empty");
                    if (-1 !== e.indexOf(":"))
                        throw new TypeError("Domains cannot contain colons");
                    if (
                        (i.ensureValidHostname(e, this._parts.protocol),
                        !this._parts.hostname || this.is("IP"))
                    )
                        this._parts.hostname = e;
                    else {
                        var o = new RegExp(u(this.domain()) + "$");
                        this._parts.hostname = this._parts.hostname.replace(
                            o,
                            e
                        );
                    }
                    return this.build(!t), this;
                }),
                (a.tld = function (e, t) {
                    if (this._parts.urn) return void 0 === e ? "" : this;
                    if (
                        ("boolean" == typeof e && ((t = e), (e = void 0)),
                        void 0 === e)
                    ) {
                        if (!this._parts.hostname || this.is("IP")) return "";
                        var n = this._parts.hostname.lastIndexOf("."),
                            o = this._parts.hostname.substring(n + 1);
                        return (
                            (!0 !== t &&
                                r &&
                                r.list[o.toLowerCase()] &&
                                r.get(this._parts.hostname)) ||
                            o
                        );
                    }
                    var i;
                    if (!e) throw new TypeError("cannot set TLD empty");
                    if (e.match(/[^a-zA-Z0-9-]/)) {
                        if (!r || !r.is(e))
                            throw new TypeError(
                                'TLD "' +
                                    e +
                                    '" contains characters other than [A-Z0-9]'
                            );
                        (i = new RegExp(u(this.tld()) + "$")),
                            (this._parts.hostname =
                                this._parts.hostname.replace(i, e));
                    } else {
                        if (!this._parts.hostname || this.is("IP"))
                            throw new ReferenceError(
                                "cannot set TLD on non-domain host"
                            );
                        (i = new RegExp(u(this.tld()) + "$")),
                            (this._parts.hostname =
                                this._parts.hostname.replace(i, e));
                    }
                    return this.build(!t), this;
                }),
                (a.directory = function (e, t) {
                    if (this._parts.urn) return void 0 === e ? "" : this;
                    if (void 0 === e || !0 === e) {
                        if (!this._parts.path && !this._parts.hostname)
                            return "";
                        if ("/" === this._parts.path) return "/";
                        var r =
                                this._parts.path.length -
                                this.filename().length -
                                1,
                            n =
                                this._parts.path.substring(0, r) ||
                                (this._parts.hostname ? "/" : "");
                        return e ? i.decodePath(n) : n;
                    }
                    var o = this._parts.path.length - this.filename().length,
                        a = this._parts.path.substring(0, o),
                        s = new RegExp("^" + u(a));
                    return (
                        this.is("relative") ||
                            (e || (e = "/"),
                            "/" !== e.charAt(0) && (e = "/" + e)),
                        e && "/" !== e.charAt(e.length - 1) && (e += "/"),
                        (e = i.recodePath(e)),
                        (this._parts.path = this._parts.path.replace(s, e)),
                        this.build(!t),
                        this
                    );
                }),
                (a.filename = function (e, t) {
                    if (this._parts.urn) return void 0 === e ? "" : this;
                    if ("string" != typeof e) {
                        if (!this._parts.path || "/" === this._parts.path)
                            return "";
                        var r = this._parts.path.lastIndexOf("/"),
                            n = this._parts.path.substring(r + 1);
                        return e ? i.decodePathSegment(n) : n;
                    }
                    var o = !1;
                    "/" === e.charAt(0) && (e = e.substring(1)),
                        e.match(/\.?\//) && (o = !0);
                    var a = new RegExp(u(this.filename()) + "$");
                    return (
                        (e = i.recodePath(e)),
                        (this._parts.path = this._parts.path.replace(a, e)),
                        o ? this.normalizePath(t) : this.build(!t),
                        this
                    );
                }),
                (a.suffix = function (e, t) {
                    if (this._parts.urn) return void 0 === e ? "" : this;
                    if (void 0 === e || !0 === e) {
                        if (!this._parts.path || "/" === this._parts.path)
                            return "";
                        var r,
                            n,
                            o = this.filename(),
                            a = o.lastIndexOf(".");
                        return -1 === a
                            ? ""
                            : ((r = o.substring(a + 1)),
                              (n = /^[a-z0-9%]+$/i.test(r) ? r : ""),
                              e ? i.decodePathSegment(n) : n);
                    }
                    "." === e.charAt(0) && (e = e.substring(1));
                    var s,
                        c = this.suffix();
                    if (c)
                        s = e
                            ? new RegExp(u(c) + "$")
                            : new RegExp(u("." + c) + "$");
                    else {
                        if (!e) return this;
                        this._parts.path += "." + i.recodePath(e);
                    }
                    return (
                        s &&
                            ((e = i.recodePath(e)),
                            (this._parts.path = this._parts.path.replace(
                                s,
                                e
                            ))),
                        this.build(!t),
                        this
                    );
                }),
                (a.segment = function (e, t, r) {
                    var n = this._parts.urn ? ":" : "/",
                        o = this.path(),
                        i = "/" === o.substring(0, 1),
                        a = o.split(n);
                    if (
                        (void 0 !== e &&
                            "number" != typeof e &&
                            ((r = t), (t = e), (e = void 0)),
                        void 0 !== e && "number" != typeof e)
                    )
                        throw new Error(
                            'Bad segment "' + e + '", must be 0-based integer'
                        );
                    if (
                        (i && a.shift(),
                        e < 0 && (e = Math.max(a.length + e, 0)),
                        void 0 === t)
                    )
                        return void 0 === e ? a : a[e];
                    if (null === e || void 0 === a[e])
                        if (l(t)) {
                            a = [];
                            for (var s = 0, u = t.length; s < u; s++)
                                (t[s].length ||
                                    (a.length && a[a.length - 1].length)) &&
                                    (a.length &&
                                        !a[a.length - 1].length &&
                                        a.pop(),
                                    a.push(f(t[s])));
                        } else
                            (t || "string" == typeof t) &&
                                ((t = f(t)),
                                "" === a[a.length - 1]
                                    ? (a[a.length - 1] = t)
                                    : a.push(t));
                    else t ? (a[e] = f(t)) : a.splice(e, 1);
                    return i && a.unshift(""), this.path(a.join(n), r);
                }),
                (a.segmentCoded = function (e, t, r) {
                    var n, o, a;
                    if (
                        ("number" != typeof e &&
                            ((r = t), (t = e), (e = void 0)),
                        void 0 === t)
                    ) {
                        if (l((n = this.segment(e, t, r))))
                            for (o = 0, a = n.length; o < a; o++)
                                n[o] = i.decode(n[o]);
                        else n = void 0 !== n ? i.decode(n) : void 0;
                        return n;
                    }
                    if (l(t))
                        for (o = 0, a = t.length; o < a; o++)
                            t[o] = i.encode(t[o]);
                    else
                        t =
                            "string" == typeof t || t instanceof String
                                ? i.encode(t)
                                : t;
                    return this.segment(e, t, r);
                });
            var z = a.query;
            return (
                (a.query = function (e, t) {
                    if (!0 === e)
                        return i.parseQuery(
                            this._parts.query,
                            this._parts.escapeQuerySpace
                        );
                    if ("function" == typeof e) {
                        var r = i.parseQuery(
                                this._parts.query,
                                this._parts.escapeQuerySpace
                            ),
                            n = e.call(this, r);
                        return (
                            (this._parts.query = i.buildQuery(
                                n || r,
                                this._parts.duplicateQueryParameters,
                                this._parts.escapeQuerySpace
                            )),
                            this.build(!t),
                            this
                        );
                    }
                    return void 0 !== e && "string" != typeof e
                        ? ((this._parts.query = i.buildQuery(
                              e,
                              this._parts.duplicateQueryParameters,
                              this._parts.escapeQuerySpace
                          )),
                          this.build(!t),
                          this)
                        : z.call(this, e, t);
                }),
                (a.setQuery = function (e, t, r) {
                    var n = i.parseQuery(
                        this._parts.query,
                        this._parts.escapeQuerySpace
                    );
                    if ("string" == typeof e || e instanceof String)
                        n[e] = void 0 !== t ? t : null;
                    else {
                        if ("object" != typeof e)
                            throw new TypeError(
                                "URI.addQuery() accepts an object, string as the name parameter"
                            );
                        for (var o in e) s.call(e, o) && (n[o] = e[o]);
                    }
                    return (
                        (this._parts.query = i.buildQuery(
                            n,
                            this._parts.duplicateQueryParameters,
                            this._parts.escapeQuerySpace
                        )),
                        "string" != typeof e && (r = t),
                        this.build(!r),
                        this
                    );
                }),
                (a.addQuery = function (e, t, r) {
                    var n = i.parseQuery(
                        this._parts.query,
                        this._parts.escapeQuerySpace
                    );
                    return (
                        i.addQuery(n, e, void 0 === t ? null : t),
                        (this._parts.query = i.buildQuery(
                            n,
                            this._parts.duplicateQueryParameters,
                            this._parts.escapeQuerySpace
                        )),
                        "string" != typeof e && (r = t),
                        this.build(!r),
                        this
                    );
                }),
                (a.removeQuery = function (e, t, r) {
                    var n = i.parseQuery(
                        this._parts.query,
                        this._parts.escapeQuerySpace
                    );
                    return (
                        i.removeQuery(n, e, t),
                        (this._parts.query = i.buildQuery(
                            n,
                            this._parts.duplicateQueryParameters,
                            this._parts.escapeQuerySpace
                        )),
                        "string" != typeof e && (r = t),
                        this.build(!r),
                        this
                    );
                }),
                (a.hasQuery = function (e, t, r) {
                    var n = i.parseQuery(
                        this._parts.query,
                        this._parts.escapeQuerySpace
                    );
                    return i.hasQuery(n, e, t, r);
                }),
                (a.setSearch = a.setQuery),
                (a.addSearch = a.addQuery),
                (a.removeSearch = a.removeQuery),
                (a.hasSearch = a.hasQuery),
                (a.normalize = function () {
                    return this._parts.urn
                        ? this.normalizeProtocol(!1)
                              .normalizePath(!1)
                              .normalizeQuery(!1)
                              .normalizeFragment(!1)
                              .build()
                        : this.normalizeProtocol(!1)
                              .normalizeHostname(!1)
                              .normalizePort(!1)
                              .normalizePath(!1)
                              .normalizeQuery(!1)
                              .normalizeFragment(!1)
                              .build();
                }),
                (a.normalizeProtocol = function (e) {
                    return (
                        "string" == typeof this._parts.protocol &&
                            ((this._parts.protocol =
                                this._parts.protocol.toLowerCase()),
                            this.build(!e)),
                        this
                    );
                }),
                (a.normalizeHostname = function (r) {
                    return (
                        this._parts.hostname &&
                            (this.is("IDN") && e
                                ? (this._parts.hostname = e.toASCII(
                                      this._parts.hostname
                                  ))
                                : this.is("IPv6") &&
                                  t &&
                                  (this._parts.hostname = t.best(
                                      this._parts.hostname
                                  )),
                            (this._parts.hostname =
                                this._parts.hostname.toLowerCase()),
                            this.build(!r)),
                        this
                    );
                }),
                (a.normalizePort = function (e) {
                    return (
                        "string" == typeof this._parts.protocol &&
                            this._parts.port ===
                                i.defaultPorts[this._parts.protocol] &&
                            ((this._parts.port = null), this.build(!e)),
                        this
                    );
                }),
                (a.normalizePath = function (e) {
                    var t,
                        r = this._parts.path;
                    if (!r) return this;
                    if (this._parts.urn)
                        return (
                            (this._parts.path = i.recodeUrnPath(
                                this._parts.path
                            )),
                            this.build(!e),
                            this
                        );
                    if ("/" === this._parts.path) return this;
                    var n,
                        o,
                        a = "";
                    for (
                        "/" !== (r = i.recodePath(r)).charAt(0) &&
                            ((t = !0), (r = "/" + r)),
                            ("/.." !== r.slice(-3) && "/." !== r.slice(-2)) ||
                                (r += "/"),
                            r = r
                                .replace(/(\/(\.\/)+)|(\/\.$)/g, "/")
                                .replace(/\/{2,}/g, "/"),
                            t &&
                                (a =
                                    r.substring(1).match(/^(\.\.\/)+/) || "") &&
                                (a = a[0]);
                        -1 !== (n = r.search(/\/\.\.(\/|$)/));

                    )
                        0 !== n
                            ? (-1 ===
                                  (o = r.substring(0, n).lastIndexOf("/")) &&
                                  (o = n),
                              (r = r.substring(0, o) + r.substring(n + 3)))
                            : (r = r.substring(3));
                    return (
                        t && this.is("relative") && (r = a + r.substring(1)),
                        (this._parts.path = r),
                        this.build(!e),
                        this
                    );
                }),
                (a.normalizePathname = a.normalizePath),
                (a.normalizeQuery = function (e) {
                    return (
                        "string" == typeof this._parts.query &&
                            (this._parts.query.length
                                ? this.query(
                                      i.parseQuery(
                                          this._parts.query,
                                          this._parts.escapeQuerySpace
                                      )
                                  )
                                : (this._parts.query = null),
                            this.build(!e)),
                        this
                    );
                }),
                (a.normalizeFragment = function (e) {
                    return (
                        this._parts.fragment ||
                            ((this._parts.fragment = null), this.build(!e)),
                        this
                    );
                }),
                (a.normalizeSearch = a.normalizeQuery),
                (a.normalizeHash = a.normalizeFragment),
                (a.iso8859 = function () {
                    var e = i.encode,
                        t = i.decode;
                    (i.encode = escape), (i.decode = decodeURIComponent);
                    try {
                        this.normalize();
                    } finally {
                        (i.encode = e), (i.decode = t);
                    }
                    return this;
                }),
                (a.unicode = function () {
                    var e = i.encode,
                        t = i.decode;
                    (i.encode = g), (i.decode = unescape);
                    try {
                        this.normalize();
                    } finally {
                        (i.encode = e), (i.decode = t);
                    }
                    return this;
                }),
                (a.readable = function () {
                    var t = this.clone();
                    t.username("").password("").normalize();
                    var r = "";
                    if (
                        (t._parts.protocol && (r += t._parts.protocol + "://"),
                        t._parts.hostname &&
                            (t.is("punycode") && e
                                ? ((r += e.toUnicode(t._parts.hostname)),
                                  t._parts.port && (r += ":" + t._parts.port))
                                : (r += t.host())),
                        t._parts.hostname &&
                            t._parts.path &&
                            "/" !== t._parts.path.charAt(0) &&
                            (r += "/"),
                        (r += t.path(!0)),
                        t._parts.query)
                    ) {
                        for (
                            var n = "",
                                o = 0,
                                a = t._parts.query.split("&"),
                                s = a.length;
                            o < s;
                            o++
                        ) {
                            var u = (a[o] || "").split("=");
                            (n +=
                                "&" +
                                i
                                    .decodeQuery(
                                        u[0],
                                        this._parts.escapeQuerySpace
                                    )
                                    .replace(/&/g, "%26")),
                                void 0 !== u[1] &&
                                    (n +=
                                        "=" +
                                        i
                                            .decodeQuery(
                                                u[1],
                                                this._parts.escapeQuerySpace
                                            )
                                            .replace(/&/g, "%26"));
                        }
                        r += "?" + n.substring(1);
                    }
                    return (r += i.decodeQuery(t.hash(), !0));
                }),
                (a.absoluteTo = function (e) {
                    var t,
                        r,
                        n,
                        o = this.clone(),
                        a = [
                            "protocol",
                            "username",
                            "password",
                            "hostname",
                            "port",
                        ];
                    if (this._parts.urn)
                        throw new Error(
                            "URNs do not have any generally defined hierarchical components"
                        );
                    if ((e instanceof i || (e = new i(e)), o._parts.protocol))
                        return o;
                    if (
                        ((o._parts.protocol = e._parts.protocol),
                        this._parts.hostname)
                    )
                        return o;
                    for (r = 0; (n = a[r]); r++) o._parts[n] = e._parts[n];
                    return (
                        o._parts.path
                            ? (".." === o._parts.path.substring(-2) &&
                                  (o._parts.path += "/"),
                              "/" !== o.path().charAt(0) &&
                                  ((t =
                                      (t = e.directory()) ||
                                      (0 === e.path().indexOf("/") ? "/" : "")),
                                  (o._parts.path =
                                      (t ? t + "/" : "") + o._parts.path),
                                  o.normalizePath()))
                            : ((o._parts.path = e._parts.path),
                              o._parts.query ||
                                  (o._parts.query = e._parts.query)),
                        o.build(),
                        o
                    );
                }),
                (a.relativeTo = function (e) {
                    var t,
                        r,
                        n,
                        o,
                        a,
                        s = this.clone().normalize();
                    if (s._parts.urn)
                        throw new Error(
                            "URNs do not have any generally defined hierarchical components"
                        );
                    if (
                        ((e = new i(e).normalize()),
                        (t = s._parts),
                        (r = e._parts),
                        (o = s.path()),
                        (a = e.path()),
                        "/" !== o.charAt(0))
                    )
                        throw new Error("URI is already relative");
                    if ("/" !== a.charAt(0))
                        throw new Error(
                            "Cannot calculate a URI relative to another relative URI"
                        );
                    if (
                        (t.protocol === r.protocol && (t.protocol = null),
                        t.username !== r.username || t.password !== r.password)
                    )
                        return s.build();
                    if (
                        null !== t.protocol ||
                        null !== t.username ||
                        null !== t.password
                    )
                        return s.build();
                    if (t.hostname !== r.hostname || t.port !== r.port)
                        return s.build();
                    if (((t.hostname = null), (t.port = null), o === a))
                        return (t.path = ""), s.build();
                    if (!(n = i.commonPath(o, a))) return s.build();
                    var u = r.path
                        .substring(n.length)
                        .replace(/[^\/]*$/, "")
                        .replace(/.*?\//g, "../");
                    return (
                        (t.path = u + t.path.substring(n.length) || "./"),
                        s.build()
                    );
                }),
                (a.equals = function (e) {
                    var t,
                        r,
                        n,
                        o,
                        a,
                        u = this.clone(),
                        c = new i(e),
                        p = {};
                    if (
                        (u.normalize(),
                        c.normalize(),
                        u.toString() === c.toString())
                    )
                        return !0;
                    if (
                        ((n = u.query()),
                        (o = c.query()),
                        u.query(""),
                        c.query(""),
                        u.toString() !== c.toString())
                    )
                        return !1;
                    if (n.length !== o.length) return !1;
                    for (a in ((t = i.parseQuery(
                        n,
                        this._parts.escapeQuerySpace
                    )),
                    (r = i.parseQuery(o, this._parts.escapeQuerySpace)),
                    t))
                        if (s.call(t, a)) {
                            if (l(t[a])) {
                                if (!d(t[a], r[a])) return !1;
                            } else if (t[a] !== r[a]) return !1;
                            p[a] = !0;
                        }
                    for (a in r) if (s.call(r, a) && !p[a]) return !1;
                    return !0;
                }),
                (a.preventInvalidHostname = function (e) {
                    return (this._parts.preventInvalidHostname = !!e), this;
                }),
                (a.duplicateQueryParameters = function (e) {
                    return (this._parts.duplicateQueryParameters = !!e), this;
                }),
                (a.escapeQuerySpace = function (e) {
                    return (this._parts.escapeQuerySpace = !!e), this;
                }),
                i
            );
        });
    },
    function (e, t, r) {
        (function (e, n) {
            var o;
            !(function (i) {
                t && t.nodeType, e && e.nodeType;
                var a = "object" == typeof n && n;
                a.global !== a && a.window !== a && a.self;
                var s,
                    u = 2147483647,
                    c = /^xn--/,
                    l = /[^\x20-\x7E]/,
                    p = /[\x2E\u3002\uFF0E\uFF61]/g,
                    h = {
                        overflow:
                            "Overflow: input needs wider integers to process",
                        "not-basic":
                            "Illegal input >= 0x80 (not a basic code point)",
                        "invalid-input": "Invalid input",
                    },
                    d = Math.floor,
                    f = String.fromCharCode;
                function m(e) {
                    throw new RangeError(h[e]);
                }
                function g(e, t) {
                    for (var r = e.length, n = []; r--; ) n[r] = t(e[r]);
                    return n;
                }
                function v(e, t) {
                    var r = e.split("@"),
                        n = "";
                    return (
                        r.length > 1 && ((n = r[0] + "@"), (e = r[1])),
                        n + g((e = e.replace(p, ".")).split("."), t).join(".")
                    );
                }
                function y(e) {
                    for (var t, r, n = [], o = 0, i = e.length; o < i; )
                        (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i
                            ? 56320 == (64512 & (r = e.charCodeAt(o++)))
                                ? n.push(
                                      ((1023 & t) << 10) + (1023 & r) + 65536
                                  )
                                : (n.push(t), o--)
                            : n.push(t);
                    return n;
                }
                function b(e) {
                    return g(e, function (e) {
                        var t = "";
                        return (
                            e > 65535 &&
                                ((t += f(
                                    (((e -= 65536) >>> 10) & 1023) | 55296
                                )),
                                (e = 56320 | (1023 & e))),
                            (t += f(e))
                        );
                    }).join("");
                }
                function _(e, t) {
                    return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
                }
                function w(e, t, r) {
                    var n = 0;
                    for (
                        e = r ? d(e / 700) : e >> 1, e += d(e / t);
                        e > 455;
                        n += 36
                    )
                        e = d(e / 35);
                    return d(n + (36 * e) / (e + 38));
                }
                function k(e) {
                    var t,
                        r,
                        n,
                        o,
                        i,
                        a,
                        s,
                        c,
                        l,
                        p,
                        h,
                        f = [],
                        g = e.length,
                        v = 0,
                        y = 128,
                        _ = 72;
                    for (
                        (r = e.lastIndexOf("-")) < 0 && (r = 0), n = 0;
                        n < r;
                        ++n
                    )
                        e.charCodeAt(n) >= 128 && m("not-basic"),
                            f.push(e.charCodeAt(n));
                    for (o = r > 0 ? r + 1 : 0; o < g; ) {
                        for (
                            i = v, a = 1, s = 36;
                            o >= g && m("invalid-input"),
                                ((c =
                                    (h = e.charCodeAt(o++)) - 48 < 10
                                        ? h - 22
                                        : h - 65 < 26
                                        ? h - 65
                                        : h - 97 < 26
                                        ? h - 97
                                        : 36) >= 36 ||
                                    c > d((u - v) / a)) &&
                                    m("overflow"),
                                (v += c * a),
                                !(
                                    c <
                                    (l = s <= _ ? 1 : s >= _ + 26 ? 26 : s - _)
                                );
                            s += 36
                        )
                            a > d(u / (p = 36 - l)) && m("overflow"), (a *= p);
                        (_ = w(v - i, (t = f.length + 1), 0 == i)),
                            d(v / t) > u - y && m("overflow"),
                            (y += d(v / t)),
                            (v %= t),
                            f.splice(v++, 0, y);
                    }
                    return b(f);
                }
                function x(e) {
                    var t,
                        r,
                        n,
                        o,
                        i,
                        a,
                        s,
                        c,
                        l,
                        p,
                        h,
                        g,
                        v,
                        b,
                        k,
                        x = [];
                    for (
                        g = (e = y(e)).length, t = 128, r = 0, i = 72, a = 0;
                        a < g;
                        ++a
                    )
                        (h = e[a]) < 128 && x.push(f(h));
                    for (n = o = x.length, o && x.push("-"); n < g; ) {
                        for (s = u, a = 0; a < g; ++a)
                            (h = e[a]) >= t && h < s && (s = h);
                        for (
                            s - t > d((u - r) / (v = n + 1)) && m("overflow"),
                                r += (s - t) * v,
                                t = s,
                                a = 0;
                            a < g;
                            ++a
                        )
                            if (
                                ((h = e[a]) < t && ++r > u && m("overflow"),
                                h == t)
                            ) {
                                for (
                                    c = r, l = 36;
                                    !(
                                        c <
                                        (p =
                                            l <= i
                                                ? 1
                                                : l >= i + 26
                                                ? 26
                                                : l - i)
                                    );
                                    l += 36
                                )
                                    (k = c - p),
                                        (b = 36 - p),
                                        x.push(f(_(p + (k % b), 0))),
                                        (c = d(k / b));
                                x.push(f(_(c, 0))),
                                    (i = w(r, v, n == o)),
                                    (r = 0),
                                    ++n;
                            }
                        ++r, ++t;
                    }
                    return x.join("");
                }
                (s = {
                    version: "1.3.2",
                    ucs2: { decode: y, encode: b },
                    decode: k,
                    encode: x,
                    toASCII: function (e) {
                        return v(e, function (e) {
                            return l.test(e) ? "xn--" + x(e) : e;
                        });
                    },
                    toUnicode: function (e) {
                        return v(e, function (e) {
                            return c.test(e) ? k(e.slice(4).toLowerCase()) : e;
                        });
                    },
                }),
                    void 0 ===
                        (o = function () {
                            return s;
                        }.call(t, r, t, e)) || (e.exports = o);
            })();
        }.call(this, r(5)(e), r(6)));
    },
    function (e, t, r) {
        var n, o;
        !(function (i, a) {
            "use strict";
            e.exports
                ? (e.exports = a())
                : void 0 ===
                      (o =
                          "function" == typeof (n = a)
                              ? n.call(t, r, t, e)
                              : n) || (e.exports = o);
        })(0, function (e) {
            "use strict";
            var t = e && e.IPv6;
            return {
                best: function (e) {
                    var t,
                        r,
                        n = e.toLowerCase().split(":"),
                        o = n.length,
                        i = 8;
                    for (
                        "" === n[0] && "" === n[1] && "" === n[2]
                            ? (n.shift(), n.shift())
                            : "" === n[0] && "" === n[1]
                            ? n.shift()
                            : "" === n[o - 1] && "" === n[o - 2] && n.pop(),
                            -1 !== n[(o = n.length) - 1].indexOf(".") &&
                                (i = 7),
                            t = 0;
                        t < o && "" !== n[t];
                        t++
                    );
                    if (t < i)
                        for (n.splice(t, 1, "0000"); n.length < i; )
                            n.splice(t, 0, "0000");
                    for (var a = 0; a < i; a++) {
                        r = n[a].split("");
                        for (
                            var s = 0;
                            s < 3 && "0" === r[0] && r.length > 1;
                            s++
                        )
                            r.splice(0, 1);
                        n[a] = r.join("");
                    }
                    var u = -1,
                        c = 0,
                        l = 0,
                        p = -1,
                        h = !1;
                    for (a = 0; a < i; a++)
                        h
                            ? "0" === n[a]
                                ? (l += 1)
                                : ((h = !1), l > c && ((u = p), (c = l)))
                            : "0" === n[a] && ((h = !0), (p = a), (l = 1));
                    l > c && ((u = p), (c = l)),
                        c > 1 && n.splice(u, c, ""),
                        (o = n.length);
                    var d = "";
                    for (
                        "" === n[0] && (d = ":"), a = 0;
                        a < o && ((d += n[a]), a !== o - 1);
                        a++
                    )
                        d += ":";
                    return "" === n[o - 1] && (d += ":"), d;
                },
                noConflict: function () {
                    return e.IPv6 === this && (e.IPv6 = t), this;
                },
            };
        });
    },
    function (e, t, r) {
        var n, o;
        !(function (i, a) {
            "use strict";
            e.exports
                ? (e.exports = a())
                : void 0 ===
                      (o =
                          "function" == typeof (n = a)
                              ? n.call(t, r, t, e)
                              : n) || (e.exports = o);
        })(0, function (e) {
            "use strict";
            var t = e && e.SecondLevelDomains,
                r = {
                    list: {
                        ac: " com gov mil net org ",
                        ae: " ac co gov mil name net org pro sch ",
                        af: " com edu gov net org ",
                        al: " com edu gov mil net org ",
                        ao: " co ed gv it og pb ",
                        ar: " com edu gob gov int mil net org tur ",
                        at: " ac co gv or ",
                        au: " asn com csiro edu gov id net org ",
                        ba: " co com edu gov mil net org rs unbi unmo unsa untz unze ",
                        bb: " biz co com edu gov info net org store tv ",
                        bh: " biz cc com edu gov info net org ",
                        bn: " com edu gov net org ",
                        bo: " com edu gob gov int mil net org tv ",
                        br: " adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ",
                        bs: " com edu gov net org ",
                        bz: " du et om ov rg ",
                        ca: " ab bc mb nb nf nl ns nt nu on pe qc sk yk ",
                        ck: " biz co edu gen gov info net org ",
                        cn: " ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ",
                        co: " com edu gov mil net nom org ",
                        cr: " ac c co ed fi go or sa ",
                        cy: " ac biz com ekloges gov ltd name net org parliament press pro tm ",
                        do: " art com edu gob gov mil net org sld web ",
                        dz: " art asso com edu gov net org pol ",
                        ec: " com edu fin gov info med mil net org pro ",
                        eg: " com edu eun gov mil name net org sci ",
                        er: " com edu gov ind mil net org rochest w ",
                        es: " com edu gob nom org ",
                        et: " biz com edu gov info name net org ",
                        fj: " ac biz com info mil name net org pro ",
                        fk: " ac co gov net nom org ",
                        fr: " asso com f gouv nom prd presse tm ",
                        gg: " co net org ",
                        gh: " com edu gov mil org ",
                        gn: " ac com gov net org ",
                        gr: " com edu gov mil net org ",
                        gt: " com edu gob ind mil net org ",
                        gu: " com edu gov net org ",
                        hk: " com edu gov idv net org ",
                        hu: " 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ",
                        id: " ac co go mil net or sch web ",
                        il: " ac co gov idf k12 muni net org ",
                        in: " ac co edu ernet firm gen gov i ind mil net nic org res ",
                        iq: " com edu gov i mil net org ",
                        ir: " ac co dnssec gov i id net org sch ",
                        it: " edu gov ",
                        je: " co net org ",
                        jo: " com edu gov mil name net org sch ",
                        jp: " ac ad co ed go gr lg ne or ",
                        ke: " ac co go info me mobi ne or sc ",
                        kh: " com edu gov mil net org per ",
                        ki: " biz com de edu gov info mob net org tel ",
                        km: " asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ",
                        kn: " edu gov net org ",
                        kr: " ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ",
                        kw: " com edu gov net org ",
                        ky: " com edu gov net org ",
                        kz: " com edu gov mil net org ",
                        lb: " com edu gov net org ",
                        lk: " assn com edu gov grp hotel int ltd net ngo org sch soc web ",
                        lr: " com edu gov net org ",
                        lv: " asn com conf edu gov id mil net org ",
                        ly: " com edu gov id med net org plc sch ",
                        ma: " ac co gov m net org press ",
                        mc: " asso tm ",
                        me: " ac co edu gov its net org priv ",
                        mg: " com edu gov mil nom org prd tm ",
                        mk: " com edu gov inf name net org pro ",
                        ml: " com edu gov net org presse ",
                        mn: " edu gov org ",
                        mo: " com edu gov net org ",
                        mt: " com edu gov net org ",
                        mv: " aero biz com coop edu gov info int mil museum name net org pro ",
                        mw: " ac co com coop edu gov int museum net org ",
                        mx: " com edu gob net org ",
                        my: " com edu gov mil name net org sch ",
                        nf: " arts com firm info net other per rec store web ",
                        ng: " biz com edu gov mil mobi name net org sch ",
                        ni: " ac co com edu gob mil net nom org ",
                        np: " com edu gov mil net org ",
                        nr: " biz com edu gov info net org ",
                        om: " ac biz co com edu gov med mil museum net org pro sch ",
                        pe: " com edu gob mil net nom org sld ",
                        ph: " com edu gov i mil net ngo org ",
                        pk: " biz com edu fam gob gok gon gop gos gov net org web ",
                        pl: " art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ",
                        pr: " ac biz com edu est gov info isla name net org pro prof ",
                        ps: " com edu gov net org plo sec ",
                        pw: " belau co ed go ne or ",
                        ro: " arts com firm info nom nt org rec store tm www ",
                        rs: " ac co edu gov in org ",
                        sb: " com edu gov net org ",
                        sc: " com edu gov net org ",
                        sh: " co com edu gov net nom org ",
                        sl: " com edu gov net org ",
                        st: " co com consulado edu embaixada gov mil net org principe saotome store ",
                        sv: " com edu gob org red ",
                        sz: " ac co org ",
                        tr: " av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ",
                        tt: " aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ",
                        tw: " club com ebiz edu game gov idv mil net org ",
                        mu: " ac co com gov net or org ",
                        mz: " ac co edu gov org ",
                        na: " co com ",
                        nz: " ac co cri geek gen govt health iwi maori mil net org parliament school ",
                        pa: " abo ac com edu gob ing med net nom org sld ",
                        pt: " com edu gov int net nome org publ ",
                        py: " com edu gov mil net org ",
                        qa: " com edu gov mil net org ",
                        re: " asso com nom ",
                        ru: " ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ",
                        rw: " ac co com edu gouv gov int mil net ",
                        sa: " com edu gov med net org pub sch ",
                        sd: " com edu gov info med net org tv ",
                        se: " a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ",
                        sg: " com edu gov idn net org per ",
                        sn: " art com edu gouv org perso univ ",
                        sy: " com edu gov mil net news org ",
                        th: " ac co go in mi net or ",
                        tj: " ac biz co com edu go gov info int mil name net nic org test web ",
                        tn: " agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ",
                        tz: " ac co go ne or ",
                        ua: " biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ",
                        ug: " ac co go ne or org sc ",
                        uk: " ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ",
                        us: " dni fed isa kids nsn ",
                        uy: " com edu gub mil net org ",
                        ve: " co com edu gob info mil net org web ",
                        vi: " co com k12 net org ",
                        vn: " ac biz com edu gov health info int name net org pro ",
                        ye: " co com gov ltd me net org plc ",
                        yu: " ac co edu gov org ",
                        za: " ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ",
                        zm: " ac co com edu gov net org sch ",
                        com: "ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ",
                        net: "gb jp se uk ",
                        org: "ae",
                        de: "com ",
                    },
                    has: function (e) {
                        var t = e.lastIndexOf(".");
                        if (t <= 0 || t >= e.length - 1) return !1;
                        var n = e.lastIndexOf(".", t - 1);
                        if (n <= 0 || n >= t - 1) return !1;
                        var o = r.list[e.slice(t + 1)];
                        return (
                            !!o && o.indexOf(" " + e.slice(n + 1, t) + " ") >= 0
                        );
                    },
                    is: function (e) {
                        var t = e.lastIndexOf(".");
                        if (t <= 0 || t >= e.length - 1) return !1;
                        if (e.lastIndexOf(".", t - 1) >= 0) return !1;
                        var n = r.list[e.slice(t + 1)];
                        return !!n && n.indexOf(" " + e.slice(0, t) + " ") >= 0;
                    },
                    get: function (e) {
                        var t = e.lastIndexOf(".");
                        if (t <= 0 || t >= e.length - 1) return null;
                        var n = e.lastIndexOf(".", t - 1);
                        if (n <= 0 || n >= t - 1) return null;
                        var o = r.list[e.slice(t + 1)];
                        return o
                            ? o.indexOf(" " + e.slice(n + 1, t) + " ") < 0
                                ? null
                                : e.slice(n + 1)
                            : null;
                    },
                    noConflict: function () {
                        return (
                            e.SecondLevelDomains === this &&
                                (e.SecondLevelDomains = t),
                            this
                        );
                    },
                };
            return r;
        });
    },
    function (e, t, r) {
        e.exports = r(11);
    },
    function (e, t) {
        e.exports = function (e) {
            return (
                e.webpackPolyfill ||
                    ((e.deprecate = function () {}),
                    (e.paths = []),
                    e.children || (e.children = []),
                    Object.defineProperty(e, "loaded", {
                        enumerable: !0,
                        get: function () {
                            return e.l;
                        },
                    }),
                    Object.defineProperty(e, "id", {
                        enumerable: !0,
                        get: function () {
                            return e.i;
                        },
                    }),
                    (e.webpackPolyfill = 1)),
                e
            );
        };
    },
    function (e, t) {
        var r;
        r = (function () {
            return this;
        })();
        try {
            r = r || new Function("return this")();
        } catch (e) {
            "object" == typeof window && (r = window);
        }
        e.exports = r;
    },
    ,
    ,
    ,
    ,
    function (e, t, r) {
        "use strict";
        r.r(t);
        var n = r(0),
            o = r.n(n);
        function i(e) {
            return (i =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e;
                      }
                    : function (e) {
                          return e &&
                              "function" == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? "symbol"
                              : typeof e;
                      })(e);
        }
        "function" != typeof String.prototype.replaceSpecialChars &&
            (String.prototype.replaceSpecialChars = function () {
                return this.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            }),
            "function" != typeof String.prototype.trim &&
                (String.prototype.trim = function () {
                    return this.replace(/^\s+|\s+$/g, "");
                }),
            (jQuery.fn.vtexSmartResearch = function (e) {
                var t = jQuery(this),
                    r = function (e, t) {
                        "object" ==
                            ("undefined" == typeof console
                                ? "undefined"
                                : i(console)) &&
                            console.log(
                                "[Smart Research - " + (t || "Erro") + "] " + e
                            );
                    },
                    a = {
                        pageLimit: null,
                        loadContent: ".prateleira[id^=ResultItems]",
                        shelfClass: ".prateleira",
                        filtersMenu: ".search-multiple-navigator",
                        linksMenu: ".search-single-navigator",
                        menuDepartament: ".navigation .menu-departamento",
                        mergeMenu: !0,
                        insertMenuAfter: ".search-multiple-navigator h3:first",
                        emptySearchElem: jQuery(
                            '<div class="vtexsr-emptySearch"></div>'
                        ),
                        elemLoading:
                            '<div id="scrollLoading">Carregando ... </div>',
                        emptySearchMsg:
                            "<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>",
                        filterErrorMsg:
                            "Houve um erro ao tentar filtrar a página!",
                        searchUrl: null,
                        usePopup: !1,
                        showLinks: !0,
                        popupAutoCloseSeconds: 3,
                        filterScrollTop: function (e) {
                            return e.top - 20;
                        },
                        callback: function () {},
                        getShelfHeight: function (e) {
                            return e.scrollTop() + e.height();
                        },
                        shelfCallback: function () {},
                        infiniteScrollCallback: function() {},
                        ajaxCallback: function () {},
                        emptySearchCallback: function () {},
                        authorizeScroll: function () {
                            return !0;
                        },
                        authorizeUpdate: function () {
                            return !0;
                        },
                        labelCallback: function (e) {},
                    },
                    s = jQuery.extend(a, e),
                    u =
                        ("undefined" == typeof console || i(console),
                        jQuery("")),
                    c = jQuery(s.elemLoading),
                    l = 2,
                    p = !0,
                    h = jQuery(window),
                    d = (jQuery(document), jQuery("html,body")),
                    f = jQuery("body"),
                    m = "",
                    g = "",
                    v = "",
                    y = !1,
                    b = jQuery(s.loadContent),
                    _ = jQuery(s.filtersMenu),
                    w = { requests: 0, filters: 0, isEmpty: !1 },
                    k = {},
                    x = { self: $(this), groupFilters: [] },
                    Q = {
                        getUrl: function (e) {
                            return e || !1
                                ? m.replace(
                                      /PageNumber=[0-9]*/,
                                      "PageNumber=" + l
                                  )
                                : (v + g).replace(
                                      /PageNumber=[0-9]*/,
                                      "PageNumber=" + P
                                  );
                        },
                        getSearchUrl: function () {
                            var e, t, n;
                            return (
                                jQuery("script:not([src])").each(function () {
                                    if (
                                        ((t = jQuery(this)[0].innerHTML),
                                        (n = /\/buscapagina\?.+&PageNumber=/i),
                                        t.search(/\/buscapagina\?/i) > -1)
                                    )
                                        return (e = n.exec(t)), !1;
                                }),
                                void 0 !== e && void 0 !== e[0]
                                    ? e[0]
                                    : (r(
                                          "Não foi possível localizar a url de busca da página.\n Tente adicionar o .js ao final da página. \n[Método: getSearchUrl]"
                                      ),
                                      "")
                            );
                        },
                        infinitScroll: function () {
                            var e, t, n;
                            (n = (f.find(".pager:first").attr("id") || "")
                                .split("_")
                                .pop()),
                                (e =
                                    null !== s.pageLimit
                                        ? s.pageLimit
                                        : window["pagecount_" + n]),
                                (t = !0),
                                void 0 === e && (e = 99999999),
                                h.bind("scroll", function () {
                                    var n = jQuery(this);
                                    if (
                                        !(
                                            !y &&
                                            l <= e &&
                                            p &&
                                            s.authorizeScroll(w)
                                        )
                                    )
                                        return !1;
                                    if (
                                        n.scrollTop() + n.height() >=
                                            s.getShelfHeight(b) &&
                                        t
                                    ) {
                                        var o = b
                                            .find(s.shelfClass)
                                            .filter(":last");
                                        // o.after(c),
                                        (t = !1),
                                            (I = jQuery.ajax({
                                                url: Q.getUrl(!0),
                                                success: function (e) {
                                                    e.trim().length < 1
                                                        ? ((p = !1),
                                                          r(
                                                              "Não existem mais resultados a partir da página: " +
                                                                  (l - 1),
                                                              "Aviso"
                                                          ))
                                                        : o.after(e),
                                                        (t = !0),
                                                        c.remove(),
                                                        w.requests++,
                                                        s.ajaxCallback(w),
                                                        s.infiniteScrollCallback();
                                                },
                                            })),
                                            l++;
                                    }
                                });

                                const nextPage = () => {
                                    var o = b.find(s.shelfClass).filter(":last");

                                    (I = jQuery.ajax({
                                      url: Q.getUrl(!0),
                                      success: function (e) {
                                        e.trim().length < 1
                                          ? ((p = !1),
                                            r(
                                              "Não existem mais resultados a partir da página: " +
                                                (l - 1),
                                              "Aviso"
                                            ))
                                          : o.after(e),
                                          (t = !0),
                                          c.remove(),
                                          w.requests++,
                                          s.ajaxCallback(w);
                                          l++;
                                          scrollToProduct(() => nextPage());
                                      },
                                    }))
                                };

                                scrollToProduct(() => nextPage());
                        },
                    };
                if (
                    ((m = v =
                        null !== s.searchUrl ? s.searchUrl : Q.getSearchUrl()),
                    t.length < 1)
                )
                    return (
                        r("Nenhuma opção de filtro encontrada", "Aviso"),
                        s.showLinks &&
                            jQuery(s.linksMenu)
                                .css("visibility", "visible")
                                .show(),
                        Q.infinitScroll(),
                        t
                    );
                if (b.length < 1)
                    return (
                        r(
                            "Elemento para destino da requisição não foi encontrado \n (" +
                                b.selector +
                                ")"
                        ),
                        !1
                    );
                _.length < 1 &&
                    r(
                        "O menu de filtros não foi encontrado \n (" +
                            _.selector +
                            ")"
                    );
                document.location.href;
                var S = jQuery(s.linksMenu),
                    z = jQuery('<div class="vtexSr-overlay"></div>'),
                    j = jQuery(s.menuDepartament),
                    A = b.offset(),
                    P = 1,
                    C = null,
                    I = null;
                s.emptySearchElem.append(s.emptySearchMsg), b.before(z);
                var T = {
                    exec: function () {
                        T.setFilterMenu(),
                            T.fieldsetFormat(),
                            t.each(function () {
                                var e = jQuery(this),
                                    r = e.parent();
                                e.is(":checked") &&
                                    ((g += "&" + (e.attr("rel") || "")),
                                    r.addClass("sr_selected")),
                                    // T.adjustText(e), // hide Total Filter Products
                                    r.append(
                                        '<span class="sr_box"></span><span class="sr_box2"></span>'
                                    ),
                                    e.bind("change", function () {
                                        T.inputAction(),
                                            e.is(":checked")
                                                ? T.addFilter(e)
                                                : T.removeFilter(e),
                                            (w.filters =
                                                t.filter(":checked").length);
                                    });
                            }),
                            "" !== g && T.addFilter(u);
                    },
                    mergeMenu: function () {
                        if (!s.mergeMenu) return !1;
                        var e = j;
                        e.insertAfter(s.insertMenuAfter),
                            T.departamentMenuFormat(e);
                    },
                    mergeMenuList: function () {
                        var e = 0;
                        _.find("h3,h4").each(function () {
                            var t = S.find("h3,h4").eq(e).next("ul");
                            t.insertAfter(jQuery(this)),
                                T.departamentMenuFormat(t),
                                e++;
                        });
                    },
                    departamentMenuFormat: function (e) {
                        e.find("a").each(function () {
                            var e = jQuery(this);
                            e.text(T.removeCounter(e.text()));
                        });
                    },
                    fieldsetFormat: function () {
                        (k.fieldsetCount = 0),
                            (k.tmpCurrentLabel = {}),
                            _.find("fieldset").each(function () {
                                var e = jQuery(this),
                                    t = e.find("label"),
                                    r =
                                        "filtro_" +
                                        (e.find("h5:first").text() || "")
                                            .toLowerCase()
                                            .replaceSpecialChars()
                                            .replace(/\s/g, "-");
                                (k[r] = {}),
                                    t.length < 1
                                        ? e.hide()
                                        : (e.addClass(r),
                                          t.each(function (t) {
                                              var n = jQuery(this),
                                                  o =
                                                      n.find("input").val() ||
                                                      "",
                                                  i =
                                                      "sr_" +
                                                      o
                                                          .toLowerCase()
                                                          .replaceSpecialChars()
                                                          .replace(/\s/g, "-");
                                              (k.tmpCurrentLabel = {
                                                  fieldsetParent: [e, r],
                                                  elem: n,
                                              }),
                                                  (k[r][t.toString()] = {
                                                      className: i,
                                                      title: o,
                                                  }),
                                                  n
                                                      .addClass(i)
                                                      .attr({
                                                          title: o,
                                                          index: t,
                                                      }),
                                                  s.labelCallback(k);
                                          }),
                                          k.fieldsetCount++);
                            });
                    },
                    inputAction: function () {
                        null !== I && I.abort(),
                            null !== C && C.abort(),
                            (l = 2),
                            (p = !0);
                    },
                    addFilter: function (e) {
                        if (!e.parent().hasClass("sr_selected")) {
                            (g += "&" + (e.attr("rel") || "")),
                                z.fadeTo(300, 0.6),
                                (m = Q.getUrl()),
                                (C = jQuery.ajax({
                                    url: m,
                                    success: T.filterAjaxSuccess,
                                    error: T.filterAjaxError,
                                })),
                                e.parent().addClass("sr_selected"),
                                x.groupFilters.push(
                                    e.attr("rel").split("=")[1] || ""
                                );
                            var t = Array.from(new Set(x.groupFilters));
                            (x.groupFilters = t), T.groupFilters(!0);
                        }
                    },
                    removeFilter: function (e) {
                        if (e.parent().hasClass("sr_selected")) {
                            var t = e.attr("rel") || "",
                                r = decodeURIComponent(
                                    e.attr("rel").split("=")[1] || ""
                                );
                            z.fadeTo(300, 0.6),
                                "" !== t && (g = g.replace("&" + t, "")),
                                (m = Q.getUrl()),
                                (C = jQuery.ajax({
                                    url: m,
                                    success: T.filterAjaxSuccess,
                                    error: T.filterAjaxError,
                                })),
                                e.parent().removeClass("sr_selected"),
                                (x.groupFilters = x.groupFilters.filter(
                                    function (e) {
                                        return decodeURIComponent(e) != r;
                                    }
                                )),
                                T.groupFilters(!0);
                        }
                    },
                    groupFilters: function (e) {
                        var t,
                            r = new o.a(window.location.href),
                            i =
                                "" != r.query()
                                    ? Object(n.parseQuery)(r.query())
                                    : {},
                            a =
                                "" == r.fragment() || e
                                    ? ""
                                    : "#".concat(r.fragment()),
                            s = function (e) {
                                for (var t in e)
                                    if (e.hasOwnProperty(t)) return !1;
                                return !0;
                            };
                        x.groupFilters.length > 0
                            ? ((i.filters =
                                  x.groupFilters.length > 0
                                      ? x.groupFilters.join("--")
                                      : ""),
                              (t = "".concat(
                                  decodeURIComponent(Object(n.buildQuery)(i))
                              )))
                            : s(i) ||
                              (delete i.filters,
                              s(i) && (i = ""),
                              (t = "".concat(
                                  decodeURIComponent(Object(n.buildQuery)(i))
                              ))),
                            window.history.pushState(
                                "",
                                "",
                                r.pathname() +
                                    ""
                                        .concat("" != i ? "?" : "")
                                        .concat(t)
                                        .concat(a)
                            );
                    },
                    getFilters: function () {
                        o.a.escapeQuerySpace = !1;
                        var e = new o.a(window.location.href),
                            t =
                                "" != e.query()
                                    ? Object(n.parseQuery)(e.query())
                                    : "";
                        (x.groupFilters =
                            void 0 !== t.filters ? t.filters.split(/--/g) : []),
                            $("input[type='checkbox']").each(function () {
                                var e = $(this),
                                    t = e.parent(),
                                    r = decodeURIComponent(
                                        e.attr("rel").split("fq=")[1]
                                    );
                                $.inArray(r, x.groupFilters) >= 0 &&
                                    (e.prop("checked", !0),
                                    t.addClass("filter_selected")),
                                    e.is(":checked")
                                        ? T.addFilter(e)
                                        : T.removeFilter(e);
                            });
                    },
                    loadPage: function () {
                        T.getFilters();
                    },
                    filterAjaxSuccess: function (e) {
                        var t = jQuery(e);
                        z.fadeTo(300, 0, function () {
                            jQuery(this).hide();
                        }),
                            T.updateContent(t),
                            w.requests++,
                            s.ajaxCallback(w),
                            d.animate(
                                {
                                    scrollTop: s.filterScrollTop(
                                        A || { top: 0, left: 0 }
                                    ),
                                },
                                600
                            );
                    },
                    filterAjaxError: function () {
                        z.fadeTo(300, 0, function () {
                            jQuery(this).hide();
                        }),
                            alert(s.filterErrorMsg),
                            r(
                                "Houve um erro ao tentar fazer a requisição da página com filtros."
                            );
                    },
                    updateContent: function (e) {
                        if (((y = !0), !s.authorizeUpdate(w))) return !1;
                        var t = e.filter(s.shelfClass),
                            r = b.find(s.shelfClass);
                        (r.length > 0 ? r : s.emptySearchElem).slideUp(
                            600,
                            function () {
                                jQuery(this).remove(),
                                    s.usePopup
                                        ? f.find(".boxPopUp2").vtexPopUp2()
                                        : s.emptySearchElem.remove(),
                                    t.length > 0
                                        ? (t.hide(),
                                          b.append(t),
                                          s.shelfCallback(),
                                          t.slideDown(600, function () {
                                              y = !1;
                                          }),
                                          (w.isEmpty = !1))
                                        : ((w.isEmpty = !0),
                                          s.usePopup
                                              ? s.emptySearchElem
                                                    .addClass(
                                                        "freeContent autoClose ac_" +
                                                            s.popupAutoCloseSeconds
                                                    )
                                                    .vtexPopUp2()
                                                    .stop(!0)
                                                    .show()
                                              : (b.append(s.emptySearchElem),
                                                s.emptySearchElem
                                                    .show()
                                                    .css("height", "auto")
                                                    .fadeTo(
                                                        300,
                                                        0.2,
                                                        function () {
                                                            s.emptySearchElem.fadeTo(
                                                                300,
                                                                1
                                                            );
                                                        }
                                                    )),
                                          s.emptySearchCallback(w));
                            }
                        );
                    },
                    adjustText: function (e) {
                        var t = e.parent(),
                            r = t.text();
                        (r = T.removeCounter(r)), t.text(r).prepend(e);
                    },
                    removeCounter: function (e) {
                        return e.replace(/\([0-9]+\)/gi, function (e) {
                            return "";
                        });
                    },
                    setFilterMenu: function () {
                        _.length > 0 && (S.hide(), _.show());
                    },
                };
                f.hasClass("departamento")
                    ? T.mergeMenu()
                    : (f.hasClass("categoria") ||
                          f.hasClass("resultado-busca")) &&
                      T.mergeMenuList(),
                    T.exec(),
                    T.loadPage(),
                    Q.infinitScroll(),
                    s.callback(),
                    _.css("visibility", "visible");
            });
    },
]);
