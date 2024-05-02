import type { PropsWithChildren } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

type BannerType = "small" | "default" | "large";

export type BannerProps = PropsWithChildren<{
	type?: BannerType;
}>;

const styles = StyleSheet.create({
	banner: {
		width: "100%",
		height: "100%",
	},
});

const bannerTypeToSource = {
	small: require("../assets/images/banners/small.png"),
	default: require("../assets/images/banners/default.png"),
	large: require("../assets/images/banners/large.png"),
};

/**
 * The pirate-style banner that appears in quest screens.
 *
 * @param children The children to render
 * @param type The size of the banner.
 *
 * @constructor
 */
export default function Banner({ children, type = "default" }: BannerProps) {
	return (
		<View style={styles.banner}>
			<ImageBackground source={bannerTypeToSource[type]}>
				{children}
			</ImageBackground>
		</View>
	);
}
