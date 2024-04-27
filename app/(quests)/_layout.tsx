import { Stack } from "expo-router";

/**
 * Quests layout navigator
 * @constructor
 */
export default function QuestsLayoutNav() {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: "Quest 1",
				}}
			/>
		</Stack>
	);
}
