import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { userData } from '../data';

export default function EditProfileScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState(userData.name);
    const [handle, setHandle] = useState('kanishk_raj');
    const [bio, setBio] = useState('Tech enthusiast, traveler, and foodie. exploring the world one byte at a time.');
    const [location, setLocation] = useState('India');

    const handleSave = () => {
        // Here you would typically make an API call to update the user profile
        Alert.alert("Success", "Profile updated successfully!", [
            { text: "OK", onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
                    <MaterialIcons name="arrow-back-ios-new" size={20} color="#334155" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-900">Edit Profile</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text className="text-primary font-bold text-base">Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
                {/* Avatar Section */}
                <View className="items-center mb-8">
                    <View className="relative">
                        <View className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50">
                            <Image
                                source={{ uri: userData.avatarUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        <TouchableOpacity className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-white">
                            <MaterialIcons name="camera-alt" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-primary font-semibold mt-3">Change Profile Photo</Text>
                </View>

                {/* Form Fields */}
                <View className="gap-6">
                    <View>
                        <Text className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-semibold text-base"
                            placeholder="Enter your name"
                        />
                    </View>

                    <View>
                        <Text className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Username</Text>
                        <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4">
                            <Text className="text-slate-500 font-semibold text-base mr-1">@</Text>
                            <TextInput
                                value={handle}
                                onChangeText={setHandle}
                                className="flex-1 py-3 text-slate-900 font-semibold text-base"
                                placeholder="username"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View>
                        <Text className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Bio</Text>
                        <TextInput
                            value={bio}
                            onChangeText={setBio}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium text-base h-24"
                            placeholder="Tell us about yourself"
                            multiline
                            textAlignVertical="top"
                        />
                    </View>

                    <View>
                        <Text className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Location</Text>
                        <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4">
                            <MaterialIcons name="location-on" size={20} color="#94a3b8" />
                            <TextInput
                                value={location}
                                onChangeText={setLocation}
                                className="flex-1 py-3 ml-2 text-slate-900 font-semibold text-base"
                                placeholder="Add location"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
