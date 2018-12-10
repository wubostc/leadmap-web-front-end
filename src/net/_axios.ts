import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Cookie from "./cookies";
import * as qs from "qs";

const reqcfg: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  validateStatus: (status: number) => {
    return status >= 200 && status < 300;
  },
  withCredentials: true
};
export const __MyInstance = Axios.create(reqcfg);
__MyInstance.interceptors.response.use((response): Promise<AxiosResponse<any>> | AxiosResponse<any> => {
    return response;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);
__MyInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    let payload;

    let token;
    try {
      token = `${/lb_token=([^&]+)/.exec(location.href)[0]}`;
    } catch (e) {
      token = `lb_token=${Cookie.getItem("lb_token")}`;
    }
    if (token) {
      payload = token;
    } else {
      payload = document.cookie;
    }
    config.headers["X-Requested-With"] = payload;
    config.data = qs.stringify(config.data, { allowDots: true });
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

export default __MyInstance;
