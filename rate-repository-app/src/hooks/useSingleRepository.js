import { useQuery } from "@apollo/client";
import { SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = (id) => {
    const { data, loading, refetch, ...result } = useQuery(SINGLE_REPOSITORY, {
        variables: {
            repositoryId: id,
        },
        fetchPolicy: "cache-and-network"
    });

    return {
        repository: data?.repository,
        loading,
        refetch,
        ...result };
};

export default useSingleRepository;