import { useState } from "react";
import {
  Card,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Button,
  ButtonGroup,
  CardHeader
} from "@mui/material";
import { capitalize } from "../../../../utils/index";

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: true,
    isModerator: true,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: true,
    isModerator: true,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: true,
    isModerator: false,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: false,
    isModerator: true,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: true,
    isModerator: true,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: true,
    isModerator: true,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: true,
    isModerator: false,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: false,
    isModerator: true,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: false,
    isModerator: true,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: false,
    isModerator: true,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: true,
    isModerator: false,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: false,
    isModerator: false,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: false,
    isModerator: false,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: false,
    isModerator: false,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: true,
    isModerator: false,
    profileImg: "https://picsum.photos/200/200/"
  },
  {
    firstName: "John",
    lastName: "Doe",
    isAdmin: false,
    isModerator: false,
    profileImg: "https://picsum.photos/200/200/"
  }
];

const GroupPageMembers = () => {
  const [selectedUser, setSelectedUser] = useState(users);
  const [filterTitle, setFilterTitle] = useState("All Members");

  const handleAllMembers = event => {
    let tempTitle = event.target.outerText.toLowerCase().split(" ");
    let capitalizedTitle = "";

    for (let word of tempTitle) {
      // If the title has two words we add space
      if (capitalize) {
        capitalizedTitle += " " + capitalize(word);
      } else {
        capitalizedTitle += capitalize(word);
      }
    }
    setFilterTitle(capitalizedTitle);
    setSelectedUser(users);
  };

  const handleAdmins = event => {
    let filterAdmins = users.filter(user => user.isAdmin === true);
    let tempTitle = event.target.outerText.toLowerCase().split(" ");
    let capitalizedTitle = "";

    for (let word of tempTitle) {
      // If the title has two words we add space
      if (capitalize) {
        capitalizedTitle += " " + capitalize(word);
      } else {
        capitalizedTitle += capitalize(word);
      }
    }
    setFilterTitle(capitalizedTitle);
    setSelectedUser(filterAdmins);
  };
  const handleModerators = event => {
    let filterModerators = users.filter(user => user.isModerator === true);
    let tempTitle = event.target.outerText.toLowerCase().split(" ");
    let capitalizedTitle = "";

    for (let word of tempTitle) {
      // If the title has two words we add space
      if (capitalize) {
        capitalizedTitle += " " + capitalize(word);
      } else {
        capitalizedTitle += capitalize(word);
      }
    }
    setFilterTitle(capitalizedTitle);
    setSelectedUser(filterModerators);
  };

  return (
    <Card sx={{ marginBottom: "2%" }}>
      <CardHeader
        title="Members"
        titleTypographyProps={{ variant: "h6" }}
        subheader={filterTitle}
        action={
          <ButtonGroup size="small" variant="outlined">
            <Button
              onClick={handleAllMembers}
              style={{
                borderRadius: "14px",
                JustifyContent: "spaceAround",
                fontSize: "11px"
              }}
            >
              All Members
            </Button>
            <Button
              onClick={handleAdmins}
              style={{
                borderRadius: "14px",
                JustifyContent: "spaceAround",
                fontSize: "11px"
              }}
            >
              Admins
            </Button>
            <Button
              onClick={handleModerators}
              style={{
                borderRadius: "14px",
                JustifyContent: "spaceAround",
                fontSize: "11px"
              }}
            >
              Moderators
            </Button>
          </ButtonGroup>
        }
      />

      <List dense>
        {selectedUser.map((user, index) => {
          let role = user.isAdmin ? "Admin" : null;
          let moderator = user.isModerator ? "Moderator" : null;
          let secondaryStr;
          if (role && moderator) {
            secondaryStr = `${role} & ${moderator}`;
          } else if (role) {
            secondaryStr = `${role}`;
          } else if (moderator) {
            secondaryStr = `${moderator}`;
          }

          return (
            <ListItem
              key={index}
              alignItems="center"
              divider={selectedUser.length - 1 === index ? false : true}
            >
              <ListItemAvatar>
                <Avatar src={user.profileImg} />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={secondaryStr ? secondaryStr : null}
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default GroupPageMembers;
