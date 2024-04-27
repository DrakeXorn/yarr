import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	bar: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		padding: 10,
		borderTopStartRadius: 10,
		borderTopEndRadius: 10,
	},
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
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
			<View style={styles.container}>
				<View style={styles.empty} />
				{children}
				<View style={styles.empty} />
			</View>
			<View style={styles.empty} />
		</View>
	);
}
