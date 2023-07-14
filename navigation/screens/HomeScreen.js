import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StyleSheet, Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

function HomeScreen() {
  const [animeList, setAnimeList] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetch("https://webdis-d3bs.onrender.com/recent-release")
      .then((response) => response.json())
      .then((animeList) => {
        setAnimeList(animeList);
        console.log("Anime List: ", animeList);
        setisLoading(false); // Set isLoading to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setisLoading(false); // Set isLoading to false even if there's an error
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
      <StatusBar hidden />
      <View style={styles.header}>
        <Ionicons name="infinite" size={30} color="red" style={styles.headerIconL} />
        <Text style={styles.headerText}>Animiwa</Text>
        <Ionicons name="infinite" size={30} color="red" style={styles.headerIconR} />
      </View>
      <FlatList
        data={animeList}
        renderItem={renderItem}
        keyExtractor={(item) => item.animeTitle.toString()}
        numColumns={2} // Display items in two columns
        contentContainerStyle={styles.contentContainer} // Add spacing between items
        ListEmptyComponent={() => (
          <ActivityIndicator size="large" color="blue" />
        )} // Show loading indicator when the list is empty
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000', // Set background color to black
  },
  headerIconL: {
    marginRight: 3,
  },
  headerIconR: {
    marginLeft: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    marginBottom: 16,
    marginTop: 10,
  },
  headerText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#fff', // Set text color to white
  },
  contentContainer: {
    justifyContent: 'space-between', // Add space between columns
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

export default HomeScreen;
