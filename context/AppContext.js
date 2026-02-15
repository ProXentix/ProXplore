import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load preferences on start
    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = async () => {
        try {
            // Load Theme
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme) {
                const isDark = storedTheme === 'dark';
                setIsDarkMode(isDark);
                setColorScheme(storedTheme);
            }

            // Load Biometric
            const storedBiometric = await AsyncStorage.getItem('biometricEnabled');
            const biometricEnabled = storedBiometric === 'true';
            setIsBiometricEnabled(biometricEnabled);

            if (biometricEnabled) {
                authenticate();
            } else {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Failed to load preferences', error);
            setIsAuthenticated(true); // Fallback to authenticated on error to avoid lockout
        } finally {
            setIsLoading(false);
        }
    };

    const authenticate = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!hasHardware || !isEnrolled) {
            // If hardware not available or not enrolled, bypass or disable
            setIsAuthenticated(true);
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Unlock ProXplore',
            fallbackLabel: 'Use Passcode',
        });

        if (result.success) {
            setIsAuthenticated(true);
        } else {
            Alert.alert(
                "Authentication Failed",
                "Please try again or use your device passcode.",
                [
                    { text: "Retry", onPress: authenticate }
                ]
            );
        }
    };

    const toggleTheme = async () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        const scheme = newMode ? 'dark' : 'light';
        setColorScheme(scheme);
        await AsyncStorage.setItem('theme', scheme);
    };

    const toggleBiometric = async (value) => {
        if (value) {
            // Trying to enable biometric
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            if (!hasHardware) {
                Alert.alert("Error", "Biometric hardware not available on this device.");
                return;
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (!isEnrolled) {
                Alert.alert("Error", "No biometrics enrolled on this device. Please set up in device settings.");
                return;
            }

            // Verify before enabling
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Verify identity to enable biometric lock',
            });

            if (result.success) {
                setIsBiometricEnabled(true);
                await AsyncStorage.setItem('biometricEnabled', 'true');
            }
        } else {
            // Disable biometric
            setIsBiometricEnabled(false);
            await AsyncStorage.setItem('biometricEnabled', 'false');
        }
    };

    return (
        <AppContext.Provider value={{
            isDarkMode,
            toggleTheme,
            isBiometricEnabled,
            toggleBiometric,
            isAuthenticated,
            isLoading,
            authenticate // Expose if manual re-auth needed
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
