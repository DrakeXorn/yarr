import { Stack } from "expo-router";

export default function QuestsLayout() {
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
