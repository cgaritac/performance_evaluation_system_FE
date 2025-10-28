import { useGoHome } from "~/shared";
import { ERROR_TEXTS } from "../constants";
import { Button } from "~/shared";
import { WarningIcon } from "../assets";

const ErrorPage: React.FC = () => {
    const goHome = useGoHome();

    return (
        <section className="flex flex-col items-center justify-center h-full text-center">
            <WarningIcon />
            <h1 className="text-6xl font-bold text-gray-500 mt-4">
                {ERROR_TEXTS.ERROR_CODE}
            </h1>
            <p className="text-lg text-gray-500 mt-4">
                {ERROR_TEXTS.PAGE_NOT_FOUND}
            </p>
            <Button className='mt-8' onClick={goHome}>
                {ERROR_TEXTS.GO_HOME}
            </Button>
        </section>
    );
};

export default ErrorPage;