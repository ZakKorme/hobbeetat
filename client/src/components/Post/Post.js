import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
  minHeight: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  p: 4
};

const Post = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Card
        elevation={3}
        style={{ height: "100%", marginTop: "4%", color: "#585959" }}
        variant="outlined"
      >
        <div className="flex space-x-4 p-4 items center">
          <Avatar alt="user profile" src="https://www.fillmurray.com/500/900" />
          <div className="flex flex-1">
            <ButtonUnstyled
              variant="outlined"
              className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
              onClick={handleOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              Create a post
            </ButtonUnstyled>
          </div>
        </div>
        <div className="flex justify-evenly p-2 border-t">
          <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-1 rounded-xl cursor-pointer">
            <AddPhotoAlternateIcon fontSize="small" />
            <p className="text-xs sm:text-sm xl:text-base m-0">Photo</p>
          </div>
          <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-1 rounded-xl cursor-pointer">
            <VideoLibraryIcon fontSize="small" />
            <p className="text-xs sm:text-sm xl:text-base m-0">Video</p>
          </div>
          <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-1 rounded-xl cursor-pointer">
            <FileCopyIcon fontSize="small" />
            <p className="text-xs sm:text-sm xl:text-base m-0">Attach File</p>
          </div>
        </div>
        <Modal open={open}>
          <Card sx={style}>
            <CardHeader
              title="Create a Post"
              action={
                <IconButton onClick={handleClose}>
                  <ClearIcon />
                </IconButton>
              }
            />
            <CardContent>
              <TextField
                placeholder="What would you like to share?"
                multiline
                rows={4}
                rowsMax={10}
                style={{
                  marginBottom: 20,
                  minWidth: 350
                }}
              />
            </CardContent>
            <CardActions>
              <Button variant="contained">Post</Button>
            </CardActions>
          </Card>
        </Modal>
      </Card>
    </Box>
  );
};

export default Post;
