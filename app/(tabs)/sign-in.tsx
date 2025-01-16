import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Modal,
    SafeAreaView,
    Button,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from "expo-router";
import RNPickerSelect from 'react-native-picker-select';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
    const route = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [gender, setGender] = useState<'M' | 'F'>('F');
    const [otp, setOtp] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState<boolean>(false);

    const handleLogin = async () => {
        const loginData = { username, password };

        try {
            console.log("Attempting to log in with:", loginData);
            const response = await axios.post('https://9e5d-102-89-47-205.ngrok-free.app/api/auth/token/', loginData,{

                timeout:10000,
            })
            console.log("Login response:", response);
            if (response.status === 200) {
                const { access, refresh } = response.data;
                await AsyncStorage.setItem('access_token', access);
                await AsyncStorage.setItem('refresh_token', refresh);
                Alert.alert("Success", "Login successful!", [
                    { text: "OK", onPress: () => route.push('/Premium') },
                ]);
            }
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Error", "Invalid username or password.");
        }
    };

    const handleRegister = async () => {
        const registrationData = {
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            password,
            re_password: rePassword,
            age,
            weight,
            height,
            gender,
        };

        try {
            const response = await axios.post('https://9e5d-102-89-47-205.ngrok-free.app/api/register/', registrationData);
            if (response.status === 201) {
                const otpFromServer = response.data.otp;
                await AsyncStorage.setItem('otp', otpFromServer);
                setShowOtpModal(true);
            }
        } catch (error) {
            console.error("Registration error:", error);
            Alert.alert("Error", "Something went wrong during registration.");
        }
    };

    const handleOtpVerification = async () => {
        const storedOtp = await AsyncStorage.getItem('otp');
        if (storedOtp === otp) {
            Alert.alert("Success", "OTP verified successfully!", [
                { text: "OK", onPress: () => route.push('/Premium') },
            ]);
        } else {
            Alert.alert("Error", "Invalid OTP");
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter a valid email address.");
            return;
        }

        try {
            const response = await axios.post('https://9e5d-102-89-47-205.ngrok-free.app/api/auth/password_reset/', { email });
            if (response.status === 200) {
                Alert.alert("Success", "Password reset link has been sent to your email.");
                setShowForgotPasswordModal(false);
            }
        } catch (error) {
            console.error("Forgot Password error:", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>{isLogin ? "DuduYemiFitnessApp" : "Create an Account"}</Text>

                {isLogin ? (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <Button title="Login" color="#6200EE" onPress={handleLogin} />
                        <TouchableOpacity style={styles.link} onPress={() => setIsLogin(false)}>
                            <Text style={styles.linkText}>Don't have an account? Create an account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.link} onPress={() => setShowForgotPasswordModal(true)}>
                            <Text style={styles.linkText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
                        <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
                        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
                        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                        <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
                        <TextInput style={styles.input} placeholder="Weight" value={weight} onChangeText={setWeight} keyboardType="numeric" />
                        <TextInput style={styles.input} placeholder="Height" value={height} onChangeText={setHeight} keyboardType="numeric" />
                        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                        <TextInput style={styles.input} placeholder="Re-type Password" value={rePassword} onChangeText={setRePassword} secureTextEntry />

                        {/* Gender Picker */}
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerLabel}>Gender</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setGender(value)}
                                items={[
                                    { label: 'Male', value: 'M' },
                                    { label: 'Female', value: 'F' },
                                ]}
                                value={gender}
                                style={{
                                    inputAndroid: {
                                        backgroundColor: '#fff',
                                        padding: 10,
                                        marginBottom: 10,
                                        borderWidth: 1,
                                        borderColor: '#6200EE',
                                        borderRadius: 10,
                                        width: '90%',
                                        fontSize: 16,
                                    },
                                    inputIOS: {
                                        backgroundColor: '#fff',
                                        padding: 10,
                                        marginBottom: 10,
                                        borderWidth: 1,
                                        borderColor: '#6200EE',
                                        borderRadius: 10,
                                        width: '90%',
                                        fontSize: 16,
                                    },
                                }}
                            />
                        </View>

                        <Button title="Register" color="#6200EE" onPress={handleRegister} />
                        <TouchableOpacity style={styles.link} onPress={() => setIsLogin(true)}>
                            <Text style={styles.linkText}>Already have an account? Login</Text>
                        </TouchableOpacity>
                    </>
                )}

                {/* OTP Modal */}
                <Modal visible={showOtpModal} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Enter OTP</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="OTP"
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType="numeric"
                            />
                            <Button title="Verify OTP" color="#6200EE" onPress={handleOtpVerification} />
                            <TouchableOpacity style={styles.link} onPress={() => setShowOtpModal(false)}>
                                <Text style={styles.linkText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Forgot Password Modal */}
                <Modal visible={showForgotPasswordModal} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Enter Your Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                            <Button title="Send Password Reset Link" color="#6200EE" onPress={handleForgotPassword} />
                            <TouchableOpacity style={styles.link} onPress={() => setShowForgotPasswordModal(false)}>
                                <Text style={styles.linkText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    title: {
        fontSize: width > 375 ? 28 : 24,
        color: '#6200EE',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#6200EE',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        width: '100%',
        maxWidth: 400,
    },
    link: {
        marginTop: 10,
        alignItems: 'center',
    },
    linkText: {
        color: '#6200EE',
        fontSize: 16,
    },
    pickerContainer: {
        marginBottom: 15,
    },
    pickerLabel: {
        fontSize: 16,
        color: '#6200EE',
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
        color: '#6200EE',
    },
});
