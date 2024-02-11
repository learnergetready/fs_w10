import { useParams } from "react-router-native";
import { View } from "react-native";
import useSingleRepository from "../hooks/useSingleRepository";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {

    const { id } = useParams();
    const { repository } = useSingleRepository(id);

    return (
        <View>
            <RepositoryItem item={repository ? repository : []} />
        </View>
    );
};

export default SingleRepository;