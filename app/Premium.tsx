import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

const Premium = () => {
    const route = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post('https://9e5d-102-89-47-205.ngrok-free.app/api/auth/token/blacklist/', {}, {
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('access_token')}`
                }
            });

            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('refresh_token');
            route.push('/sign-in');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.lightDarkText}>Light & Dark</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <MaterialIcons name="logout" size={30} color="#ff0000" />
                </TouchableOpacity>
            </View>

            {/* Banner */}
            <View style={styles.bannerContainer}>
                <Image
                    source={{ uri: 'https://i.pinimg.com/originals/fe/d1/a2/fed1a20cd5a13efc6e068ce151f7df30.jpg' }}
                    style={styles.banner}
                    resizeMode="cover"
                />
            </View>

            {/* Graph */}
            <View style={styles.graphContainer}>
                <Image
                    source={{ uri: 'https://cdn.pixabay.com/photo/2018/01/12/16/16/growth-3078544_960_720.png' }}
                    style={styles.graphImage}
                    resizeMode="cover"
                />
            </View>

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.noDataContainer}>
                    <Text>No fitness data available</Text>
                </View>
            </ScrollView>

            {/* Tab Bar */}
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabButton} onPress={() => route.push('/Profile')}>
                    <Ionicons name="person" size={30} color="#000000" />
                    <Text style={styles.tabText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => route.push('/livesession')}>
                    <Ionicons name="radio" size={30} color="#ff0000" />
                    <Text style={styles.tabText}>Live Session</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => route.push('/exercise')}>
                    <Ionicons name="fitness" size={30} color="#df71ff" />
                    <Text style={styles.tabText}>Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => route.push('/Settings')}>
                    <Ionicons name="settings" size={30} color="#000000" />
                    <Text style={styles.tabText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 100,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        zIndex: 10,
    },
    lightDarkText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    logoutButton: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        elevation: 5,
    },
    bannerContainer: {
        width: '100%',
        height: height * 0.25,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: "center",
    },
    banner: {
        width: '80%',
        height: '100%',
        borderRadius: 20,
    },
    graphContainer: {
        width: '100%',
        height: height * 0.25,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    graphImage: {
        width: '80%',
        height: '100%',
        borderRadius: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        marginTop: 20,
        paddingBottom: 70,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    tabButton: {
        alignItems: 'center',
    },
    tabText: {
        color: '#000000',
        fontSize: 12,
        marginTop: 5,
    },
});

export default Premium;
