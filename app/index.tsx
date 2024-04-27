import React from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, View } from "react-native";

import {
	BottomBar,
	BottomBarLinkButton,
	Darken,
	LanguageButton,
} from "@/components";
import { Hook } from "@/components/icons";
import { RumIsGoneText, Title, TreasureMapText } from "@/components/texts";
import { Colors, Languages } from "@/constants";

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
	titlesContainer: {
		paddingTop: 100,
	},
	flexContainer: {
		flex: 1,
		padding: 20,
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
 * The container for the titles of the home page.
 *
 * @constructor
 */
function TitlesContainer() {
	const { t } = useTranslation();

	return (
		<View style={styles.titlesContainer}>
			<Title>YARR</Title>
			<TreasureMapText>{t("home.subtitle")}</TreasureMapText>
		</View>
	);
}

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
			source={require("../assets/images/ship.jpeg")}
		>
			<Darken>
				<TitlesContainer />
				<LanguageButtonsContainer />
				<View style={styles.emptySpace} />
				<BottomBar>
					<BottomBarLinkButton linkTo="/NameSetting">
						<RumIsGoneText style={{ color: Colors.button.foreground }}>
							{t("bottom_bar.start")}
						</RumIsGoneText>
						<Hook />
					</BottomBarLinkButton>
				</BottomBar>
			</Darken>
		</ImageBackground>
	);
}
