import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text} from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Aray ko Po, Hello Sir
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FCFC",
    height: 900,
    
  },
  text:{
    fontSize: 100,
    textAlign: "center"
  }
});