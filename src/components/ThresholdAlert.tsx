import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useQuery } from "react-query";
import { alertUnderThreshold } from "../service/api";

const ThresholdAlert = ({ id }) => {
  const { data } = useQuery("alerUnderThreshold" + id, () =>
    alertUnderThreshold(id)
  );

  return (
    <ExclamationTriangleIcon
      className={
        "w-5 absolute -right-1/4 -top-1/4 " +
        (data?.data.isAlert ? "opacity-100" : "opacity-0")
      }
      color="yellow"
    />
  );
};

export default ThresholdAlert;
