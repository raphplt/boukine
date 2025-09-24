import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	Appearance,
	Platform,
	useColorScheme as useRNColorScheme,
} from "react-native";

export type ColorMode = "light" | "dark" | "system";

interface ColorModeContextValue {
	/** User selected mode (may be system) */
	mode: ColorMode;
	/** Resolved concrete mode after evaluating system setting */
	resolvedMode: "light" | "dark";
	setMode: (mode: ColorMode) => void;
	cycleMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(
	undefined
);

const STORAGE_KEY = "color-mode";

function getInitialSelectedMode(defaultMode: ColorMode): ColorMode {
	return defaultMode;
}

export const ColorModeProvider: React.FC<{
	initialMode?: ColorMode;
	children: React.ReactNode;
}> = ({ initialMode = "system", children }) => {
	const systemScheme = useRNColorScheme() || "light";
	const [mode, setModeState] = useState<ColorMode>(() =>
		getInitialSelectedMode(initialMode)
	);
	const [hydrated, setHydrated] = useState(false);

	// Load persisted value
	useEffect(() => {
		(async () => {
			try {
				const stored = await AsyncStorage.getItem(STORAGE_KEY);
				if (stored === "light" || stored === "dark" || stored === "system") {
					setModeState(stored);
				}
			} finally {
				setHydrated(true);
			}
		})();
	}, []);

	// Persist
	useEffect(() => {
		if (!hydrated) return;
		AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => {});
	}, [mode, hydrated]);

	// Listen to system changes if user selected system.
	useEffect(() => {
		if (mode !== "system") return;
		if (Platform.OS === "web") return; // web handled by nativewind / provider script
		const sub = Appearance.addChangeListener(() => {
			// trigger re-render by updating dummy state maybe; resolvedMode derived from systemScheme anyway
		});
		return () => {
			// @ts-ignore new react-native versions supply remove method on subscription
			sub?.remove?.();
		};
	}, [mode]);

	const setMode = useCallback((m: ColorMode) => setModeState(m), []);

	const cycleMode = useCallback(() => {
		setModeState((prev) =>
			prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
		);
	}, []);

	const resolvedMode: "light" | "dark" =
		mode === "system" ? (systemScheme === "dark" ? "dark" : "light") : mode;

	const value = useMemo(
		() => ({ mode, resolvedMode, setMode, cycleMode }),
		[mode, resolvedMode, setMode, cycleMode]
	);

	return (
		<ColorModeContext.Provider value={value}>
			{children}
		</ColorModeContext.Provider>
	);
};

export function useColorMode() {
	const ctx = useContext(ColorModeContext);
	if (!ctx)
		throw new Error("useColorMode must be used inside <ColorModeProvider />");
	return ctx;
}
