import { Text, type TextProps } from "react-native";

import { commonTextStyles } from "@/components/texts/common";

/**
 * A text component with the "Treasure Map Deadhand" font family.
 *
 * @param style Some additional text style.
 * @param props The text properties.
 *
 * @constructor
 */
export default function TreasureMapText({ style, ...props }: TextProps) {
	return (
		<Text
			{...props}
			style={[commonTextStyles.text, style, commonTextStyles.treasurerMapText]}
		/>
	);
}
