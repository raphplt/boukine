import QrCodeScanner from "@/components/common/QrCodeScanner";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from "@/components/ui/slider";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
	return (
		<>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Boukine</ThemedText>
			</ThemedView>
			<ThemedText type="title">Noter un livre</ThemedText>
			<QrCodeScanner />
			<ThemedView className="w-1/3 mx-auto mt-10 flex flex-col items-center gap-4">
				<ThemedText type="subtitle"> test</ThemedText>

				<Slider>
					<SliderTrack>
						<SliderFilledTrack />
					</SliderTrack>
					<SliderThumb />
				</Slider>
			</ThemedView>
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
