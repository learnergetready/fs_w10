import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
    const { data, loading, fetchMore, ...result } = useQuery(ALL_REPOSITORIES, {
        fetchPolicy: "cache-and-network",
        variables
    });

    const handleFetchMore = async () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        await fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables
            }
        });
    };

    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        ...result
    };
};

export default useRepositories;