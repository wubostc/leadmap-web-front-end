"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const qs = require("qs");
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
    config.headers["X-Requested-With"] = document.cookie;
    config.data = qs.stringify(config.data, { allowDots: true });
    return config;
}, (err) => {
    return Promise.reject(err);
});
exports.default = exports.__MyInstance;
