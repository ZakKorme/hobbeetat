import LocationPinIcon from "@mui/icons-material/LocationOn";

import classes from "../Map.module.css";

const LocationPin = ({ text }) =>
  <div className={classes.pin}>
    <LocationPinIcon className={classes["pin-icon"]} />
    <p className={classes["pin-text"]}>
      {text}
    </p>
  </div>;

export default LocationPin;
