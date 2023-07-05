import * as React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { StyleSheet, View, Image, Text, FlatList } from 'react-native';

function SearchScreen() {

    const [searchQuery, setSearchQuery] = useState('');
    const [animeList, setAnimeList] = useState([]);
    const [searchError, setSearchError] = useState(false);


    const handleSearch = () => {
        // Perform search operation with searchQuery value
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
    
    const renderItem = ({ item }) => (
        <View style={styles2.container}>
        <Image source={{ uri: item.animeImg }} style={styles2.image} />
        <Text style={styles2.title}>{item.animeTitle}</Text>
        <Text style={styles2.releaseDate}>{item.episodeNum}</Text>
        </View>
    );

    return(
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
        borderRadius: 20, // Add rounded corners
        width: '90%',
        marginLeft: 20,
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
        marginLeft: 20,
      },
  });

const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    itemContainer: {
      marginBottom: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    search_b: {
      fontSize: 30,
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
    textInput2: {
      marginBottom: 20,
      marginTop: 20,
      borderWidth: '100%',
      padding: 20,
      fontSize: 40,
    }
  });
  

export default SearchScreen;