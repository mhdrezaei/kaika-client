import { Button, Select } from "@material-tailwind/react";
import cookies from "js-cookie";
import { langs } from "../../data/enums";
import i18next from "i18next";

function LangSelector() {
  const currentLang = cookies.get("i18next");
  const langHandler = (event) => {
    i18next.changeLanguage(event.target.value);
  };
  return (
    <Select size="md" color="yellow" value={currentLang} onChange={langHandler}>
      <option value={langs.en}>{langs.en}</option>
      <option value={langs.fa}>{langs.fa}</option>
    </Select>
  );
}

export default LangSelector;
