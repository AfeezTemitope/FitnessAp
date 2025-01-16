// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { Colors } from '@/constants/Colors';
//
// export default function WorkoutTrackingScreen() {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Track Your Workouts</Text>
//
//             <ScrollView style={styles.scrollContainer}>
//                 <View style={styles.workoutCard}>
//                     <Text style={styles.workoutTitle}>Morning Yoga</Text>
//                     <Text style={styles.workoutDetail}>30 minutes</Text>
//                     <Text style={styles.workoutDetail}>Burned 200 kcal</Text>
//                 </View>
//                 <View style={styles.workoutCard}>
//                     <Text style={styles.workoutTitle}>Afternoon Run</Text>
//                     <Text style={styles.workoutDetail}>40 minutes</Text>
//                     <Text style={styles.workoutDetail}>Burned 350 kcal</Text>
//                 </View>
//             </ScrollView>
//
//             <TouchableOpacity style={styles.button}>
//                 <Text style={styles.buttonText}>Add New Workout</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: Colors.background,
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: Colors.primary,
//         marginBottom: 20,
//     },
//     scrollContainer: {
//         marginBottom: 20,
//     },
//     workoutCard: {
//         backgroundColor: '#FFF',
//         padding: 15,
//         marginBottom: 10,
//         borderRadius: 12,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//         elevation: 5,
//     },
//     workoutTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: Colors.primary,
//     },
//     workoutDetail: {
//         fontSize: 14,
//         color: Colors.secondary,
//     },
//     button: {
//         backgroundColor: Colors.primary,
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     buttonText: {
//         fontSize: 18,
//         color: '#FFF',
//     },
// });
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, Linking, Dimensions } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

interface Workout {
    name: string;
    distance: number;
    moving_time: number;
}

const WorkoutTrackingScreen: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        axios.get('https://9e5d-102-89-47-205.ngrok-free.app/api/strava/authenticate/')
            .then(response => {
                if (response.data.activities) {
                    setWorkouts(response.data.activities);
                    setLoading(false);
                } else {
                    // If no activities, initiate OAuth flow
                    Alert.alert("Authentication", "Please authenticate with Strava", [
                        {
                            text: 'OK',
                            onPress: handleStravaAuth,
                        },
                    ]);
                }
            })
            .catch(error => {
                Alert.alert("Error", "An error occurred. Please try again later.");
                setLoading(false);
            });
    }, []);

    const handleStravaAuth = () => {
        Linking.openURL("https://9e5d-102-89-47-205.ngrok-free.app/api/strava/authenticate/")
            .catch(err => Alert.alert("Error", "Unable to open authentication page"));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Track Your Workouts</Text>

            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <ScrollView style={styles.scrollContainer}>
                    {workouts.length > 0 ? (
                        workouts.map((workout, index) => (
                            <View style={styles.workoutCard} key={index}>
                                <Text style={styles.workoutTitle}>{workout.name}</Text>
                                <Text style={styles.workoutDetail}>Distance: {workout.distance} meters</Text>
                                <Text style={styles.workoutDetail}>Duration: {Math.round(workout.moving_time / 60)} minutes</Text>
                            </View>
                        ))
                    ) : (
                        <Text>No workouts found. Please log in with Strava to see your activities.</Text>
                    )}
                </ScrollView>
            )}

            <TouchableOpacity style={styles.button} onPress={handleStravaAuth}>
                <Text style={styles.buttonText}>Connect with Strava</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: width > 360 ? 24 : 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollContainer: {
        marginBottom: 20,
    },
    workoutCard: {
        backgroundColor: '#FFF',
        padding: width > 360 ? 15 : 10,
        marginBottom: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    workoutTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    workoutDetail: {
        fontSize: 14,
        color: '#555',
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: width > 360 ? 30 : 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
    },
});

export default WorkoutTrackingScreen;



