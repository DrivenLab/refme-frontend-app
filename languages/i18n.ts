import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "./en.json"; // Set the key-value pairs for the different languages you want to support.
import es from "./es.json";
import { getLocales } from "expo-localization";

const translations = {
  en: { ...en },
  es: { ...es },
};
console.log("transalatioon", { translations });
const i18n = new I18n(translations);
const deviceLanguage = getLocales()[0]?.languageCode || "es";
// Set the locale once at the beginning of your app.
i18n.locale = "es";
i18n.defaultLocale = "es";
console.log({ i18n });
// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
// i18n.locale = 'ja';
export default i18n;
