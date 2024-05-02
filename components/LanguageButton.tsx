import { type FunctionComponent, useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";

import { France, GreatBritain, Netherlands } from "@/components/flags";
import {
	type Language,
	useAppConfiguration,
} from "@/providers/AppConfigurationProvider";

export type LanguageButtonProps = {
	language: Language;
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "transparent",
		borderRadius: 5,
		padding: 10,
		margin: 10,
	},
	unselected: {
		opacity: 0.5,
	},
});

const langToFlag: { [key in Language]: FunctionComponent } = {
	en: GreatBritain,
	fr: France,
	nl: Netherlands,
};

/**
 * A button to change the language of the app.
 *
 * @param {LanguageButtonProps} props - The props of the component.
 * @param {Language} props.language - The language to change to.
 *
 * @returns The language button.
 */
export default function LanguageButton({ language }: LanguageButtonProps) {
	const { configuration, setConfiguration } = useAppConfiguration();

	const onPress = useCallback(() => {
		setConfiguration({ ...configuration, language: language });
	}, [language, configuration, setConfiguration]);

	const Flag = langToFlag[language];

	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.button,
				configuration.language !== language ? styles.unselected : {},
			]}
		>
			<Flag />
		</Pressable>
	);
}
