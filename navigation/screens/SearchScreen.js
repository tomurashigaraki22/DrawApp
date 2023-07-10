import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Image, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
    setIsLoading(true);
    fetch("https://webdis-d3bs.onrender.com/search?keyw=" + searchQuery)
      .then((response) => response.json())
      .then((animeList) => {
        if (animeList.length > 0) {
          setAnimeList(animeList);
          setSearchError(false);
        } else {
          setAnimeList([]);
          setSearchError(true);
        }
        setIsLoading(false);
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
        placeholderTextColor="#999"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#D81F26" />
      ) : (
        <>
          {searchError && (
            <Text style={styles.errorMessage}>No anime found for &quot;{searchQuery}&quot;</Text>
          )}
          <FlatList
            data={animeList}
            renderItem={renderItem}
            keyExtractor={(item) => item.animeTitle.toString()}
            numColumns={1} // Display items in two columns
            contentContainerStyle={styles.contentContainer} // Add spacing between items
          />
        </>
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
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 10,
    color: '#fff',
  },
  errorMessage: {
    color: '#D81F26',
    marginTop: 10,
    marginLeft: 20,
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

export default SearchScreen;
 