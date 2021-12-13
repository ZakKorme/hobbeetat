import { Card, CardContent, Typography, Paper } from "@mui/material";

const GroupInformation = () => {
  return (
    <Card sx={{ maxHeight: "336px" }}>
      <CardContent>
        <Typography variant="h6">Group Description</Typography>
        <Typography paragraph={true}>
          <p>
            This is the description of the group. The following paragraph will
            highlight the objects and purpose of the group. This is the
            description of the group. The following paragraph will highlight the
            objects and purpose of the group. This is the description of the
            group. The following paragraph will highlight the objects and
            purpose of the group. This is the description of the group.
          </p>
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

export default GroupInformation;
