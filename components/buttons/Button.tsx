import { Colors } from "@/constants";
import type { PropsWithChildren } from "react";
import {
	Pressable,
	type StyleProp,
	StyleSheet,
	type ViewStyle,
} from "react-native";

const styles = StyleSheet.create({
	button: {
		display: "flex",
		flexDirection: "column",
		width: "15%",
		height: "15%",
		aspectRatio: 1,
		backgroundColor: Colors.button.background,
		borderRadius: 7,
		alignItems: "center",
		justifyContent: "center",
	},
});

type ButtonProps = PropsWithChildren<{
	action: () => void;
	style?: StyleProp<ViewStyle>;
}>;

export function Button({ children, action, style }: ButtonProps) {
	return (
		<Pressable style={[styles.button, style]} onPress={action}>
			{children}
		</Pressable>
	);
}
