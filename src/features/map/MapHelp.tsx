import React, {useState, useEffect}  from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const localStorageKey="MapHelpReadStatus";
const localStorageValue = "Read";

const MapHelp = ()=>{
    let [open,setOpen] = useState<boolean>(true);

    useEffect(()=>{
        try {
            let value = localStorage.getItem(localStorageKey);
            if( value ){
                let isRead = (value===localStorageValue);
                setOpen(!isRead);
            }
        } catch {
            // ignore
        }
    },[]);

    const onClose = () =>{
        setOpen(false);
    }

    const onDismiss = ()=>{
        try{
            onClose();
            localStorage.setItem(localStorageKey,localStorageValue);
        } catch {
            // ignore
        }
    }

    return (
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='lg'
    >
        <DialogTitle id="alert-dialog-title">{"Julia Map"}</DialogTitle>
         <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This is some context. asfhasjdfhas. skhaskdaskdh. akjhkasd
              </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={onClose} color="primary">
            close
        </Button>
        <Button onClick={onDismiss} color="primary" autoFocus>
            dismiss forever
        </Button>
     </DialogActions> 
      </Dialog>);
}
export default MapHelp;
