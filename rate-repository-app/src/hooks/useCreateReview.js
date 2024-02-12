import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const createReview = async (review) => {
        try {
            const { data } = await mutate({ variables: review });
            return data.createReview.repositoryId;
        } catch (e) {
            throw new Error(e);
        }
    };

    return [createReview, result];
};

export default useCreateReview;