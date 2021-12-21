import {
  Card,
  Avatar,
  CardHeader,
  ButtonGroup,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CardMedia,
  CardContent,
  Grid
} from "@mui/material";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";
import Interpunct from "react-interpunct";

const GroupPage = () => {
  return (
    <Grid container>
      <Grid
        container
        item
        spacing={1}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh", marginTop: "1%" }}
      >
        <Grid item xs={3}>
          <Card>
            <div style={{ marginBottom: "22%" }}>
              <CardMedia
                component="img"
                height="400"
                image="https://www.fillmurray.com/400/300"
                alt="group-cover-img"
              />
              <CardMedia
                component="img"
                height="400"
                image="https://www.fillmurray.com/500/900"
                alt="group-cover-img"
                sx={{
                  width: 90,
                  height: 90,
                  border: "3px solid white",
                  position: "absolute",
                  justifyContent: "center",
                  marginLeft: "6%",
                  marginTop: "-2%",
                  borderRadius: "50%",
                  zIndex: "1"
                }}
              />
            </div>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingLeft: "0"
              }}
            >
              <ButtonGroup>
                <IconButton>
                  <BookmarkIcon />
                </IconButton>
                <IconButton>
                  <SearchIcon />
                </IconButton>
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </ButtonGroup>
            </CardContent>
            <Typography align="center" style={{ fontWeight: "bold" }}>
              Chess Club
            </Typography>
            <Typography
              align="center "
              style={{
                fontSize: "12px",
                color: "#939496",
                fontWeight: "bold",
                paddingBottom: "10%"
              }}
            >
              <LockIcon
                size="small"
                sx={{ color: "#999b9e", fontSize: "17px" }}
              />{" "}
              Closed <Interpunct>Group 9,000</Interpunct> members
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              subheader={"Admins"}
              sx={{ justifyContent: "left" }}
              style={{ paddingBottom: "2px" }}
            />
            <CardContent style={{ paddingTop: "0" }}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper"
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src="https://www.fillmurray.com/400/300" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="John Smith"
                    secondary={"Founder of Chess Club"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src="https://www.fillmurray.com/400/300" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Jane Doe"
                    secondary="Founder of Chess Club"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src="https://www.fillmurray.com/400/300" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Terry Smith"
                    secondary="Event Coordinator of Chess Club"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default GroupPage;
