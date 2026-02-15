import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

export default function PrivacyPolicyScreen() {
    const navigation = useNavigation();
    const { isDarkMode } = useAppContext();

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
            <View className="px-6 py-4 flex-row items-center gap-4 border-b border-slate-100 dark:border-slate-800">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2 rounded-full active:bg-slate-100 dark:active:bg-slate-800">
                    <MaterialIcons name="arrow-back-ios-new" size={20} color={isDarkMode ? "#fff" : "#334155"} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-900 dark:text-white">Privacy Policy</Text>
            </View>

            <ScrollView className="flex-1 px-6 py-4">
                <Text className="text-base text-slate-600 dark:text-slate-300 mb-4 leading-6">
                    Last updated: February 15, 2026
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">1. Information Collection</Text>
                <Text className="text-base text-slate-600 dark:text-slate-300 mb-6 leading-6">
                    We collect information that you provide directly to us, such as when you create or modify your account, request support, or contact us. This information may include your name, email address, phone number, and other information you choose to provide.
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">2. Use of Information</Text>
                <Text className="text-base text-slate-600 dark:text-slate-300 mb-6 leading-6">
                    We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect ProXplore and our users.
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">3. Data Security</Text>
                <Text className="text-base text-slate-600 dark:text-slate-300 mb-6 leading-6">
                    We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                </Text>

                <Text className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">4. Changes to this Policy</Text>
                <Text className="text-base text-slate-600 dark:text-slate-300 mb-6 leading-6">
                    We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
                </Text>

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}
