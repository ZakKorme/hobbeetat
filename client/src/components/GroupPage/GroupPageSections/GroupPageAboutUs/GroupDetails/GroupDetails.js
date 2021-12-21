import { Card, CardContent, Typography } from "@mui/material";

const GroupDetails = () => {
  return (
    <Card sx={{ maxHeight: "336px", marginTop: "2%" }}>
      <CardContent>
        <Typography variant="h6">Details and Privacy Settings</Typography>
        <Typography paragraph={true}>
          <p>
            This is the description of the group. The following paragraph will
            highlight the objects and purpose of the group. This is the
            description of the group. The following paragraph will highlight the
            objects and purpose of the group. This is the description of the
            group. The following paragraph will highlight the objects and
            purpose of the group. This is the description of the group.
          </p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GroupDetails;
