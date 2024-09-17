// Trending.jsx
import { FlatList, Text, TouchableOpacity } from "react-native";
import React from "react";

const TrendingItem = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Text>{item.title}</Text> {/* Asegúrate de que 'title' exista en el objeto item */}
    </TouchableOpacity>
);

const Trending = ({ posts }) => {
    return (
        <FlatList
            data={posts}
            horizontal
            keyExtractor={(item) => item.id.toString()} // Asegúrate de que el ID sea único y convertido a cadena
            renderItem={({ item }) => (
                <TrendingItem item={item} onPress={() => console.log(item)} />
            )}
            ListEmptyComponent={() => <Text>No hay publicaciones populares disponibles.</Text>}
        />
    );
};

export default Trending;
