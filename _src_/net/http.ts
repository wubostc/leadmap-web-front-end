import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from "axios";
import Cookie from "../cookies";
import * as qs from "qs";

export // content type
enum CT {
  URLENCODED,
  JSON
}


function interceptors_response(res: AxiosResponse<any>) {
  return res;
}

function interceptors_error(err: AxiosError) {
  return Promise.reject(err);
}


const _config: AxiosRequestConfig = {
  validateStatus: (status: number) => {
    return status >= 200 && status < 300;
  },
  withCredentials: true
};



export
interface AAOPTS {
  ct: CT;
}

export
class CAxios {
  private instance: AxiosInstance;

  public constructor(opts: AAOPTS) {
    let c = {};
    switch (opts.ct) {
      case CT.URLENCODED:
        {
          c = {
            ..._config,
            ...{ "headers": { "Content-Type": "application/x-www-form-urlencoded" } }
          };
          this.instance = Axios.create(c);
          this.instance.interceptors.request.use(CAxios.request1, interceptors_error);
          this.instance.interceptors.response.use(interceptors_response, interceptors_error);
        }
        break;

      case CT.JSON:
        {
          c = {
            ..._config,
            ...{ "headers": { "Content-Type": "application/json" } }
          };
          this.instance = Axios.create(c);
          this.instance.interceptors.request.use(CAxios.request, interceptors_error);
          this.instance.interceptors.response.use(interceptors_response, interceptors_error);
        }
        break;

      default:
        break;
    }
    
  }

  private static request(config: AxiosRequestConfig) {
    CAxios.set_auth(config);
    return config;
  }

  private static request1(config: AxiosRequestConfig) {
    CAxios.set_auth(config);
    config.data = qs.stringify(config.data, { allowDots: true });
    return config;
  }

  public get_inst() {
    return this.instance;
  }

  public static set_auth(config: AxiosRequestConfig) {
    let payload;
    let token;
    try {
      token = /lb_token=([^&]+)/.exec(location.href)[1];
    } catch (e) {
      token = Cookie.getItem("lb_token");
    }
    if (token) {
      payload = `lb_token=${token}`;
    } else {
      payload = document.cookie;
    }
    config.headers["X-Requested-With"] = payload;
  }

}

const axios = new CAxios({ ct: CT.URLENCODED }).get_inst();

export { axios };
