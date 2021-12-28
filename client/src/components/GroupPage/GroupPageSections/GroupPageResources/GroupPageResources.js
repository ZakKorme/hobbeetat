import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Button,
  Modal
} from "@mui/material";
import ResourceTable from "./ResourceTable/ResourceTable";
import AddResource from "./AddResource/AddResource";

import DocumentIcon from "@mui/icons-material/Article";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LinkIcon from "@mui/icons-material/Link";
import UploadIcon from "@mui/icons-material/Upload";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const GroupPageResources = () => {
  const [notesAndDocuments, setNotesAndDocuments] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [videos, setVideos] = useState(false);
  const [links, setLinks] = useState(false);
  const [value, setValue] = useState(0);
  const [upload, setUpload] = useState(false);

  
  


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNotesAndDocuments = () => {
    setNotesAndDocuments(!notesAndDocuments);
  };
  const handlePhotos = () => {
    setPhotos(!photos);
  };
  const handleVideos = () => {
    setVideos(!videos);
  };
  const handleLinks = () => {
    setLinks(!links);
  };

  const handleUpload = () => {
    setUpload(!upload)
  };

  const AddResourceModal = (
    <Modal open={upload}>
          <AddResource handleClose={handleUpload}/>
        </Modal>
  )
  return (
    <Card>
      <CardHeader
        title="Resources"
        titleTypographyProps={{ variant: "h6" }}
        action={
          <Button startIcon={<UploadIcon />} onClick={handleUpload}>
            Upload
          </Button>
        }
      />
      <Divider />
      {upload ? AddResourceModal : (
      <>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab icon={<DocumentIcon />} label="Documents" iconPosition="start" />
        <Tab
          icon={<AddPhotoAlternateIcon />}
          label="Photos"
          iconPosition="start"
        />
        <Tab icon={<VideoLibraryIcon />} label="Videos" iconPosition="start" />
        <Tab icon={<LinkIcon />} label="Links" iconPosition="start" />
      </Tabs>
      <CardContent>
        {value === 0 ? <ResourceTable type="Documents" /> : null}
        {value === 1 ? <ResourceTable type="Photos" /> : null}
        {value === 2 ? <ResourceTable type="Videos" /> : null}
        {value === 3 ? <ResourceTable type="Links" /> : null}
      </CardContent>
      </>
      )}
    </Card>

    // <Card>
    //   <CardHeader title="Resources" titleTypographyProps={{ variant: "h6" }} />
    //   <Divider />
    //   <CardContent>
    //     <List>
    //       <ListItem
    //         onClick={handleNotesAndDocuments}
    //         secondaryAction={
    //           notesAndDocuments ? <ExpandLess /> : <ExpandMore />
    //         }
    //       >
    //         <ListItemAvatar>
    //           <Avatar>
    //             <DocumentIcon />
    //           </Avatar>
    //         </ListItemAvatar>
    //         <Typography>Notes and Documents</Typography>
    //       </ListItem>
    //       <Collapse in={notesAndDocuments} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           <ListItemButton sx={{ pl: 4 }}>
    //             <ListItemText primary="Starred" />
    //           </ListItemButton>
    //         </List>
    //       </Collapse>
    //       <ListItem
    //         onClick={handlePhotos}
    //         secondaryAction={photos ? <ExpandLess /> : <ExpandMore />}
    //       >
    //         <ListItemAvatar>
    //           <Avatar>
    //             <AddPhotoAlternateIcon />
    //           </Avatar>
    //         </ListItemAvatar>
    //         <Typography>Photos</Typography>
    //       </ListItem>
    //       <Collapse in={photos} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           <ListItemButton sx={{ pl: 4 }}>
    //             <ListItemText primary="Starred" />
    //           </ListItemButton>
    //         </List>
    //       </Collapse>
    //       <ListItem
    //         onClick={handleVideos}
    //         secondaryAction={videos ? <ExpandLess /> : <ExpandMore />}
    //       >
    //         <ListItemAvatar>
    //           <Avatar>
    //             <VideoLibraryIcon />
    //           </Avatar>
    //         </ListItemAvatar>
    //         <Typography>Videos</Typography>
    //       </ListItem>
    //       <Collapse in={videos} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           <ListItemButton sx={{ pl: 4 }}>
    //             <ListItemText primary="Starred" />
    //           </ListItemButton>
    //         </List>
    //       </Collapse>
    //       <ListItem
    //         onClick={handleLinks}
    //         secondaryAction={links ? <ExpandLess /> : <ExpandMore />}
    //       >
    //         <ListItemAvatar>
    //           <Avatar>
    //             <LinkIcon />
    //           </Avatar>
    //         </ListItemAvatar>
    //         <Typography>Links</Typography>
    //       </ListItem>
    //       <Collapse in={links} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           <ListItemButton sx={{ pl: 4 }}>
    //             <ListItemText primary="Starred" />
    //           </ListItemButton>
    //         </List>
    //       </Collapse>
    //     </List>
    //   </CardContent>
    // </Card>
  );
};

export default GroupPageResources;
