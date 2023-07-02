import { Option, Select } from "@material-tailwind/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { years } from "../../data/year";

const YearPicker = ({ setDate }) => {
  const {t} = useTranslation()
  const selectYear = t("Select Year");
  return (
    <Select
      label={selectYear}
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
