import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { explorePlaces } from '../data'; // Reusing explore places layout

export default function SearchResultScreen() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Images', 'News', 'Videos', 'Shopping'];

    return (
        <SafeAreaView className="flex-1 bg-background-light pt-4">
            {/* Search Header */}
            <View className="px-4 mb-4 flex-row items-center gap-2">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#334155" />
                </TouchableOpacity>
                <View className="flex-1 flex-row items-center bg-white rounded-full px-4 h-11 shadow-sm border border-slate-100">
                    <TextInput
                        className="flex-1 text-slate-800 font-medium"
                        defaultValue="Taj Mahal"
                        placeholderTextColor="#cbd5e1"
                    />
                    <MaterialIcons name="close" size={20} color="#94a3b8" />
                    <View className="w-px h-5 bg-slate-200 mx-2" />
                    <MaterialIcons name="mic" size={20} color="#259df4" />
                </View>
            </View>

            {/* Tabs */}
            <View className="mb-4">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 rounded-full border ${activeTab === tab ? 'bg-primary border-primary' : 'bg-white border-slate-200'}`}
                        >
                            <Text className={`text-sm font-semibold ${activeTab === tab ? 'text-white' : 'text-slate-600'}`}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Content based on tab - simplifying for now */}

                {/* AI Overview / Knowledge Panel */}
                <View className="px-4 mb-4">
                    <View className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                        <View className="flex-row items-center gap-2 mb-2">
                            <MaterialIcons name="auto-awesome" size={18} color="#9333ea" />
                            <Text className="text-xs font-bold text-purple-700 uppercase">AI Overview</Text>
                        </View>
                        <Text className="text-sm text-slate-800 leading-6">
                            The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1631 by the fifth Mughal emperor, Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.
                        </Text>
                    </View>
                </View>

                {/* Top Result */}
                <View className="px-4 mb-6">
                    <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                        <Text className="text-xs text-slate-500 mb-1">en.wikipedia.org › wiki › Taj_Mahal</Text>
                        <Text className="text-lg font-bold text-blue-600 underline decoration-blue-200">Taj Mahal - Wikipedia</Text>
                        <Text className="text-sm text-slate-600 mt-1" numberOfLines={3}>
                            The Taj Mahal is an Islamic ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor...
                        </Text>
                    </View>
                </View>

                {/* Images Grid (if All or Images) */}
                {(activeTab === 'All' || activeTab === 'Images') && (
                    <View className="px-4 mb-6">
                        <Text className="text-base font-bold text-slate-800 mb-3">Images</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                            {[1, 2, 3, 4].map((i) => (
                                <View key={i} className="w-32 h-32 bg-slate-100 rounded-xl overflow-hidden">
                                    <Image source={{ uri: `https://source.unsplash.com/random/200x200?tajmahal&sig=${i}` }} className="w-full h-full" resizeMode="cover" />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Places */}
                <View className="px-4 mb-6">
                    <Text className="text-base font-bold text-slate-800 mb-3">People also ask</Text>
                    <View className="gap-2">
                        {['Who built the Taj Mahal?', 'Why is Taj Mahal famous?', 'Is Taj Mahal open today?'].map((q, i) => (
                            <TouchableOpacity key={i} className="bg-white px-4 py-3 rounded-xl border border-slate-100 flex-row justify-between items-center">
                                <Text className="font-medium text-slate-700">{q}</Text>
                                <MaterialIcons name="keyboard-arrow-down" size={20} color="#94a3b8" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
