import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import {Ionicons } from "@expo/vector-icons";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { backgroundColor: '#F8FCFC'},
      }}>
      <Tabs.Screen
        name="LabExam1"
        options={{
          title: 'Lab Exam 1', tabBarActiveTintColor: "#000000",
          tabBarIcon: ({ color }) => <Ionicons name="document-text-outline" size={24} color= "#000000"/>
        }}
      />
      <Tabs.Screen
        name="LabExam2"
        options={{
          title: 'Lab Exam 2', tabBarActiveTintColor: "#000000",
          tabBarIcon: ({ color }) =>  <Ionicons name="document-text-outline" size={24} color= "#000000"/>,
        }}
      />
    </Tabs>
  );
}
