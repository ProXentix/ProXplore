import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { userData, weatherData, trendingData, languages } from '../data';
import Logo from '../components/Logo';


export default function HomeScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigation.navigate('SearchResult', { query: searchQuery.trim() });
            setSearchQuery('');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background-light pt-8">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>

                {/* Header */}
                <View className="px-6 flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center gap-3">
                        <View className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-primary/10">
                            <Image
                                source={{ uri: userData.avatarUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        <View>
                            <Text className="text-xs text-slate-500 font-medium">Namaste,</Text>
                            <Text className="text-sm font-bold text-slate-900 dark:text-white">{userData.name}</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center gap-2">
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Weather')}
                            className="bg-white/70 rounded-full px-4 py-2 flex-row items-center gap-2 shadow-sm border border-white/40"
                        >
                            <MaterialIcons name="wb-sunny" size={18} color="#fb923c" />
                            <Text className="text-xs font-bold text-slate-800">{weatherData.temp}</Text>
                            <Text className="text-[10px] opacity-60 text-slate-600">{weatherData.location}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Notifications')}
                            className="w-10 h-10 rounded-full bg-white/70 items-center justify-center shadow-sm border border-white/40"
                        >
                            <MaterialIcons name="notifications" size={20} color="#475569" />
                        </TouchableOpacity>
                    </View>
                </View>


                {/* Title & Search */}
                <View className="mt-8 px-6 text-center w-full">
                    <View className="items-center mb-6 gap-2">
                        <Logo width={80} height={80} />
                        <Text className="text-3xl font-extrabold tracking-tighter text-primary">
                            ProXplore
                        </Text>
                    </View>

                    <View className="relative w-full">
                        <View className="absolute inset-y-0 left-4 justify-center z-10 h-16 pointer-events-none">
                            <MaterialIcons name="search" size={24} color="#259df4" />
                        </View>
                        <TextInput
                            className="w-full h-16 pl-14 pr-14 rounded-full bg-white shadow-xl shadow-primary/5 text-lg font-medium text-slate-800"
                            placeholder="Search Bharat..."
                            placeholderTextColor="#94a3b8"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearch}
                            returnKeyType="search"
                            style={{
                                elevation: 4, // for android shadow
                            }}
                        />
                        <TouchableOpacity 
                            onPress={handleSearch}
                            className="absolute inset-y-0 right-4 justify-center h-16"
                        >
                            <View className="p-2 rounded-full hover:bg-slate-100">
                                {searchQuery.length > 0 ? (
                                    <MaterialIcons name="arrow-forward" size={24} color="#259df4" />
                                ) : (
                                    <MaterialIcons name="mic" size={24} color="#94a3b8" />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Language Section */}
                <View className="mt-8">
                    <View className="px-6 mb-3">
                        <Text className="text-xs font-bold uppercase tracking-wider text-slate-400">Language</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}>
                        {languages.map((lang, index) => (
                            <TouchableOpacity
                                key={index}
                                className={`px-6 py-2 rounded-full ${index === 0 ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-white/70 border border-white/40'}`}
                            >
                                <Text className={`text-sm ${index === 0 ? 'font-semibold text-white' : 'font-medium text-slate-600'}`}>
                                    {lang}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Trending Section */}
                <View className="mt-10 px-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-lg font-bold text-slate-900">Trending in India</Text>
                        <View className="flex-row items-center gap-1">
                            <View className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <Text className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live</Text>
                        </View>
                    </View>

                    <View className="gap-5">
                        {trendingData.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.7}
                                className="bg-white rounded-3xl p-5 flex-row items-center gap-5 shadow-lg shadow-blue-500/5 border border-slate-100"
                            >
                                <View className="w-14 h-14 bg-blue-50 rounded-2xl items-center justify-center border border-blue-100/50">
                                    <MaterialIcons name={item.icon} size={28} color="#259df4" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[11px] font-bold text-blue-500 tracking-wider uppercase mb-0.5">{item.overline}</Text>
                                    <View className="flex-row items-center justify-between">
                                        <Text className="text-[15px] font-bold text-slate-800 flex-1 mr-2" numberOfLines={1}>
                                            {item.mainText}
                                        </Text>

                                        {item.statusText && item.statusStyle === 'pill' && (
                                            <View className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/50">
                                                <Text className="text-[10px] font-semibold text-slate-600">
                                                    {item.statusText}
                                                </Text>
                                            </View>
                                        )}

                                        {item.statusText && item.statusStyle === 'text-green' && (
                                            <View className="bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                                                <Text className="text-[10px] font-bold text-green-600">
                                                    {item.statusText}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                                <MaterialIcons name="chevron-right" size={24} color="#cbd5e1" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
