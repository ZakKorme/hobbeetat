import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  Avatar,
  AvatarGroup,
  ButtonGroup,
  ListItemButton
} from "@mui/material";
import MapComponent from "../../../../Map/Map";

import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoney from "@mui/icons-material/AttachMoney";

const location = {
  address: "1600 Amphitheatre Parkway, Mountain View, california.",
  lat: 37.42216,
  lng: -122.08427
};

const SelectedEvent = props => {
  const [eventRSVPAttend, setEventRSVPAttend] = useState("");
  const [eventRSVPNotAttend, setEventRSVPNotAttend] = useState("");
  const [eventRSVPMaybeAttend, setEventRSVPMaybeAttend] = useState("");

  const handleRSVPAttend = () => {
    setEventRSVPAttend(!eventRSVPAttend);
    setEventRSVPMaybeAttend("");
    setEventRSVPNotAttend("");
  };

  const handleRSVPNotAttend = () => {
    setEventRSVPNotAttend(!eventRSVPNotAttend);
    setEventRSVPAttend("");
    setEventRSVPMaybeAttend("");
  };

  const handleRSVPMaybeAttend = () => {
    setEventRSVPMaybeAttend(!eventRSVPMaybeAttend);
    setEventRSVPAttend("");
    setEventRSVPNotAttend("");
  };

  return (
    <Card>
      <div style={{ display: "flex", width: "100%" }}>
        <CardMedia
          component="img"
          image={props.event.img}
          alt="event-img"
          sx={{
            height: "40%",
            width: "40%"
          }}
        />
      </div>
      <CardContent>
        <Typography variant="h6">
          {props.event.title}
        </Typography>
        <Divider />
        <List>
          <ListItem>
            <Typography variant="subtitle1">
              <strong>Details</strong>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              <AccessTimeFilledIcon fontSize="small" /> {props.event.date},{" "}
              {props.event.startTime} PM
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              <LocationOnIcon /> {props.event.location}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              <PublicIcon /> {" "}
              {props.event.link
                ? props.event.link
                : "No Link Provided By Event Creator"}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              <PersonIcon />{" "}
              {`${props.event["event_creator"]["first_name"]} ${props.event[
                "event_creator"
              ]["last_name"]}`}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              <AttachMoney />{" "}
              {props.event.price <= 0 ? "Free" : props.event.price}
            </Typography>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Typography variant="subtitle1">
              <strong>Description</strong>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              {props.event.description}
              {props.event.description}
              {props.event.description}
              {props.event.description}
            </Typography>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Typography variant="subtitle1">
              <strong>Attendees</strong>
            </Typography>
          </ListItem>
          <ListItem>
            <AvatarGroup max={4} variant="circular">
              <Avatar alt="Remy Sharp" src="https://picsum.photos/200/200/" />
              <Avatar
                alt="Travis Howard"
                src="https://picsum.photos/200/200/"
              />
              <Avatar alt="Agnes Walker" src="https://picsum.photos/200/200/" />
              <Avatar
                alt="Trevor Henderson"
                src="https://picsum.photos/200/200/"
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://picsum.photos/200/200/"
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://picsum.photos/200/200/"
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://picsum.photos/200/200/"
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://picsum.photos/200/200/"
              />
            </AvatarGroup>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Typography variant="subtitle1">
              <strong>RSVP</strong>
            </Typography>
          </ListItem>
          <ListItem>
            <ButtonGroup>
              <ListItemButton
                selected={eventRSVPAttend ? true : false}
                onClick={handleRSVPAttend}
              >
                Yes
              </ListItemButton>
              <ListItemButton
                selected={eventRSVPNotAttend ? true : false}
                onClick={handleRSVPNotAttend}
              >
                No
              </ListItemButton>
              <ListItemButton
                selected={eventRSVPMaybeAttend ? true : false}
                onClick={handleRSVPMaybeAttend}
              >
                Maybe
              </ListItemButton>
            </ButtonGroup>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Typography variant="subtitle1">
              <strong>Map</strong>
            </Typography>
          </ListItem>
          <div>
            <MapComponent location={location} zoomLevel={15} />
          </div>
          <ListItem />
        </List>
      </CardContent>
    </Card>
  );
};

export default SelectedEvent;
