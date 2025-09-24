import { Icon } from "@/components/ui/icon";
import React from "react";
import { Pressable, View } from "react-native";
import { useColorMode } from "./color-mode-context";

interface ToggleDef {
	value: "light" | "dark" | "system";
	icon: React.ComponentProps<typeof Icon>["name"];
	label: string;
}

const TOGGLES: ToggleDef[] = [
	{ value: "light", icon: "sun", label: "Mode clair" },
	{ value: "dark", icon: "moon", label: "Mode sombre" },
	{ value: "system", icon: "laptop", label: "Mode système" },
];

export const ColorModeToggle: React.FC<{
	orientation?: "horizontal" | "vertical";
}> = ({ orientation = "horizontal" }) => {
	const { mode, setMode } = useColorMode();
	return (
		<View
			className={`flex ${
				orientation === "horizontal" ? "flex-row" : "flex-col"
			} rounded-md overflow-hidden border border-outline-200 dark:border-outline-700`}
		>
			{TOGGLES.map((t, idx) => {
				const active = t.value === mode;
				return (
					<Pressable
						key={t.value}
						accessibilityRole="button"
						accessibilityLabel={t.label}
						onPress={() => setMode(t.value)}
						className={`px-3 py-1.5 items-center justify-center ${
							active
								? "bg-primary-500 dark:bg-primary-400"
								: "bg-background-50 dark:bg-background-200"
						} ${
							idx > 0 && orientation === "horizontal"
								? "border-l border-outline-100 dark:border-outline-600"
								: ""
						}`}
					>
						<Icon
							name={t.icon as any}
							size={18}
							className={
								active
									? "text-white dark:text-typography-100"
									: "text-typography-600 dark:text-typography-300"
							}
							strokeWidth={active ? 2.2 : 1.8}
						/>
					</Pressable>
				);
			})}
		</View>
	);
};
