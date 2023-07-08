import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const EpisodeListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { totalEpisodes } = route.params;
  const { param2 } = route.params;

  const episodeList = Array.from({ length: totalEpisodes }, (_, index) => index + 1);
  const screenWidth = Dimensions.get('window').width;
  const maxButtonsPerLine = Math.floor(screenWidth / 100); // Adjust the button width as needed
  const spacing = 10; // Adjust the spacing between buttons
  const buttonWidth = (screenWidth - (maxButtonsPerLine + 1) * spacing) / maxButtonsPerLine;

  const handleEpisodePress = async (episodeNumber) => {
    try {
      const url = `https://api.consumet.org/anime/gogoanime/watch/${param2}-episode-${episodeNumber}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      const animelist = await response.json();
  
      if (animelist && animelist.sources) {
        // Find the URL with 720p quality
        const url720p = animelist.sources.find((source) => source.quality === '720p')?.url;
        if (url720p) {
          console.log('720p URL:', url720p);
          navigation.navigate('VideoScreen', { params3: url720p });
        } else {
          console.log('No 720p URL found');
        }
      } else {
        console.log('Invalid animelist data');
      }
  
      console.log(episodeNumber);
    } catch (error) {
      console.log('Fetch error:', error);
      console.log(episodeNumber);
    }
    console.log('Chill');
  };
  
  

  const renderEpisodeButton = ({ item }) => (
    <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={() => handleEpisodePress(item)}>
      <Text style={styles.buttonText}>Episode {item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={episodeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderEpisodeButton}
        numColumns={maxButtonsPerLine}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EpisodeListScreen;
