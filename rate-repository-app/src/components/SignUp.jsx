import FormikTextInput from "./FormikTextInput";
import { Pressable, View } from "react-native";
import { Formik } from "formik";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/userSignUp";

const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: ""
};

const SignUpForm = ({ onSubmit }) => {
    return(
        <View>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput name="password" placeholder="password" secureTextEntry />
            <FormikTextInput name="passwordConfirmation" placeholder="password confirmation" secureTextEntry />
            <Pressable onPress={onSubmit} style={{ backgroundColor: theme.colors.primary, padding: 10, borderRadius: 5, margin: 10 }}>
                <Text fontSize="subheading" style={{ color: "white", textAlign: "center" }} >Sign in</Text>
            </Pressable>
        </View>
    );
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(5)
        .max(30)
        .required("Username is required"),
    password: yup
        .string()
        .min(5)
        .max(50)
        .required("Password is required"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required")
});

export const SignUpContainer = ({ onSubmit }) => {
    return (
        <View style={{ backgroundColor: "white", paddingTop: 5, paddingBottom: 15 }}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                { ({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
            </Formik>
        </View>
    );
};


const SignUp = () => {
    const navigate = useNavigate();
    const [signUp] = useSignUp();

    const onSubmit = async (values, formikBag) => {
        const { username, password } = values;
        try {
            await signUp( username, password );
            navigate("/");
        } catch (e) {
            console.log(e);
        }
        formikBag.resetForm();
    };

    return <><SignUpContainer onSubmit={onSubmit} /></>;
};

export default SignUp;