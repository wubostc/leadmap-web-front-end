import { AxiosInstance } from "axios";
export declare const enum CT {
    URLENCODED = "application/x-www-form-urlencoded",
    JSON = "application/json"
}
export interface AAOPTS {
    ct: CT;
}
export declare class CAxios {
    private instance;
    constructor(opts: AAOPTS);
    get_inst(): AxiosInstance;
}
declare const __MyInstance: AxiosInstance;
export default __MyInstance;
