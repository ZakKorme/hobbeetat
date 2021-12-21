import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import GroupPageSidebar from "../../components/GroupPage/GroupPageSidebar/GroupPageSidebar";
import GroupPageLayout from "../../components/GroupPage/GroupPageLayout/GroupPageLayout";

const GroupPage = props => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "block" },
          backgroundColor: "#fafafa"
        }}
      >
        <Grid container>
          <Grid
            container
            item
            direction="row"
            spacing={3}
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{ paddingLeft: "20%" }}
          >
            <Grid item xs={3}>
              <GroupPageSidebar />
            </Grid>

            <Grid item xs>
              <GroupPageLayout />
            </Grid>
            <Grid item xs />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default GroupPage;
