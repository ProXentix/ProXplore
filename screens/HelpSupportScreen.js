import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HelpSupportScreen() {
    const navigation = useNavigation();

    const faqItems = [
        {
            question: "How do I reset my password?",
            answer: "Go to Settings > Privacy & Security > Change Password to reset your password."
        },
        {
            question: "How do I save an article?",
            answer: "Tap the bookmark icon on any article card to save it to your collection. You can access saved items in the 'Saved' tab."
        },
        {
            question: "Can I use the app offline?",
            answer: "Yes, you can read articles you've previously saved or opened while offline."
        },
        {
            question: "How do I delete my account?",
            answer: "Please contact our support team to request account deletion."
        }
    ];

    return (
        <SafeAreaView className="flex-1 bg-background-light">
            <View className="px-6 py-4 flex-row items-center gap-4 bg-white border-b border-slate-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2 rounded-full active:bg-slate-100">
                    <MaterialIcons name="arrow-back-ios-new" size={20} color="#334155" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-slate-900">Help & Support</Text>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>

                {/* Search FAQ */}
                <View className="bg-white p-2 rounded-2xl flex-row items-center border border-slate-200 shadow-sm mb-8">
                    <MaterialIcons name="search" size={24} color="#94a3b8" className="ml-2" />
                    <TextInput
                        placeholder="Search for help..."
                        className="flex-1 p-2 text-base text-slate-700"
                    />
                </View>

                {/* Contact Options */}
                <Text className="text-lg font-bold text-slate-900 mb-4">Contact Us</Text>
                <View className="flex-row gap-4 mb-8">
                    <TouchableOpacity className="flex-1 bg-white p-4 rounded-2xl items-center border border-slate-100 shadow-sm">
                        <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-3">
                            <MaterialIcons name="chat" size={24} color="#3b82f6" />
                        </View>
                        <Text className="font-bold text-slate-800">Chat</Text>
                        <Text className="text-xs text-slate-500 text-center mt-1">Start a live chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-1 bg-white p-4 rounded-2xl items-center border border-slate-100 shadow-sm">
                        <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-3">
                            <MaterialIcons name="mail" size={24} color="#3b82f6" />
                        </View>
                        <Text className="font-bold text-slate-800">Email</Text>
                        <Text className="text-xs text-slate-500 text-center mt-1">support@prox.com</Text>
                    </TouchableOpacity>
                </View>

                {/* FAQ Section */}
                <Text className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</Text>
                <View className="gap-3">
                    {faqItems.map((item, index) => (
                        <View key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <Text className="font-bold text-slate-800 mb-2">{item.question}</Text>
                            <Text className="text-sm text-slate-500 leading-relaxed">{item.answer}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
