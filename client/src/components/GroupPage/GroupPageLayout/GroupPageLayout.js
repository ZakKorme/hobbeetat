import { useState } from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Core Components
import GroupPageOverivew from "../GroupPageSections/GroupPageOverview/GroupPageOverview";
import GroupPageAboutUs from "../GroupPageSections/GroupPageAboutUs/GroupPageAboutUs";
import GroupPagePosts from "../GroupPageSections/GroupPagePosts/GroupPagePosts";
import GroupPageMembers from "../GroupPageSections/GroupPageMembers/GroupPageMembers";
import GroupPageEvents from "../GroupPageSections/GroupPageEvents/GroupPageEvents";

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
  "Members",
  "Events",
  "Resources"
];

const GroupPageLayout = () => {
  const classes = useStyles();
  // Button selection
  const [currentSection, setCurrentSection] = useState("Overview");

  // Components that correspond to each button
  const overviewSection = <GroupPageOverivew />;
  const aboutUsSection = <GroupPageAboutUs />;
  const postSection = <GroupPagePosts />;
  const memberSection = <GroupPageMembers />;
  const eventSection = <GroupPageEvents/>

  // Renders corresponding component
  const [currentSectionComponent, setCurrentSectionComponent] = useState(
    overviewSection
  );

  const handleSectionChange = event => {
    setCurrentSection(event.target.outerText);
    switch (event.target.outerText) {
      case "Overview":
        setCurrentSectionComponent(overviewSection);
        break;
      case "About us":
        setCurrentSectionComponent(aboutUsSection);
        break;
      case "Posts":
        setCurrentSectionComponent(postSection);
        break;
      case "Members":
        setCurrentSectionComponent(memberSection);
        break;
      case "Events":
        setCurrentSectionComponent(eventSection)
        break;
      default:
        setCurrentSectionComponent(null);
    }
  };

  return (
    <>
      <List
        dense
        style={{
          display: "inline-flex",
          marginTop: "0.5%"
        }}
      >
        {groupPageBar.map(btn => {
          return (
            <ListItemButton
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
              value={btn}
              classes={{ root: classes.root, selected: classes.selected }}
              selected={currentSection === btn ? true : false}
              onClick={event => handleSectionChange(event)}
            >
              <ListItemText>
                {btn}
              </ListItemText>
            </ListItemButton>
          );
        })}
      </List>
      {currentSectionComponent}
    </>
  );
};

export default GroupPageLayout;
