import { AxiosRequestConfig, AxiosInstance } from "axios";
export declare const enum CT {
    URLENCODED = 0,
    JSON = 1
}
export interface AAOPTS {
    ct: CT;
}
export declare class CAxios {
    private instance;
    constructor(opts: AAOPTS);
    private static request;
    private static request1;
    get_inst(): AxiosInstance;
    static set_auth(config: AxiosRequestConfig): void;
}
declare const axios: AxiosInstance;
export { axios };
