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
    protected request(config: AxiosRequestConfig): AxiosRequestConfig;
    protected request1(config: AxiosRequestConfig): AxiosRequestConfig;
    get_inst(): AxiosInstance;
    protected static set_auth(config: AxiosRequestConfig): void;
}
declare const axios: AxiosInstance;
export { axios };
