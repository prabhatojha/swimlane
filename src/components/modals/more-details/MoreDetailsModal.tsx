import { useDispatch } from "react-redux";
import { moveTask } from '../../../features/taskSlice';
import { Modal, Box, Input, TextField, Button, Fade } from "@mui/material";
import './style.scss';
import { FIELD_NAME_LABEL } from "../../../constants/board";
import { useState } from "react";

type MoreDetailsModalPropsT = {
    requiredFields: Array<string>;
    onSuccess: any;
    onCancel: any;
};
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: '0 0 2px black',
    p: 4,
    tIndex: 0,
};
export function MoreDetailsModal(props: MoreDetailsModalPropsT) {
    const { requiredFields, onSuccess, onCancel } = props;
    const [properties, setProperties] = useState(requiredFields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}))

    const dispatch = useDispatch();

    function handleClose() {
        onCancel();
    }

    function onMove() {
        onSuccess(properties);
    }

    function onPropertyChange(field: string, value: string) {
        setProperties({ ...properties, [field]: value });
    }

    const shouldMoveDisabled = Object.values(properties).some(val => !val);
    return <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <h2>Required Properties</h2>
            <p>Please enter required properties before moving the task to desired state.</p>

            {
                requiredFields.map(field => {
                    return <div className="input-container"><TextField onChange={(e) => onPropertyChange(field, e.target.value)} fullWidth id="outlined-basic" label={FIELD_NAME_LABEL[field]} variant="outlined" /></div>
                })
            }

            <div className="action-buttons">
                <Button variant="outlined" onClick={onCancel}>Cancel</Button>
                <Button variant="contained" onClick={onMove} disabled={shouldMoveDisabled}>Move</Button>
            </div>
        </Box>
    </Modal>
}