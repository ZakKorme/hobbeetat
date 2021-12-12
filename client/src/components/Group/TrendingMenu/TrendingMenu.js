import {
  Card,
  CardHeader,
  Paper,
  Avatar,
  Divider,
  Box,
  List,
  ListItem,
  Container,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  ListSubheader
} from "@mui/material";


import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const topThreeTrendingGroups = [
  {
    groupName: "Chess Club",
    groupCredentials: "Admin"
  },
  {
    groupName: "Queens Gambit",
    groupCredentials: "Admin"
  },
  {
    groupName: "Chess Experts",
    groupCredentials: "Admin"
  }
];

const TrendingMenu = () => {
  return (
    <Card
      elevation={1}
      style={{
        width: "50%",
        marginLeft: "2.6%",
        height: "50%"
      }}
    >
      <CardHeader
        title={`Trending Groups`}
        avatar={<LocalFireDepartmentIcon />}
        style={{
          paddinLeft: "1.5rem",
          paddingRight: "1.5rem",
          borderTop: "0",
          paddingBottom: "0"
        }}
        titleTypographyProps={{
          component: Box,
          fontSize: "17px",
          color: "#32325d"
        }}
      />
      <Box>
        <List
          dense
          style={{
            backgroundColor: "white"
          }}
        >
            <Container style={{ display: "inline-flex", justifyContent: "space-between", padding: "0px"}}>
                <ListSubheader>Group Name</ListSubheader>
                <div></div>
                <ListSubheader>Impressions</ListSubheader>
            </Container>
           {topThreeTrendingGroups.map((group,index) => {
            return (
                <>
                <Paper elevation={0}>
                <ListItem
                key={index}
                  secondaryAction={
                      <>
                    <ListItemText>15,000</ListItemText>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      {group.groupName[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemButton style={{ marginRight: "30%", paddingLeft: "1%"}}  alignItems={"center"} dense={true}>
                  <ListItemText
                    primary={group.groupName}
                  />
                  </ListItemButton>
                </ListItem>
                </Paper>
                {/* Do not return divider on the last item */}
                {(topThreeTrendingGroups.length - 1) === index ? null:<Divider/>}
                </>
                  )
                  }
                )}
          <ListItemText style={{ color: "#0645AD" }}>
            <ListItemButton>See All</ListItemButton>
          </ListItemText>
        </List>
      </Box>
    </Card>
  );
};

export default TrendingMenu;
