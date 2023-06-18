import React, { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

const FaEnDatePicker = ({ period }) => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    setValue(new Date());
  }, [period]);

  const datePickerHandler = (PickeDate) => {
    let from, to, date: Date;
    console.log(JSON.stringify(PickeDate));

    switch (period) {
      case "day":
        date = new Date(+JSON.stringify(PickeDate));
        from = date.toDateString();
        to = new Date(date.setDate(date.getDate() + 1)).toDateString();
        break;

      case "week":
        from = new Date(PickeDate[0]).toDateString();
        to = new Date(PickeDate[1]).toDateString();
        break;

      case "month":
        date = new Date(+JSON.stringify(PickeDate));
        from = date.toDateString();
        to = new Date(date.setMonth(date.getMonth() + 1)).toDateString();
        break;

      case "year":
        date = new Date(+JSON.stringify(PickeDate));
        from = date.toDateString();
        to = new Date(date.setFullYear(date.getFullYear() + 1)).toDateString();
        break;

      default:
        break;
    }

    console.log(from, to);
  };

  return (
    <div>
      <DatePicker
        onChange={datePickerHandler}
        // value={value}
        weekPicker={period === "week" && true}
        onlyMonthPicker={period === "month" && true}
        onlyYearPicker={period === "year" && true}
        calendar={persian}
        locale={persian_fa}
      />
    </div>
  );
};

export default FaEnDatePicker;
