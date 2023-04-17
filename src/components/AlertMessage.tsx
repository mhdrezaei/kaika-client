import { Alert } from "@material-tailwind/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectAlert, alertAction } from "../redux/slice/alert-slice";

const AlertMessage = () => {
  const dispatch = useAppDispatch();
  const alertState = useAppSelector(selectAlert);
  return (
    <Alert
      show={alertState.isOpen}
      color={alertState.color}
      className="w-fit mx-auto absolute bottom-12 left-1/2 -translate-x-1/2"
      dismissible={{
        onClose: () => dispatch(alertAction.close()),
      }}
    >
      {alertState.message}
    </Alert>
  );
};

export default AlertMessage;
