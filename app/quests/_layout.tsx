import { Stack } from "expo-router";

/**
 * Quests layout navigator
 * @constructor
 */
export default function QuestsLayoutNav() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
			}}
		>
			<Stack.Screen name="1" />
			<Stack.Screen name="2" />
			<Stack.Screen name="3" />
		</Stack>
	);
}
