import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ButtonUnstyled from "@mui/core/ButtonUnstyled";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ClearIcon from "@mui/icons-material/Clear";
import classes from "./Post.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  minHeight: 350,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const Post = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Card
        elevation={3}
        style={{ minHeight: 85, marginTop: "5%" }}
        variant="outlined"
      >
        <CardContent style={{ display: "inline-flex", fill: "100%" }}>
          <Avatar alt="user profile" src="https://www.fillmurray.com/500/900" />
          <ButtonUnstyled
            variant="outlined"
            className={classes.post}
            onClick={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            Create a post
          </ButtonUnstyled>
          <Modal open={open}>
            <Card sx={style}>
              <CardHeader
                title="Create a Post"
                action={
                  <IconButton onClick={handleClose}>
                    <ClearIcon />
                  </IconButton>
                }
              ></CardHeader>
              <CardContent>
                <TextField
                  placeholder="What would you like to share?"
                  multiline
                  rows={4}
                  rowsMax={10}
                  style={{
                    marginBottom: 20,
                    minWidth: 350,
                  }}
                />
              </CardContent>
              <CardActions>
                <Button variant="contained">Post</Button>
              </CardActions>
            </Card>
          </Modal>
        </CardContent>
        <CardActions
          className={classes.cardActions}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <IconButton style={{ marginLeft: "10%" }}>
            <AddPhotoAlternateIcon />
            <Typography>Photo</Typography>
          </IconButton>
          <IconButton style={{ marginLeft: "10%" }}>
            <VideoLibraryIcon />
            <Typography>Video</Typography>
          </IconButton>
          <IconButton style={{ marginLeft: "10%" }}>
            <FileCopyIcon />
            <Typography>Attach File</Typography>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
