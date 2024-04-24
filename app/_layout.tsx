import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import i18next from "i18next";
import React, { useEffect } from "react";
import { initReactI18next } from "react-i18next";
import { StatusBar } from "react-native";

import { LanguageProvider } from "@/providers";

import "intl-pluralrules";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

i18next.use(initReactI18next).init({
	lng: "en",
	debug: true,
	resources: {
		en: {
			translation: require("../i18n/en.json"),
		},
		fr: {
			translation: require("../i18n/fr.json"),
		},
		nl: {
			translation: require("../i18n/nl.json"),
		},
	},
});

export default function RootLayout() {
	const [loaded, error] = useFonts({
		TheRumIsGone: require("../assets/fonts/TheRumIsGone.ttf"),
		TreasureMapDeadhand: require("../assets/fonts/TreasureMapDeadhand.ttf"),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<ThemeProvider value={DefaultTheme}>
			<LanguageProvider>
				<StatusBar hidden={true} />
				<Stack>
					<Stack.Screen
						name="index"
						options={{ title: "Home Page", headerShown: false }}
					/>
					<Stack.Screen
						name="NameSetting"
						options={{ headerShown: false, gestureEnabled: false }}
					/>
					<Stack.Screen name="(quests)" options={{ headerShown: false }} />
				</Stack>
			</LanguageProvider>
		</ThemeProvider>
	);
}
