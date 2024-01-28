import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 2,
        borderColor: theme.colors.textSecondary,
        backgroundColor: "white",
        padding: 5,
        borderRadius: 5,
        margin: 10
    },
    errorStyle: {
        borderColor: theme.colors.errorRed
    }
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [styles.textInput, style, error && styles.errorStyle];

    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;