import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ExpandImageScreen({ route }) {
    const navigation = useNavigation();
    const { imageUrl } = route.params || { imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format' }; // Fallback

    return (
        <View className="flex-1 bg-black justify-center items-center relative">
            <SafeAreaView className="absolute top-0 left-0 right-0 z-10 flex-row justify-between px-4 pt-4">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 rounded-full bg-black/50 items-center justify-center"
                >
                    <MaterialIcons name="close" size={24} color="white" />
                </TouchableOpacity>
                <View className="flex-row gap-4">
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-black/50 items-center justify-center">
                        <MaterialIcons name="share" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-black/50 items-center justify-center">
                        <MaterialIcons name="more-vert" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <Image
                source={{ uri: imageUrl }}
                style={{ width: Dimensions.get('window').width, height: 500 }}
                resizeMode="contain"
            />
        </View>
    );
}
