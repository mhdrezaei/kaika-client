import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import React from "react";
import { useTranslation } from "react-i18next";

const DialogWin = ({ isOpen, handle, setIsOpen }) => {
  const {t} = useTranslation()
  return (
    <Dialog open={isOpen} handler={setIsOpen}>
      <DialogHeader>{t("Delete Empolyee's")}</DialogHeader>
      <DialogBody divider>{t("Are you sure to Delete?")}</DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => setIsOpen(false)}
          className="mr-1"
        >
          <span>{t("Cancel")}</span>
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
