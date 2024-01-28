import FormikTextInput from "./FormikTextInput";
import { Pressable, View } from "react-native";
import { Formik } from "formik";
import Text from "./Text";
import theme from "../theme";

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
                <Text style={{ color: "white", textAlign: "center" }} >Sign in</Text>
            </Pressable>
        </View>
    );
};


const SignIn = () => {

    const onSubmit = (values, formikBag) => {
        console.log(values);
        formikBag.resetForm();
    };

    return (
        <View>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                { ({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
            </Formik>
        </View>
    );
};

export default SignIn;