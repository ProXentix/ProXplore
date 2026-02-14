import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { userData, menuItems } from '../data';

export default function ProfileScreen() {
    const navigation = useNavigation();

    const handleMenuPress = (item) => {
        switch (item.title) {
            case 'Edit Profile':
                navigation.navigate('EditProfile');
                break;
            case 'Notifications':
                navigation.navigate('Notifications');
                break;
            case 'Language':
                navigation.navigate('Language');
                break;
            case 'Settings':
                navigation.navigate('Settings');
                break;
            case 'Help & Support':
                navigation.navigate('HelpSupport');
                break;
            case 'Log Out':
                // Handle logout
                alert('Log Out functionality coming soon!');
                break;
            default:
                break;
        }
    };
    return (
        <SafeAreaView className="flex-1 bg-background-light pt-8">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Profile Header */}
                <View className="items-center px-6 mb-8">
                    <View className="relative">
                        <View className="w-24 h-24 rounded-full border-4 border-white shadow-sm overflow-hidden bg-primary/10">
                            <Image
                                source={{ uri: userData.avatarUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        <TouchableOpacity className="absolute bottom-0 right-0 bg-primary w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-sm">
                            <MaterialIcons name="edit" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-xl font-bold text-slate-900 mt-4">{userData.name}</Text>
                    <Text className="text-sm text-slate-500 font-medium">@kanishk_raj • India</Text>
                </View>

                {/* Stats */}
                <View className="flex-row justify-center gap-4 px-6 mb-8">
                    <View className="bg-white px-6 py-3 rounded-2xl items-center shadow-sm border border-slate-100 min-w-[100px]">
                        <Text className="text-lg font-bold text-slate-800">128</Text>
                        <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saved</Text>
                    </View>
                    <View className="bg-white px-6 py-3 rounded-2xl items-center shadow-sm border border-slate-100 min-w-[100px]">
                        <Text className="text-lg font-bold text-slate-800">42</Text>
                        <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Read</Text>
                    </View>
                </View>

                {/* Menu */}
                <View className="bg-white rounded-t-[32px] px-6 py-8 flex-1 shadow-lg shadow-slate-200">
                    <Text className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Settings</Text>
                    <View className="gap-2">
                        {menuItems.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                className="flex-row items-center p-3 rounded-xl active:bg-slate-50"
                                onPress={() => handleMenuPress(item)}
                            >
                                <View className="w-10 h-10 rounded-full items-center justify-center bg-slate-50 mr-4" style={{ backgroundColor: item.color + '15' }}>
                                    <MaterialIcons name={item.icon} size={20} color={item.color} />
                                </View>
                                <Text className={`flex-1 text-base font-semibold ${item.title === 'Log Out' ? 'text-red-500' : 'text-slate-700'}`}>{item.title}</Text>
                                <MaterialIcons name="chevron-right" size={24} color="#e2e8f0" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
