import React from 'react';
import { Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
const { width, height } = Dimensions.get('window');

type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
    const route = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.innerContainer}>
                <Image
                    source={require('@/assets/images/icon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <ThemedView style={styles.greeting}>
                    <ThemedText type="title" style={styles.title}>
                        Welcome To DuduYemiFitnessApp!
                    </ThemedText>
                    <ThemedText type="body" style={styles.subtitle}>
                        Get ready to achieve your fitness goals.
                    </ThemedText>
                </ThemedView>

                {/* Workout Tracking Card */}
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => route.push('/WorkoutTrackingScreen')}>
                    <ThemedText type="subtitle" style={styles.cardTitle}>Workout Tracking</ThemedText>
                    <ThemedText type="body" style={styles.cardDescription}>Track your workouts and monitor your progress</ThemedText>
                </TouchableOpacity>

                {/* Progress Tracking Card */}
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => route.push('/ProgressTrackingScreen')}>
                    <ThemedText type="subtitle" style={styles.cardTitle}>Progress Tracking</ThemedText>
                    <ThemedText type="body" style={styles.cardDescription}>See your fitness journey and improvements</ThemedText>
                </TouchableOpacity>

                {/* Personalized Workout Plans Card */}
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => route.push('/WorkoutPlansScreen')}>
                    <ThemedText type="subtitle" style={styles.cardTitle}>Personalized Plans</ThemedText>
                    <ThemedText type="body" style={styles.cardDescription}>Get customized workout plans designed for you</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    innerContainer: {
        padding: width > 360 ? 20 : 15,
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: width > 360 ? 200 : 160,
        height: height > 600 ? 140 : 120,
        alignSelf: 'center',
        marginBottom: 20,
    },
    greeting: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: width > 360 ? 28 : 24,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#F8F8F8',
        padding: width > 360 ? 20 : 15,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    cardDescription: {
        fontSize: 14,
        color: '#555',
    },
});

export default HomeScreen;
