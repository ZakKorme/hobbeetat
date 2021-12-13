import { List, ListItem, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "&$selected": {
      color: "black",
      backgroundColor: "white",
      "&:hover": {
        color: "black",
        backgroundColor: "white"
      }
    }
  },
  selected: {}
});

const groupPageBar = [
  "Overview",
  "About us",
  "Posts",
  "Pages",
  "Members",
  "Events",
  "Resources"
];

const GroupPageBar = () => {
  const classes = useStyles();
  return (
    <List
      dense
      style={{
        display: "inline-flex",
        marginTop: "0.5%"
      }}
    >
      {groupPageBar.map(btn => {
        return (
          <ListItem
            button
            key={btn}
            sx={{
              borderRadius: "2px",
              fontSize: "13px",
              color: "#919191",
              backgroundColor: "#f2f2f2",
              padding: "2px 25px",
              transition: "all 200ms ease",
              fontFamily: "Helvetica, Arial, sans-serif",
              border: "1px solid #f2f2f2",
              boxShadow:
                "0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)",
              "&:hover": {
                color: "black",
                backgroundColor: "white"
              }
            }}
            classes={{ root: classes.root, selected: classes.selected }}
            selected={btn === "Overview" ? true : null}
          >
            <ListItemText>
              {btn}
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};

export default GroupPageBar;
