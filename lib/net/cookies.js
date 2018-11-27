"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COOKIES;
(function (COOKIES) {
    COOKIES.__base_cookies = {
        getItem: function (sKey) {
            return (decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
                encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
                "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null);
        },
        hasItem: function (sKey) {
            return new RegExp("(?:^|;\\s*)" +
                encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
                "\\s*\\=").test(document.cookie);
        },
        keys: function () {
            if (!!!document.cookie) {
                return [];
            }
            const aKeys = document.cookie
                .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
                .split(/\s*(?:\=[^;]*)?;\s*/);
            for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
                aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
            }
            return aKeys;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!sKey || !this.hasItem(sKey)) {
                return false;
            }
            document.cookie =
                encodeURIComponent(sKey) +
                    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                    (sDomain ? "; domain=" + sDomain : "") +
                    (sPath ? "; path=" + sPath : "");
            return true;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                return false;
            }
            let sExpires = "";
            if (vEnd) {
                if (vEnd instanceof Number) {
                    sExpires =
                        vEnd === Infinity
                            ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
                            : "; max-age=" + vEnd;
                }
                else if (vEnd instanceof String) {
                    sExpires = "; expires=" + vEnd;
                }
                else if (vEnd instanceof Date) {
                    sExpires = "; expires=" + vEnd.toUTCString();
                }
            }
            document.cookie =
                encodeURIComponent(sKey) +
                    "=" +
                    encodeURIComponent(sValue) +
                    sExpires +
                    (sDomain ? "; domain=" + sDomain : "") +
                    (sPath ? "; path=" + sPath : "") +
                    (bSecure ? "; secure" : "");
            return true;
        }
    };
})(COOKIES || (COOKIES = {}));
const cookies = COOKIES.__base_cookies;
exports.default = cookies;
