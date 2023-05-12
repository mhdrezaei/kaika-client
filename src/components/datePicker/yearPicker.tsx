import { Option, Select } from "@material-tailwind/react";
import React from "react";
import { years } from "../../data/year";

const YearPicker = ({ setDate }) => {
  return (
    <Select
      label="Select Year"
      onChange={(e) => e && setDate(e)}
      defaultValue={new Date().getFullYear()}
    >
      {years.map((year) => (
        <Option key={year} value={year.toString()}>
          {year}
        </Option>
      ))}
    </Select>
  );
};

export default YearPicker;
