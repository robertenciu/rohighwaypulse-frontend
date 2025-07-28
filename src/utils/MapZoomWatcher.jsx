import { useMap } from "react-leaflet";
import { useEffect } from "react";

const MapZoomWatcher = ({ setZoom }) => {
  const map = useMap();

  useEffect(() => {
    const handleZoom = () => {
      console.log(map.getZoom());
      setZoom(map.getZoom());
    };

    map.on("zoomend", handleZoom);
    handleZoom();

    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map, setZoom]);

  return null;
};

export default MapZoomWatcher;
