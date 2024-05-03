import { Stack } from "expo-router";

/**
 * The navigation layout for the first quest.
 * @constructor
 */
export default function FirstQuestLayoutNav() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
			}}
		/>
	);
}
