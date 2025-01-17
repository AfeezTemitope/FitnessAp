import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

type SettingOption = {
    id: string;
    label: string;
    onPress: () => void;
};

const SettingsScreen = () => {
    const [selectedColor, setSelectedColor] = useState<string>('white');
    const [contactMessage, setContactMessage] = useState<string>('');
    const [isContactingSupport, setIsContactingSupport] = useState<boolean>(false);
    const router = useRouter();

    const settingsData: SettingOption[] = [
        {
            id: '1',
            label: 'Change Sound',
            onPress: () => {
                Alert.alert('Sound Option', 'You can toggle the sound here');
            },
        },
        {
            id: '2',
            label: 'Change Color',
            onPress: () => {
                setSelectedColor(selectedColor === 'white' ? 'blue' : 'white');
            },
        },
        {
            id: '3',
            label: 'Delete Account',
            onPress: () => {
                Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
                    { text: 'Cancel' },
                    {
                        text: 'Delete',
                        onPress: () => {
                            // Simulating account deletion
                            Alert.alert('Account Deleted', 'Your account has been successfully deleted');
                            router.push('/index');
                        },
                    },
                ]);
            },
        },
        {
            id: '4',
            label: 'Contact Us',
            onPress: () => {
                setIsContactingSupport(true);
            },
        },
    ];

    const handleSendMessage = () => {
        if (contactMessage) {
            Alert.alert('Message Sent', 'Your message has been sent to support.');
            setContactMessage(''); // Clear the message after sending
            setIsContactingSupport(false); // Close the contact form
        } else {
            Alert.alert('Message Error', 'Please type a message.');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: selectedColor }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Settings</Text>
            <FlatList
                data={settingsData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            padding: 15,
                            marginVertical: 5,
                            backgroundColor: 'lightgray',
                            borderRadius: 8,
                        }}
                        onPress={item.onPress}>
                        <Text style={{ fontSize: 18 }}>{item.label}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
            {isContactingSupport && (
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        style={{
                            height: 100,
                            borderColor: 'gray',
                            borderWidth: 1,
                            padding: 10,
                            textAlignVertical: 'top',
                        }}
                        multiline
                        placeholder="Type your message here..."
                        value={contactMessage}
                        onChangeText={setContactMessage}
                    />
                    <Button title="Send Message" onPress={handleSendMessage} />
                </View>
            )}
        </View>
    );
};

export default SettingsScreen;
