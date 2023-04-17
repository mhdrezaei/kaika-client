import { colors } from "@material-tailwind/react/types/generic";
import { alertAction } from "../redux/slice/alert-slice";
import { store } from "../redux/store";

export const alertActive = ({
  message,
  color,
}: {
  message: string;
  color: colors;
}) => {
  const dispatch = store.dispatch;
  dispatch(alertAction.open({ color, message }));
};
