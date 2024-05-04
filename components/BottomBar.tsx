import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	bar: {
		position: "absolute",
		bottom: 0,
		left: 0,
		flex: 1,
		width: "100%",
		height: "20%",
		maxHeight: 150,
		flexDirection: "column",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		padding: 10,
		borderTopStartRadius: 10,
		borderTopEndRadius: 10,
	},
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
	},
	empty: {
		flex: 1,
	},
});

/**
 * The bottom bar that is displayed at the bottom of the screen.
 *
 * @param children
 *
 * @constructor
 */
export default function BottomBar({ children }: PropsWithChildren) {
	return (
		<View style={styles.bar}>
			<View style={styles.container}>{children}</View>
			<View style={styles.empty} />
		</View>
	);
}
