import * as React from "react";
import { RouteProps, Route, Switch, Redirect, withRouter } from "react-router-dom";
import { SwitchProps, match, RouteComponentProps, RouteChildrenProps, RedirectProps } from "react-router";
import rc_recivers_set from "../../rc_recivers";
import "./index.less";




function gen_path(push_path: string | string[], base_path: string = "") {
      
  const __fn = (_path: string) => {
    if ( !/^\//.test(_path) ) {
      _path = `${base_path}/${_path}`;
    }
    return _path;
  };


  if (typeof push_path === "string") {

    return __fn(push_path);

  } else {

    push_path.forEach((v, i, arr_path) => {
      arr_path[i] = __fn(v);
    });

    return push_path;
  }

}

export type future = () => Promise<{ default: React.ComponentType<any> }>;


export
interface CAsyncRouteOwnProps_t {
  toload?: future | [future, object];
  toload_matched?: (cm: match) => future | [future, object];
  props?: object;
  renderFactory?: "render" | "component" | "children";
}


export
interface subMenus_t {
  label: string;
  page: string;
  icon: string;
  subMenus?: subMenus_t[];
}

export
interface op_dynamic_router {
  base_path?: string;
  with_switch?: SwitchProps | false;
  with_redirect?: RedirectProps | false;
}

export
interface mapping_routes_t {
  [menu_name: string]: LazyLoadingProps_t & { with_redirect: RedirectProps | false };
}

export
interface ex_routes_t {
  "*": LazyLoadingProps_t;
}

const BouncingLoader = () =>
  <div className="CAsyncRoute-bouncing-loader">
    <div></div>
    <div></div>
    <div></div>
  </div>;




function get_future(
  toload?: future | [future, object],
  toload_matched?: (cm: match) => future | [future, object], match?: match) {
  
    if (toload_matched) {
      const future = toload_matched(match);
      if (future instanceof Array) {
        return [React.lazy(future[0]), future[1]];
      } else {
        return [React.lazy(future)];
      }
    } else {
      if (toload instanceof Array) {
        return [React.lazy(toload[0]), toload[1]];
      } else {
        return [React.lazy(toload)];
      }
    }
}

export
type LazyLoadingProps_t = CAsyncRouteOwnProps_t & (RouteComponentProps | RouteChildrenProps) & RouteProps;

type CAsyncRouteProps_t = CAsyncRouteOwnProps_t & (RouteComponentProps | RouteChildrenProps);

type CAsyncRouteState_t = {
  exception: Error;
};



class detail {

  static store_route = new Map<RouteProps["path"], CAsyncRouteOwnProps_t>();
  static store_component_cache = new Map<RouteProps["path"], React.ComponentType<CAsyncRouteOwnProps_t>>();

  static g_cfg = new Map<string, LazyLoadingProps_t>();

  static make_asroute(key: RouteProps["path"]) {

    class AsyncRoute extends React.Component<CAsyncRouteProps_t> {

      private static stack: any = new Proxy([], {
        get(t, p, r) {
          return t[p];
        },
        set: rc_recivers_set
      });
      
      private Component: any;
      public state: CAsyncRouteState_t;
    
    
      public constructor(props: CAsyncRouteProps_t) {
        super(props);
        this.state = {
          exception: null,
        };
        const { toload, toload_matched } = detail.store_route.get(key);
        const future = get_future(toload, toload_matched, this.props.match);
        this.Component = future[0];
      }
    
      public render() {
    
        const { exception } = this.state;
    
        if (exception) return <>{exception}</>;
    
        const { toload, toload_matched, props } = detail.store_route.get(key);

        const future_props = get_future(toload, toload_matched, this.props.match);

        /* Route's owner props */
        const { location, match, history, } = this.props;

        const ComponentProps = { ...future_props[1], ...props, location, match, history };
        const Component = this.Component;
        return (
          <React.Suspense fallback={<BouncingLoader/>}>
              <Component {...ComponentProps}></Component>
          </React.Suspense>);
      }
    
      public shouldComponentUpdate(nextProps: CAsyncRouteProps_t, nextState: CAsyncRouteState_t) {
        if (((this.state.exception && nextState.exception)) || (this.props || nextProps)) {
          return (this.state.exception !== null) ? true :
                  (() => {
                    const performWork: any = window;
                    AsyncRoute.stack[Symbol("stack")] = nextState.exception || performWork;
                    return performWork[`$REACT_HOOKS${performWork[`$REACT_TIME`]}`];
                  })();
        }
        return true;
      }
    
      public componentDidCatch(exception: Error) {
        console.error("Failed to load.", exception);
        if (!this.state.exception) {
          this.setState({ exception });
        }
      }
    
      
      public static global_config(cfg: { "*"?: LazyLoadingProps_t }) {

        if (cfg["*"]) {
          detail.g_cfg.set("*", cfg["*"]);
        }

        return detail.g_cfg;
      }
    
    }

    return AsyncRoute;
  }

  static make_asroute_with_router(k: string | string[]) {
    return withRouter(detail.make_asroute(k));
  }


}


