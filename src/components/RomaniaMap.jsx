import React, { useEffect, useState, useRef } from "react";
import ReactDOMServer from "react-dom/server";
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
import HighwayDetailedCard from "./HighwayDetailedCard";
import ModelWrapper from "./ModelWrapper";
import { isDex } from "../utils/highwayUtils";

const highwayTooltip = (highwayName) => {
  return ReactDOMServer.renderToStaticMarkup(
    <div
      style={{
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "3rem",
        fontWeight: "bold",
        height: "5rem",
        width: "10rem",
        cursor: "default",
        ...isDex(highwayName),
      }}
    >
      {highwayName}
    </div>
  );
};

const onHighwayClick = (highway, onClose) => {
  return (
    <>
      <ModelWrapper onClose={onClose}>
        <HighwayDetailedCard
          highwayName={highway}
          selectedComments={false}
          onClose={onClose}
        ></HighwayDetailedCard>
      </ModelWrapper>
    </>
  );
};

function RomaniaMap() {
  const highwayGroups = useRef(new Map());
  const [zoom, setZoom] = useState(7);
  const [selectedHighway, setSelectedHighway] = useState(null);

  const onEachFeature = (feature, layer, onClose) => {
    if (!feature.properties.ref && !feature.properties.name) {
      return;
    }
    const key = feature.properties.ref || feature.properties.name;

    if (!highwayGroups.current.has(key)) {
      highwayGroups.current.set(key, []);
    }
    highwayGroups.current.get(key).push(layer);

    if (feature.properties) {
      layer.bindTooltip(highwayTooltip(key), {
        permanent: false,
        direction: "top",
        opacity: 0.8,
        offset: [0, -10],
      });
    }

    const initialWeight = layer.options.weight;
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
      click: (e) => {
        setSelectedHighway(feature.properties.ref || feature.properties.name);
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
      {selectedHighway &&
        onHighwayClick(selectedHighway, () => {
          setSelectedHighway(null);
        })}
    </>
  );
}

export default RomaniaMap;
