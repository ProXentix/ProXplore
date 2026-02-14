import './global.css';
import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: Platform.OS === 'ios' ? 20 : 16 + insets.bottom,
                    left: 16,
                    right: 16,
                    elevation: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 24,
                    height: 72,
                    borderTopWidth: 0,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 10,
                },
                tabBarItemStyle: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', // Center vertically within the item
                    paddingTop: 12, // Push content down slightly if needed
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <MaterialIcons name="home" size={28} color={focused ? "#259df4" : "#94a3b8"} />
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
                            <MaterialIcons name="explore" size={28} color={focused ? "#259df4" : "#94a3b8"} />
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
                            <MaterialIcons name="bookmarks" size={28} color={focused ? "#259df4" : "#94a3b8"} />
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
                            <MaterialIcons name="widgets" size={28} color={focused ? "#259df4" : "#94a3b8"} />
                            <Text className={`text-[10px] font-bold ${focused ? "text-primary" : "text-slate-400"}`}>Menu</Text>
                        </>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
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
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
