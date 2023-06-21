import { Option, Select } from "@material-tailwind/react";
import React from "react";
import { useTranslation } from "react-i18next";

const SelectPeriod = ({ period, setPeriod, setDate }) => {
  const {t} = useTranslation();
  const label = t("Period")
   return (
    <div className="[&>div]:min-w-[100px]">
      <Select
        className=""
        label={label}
        value={period}
        onChange={(e) => {
          e && setPeriod(e);
          setDate("");
        }}
      >
        <Option value="day">{t("Day")}</Option>
        <Option value="week">{t("Week")}</Option>
        <Option value="month">{t("Month")}</Option>
        <Option value="year">{t("Year")}</Option>
      </Select>
    </div>
  );
};

export default SelectPeriod;
