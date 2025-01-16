import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

export default function ProgressTrackingScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Progress</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.sectionTitle}>Weight Progress</Text>
                <LineChart
                    data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                        datasets: [{ data: [70, 68, 65, 63, 60] }], // Example data
                    }}
                    width={width * 0.9}  // Dynamic width based on screen size
                    height={height * 0.3} // Dynamic height based on screen size
                    chartConfig={{
                        backgroundColor: '#FFF',
                        backgroundGradientFrom: '#FFF',
                        backgroundGradientTo: '#FFF',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(66, 133, 244, ${opacity})`,
                    }}
                />

                <Text style={styles.sectionTitle}>Calories Burned</Text>
                <LineChart
                    data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                        datasets: [{ data: [1500, 1600, 1700, 1800, 1900] }], // Example data
                    }}
                    width={width * 0.9}  // Dynamic width based on screen size
                    height={height * 0.3} // Dynamic height based on screen size
                    chartConfig={{
                        backgroundColor: '#FFF',
                        backgroundGradientFrom: '#FFF',
                        backgroundGradientTo: '#FFF',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                    }}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    header: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: height * 0.03,
    },
    sectionTitle: {
        fontSize: width * 0.05,
        color: '#4CAF50',
        marginVertical: height * 0.02,
    },
    scrollContainer: {
        paddingBottom: height * 0.1,
    },
});
