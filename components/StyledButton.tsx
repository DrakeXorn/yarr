import { type Href, Link } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, type PressableProps, StyleSheet } from "react-native";

import { Colors } from "@/constants";

const style = StyleSheet.create({
	button: {
		backgroundColor: Colors.button.background,
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		width: "95%",
		borderRadius: 7,
	},
});

type BottomBarLinkButtonProps = PressableProps & {
	children: ReactNode;
	linkTo: Href<string>;
};

export function BottomBarLinkButton({
	children,
	linkTo,
	...props
}: BottomBarLinkButtonProps) {
	return (
		<Pressable style={style.button} {...props}>
			<Link href={linkTo}>{children}</Link>
		</Pressable>
	);
}
