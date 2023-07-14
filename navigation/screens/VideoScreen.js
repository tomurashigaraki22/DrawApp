import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function VideoScreen({ route }) {
  const { params3 } = route.params;
  const video = React.useRef(null);
  const navigation = useNavigation();

  const handleDownload = () => {
    console.log('Not done....')
    navigation.navigate('LinkGen', { params2: params3 })
  }

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
      <TouchableOpacity onPress={handleDownload} style={styles.downloadButton}>
        <Ionicons name='download' size={30} color='red' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').width,
    transform: [{ rotate: '90deg' }],
  },
  downloadButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
