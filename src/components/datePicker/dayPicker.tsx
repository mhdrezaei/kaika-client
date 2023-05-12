import { Input } from "@material-tailwind/react";

const DayPicker = ({ setDate, date }) => {
  return (
    <Input
      value={new Date(date)
        .toLocaleDateString("fr")
        .split("/")
        .reverse()
        .join("-")}
      type="date"
      className="text-white bg-gray-400"
      onChange={(e) => setDate(e.target.value)}
    />
  );
};

export default DayPicker;
