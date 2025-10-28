import { ActivityRequestModel, usePostActivities } from "~/entities";
import { ActivityForm, ActivityFormData } from "~/features";
import { Hero, useAppStore, useGoBack } from "~/shared";
import { ACTIVITY_CREATE_TEXTS } from "../constants";

const ActivityCreatePage: React.FC = () => {
    const { goalSelected } = useAppStore();
    const { mutate: createActivity, isPending: isCreatingActivity } = usePostActivities();
    const goBack = useGoBack();

    const handleSubmit = (data: ActivityFormData) => {
        if (isCreatingActivity) return;
        const activityRequest = ActivityRequestModel.create({
            ...data,
            id: 0,
            goalId: goalSelected?.id,
        });

        createActivity (activityRequest, {
            onSuccess: () => {
                goBack();
            },
        });
    };

    return (
        <>
            <Hero>
                {ACTIVITY_CREATE_TEXTS.TITLE}
            </Hero>
            <ActivityForm onSubmit={handleSubmit} />
        </>
    );
};

export default ActivityCreatePage;