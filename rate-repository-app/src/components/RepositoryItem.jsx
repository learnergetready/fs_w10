import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { numberInKs } from "../utils";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
    container1: {
        display: "flex",
        flexGrow: 0,
        flexDirection: "column",
        backgroundColor: "white",
        padding: 10,
    },
    container2: {
        flexGrow: 0,
        flexDirection: "row",
        padding: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    text: {
        flexGrow: 0,
        color: "lightGrey"
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 16,
        borderRadius: 5,
        justifyContent: "center"
    }
});

const BottomViews = ({ number, text }) => {
    
    return (
        <View style={{ alignItems: "center", justifyContent:"center" }}>
            <Text fontWeight="bold" style={{ marginBottom: 5 }}>{numberInKs(number)}</Text>
            <Text>{text}</Text>
        </View>
    );};

const BasicItem = ({ item }) => {
    return (
        <>
            <View style={styles.container2}>
                <View>
                    <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
                </View>
                <View>
                    <View style={{ marginRight: 40 }}>
                        <Text style={{ marginBottom: 5 }} fontSize="subheading" fontWeight="bold" color="primary" >{item.fullName}</Text>
                        <Text style={{ marginBottom: 7, marginRight: 5, flexWrap: "wrap" }} fontSize="subheading" color="secondary" >{item.description}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ padding: 6, borderRadius: 5, flexGrow: 0, backgroundColor: theme.colors.primary }} >
                                <Text style={{ color: "white", flexGrow: 0 }} fontWeight="bold">{item.language}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                
            </View>
            <View style={[styles.container2,{ justifyContent:"space-evenly" }]}>
                <BottomViews number={item.stargazersCount} text="Stars" />
                <BottomViews number={item.forksCount} text="Forks" />
                <BottomViews number={item.reviewCount} text="Reviews" />
                <BottomViews number={item.ratingAverage} text="Rating" />
            </View>
            
            
        </>
    );};

const RepositoryItem = ({ item }) => {
    const navigate = useNavigate();
    if(!item.url) return (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)} >
            <View testID="repositoryItem" style={styles.container1}>
                <BasicItem item={item} />
            </View>
        </Pressable>
    );
    return (
        <View testID="repositoryItem" style={styles.container1}>
            <BasicItem item={item} />
            <Pressable onPress={() => Linking.openURL(item.url)}>
                <Text
                    fontSize="subheading"
                    style={{ backgroundColor: theme.colors.primary, padding: 10, borderRadius: 5, margin: 10, color: "white", textAlign: "center" }}>
                    Go to Repository
                </Text>
            </Pressable>
        </View>
    );
};

export default RepositoryItem;