import { Banner, BottomBar } from "@/components";
import {
	BottomBarActionButton,
	BottomBarLinkButton,
	Button,
} from "@/components/buttons";
import { ForwardHook } from "@/components/icons";
import Phone from "@/components/icons/Phone";
import QrCode from "@/components/icons/QrCode";
import { RumIsGoneText, SamsGoldText } from "@/components/texts";
import { Colors } from "@/constants";
import { BannersAspectRatio } from "@/constants/Banners";
import { useAppConfiguration } from "@/providers/AppConfigurationProvider";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	ImageBackground,
	Linking,
	Platform,
	StyleSheet,
	View,
} from "react-native";

const styles = StyleSheet.create({
	background: {
		flex: 1,
		height: "130%",
	},
	bigEmptySpace: {
		flex: 1,
	},
	smallEmptySpace: {
		flex: 0.1,
	},
	bannerContainer: {
		justifyContent: "center",
		alignSelf: "center",
		alignItems: "center",
		width: "92%",
		aspectRatio: BannersAspectRatio.default,
	},
	bannerText: {
		color: Colors.text.normal.dark,
	},
	buttonText: {
		color: Colors.special.foreground,
	},
	button: {
		alignSelf: "center",
		bottom: "15%",
		left: 0,
		right: 0,
	},
});

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
	const { configuration } = useAppConfiguration();
	const { t } = useTranslation();

	const texts = [
		t("quest_3.introduction"),
		t("quest_3.buzzard_screen_1", {
			username: configuration.name,
			blackbeard: t("quest_3.blackbeard"),
		}),
		t("quest_3.buzzard_screen_2"),
	];

	return (
		<View style={styles.bannerContainer}>
			<Banner>
				<SamsGoldText style={styles.bannerText}>
					{texts[segmentId]}
				</SamsGoldText>
			</Banner>
		</View>
	);
}

/**
 * The screen of the third quest.
 *
 * @constructor
 */
export default function ThirdQuestScreen() {
	const [called, setCalled] = useState(false);
	const [textId, setTextId] = useState<number>(0);
	const router = useRouter();
	const { t } = useTranslation();

	const nextAction = useMemo(() => {
		if (textId === 1) {
			if (called) {
				return () => {
					router.navigate("/Ending");
				};
			}

			return () => {};
		}

		return () => {
			setTextId((prevId) => prevId + 1);
		};
	}, [textId, router, called]);

	const handleCallAction = useMemo(() => {
		return () => {
			const phoneProtocol = Platform.OS === "ios" ? "telprompt" : "tel";
			const phoneNumber = "0471124035";

			Linking.openURL(`${phoneProtocol}:${phoneNumber}`).then(() => {
				setCalled(true);
			});
		};
	}, []);

	return (
		<ImageBackground
			source={require("@/assets/images/quests/quest_3.jpeg")}
			style={styles.background}
		>
			<View style={styles.smallEmptySpace} />
			<QuestIntroductoryText segmentId={textId + Number(called)} />
			<View style={styles.bigEmptySpace} />
			{textId === 1 && (
				<>
					<Button action={handleCallAction} style={styles.button}>
						<Phone />
						<SamsGoldText style={styles.buttonText}>
							{t("quest_3.blackbeard")}
						</SamsGoldText>
					</Button>
					<View style={styles.smallEmptySpace} />
				</>
			)}
			<BottomBar>
				<BottomBarLinkButton linkTo="/QrScan">
					<RumIsGoneText style={{ color: Colors.special.foreground }}>
						{t("bottom_bar.story")}
					</RumIsGoneText>
					<QrCode />
				</BottomBarLinkButton>
				<BottomBarActionButton action={nextAction} enabled={!textId || called}>
					<RumIsGoneText style={{ color: Colors.special.foreground }}>
						{t("bottom_bar.next")}
					</RumIsGoneText>
					<ForwardHook />
				</BottomBarActionButton>
			</BottomBar>
		</ImageBackground>
	);
}
