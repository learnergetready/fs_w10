import { Text, View } from "react-native";

const RepositoryItem = ({item}) => {
    return (
        <View>
            <Text>Name: {item.fullName}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Language: {item.language}</Text>
            <Text>Stars: {item.stargazersCount}</Text>
            <Text>Forks: {item.forksCount}</Text>
            <Text>Number of reviews: {item.reviewCount}</Text>
            <Text>Avg. rating: {item.ratingAverage}</Text>
        </View>
    );
};

export default RepositoryItem;