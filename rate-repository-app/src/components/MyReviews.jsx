import { FlatList, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
    container1: {
        display: "flex",
        flexGrow: 0,
        flexDirection: "column",
        padding: 10,
    },
    container2: {
        flexGrow: 0,
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    separator: {
        height: 10
    },
    text: {
        flexGrow: 0,
        color: "lightGrey"
    },
    rating: {
        width: 50,
        height: 50,
        padding: 16,
        marginRight: 10,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        color: theme.colors.primary,
        justifyContent: "center",
        alignContent: "center"
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
    return(
        <View style={styles.container2}>
            <Text style={styles.rating} fontWeight="bold" fontSize="subheading" >{review.rating}</Text>
            <View style={{ marginRight: 40 }}>
                <Text fontSize="subheading" fontWeight="bold" color="primary" >{review.user.username}</Text>
                <Text style={{ marginBottom: 7, marginRight: 5, flexWrap: "wrap" }} fontSize="subheading" color="secondary" >
                    {format(review.createdAt, "dd.MM.y")}
                </Text>
                <Text style={{ flexWrap: "wrap", marginRight: 10 }}>{review.text}</Text>
            </View>
        </View>
    );
};

const MyReviews = () => {
    const { data } = useQuery(ME, { fetchPolicy: "cache-and-network", variables: { includeReviews: true } });
    console.log(data);
    const reviews = data?.me.reviews.edges.map( edge => edge.node );
    return (
        <FlatList 
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default MyReviews;