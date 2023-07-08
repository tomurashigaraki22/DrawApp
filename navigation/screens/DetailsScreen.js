import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ route }) => {
  const { title } = route.params;
  const [animeList, setAnimeList] = useState([]);
  const url = 'https://webdis-d3bs.onrender.com/anime-details/' + title;
  console.log(url);

  useEffect(() => {
    fetchAnimeDetails();
  }, []);

  const fetchAnimeDetails = async () => {
    try {
      const response = await fetch(`https://webdis-d3bs.onrender.com/anime-details/${title}`);
      const data = await response.json();
      console.log('API Response:', data);
      if (data) {
        setAnimeList(data);
      } else {
        setAnimeList([]);
      }
    } catch (error) {
      console.log('API Error:', error);
    }
  };

  const navigation = useNavigation();

  const handleToEp = () => {
    navigation.navigate('EpisodeList', { totalEpisodes: animeList.totalEpisodes, param2: title });
  };

  if (animeList.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Image source={{ uri: animeList.animeImg }} style={styles.image} />
        <Text style={styles.title}>{animeList.animeTitle}</Text>
        <Text style={styles.description}>{animeList.synopsis}</Text>
        <Text style={styles.totalEpisodes}>Total Episodes: {animeList.totalEpisodes}</Text>
        <TouchableOpacity style={styles.button} onPress={handleToEp}>
          <Text style={styles.buttonText}>Episode List</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  totalEpisodes: {
    fontSize: 14,
    color: 'gray',
  },
});

export default DetailsScreen;
