"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapboxgl = __importStar(require("mapbox-gl"));
const style_1 = __importDefault(require("./style"));
class Mapbox {
    constructor() {
        this.map = null;
    }
    get_map(options) {
        if (this.map) {
            return this.map;
        }
        this.map = new mapboxgl.Map(options);
        this.map.setStyle(style_1.default);
        return this.map;
    }
}
exports.Mapbox = Mapbox;
