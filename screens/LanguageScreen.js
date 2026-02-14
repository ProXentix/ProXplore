import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { languages } from '../data';

export default function LanguageScreen() {
    const navigation = useNavigation();
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    // Expanded language list for demo
    const allLanguages = [
        ...languages,
        "Español",
        "Français",
        "Deutsch",
        "Italiano",
        "Português",
        "日本語",
        "한국어",
        "中文"
    ];

    return (
        <SafeAreaView className="flex-1 bg-background-light">
            <View className="px-6 py-4 flex-row items-center gap-4 bg-white border-b border-slate-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2 rounded-full active:bg-slate-100">
                    <MaterialIcons name="arrow-back-ios-new" size={20} color="#334155" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-900">Language</Text>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
                <Text className="text-sm font-bold text-slate-500 mb-4 px-2 uppercase tracking-wide">Select Language</Text>

                <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                    {allLanguages.map((lang, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedLanguage(lang)}
                            className={`flex-row items-center justify-between p-4 ${index !== allLanguages.length - 1 ? 'border-b border-slate-100' : ''}`}
                        >
                            <Text className={`text-base font-semibold ${selectedLanguage === lang ? 'text-primary' : 'text-slate-700'}`}>
                                {lang}
                            </Text>
                            {selectedLanguage === lang && (
                                <MaterialIcons name="check-circle" size={24} color="#3b82f6" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <Text className="text-xs text-slate-400 mt-6 text-center px-4">
                    Changing the language will update the app interface. Some content may remain in its original language.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
