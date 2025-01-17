import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface ProfileProps {
    userToken: string;
}

interface ProfileData {
    username: string;
    email: string;
    age: string;
    profile_image: string;
}

const Profile: React.FC<ProfileProps> = ({ userToken }) => {

    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [profileImage, setProfileImage] = useState<string>('https://www.alfintechcomputer.com/wp-content/uploads/2021/01/Lisa-.jpg');


    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [isEditingAge, setIsEditingAge] = useState<boolean>(false);
    const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);


    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get<ProfileData>('http://api-url/api/profile/', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                const { username, email, age, profile_image } = response.data;
                setName(username);
                setEmail(email);
                setAge(age);
                setProfileImage(profile_image);
            } catch (err) {
                setError('Failed to load profile');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userToken]);


    const handleSaveProfile = async () => {
        setLoading(true);
        setError('');

        try {
            const profileData: ProfileData = {
                username: name,
                email: email,
                age: age,
                profile_image: profileImage,
            };

            const response = await axios.put('http://api-url/api/profile/update/', profileData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Profile updated successfully!');
            }
        } catch (error) {
            setError('Failed to update profile');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Profile Image */}
            <View style={styles.profileImageContainer}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                <TouchableOpacity style={styles.editIcon}>
                    <FontAwesome5 name="camera" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Name */}
            <View style={styles.editFieldContainer}>
                <Text style={styles.label}>Name</Text>
                {isEditingName ? (
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                ) : (
                    <Text style={styles.value}>{name}</Text>
                )}
                <TouchableOpacity onPress={() => setIsEditingName(!isEditingName)} style={styles.editButton}>
                    <FontAwesome5 name="pen" size={20} color="black" />
                </TouchableOpacity>
            </View>

            {/* Age */}
            <View style={styles.editFieldContainer}>
                <Text style={styles.label}>Age</Text>
                {isEditingAge ? (
                    <TextInput
                        style={styles.input}
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                    />
                ) : (
                    <Text style={styles.value}>{age}</Text>
                )}
                <TouchableOpacity onPress={() => setIsEditingAge(!isEditingAge)} style={styles.editButton}>
                    <FontAwesome5 name="pen" size={20} color="black" />
                </TouchableOpacity>
            </View>

            {/* Email */}
            <View style={styles.editFieldContainer}>
                <Text style={styles.label}>Email</Text>
                {isEditingEmail ? (
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                ) : (
                    <Text style={styles.value}>{email}</Text>
                )}
                <TouchableOpacity onPress={() => setIsEditingEmail(!isEditingEmail)} style={styles.editButton}>
                    <FontAwesome5 name="pen" size={20} color="black" />
                </TouchableOpacity>
            </View>

            {/* Save Button */}
            <TouchableOpacity
                onPress={handleSaveProfile}
                style={styles.saveButton}
                disabled={loading}
            >
                <Text style={styles.saveButtonText}>
                    {loading ? 'Saving...' : 'Save Profile'}
                </Text>
            </TouchableOpacity>

            {/* Error message */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Subscription Button */}
            <TouchableOpacity style={styles.subscriptionButton}>
                <Text style={styles.subscriptionText}>Subscribe</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignSelf: 'center',
        paddingTop: height * 0.05,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: width * 0.5,
        height: width * 0.5,
        borderRadius: width * 0.25,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    editFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    input: {
        flex: 2,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    value: {
        flex: 2,
        fontSize: 16,
        color: '#333',
    },
    editButton: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    saveButton: {
        backgroundColor: '#df71ff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    subscriptionButton: {
        backgroundColor: '#ff61a6',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    subscriptionText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Profile;
