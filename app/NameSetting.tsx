import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, View } from "react-native";

import {
	Banner,
	BottomBar,
	BottomBarLinkButton,
	Darken,
	TitlesContainer,
} from "@/components";
import { BackwardHook, ForwardHook } from "@/components/icons";
import { RumIsGoneText, SamsGoldText } from "@/components/texts";
import { commonTextStyles } from "@/components/texts/common";
import { Colors } from "@/constants";
import { BannersAspectRatio } from "@/constants/Banners";
import { useAppConfiguration } from "@/providers/AppConfigurationProvider";

const styles = StyleSheet.create({
	titlesContainer: {
		paddingTop: 100,
	},
	flexContainer: {
		flex: 1,
		padding: 20,
	},
	nameInput: {
		marginTop: 20,
		padding: 10,
		width: "100%",
		maxHeight: "20%",
		flex: 1,
	},
	nameInputText: {
		backgroundColor: Colors.text.input.background,
		color: Colors.text.normal.dark,
		fontSize: commonTextStyles.blackSamsGoldFontSize.fontSize,
		fontFamily: commonTextStyles.blackSamsGoldFont.fontFamily,
		width: "100%",
	},
	emptySpace: {
		flex: 1,
	},
	bannerContainer: {
		aspectRatio: BannersAspectRatio.small,
	},
});

type NameInputProps = {
	name?: string;
	setName: (name: string) => void;
};

/**
 * Name input component, using the provided props to set the name and notify when the input is ready
 *
 * @param {NameInputProps} props - The props for the component
 * @param {string | undefined} props.name - The name if it is already set
 * @param {Function} props.setName - The function to set the name
 *
 * @constructor
 */
function NameInput({ name, setName }: NameInputProps) {
	const { t } = useTranslation();

	return (
		<View style={styles.nameInput}>
			<SamsGoldText>{t("name_setting.state_your_name")}</SamsGoldText>
			<View style={styles.bannerContainer}>
				<Banner type="small">
					<TextInput
						placeholder={t("name_setting.name_placeholder")}
						onChangeText={setName}
						placeholderTextColor={Colors.text.input.placeholder}
						style={styles.nameInputText}
						defaultValue={name}
					/>
				</Banner>
			</View>
		</View>
	);
}

/**
 * Name setting screen component
 *
 * @constructor
 */
export default function NameSetting() {
	const { t } = useTranslation();
	const { configuration, setConfiguration } = useAppConfiguration();
	const [name, setName] = useState<string>("");

	const nextAction = useCallback(() => {
		setConfiguration({ ...configuration, name });
	}, [configuration, name, setConfiguration]);

	return (
		<Darken opacity={1}>
			<TitlesContainer subtitleText={t("name_setting.banner")} />
			<NameInput name={name} setName={setName} />
			<View style={styles.emptySpace} />
			<BottomBar>
				<BottomBarLinkButton linkTo="/">
					<BackwardHook />
					<RumIsGoneText style={{ color: Colors.special.foreground }}>
						{t("bottom_bar.back")}
					</RumIsGoneText>
				</BottomBarLinkButton>
				<BottomBarLinkButton
					linkTo="/QrScan"
					enabled={name.length >= 1}
					action={nextAction}
				>
					<RumIsGoneText style={{ color: Colors.special.foreground }}>
						{t("bottom_bar.next")}
					</RumIsGoneText>
					<ForwardHook />
				</BottomBarLinkButton>
			</BottomBar>
		</Darken>
	);
}
