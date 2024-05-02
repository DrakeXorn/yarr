import { Stack } from "expo-router";

/**
 * Quests layout navigator
 * @constructor
 */
export default function FirstQuestLayoutNav() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		/>
	);
}
