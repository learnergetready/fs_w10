import { View, ScrollView, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        paddingTop: Constants.statusBarHeight,
        flexGrow: 0,
        backgroundColor: "#24292e",
        flexDirection: "row",
        height: 100,
        padding: 20,
        justify: "space-evenly",
        alignItems: "flex-end",
    },
    text: {
        flexGrow: 0,
        color: "white",
        marginRight: 15
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal >
                <Link to="/">
                    <Text style={styles.text} fontSize="subheading" >Repositories</Text>
                </Link>
                <Link to="/signin">
                    <Text style={styles.text} fontSize="subheading" >Sign in</Text>
                </Link>
            </ScrollView>
        </View>
    );
};

export default AppBar;