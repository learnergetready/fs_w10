import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Picker } from "@react-native-picker/picker";
import { createContext, useContext, useState } from "react";

const styles = StyleSheet.create({
    separator: {
        height: 10
    },
});

const SorterContext = createContext();

const Sorters = () => {
    const { order, setOrder, setOrderBy, setOrderDirection } = useContext(SorterContext);

    return(
        <Picker
            prompt="Select an item..."
            selectedValue={order}
            onValueChange={(itemValue) => {
                setOrder(itemValue);
                switch (itemValue) {
                case "Latest repositories":
                    setOrderBy("CREATED_AT");
                    setOrderDirection("DESC");
                    break;
                case "Highest rated repositories":
                    setOrderBy("RATING_AVERAGE");
                    setOrderDirection("DESC");
                    break;
                case "Lowest rated repositories":
                    setOrderBy("RATING_AVERAGE");
                    setOrderDirection("ASC");
                    break;
                default:
                    throw new Error("Unhandeled repositories filter choice");
                }
            }
            }>
            <Picker.Item label="Latest repositories" value="Latest repositories" />
            <Picker.Item label="Highest rated repositories" value="Highest rated repositories" />
            <Picker.Item label="Lowest rated repositories" value="Lowest rated repositories" />
        </Picker>
    );};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];
    return (
        <View style={{ paddingBottom: 100 }} >
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <RepositoryItem item={item} />}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => <Sorters />}
            />
        </View>
    );
};

const RepositoryList = () => {
    const [orderBy, setOrderBy] = useState("CREATED_AT");
    const [orderDirection, setOrderDirection] = useState("DESC");
    const [order, setOrder]=useState("Latest repositories");
    const { repositories } = useRepositories(orderBy, orderDirection);
    return(
        <SorterContext.Provider value={{ order, setOrder, orderBy, setOrderBy, orderDirection, setOrderDirection }}>
            <RepositoryListContainer repositories={repositories} />
        </SorterContext.Provider>
    );};

export default RepositoryList;