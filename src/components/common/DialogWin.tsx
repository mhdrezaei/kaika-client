import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import React from "react";

const DialogWin = ({ isOpen, handle, setIsOpen }) => {
  return (
    <Dialog open={isOpen} handler={setIsOpen}>
      <DialogHeader>Delete Empolyee's</DialogHeader>
      <DialogBody divider>Are you sure to Delete?</DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => setIsOpen(false)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => {
            setIsOpen(false);
            handle();
          }}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DialogWin;
