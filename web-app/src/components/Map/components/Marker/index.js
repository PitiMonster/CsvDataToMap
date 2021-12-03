import * as React from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import Leaflet from "leaflet";

const CustomMarker = (props) => {
  const { longitude, latitude, color, category } = props;
  const [markerIcon, setMarkerIcon] = React.useState(null);

  React.useEffect(() => {
    const markerStyles = `background-color: ${color};
      width: 3rem;
      height: 3rem;
      display: block;
      left: -1.5rem;
      top: -1.5rem;
      position: relative;
      border-radius: 3rem 3rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF`;

    const icon = Leaflet.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<span style="${markerStyles}" />`,
    });

    setMarkerIcon(icon);
  }, [color]);

  if (!markerIcon) return <></>;

  return (
    <Marker position={[latitude, longitude]} icon={markerIcon}>
      <Popup>{category}</Popup>
    </Marker>
  );
};

export default CustomMarker;
