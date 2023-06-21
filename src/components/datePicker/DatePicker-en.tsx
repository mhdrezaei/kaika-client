import { Input, Option, Select } from "@material-tailwind/react";
import { years } from "../../data/year";
import React from "react";
import { useTranslation } from "react-i18next";

const DatePickerEn = ({ period, setDate }) => {
  const {t} = useTranslation();
  const selectYear = t("Select-Year");
  const date = t("Date")
  return (
    <>
      {period === "year" ? (
        <Select label={selectYear} onChange={(e) => e && setDate(e)}>
          {years.map((year) => (
            <Option key={year} value={year.toString()}>
              {year}
            </Option>
          ))}
        </Select>
      ) : (
        <Input
          label={date}
          defaultValue={new Date()
            .toLocaleDateString("fr")
            .split("/")
            .reverse()
            .join("-")}
          type={period === "day" ? "date" : period}
          className="text-white bg-gray-400"
          onChange={(e) => {
            const year = e.target.value.split("W")[0].split("-")[0];
            const week = e.target.value.split("W")[1];
            setDate(
              period === "week"
                ? new Date(new Date(+year, 0).setDate(+week * 7))
                : e.target.value
            );
          }}
        />
      )}
    </>
  );
};
export default DatePickerEn;
