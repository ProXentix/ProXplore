import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SearchResultScreen({ route }) {
    const navigation = useNavigation();
    const { query } = route.params || { query: "Taj Mahal" };
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Images', 'News', 'Videos', 'Shopping'];

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchResults();
    }, [query]);

    const fetchResults = async () => {
        setLoading(true);
        setError(null);
        try {
            // Android Emulator localhost: 10.0.2.2
            // If testing on real device, replace with your PC IP (e.g., 192.168.1.5)
            // Render Backend: https://proxplore.onrender.com
            const response = await fetch(`https://proxplore.onrender.com/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResults(data.results || []);
        } catch (err) {
            console.error("Search Error:", err);
            setError("Failed to fetch results. Is the backend running?");
            // Fallback for demo if backend is down (optional, but requested "real details")
            // setResults([]); 
        } finally {
            setLoading(false);
        }
    };

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
                        editable={false}
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

                {loading ? (
                    <View className="mt-20 items-center justify-center">
                        <ActivityIndicator size="large" color="#2563eb" />
                        <Text className="text-slate-500 mt-4">Searching ProXplore...</Text>
                    </View>
                ) : error ? (
                    <View className="mt-20 items-center justify-center px-6">
                        <MaterialIcons name="error-outline" size={48} color="#ef4444" />
                        <Text className="text-slate-800 font-bold text-lg mt-4 text-center">Something went wrong</Text>
                        <Text className="text-slate-500 text-center mt-2">{error}</Text>
                        <TouchableOpacity onPress={fetchResults} className="mt-6 bg-blue-600 px-6 py-2 rounded-full">
                            <Text className="text-white font-bold">Try Again</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        {/* AI Overview / Knowledge Panel - Only show if query returns results */}
                        {results.length > 0 && (
                            <View className="px-4 mb-4 mt-2">
                                <View className="bg-white rounded-2xl p-5 border border-purple-100 relative overflow-hidden shadow-sm">
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
                                        Found {results.length} results for "{query}". The top result is from {results[0]?.title || 'ProXplore'}.
                                    </Text>
                                </View>
                            </View>
                        )}

                        {/* Search Results List */}
                        <View className="px-4 gap-3">
                            {results.map((item, index) => (
                                <TouchableOpacity key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                                    <View className="flex-row items-center gap-2 mb-1.5">
                                        <View className="w-5 h-5 bg-slate-100 rounded-full items-center justify-center">
                                            <MaterialIcons name="public" size={12} color="#64748b" />
                                        </View>
                                        <Text className="text-[10px] text-slate-500 font-medium" numberOfLines={1}>{item.url}</Text>
                                    </View>
                                    <Text className="text-base font-bold text-blue-700 mb-1">{item.title}</Text>
                                    <Text className="text-xs text-slate-500 leading-5" numberOfLines={3}>
                                        {item.content}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {results.length === 0 && (
                            <View className="mt-20 items-center justify-center px-6">
                                <MaterialIcons name="search-off" size={48} color="#94a3b8" />
                                <Text className="text-slate-500 mt-4">No results found for "{query}"</Text>
                            </View>
                        )}
                    </>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}
