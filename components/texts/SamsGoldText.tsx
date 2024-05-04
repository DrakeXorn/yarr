import { Text, type TextProps } from "react-native";

import { commonTextStyles } from "@/components/texts/common";

/**
 * A text component with the "Black Sam's Gold" font family.
 *
 * @param style Some additional text style.
 * @param props The text properties.
 *
 * @constructor
 */
export default function SamsGoldText({ style, ...props }: TextProps) {
	return (
		<Text
			{...props}
			style={[
				commonTextStyles.text,
				commonTextStyles.blackSamsGoldFontSize,
				style,
				commonTextStyles.blackSamsGoldFont,
			]}
		/>
	);
}
