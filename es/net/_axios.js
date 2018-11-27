import Axios from "axios";
import * as qs from "qs";
const reqcfg = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    validateStatus: (status) => {
        return status >= 200 && status < 300;
    },
    withCredentials: true
};
export const __MyInstance = Axios.create(reqcfg);
__MyInstance.interceptors.response.use((response) => {
    return response;
}, (err) => {
    return Promise.reject(err);
});
__MyInstance.interceptors.request.use((config) => {
    config.headers["X-Requested-With"] = document.cookie;
    config.data = qs.stringify(config.data, { allowDots: true });
    return config;
}, (err) => {
    return Promise.reject(err);
});
export default __MyInstance;
