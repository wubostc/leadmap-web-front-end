import * as mapboxgl from "mapbox-gl";
import default_style from "./style";


class Mapbox {

  private map: mapboxgl.Map = null;

  public get_map(options: mapboxgl.MapboxOptions) {
    if (this.map) {
      return this.map;
    }
    this.map = new mapboxgl.Map(options);
    this.map.setStyle(default_style);
    return this.map;
  }

}



export { Mapbox };
