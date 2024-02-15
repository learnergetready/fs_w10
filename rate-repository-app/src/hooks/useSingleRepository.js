import { useQuery } from "@apollo/client";
import { SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = (variables) => {
    const { data, loading, refetch, fetchMore, ...result } = useQuery(SINGLE_REPOSITORY, {
        variables: {
            ...variables
        },
        fetchPolicy: "cache-and-network"
    });

    const handleFetchMore = async () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        await fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables
            }
        });
    };

    return {
        repository: data?.repository,
        loading,
        refetch,
        fetchMore: handleFetchMore,
        ...result };
};

export default useSingleRepository;