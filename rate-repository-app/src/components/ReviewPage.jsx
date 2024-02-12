import FormikTextInput from "./FormikTextInput";
import { Pressable, View } from "react-native";
import { Formik } from "formik";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: ""
};

const ReviewForm = ({ onSubmit }) => {
    return(
        <View>
            <FormikTextInput name="ownerName" placeholder="Repository Owner's username" />
            <FormikTextInput name="repositoryName" placeholder="Repository's name" />
            <FormikTextInput name="rating" placeholder="Rating from 0 to 100" />
            <FormikTextInput name="text" placeholder="Review" multiline />
            <Pressable onPress={onSubmit} style={{ backgroundColor: theme.colors.primary, padding: 10, borderRadius: 5, margin: 10 }}>
                <Text fontSize="subheading" style={{ color: "white", textAlign: "center" }} >Post the review</Text>
            </Pressable>
        </View>
    );
};

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required("Repository owner's name is required"),
    repositoryName: yup
        .string()
        .required("Repository name is required"),
    rating: yup
        .number()
        .min(0)
        .max(100)
        .required("Rating is required"),
    text: yup
        .string()
});

export const ReviewContainer = ({ onSubmit }) => {
    return (
        <View style={{ backgroundColor: "white", paddingTop: 5, paddingBottom: 15 }}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                { ({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit}/>}
            </Formik>
        </View>
    );
};


const ReviewPage = () => {
    const navigate = useNavigate();
    const [createReview] = useCreateReview();

    const onSubmit = async (values, formikBag) => {
        try {
            const repositoryId = await createReview({ ...values, rating: parseInt(values.rating) });
            navigate(`/repository/${repositoryId}`);
        } catch (e) {
            console.log(e);
        }
        formikBag.resetForm();
    };

    return <><ReviewContainer onSubmit={onSubmit} /></>;
};

export default ReviewPage;