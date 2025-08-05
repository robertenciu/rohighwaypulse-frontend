import React, { useEffect, useState, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import osmtogeojson from "osmtogeojson";
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
import { ComponentLoader } from "./Loader";

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
      <HighwayDetailedCard
        highwayName={highway}
        selectedComments={false}
        onClose={onClose}
      ></HighwayDetailedCard>
    </>
  );
};

function RomaniaMap() {
  const highwayGroups = useRef(new Map());
  const [zoom, setZoom] = useState(7);
  const [selectedHighway, setSelectedHighway] = useState(null);
  const [highwaysData, setHighwaysData] = useState(null);
  const HIGHWAYS_CACHE_KEY = "cachedHighwaysData";
  const CACHE_DURATION_MS = 1000 * 60 * 60 * 24;
  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(HIGHWAYS_CACHE_KEY));
      const isValidCache =
        cached && Date.now() - cached.timestamp < CACHE_DURATION_MS;

      if (isValidCache) {
        setHighwaysData(cached.data);
        return;
      }
    } catch (e) {
      console.warn("Cache invalid sau corupt, refacem fetch-ul...");
      localStorage.removeItem(HIGHWAYS_CACHE_KEY);
    }
    fetch(
      `https://overpass-api.de/api/interpreter?data=%2F*%0AThis%20has%20been%20generated%20by%20the%20overpass-turbo%20wizard.%0AThe%20original%20search%20was%3A%0A%E2%80%9C%28highway%3Dmotorway%20or%20%28highway%3Dconstruction%20and%20construction%3Dmotorway%29%20or%20%28highway%3Dproposed%20and%20proposed%3Dmotorway%29%29%20or%20%28ref~%22%5EDEx%22%20and%20%28highway%3Dtrunk%20or%20highway%3Dproposed%20or%20highway%3Dconstruction%29%29%20in%20Romania%E2%80%9D%0A*%2F%0A%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0A%2F%2F%20fetch%20area%20%E2%80%9CRomania%E2%80%9D%20to%20search%20in%0Aarea%28id%3A3600090689%29-%3E.searchArea%3B%0A%2F%2F%20gather%20results%0A%28%0A%20%20nwr%5B%22highway%22%3D%22motorway%22%5D%28area.searchArea%29%3B%0A%20%20nwr%5B%22highway%22%3D%22construction%22%5D%5B%22construction%22%3D%22motorway%22%5D%28area.searchArea%29%3B%0A%20%20nwr%5B%22highway%22%3D%22proposed%22%5D%5B%22proposed%22%3D%22motorway%22%5D%28area.searchArea%29%3B%0A%20%20nwr%5B%22ref%22~%22%5EDEx%22%5D%5B%22highway%22%3D%22trunk%22%5D%28area.searchArea%29%3B%0A%20%20nwr%5B%22ref%22~%22%5EDEx%22%5D%5B%22highway%22%3D%22proposed%22%5D%28area.searchArea%29%3B%0A%20%20nwr%5B%22ref%22~%22%5EDEx%22%5D%5B%22highway%22%3D%22construction%22%5D%28area.searchArea%29%3B%0A%29%3B%0A%2F%2F%20print%20results%0Aout%20geom%3B`
    )
      .then((response) => response.json())
      .then((data) => {
        const geojson = osmtogeojson(data);
        setHighwaysData(geojson);
        localStorage.setItem(
          HIGHWAYS_CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: geojson })
        );
      })
      .catch((error) => console.error("Eroare la fetch:", error));
  }, []);

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
        {!highwaysData && <ComponentLoader />}
        <MapZoomWatcher setZoom={setZoom} />
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="http://www.maptilesapi.com/">MapTiles API</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {highwaysData && (
          <>
            <GeoJSON
              data={structuredClone(highwaysData)}
              style={(feature) => HighwayDrawStyle(feature)}
              onEachFeature={(feature, layer) => onEachFeature(feature, layer)}
            />
            <GeoJSON
              data={structuredClone(highwaysData)}
              style={(feature) => BridgeTunnelDrawStyle(feature, zoom)}
            />
          </>
        )}
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
