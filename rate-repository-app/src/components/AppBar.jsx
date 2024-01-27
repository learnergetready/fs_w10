import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

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
        alignItems: "flex-end"
    },
    text: {
        flexGrow: 0,
        color: "white"
    }
});

const AppBar = () => {
    return <View style={styles.container}>
        <Pressable onPress={() => console.log("fuck the police")}>
            <Text style={styles.text} fontSize="subheading" >Repositories</Text>
        </Pressable>
    </View>;
};

export default AppBar;