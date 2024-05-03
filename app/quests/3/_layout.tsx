import { Stack } from "expo-router";

/**
 * The navigation layout for the third quest.
 * @constructor
 */
export default function ThirdQuestLayoutNav() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
			}}
		/>
	);
}
