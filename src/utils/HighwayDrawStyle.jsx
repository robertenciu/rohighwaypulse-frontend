const defaultHighwayStyle = {
  color: "#198754",
  weight: 5,
  opacity: 1,
  dashArray: null,
  stroke: true,
};

export function HighwayDrawStyle(feature) {
  const props = feature.properties;
  let style = { ...defaultHighwayStyle };

  if (props.start_date) {
    return style;
  }
  if (typeof props.status === "string") {
    const statusMatch = props.status.match(/progress:(\d+(\.\d+)?)%/);

    if (statusMatch) {
      const progress = parseFloat(statusMatch[1]);
      if (progress < 20) {
        style.color = "red";
        style.weight = 4;
        return style;
      }
      if (progress < 40) {
        style.color = "#ff6f00";
        return style;
      }
      if (progress < 60) {
        style.color = "#fff700";
        return style;
      }

      if (progress < 80) {
        style.color = "#00ffae";
        return style;
      }
      if (progress < 100) {
        style.color = "#62ff00";
        return style;
      }
    }

    if (props.status.includes("builder") || props.status.includes("winner")) {
      style.color = "#990000";
      style.weight = 4;
      return style;
    }
  }
  switch (props.highway) {
    case "construction":
      style.color = "red";
      break;
    case "proposed":
      style.color = "gray";
      style.weight = 4;
      style.opacity = 0.8;
      break;
    default:
      break;
  }

  return style;
}

export function BridgeTunnelDrawStyle(feature, zoom) {
  const props = feature.properties;
  let style = { ...defaultHighwayStyle };

  if (zoom >= 10 && props.bridge?.toLowerCase().includes("yes")) {
    style.color = "#7ca2de";
    style.weight = 3;
    style.dashArray = "30, 8";
    return style;
  }

  if (
    zoom >= 10 &&
    (props.name?.toLowerCase().includes("tunel") || props.tunnel)
  ) {
    style.color = "black";
    style.weight = 3;
    return style;
  }
  style.stroke = false;
  return style;
}
