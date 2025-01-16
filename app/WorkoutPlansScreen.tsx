import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

export default function WorkoutPlansScreen() {
    const workoutPlans = [
        { id: '1', name: 'Beginner Full Body Workout' },
        { id: '2', name: 'Intermediate Strength Training' },
        { id: '3', name: 'Advanced HIIT' },
        { id: '4', name: 'Yoga and Flexibility' },
    ];

    const handleSelectPlan = (plan) => {
        // Handle the logic when a plan is selected,
        // like navigating to a detailed view of the plan
        console.log(`Selected Plan: ${plan.name}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Workout Plans</Text>
            <FlatList
                data={workoutPlans}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.planCard}
                        onPress={() => handleSelectPlan(item)}
                    >
                        <Text style={styles.planName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    planCard: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // For Android shadow
    },
    planName: {
        fontSize: 18,
        fontWeight: '500',
    },
});
