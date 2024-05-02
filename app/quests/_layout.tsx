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
			}}
		/>
	);
}
