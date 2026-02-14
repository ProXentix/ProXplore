import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { exploreCategories, explorePlaces } from '../data';

export default function SearchScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background-light pt-4">
            <View className="px-6 mb-4">
                <Text className="text-2xl font-bold text-slate-800">Xplore</Text>
                <Text className="text-sm text-slate-500">Discover new places & experiences</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Search Input */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center bg-white rounded-full px-4 h-12 shadow-sm border border-slate-100">
                        <MaterialIcons name="search" size={24} color="#94a3b8" />
                        <TextInput
                            className="flex-1 ml-2 text-slate-800 font-medium"
                            placeholder="Where to next?"
                            placeholderTextColor="#cbd5e1"
                        />
                        <View className="w-px h-6 bg-slate-200 mx-2" />
                        <TouchableOpacity>
                            <MaterialIcons name="tune" size={20} color="#64748b" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <View className="mb-8">
                    <Text className="px-6 text-base font-bold text-slate-800 mb-4">Categories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}>
                        {exploreCategories.map((cat) => (
                            <TouchableOpacity key={cat.id} className="items-center gap-2">
                                <View className="w-16 h-16 rounded-2xl items-center justify-center bg-white shadow-sm border border-slate-50" style={{ shadowColor: cat.color, shadowOpacity: 0.1, shadowRadius: 10 }}>
                                    <MaterialIcons name={cat.icon} size={28} color={cat.color} />
                                </View>
                                <Text className="text-xs font-semibold text-slate-600">{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Popular Places */}
                <View className="px-6">
                    <Text className="text-base font-bold text-slate-800 mb-4">Popular Places</Text>
                    <View className="flex-row flex-wrap justify-between gap-y-4">
                        {explorePlaces.map((place) => (
                            <TouchableOpacity key={place.id} className="w-[48%] bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                                <View className="w-full h-32 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                    <Image source={{ uri: place.image }} className="w-full h-full" resizeMode="cover" />
                                    <View className="absolute top-2 right-2 bg-white/90 px-1.5 py-0.5 rounded-md flex-row items-center gap-0.5">
                                        <MaterialIcons name="star" size={10} color="#eab308" />
                                        <Text className="text-[10px] font-bold text-slate-800">{place.rating}</Text>
                                    </View>
                                </View>
                                <View className="px-1 pb-1">
                                    <Text className="text-sm font-bold text-slate-800 mb-0.5" numberOfLines={1}>{place.title}</Text>
                                    <View className="flex-row items-center gap-1">
                                        <MaterialIcons name="location-pin" size={10} color="#94a3b8" />
                                        <Text className="text-[10px] text-slate-500" numberOfLines={1}>{place.location}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
