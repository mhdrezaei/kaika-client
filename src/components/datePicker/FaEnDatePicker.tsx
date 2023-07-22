import React, { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { useTranslation } from "react-i18next";
import { Input } from "@material-tailwind/react";
import InputIcon from "react-multi-date-picker/components/input_icon";

const FaEnDatePicker = ({ period, setDate }) => {
  const [value, setValue] = useState(new Date());
  const { i18n } = useTranslation();

  useEffect(() => {
    setValue(new Date());
  }, [period]);

  const datePickerHandler = (PickeDate) => {
    let from, to, date: Date;

    switch (period) {
      case "day":
        date = new Date(+JSON.stringify(PickeDate));
        from = date.toDateString();
        to = new Date(date.setDate(date.getDate() + 1)).toDateString();
        break;

      case "week":
        from = new Date(PickeDate[0]).toDateString();
        date = new Date(PickeDate[1]);
        to = new Date(date.setDate(date.getDate() + 1)).toDateString();
        break;

      case "month":
        date = new Date(+JSON.stringify(PickeDate));
        from = date.toDateString();
        to = new Date(date.setMonth(date.getMonth() + 1));
        if (i18n.language === "fa") {
          const monthNumberFa = +new Date(from)
            .toLocaleDateString("fa-IR-u-nu-latn")
            .split("/")[1];
          to = new Date(
            new Date(date.setMonth(date.getMonth() + 1)).setDate(
              date.getDate() + 3
            )
          );
          while (
            monthNumberFa !==
            +to.toLocaleDateString("fa-IR-u-nu-latn").split("/")[1]
          )
            to = new Date(to.setDate(to.getDate() - 1));
          to = new Date(to.setDate(to.getDate() + 1));
        }
        to = to.toDateString();
        break;

      case "year":
        date = new Date(+JSON.stringify(PickeDate));
        if (i18n.language === "en") {
          date.setDate(1);
          date.setMonth(0);
        } else {
          date.setDate(21);
          date.setMonth(2);
        }
        from = date.toDateString();
        to = new Date(date.setFullYear(date.getFullYear() + 1)).toDateString();
        break;

      default:
        break;
    }

    setDate({ from, to });
  };

  const className =
    "p-2 rounded bg-kaika-black text-white border border-kaika-gray placeholder:opacity-50";

  return (
    <div>
      <DatePicker
        render={<Input label="Date" className="text-white" />}
        placeholder="Choose Date"
        inputClass={className}
        onChange={datePickerHandler}
        value={value}
        weekPicker={period === "week" && true}
        onlyMonthPicker={period === "month" && true}
        onlyYearPicker={period === "year" && true}
        calendar={i18n.language === "fa" ? persian : undefined}
        locale={i18n.language === "fa" ? persian_fa : undefined}
      />
    </div>
  );
};

export default FaEnDatePicker;
