import { useAppConfiguration } from "@/providers/AppConfigurationProvider";

import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

/**
 * Not found screen.
 * This screen is shown when the user tries to access a non-existent screen.
 *
 * @constructor
 */
export default function NotFoundScreen() {
	const { configuration } = useAppConfiguration();
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View style={styles.container}>
				<Text style={styles.title}>
					This screen doesn't exist, {configuration.name}...
				</Text>

				<Link href="/" style={styles.link}>
					<Text style={styles.linkText}>Go to home screen!</Text>
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: "#2e78b7",
	},
});
