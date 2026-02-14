import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SearchPersonalizationScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 bg-background-light pt-4">
            <View className="px-6 flex-row items-center gap-4 mb-6">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-sm"
                >
                    <MaterialIcons name="arrow-back-ios-new" size={18} color="#334155" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-900">Personalization</Text>
            </View>

            <ScrollView className="px-6" contentContainerStyle={{ paddingBottom: 40 }}>
                <Text className="text-sm text-slate-500 mb-6">Customize your search experience and manage your data.</Text>

                <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-6">
                    <Text className="text-base font-bold text-slate-900 mb-4">Search & History</Text>

                    <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
                        <View className="flex-1 mr-4">
                            <Text className="font-semibold text-slate-800">Save Search History</Text>
                            <Text className="text-xs text-slate-500">Keep track of your searches for better recommendations</Text>
                        </View>
                        <Switch value={true} trackColor={{ true: '#259df4' }} />
                    </View>

                    <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
                        <View className="flex-1 mr-4">
                            <Text className="font-semibold text-slate-800">Personalized Results</Text>
                            <Text className="text-xs text-slate-500">Show results based on your interests and location</Text>
                        </View>
                        <Switch value={true} trackColor={{ true: '#259df4' }} />
                    </View>

                    <TouchableOpacity className="py-3 mt-1">
                        <Text className="text-red-500 font-semibold">Clear Search History</Text>
                    </TouchableOpacity>
                </View>

                <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                    <Text className="text-base font-bold text-slate-900 mb-4">Preferences</Text>
                    <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
                        <View className="flex-1 mr-4">
                            <Text className="font-semibold text-slate-800">Safe Search</Text>
                            <Text className="text-xs text-slate-500">Filter explicit content from results</Text>
                        </View>
                        <Switch value={true} trackColor={{ true: '#259df4' }} />
                    </View>
                    <View className="flex-row items-center justify-between py-3">
                        <View className="flex-1 mr-4">
                            <Text className="font-semibold text-slate-800">Open Links in App</Text>
                        </View>
                        <Switch value={true} trackColor={{ true: '#259df4' }} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
