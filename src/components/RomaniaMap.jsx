import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import motorways from "../utils/Highways.json";
import expressways from "../utils/ExpressWays.json";
import "leaflet/dist/leaflet.css";
import MapZoomWatcher from "../utils/MapZoomWatcher";
import Legend from "./Legend";
import {
  HighwayDrawStyle,
  BridgeTunnelDrawStyle,
} from "../utils/HighwayDrawStyle";
function RomaniaMap() {
  const highwayGroups = useRef(new Map());
  const [zoom, setZoom] = useState(7);

  const onEachFeature = (feature, layer) => {
    if (!feature.properties.ref && !feature.properties.name) {
      return;
    }
    const key = feature.properties.ref || feature.properties.name;

    if (!highwayGroups.current.has(key)) {
      highwayGroups.current.set(key, []);
    }
    highwayGroups.current.get(key).push(layer);
    const initialWeight = layer.options.weight;
    // if (feature.properties) {
    //   const tooltipContent = Object.entries(feature.properties)
    //     .filter(([_, value]) => typeof value !== "object" && value !== null)
    //     .map(([key, value]) => `<b>${key}</b>: ${value}`)
    //     .join("<br>");
    //   layer.bindTooltip(tooltipContent, {
    //     permanent: false,
    //     direction: "top",
    //     opacity: 0.8,
    //     offset: [0, -10],
    //   });
    // }
    layer.on({
      mouseover: (e) => {
        e.target.openTooltip();
        highwayGroups.current.get(key).forEach((l) => {
          l.setStyle({ weight: 9 });
        });
      },
      mouseout: (e) => {
        e.target.closeTooltip();
        highwayGroups.current.get(key).forEach((l) => {
          l.setStyle({ weight: initialWeight });
        });
      },
    });
  };

  const romaniaBounds = [
    [43.5, 20.0], // Sud-Vest
    [48.5, 30.0], // Nord-Est
  ];
  return (
    <>
      <MapContainer
        style={{
          borderRadius: "20px",
          boxShadow: "-10px 10px 10px rgba(0, 0, 0, 0.65)",
        }}
        center={[45.9432, 24.9668]}
        zoom={7}
        minZoom={7}
        maxBounds={romaniaBounds}
        maxBoundsViscosity={1.0}
      >
        <MapZoomWatcher setZoom={setZoom} />
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="http://www.maptilesapi.com/">MapTiles API</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={motorways}
          style={(feature) => HighwayDrawStyle(feature)}
          onEachFeature={(feature, layer) => onEachFeature(feature, layer)}
        />
        <GeoJSON
          data={motorways}
          style={(feature) => BridgeTunnelDrawStyle(feature, zoom)}
        />
        <GeoJSON
          data={expressways}
          style={(feature) => HighwayDrawStyle(feature)}
          onEachFeature={(feature, layer) => onEachFeature(feature, layer)}
        />
        <GeoJSON
          data={expressways}
          style={(feature) => BridgeTunnelDrawStyle(feature, zoom)}
        />
        <Legend />
      </MapContainer>
    </>
  );
}

export default RomaniaMap;
