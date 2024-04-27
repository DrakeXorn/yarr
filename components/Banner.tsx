import { ImageBackground, StyleSheet, Text, View } from "react-native";

type BannerType = "small" | "default" | "large";

export type BannerProps = {
	text: string;
	type?: BannerType;
};

const styles = StyleSheet.create({
	banner: {
		width: "100%",
		height: 200,
	},
	text: {
		padding: 20,
		fontFamily: "TreasureMapDeadhand",
		fontSize: 32,
	},
});

export default function Banner({ text, type }: BannerProps) {
	type = type || "default";

	return (
		<View style={styles.banner}>
			<ImageBackground source={require("../assets/images/banner.png")}>
				<Text style={styles.text}>{text}</Text>
			</ImageBackground>
		</View>
	);
}
