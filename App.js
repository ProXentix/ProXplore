import './global.css';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity, Text, Platform, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppProvider, useAppContext } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Screens
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import SearchScreen from './screens/SearchScreen';
import SavedScreen from './screens/SavedScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import WeatherScreen from './screens/WeatherScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import SearchPersonalizationScreen from './screens/SearchPersonalizationScreen';
import ExpandImageScreen from './screens/ExpandImageScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import LanguageScreen from './screens/LanguageScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';
import TermsOfServiceScreen from './screens/TermsOfServiceScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

// Custom Floating Action Button for Scan
const CustomScanButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -24,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View className="w-16 h-16 rounded-full bg-primary items-center justify-center border-[5px] border-white dark:border-slate-900 shadow-xl shadow-primary/40 elevation-5">
            {children}
        </View>
    </TouchableOpacity>
);

function TabNavigator() {
    const insets = useSafeAreaInsets();
    const { isDarkMode } = useAppContext();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    height: 60 + (Platform.OS === 'ios' ? insets.bottom : insets.bottom > 0 ? insets.bottom : 10),
                    borderTopWidth: 0,
                    paddingBottom: Platform.OS === 'ios' ? insets.bottom : insets.bottom > 0 ? insets.bottom : 10,
                    paddingTop: 10,
                    elevation: 8,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                },
                tabBarItemStyle: {
                    display: 'flex',
                    justifyContent: 'center',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <MaterialIcons name="home" size={28} color={focused ? "#259df4" : (isDarkMode ? "#64748b" : "#94a3b8")} />
                            <Text className={`text-[10px] font-bold ${focused ? "text-primary" : "text-slate-400"}`}>Home</Text>
                        </>
                    ),
                }}
            />
            <Tab.Screen
                name="Xplore"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <MaterialIcons name="explore" size={28} color={focused ? "#259df4" : (isDarkMode ? "#64748b" : "#94a3b8")} />
                            <Text className={`text-[10px] font-bold ${focused ? "text-primary" : "text-slate-400"}`}>Xplore</Text>
                        </>
                    ),
                }}
            />
            <Tab.Screen
                name="Scan"
                component={ScanScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="qr-code-scanner" size={32} color="white" />
                    ),
                    tabBarButton: (props) => (
                        <CustomScanButton {...props} />
                    ),
                }}
            />
            <Tab.Screen
                name="Saved"
                component={SavedScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <MaterialIcons name="bookmarks" size={28} color={focused ? "#259df4" : (isDarkMode ? "#64748b" : "#94a3b8")} />
                            <Text className={`text-[10px] font-bold ${focused ? "text-primary" : "text-slate-400"}`}>Saved</Text>
                        </>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <MaterialIcons name="widgets" size={28} color={focused ? "#259df4" : (isDarkMode ? "#64748b" : "#94a3b8")} />
                            <Text className={`text-[10px] font-bold ${focused ? "text-primary" : "text-slate-400"}`}>Menu</Text>
                        </>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const LockScreen = ({ onUnlock }) => (
    <View className="flex-1 items-center justify-center bg-primary">
        <MaterialIcons name="lock" size={64} color="white" />
        <Text className="text-white text-xl font-bold mt-4">ProXplore Locked</Text>
        <TouchableOpacity
            onPress={onUnlock}
            className="mt-8 bg-white px-6 py-3 rounded-full"
        >
            <Text className="text-primary font-bold">Unlock with Biometrics</Text>
        </TouchableOpacity>
    </View>
);

function MainContent() {
    const { isAuthenticated: isBiometricAuthenticated, isLoading: isBiometricLoading, authenticate, isDarkMode } = useAppContext();
    const { currentUser, isLoading: isAuthLoading } = useAuth();

    if (isAuthLoading || isBiometricLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (!currentUser) {
        return (
            <NavigationContainer>
                <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                    <AuthStack.Screen name="Login" component={LoginScreen} />
                    <AuthStack.Screen name="Signup" component={SignupScreen} />
                </AuthStack.Navigator>
            </NavigationContainer>
        );
    }

    if (!isBiometricAuthenticated) {
        return <LockScreen onUnlock={authenticate} />;
    }

    return (
        <SafeAreaProvider>
            <StatusBar style={isDarkMode ? "light" : "dark"} backgroundColor={isDarkMode ? "#101a22" : "lightblue"} />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
                    <Stack.Screen name="Main" component={TabNavigator} />
                    <Stack.Screen name="Notifications" component={NotificationsScreen} />
                    <Stack.Screen name="Weather" component={WeatherScreen} />
                    <Stack.Screen name="SearchResult" component={SearchResultScreen} />
                    <Stack.Screen name="SearchPersonalization" component={SearchPersonalizationScreen} />
                    <Stack.Screen name="ExpandImage" component={ExpandImageScreen} options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                    <Stack.Screen name="Language" component={LanguageScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
                    <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
                    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppProvider>
                <MainContent />
            </AppProvider>
        </AuthProvider>
    );
}
