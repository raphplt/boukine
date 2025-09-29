import { setLanguage, SUPPORTED_LANGS } from "@/app/i18n";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

const LANGUAGE_NAMES = {
	en: "English",
	fr: "Français",
} as const;

export default function LanguageSwitch() {
	const { i18n } = useTranslation();

	const handleLanguageChange = async (lang: string) => {
		await setLanguage(lang);
	};

	return (
		<View className="flex-row gap-2 p-4">
			{SUPPORTED_LANGS.map((lang) => (
				<Pressable
					key={lang}
					onPress={() => handleLanguageChange(lang)}
					className={`px-4 py-2 rounded-lg border ${
						i18n.language === lang
							? "bg-blue-500 border-blue-500"
							: "bg-transparent border-gray-300"
					}`}
				>
					<Text
						className={`text-sm font-medium ${
							i18n.language === lang ? "text-white" : "text-gray-700"
						}`}
					>
						{LANGUAGE_NAMES[lang]}
					</Text>
				</Pressable>
			))}
		</View>
	);
}
