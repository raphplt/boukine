import QrCodeScanner from "@/components/common/QrCodeScanner";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
	return (
		<>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Boukine</ThemedText>
			</ThemedView>
			<ThemedText type="title">Noter un livre</ThemedText>
			<QrCodeScanner />
		</>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
