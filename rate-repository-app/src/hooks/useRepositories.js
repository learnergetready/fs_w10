import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
    const { data, loading, refetch, ...result } = useQuery(ALL_REPOSITORIES, {
        fetchPolicy: "cache-and-network"
    });

    return { repositories: data?.repositories, loading, refetch, ...result };
};

export default useRepositories;