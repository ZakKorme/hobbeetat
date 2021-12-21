import { useState } from "react";
import {
  Card,
  CardHeader,
  ButtonGroup,
  Button,
  Divider,
  Typography,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  IconButton
} from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import SelectedEvent from "./SelectedEvent/SelectedEvent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const events = [
  {
    title: "Chess Study Group",
    date: "2021-12-21",
    startTime: "18:00",
    description: "This is the description for the first event.",
    location: "Washington, DC",
    address: "717 Devonshire rd, Takoma Park MD 21144",
    eventImg: "https://picsum.photos/200/200/",
    eventCreator: "Zak Korme",
    price: 0
  },
  {
    title: "Chess Study Group",
    date: "2021-12-21",
    startTime: "18:00",
    description: "This is the description for the first event.",
    location: "Washington, DC",
    address: "717 Devonshire rd, Takoma Park MD 21144",
    eventImg: "https://picsum.photos/200/200/",
    eventCreator: "Zak Korme",
    price: 0
  },
  {
    title: "Chess Study Group",
    date: "2021-12-21",
    startTime: "18:00",
    description: "This is the description for the first event.",
    location: "Washington, DC",
    address: "717 Devonshire rd, Takoma Park MD 21144",
    eventImg: "https://picsum.photos/200/200/",
    eventCreator: "Zak Korme",
    price: 0
  },
  {
    title: "Chess Study Group",
    date: "2021-12-21",
    startTime: "18:00",
    description: "This is the description for the first event.",
    location: "Washington, DC",
    address: "717 Devonshire rd, Takoma Park MD 21144",
    eventImg: "https://picsum.photos/200/200/",
    eventCreator: "Zak Korme",
    price: 0
  }
];

const monthList = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
};

const GroupPageEvents = () => {
  const [eventSelected, setEventSelected] = useState(null);

  const handleEventSelection = event => {
    setEventSelected(event);
  };

  const handleHeaderButtons = () => {
    setEventSelected(null);
  };

  const eventListComponent = (
    <CardContent>
      <List>
        {events.map((event, index) => {
          let day = event.date.split("-")[2];
          let monthNum = event.date.split("-")[1];
          let monthName = Object.keys(monthList).find(
            month => Number(monthNum) === monthList[month]
          );
          return (
            <ListItem key={index}>
              <div>
                <Typography
                  style={{
                    marginLeft: "10%",
                    fontWeight: "bold",
                    fontSize: "20px"
                  }}
                >
                  {day}
                </Typography>
                <Typography style={{ marginLeft: "6%" }}>
                  {monthName}
                </Typography>
                <IconButton
                  color="inherit"
                  aria-label="upload picture"
                  style={{ padding: 0, marginLeft: "6%" }}
                >
                  <BookmarkAddIcon />
                </IconButton>
              </div>
              <ListItemButton
                key={index}
                alignItems="flex-start"
                onClick={() => handleEventSelection(event)}
              >
                <div style={{ display: "inline-flex" }}>
                  <div style={{ paddingLeft: "3%", height: 30, width: 400 }}>
                    <Typography variant="h6">
                      {event.title}
                    </Typography>
                    <Typography variant="body2">
                      {`Mon - ${event.startTime} PM`}
                    </Typography>
                    <Typography variant="body2">
                      {event.location}
                    </Typography>
                  </div>
                  <div
                    style={{
                      height: 100,
                      width: 100,
                      flexDirection: "flex-end"
                    }}
                  >
                    <img alt="event img" src={event.eventImg} />
                  </div>
                </div>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </CardContent>
  );

  return (
    <Card>
      <CardHeader
        title="Events"
        titleTypographyProps={{ variant: "h6" }}
        action={
          eventSelected
            ? <Button
                size="small"
                style={{
                  border: "1px solid",
                  borderRadius: "14px",
                  JustifyContent: "spaceAround",
                  fontSize: "11px"
                }}
                onClick={handleHeaderButtons}
              >
                <ArrowBackIcon fontSize="small" /> Event List
              </Button>
            : <ButtonGroup size="small" sx={{ pt: 2 }}>
                <Button
                  style={{
                    borderRadius: "14px",
                    JustifyContent: "spaceAround",
                    fontSize: "11px"
                  }}
                >
                  Online Events
                </Button>
                <Button
                  style={{
                    borderRadius: "14px",
                    JustifyContent: "spaceAround",
                    fontSize: "11px"
                  }}
                >
                  Today
                </Button>
                <Button
                  style={{
                    borderRadius: "14px",
                    JustifyContent: "spaceAround",
                    fontSize: "11px"
                  }}
                >
                  This Week
                </Button>
                <Button
                  style={{
                    borderRadius: "14px",
                    JustifyContent: "spaceAround",
                    fontSize: "11px"
                  }}
                >
                  This Month
                </Button>
              </ButtonGroup>
        }
      />

      <Divider />
      {eventSelected
        ? <SelectedEvent event={eventSelected} />
        : eventListComponent}
    </Card>
  );
};

export default GroupPageEvents;
