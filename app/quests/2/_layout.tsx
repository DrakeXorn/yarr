import { Stack } from "expo-router";

/**
 * The navigation layout for the second quest.
 * @constructor
 */
export default function SecondQuestLayoutNav() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
			}}
		/>
	);
}
