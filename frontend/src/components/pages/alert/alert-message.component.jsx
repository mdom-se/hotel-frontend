import { Snackbar, Alert } from "@mui/material";
import './alert-message.css'

export const AlertMessage = ({ message, type, isOpen, duration = 3000, handleClose }) => {

    const getAlert = () => {
        if (type === "success") {
            return (<Alert severity={type} sx={{ width: '100%' }} onClose={handleClose}>
                {message}
            </Alert>)
        } else if (type === "warning") {
            return (<Alert severity={type} sx={{ width: '100%' }} onClose={handleClose}>
                {message}
            </Alert>)
        } else if (type === "error") {
            return (<Alert severity={type} sx={{ width: '100%' }} onClose={handleClose}>
                {message}
            </Alert>)
        } else {
            return null;
        }
    }

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={duration}
            onClose={handleClose}
        >
            {getAlert()}
        </Snackbar>);
}

export default AlertMessage;