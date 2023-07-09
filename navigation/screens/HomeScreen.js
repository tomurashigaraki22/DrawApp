import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StyleSheet, Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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
        console.log('Pressed img')
        navigation.navigate('Details', {title: animeTitle})
    }

    const renderItem = ({ item }) => (
        <View style={styles2.container}>
            <TouchableOpacity onPress={() => Details(item.animeId)}>
                <Image source={{ uri: item.animeImg }} style={styles2.image} />
            </TouchableOpacity>
            <Text style={styles2.title}>{item.animeTitle}</Text>
            <Text style={styles2.releaseDate}>{item.episodeNum}</Text>
        </View>
    );
    
    return (
        <View style={styles2.container}>
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
        color: 'black'
    },
    search_b: {
        fontSize: 30,
    },
    releaseDate: {
        fontSize: 14,
        color: 'black',
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
