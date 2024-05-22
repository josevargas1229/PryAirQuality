import React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import Clima from '@/components/Clima';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <Clima
      backgroundColor="#f0f0f0"
      contentBackgroundColor="#fff"
      parallaxHeaderHeight={300}
      renderForeground={() => (
        <ThemedView style={styles.headerContainer}>
          <HelloWave />
          <ThemedText style={styles.headerText}>Welcome to HomeScreen</ThemedText>
        </ThemedView>
      )}
    >
      <ThemedView style={styles.contentContainer}>
        <ThemedText style={styles.titleContainer}>Title</ThemedText>
        <ThemedText style={styles.stepContainer}>Step 1</ThemedText>
        <ThemedText style={styles.stepContainer}>Step 2</ThemedText>
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.reactLogo}
        />
      </ThemedView>
    </Clima>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  contentContainer: {
    padding: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
