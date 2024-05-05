import { type Href, Link } from "expo-router";
import type { PropsWithChildren, ReactNode } from "react";
import { Pressable, type PressableProps, StyleSheet } from "react-native";
import type { Except } from "type-fest";

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

type BottomBarLinkButtonProps = Except<BottomBarButtonProps, "action"> & {
	linkTo: Href<string>;
	action?: () => void;
};

/**
 * A button that links to a specific route in the app.
 *
 * @param {BottomBarLinkButtonProps} props The component properties.
 * @param {ReactNode} props.children The children to render.
 * @param {Href<string>} props.linkTo The route to link to.
 * @param {() => void?} props.action The action to perform when the button is pressed.
 * @param {boolean?} props.enabled Whether the button is enabled. Defaults to true.
 * @param {boolean?} props.shouldReplace Whether to replace the current route in the history. Defaults to false.
 *
 * @constructor
 */
export function BottomBarLinkButton({
	children,
	linkTo,
	action,
	enabled = true,
	...props
}: BottomBarLinkButtonProps) {
	return (
		<Link href={linkTo} asChild>
			{/* NOTE: impossible to use BottomBarActionButton as Link uses refs */}
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
