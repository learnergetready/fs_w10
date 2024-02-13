import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy, orderDirection) => {
    const variables = orderBy
        ? { orderBy, orderDirection }
        : { orderDirection };
    const { data, loading, refetch, ...result } = useQuery(ALL_REPOSITORIES, {
        fetchPolicy: "cache-and-network",
        variables
    });

    console.log(variables);

    return { repositories: data?.repositories, loading, refetch, ...result };
};

export default useRepositories;