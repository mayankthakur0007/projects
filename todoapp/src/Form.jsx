import { useState, useEffect } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { Button } from "@material-ui/core";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import "./Form.css";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Validate = () => {
  const [entry, changeEntry] = useState("");
  const [indexNumber, changeindex] = useState(0);
  const [editValue, changeEditValue] = useState("");

  const [list, addEntry] = useState([]);
  const { addToast } = useToasts();
  let content = "Please Enter a ToDo item!!";
  let deleted = "Yay! Item deleted!!";
  let edited = "TODO Edited";

  const [open, setOpen] = useState(false);

  const handleClickOpen = (index) => {
    setOpen(true);
    changeindex(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("data") !== "") {
      addEntry(localStorage.getItem("data").split(","));
    }
  }, []);

  const addEntries = (e) => {
    e.preventDefault();
    if (entry === "") {
      addToast(content, {
        appearance: "error",
        autoDismiss: true,
      });
      return false;
    } else {
      addEntry((pre) => [...pre, entry]);
      changeEntry('')
    }
  };

  const editClicked = () => {
    if (editValue === "") {
      addToast(content, {
        appearance: "error",
        autoDismiss: true,
      });
      return false;
    } else {
      list.splice(indexNumber,1,editValue);
    localStorage.setItem("data", list);
    changeEditValue('');
    setOpen(false);
    addToast(edited, {
      appearance: "info",
      autoDismiss: true,
    });
    }
   
  };

  const deleteClicked = (index,element) => {
    if (index > -1) {
      let arr = list.filter(item => item !== element)
      addEntry(arr);
      addToast(deleted, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("data", list);
  }, [list]);

  return (
    <div className="container">
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit TODO</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Enter the new value
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="new"
            value={editValue}
            onChange={(event) => {
              changeEditValue(event.target.value);
            }}
            label="New Value"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={editClicked} color="primary">
            Change
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <form onSubmit={addEntries}>
            <TextField
            autoFocus
            margin="dense"
            id="entry"
            value={entry}
            onChange={(event) => {
              changeEntry(event.target.value);
            }}
            label="To Do Task!"
            type="text"
            fullWidth
          />
          <Button
            id="btn"
            type="submit"
            variant="contained"
            color="primary"
          >
            Add Entry!!
          </Button>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>To DO LIST</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="items">
                      {index + 1}. {item}
                    </div>
                    <div className="icons">
                      <EditTwoToneIcon
                        onClick={() => handleClickOpen(index)}
                      />
                      <DeleteOutlineRoundedIcon
                      onClick={() => deleteClicked(index,item)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Form = () => {
  return (
    <ToastProvider>
      <Validate />
    </ToastProvider>
  );
};

export default Form;
