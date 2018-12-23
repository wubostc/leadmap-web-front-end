declare type timepoint_t = number | string | Date;
declare type get_t = (k: string) => string | null;
declare type set_t = (k: string, v: string, end?: timepoint_t, path?: string, domain?: string, secure?: boolean) => boolean;
declare type rm_t = (k: string, path?: string, sDomain?: string) => boolean;
declare type has_t = (k: string) => boolean;
declare type keys_t = () => string[] | null[];
declare const cookies: {
    getItem: get_t;
    hasItem: has_t;
    keys: keys_t;
    removeItem: rm_t;
    setItem: set_t;
};
export default cookies;
