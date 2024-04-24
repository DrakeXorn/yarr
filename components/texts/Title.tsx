import { StyleSheet, Text, type TextProps } from "react-native";

import { commonTextStyles } from "@/components/texts/common";

const styles = StyleSheet.create({
	title: {
		fontSize: 64,
	},
});

export default function Title(props: TextProps) {
	return (
		<Text
			{...props}
			style={[
				commonTextStyles.text,
				props.style,
				commonTextStyles.rumIsGone,
				styles.title,
			]}
		/>
	);
}
