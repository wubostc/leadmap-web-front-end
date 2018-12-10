import * as mapboxgl from "mapbox-gl";
declare class Mapbox {
    private map;
    get_map(options: mapboxgl.MapboxOptions): mapboxgl.Map;
}
export { Mapbox };
