import { useState } from "react";
import { useSelector } from "react-redux";
import FileViewer from "react-file-viewer";
import { Document, Page } from  "react-pdf/dist/esm/entry.webpack";
import useFileDownloader from "../../../../../hooks/useFileDownloader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardMedia from '@mui/material/CardMedia';
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
  const [selectedResource, setSelectedResource] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const isMenuOpen = Boolean(anchorEl);
  const groupSlice = useSelector(state => state.group)
  const groupPictures = groupSlice.pictures
  const groupVideos = groupSlice.videos
  const groupDocuments = groupSlice.documents
  const groupLinks = groupSlice.links



  // File Downloading
  const [downloadFile, downloaderComponentUI] = useFileDownloader()
  const download = file => downloadFile(file)


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

  const handleResource = (resource) => {
    setSelectedResource(resource);
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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const previousPage = () => {
    changePage(-1);
  }

  const nextPage = () => {
    changePage(1);
  }
  const ViewComponent = () => {
    // Remove query items within the link
    let resource = selectedResource ? selectedResource.file:null;
    let resourceType = null;
    let resourceViewer;
    switch(props.type) {
        case "Photos":
          resourceType = "png"
          resourceViewer = (
            <div style={{ display: "flex", width: "100%" }}>
              <CardMedia
                component="img"
                image={resource}
                alt="event-img"
                sx={{
                  height: "40%",
                  width: "40%"
                }}
              />
            </div>
          )
          break;
        case "Videos":
          resourceType = "mp4"
          resourceViewer = <FileViewer fileType={resourceType} filePath={resource}/>
          break;
        case "Documents":
          resourceType = "pdf"
          resourceViewer = (
          <>
          <Document
            file={resource}
            onLoadSuccess={onDocumentLoadSuccess}
          >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <div class="inline-flex">
          <button 
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage} >
              Previous
          </button>
          <button 
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" 
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}>
              Next
          </button>
        </div>
      </div>
          </>
          );
          break;
        default:
          resourceViewer = (
            <div>
              <p>Visit:</p>
              <p>{resource}</p>
            </div>
          )
      }
    
    return(
      <div>
          {resourceViewer}
      </div>
    )
  }

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
      <MenuItem onClick={() => download(selectedResource)}><DownloadIcon className="pr-1"/>Download</MenuItem>
      
      
    </Menu>
  );
  return (
    <>
    {view ? <ViewComponent resource={renderResource}/>: (
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
                <IconButton onClick={() => handleResource(row)}>
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
    {downloaderComponentUI}
    </>
  );
};

export default ResourceTable;
