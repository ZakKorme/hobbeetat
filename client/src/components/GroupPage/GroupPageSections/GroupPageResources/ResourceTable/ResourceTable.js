import { useState } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';


import DocumentIcon from "@mui/icons-material/Article";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LinkIcon from "@mui/icons-material/Link";
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { capitalize } from "../../../../../utils/index";


const ResourceTable = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [view, setView] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const groupSlice = useSelector(state => state.group)
  const groupPictures = groupSlice.pictures
  const groupVideos = groupSlice.videos
  const groupDocuments = groupSlice.documents
  const groupLinks = groupSlice.links

  // Depending on the type returned, we'll render the corresponding resource
  let renderResource;
  
  switch(props.type) {
    case "Photos":
      renderResource = groupPictures
      break;
    case "Videos":
      renderResource = groupVideos
      break;
    case "Documents":
      renderResource = groupDocuments
      break;
    default:
      renderResource = groupLinks
  }
  
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    handleMenuClose();
    setView(!view);
  };

  const menuId = "menu-appbar";
  const renderMenu = (
    <Menu
      sx={{ mt: "45px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleView}>
        <VisibilityIcon className="pr-1"/>
        View
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IosShareIcon className="pr-1"/>
        Share
      </MenuItem>
      <MenuItem><EditIcon className="pr-1"/>Edit</MenuItem>
      <MenuItem onClick={handleMenuClose}><DownloadIcon className="pr-1"/>Download</MenuItem>
      
      
    </Menu>
  );
  return (
    <>
    {view ? <div>This is a view</div>: (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#a8a8a8" }}>Name</TableCell>
            <TableCell sx={{ color: "#a8a8a8" }} align="right">
              Last modified
            </TableCell>
            <TableCell sx={{ color: "#a8a8a8" }} align="right">
              Size
            </TableCell>
            <TableCell sx={{ color: "#a8a8a8" }} align="right">
              Owner
            </TableCell>
            <TableCell sx={{ color: "#a8a8a8" }} align="right">
              Members
            </TableCell>
            <TableCell sx={{ color: "#a8a8a8" }} align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {renderResource.map(row =>
            <TableRow
              key={row.name}
              className="hover:bg-gray-100"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                <div className="flex flex-row">
                {props.type === "Documents"
                  ? <DocumentIcon className="text-blue-600 pr-1" />
                  : props.type === "Photos"
                    ? <AddPhotoAlternateIcon className="text-yellow-300 pr-1" />
                    : props.type === "Videos"
                      ? <VideoLibraryIcon className="text-red-500 pr-1" />
                      : props.type === "Links"
                        ? <LinkIcon className="text-green-400 pr-1" />
                        : null}
                <p className="inline-flex font-bold font">
                  {row.name}
                </p>
                </div>
              </TableCell>
              <TableCell align="right">
                <div className="flex flex-row justify-between">
                
                <p className="whitespace-nowrap font-bold font m-0">
                  {row["modified_on"].split("T")[0]}
                </p>

                </div>
                <p className="text-gray-400 pr-3 m-0">By Me</p>
                
              </TableCell>
              <TableCell align="right">
                <p className="font-bold m-0">
                  0.98MB
                </p>
              </TableCell>
              <TableCell align="right">
                <div className="flex space-x-1 ml-2">
                <p className="font-bold m-0">
                  {`${capitalize(row.author["first_name"])} `}
                </p>
                <p className="font-bold m-0">
                {`${capitalize(row.author['last_name'])}`}
                </p>
                </div>
              </TableCell>
              <TableCell align="right">
                <AvatarGroup max={3}>
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                  <Avatar src="https://placebeard.it/640x360" />
                </AvatarGroup>
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <MoreVertIcon onClick={handleProfileMenuOpen}/>
                </IconButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
    </TableContainer>
    )}
    {renderMenu}
    </>
  );
};

export default ResourceTable;
