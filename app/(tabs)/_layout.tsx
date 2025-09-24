import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
	ChartNoAxesCombined,
	Home,
	Library,
	PlusCircle,
	User,
} from "lucide-react-native";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Accueil",
					tabBarIcon: ({ color }) => <Home size={28} color={color} />,
				}}
			/>

			<Tabs.Screen
				name="library"
				options={{
					title: "Bibliothèque",
					tabBarIcon: ({ color }) => <Library size={28} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					title: "Créer",
					tabBarIcon: ({ color }) => <PlusCircle size={28} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="stats"
				options={{
					title: "Stats",
					tabBarIcon: ({ color }) => <ChartNoAxesCombined size={28} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profil",
					tabBarIcon: ({ color }) => <User size={28} color={color} />,
				}}
			/>
		</Tabs>
	);
}
