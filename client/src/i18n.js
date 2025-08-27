import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationAR from "./locales/ar.json";
import translationEN from "./locales/en.json";

i18n.use(initReactI18next).init({
    resources: {
        ar: { translation: translationAR },
        en: { translation: translationEN },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;