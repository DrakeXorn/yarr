import { Banner, BottomBar } from "@/components";
import { BottomBarActionButton } from "@/components/buttons";
import { BackwardHook } from "@/components/icons";
import { RumIsGoneText, SamsGoldText } from "@/components/texts";
import { Colors } from "@/constants";
import { BannersAspectRatio } from "@/constants/Banners";
import { useAppConfiguration } from "@/providers/AppConfigurationProvider";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	bannerContainer: {
		width: "95%",
		justifyContent: "center",
		aspectRatio: BannersAspectRatio.default,
	},
	bannerText: {
		color: Colors.text.normal.dark,
	},
	smallEmptySpace: {
		flex: 1,
	},
	largeEmptySpace: {
		flex: 3,
	},
});

export default function EndingPage() {
	const { t } = useTranslation();
	const { setConfiguration } = useAppConfiguration();
	const router = useRouter();

	const finishAction = useMemo(() => {
		return () => {
			setConfiguration({
				language: "en",
				name: null,
				maxReachedQuest: 1,
			});

			router.replace("/");
		};
	}, [setConfiguration, router]);

	return (
		<ImageBackground
			source={require("@/assets/images/quests/finish.jpeg")}
			style={styles.background}
		>
			<View style={styles.largeEmptySpace} />
			<View style={styles.bannerContainer}>
				<Banner>
					<SamsGoldText style={styles.bannerText}>
						{t("end_of_story")}
					</SamsGoldText>
				</Banner>
			</View>
			<View style={styles.smallEmptySpace} />
			<BottomBar>
				<BottomBarActionButton action={finishAction}>
					<BackwardHook />
					<RumIsGoneText style={{ color: Colors.special.foreground }}>
						{t("bottom_bar.finish")}
					</RumIsGoneText>
				</BottomBarActionButton>
			</BottomBar>
		</ImageBackground>
	);
}
