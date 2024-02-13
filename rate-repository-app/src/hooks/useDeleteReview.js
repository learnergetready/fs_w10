import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW);

    const deleteReview = async (deleteReviewId) => {
        try {
            const { data } = await mutate({ variables: { id: deleteReviewId } });
            return data?.deleteReview;
        } catch (e) {
            throw new Error(e);
        }
    };

    return [deleteReview, result];
};

export default useDeleteReview;