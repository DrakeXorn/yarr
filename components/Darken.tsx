import type { PropsWithChildren, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	darken: {
		width: "100%",
		height: "100%",
	},
});

export type DarkenProps = PropsWithChildren<{
	opacity?: number;
}>;

/**
 * Darken the background with a semi-transparent overlay.
 *
 * @param {DarkenProps} props The component properties.
 * @param {ReactNode} [props.children] The children to render.
 * @param {number} [props.opacity=0.4] The opacity of the overlay, from 0 to 1.
 *
 * @constructor
 */
export default function Darken({ children, opacity = 0.4 }: DarkenProps) {
	const backgroundColor = `rgba(0, 0, 0, ${opacity})`;

	return <View style={{ ...styles.darken, backgroundColor }}>{children}</View>;
}
