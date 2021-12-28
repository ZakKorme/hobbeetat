import { Card, CardContent, Typography, CardHeader } from "@mui/material";
import { useSelector } from "react-redux";

const GroupInformation = props => {
  const groupState = useSelector(state => state.group);
  const groupDescription = groupState.info.description;
  return (
    <Card sx={{ maxHeight: "350px" }}>
      <CardHeader
        title={props.title ? props.title : "Group Description"}
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <Typography paragraph={true}>
          <p>
            {groupDescription}
          </p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GroupInformation;
