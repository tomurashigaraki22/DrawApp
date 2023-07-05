import * as React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet, Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';

function HomeScreen() {
    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        fetch("https://webdis-d3bs.onrender.com/recent-release")
        .then((response) => response.json())
        .then((animeList) => {
            setAnimeList(animeList);
            console.log("Anime List: ", animeList);
        });
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles2.container}>
        <Image source={{ uri: item.animeImg }} style={styles2.image} />
        <Text style={styles2.title}>{item.animeTitle}</Text>
        <Text style={styles2.releaseDate}>{item.episodeNum}</Text>
        </View>
    );

    return (
        <FlatList
            data={animeList}
            renderItem={renderItem}
            keyExtractor={(item) => item.animeTitle.toString()}
        />
    );
    }

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
      

export default HomeScreen;