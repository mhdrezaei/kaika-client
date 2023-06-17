import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { langs } from "../data/enums";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: [langs.en, langs.fa],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "localStorage", "htmlTag"],
      caches: ["cookie", "localStorage"],
    },
    backend: {
      loadPath: "./languages/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
  });

export default i18next;
