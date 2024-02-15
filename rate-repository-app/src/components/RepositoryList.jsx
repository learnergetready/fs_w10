import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Picker } from "@react-native-picker/picker";
import { createContext, useContext, useState, Component } from "react";
import { useDebounce } from "use-debounce";
import TextInput from "./TextInput";

const styles = StyleSheet.create({
    separator: {
        height: 10
    },
});

const SorterContext = createContext();

const Sorters = () => {
    const { order, setOrder, setOrderBy, setOrderDirection, filter, setFilter } = useContext(SorterContext);

    return(
        <View>
            <TextInput 
                value={filter}
                onValueChange={(itemValue) => {
                    setFilter(itemValue);
                }}
                placeholder="Search by repository and owner name"
            />
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
        </View>
    );};

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends Component {
    renderHeader = () => <Sorters />;

    onEndReached = () => {
        const { fetchMore } = this.props;
        fetchMore();
    };

    render() {
        const { repositories } = this.props;
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
                    ListHeaderComponent={() => this.renderHeader()}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={.5}
                />
            </View>
        );
    }
}

const RepositoryList = () => {
    const [orderBy, setOrderBy] = useState("CREATED_AT");
    const [orderDirection, setOrderDirection] = useState("DESC");
    const [order, setOrder] = useState("Latest repositories");
    const [filter, setFilter] = useState("rails");
    const [searchKeyword] = useDebounce(filter, 500);

    const { repositories, fetchMore } = useRepositories({ first: 6, orderBy, orderDirection, searchKeyword });

    return(
        <SorterContext.Provider value={{ order, setOrder, setOrderBy, setOrderDirection, filter, setFilter }}>
            <RepositoryListContainer
                repositories={repositories}
                fetchMore={fetchMore}
            />
        </SorterContext.Provider>
    );};

export default RepositoryList;