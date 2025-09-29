import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en_common from "../assets/locales/en/common.json";
import fr_common from "../assets/locales/fr/common.json";

export const DEFAULT_NS = "common";
export const FALLBACK_LNG = "en";
export const SUPPORTED_LANGS = ["en", "fr"] as const;

i18n.use(initReactI18next).init({
	compatibilityJSON: "v4",
	fallbackLng: FALLBACK_LNG,
	ns: [DEFAULT_NS],
	defaultNS: DEFAULT_NS,
	resources: {
		en: { common: en_common },
		fr: { common: fr_common },
	},
	interpolation: { escapeValue: false },
});

export async function detectAndSetLanguage() {
	const saved = await AsyncStorage.getItem("app_lang");
	const sys = Localization.getLocales()[0]?.languageCode ?? FALLBACK_LNG;
	const next =
		saved && SUPPORTED_LANGS.includes(saved as any)
			? saved
			: SUPPORTED_LANGS.includes(sys as any)
			? sys
			: FALLBACK_LNG;
	if (i18n.language !== next) await i18n.changeLanguage(next);
}

export async function setLanguage(lang: string) {
	await AsyncStorage.setItem("app_lang", lang);
	await i18n.changeLanguage(lang);
}

export default i18n;
