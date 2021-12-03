import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import classes from "./index.module.scss";
import "./map.scss";

import { markerColors } from "../../contants";

import { Context as CsvDataContext } from "../../context/CsvDataContext";
import CustomMarker from "./components/Marker";

const Map = () => {
  const { state } = React.useContext(CsvDataContext);

  const [markers, setMarkers] = React.useState([]);
  const [mapCenter, setMapCenter] = React.useState([]);

  React.useEffect(() => {}, [state.csvData]);

  React.useEffect(() => {
    // const tempData = [
    //   {
    //     latitude: 51.123244,
    //     longitude: 17.043798,
    //     label: "test1",
    //   },
    //   {
    //     latitude: 51.1232,
    //     longitude: 17.0437,
    //     label: "test2",
    //   },
    //   {
    //     latitude: 51.12326,
    //     longitude: 17.04376,
    //     label: "test3",
    //   },
    //   {
    //     latitude: 51.1235,
    //     longitude: 17.0433,
    //     label: "test4",
    //   },
    //   {
    //     latitude: 51.1231,
    //     longitude: 17.0433,
    //     label: "test5",
    //   },
    //   {
    //     latitude: 51.123299,
    //     longitude: 17.04371,
    //     label: "test6",
    //   },
    //   {
    //     latitude: 51.1238,
    //     longitude: 17.0431,
    //     label: "test7",
    //   },
    // ];
    if (state.coordinates.length > 0) {
      let latSum = 0;
      let longSum = 0;
      const categories = {};
      const newMarkers = state.coordinates.map((data, index) => {
        latSum += data.latitude;
        longSum += data.longitude;
        let color = categories[data.category];
        if (!color) {
          color = markerColors[index];
          categories[data.category] = color;
        }
        return <CustomMarker key={data.id} {...data} color={color} />;
      });

      setMapCenter([
        latSum / state.coordinates.length,
        longSum / state.coordinates.length,
      ]);
      setMarkers(newMarkers);
    }
  }, [state.coordinates]);

  if (!markers || !mapCenter.length || !state.coordinates.length) return <></>;

  return (
    <div className={classes.container}>
      <MapContainer id="map" center={mapCenter} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </MapContainer>
    </div>
  );
};

export default Map;
