import { useState } from "react";
import { Button } from "@mui/material";

import CreateGroupModal from "../CreateGroupModal/CreateGroupModal";

const CreateGroup = () => {
    const [open, setOpen] = useState(false);
    const [eligibility, setEligibility] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEligibility = (value) => setEligibility(value);
    return (
        <>
        <Button onClick={handleOpen} style={{marginTop: "1%"}} variant="contained" size="small">Create Group</Button>
        <CreateGroupModal open={open} close={handleClose.bind(setOpen)} />
        </>
    );
};

export default CreateGroup