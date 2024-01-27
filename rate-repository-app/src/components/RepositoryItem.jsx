import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

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
    const preparedNumber = number > 999
        ? (Math.round(number/100)/10)+"k"
        : number;
    return (
        <View style={{ alignItems: "center", justifyContent:"center" }}>
            <Text fontWeight="bold" style={{ marginBottom: 5 }}>{preparedNumber}</Text>
            <Text>{text}</Text>
        </View>
    );};

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.container1}>
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
            
            
        </View>
    );
};

export default RepositoryItem;