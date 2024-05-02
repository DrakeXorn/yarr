import {
	type BarcodeScanningResult,
	CameraView,
	PermissionStatus,
	useCameraPermissions,
} from "expo-camera/next";
import { useTranslation } from "react-i18next";
import { Button, StyleSheet, View } from "react-native";

import {
	Banner,
	BottomBar,
	BottomBarLinkButton,
	Darken,
	TitlesContainer,
} from "@/components";
import { BackwardHook } from "@/components/icons";
import { RumIsGoneText, TreasureMapText } from "@/components/texts";
import { Colors } from "@/constants";
import { verifyQrCode } from "@/helpers/app";
import { useAppConfiguration } from "@/providers/AppConfigurationProvider";
import { useRouter } from "expo-router";
import { useState } from "react";

const styles = StyleSheet.create({
	titlesContainer: {
		paddingTop: 100,
	},
	flexContainer: {
		flex: 1,
		padding: 20,
	},
	emptySpace: {
		flex: 1,
	},
});

function CameraPermissions() {
	const [permission, requestPermission] = useCameraPermissions();

	return (
		<View>
			<TitlesContainer subtitleText="Please allow camera permissions to scan QR codes" />
			<View style={styles.emptySpace}></View>
			<Button title="Allow camera permissions" onPress={requestPermission} />
			<BottomBar>
				<BottomBarLinkButton linkTo="/QrScan">
					<BackwardHook />
					<RumIsGoneText style={{ color: Colors.button.foreground }}>
						Back
					</RumIsGoneText>
				</BottomBarLinkButton>
			</BottomBar>
		</View>
	);
}

export default function QrScan() {
	const { t } = useTranslation();
	const { configuration, setConfiguration } = useAppConfiguration();
	const [permission, requestPermission] = useCameraPermissions();
	const { navigate, back } = useRouter();
	const [error, setError] = useState<string | null>(null);

	if (!permission || permission.status !== PermissionStatus.GRANTED) {
		return <CameraPermissions />;
	}

	function onBarcodeScanned({ data }: BarcodeScanningResult) {
		const qrData = verifyQrCode(data);

		if (qrData) {
			if (qrData.quest <= configuration.maxReachedQuest) {
				navigate(qrData.path);
			} else {
				back();
			}
		} else {
			setError(t("qr_camera.invalid_code"));
		}
	}

	return (
		<Darken opacity={1}>
			<TitlesContainer
				subtitleText={t("qr_camera.scan_code", {
					username: configuration.name,
				})}
			/>
			<View
				style={{
					marginTop: 20,
					padding: 40,
					flex: 3,
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Banner type="large">
					<CameraView
						barcodeScannerSettings={{
							barcodeTypes: ["qr"],
						}}
						onBarcodeScanned={onBarcodeScanned}
						style={{
							width: "75%",
							height: "80%",
							alignSelf: "center",
							top: 30,
						}}
					></CameraView>
				</Banner>
				{error && (
					<View style={styles.flexContainer}>
						<TreasureMapText style={{ color: "red" }}>{error}</TreasureMapText>
					</View>
				)}
			</View>
			<BottomBar>
				<BottomBarLinkButton linkTo="/">
					<BackwardHook />
					<RumIsGoneText style={{ color: Colors.button.foreground }}>
						{t("bottom_bar.back")}
					</RumIsGoneText>
				</BottomBarLinkButton>
			</BottomBar>
		</Darken>
	);
}
