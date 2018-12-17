"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cookies_1 = __importDefault(require("./cookies"));
const qs = __importStar(require("qs"));
var CT;
(function (CT) {
    CT[CT["URLENCODED"] = 0] = "URLENCODED";
    CT[CT["JSON"] = 1] = "JSON";
})(CT = exports.CT || (exports.CT = {}));
function interceptors_response(res) {
    return res;
}
function interceptors_error(err) {
    return Promise.reject(err);
}
const _config = {
    validateStatus: (status) => {
        return status >= 200 && status < 300;
    },
    withCredentials: true
};
class CAxios {
    constructor(opts) {
        let c = {};
        switch (opts.ct) {
            case 0:
                {
                    c = Object.assign({}, _config, { "headers": { "Content-Type": "application/x-www-form-urlencoded" } });
                    this.instance = axios_1.default.create(c);
                    this.instance.interceptors.request.use(this.request1, interceptors_error);
                    this.instance.interceptors.response.use(interceptors_response, interceptors_error);
                }
                break;
            case 1:
                {
                    c = Object.assign({}, _config, { "headers": { "Content-Type": "application/json" } });
                    this.instance = axios_1.default.create(c);
                    this.instance.interceptors.request.use(this.request, interceptors_error);
                    this.instance.interceptors.response.use(interceptors_response, interceptors_error);
                }
                break;
            default:
                break;
        }
    }
    request(config) {
        CAxios.set_auth(config);
        return config;
    }
    request1(config) {
        CAxios.set_auth(config);
        config.data = qs.stringify(config.data, { allowDots: true });
        return config;
    }
    get_inst() {
        return this.instance;
    }
    static set_auth(config) {
        let payload;
        let token;
        try {
            token = /lb_token=([^&]+)/.exec(location.href)[1];
        }
        catch (e) {
            token = cookies_1.default.getItem("lb_token");
        }
        if (token) {
            payload = `lb_token=${token}`;
        }
        else {
            payload = document.cookie;
        }
        config.headers["X-Requested-With"] = payload;
    }
}
exports.CAxios = CAxios;
const axios = new CAxios({ ct: 0 }).get_inst();
exports.axios = axios;
