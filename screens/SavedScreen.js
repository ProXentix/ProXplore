import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { savedItems } from '../data';

export default function SavedScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background-light pt-4">
            <View className="px-6 mb-4">
                <Text className="text-2xl font-bold text-slate-800">Saved</Text>
                <Text className="text-sm text-slate-500">Your bookmarks & favorite reads</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24, gap: 16 }}>
                {savedItems.map((item) => (
                    <TouchableOpacity key={item.id} className="flex-row bg-white rounded-2xl p-3 shadow-sm border border-slate-100 gap-4">
                        <View className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden">
                            <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
                        </View>
                        <View className="flex-1 py-1 justify-between">
                            <View>
                                <View className="flex-row items-center justify-between mb-1">
                                    <Text className="text-[10px] font-bold text-primary tracking-wider uppercase">{item.category}</Text>
                                    <TouchableOpacity>
                                        <MaterialIcons name="bookmark" size={18} color="#259df4" />
                                    </TouchableOpacity>
                                </View>
                                <Text className="text-sm font-bold text-slate-800 leading-5" numberOfLines={2}>{item.title}</Text>
                            </View>
                            <View className="flex-row items-center gap-1">
                                <MaterialIcons name="access-time" size={12} color="#94a3b8" />
                                <Text className="text-[10px] font-medium text-slate-400">{item.date}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
