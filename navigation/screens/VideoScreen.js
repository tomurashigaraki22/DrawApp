import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function App({ route }) {
  const { params3 } = route.params;
  const video = React.useRef(null);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: params3,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  video: {
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').width,
    transform: [{ rotate: '90deg' }],
  },
  buttons: {
    marginTop: 16,
  },
});
