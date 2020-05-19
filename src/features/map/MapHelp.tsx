import React, {useState, useEffect}  from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {isMobile} from 'react-device-detect';

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
                This page maps <i>all</i> the <a href="https://en.wikipedia.org/wiki/Julia_set">Julia fractals</a> on the complex plane. 
              </DialogContentText>
              {isMobile && (
                  <DialogContentText id="alert-dialog-description">
                      Use the <b>pinch gesture</b> to zoom in and out the map and move it around.
                  </DialogContentText>
              )}
              {!isMobile &&(
                    <DialogContentText id="alert-dialog-description">
                      <li>Press the <b>left mouse button</b> and drag the map around.</li>
                      <li>Use the <b>mouse wheel</b> to zoom in and out</li>
                    </DialogContentText> 
              )}
            <DialogContentText id="alert-dialog-description">
            As you zoom in the map more and more fractal images are generated. See this <a href="https://youtu.be/-SsxG6hmf8U?t=60">short youtube video</a>.
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
