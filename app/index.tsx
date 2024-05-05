import React from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, View } from "react-native";

import {
	BottomBar,
	BottomBarLinkButton,
	Darken,
	LanguageButton,
	TitlesContainer,
} from "@/components";
import { ForwardHook } from "@/components/icons";
import { RumIsGoneText } from "@/components/texts";
import { Colors, Languages } from "@/constants";

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
	langButtonsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
	},
	emptySpace: {
		flex: 4,
	},
});

/**
 * The container for the language selection buttons.
 *
 * @constructor
 */
function LanguageButtonsContainer() {
	return (
		<View style={styles.langButtonsContainer}>
			{Languages.map((lang) => (
				<LanguageButton language={lang} key={lang} />
			))}
		</View>
	);
}

/**
 * The home page of the application.
 *
 * @constructor
 */
export default function HomePage() {
	const { t } = useTranslation();

	return (
		<ImageBackground
			style={styles.image}
			source={require("@/assets/images/ship.jpeg")}
		>
			<Darken>
				<TitlesContainer subtitleText={t("home.subtitle")} />
				<LanguageButtonsContainer />
				<View style={styles.emptySpace} />
				<BottomBar>
					<BottomBarLinkButton linkTo="/NameSetting">
						<RumIsGoneText style={{ color: Colors.special.foreground }}>
							{t("bottom_bar.start")}
						</RumIsGoneText>
						<ForwardHook />
					</BottomBarLinkButton>
				</BottomBar>
			</Darken>
		</ImageBackground>
	);
}
