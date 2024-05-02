import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

import type { Languages } from "@/constants";
import type { OneOf } from "@/helpers/array";
import { deepEquals } from "@/helpers/object";

type LanguageProviderProps = {
	children: ReactNode;
};

export type Language = OneOf<typeof Languages>;

export type AppConfigurationState = {
	language: Language;
	maxReachedQuest: 1 | 2 | 3;
	name: string | null;
};

export type AppConfigurationContextType = {
	configuration: AppConfigurationState;
	setConfiguration: (config: AppConfigurationState) => void;
};

const AppConfigurationContext = createContext(
	null as unknown as AppConfigurationContextType,
);

export function useAppConfiguration() {
	return useContext(AppConfigurationContext);
}

/**
 * Provides the configuration for the app.
 *
 * @param children The children to render.
 *
 * @constructor
 */
export default function AppConfigurationProvider({
	children,
}: LanguageProviderProps) {
	const [configuration, setConfiguration] = useState<AppConfigurationState>({
		language: "en",
		maxReachedQuest: 1,
		name: null,
	});

	useEffect(() => {
		AsyncStorage.getItem("configuration").then((value) => {
			const newConfiguration = value ? JSON.parse(value) : configuration;

			Object.entries(configuration).forEach(([key, value]) => {
				if (!newConfiguration.hasOwnProperty(key)) {
					newConfiguration[key] = value;
				}
			});

			if (!deepEquals(newConfiguration, configuration)) {
				setConfiguration(newConfiguration);
			}
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
