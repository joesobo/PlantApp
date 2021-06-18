import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Plant from './components/Plant';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Plant title="Big Cunt" subtitle="Sub Cunt" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
