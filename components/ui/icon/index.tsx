import * as Lucide from "lucide-react-native";
import React from "react";
import { ViewStyle } from "react-native";

const registry = {
	sun: Lucide.Sun,
	moon: Lucide.Moon,
	laptop: Lucide.Laptop,
	home: Lucide.Home,
	send: Lucide.Send,
	code: Lucide.Code,
	chevronRight: Lucide.ChevronRight,
};

export type IconName = keyof typeof registry;

export interface IconProps {
	name: IconName;
	size?: number;
	color?: string;
	strokeWidth?: number;
	className?: string;
	style?: ViewStyle;
}

export const Icon: React.FC<IconProps> = ({
	name,
	size = 20,
	color,
	strokeWidth = 1.9,
	className,
	style,
}) => {
	const Cmp = registry[name];
	if (!Cmp) {
		if (__DEV__) console.warn(`[Icon] Unknown icon: ${name}`);
		return null;
	}
	return (
		<Cmp
			size={size}
			color={color}
			strokeWidth={strokeWidth}
			className={className}
			style={style}
		/>
	);
};
