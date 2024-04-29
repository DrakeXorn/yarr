import React, { useCallback, useContext, useState } from "react";
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
import { RumIsGoneText, TreasureMapText } from "@/components/texts";
import { commonTextStyles } from "@/components/texts/common";
import { Colors } from "@/constants";
import {
	AppConfigurationContext,
	type AppConfigurationContextType,
} from "@/providers/AppConfigurationProvider";

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
		flex: 3,
	},
	nameInputText: {
		backgroundColor: Colors.text.input.background,
		color: Colors.text.normal.dark,
		fontSize: commonTextStyles.treasurerMapText.fontSize,
		fontFamily: commonTextStyles.treasurerMapText.fontFamily,
		height: "30%",
		marginLeft: 55,
		marginTop: 50,
		width: "70%",
	},
	langButtonsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
	},
	emptySpace: {
		flex: 1,
	},
});

type NameInputProps = {
	setName: (name: string) => void;
};

/**
 * Name input component, using the provided props to set the name and notify when the input is ready
 *
 * @param {NameInputProps} props - The props for the component
 * @param {Function} props.setName - The function to set the name
 *
 * @constructor
 */
function NameInput({ setName }: NameInputProps) {
	const { t } = useTranslation();

	const onInputChange = (text: string) => {
		setName(text);
	};

	return (
		<View style={styles.nameInput}>
			<TreasureMapText>{t("name_setting.state_your_name")}</TreasureMapText>
			<Banner type="small">
				<TextInput
					placeholder="e.g. Jack Sparrow"
					onChangeText={onInputChange}
					placeholderTextColor={Colors.text.input.placeholder}
					style={styles.nameInputText}
				/>
			</Banner>
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
	const { configuration, setConfiguration } =
		useContext<AppConfigurationContextType>(AppConfigurationContext);

	const [name, setName] = useState<string>("");

	const nextAction = useCallback(() => {
		setConfiguration({ ...configuration, name });
	}, [configuration, name, setConfiguration]);

	return (
		<Darken opacity={1}>
			<TitlesContainer subtitleText={t("name_setting.banner")} />
			<NameInput setName={setName} />
			<View style={styles.emptySpace} />
			<BottomBar>
				<BottomBarLinkButton linkTo="/">
					<BackwardHook />
					<RumIsGoneText style={{ color: Colors.button.foreground }}>
						{t("bottom_bar.back")}
					</RumIsGoneText>
				</BottomBarLinkButton>
				<BottomBarLinkButton
					linkTo="/QrScan"
					enabled={name.length >= 2}
					action={nextAction}
				>
					<RumIsGoneText style={{ color: Colors.button.foreground }}>
						{t("bottom_bar.next")}
					</RumIsGoneText>
					<ForwardHook />
				</BottomBarLinkButton>
			</BottomBar>
		</Darken>
	);
}
