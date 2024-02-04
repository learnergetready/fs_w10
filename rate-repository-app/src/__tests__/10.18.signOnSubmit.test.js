import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { SignInContainer } from "../components/SignIn";

describe("Sign in -form", () => {
    it("onSubmit called with correct arguments", async () => {
        const onSubmit = jest.fn();
        render(<SignInContainer onSubmit={onSubmit} />);

        fireEvent.changeText(screen.getByPlaceholderText("username"), "fake");
        fireEvent.changeText(screen.getByPlaceholderText("password"), "secretpassword");
        fireEvent.press(screen.getByText("Sign in"));
        
        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit.mock.calls[0][0]).toEqual({
                username: "fake",
                password: "secretpassword"
            });
        });
        
    });
});