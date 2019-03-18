/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * cookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * cookies.getItem(name)
|*|  * cookies.removeItem(name[, path], domain)
|*|  * cookies.hasItem(name)
|*|  * cookies.keys()
|*|
\*/


type timepoint_t = number | string | Date;

type get_t = (k: string) => string | null;
type set_t =
(k: string, v: string, end?: timepoint_t, path?: string, domain?: string, secure?: boolean) => boolean;
type rm_t = (k: string, path?: string, sDomain?: string) => boolean;
type has_t = (k: string) => boolean;
type keys_t = () => string[] | null[];


namespace COOKIES {
/**
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie}
 */
export const __base_cookies = {
  getItem: function(sKey) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
            encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
            "\\s*\\=\\s*([^;]*).*$)|^.*$"),
          "$1")) || null);
  } as get_t,
  hasItem: function(sKey) {
    return new RegExp(
      "(?:^|;\\s*)" +
      encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
      "\\s*\\=").test(document.cookie);
  } as has_t,
  keys: /* optional method: you can safely remove it! */ function() {
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
  } as keys_t,
  removeItem: function(sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "");
    return true;
  } as rm_t,
  setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    let sExpires: timepoint_t = "";
    if (vEnd) {

      if (vEnd instanceof Number) {
        sExpires =
          vEnd === Infinity
            ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
            : "; max-age=" + vEnd;
      } else if (vEnd instanceof String) {
        sExpires = "; expires=" + vEnd;
      } else if (vEnd instanceof Date) {
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
  } as set_t
};
}

const cookies = COOKIES.__base_cookies;
export default cookies;
