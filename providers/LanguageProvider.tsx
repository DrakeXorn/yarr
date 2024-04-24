import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { type ReactNode, createContext, useEffect, useState } from "react";

import { Languages } from "@/constants";
import type { OneOf } from "@/helpers/array";

interface LanguageProviderProps {
	children: ReactNode;
}

export type Language = OneOf<typeof Languages>;

export interface LanguageContextType {
	language: Language;
	setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext(
	null as unknown as LanguageContextType,
);

export default function LanguageProvider({ children }: LanguageProviderProps) {
	const [language, setLanguage] = useState<Language>("en");

	useEffect(() => {
		AsyncStorage.getItem("language").then((lang) => {
			if (lang && Languages.includes(lang as Language)) {
				setLanguage(lang as Language);
			}
		});
	}, []);

	useEffect(() => {
		Promise.all([
			AsyncStorage.setItem("language", language),
			i18next.changeLanguage(language),
		]);
	}, [language]);

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
}
