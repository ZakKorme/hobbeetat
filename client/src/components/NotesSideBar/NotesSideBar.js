import { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Button,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditableTextField from "./EditableTextField/EditableTextField";

const drawerWidth = 350;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start"
}));

const defaultNotes = [
  {
    title: "Note 1",
    value: "This is the text of the first note",
    html:
      "<p>fdafdfafdafa</p><p><br></p><p>fdasfds</p><p><br></p><p>fdafdafadfas</p>"
  },
  {
    title: "Note 2",
    value: "This is the text of the second note",
    html:
      "<p>fdafdfafdafa</p><p><br></p><p>fdasfds</p><p><br></p><p>fdafdafadfas</p>"
  },
  {
    title: "Note 3",
    value: "This is the text of the third note",
    html:
      "<p>fdafdfafdafa</p><p><br></p><p>fdasfds</p><p><br></p><p>fdafdafadfas</p>"
  },
  {
    title: "Note 4",
    value: "This is the text of the forth note",
    html:
      "<p>fdafdfafdafa</p><p><br></p><p>fdasfds</p><p><br></p><p>fdafdafadfas</p>"
  }
];

const NotesSideBar = props => {
  const theme = useTheme();
  const [open, setOpen] = useState(props.open);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedNoteTitle, setSelectedNoteTitle] = useState(null);
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState(defaultNotes);

  const handleDrawerClose = () => {
    props.close();
  };

  const handleSelectedNote = note => {
    console.log(note);
    setSelectedNote(note);
    setSelectedNoteTitle(note.title);
    setValue(note.html);
  };

  const handleClearNote = () => {
    setSelectedNote(null);
    setSelectedNoteTitle(null);
    setValue(null);
  };

  const handleNewNote = () => {
    setNotes([
      ...notes,
      {
        title: "New Note",
        value: "",
        html: ""
      }
    ]);
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth
        },
        position: "relative",
        zIndex: 1400
      }}
      variant="perminant"
      anchor="right"
      open={open}
    >
      <div />
      <DrawerHeader>
        <IconButton>
          {selectedNoteTitle
            ? <ChevronLeftIcon onClick={handleClearNote} />
            : <ChevronRightIcon onClick={handleDrawerClose} />}
        </IconButton>
        <div />
        {selectedNoteTitle
          ? <div
              styles={{
                fontFamily: "sans-serif",
                textAlign: "center"
              }}
            >
              <EditableTextField value={selectedNoteTitle} />
            </div>
          : <Button onClick={handleNewNote}>NEW NOTE</Button>}
      </DrawerHeader>
      <Divider />
      {selectedNote
        ? <ReactQuill
            theme="snow"
            defaultValue={value}
            value={value}
            onChange={value => {
              console.log(value);
              return setValue(value);
            }}
          />
        : <List>
            {notes
              ? notes.map((note, index) => {
                  let selectedNote = note;
                  return (
                    <ListItemButton
                      onClick={() => handleSelectedNote(selectedNote)}
                    >
                      <ListItemText
                        primary={note.title}
                        secondary={note.value}
                      />
                    </ListItemButton>
                  );
                })
              : null}
          </List>}
    </Drawer>
  );
};

export default NotesSideBar;
