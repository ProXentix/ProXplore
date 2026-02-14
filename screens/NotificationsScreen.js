import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { notificationData } from '../data';

const NotificationItem = ({ item, onPress }) => {
    // Map colors to specific Tailwind classes to ensure they are generated
    const colorMap = {
        blue: {
            bg: 'bg-blue-500',
            shadow: 'shadow-blue-500/20',
            text: 'text-blue-600',
            bar: 'bg-blue-500'
        },
        green: {
            bg: 'bg-green-500',
            shadow: 'shadow-green-500/20',
            text: 'text-green-600',
            bar: 'bg-green-500'
        },
        amber: {
            bg: 'bg-amber-500',
            shadow: 'shadow-amber-500/20',
            text: 'text-amber-600',
            bar: 'bg-amber-500'
        },
        purple: {
            bg: 'bg-purple-500',
            shadow: 'shadow-purple-500/20',
            text: 'text-purple-600',
            bar: 'bg-purple-500'
        },
        red: {
            bg: 'bg-red-500',
            shadow: 'shadow-red-500/20',
            text: 'text-red-600',
            bar: 'bg-red-500'
        }
    };

    const colors = colorMap[item.color] || colorMap.blue;

    return (
        <TouchableOpacity
            onPress={() => onPress(item)}
            className={`bg-${!item.read ? 'white' : 'white/80'} rounded-2xl p-4 flex-row items-start gap-4 shadow-sm border border-slate-100 overflow-hidden relative mb-4`}
        >
            {!item.read && <View className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bar}`} />}
            <View className={`w-12 h-12 ${colors.bg} rounded-xl items-center justify-center shadow-lg ${colors.shadow}`}>
                <MaterialIcons name={item.icon} size={24} color="white" />
            </View>
            <View className="flex-1">
                <View className="flex-row justify-between items-start">
                    <Text className={`text-xs font-bold ${colors.text} uppercase tracking-tight`}>{item.title}</Text>
                    <Text className="text-[10px] font-medium text-slate-400">{item.time}</Text>
                </View>
                <Text className={`text-sm font-bold text-slate-900 mt-0.5 leading-snug ${item.read ? 'text-slate-600' : ''}`}>{item.subtitle}</Text>
                <Text className="text-[11px] text-slate-500 mt-1">{item.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default function NotificationsScreen() {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState(notificationData);

    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updatedNotifications);
        Alert.alert("Success", "All notifications marked as read");
    };

    const handleNotificationPress = (item) => {
        // Toggle read status
        const updatedNotifications = notifications.map(n =>
            n.id === item.id ? { ...n, read: true } : n
        );
        setNotifications(updatedNotifications);

        // Show details (in a real app, this might navigate to a specific screen)
        Alert.alert(item.title, item.description);
    };

    const todayNotifications = notifications.filter(n => n.section === 'Today');
    const yesterdayNotifications = notifications.filter(n => n.section === 'Yesterday');

    return (
        <SafeAreaView className="flex-1 bg-background-light pt-4">
            {/* Header */}
            <View className="px-6 flex-row items-center justify-between mb-6">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-sm"
                    >
                        <MaterialIcons name="arrow-back-ios-new" size={18} color="#334155" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-slate-900">Notifications</Text>
                </View>
                <View className="flex-row gap-2">
                    <TouchableOpacity onPress={markAllAsRead} className="bg-primary/10 px-3 py-1.5 rounded-full">
                        <Text className="text-xs font-bold text-primary">Read All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setNotifications([])} className="bg-red-50 px-3 py-1.5 rounded-full">
                        <Text className="text-xs font-bold text-red-500">Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
                {/* Today Section */}
                {todayNotifications.length > 0 && (
                    <View className="mb-4">
                        <Text className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">Today</Text>
                        <View>
                            {todayNotifications.map(item => (
                                <NotificationItem key={item.id} item={item} onPress={handleNotificationPress} />
                            ))}
                        </View>
                    </View>
                )}

                {/* Yesterday Section */}
                {yesterdayNotifications.length > 0 && (
                    <View>
                        <Text className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">Yesterday</Text>
                        <View>
                            {yesterdayNotifications.map(item => (
                                <NotificationItem key={item.id} item={item} onPress={handleNotificationPress} />
                            ))}
                        </View>
                    </View>
                )}

                {notifications.length === 0 && (
                    <View className="items-center justify-center py-20">
                        <MaterialIcons name="notifications-none" size={64} color="#cbd5e1" />
                        <Text className="text-slate-400 font-semibold mt-4">No notifications yet</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
