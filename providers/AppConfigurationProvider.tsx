import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { type ReactNode, createContext, useEffect, useState } from "react";

import { Languages } from "@/constants";
import type { OneOf } from "@/helpers/array";

type LanguageProviderProps = {
	children: ReactNode;
};

export type Language = OneOf<typeof Languages>;

export type AppConfigurationState = {
	language: Language;
	name: string | null;
};

export type AppConfigurationContextType = {
	configuration: AppConfigurationState;
	setConfiguration: (config: AppConfigurationState) => void;
};

export const AppConfigurationContext = createContext(
	null as unknown as AppConfigurationContextType,
);

export default function AppConfigurationProvider({
	children,
}: LanguageProviderProps) {
	const [configuration, setConfiguration] = useState<AppConfigurationState>({
		language: "en",
		name: null,
	});

	useEffect(() => {
		Promise.all([
			AsyncStorage.getItem("language"),
			AsyncStorage.getItem("userName"),
		]).then(([lang, userName]) => {
			const newConfiguration: AppConfigurationState = {
				language:
					lang && Languages.includes(lang as Language)
						? (lang as Language)
						: "en",
				name: userName || "",
			};

			setConfiguration(newConfiguration);
		});
	}, []);

	useEffect(() => {
		Promise.all([
			AsyncStorage.setItem("configuration", JSON.stringify(configuration)),
			i18next.changeLanguage(configuration.language),
		]);
	}, [configuration]);

	return (
		<AppConfigurationContext.Provider
			value={{ configuration, setConfiguration }}
		>
			{children}
		</AppConfigurationContext.Provider>
	);
}
