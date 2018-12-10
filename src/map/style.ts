import * as mapboxgl from "mapbox-gl";

const style: mapboxgl.Style = {
  version: 8,
  sources: {
    parkpts: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:parkpts&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    greenground: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:greenground&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    rivers: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:water&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    river: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:river&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    buildings: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:buildings&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    jiewuguan: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:jiewuguan&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    roads: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:roads&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    roadnet: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:roadnet&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    provincialhighway: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:provincialhighway&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    countyroad: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:countyroad&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    expressway: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:expressway&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    reservoir: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:reservoir&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    },
    sewagepipe: {
      type: "vector",
      tiles: [
        "http://183.129.204.238:8083/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cangshan:sewagepipe&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"
      ]
    }
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#F2F5F7",
        "background-opacity": 1
      }
    },
    {
      id: "greenground",
      type: "fill",
      source: "greenground",
      "source-layer": "greenground",
      layout: {
        visibility: "visible"
      },
      paint: {
        "fill-color": "#C0E4BE",
        "fill-translate": [0, 0]
      }
    },
    // {
    //     "id":"roads",
    //     "type":"line",
    //     "source":"roads",
    //     "source-layer":"roads",
    //     "layout": {
    //         "visibility": "visible"
    //     },
    //     "paint": {
    //         "line-color": "hsl(42, 0%, 100%)",
    //         "line-opacity": 1,
    //         "line-width": 3
    //     }
    // },
    {
      id: "roadnet",
      type: "fill",
      source: "roadnet",
      "source-layer": "roadnet",
      layout: {
        visibility: "visible"
      },
      paint: {
        "fill-color": "#fff",
        // "fill-outline-color":"#D0D0D0",
        "fill-translate": [0, 0]
      }
    },
    {
      id: "expressway",
      type: "line",
      source: "expressway",
      "source-layer": "expressway",
      layout: {
        visibility: "visible"
      },
      paint: {
        "line-color": "#ebdca4",
        "line-opacity": 1,
        "line-width": 5
      }
    },
    {
      id: "provincialhighway",
      type: "line",
      source: "provincialhighway",
      "source-layer": "provincialhighway",
      layout: {
        visibility: "visible"
      },
      paint: {
        "line-color": "#ebdca4",
        "line-opacity": 1,
        "line-width": 4
      }
    },
    {
      id: "countyroad",
      type: "line",
      source: "countyroad",
      "source-layer": "countyroad",
      layout: {
        visibility: "visible"
      },
      paint: {
        "line-color": "#FFDB86",
        "line-opacity": 1,
        "line-width": 3
      }
    },
    {
      id: "buildings",
      type: "fill-extrusion",
      source: "buildings",
      "source-layer": "buildings",
      layout: { visibility: "none" },
      paint: {
        "fill-extrusion-height": 30,
        "fill-extrusion-color": "hsl(210, 20%, 97%)",
        "fill-extrusion-opacity": 0.53
      }
    },
    {
      id: "rivers",
      type: "fill",
      source: "rivers",
      "source-layer": "water",
      layout: {
        visibility: "visible"
      },
      paint: {
        "fill-color": "#BFDAF8",
        "fill-translate": [0, 0]
      }
    },

    // {
    //     "id":"river",
    //     "type":"fill",
    //     "source":"river",
    //     "source-layer":"river",
    //     "layout": {
    //         "visibility": "visible"
    //     },
    //     "interactive" :false,
    //     "paint": {
    //         "fill-color": [
    //             "match",["get","objectid"],
    //             14,"#88ace7",
    //             "#88ace7"
    //         ]
    //     }
    // },
    {
      id: "jiewuguan",
      type: "line",
      source: "jiewuguan",
      "source-layer": "jiewuguan",
      minzoom: 11.9,
      maxzoom: 21.7,
      layout: {},
      paint: {
        "line-color": "#F51205",
        "line-dasharray": [4, 2]
      }
    },
    {
      id: "reservoir",
      type: "line",
      source: "reservoir",
      "source-layer": "reservoir",
      layout: {
        visibility: "visible"
      },
      paint: {
        "line-color": "hsl(16, 62%, 54%)",
        "line-width": 4
      }
    },
    {
      id: "sewagepipe",
      type: "line",
      source: "sewagepipe",
      "source-layer": "sewagepipe",
      layout: {
        visibility: "none"
      },
      paint: {
        "line-color": "rgb(146, 100, 216)",
        "line-width": 3
      }
    }
  ]
};

export default style;
