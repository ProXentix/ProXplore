import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function ScanScreen() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-background-light p-6">
                <Text className="text-center text-lg font-bold text-slate-800 mb-4">We need your permission to show the camera</Text>
                <TouchableOpacity
                    onPress={requestPermission}
                    className="bg-primary px-6 py-3 rounded-full shadow-lg shadow-primary/30"
                >
                    <Text className="text-white font-bold text-base">Grant Permission</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        // In a real app, you would navigate or process the data here
    };

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View className="flex-1 bg-black">
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing={facing}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "ean13"],
                }}
            >
                <SafeAreaView className="flex-1 justify-between">
                    {/* Top Bar */}
                    <View className="px-6 py-4 flex-row justify-between items-center bg-black/20 backdrop-blur-sm">
                        <TouchableOpacity onPress={toggleCameraFacing} className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/10">
                            <MaterialIcons name="flip-camera-ios" size={20} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white font-bold text-lg tracking-wider">Scan QR Code</Text>
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/10">
                            <MaterialIcons name="flash-on" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Scanning Frame */}
                    <View className="flex-1 items-center justify-center">
                        <View className="w-64 h-64 rounded-3xl border-2 border-white/50 relative bg-transparent items-center justify-center">
                            <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl -mt-1 -ml-1" />
                            <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl -mt-1 -mr-1" />
                            <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl -mb-1 -ml-1" />
                            <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl -mb-1 -mr-1" />

                            {/* Scanning Animation Line (Static for now) */}
                            <View className="w-full h-0.5 bg-primary/80 shadow-lg shadow-primary" />
                        </View>
                        <Text className="text-white/70 text-sm mt-8 bg-black/40 px-4 py-2 rounded-full">Align QR code within the frame</Text>
                    </View>

                    {/* Bottom Action */}
                    <View className="pb-24 items-center">
                        {scanned && (
                            <TouchableOpacity
                                onPress={() => setScanned(false)}
                                className="bg-white px-8 py-3 rounded-full shadow-lg"
                            >
                                <Text className="text-primary font-bold text-base">Tap to Scan Again</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </SafeAreaView>
            </CameraView>
        </View>
    );
}
