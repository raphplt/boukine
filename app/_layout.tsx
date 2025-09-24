import "@/global.css";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import {
	ColorModeProvider,
	useColorMode,
} from "@/components/theme/color-mode-context";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export const unstable_settings = {
	anchor: "(tabs)",
};

function RootLayoutInner() {
	const { mode, resolvedMode } = useColorMode();
	return (
		<GluestackUIProvider mode={mode}>
			<ThemeProvider value={resolvedMode === "dark" ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen
						name="(tabs)"
						options={{
							headerShown: true,
							title: "Boukine",
						}}
					/>
					<Stack.Screen
						name="modal"
						options={{ presentation: "modal", title: "Modal" }}
					/>
				</Stack>
				<StatusBar style={resolvedMode === "dark" ? "light" : "dark"} />
			</ThemeProvider>
		</GluestackUIProvider>
	);
}

export default function RootLayout() {
	return (
		<ColorModeProvider initialMode="system">
			<RootLayoutInner />
		</ColorModeProvider>
	);
}
