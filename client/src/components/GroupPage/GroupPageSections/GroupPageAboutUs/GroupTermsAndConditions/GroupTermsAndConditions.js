import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

const GroupTermsAndConditions = () => {
  return (
    <Card sx={{ maxHeight: "336px", marginTop: "2%", marginBottom: "2%" }}>
      <CardContent>
        <Typography variant="h6">Rules of Conduct</Typography>
        <List>
          <ListItem>
            <ListItemText>
              1. No Spam / Advertising / Self-promote in the forums
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              2. Do not post offensive posts, links or images
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              3. Remain respectful of other members at all times
            </ListItemText>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default GroupTermsAndConditions;
