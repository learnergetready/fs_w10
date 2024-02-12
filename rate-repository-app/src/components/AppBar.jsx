import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link, useNavigate } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

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
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();
    const { data, loading } = useQuery(ME, { fetchPolicy: "cache-and-network" });

    const signOut = async () => {
        console.log("signin out...");
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
        console.log("signed out");
        navigate("/signin");
    };

    if(loading) return null;
    console.log(data);
    const isSignedIn = data.me !== null;
    return (
        <View style={styles.container}>
            <ScrollView horizontal >
                <Link to="/">
                    <Text style={styles.text} fontSize="subheading" >Repositories</Text>
                </Link>
                {!isSignedIn && <Link to="/signin"><Text style={styles.text} fontSize="subheading" >Sign in</Text></Link>}
                {!isSignedIn && <Link to="/signup"><Text style={styles.text} fontSize="subheading" >Sign up</Text></Link>}
                {isSignedIn && <Link to="/review"><Text style={styles.text} fontSize="subheading" >Post review</Text></Link>}
                {isSignedIn && <Pressable onPress={signOut}><Text style={styles.text} fontSize="subheading" >Sign out</Text></Pressable>}
            </ScrollView>
        </View>
    );
};

export default AppBar;