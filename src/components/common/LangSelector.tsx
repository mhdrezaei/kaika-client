import { Button } from "@material-tailwind/react";
import cookies from "js-cookie";
import { langs } from "../../data/enums";
import i18next from "i18next";
import { useState } from "react"
import {GlobeAltIcon} from "@heroicons/react/24/outline"
import FaFlag from '/assets/flags/fa.svg'
import EnFlag from '/assets/flags/en.svg'


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
   <Button onClick={dropDownHandler} size="sm"  className="text-center px-1 py-1 bg-blue-gray-500"><GlobeAltIcon className="w-6 h-6" color="white"/> </Button>
   <ul  className={` ${isOpen ? "scale-100" : "scale-0"} absolute bg-white rounded-md text-gray-800 p-1 transition-all duration-75 ease-linear origin-top-left `}>
    <li onClick={()=> langHandler(langs.en)}  className="cursor-pointer py-1 px-2 rounded-md hover:bg-blue-gray-500 hover:text-gray-300">
   <span className="flex justify-center items-center gap-2 py-1 px-4"><img src={EnFlag} width={20} height={20} /> En </span>
      </li>
    <li onClick={()=> langHandler(langs.fa)} className="cursor-pointer py-1 px-2 rounded-md hover:bg-blue-gray-500 hover:text-gray-300">
    <span className="flex justify-center items-center gap-2 py-1 px-4"><img src={FaFlag} width={20} height={20} /> Fa </span>
    </li>
   </ul>
    </div>
    </>
  );
}

export default LangSelector;
