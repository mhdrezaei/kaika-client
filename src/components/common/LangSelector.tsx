import { Button } from "@material-tailwind/react";
import { langs } from "../../data/enums";
import i18next from "i18next";
import { useState } from "react"
import {GlobeAltIcon} from "@heroicons/react/24/outline"


function LangSelector() {
  

  const [isOpen , setIsOpen] = useState(false)
  const dropDownHandler = () => {
    setIsOpen(!isOpen)
  }
  
  const langHandler = (lang : string) => {
    i18next.changeLanguage(lang);
    dropDownHandler()
  };
  return (
    <>
    <div className="relative">
   <Button variant="text"
            color="blue-gray" onClick={dropDownHandler}  className="flex capitalize items-center p-1 font-bold text-kaika-black hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 "><GlobeAltIcon className="cursor-pointer w-7"/> </Button>
   <ul  className={` ${isOpen ? "scale-100" : "scale-0" } ${i18next.language === "en" ? "origin-top-right" : "origin-top-left"} absolute bg-white rounded-md text-gray-800 p-1 transition-all duration-75 ease-linear  `}>
    <li onClick={()=> langHandler(langs.en)}  className="cursor-pointer py-1 px-2 rounded-md hover:bg-blue-gray-500 hover:text-gray-300">
   <span className="flex justify-center items-center gap-2 py-1 px-4"> En </span>
      </li>
    <li onClick={()=> langHandler(langs.fa)} className="cursor-pointer py-1 px-2 rounded-md hover:bg-blue-gray-500 hover:text-gray-300">
    <span className="flex justify-center items-center gap-2 py-1 px-4"> Fa </span>
    </li>
   </ul>
    </div>
    </>
  );
}

export default LangSelector;
