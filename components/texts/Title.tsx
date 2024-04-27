import { StyleSheet, Text, type TextProps } from "react-native";

import { commonTextStyles } from "@/components/texts/common";

const styles = StyleSheet.create({
	title: {
		fontSize: 64,
	},
});

/**
 * A title text component, rendered with the "The rum is gone" font family.
 *
 * @param style Some additional text style.
 * @param props The text properties.
 *
 * @constructor
 */
export default function Title({ style, ...props }: TextProps) {
	return (
		<Text
			{...props}
			style={[
				commonTextStyles.text,
				style,
				commonTextStyles.rumIsGone,
				styles.title,
			]}
		/>
	);
}
