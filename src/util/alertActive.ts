import { AxiosError } from "axios";
import { alertAction } from "../redux/slice/alert-slice";
import { store } from "../redux/store";

export const alertActive = (error) => {
  const dispatch = store.dispatch;
  error instanceof AxiosError
    ? dispatch(alertAction.open({ color: "red", message: error.message }))
    : dispatch(
        alertAction.open({
          color: "red",
          message: "Something went wrong.",
        })
      );
};
