import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
    const navigation = useNavigation();

    // State for toggles
    const [pushNotifications, setPushNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [biometric, setBiometric] = useState(true);
    const [dataSaver, setDataSaver] = useState(false);

    const SettingSection = ({ title, children }) => (
        <View className="mb-6">
            <Text className="text-sm font-bold text-slate-500 mb-3 px-2 uppercase tracking-wide">{title}</Text>
            <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                {children}
            </View>
        </View>
    );

    const SettingItem = ({ icon, color, title, type = 'link', value, onValueChange, isLast }) => (
        <TouchableOpacity
            disabled={type === 'toggle'}
            className={`flex-row items-center p-4 ${!isLast ? 'border-b border-slate-100' : ''}`}
        >
            <View className="w-8 h-8 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: color + '20' }}>
                <MaterialIcons name={icon} size={20} color={color} />
            </View>
            <Text className="flex-1 text-base font-semibold text-slate-700">{title}</Text>

            {type === 'toggle' ? (
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: "#e2e8f0", true: "#bfdbfe" }}
                    thumbColor={value ? "#3b82f6" : "#f1f5f9"}
                />
            ) : (
                <MaterialIcons name="chevron-right" size={24} color="#cbd5e1" />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-background-light">
            <View className="px-6 py-4 flex-row items-center gap-4 bg-white border-b border-slate-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2 rounded-full active:bg-slate-100">
                    <MaterialIcons name="arrow-back-ios-new" size={20} color="#334155" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-900">Settings</Text>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>

                <SettingSection title="Preferences">
                    <SettingItem
                        icon="dark-mode"
                        color="#6366f1"
                        title="Dark Mode"
                        type="toggle"
                        value={darkMode}
                        onValueChange={setDarkMode}
                    />
                    <SettingItem
                        icon="notifications"
                        color="#f59e0b"
                        title="Push Notifications"
                        type="toggle"
                        value={pushNotifications}
                        onValueChange={setPushNotifications}
                    />
                    <SettingItem
                        icon="mail"
                        color="#ec4899"
                        title="Email Updates"
                        type="toggle"
                        value={emailNotifications}
                        onValueChange={setEmailNotifications}
                        isLast
                    />
                </SettingSection>

                <SettingSection title="Privacy & Security">
                    <SettingItem
                        icon="fingerprint"
                        color="#10b981"
                        title="Biometric ID"
                        type="toggle"
                        value={biometric}
                        onValueChange={setBiometric}
                    />
                    <SettingItem
                        icon="lock"
                        color="#3b82f6"
                        title="Change Password"
                        isLast
                    />
                </SettingSection>

                <SettingSection title="Data & Storage">
                    <SettingItem
                        icon="data-usage"
                        color="#8b5cf6"
                        title="Data Saver"
                        type="toggle"
                        value={dataSaver}
                        onValueChange={setDataSaver}
                    />
                    <SettingItem
                        icon="cached"
                        color="#ef4444"
                        title="Clear Cache"
                        isLast
                    />
                </SettingSection>

                <SettingSection title="About">
                    <SettingItem
                        icon="info"
                        color="#64748b"
                        title="Terms of Service"
                    />
                    <SettingItem
                        icon="privacy-tip"
                        color="#64748b"
                        title="Privacy Policy"
                    />
                    <SettingItem
                        icon="star"
                        color="#64748b"
                        title="Rate App"
                    />
                    <View className="p-4 items-center">
                        <Text className="text-xs text-slate-400 font-medium">Version 1.0.0 (Build 124)</Text>
                    </View>
                </SettingSection>

            </ScrollView>
        </SafeAreaView>
    );
}
