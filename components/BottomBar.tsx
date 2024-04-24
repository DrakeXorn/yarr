import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
	children?: ReactNode;
};

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

export default function BottomBar({ children }: Props) {
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
