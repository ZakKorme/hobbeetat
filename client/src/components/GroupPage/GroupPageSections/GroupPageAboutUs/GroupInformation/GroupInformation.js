import { Card, CardContent, Typography, CardHeader } from "@mui/material";

const GroupInformation = props => {
  return (
    <Card sx={{ maxHeight: "350px" }}>
      <CardHeader
        title={props.title ? props.title : "Group Description"}
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
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
