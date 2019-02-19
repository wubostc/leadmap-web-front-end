import * as React from "react";
import { RouteProps } from "react-router-dom";
import { SwitchProps, match, RouteComponentProps, RedirectProps } from "react-router";
import "./index.less";
export declare type future = () => Promise<{
    default: React.ComponentType<any>;
}>;
export interface CAsyncRouteOwnProps_t {
    toload?: future | [future, object];
    toload_matched?: (cm: match) => future | [future, object];
    props?: object;
    renderFactory?: "render" | "component";
}
export interface subMenus_t {
    label: string;
    page: string;
    icon: string;
    subMenus?: subMenus_t[];
}
export interface op_dynamic_router {
    base_path?: string;
    with_switch?: SwitchProps | false;
    with_redirect?: RedirectProps | false;
}
export interface mapping_routes_t {
    [menu_name: string]: LazyLoadingProps_t & {
        with_redirect: RedirectProps | false;
    };
}
export interface ex_routes_t {
    "*": LazyLoadingProps_t;
}
export declare type LazyLoadingProps_t = CAsyncRouteOwnProps_t & RouteComponentProps & RouteProps;
declare type CAsyncRouteProps_t = CAsyncRouteOwnProps_t & RouteComponentProps;
declare type CAsyncRouteState_t = {
    exception: Error;
};
export declare class CAsyncRoute extends React.Component<CAsyncRouteProps_t> {
    private static stack;
    state: CAsyncRouteState_t;
    constructor(props: CAsyncRouteProps_t, context: any);
    render(): JSX.Element;
    shouldComponentUpdate(nextProps: CAsyncRouteProps_t, nextState: CAsyncRouteState_t): any;
    componentDidCatch(exception: Error): void;
    private static redirect_factory;
    static dynamic_renders_routers(subMenus: subMenus_t[], mapping_routes: mapping_routes_t & ex_routes_t, { with_switch, with_redirect, base_path }?: op_dynamic_router): any[] | JSX.Element;
}
export {};
