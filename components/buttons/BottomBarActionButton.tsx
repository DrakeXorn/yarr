import type { PropsWithChildren, ReactNode } from "react";
import { Pressable, type PressableProps, StyleSheet } from "react-native";

import { Colors } from "@/constants";

const styles = StyleSheet.create({
	button: {
		display: "flex",
		flexDirection: "row",
		flex: 1,
		backgroundColor: Colors.button.background,
		padding: 10,
		height: 50,
		borderRadius: 7,
		alignItems: "center",
		justifyContent: "center",
	},
});

type BottomBarButtonProps = PropsWithChildren<
	PressableProps & {
		action: () => void;
		enabled?: boolean;
	}
>;

/**
 * A button that performs an action when pressed.
 *
 * @param {BottomBarButtonProps} props The component properties.
 * @param {ReactNode} props.children The children to render.
 * @param {() => void} props.action The action to perform when the button is pressed.
 * @param {boolean?} props.enabled Whether the button is enabled. Defaults to true.
 *
 * @constructor
 */
export function BottomBarActionButton({
	children,
	action,
	enabled = true,
	...props
}: BottomBarButtonProps) {
	return (
		<Pressable
			style={{ ...styles.button, opacity: enabled ? 1 : 0.5 }}
			{...props}
			disabled={!enabled}
			onPress={action}
		>
			{children}
		</Pressable>
	);
}
