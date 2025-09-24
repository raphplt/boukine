import * as Lucide from "lucide-react-native";
import React from "react";
import { StyleProp, Text, TextStyle, ViewStyle } from "react-native";

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
	style?: StyleProp<ViewStyle | TextStyle>;
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

	// Si className est fourni sans color prop, on laisse NativeWind appliquer la couleur via Text.
	// Lucide ne lit pas toujours className côté RN, donc on wrap pour récupérer la couleur calculée.
	if (className && !color) {
		// On applique seulement le style au wrapper si c'est du TextStyle, sinon on ignore.
		return (
			<Text className={className}>
				<Cmp
					size={size}
					// @ts-ignore héritage via currentColor
					color={undefined}
					strokeWidth={strokeWidth}
				/>
			</Text>
		);
	}

	return (
		<Cmp
			size={size}
			color={color}
			strokeWidth={strokeWidth}
			// @ts-ignore className future support
			className={className}
		/>
	);
};
