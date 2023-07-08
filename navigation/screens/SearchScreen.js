import React from 'react';
import { TextInput, StyleSheet, View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const navigation = useNavigation();

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
    fetch("https://webdis-d3bs.onrender.com/search?keyw="+searchQuery)
      .then((response) => response.json())
      .then((animeList) => {
        if (animeList.length > 0) {
          setAnimeList(animeList);
          setSearchError(false);
        } else {
          setAnimeList([]);
          setSearchError(true);
        }
      });
  };

  const handleDetails = (animeId) => {
    console.log('Pressed');
    navigation.navigate('Details', { title: animeId });
  };
  
  
  

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleDetails(item.animeId)}>
        <Image source={{ uri: item.animeImg }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.title}>{item.animeTitle}</Text>
      <Text style={styles.releaseDate}>{item.episodeNum}</Text>
    </View>
  );
  
  

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
      />
      {searchError && (
        <Text style={styles.errorMessage}>No anime found for &quot;{searchQuery}&quot;</Text>
      )}

      <FlatList
        data={animeList}
        renderItem={renderItem}
        keyExtractor={(item) => item.animeTitle.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: '90%',
    marginLeft: 20,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    marginLeft: 20,
  },
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

export default SearchScreen;
