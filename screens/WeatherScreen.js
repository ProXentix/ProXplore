import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WeatherScreen() {
    const navigation = useNavigation();

    return (
        <View className="flex-1">
            <LinearGradient
                colors={['#7dd3fc', '#38bdf8', '#0ea5e9']}
                style={{ flex: 1 }}
            >
                <SafeAreaView className="flex-1">
                    {/* Header */}
                    <View className="px-6 pt-2 flex-row items-center justify-between z-10">
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/30"
                        >
                            <MaterialIcons name="arrow-back-ios-new" size={18} color="white" />
                        </TouchableOpacity>
                        <View className="items-center">
                            <Text className="text-xl font-bold text-white tracking-tight">New Delhi</Text>
                            <Text className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Sep 12, Monday</Text>
                        </View>
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/30">
                            <MaterialIcons name="add-location-alt" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                        {/* Main Weather Card */}
                        <View className="px-6 mt-8">
                            <View className="bg-white/20 rounded-[3rem] p-8 items-center relative overflow-hidden border border-white/30">
                                <View className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300/30 rounded-full" />
                                <MaterialIcons name="wb-sunny" size={96} color="#fde047" style={{ textShadowColor: 'rgba(0,0,0,0.1)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 10 }} />
                                <View className="mt-4 items-center">
                                    <Text className="text-7xl font-extrabold text-white tracking-tighter">28°</Text>
                                    <Text className="text-2xl font-semibold text-white/90 mt-2">Sunny</Text>
                                    <View className="flex-row items-center gap-4 mt-4 text-sm font-medium text-white/80">
                                        <Text className="text-white/80 font-bold">H: 31°</Text>
                                        <Text className="text-white/80 font-bold">L: 22°</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Hourly Forecast */}
                        <View className="mt-10">
                            <View className="flex-row items-center justify-between mb-4 px-8">
                                <Text className="text-sm font-bold text-white uppercase tracking-wider">Hourly Forecast</Text>
                                <Text className="text-xs font-bold text-white/70">Next 24h</Text>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}>
                                {/* Item 1 */}
                                <View className="w-20 py-4 rounded-3xl bg-white/30 items-center border border-white/40">
                                    <Text className="text-[10px] font-bold text-white mb-2">Now</Text>
                                    <MaterialIcons name="wb-sunny" size={24} color="white" style={{ marginBottom: 8 }} />
                                    <Text className="text-sm font-bold text-white">28°</Text>
                                </View>
                                {/* Item 2 */}
                                <View className="w-20 py-4 rounded-3xl bg-white/20 items-center border border-white/10">
                                    <Text className="text-[10px] font-bold text-white/70 mb-2">14:00</Text>
                                    <MaterialIcons name="wb-sunny" size={24} color="white" style={{ marginBottom: 8 }} />
                                    <Text className="text-sm font-bold text-white">29°</Text>
                                </View>
                                {/* Item 3 */}
                                <View className="w-20 py-4 rounded-3xl bg-white/20 items-center border border-white/10">
                                    <Text className="text-[10px] font-bold text-white/70 mb-2">15:00</Text>
                                    <MaterialIcons name="wb-sunny" size={24} color="white" style={{ marginBottom: 8 }} />
                                    <Text className="text-sm font-bold text-white">30°</Text>
                                </View>
                                {/* Item 4 */}
                                <View className="w-20 py-4 rounded-3xl bg-white/20 items-center border border-white/10">
                                    <Text className="text-[10px] font-bold text-white/70 mb-2">16:00</Text>
                                    <MaterialIcons name="cloud" size={24} color="white" style={{ marginBottom: 8 }} />
                                    <Text className="text-sm font-bold text-white">28°</Text>
                                </View>
                            </ScrollView>
                        </View>

                        {/* Stats Grid */}
                        <View className="px-6 mt-8 flex-row flex-wrap justify-between gap-y-4">
                            {/* Humidity */}
                            <View className="w-[48%] bg-white/20 rounded-3xl p-5 border border-white/20">
                                <View className="flex-row items-center gap-2 mb-3">
                                    <MaterialIcons name="water-drop" size={18} color="rgba(255,255,255,0.7)" />
                                    <Text className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Humidity</Text>
                                </View>
                                <View>
                                    <Text className="text-2xl font-bold text-white">42%</Text>
                                    <Text className="text-[10px] text-white/60 font-medium mt-1">Normal levels</Text>
                                </View>
                            </View>

                            {/* UV Index */}
                            <View className="w-[48%] bg-white/20 rounded-3xl p-5 border border-white/20">
                                <View className="flex-row items-center gap-2 mb-3">
                                    <MaterialIcons name="wb-sunny" size={18} color="rgba(255,255,255,0.7)" />
                                    <Text className="text-[10px] font-bold text-white/70 uppercase tracking-widest">UV Index</Text>
                                </View>
                                <View>
                                    <Text className="text-2xl font-bold text-white">6</Text>
                                    <Text className="text-[10px] text-white/60 font-medium mt-1">Moderate</Text>
                                </View>
                            </View>

                            {/* Wind */}
                            <View className="w-[48%] bg-white/20 rounded-3xl p-5 border border-white/20">
                                <View className="flex-row items-center gap-2 mb-3">
                                    <MaterialIcons name="air" size={18} color="rgba(255,255,255,0.7)" />
                                    <Text className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Wind</Text>
                                </View>
                                <View>
                                    <Text className="text-2xl font-bold text-white">12 km/h</Text>
                                    <Text className="text-[10px] text-white/60 font-medium mt-1">NW Breeze</Text>
                                </View>
                            </View>

                            {/* AQI */}
                            <View className="w-[48%] bg-white/20 rounded-3xl p-5 border border-white/20">
                                <View className="flex-row items-center gap-2 mb-3">
                                    <MaterialIcons name="grain" size={18} color="rgba(255,255,255,0.7)" />
                                    <Text className="text-[10px] font-bold text-white/70 uppercase tracking-widest">AQI</Text>
                                </View>
                                <View>
                                    <Text className="text-2xl font-bold text-white">84</Text>
                                    <Text className="text-[10px] text-white/60 font-medium mt-1">Satisfactory</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}
