import { OverlayProvider } from "@gluestack-ui/core/overlay/creator";
import { ToastProvider } from "@gluestack-ui/core/toast/creator";
import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { Appearance, ColorSchemeName, View, ViewProps } from "react-native";
import { config } from "./config";

export type ModeType = "light" | "dark" | "system";

export function GluestackUIProvider({
	mode = "light",
	...props
}: {
	mode?: ModeType;
	children?: React.ReactNode;
	style?: ViewProps["style"];
}) {
	const { colorScheme, setColorScheme } = useColorScheme();

	useEffect(() => {
		if (mode === "system") {
			const apply = (scheme?: ColorSchemeName) => {
				setColorScheme((scheme || Appearance.getColorScheme() || "light") as any);
			};
			apply();
			const listener = Appearance.addChangeListener(({ colorScheme }) =>
				apply(colorScheme)
			);
			return () => {
				// @ts-ignore react-native types vary by version
				listener?.remove?.();
			};
		} else {
			setColorScheme(mode);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	return (
		<View
			style={[
				config[colorScheme!],
				{ flex: 1, height: "100%", width: "100%" },
				props.style,
			]}
		>
			<OverlayProvider>
				<ToastProvider>{props.children}</ToastProvider>
			</OverlayProvider>
		</View>
	);
}
