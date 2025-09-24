import { ColorModeToggle } from "@/components/theme/color-mode-toggle";
import { ThemedText } from "@/components/themed-text";
import React from "react";
import { View } from "react-native";

const Profile = () => {
	return (
		<View>
			<ThemedText type="title" className="py-2">
				Profile{" "}
			</ThemedText>

			<ColorModeToggle orientation="horizontal" />
		</View>
	);
};

export default Profile;
