import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={animeList}
          renderItem={renderItem}
          keyExtractor={(item) => item.animeTitle.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 14,
    color: 'gray',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
});

export default PopularScreen;
