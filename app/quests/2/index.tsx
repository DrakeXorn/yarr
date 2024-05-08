import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, View } from "react-native";
import RNShake from "react-native-shake";

import { Banner, BottomBar } from "@/components";
import {
	BottomBarActionButton,
	BottomBarLinkButton,
} from "@/components/buttons";
import { ForwardHook, Pistol } from "@/components/icons";
import QrCode from "@/components/icons/QrCode";
import { RumIsGoneText, SamsGoldText } from "@/components/texts";
import { Colors } from "@/constants";
import { BannersAspectRatio } from "@/constants/Banners";
import { useAppConfiguration } from "@/providers/AppConfigurationProvider";

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		overflow: "visible",
	},
	bigEmptySpace: {
		flex: 2.5,
	},
	smallEmptySpace: {
		flex: 1,
	},
	bannerContainer: {
		justifyContent: "center",
		alignSelf: "center",
		alignItems: "center",
	},
	questBannerContainer: {
		width: "95%",
		aspectRatio: BannersAspectRatio.default,
	},
	pistolsBannerContainer: {
		top: 50,
		left: 0,
		right: 0,

		width: "80%",
		aspectRatio: BannersAspectRatio.small,
	},
	pistolsContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	text: {
		color: Colors.text.normal.dark,
	},
});

type PistolIconsBannerProps = {
	pistolsLoaded: number;
};

/**
 * The banner that displays the pistols loaded by the shake events.
 *
 * @param {PistolIconsBannerProps} props The component properties.
 * @param {number} props.pistolsLoaded The number of pistols to render.
 *
 * @constructor
 */
function PistolIconsBanner({ pistolsLoaded }: PistolIconsBannerProps) {
	return (
		<View style={[styles.bannerContainer, styles.pistolsBannerContainer]}>
			<Banner type="small">
				<View style={styles.pistolsContainer}>
					{Array.from({ length: pistolsLoaded }).map((_, index) => (
						<Pistol key={`pistol_${index}/${pistolsLoaded}`} />
					))}
				</View>
			</Banner>
		</View>
	);
}

type QuestIntroductoryTextProps = {
	segmentId: number;
};

/**
 * The introductory texts to be rendered for the second quest.
 *
 * @param {QuestIntroductoryTextProps} props The component properties.
 * @param {number} props.segmentId The segment ID to render.
 *
 * @constructor
 */
function QuestIntroductoryText({ segmentId }: QuestIntroductoryTextProps) {
	const { t } = useTranslation();
	const { configuration } = useAppConfiguration();

	const texts = useMemo(() => {
		return [
			t("quest_2.introduction"),
			t("quest_2.buzzard_screen_1"),
			t("quest_2.buzzard_screen_2", { username: configuration.name }),
		];
	}, [t, configuration]);

	return (
		<View style={[styles.bannerContainer, styles.questBannerContainer]}>
			<Banner>
				<SamsGoldText style={styles.text}>{texts[segmentId]}</SamsGoldText>
			</Banner>
		</View>
	);
}

/**
 * The screen of the second quest.
 *
 * @constructor
 */
export default function SecondQuestScreen() {
	const { t } = useTranslation();
	const { configuration, setConfiguration } = useAppConfiguration();
	const [shakeCount, setShakeCount] = useState<number>(0);
	const [textId, setTextId] = useState<number>(0);
	const router = useRouter();

	useEffect(() => {
		RNShake.addListener(() => {
			if (textId !== 2) {
				return;
			}

			setShakeCount((prevCount) => (prevCount < 5 ? prevCount + 1 : prevCount));
		});

		return () => {
			RNShake.removeAllListeners();
		};
	}, [textId]);

	const nextAction = useMemo(() => {
		if (textId === 2) {
			if (shakeCount >= 3) {
				return () => {
					if (configuration.maxReachedQuest < 3) {
						setConfiguration({ ...configuration, maxReachedQuest: 3 });
					}

					RNShake.removeAllListeners();
					router.navigate("/quests/3");
				};
			}

			return () => {};
		}

		return () => {
			setTextId((prevId) => prevId + 1);
		};
	}, [textId, shakeCount, router, configuration, setConfiguration]);

	return (
		<ImageBackground
			source={require("@/assets/images/quests/quest_2.jpeg")}
			style={styles.background}
		>
			{textId === 2 && <PistolIconsBanner pistolsLoaded={shakeCount} />}
			<View style={styles.bigEmptySpace} />
			<QuestIntroductoryText segmentId={textId} />
			<View style={styles.smallEmptySpace} />
			<BottomBar>
				<BottomBarLinkButton linkTo="/QrScan">
					<RumIsGoneText style={{ color: Colors.special.foreground }}>
						{t("bottom_bar.story")}
					</RumIsGoneText>
					<QrCode />
				</BottomBarLinkButton>
				<BottomBarActionButton
					enabled={textId < 2 || shakeCount >= 3}
					action={nextAction}
				>
					<RumIsGoneText style={{ color: Colors.special.foreground }}>
						{t("bottom_bar.next")}
					</RumIsGoneText>
					<ForwardHook />
				</BottomBarActionButton>
			</BottomBar>
		</ImageBackground>
	);
}
