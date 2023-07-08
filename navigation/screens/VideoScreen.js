import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import VideoPlayer from 'expo-fullscreen-video-player';

export default function App({route}) {
  const { params3 } = route.params;

  return (
    <View style={styles.container}>      
       <VideoPlayer
          source={{ uri: params3 }}
          resizeMode="cover"
          shouldPlay
          fullscreenMode = "LANDSCAPE"
          useNativeControls
          style={{ width: Dimensions.get('window').height, height: Dimensions.get('window').width, transform: [{ rotate: '90deg' }] }}
        />
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