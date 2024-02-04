import FormikTextInput from "./FormikTextInput";
import { Pressable, View } from "react-native";
import { Formik } from "formik";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const initialValues = {
    username: "",
    password: ""
};

const SignInForm = ({ onSubmit }) => {
    return(
        <View>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput name="password" placeholder="password" secureTextEntry />
            <Pressable onPress={onSubmit} style={{ backgroundColor: theme.colors.primary, padding: 10, borderRadius: 5, margin: 10 }}>
                <Text fontSize="subheading" style={{ color: "white", textAlign: "center" }} >Sign in</Text>
            </Pressable>
        </View>
    );
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required(),
    password: yup
        .string()
        .required()
});

export const SignInContainer = ({ onSubmit }) => {
    return (
        <View style={{ backgroundColor: "white", paddingTop: 5, paddingBottom: 15 }}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                { ({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
            </Formik>
        </View>
    );
};


const SignIn = () => {
    const navigate = useNavigate();
    const [signIn] = useSignIn();

    const onSubmit = async (values, formikBag) => {
        const { username, password } = values;
        try {
            const { authenticate } = await signIn( username, password );
            console.log(authenticate);
            navigate("/");
        } catch (e) {
            console.log(e);
        }
        formikBag.resetForm();
    };

    return <><SignInContainer onSubmit={onSubmit} /></>;
};

export default SignIn;