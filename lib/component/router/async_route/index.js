"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const antd_1 = require("antd");
function get_future(toload, toload_matched, computedMatch) {
    if (toload_matched) {
        const future = toload_matched(computedMatch);
        if (future instanceof Array) {
            React.lazy(future[0]);
            return [React.lazy(future[0]), future[1]];
        }
        else {
            return [React.lazy(future)];
        }
    }
    else {
        return [React.lazy(toload)];
    }
}
class CAsyncRoute extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            exception: null,
        };
    }
    render() {
        const { exception } = this.state;
        if (exception)
            return React.createElement(React.Fragment, null, exception);
        const { location, component, render, children, path, exact, sensitive, strict, computedMatch, key, toload, toload_matched, props, useRender = true } = this.props;
        const future = get_future(toload, toload_matched, computedMatch);
        console.assert(!component && !render, `Please use "toload" property instead of either "component" and "render".`);
        const Component = future[0];
        const restProps = Object.assign({}, future[1], props);
        if (useRender) {
            return (React.createElement(react_router_dom_1.Route, Object.assign({}, { key, location, children, path, exact, sensitive, strict, computedMatch }, { render: (route_props) => {
                    return (React.createElement(React.Suspense, { fallback: React.createElement(antd_1.Spin, { wrapperClassName: "AsyncRouterWrapperClass", spinning: true }) },
                        React.createElement(Component, Object.assign({}, Object.assign({}, restProps, route_props)))));
                } })));
        }
        return (React.createElement(react_router_dom_1.Route, Object.assign({}, { key, location, children, path, exact, sensitive, strict, computedMatch }, { component: () => {
                return (React.createElement(React.Suspense, { fallback: React.createElement(antd_1.Spin, { wrapperClassName: "AsyncRouterWrapperClass", spinning: true }) },
                    React.createElement(Component, Object.assign({}, restProps))));
            } })));
    }
    componentDidMount() {
    }
    componentDidCatch(exception) {
        console.error("Failed to load.", exception);
        if (!this.state.exception) {
            this.setState({ exception });
        }
    }
    static dynamic_renders_routers(subMenus, mapping_routes, { with_switch, with_redirect, base_path = "" } = {}) {
        const routes = [];
        const gen_path = (push_path) => {
            const __fn = (_path) => {
                if (!/^\//.test(_path)) {
                    _path = `${base_path}/${_path}`;
                }
                return _path;
            };
            if (typeof push_path === "string") {
                return __fn(push_path);
            }
            else {
                push_path.forEach((v, i, arr_path) => {
                    arr_path[i] = __fn(v);
                });
                return push_path;
            }
        };
        subMenus.forEach((v, i) => {
            if (!mapping_routes[v.page]) {
                console.warn(`The router ${v.page} is not implementioned!`, v);
            }
            else {
                const path = gen_path(mapping_routes[v.page].path);
                const asroute_props = Object.assign({}, mapping_routes[v.page], { path });
                routes.push(React.createElement(CAsyncRoute, Object.assign({ key: i }, asroute_props)));
            }
        });
        const path = gen_path(mapping_routes[subMenus[0].page].path);
        routes.push(React.createElement(react_router_dom_1.Redirect, Object.assign({ key: routes.length }, Object.assign({}, { to: path }, with_redirect))));
        return React.createElement(react_router_dom_1.Switch, Object.assign({}, with_switch), routes);
    }
}
exports.CAsyncRoute = CAsyncRoute;
