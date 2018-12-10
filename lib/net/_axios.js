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
const qs = __importStar(require("qs"));
const reqcfg = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    validateStatus: (status) => {
        return status >= 200 && status < 300;
    },
    withCredentials: true
};
exports.__MyInstance = axios_1.default.create(reqcfg);
exports.__MyInstance.interceptors.response.use((response) => {
    return response;
}, (err) => {
    return Promise.reject(err);
});
exports.__MyInstance.interceptors.request.use((config) => {
    let payload;
    try {
        payload = `${document.cookie}; ${/lb_token=([^&]+)/.exec(location.href)[0]}`;
    }
    catch (e) {
        payload = null;
    }
    config.headers["X-Requested-With"] = payload;
    config.data = qs.stringify(config.data, { allowDots: true });
    return config;
}, (err) => {
    return Promise.reject(err);
});
exports.default = exports.__MyInstance;
