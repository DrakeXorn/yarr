import { Title, TreasureMapText } from "@/components/texts";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	titlesContainer: {
		paddingTop: 100,
	},
});

type TitlesContainerProps = {
	subtitleText: string;
};

/**
 * The container for the titles of the home page.
 *
 * @constructor
 */
export default function TitlesContainer({
	subtitleText,
}: TitlesContainerProps) {
	return (
		<View style={styles.titlesContainer}>
			<Title>YARR</Title>
			<TreasureMapText>{subtitleText}</TreasureMapText>
		</View>
	);
}
