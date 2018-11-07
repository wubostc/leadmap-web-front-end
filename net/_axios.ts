import * as ax from "axios";
import * as qs from "qs";

namespace AXIOS {
  const reqcfg : ax.AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    validateStatus: (status) => {
      return status >= 200 && status < 300;
    },
    withCredentials: true,

  };
  const __base_axios: ax.AxiosStatic = ax.default;
  export const __MyInstance: ax.AxiosInstance = __base_axios.create(reqcfg);
  __MyInstance.interceptors.response.use((response): Promise<ax.AxiosResponse<any>> | ax.AxiosResponse<any> => {
    return response;
  }, (err) => {
    return Promise.reject(err);
  });
  __MyInstance.interceptors.request.use(
    (config: ax.AxiosRequestConfig): ax.AxiosRequestConfig | Promise<ax.AxiosRequestConfig> => {
    config.headers["X-Requested-With"] = document.cookie;
    config.data = qs.stringify(config.data, { allowDots: true });
    return config;
  }, (err) => {
    return Promise.reject(err);
  });
}


export default AXIOS.__MyInstance;
