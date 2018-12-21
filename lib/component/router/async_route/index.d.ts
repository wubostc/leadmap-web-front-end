import * as React from "react";
import { RouteProps } from "react-router-dom";
import { SwitchProps, RedirectProps } from "react-router";
declare type react_lazy_required_async_fn = () => Promise<{
    default: React.ComponentType<any>;
}>;
declare type future = (cm: computedMatchProps) => react_lazy_required_async_fn | [react_lazy_required_async_fn, object];
export interface AsyncRoute_t extends RouteProps {
    toload?: react_lazy_required_async_fn;
    toload_matched?: future;
    key: React.ReactText;
    props?: object;
    useRender?: boolean;
}
export interface subMenus_t {
    label: string;
    page: string;
    icon: string;
    subMenus: subMenus_t[];
}
export interface op_dynamic_router {
    base_path?: string;
    with_switch?: SwitchProps;
    with_redirect?: RedirectProps;
}
export interface mapping_routes_t {
    [menu_name: string]: AsyncRoute_t;
}
declare type computedMatchProps = {
    isExact: boolean;
    params: object;
    path: string;
    url: string;
};
declare type computedMatch_t = {
    computedMatch: computedMatchProps;
};
declare type CAsyncRouteState_t = {
    exception: any;
};
export declare class CAsyncRoute extends React.Component<AsyncRoute_t & computedMatch_t, CAsyncRouteState_t> {
    constructor(props: AsyncRoute_t & computedMatch_t, context: any);
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidCatch(exception: any): void;
    static dynamic_renders_routers(subMenus: subMenus_t[], mapping_routes: mapping_routes_t, { with_switch, with_redirect, base_path }?: op_dynamic_router): JSX.Element;
}
export {};
