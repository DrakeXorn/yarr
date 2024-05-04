import {
	type BarcodeScanningResult,
	CameraView,
	PermissionStatus,
	useCameraPermissions,
} from "expo-camera/next";
import { type Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Banner, BottomBar, Darken, TitlesContainer } from "@/components";
import { BottomBarActionButton } from "@/components/BottomBarLinkButton";
import { BackwardHook } from "@/components/icons";
import { RumIsGoneText, SamsGoldText } from "@/components/texts";
import { Colors } from "@/constants";
import { verifyQrCode } from "@/helpers/app";
import { useAppConfiguration } from "@/providers/AppConfigurationProvider";

const styles = StyleSheet.create({
	titlesContainer: {
		paddingTop: 100,
	},
	error: {
		color: Colors.special.foreground,
		// fontSize: 25,
		textAlign: "center",
	},
	scannerContainer: {
		width: "85%",
		aspectRatio: 1,
		justifyContent: "center",
		alignSelf: "center",
	},
	camera: {
		width: "100%",
		aspectRatio: 1,
		alignSelf: "center",
	},
});

export default function QrScan() {
	const { t } = useTranslation();
	const { configuration } = useAppConfiguration();
	const [permission, requestPermission] = useCameraPermissions();
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: This is a false positive
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
				router.replace(qrData.path as Href<string>);
			} else {
				setError(t("qr_camera.quest_not_reached"));
			}
		} else {
			setError(t("qr_camera.invalid_code"));
		}
	}

	const goBackAction = () => {
		router.back();
	};

	return (
		<Darken opacity={1}>
			<TitlesContainer
				subtitleText={t("qr_camera.scan_code", {
					username: configuration.name,
				})}
			/>
			<View style={styles.scannerContainer}>
				<Banner type="large">
					<CameraView
						barcodeScannerSettings={{
							barcodeTypes: ["qr"],
						}}
						onBarcodeScanned={onBarcodeScanned}
						style={styles.camera}
					/>
				</Banner>
			</View>
			{error && <SamsGoldText style={styles.error}>{error}</SamsGoldText>}
			<BottomBar>
				<BottomBarActionButton action={goBackAction}>
					<BackwardHook />
					<RumIsGoneText style={{ color: Colors.special.foreground }}>
						{t("bottom_bar.back")}
					</RumIsGoneText>
				</BottomBarActionButton>
			</BottomBar>
		</Darken>
	);
}
