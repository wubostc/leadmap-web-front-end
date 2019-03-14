import * as React from "react";
import { RouteProps } from "react-router-dom";
import { SwitchProps, match, RouteComponentProps, RouteChildrenProps, RedirectProps } from "react-router";
import "./index.less";
export declare namespace lazyloading {
    type future = () => Promise<{
        default: React.ComponentType<any>;
    }>;
    interface CAsyncRouteOwnProps_t {
        toload?: future | [future, object];
        toload_matched?: (cm: match) => future | [future, object];
        props?: object;
        renderFactory?: "render" | "component" | "children";
    }
    interface subMenus_t {
        label: string;
        page: string;
        icon: string;
        subMenus?: subMenus_t[];
    }
    interface op_dynamic_router {
        base_path?: string;
        with_switch?: SwitchProps | false;
        with_redirect?: RedirectProps | false;
    }
    interface mapping_routes_t {
        [menu_name: string]: LazyLoadingProps_t & {
            with_redirect: RedirectProps | false;
        };
    }
    interface ex_routes_t {
        "*": LazyLoadingProps_t;
    }
    type LazyLoadingProps_t = CAsyncRouteOwnProps_t & (RouteComponentProps | RouteChildrenProps) & RouteProps;
    function dynamic_renders_routers(subMenus: subMenus_t[], mapping_routes: mapping_routes_t & ex_routes_t, { with_switch, with_redirect, base_path }?: op_dynamic_router): any;
}
