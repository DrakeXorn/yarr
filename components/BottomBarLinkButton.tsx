import { type Href, Link } from "expo-router";
import type { PropsWithChildren, ReactNode } from "react";
import { Pressable, type PressableProps, StyleSheet } from "react-native";

import { Colors } from "@/constants";

const styles = StyleSheet.create({
	button: {
		display: "flex",
		flexDirection: "row",
		backgroundColor: Colors.button.background,
		padding: 10,
		height: 50,
		borderRadius: 7,
		alignItems: "center",
		justifyContent: "center",
	},
});

type BottomBarLinkButtonProps = PropsWithChildren<
	PressableProps & {
		linkTo: Href<string>;
		action?: () => void;
		enabled?: boolean;
	}
>;

/**
 * A button that links to a specific route in the app.
 *
 * @param {BottomBarLinkButtonProps} props The component properties.
 * @param {ReactNode} props.children The children to render.
 * @param {Href<string>} props.linkTo The route to link to.
 * @param {boolean?} props.enabled Whether the button is enabled. Defaults to true.
 * @param {() => void?} props.action The action to perform when the button is pressed.
 *
 * @constructor
 */
export default function BottomBarLinkButton({
	children,
	linkTo,
	action,
	enabled = true,
	...props
}: BottomBarLinkButtonProps) {
	return (
		<Link href={linkTo} asChild>
			<Pressable
				style={{ ...styles.button, opacity: enabled ? 1 : 0.5 }}
				{...props}
				disabled={!enabled}
				onPress={action}
			>
				{children}
			</Pressable>
		</Link>
	);
}
