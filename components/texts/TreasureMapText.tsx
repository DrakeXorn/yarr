import { Text, type TextProps } from "react-native";

import { commonTextStyles } from "@/components/texts/common";

export default function TreasureMapText(props: TextProps) {
	return (
		<Text
			{...props}
			style={[
				commonTextStyles.text,
				props.style,
				commonTextStyles.treasurerMapText,
			]}
		/>
	);
}
