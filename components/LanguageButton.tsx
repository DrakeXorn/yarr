import { type FunctionComponent, useCallback, useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

import { France, GreatBritain, Netherlands } from "@/components/flags";
import {
	AppConfigurationContext,
	type AppConfigurationContextType,
	type Language,
} from "@/providers/AppConfigurationProvider";

export type LanguageButtonProps = {
	flag: Language;
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

export default function LanguageButton({ flag }: LanguageButtonProps) {
	const { configuration, setConfiguration } =
		useContext<AppConfigurationContextType>(AppConfigurationContext);

	const onPress = useCallback(() => {
		setConfiguration({ ...configuration, language: flag });
	}, [flag, configuration, setConfiguration]);

	const Flag = langToFlag[flag];

	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.button,
				configuration.language !== flag ? styles.unselected : {},
			]}
		>
			<Flag />
		</Pressable>
	);
}
