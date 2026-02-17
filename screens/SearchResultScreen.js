import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { explorePlaces } from '../data'; // Reusing explore places layout

export default function SearchResultScreen({ route }) {
    const navigation = useNavigation();
    const { query } = route.params || { query: "Taj Mahal" }; // Default query if none provided
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Images', 'News', 'Videos', 'Shopping'];

    return (
        <SafeAreaView className="flex-1 bg-background-light pt-4">
            {/* Search Header */}
            <View className="px-4 mb-4 flex-row items-center gap-2">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#334155" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="flex-1 flex-row items-center bg-white rounded-full px-4 h-11 shadow-sm border border-slate-100"
                >
                    <TextInput
                        className="flex-1 text-slate-800 font-medium"
                        defaultValue={query}
                        editable={false} // Make read-only for now, tap to go back to search
                        placeholderTextColor="#cbd5e1"
                    />
                    <MaterialIcons name="close" size={20} color="#94a3b8" />
                    <View className="w-px h-5 bg-slate-200 mx-2" />
                    <MaterialIcons name="mic" size={20} color="#259df4" />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View className="mb-2">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }} className="pb-2">
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 rounded-full border ${activeTab === tab ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'}`}
                        >
                            <Text className={`text-sm font-medium ${activeTab === tab ? 'text-white' : 'text-slate-600'}`}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* AI Overview / Knowledge Panel */}
                <View className="px-4 mb-4 mt-2">
                    <View className="bg-white rounded-2xl p-5 border border-purple-100 relative overflow-hidden shadow-sm">
                        {/* Decorative gradient background opacity */}
                        <LinearGradient
                            colors={['#9333ea', '#ec4899', '#f97316']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1 }}
                        />

                        <View className="flex-row items-center gap-2 mb-3">
                            <View className="w-6 h-6 rounded-full bg-purple-100 items-center justify-center">
                                <MaterialIcons name="auto-awesome" size={14} color="#9333ea" />
                            </View>
                            <Text className="text-xs font-bold text-slate-900 uppercase tracking-wider">AI Overview</Text>
                        </View>

                        <Text className="text-[15px] text-slate-700 leading-7 font-medium">
                            {query} is a popular topic. Based on top results, it appears to be related to historical landmarks or significant events. Key aspects include its architectural beauty, historical importance, and cultural impact globally.
                        </Text>

                        {/* Chips/Suggestions inside AI box */}
                        <View className="flex-row flex-wrap gap-2 mt-4">
                            {['History', 'Architecture', 'Visiting'].map(tag => (
                                <View key={tag} className="bg-purple-50 px-3 py-1 rounded-lg border border-purple-100">
                                    <Text className="text-[11px] font-semibold text-purple-700">{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Top Result */}
                <View className="px-4 mb-4">
                    <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                        <View className="flex-row items-center gap-2 mb-2">
                            <View className="w-6 h-6 bg-slate-100 rounded-full items-center justify-center">
                                <Text className="text-[10px] font-bold text-slate-500">W</Text>
                            </View>
                            <View>
                                <Text className="text-[10px] items-center text-slate-500 font-medium">Wikipedia › wiki › {query.replace(/\s+/g, '_')}</Text>
                            </View>
                        </View>
                        <Text className="text-lg font-bold text-blue-700 mb-1">{query} - Wikipedia</Text>
                        <Text className="text-sm text-slate-600 leading-5" numberOfLines={3}>
                            {query} is a comprehensive subject with various interpretations. This article covers the origins, development, and significance of {query} in modern contexts...
                        </Text>
                    </View>
                </View>

                {/* Images Grid (if All or Images) */}
                {(activeTab === 'All' || activeTab === 'Images') && (
                    <View className="mb-6">
                        <View className="px-4 flex-row items-center justify-between mb-3">
                            <Text className="text-base font-bold text-slate-900">{query} Images</Text>
                            <TouchableOpacity>
                                <MaterialIcons name="arrow-forward" size={20} color="#64748b" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <View key={i} className="w-36 h-36 bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 relative">
                                    <Image
                                        source={{ uri: `https://source.unsplash.com/random/300x300?${query.replace(/\s+/g, ',')}&sig=${i}` }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                    {/* Gradient overlay for text visibility if needed */}
                                    <View className="absolute bottom-0 left-0 right-0 h-10 bg-black/10" />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* People also ask */}
                <View className="px-4 mb-6">
                    <Text className="text-base font-bold text-slate-900 mb-3">People also ask</Text>
                    <View className="gap-2">
                        {[
                            `What is the history of ${query}?`,
                            `How much does it cost to visit ${query}?`,
                            `Best time to go to ${query}?`
                        ].map((q, i) => (
                            <TouchableOpacity key={i} className="bg-white px-4 py-3.5 rounded-xl border border-slate-100 flex-row justify-between items-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                                <Text className="font-medium text-slate-700 flex-1 mr-2">{q}</Text>
                                <MaterialIcons name="keyboard-arrow-down" size={20} color="#94a3b8" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* More Results */}
                <View className="px-4 gap-3">
                    {[1, 2].map((i) => (
                        <View key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                            <View className="flex-row items-center gap-2 mb-1.5">
                                <View className="w-5 h-5 bg-slate-100 rounded-full items-center justify-center">
                                    <MaterialIcons name="public" size={12} color="#64748b" />
                                </View>
                                <Text className="text-[10px] text-slate-500 font-medium">example.com › details</Text>
                            </View>
                            <Text className="text-base font-bold text-blue-700 mb-1">Top guide for {query}</Text>
                            <Text className="text-xs text-slate-500 leading-5">
                                Find the best information about {query}. comprehensive guides, reviews, and local tips to make the most of your experience...
                            </Text>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
