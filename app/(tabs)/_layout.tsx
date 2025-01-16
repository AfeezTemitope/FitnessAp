import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const TabLayout = () => {
    const colorScheme = useColorScheme();
    const activeTintColor = colorScheme === 'dark' ? '#FF6347' : '#4CAF50'; // Use green for light mode, red for dark mode

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: activeTintColor, // Dynamically adjust based on color scheme
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: {
                    ...Platform.select({
                        ios: {
                            position: 'absolute',
                        },
                        default: {},
                    }),
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="house.fill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="sign-in"
                options={{
                    title: 'Login/Register',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="account" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
