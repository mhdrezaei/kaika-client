import React from "react";
import ExcelJS from "exceljs";
import { Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
const dayOfWeekEn = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayOfWeekFa = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنچشنبه",
  "جمعه",
  "شنبه",
];
const monthOfYearEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthOfYearFa = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const AllEmployeesExcelExport = ({ data, period }) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const exportHandler = () => {
    const wb = new ExcelJS.Workbook();
    const sheet = wb.addWorksheet(period);

    const average = (
      data.reduce((total, row) => total + parseInt(row.average), 0) /
      data.length
    ).toFixed(2);

    switch (period) {
      case "day": {
        sheet.addRows([
          [
            "",
            t("All Employees Alertness"),
            new Date(data[0].date).toLocaleDateString(
              language === "en" ? "fr" : "fa"
            ),
          ],
          ["", t("Test Time"), t("Mental Alertness")],
          ...data.map((row) => [
            "",
            new Date(row.date).toLocaleTimeString(),
            row.average,
          ]),
          ["", t("Average"), average],
        ]);

        sheet.eachRow((row, rowNumber) => {
          row.height = 30;
          row.eachCell((cell, cellNumber) => {
            if (cellNumber === 1) return;
            const color =
              typeof cell.value === "number"
                ? cell.value > 66
                  ? "33bb33"
                  : cell.value > 33
                  ? "f4ca16 "
                  : "ff2400 "
                : undefined;
            cell.style = {
              alignment: { horizontal: "center", vertical: "middle" },
              border: {
                top: { color: { argb: "000" }, style: "medium" },
                left:
                  rowNumber === 1 && cellNumber === 3
                    ? undefined
                    : { color: { argb: "000" }, style: "medium" },
                bottom: { color: { argb: "000" }, style: "medium" },
                right:
                  rowNumber === 1 && cellNumber === 2
                    ? undefined
                    : { color: { argb: "000" }, style: "medium" },
              },
              font: { bold: true },
              fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: rowNumber > 2 ? color : undefined },
              },
            };
          });
        });

        const header = sheet.getRow(1);
        header.eachCell((cell, cellNumber) => {
          if (cellNumber === 1) return;
          cell.font = { size: 14 };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "AEAAAA" },
          };
          cell.alignment.readingOrder = language === "fa" ? "rtl" : "ltr";
        });

        sheet.getColumn(2).width = 30;
        sheet.getColumn(3).width = 30;

        sheet.insertRow(1, []);
        break;
      }

      case "week": {
        sheet.addRows([
          [
            "",
            t("All Employees Alertness"),
            new Date(data[0].date).toLocaleDateString(
              language === "en" ? "fr" : "fa"
            ) +
              "-" +
              new Date(data[data.length - 1].date).toLocaleDateString(
                language === "en" ? "fr" : "fa"
              ),
          ],
          ["", t("Test Date"), t("Mental Alertness")],
          ...data.map((row) => [
            "",
            (language === "en"
              ? dayOfWeekEn[new Date(row.date).getDay()]
              : dayOfWeekFa[new Date(row.date).getDay()]) +
              "-" +
              new Date(row.date).toLocaleDateString(
                language === "en" ? "fr" : "fa"
              ),
            row.average,
          ]),
          ["", t("Average"), average],
        ]);

        sheet.eachRow((row, rowNumber) => {
          row.height = 30;
          row.eachCell((cell, cellNumber) => {
            if (cellNumber === 1) return;
            const color =
              typeof cell.value === "number"
                ? cell.value > 66
                  ? "33bb33"
                  : cell.value > 33
                  ? "f4ca16 "
                  : "ff2400 "
                : undefined;
            cell.style = {
              alignment: { horizontal: "center", vertical: "middle" },
              border: {
                top: { color: { argb: "000" }, style: "medium" },
                left:
                  rowNumber === 1 && cellNumber === 3
                    ? undefined
                    : { color: { argb: "000" }, style: "medium" },
                bottom: { color: { argb: "000" }, style: "medium" },
                right:
                  rowNumber === 1 && cellNumber === 2
                    ? undefined
                    : { color: { argb: "000" }, style: "medium" },
              },
              font: { bold: true },
              fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: rowNumber > 2 ? color : undefined },
              },
            };
          });
        });

        const header = sheet.getRow(1);
        header.eachCell((cell, cellNumber) => {
          if (cellNumber === 1) return;
          cell.font = { size: 14 };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "AEAAAA" },
          };
          cell.alignment.readingOrder = language === "fa" ? "rtl" : "ltr";
        });

        sheet.getColumn(2).width = 30;
        sheet.getColumn(3).width = 30;

        sheet.insertRow(1, []);
        break;
      }

      case "month": {
        sheet.addRows([
          [
            "",
            t("All Employees Alertness"),
            language === "en"
              ? monthOfYearEn[new Date(data[0].date).getMonth()]
              : monthOfYearFa[
                  +new Date(data[0].date)
                    .toLocaleDateString("fa-IR-u-nu-latn")
                    .split("/")[1] - 1
                ],
          ],
          ["", t("Test Date"), t("Mental Alertness")],
          ...data.map((row) => [
            "",
            new Date(row.date).toLocaleDateString(
              language === "en" ? "fr" : "fa"
            ),
            row.average,
          ]),
          ["", t("Average"), average],
        ]);

        sheet.eachRow((row, rowNumber) => {
          row.height = 30;
          row.eachCell((cell, cellNumber) => {
            if (cellNumber === 1) return;
            const color =
              typeof cell.value === "number"
                ? cell.value > 66
                  ? "33bb33"
                  : cell.value > 33
                  ? "f4ca16 "
                  : "ff2400 "
                : undefined;
            cell.style = {
              alignment: { horizontal: "center", vertical: "middle" },
              border: {
                top: { color: { argb: "000" }, style: "medium" },
                left:
                  rowNumber === 1 && cellNumber === 3
                    ? undefined
                    : { color: { argb: "000" }, style: "medium" },
                bottom: { color: { argb: "000" }, style: "medium" },
                right:
                  rowNumber === 1 && cellNumber === 2
                    ? undefined
                    : { color: { argb: "000" }, style: "medium" },
              },
              font: { bold: true },
              fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: rowNumber > 2 ? color : undefined },
              },
            };
          });
        });

        const header = sheet.getRow(1);
        header.eachCell((cell, cellNumber) => {
          if (cellNumber === 1) return;
          cell.font = { size: 14 };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "AEAAAA" },
          };
          cell.alignment.readingOrder = language === "fa" ? "rtl" : "ltr";
        });

        sheet.getColumn(2).width = 30;
        sheet.getColumn(3).width = 30;

        sheet.insertRow(1, []);
        break;
      }

      case "year": {
        sheet.addRows([
          [
            "",
            t("All Employees Alertness"),
            language === "en"
              ? new Date(data[0].date).getFullYear()
              : (+data[0].date.split("-")[0])
                  .toLocaleString("fa")
                  .split("٬")
                  .join(""),
          ],
          ["", t("Test Date"), t("Mental Alertness")],
          ...data.map((row) => [
            "",
            language === "en"
              ? monthOfYearEn[new Date(row.date).getMonth()]
              : monthOfYearFa[+row.date.split("-")[1] - 1],
            row.average,
          ]),
          ["", t("Average"), average],
        ]);

        sheet.eachRow((row, rowNumber) => {
          row.height = 30;
          row.eachCell((cell, cellNumber) => {
            if (cellNumber === 1) return;
            const color =
              typeof cell.value === "number"
                ? cell.value > 66
                  ? "33bb33"
                  : cell.value > 33
                  ? "f4ca16 "
                  : "ff2400 "
                : undefined;
            cell.style = {
              alignment: { horizontal: "center", vertical: "middle" },
              border: {
                top: { color: { argb: "000" }, style: "medium" },
                left:
                  rowNumber === 1 && cellNumber === 3
                    ? undefined
                    : { color: { argb: "000" }, style: "medium" },
                bottom: { color: { argb: "000" }, style: "medium" },
                right:
                  rowNumber === 1 && cellNumber === 2
                    ? undefined
                    : { color: { argb: "000" }, style: "medium" },
              },
              font: { bold: true },
              fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: rowNumber > 2 ? color : undefined },
              },
            };
          });
        });

        const header = sheet.getRow(1);
        header.eachCell((cell, cellNumber) => {
          if (cellNumber === 1) return;
          cell.font = { size: 14 };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "AEAAAA" },
          };
          cell.alignment.readingOrder = language === "fa" ? "rtl" : "ltr";
        });

        sheet.getColumn(2).width = 30;
        sheet.getColumn(3).width = 30;

        sheet.insertRow(1, []);
        break;
      }

      default:
        break;
    }

    sheet.views = [{ showGridLines: false, rightToLeft: language === "fa" }];

    wb.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "download.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };
  return (
    <div>
      <Button
        className="py-3 px-12 w-20 text-base flex justify-center items-stretch"
        onClick={exportHandler}
        color="green"
      >
        {t("Export")}
      </Button>
    </div>
  );
};

export default AllEmployeesExcelExport;