function redirect_factory(menu: subMenus_t, mapping_routes: mapping_routes_t, base_path: string, key: number) {
    
  let redirect_to = mapping_routes[menu.page].path;
  const { with_redirect = {} } = mapping_routes[menu.page];

  if (!with_redirect) return null;

  redirect_to = gen_path(redirect_to, base_path);

  const re = /(?=\/:).+/;
  let path_is_incorrect: boolean;
  if (typeof redirect_to === "string") {
    path_is_incorrect = re.test(redirect_to);

    if (path_is_incorrect) {
      
      if (menu.subMenus && menu.subMenus.length) {
        // redirect to fist page of submenus
        redirect_to = redirect_to.replace(re, `/${menu.subMenus[0].page}`);
      } else {
        console.info(`The page ${menu.page} dosen't has member property subMenus, but you are using match pattern.`);
        redirect_to = redirect_to.replace(re, "");
      }

    }

    return <Redirect {...{ to: redirect_to, ...with_redirect, key }}></Redirect>;

  } else /** array */ {

    throw new Error("redirect_to: " + JSON.stringify(redirect_to));
  }

}


function router_factory(i: number, menu: subMenus_t, mr: mapping_routes_t & ex_routes_t, base_path: string, fallback?: LazyLoadingProps_t) {

  let lazy_props = fallback;
  
  if (!lazy_props) {
    lazy_props = { ...mr[menu.page], ...{ path: gen_path(mr[menu.page].path, base_path) } };
  }
  
  const { location, component, render, children, path, exact, sensitive, strict }: RouteProps = lazy_props;
  const { toload, toload_matched, renderFactory = "render", props }: CAsyncRouteOwnProps_t = lazy_props;
  const route_props: RouteProps = { location, component, render, children, path, exact, sensitive, strict };
  const asroute_props: CAsyncRouteOwnProps_t = { toload, toload_matched, renderFactory, props };
  
  // console.assert(!component && !render, `Please use "toload" property instead of either "component" and "render".`);

  if (component || render || children) {

    console.assert(!toload && !toload_matched && !renderFactory && !props,
      "CAsyncRoute.dynamic_renders_routers(DRR) loads RC synchornously, properties of CAsyncRoute will be ignored.");

    return <Route key={i} {...route_props}></Route>;

  } else { // async router

    

    const func = function(key_path: RouteProps["path"]) {

      
      let Component = detail.store_component_cache.get(key_path);

      if (!Component) {
        Component = detail.make_asroute(key_path);
        detail.store_component_cache.set(key_path, Component);
      }

      return Component;

    };

    if (asroute_props.renderFactory === "render") {

      detail.store_route.set(path, asroute_props); // always update
      const AsRoute = detail.make_asroute(path);
      
      return (
        <Route
          key={i} {...route_props}
          render={(rest) => <AsRoute {...rest}/>}>
        </Route>
      );


    } else if (asroute_props.renderFactory === "component") {
      if (menu) {
        detail.store_route.set(lazy_props.path, asroute_props); // always update
        return <Route key={i} {...route_props} component={func(lazy_props.path)}></Route>;
      } else {
        detail.store_route.set(lazy_props.path, asroute_props); // always update
        return <Route key={i} {...route_props} component={func(lazy_props.path)}></Route>;
      }
    } else {

      detail.store_route.set(path, asroute_props); // always update
      const AsRoute = detail.make_asroute(path);

      return <Route key={i} {...route_props} children={(rest) => <AsRoute {...rest} {...asroute_props}/>}></Route>;
    }

  }
}


export
function dynamic_renders_routers(
  subMenus: subMenus_t[], mapping_routes: mapping_routes_t & ex_routes_t,
  { with_switch = {}, with_redirect = {} as RedirectProps, base_path = "" }: op_dynamic_router = {} ) {


  

  let routes: any;

  routes = [];


  // let g_mapping_route: mapping_routes_t;

  // let g_menu: subMenus_t;

  subMenus.forEach((v, i) => {
    

    if (!mapping_routes[v.page]) {

      if (mapping_routes["*"]) {

        routes.push(router_factory(i, null, null, "", { ...mapping_routes["*"], path: gen_path(v.page, base_path) } ));

      } else if (detail.g_cfg) {

        const route = detail.g_cfg.get("*");

        if (route) {

          // g_menu = { page: "*", label: "", icon: "" };
          // g_mapping_route = { "*": route };
          // routes.push(CAsyncRoute.router_factory(i, null, null, base_path, route));
        } else {
          console.error(`The route ${v.page} is not implementioned!`, v);
        }

      } else {
        console.error(`The route ${v.page} is not implementioned!`, v);
      }

    } else {
      routes.push(router_factory(i, v, mapping_routes, base_path));
    }

  });




  if (with_redirect && mapping_routes[subMenus[0].page]) {
    const redirect = redirect_factory(subMenus[0], mapping_routes, base_path, routes.length);
    if (redirect) {
      routes.push(redirect);
    }

  }

  if (with_switch) {
    routes = <Switch {...with_switch}>{routes}</Switch>;
  }


  return routes;
}




