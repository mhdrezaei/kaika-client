import { Input, Option, Select } from "@material-tailwind/react";
import { years } from "../../data/year";
import React from "react";

const DatePickerEn = ({ period, setDate }) => {
  return (
    <>
      {period === "year" ? (
        <Select label="Select Year" onChange={(e) => e && setDate(e)}>
          {years.map((year) => (
            <Option key={year} value={year.toString()}>
              {year}
            </Option>
          ))}
        </Select>
      ) : (
        <Input
          type={period === "day" ? "date" : period}
          className="text-white bg-gray-400"
          onChange={(e) => {
            const year = e.target.value.split("W")[0].split("-")[0];
            const week = e.target.value.split("W")[1];
            setDate(
              period === "week"
                ? new Date(
                    new Date(+year, 0).setDate(+week * 7)
                  ).toLocaleString()
                : e.target.value
            );
          }}
        />
      )}
    </>
  );
};
export default DatePickerEn;
