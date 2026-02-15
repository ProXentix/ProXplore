import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const API_KEY = '6ca13d9d9043566bd3cb9133d3ca9618';

export default function WeatherScreen() {
    const navigation = useNavigation();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState('New Delhi');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchWeather(city);
    }, []);

    const fetchWeather = async (cityName) => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();

            if (response.ok) {
                setWeather(data);
                setCity(data.name);
            } else {
                Alert.alert("Error", data.message || "City not found");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please check your internet connection.");
        } finally {
            setLoading(false);
            setIsSearching(false);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            fetchWeather(searchQuery);
            setSearchQuery('');
        }
    };

    const getWeatherIcon = (condition) => {
        if (!condition) return "wb-sunny";
        const main = condition.toLowerCase();
        if (main.includes('cloud')) return "cloud";
        if (main.includes('rain')) return "water-drop";
        if (main.includes('clear')) return "wb-sunny";
        if (main.includes('snow')) return "ac-unit";
        if (main.includes('thunder')) return "flash-on";
        if (main.includes('drizzle')) return "grain";
        if (main.includes('mist') || main.includes('smoke') || main.includes('haze')) return "dehaze";
        return "wb-sunny";
    };

    const formatDate = () => {
        const date = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

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

                        {isSearching ? (
                            <View className="flex-1 mx-4 bg-white/20 rounded-full px-4 py-1 flex-row items-center border border-white/30">
                                <TextInput
                                    className="flex-1 text-white font-medium h-8"
                                    placeholder="Search city..."
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    onSubmitEditing={handleSearch}
                                    autoFocus
                                />
                                <TouchableOpacity onPress={() => setIsSearching(false)}>
                                    <MaterialIcons name="close" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View className="items-center">
                                <Text className="text-xl font-bold text-white tracking-tight">{city}</Text>
                                <Text className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{formatDate()}</Text>
                            </View>
                        )}

                        {!isSearching && (
                            <TouchableOpacity
                                onPress={() => setIsSearching(true)}
                                className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/30"
                            >
                                <MaterialIcons name="search" size={20} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {loading ? (
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="white" />
                            <Text className="text-white mt-4 font-medium">Fetching weather...</Text>
                        </View>
                    ) : weather ? (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                            {/* Main Weather Card */}
                            <View className="px-6 mt-8">
                                <View className="bg-white/20 rounded-[3rem] p-8 items-center relative overflow-hidden border border-white/30">
                                    <View className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300/30 rounded-full" />
                                    <MaterialIcons
                                        name={getWeatherIcon(weather.weather[0].main)}
                                        size={96}
                                        color="#fde047"
                                        style={{ textShadowColor: 'rgba(0,0,0,0.1)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 10 }}
                                    />
                                    <View className="mt-4 items-center">
                                        <Text className="text-7xl font-extrabold text-white tracking-tighter">
                                            {Math.round(weather.main.temp)}°
                                        </Text>
                                        <Text className="text-2xl font-semibold text-white/90 mt-2 capitalize">
                                            {weather.weather[0].description}
                                        </Text>
                                        <View className="flex-row items-center gap-4 mt-4">
                                            <Text className="text-white/80 font-bold text-sm">H: {Math.round(weather.main.temp_max)}°</Text>
                                            <Text className="text-white/80 font-bold text-sm">L: {Math.round(weather.main.temp_min)}°</Text>
                                        </View>
                                    </View>
                                </View>
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
                                        <Text className="text-2xl font-bold text-white">{weather.main.humidity}%</Text>
                                        <Text className="text-[10px] text-white/60 font-medium mt-1">
                                            {weather.main.humidity > 60 ? "High" : "Normal"}
                                        </Text>
                                    </View>
                                </View>

                                {/* Pressure (Replacing UV Index as standard API doesn't give UV) */}
                                <View className="w-[48%] bg-white/20 rounded-3xl p-5 border border-white/20">
                                    <View className="flex-row items-center gap-2 mb-3">
                                        <MaterialIcons name="speed" size={18} color="rgba(255,255,255,0.7)" />
                                        <Text className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Pressure</Text>
                                    </View>
                                    <View>
                                        <Text className="text-xl font-bold text-white">{weather.main.pressure} hPa</Text>
                                        <Text className="text-[10px] text-white/60 font-medium mt-1">Sea Level</Text>
                                    </View>
                                </View>

                                {/* Wind */}
                                <View className="w-[48%] bg-white/20 rounded-3xl p-5 border border-white/20">
                                    <View className="flex-row items-center gap-2 mb-3">
                                        <MaterialIcons name="air" size={18} color="rgba(255,255,255,0.7)" />
                                        <Text className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Wind</Text>
                                    </View>
                                    <View>
                                        <Text className="text-2xl font-bold text-white">{Math.round(weather.wind.speed * 3.6)} km/h</Text>
                                        <Text className="text-[10px] text-white/60 font-medium mt-1">Wind Speed</Text>
                                    </View>
                                </View>

                                {/* Visibility (Replacing AQI) */}
                                <View className="w-[48%] bg-white/20 rounded-3xl p-5 border border-white/20">
                                    <View className="flex-row items-center gap-2 mb-3">
                                        <MaterialIcons name="visibility" size={18} color="rgba(255,255,255,0.7)" />
                                        <Text className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Visibility</Text>
                                    </View>
                                    <View>
                                        <Text className="text-2xl font-bold text-white">{(weather.visibility / 1000).toFixed(1)} km</Text>
                                        <Text className="text-[10px] text-white/60 font-medium mt-1">Clear View</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Hourly Forecast Placeholder (API requires One Call subscription for hourly) */}
                            <View className="mt-8 px-6 pb-6">
                                <Text className="text-white/60 text-xs text-center">
                                    * Hourly forecast data requires a paid API subscription.
                                </Text>
                            </View>

                        </ScrollView>
                    ) : (
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-white text-lg font-medium">Weather data unavailable</Text>
                            <TouchableOpacity onPress={() => fetchWeather(city)} className="mt-4 bg-white/20 px-6 py-2 rounded-full">
                                <Text className="text-white font-bold">Retry</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}
