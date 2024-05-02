import {
	type BarcodeScanningResult,
	CameraView,
	PermissionStatus,
	useCameraPermissions,
} from "expo-camera/next";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

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
	error: {
		color: Colors.special.foreground,
		textAlign: "center",
	},
});

export default function QrScan() {
	const { t } = useTranslation();
	const { configuration } = useAppConfiguration();
	const [permission, requestPermission] = useCameraPermissions();
	const { navigate } = useRouter();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (permission?.status === PermissionStatus.UNDETERMINED) {
			console.log("Requesting camera permission");
			void requestPermission();
		}

		if (permission?.status === PermissionStatus.DENIED) {
			setError(t("qr_camera.permission_denied"));
		}
	}, [permission]);

	function onBarcodeScanned({ data }: BarcodeScanningResult) {
		const qrData = verifyQrCode(data);

		if (qrData) {
			if (qrData.quest <= configuration.maxReachedQuest) {
				navigate(qrData.path);
			} else {
				setError(t("qr_camera.quest_not_reached"));
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
					<TreasureMapText style={styles.error}>{error}</TreasureMapText>
				)}
			</View>
			<BottomBar>
				<BottomBarLinkButton linkTo="/">
					<BackwardHook />
					<RumIsGoneText style={{ color: Colors.special.foreground }}>
						{t("bottom_bar.back")}
					</RumIsGoneText>
				</BottomBarLinkButton>
			</BottomBar>
		</Darken>
	);
}
