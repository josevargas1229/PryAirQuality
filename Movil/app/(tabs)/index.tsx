import React from 'react';
import { StyleSheet } from 'react-native';
import Clima from '@/components/Clima';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <Clima
      backgroundColor="#f0f0f0"
      contentBackgroundColor="#fff"
      parallaxHeaderHeight={300}
      renderForeground={() => null} // No necesitamos un encabezado foreground
    >

    </Clima>
  );
}
;
