import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

export default function TermsOfServiceScreen() {
    const navigation = useNavigation();
    const { isDarkMode } = useAppContext();

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
            <View className="px-6 py-4 flex-row items-center gap-4 border-b border-slate-100 dark:border-slate-800">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2 rounded-full active:bg-slate-100 dark:active:bg-slate-800">
                    <MaterialIcons name="arrow-back-ios-new" size={20} color={isDarkMode ? "#fff" : "#334155"} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-900 dark:text-white">Terms of Service</Text>
            </View>

            <ScrollView className="flex-1 px-6 py-4">
                <Text className="text-base text-slate-600 dark:text-slate-300 mb-4 leading-6">
                    Last updated: February 15, 2026
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">1. Acceptance of Terms</Text>
                <Text className="text-base text-slate-600 dark:text-slate-300 mb-6 leading-6">
                    By accessing and using ProXplore ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App.
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">2. Use of License</Text>
                <Text className="text-base text-slate-600 dark:text-slate-300 mb-6 leading-6">
                    Permission is granted to temporarily download one copy of the materials (information or software) on ProXplore for personal, non-commercial transitory viewing only.
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">3. Disclaimer</Text>
                <Text className="text-base text-slate-600 dark:text-slate-300 mb-6 leading-6">
                    The materials on ProXplore are provided on an 'as is' basis. ProXplore makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">4. Limitations</Text>
                <Text className="text-base text-slate-600 dark:text-slate-300 mb-6 leading-6">
                    In no event shall ProXplore or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ProXplore, even if ProXplore or a ProXplore authorized representative has been notified orally or in writing of the possibility of such damage.
                </Text>

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}
