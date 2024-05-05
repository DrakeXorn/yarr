import { Banner, BottomBar, BottomBarLinkButton, Darken } from "@/components";
import { BottomBarActionButton } from "@/components/BottomBarLinkButton";
import { ForwardHook } from "@/components/icons";
import QrCode from "@/components/icons/QrCode";
import { RumIsGoneText, SamsGoldText } from "@/components/texts";
import { Colors } from "@/constants";
import { BannersAspectRatio } from "@/constants/Banners";
import { useAppConfiguration } from "@/providers/AppConfigurationProvider";
import { useTorch } from "@drakexorn/expo-torchstate";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
	ImageBackground,
	Platform,
	Pressable,
	StyleSheet,
	View,
} from "react-native";

const styles = StyleSheet.create({
	bannerContainer: {
		marginTop: 100,
		width: "95%",
		justifyContent: "center",
		alignSelf: "center",
		alignItems: "center",
		aspectRatio: BannersAspectRatio.default,
	},
	bannerText: {
		margin: 20,
		color: Colors.text.normal.dark,
	},
	iOSButtonView: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
	},
	iOSButton: {
		width: "100%",
		height: "100%",
	},
});

/**
 * The screen of the first quest.
 * @constructor
 */
export default function FirstQuestScreen() {
	const { t } = useTranslation();
	const { configuration, setConfiguration } = useAppConfiguration();
	const router = useRouter();
	const [torchIsOn, switchTorchState] = useTorch();

	const disableTorchAndNavigateAction = useCallback(() => {
		switchTorchState(false).then(() => {
			if (configuration.maxReachedQuest < 2) {
				setConfiguration({ ...configuration, maxReachedQuest: 2 });
			}

			router.navigate("/quests/2");
		});
	}, [router, switchTorchState, configuration, setConfiguration]);

	return (
		<ImageBackground source={require("@/assets/images/quests/quest_1.jpeg")}>
			<Darken opacity={0.4}>
				<View style={styles.bannerContainer}>
					<Banner>
						<SamsGoldText
							style={styles.bannerText}
							adjustsFontSizeToFit={true}
							lineBreakMode="head"
						>
							{t("quest_1.introduction", {
								username: configuration.name?.toUpperCase(),
							})}
						</SamsGoldText>
					</Banner>
				</View>
				{Platform.OS === "ios" && (
					<View style={styles.iOSButtonView}>
						<Pressable
							style={styles.iOSButton}
							onPress={() => switchTorchState(!torchIsOn)}
						/>
					</View>
				)}
				<BottomBar>
					<BottomBarLinkButton linkTo="/QrScan">
						<RumIsGoneText style={{ color: Colors.special.foreground }}>
							{t("bottom_bar.story")}
						</RumIsGoneText>
						<QrCode />
					</BottomBarLinkButton>
					<BottomBarActionButton
						enabled={torchIsOn}
						action={disableTorchAndNavigateAction}
					>
						<RumIsGoneText style={{ color: Colors.special.foreground }}>
							{t("bottom_bar.next")}
						</RumIsGoneText>
						<ForwardHook />
					</BottomBarActionButton>
				</BottomBar>
			</Darken>
		</ImageBackground>
	);
}
