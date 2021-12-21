import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin/LocationPin";

import classes from "./Map.module.css";

const Map = ({ location, zoomLevel }) => {
  console.log(process.env);
  return (
    <div className={classes["google-map"]}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
        }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
