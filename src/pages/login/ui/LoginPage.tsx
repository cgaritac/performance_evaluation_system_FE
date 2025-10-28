import { Button, GLOBAL_CONSTANTS } from "~/shared";
import { LOGIN_TEXTS } from "../constants";
import { useLogin } from "~/features";

const LoginPage: React.FC = () => {
    const { login } = useLogin();
    
    return (
        <section className="flex flex-col justify-center items-center h-screen 
                            bg-cover bg-center bg-fk-login-hero">
            <h1 className="text-3xl font-bold text-white mb-4">
                {LOGIN_TEXTS.TITLE}
            </h1>
            <h2 className="text-2xl font-semibold text-white mr-4">
                {GLOBAL_CONSTANTS.COMPANY_NAME_GLOBAL}
            </h2>
            <h3 className="text-3xl font-bold text-white mb-4">
                {GLOBAL_CONSTANTS.APP_NAME_GLOBAL}
            </h3>
            <Button onClick={login}>
                {LOGIN_TEXTS.BUTTON}
            </Button>
        </section>
    );
};

export default LoginPage;