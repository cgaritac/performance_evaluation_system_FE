import { useGetActivities, useUser } from "~/entities";
import { ActivitiesInfo } from "~/widgets";
import { ACTIVITIES_TEXTS } from "../constants";
import { 
    Button, 
    Hero, 
    useAppStore, 
    useGetIdFromUrl, 
    useGoErrorPage, 
    useGoHome, 
    GLOBAL_CONSTANTS, 
    useGoBack, 
    HeroEsqueleton,
    ROUTES
} from "~/shared";
import { Navigate } from "react-router-dom";

const ActivitiesPage: React.FC = () => {
    const { userData } = useUser()!;
    const { goalSelected } = useAppStore();
    const { id: currentGoalId, isValid } = useGetIdFromUrl({ idSelected: goalSelected?.id ?? null });
    const goBack = useGoBack();
    const goHome = useGoHome();

    const isAdmin = userData?.role === GLOBAL_CONSTANTS.ADMIN_ROLE;

    const { data, isLoading, error } = useGetActivities(Number(currentGoalId) || 0);

    useGoErrorPage(error);

    if (!isValid) {
        return <Navigate to={ROUTES.ERROR} />;
    }

    return (
        <>
            <Hero>
                {isLoading ? <HeroEsqueleton /> : 
                    <>
                        {ACTIVITIES_TEXTS.TITLE} {goalSelected?.title}
                    </>
                }
            </Hero>
            <ActivitiesInfo data={data ?? []} isLoading={isLoading} />
            <section className="flex justify-center items-center gap-4 my-8">
                {isAdmin && (
                    <Button onClick={goBack}>
                        {ACTIVITIES_TEXTS.GO_BACK_BUTTON_TEXT}
                    </Button>
                )}
                <Button onClick={goHome}>
                    {GLOBAL_CONSTANTS.GO_HOME_BUTTON_TEXT}
                </Button>
            </section>
        </>
    );
};

export default ActivitiesPage;