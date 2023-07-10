import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function PopularScreen() {
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("https://webdis-d3bs.onrender.com/popular")
      .then((response) => response.json())
      .then((animeList) => {
        setAnimeList(animeList);
        setIsLoading(false); // Set isLoading to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false); // Set isLoading to false even if there's an error
      });
  }, []);

  const Details = (animeTitle) => {
    console.log('Pressed img');
    navigation.navigate('Details', { title: animeTitle });
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Details(item.animeId)}>
        <Image source={{ uri: item.animeImg }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.title}>{item.animeTitle}</Text>
      <Text style={styles.releaseDate}>{item.episodeNum}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="tv" size={24} color="#fff" style={styles.headerIcon} />
        <Text style={styles.headerText}>Popular</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#D81F26" />
      ) : (
        <FlatList
          data={animeList}
          renderItem={renderItem}
          keyExtractor={(item) => item.animeTitle.toString()}
          numColumns={2} // Display items in two columns
          contentContainerStyle={styles.contentContainer} // Add spacing between items
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000', // Set background color to black
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    marginBottom: 16,
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#fff', // Set text color to white
  },
  headerIcon: {
    marginRight: 8,
  },
  contentContainer: {
    justifyContent: 'space-between', // Add space between items
    paddingBottom: 16, // Add bottom padding for spacing between items
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff', // Set text color to white
  },
  releaseDate: {
    fontSize: 14,
    color: '#fff', // Set text color to white
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
});

export default PopularScreen;
