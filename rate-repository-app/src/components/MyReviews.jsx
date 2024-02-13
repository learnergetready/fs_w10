import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
    container1: {
        display: "flex",
        flexGrow: 0,
        flexDirection: "column",
        padding: 10,
        backgroundColor: "white",
    },
    container2: {
        flexGrow: 0,
        flexDirection: "row",
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

const ReviewItem = ({ review, refetch }) => {
    const navigate = useNavigate();
    const [deleteReview] = useDeleteReview();
    const handleDelete = () => {
        Alert.alert(
            "Delete review",
            `Are you sure you want to delete the review for repository ${review.repository.fullName}`, [
                {
                    text: "Cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        await deleteReview(review.id);
                        refetch();
                    }
                }
            ]);
    };

    return(
        <View style={styles.container1}>
            <View style={styles.container2}>
                <Text style={styles.rating} fontWeight="bold" fontSize="subheading" >{review.rating}</Text>
                <View style={{ marginRight: 40 }}>
                    <Text fontSize="subheading" fontWeight="bold" color="primary" >{review.repository.fullName}</Text>
                    <Text style={{ marginBottom: 7, marginRight: 5, flexWrap: "wrap" }} fontSize="subheading" color="secondary" >
                        {format(review.createdAt, "dd.MM.y")}
                    </Text>
                    <Text style={{ flexWrap: "wrap", marginRight: 10 }}>{review.text}</Text>
                </View>
            </View>
            <View style={{ ...styles.container2, justifyContent: "center" }}>
                <Pressable onPress={() => navigate(`/repository/${review.repositoryId}`)} style={{ backgroundColor: theme.colors.primary, paddingVertical: 20, paddingHorizontal: 30, borderRadius: 5, margin: 10 }}>
                    <Text fontSize="subheading" style={{ color: "white", textAlign: "center" }} >Go to the repository</Text>
                </Pressable>
                <Pressable onPress={() => handleDelete()} style={{ backgroundColor: theme.colors.errorRed, paddingVertical: 20, paddingHorizontal: 30, borderRadius: 5, margin: 10 }}>
                    <Text fontSize="subheading" style={{ color: "white", textAlign: "center" }} >Delete the review</Text>
                </Pressable>
            </View>
        </View>
    );
};

const MyReviews = () => {
    const { data, refetch } = useQuery(ME, { fetchPolicy: "cache-and-network", variables: { includeReviews: true } });
    const reviews = data?.me.reviews.edges.map( edge => edge.node );
    return (
        <FlatList 
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default MyReviews;