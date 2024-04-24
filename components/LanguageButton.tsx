import { type FunctionComponent, useCallback, useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

import { France, GreatBritain, Netherlands } from "@/components/flags";
import {
	type Language,
	LanguageContext,
	type LanguageContextType,
} from "@/providers/LanguageProvider";

export interface LanguageButtonProps {
	flag: Language;
}

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
	const { language, setLanguage } =
		useContext<LanguageContextType>(LanguageContext);

	const onPress = useCallback(() => {
		setLanguage(flag);
	}, [flag, setLanguage]);

	const Flag = langToFlag[flag];

	return (
		<Pressable
			onPress={onPress}
			style={[styles.button, language !== flag ? styles.unselected : {}]}
		>
			<Flag />
		</Pressable>
	);
}
