import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import motorways from "../utils/Highways.json";
import expressways from "../utils/ExpressWays.json";
import "leaflet/dist/leaflet.css";
import { useRef, useMap } from "react";
import MapZoomWatcher from "../utils/MapZoomWatcher";

function HomePage() {
  const highwayGroups = useRef(new Map());
  const [zoom, setZoom] = useState(7);

  const highwayStyle = {
    color: "#198754",
    weight: 5,
    opacity: 1,
    dashArray: null,
  };
  const styleFeature = (feature) => {
    const props = feature.properties;
    let style = { ...highwayStyle };

    if (zoom >= 10 && props.bridge?.toLowerCase().includes("yes")) {
      style.color = "#a9c916";
      style.weight = 3;
      return style;
    }

    if (zoom >= 10 && props.name?.toLowerCase().includes("tunel")) {
      style.color = "black";
      style.weight = 3;
      return style;
    }

    if (props.name?.includes("Craiova-TgJiu")) {
      style.color = "orange";
      style.weight = 5;
      return style;
    }

    switch (props.highway) {
      case "construction":
        style.color = "orange";
        style.weight = 4;
        break;
      case "proposed":
        style.color = "gray";
        style.weight = 4;
        break;
      case "trunk":
      case "trunk_link":
        style.color = "#e00a0a"; // culoare drum express
        style.weight = 5;
        break;
      default:
        break;
    }

    return style;
  };
  const onEachFeature = (feature, layer, zoom) => {
    if (!feature.properties.ref && !feature.properties.name) {
      return;
    }
    const key = feature.properties.ref || feature.properties.name;

    if (!highwayGroups.current.has(key)) {
      highwayGroups.current.set(key, []);
    }
    highwayGroups.current.get(key).push(layer);
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
        console.log({ zoom });
        highwayGroups.current.get(key).forEach((l) => {
          l.setStyle({ weight: 11 });
        });
      },
      mouseout: (e) => {
        e.target.closeTooltip();
        highwayGroups.current.get(key).forEach((l) => {
          const baseStyle = styleFeature(l.feature, zoom);
          l.setStyle({weight: baseStyle.weight});
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
      <h2 className="my-3 display-3 fade-in text-center">Hartă</h2>
      <hr className="hr"></hr>
      <div
        className="fade-in"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <MapContainer
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
            style={(feature) => styleFeature(feature, zoom)}
            onEachFeature={(feature, layer) =>
              onEachFeature(feature, layer, zoom)
            }
          />
          <GeoJSON
            data={expressways}
            style={(feature) => styleFeature(feature, zoom)}
            onEachFeature={(feature, layer) =>
              onEachFeature(feature, layer, zoom)
            }
          />
        </MapContainer>
      </div>
    </>
  );
}

export default HomePage;
