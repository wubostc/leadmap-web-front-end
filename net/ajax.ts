import * as jQuery from "jquery";
import * as qs from "qs";
import { PlainObject } from "./index";



declare interface IfSpecSettings extends JQueryAjaxSettings {}
declare interface IfAjaxFunc1 {}
declare interface IfAjaxFunc2 {}

interface IfSpecSettings {
  data?: PlainObject | string;
  url?: string;
  type?: "get" | "post" | "delete" | "put" | "head" | "options" | "patch" | "trace" | "connect";
}

const _default: PlainObject = {
  headers: {
    "X-Requested-With": document.cookie
  }
};

interface If_base_ajax_t {
  (this: void, settings: JQueryAjaxSettings | IfSpecSettings): Promise<any>;
  get:  IfAjaxFunc1;
  post: IfAjaxFunc1;
  del:  IfAjaxFunc1;
  put:  IfAjaxFunc1;
  all:  IfAjaxFunc2;
}

namespace AJAX {

type resolve_t = (d: any, t: string, xhr: any) => void;

type reject_t = (a: any) => void;

export const __base_ajax = async function(settings: JQueryAjaxSettings) {

  return new Promise((resolve: resolve_t, reject: reject_t) => {
    const _settings = Object.assign(
      {},
      _default,
      {
        data: qs.stringify(settings.data, { allowDots: true }),
        dataType: "json",
        error: (jqXHR: JQuery.jqXHR<any>, textStatus: JQuery.Ajax.ErrorTextStatus, errorThrown: string) => {
          reject({ jqXHR, textStatus, errorThrown });
        },
        success: (data: any, textStatus: string, jqXHR: any) => {
          resolve(data, textStatus, jqXHR);
        },
      } as JQueryAjaxSettings,
      settings,
    ) as JQueryAjaxSettings;

    jQuery.ajax(_settings);
  });
} as If_base_ajax_t;

namespace _Polyfill {


type AjaxFunc2_t = (this: void, parallel: Array<Promise<any>>) => Promise<any>;

// polyfill: axios.all
export
const all = async function(parallel) {
  const result: Array<Promise<any>> = [];
  parallel.forEach((req, idx) => {
    req.then((v: any) => {
      result[idx] = v;
      if (result.length === parallel.length) {
        Promise.resolve(result);
      }
    }).catch((reason: any) => {
      Promise.reject(reason);
    });
  });
} as AjaxFunc2_t;


type IfAjaxFunc1 =
  (this: void, url: string, settings: IfSpecSettings | JQueryAjaxSettings) => Promise<any>;

// polyfill: axios.get
export
const get = async function(url, settings) {
  if (!!settings.data) {
    settings.url = url;
    settings.type = "get";
    return __base_ajax(settings);
  } else {
    return __base_ajax({ url, type: "get", data: settings });
  }
} as IfAjaxFunc1;

// polyfill: axios.post
export
const post = async function(url, settings) {
  if (!!settings.data) {
    settings.url = url;
    settings.type = "post";
    return __base_ajax(settings);
  } else {
    return __base_ajax({ url, type: "get", data: settings });
  }
} as IfAjaxFunc1;

// polyfill: axios.delete
export
const del = async function(url, settings) {
  if (!!settings.data) {
    settings.url = url;
    settings.type = "delete";
    return __base_ajax(settings);
  } else {
    return __base_ajax({ url, type: "get", data: settings });
  }
} as IfAjaxFunc1;

// polyfill: axios.put
export
const put = async function(url, settings) {
  if (!!settings.data) {
    settings.url = url;
    settings.type = "put";
    return __base_ajax(settings);
  } else {
    return __base_ajax({ url, type: "get", data: settings });
  }
} as IfAjaxFunc1;

}

__base_ajax.all = _Polyfill.all;
__base_ajax.get = _Polyfill.get;
__base_ajax.post = _Polyfill.post;
__base_ajax.del = _Polyfill.del;
__base_ajax.put = _Polyfill.put;

}

const ajax =  AJAX.__base_ajax;
export default ajax;
