import { Option, Select } from "@material-tailwind/react";
import React from "react";

const SelectPeriod = ({ period, setPeriod, setDate }) => {
  return (
    <div className="[&>div]:min-w-[100px]">
      <Select
        className=""
        label="Period"
        value={period}
        onChange={(e) => {
          e && setPeriod(e);
          setDate("");
        }}
      >
        <Option value="day">Day</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="year">Year</Option>
      </Select>
    </div>
  );
};

export default SelectPeriod;
