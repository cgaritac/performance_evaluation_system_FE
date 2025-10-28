import { GoalRequestModel, GoalStatus, GoalType, usePostGoals, useUser } from "~/entities";
import { GoalForm, GoalFormData } from "~/features";
import { GLOBAL_CONSTANTS, Hero, useAppStore, useGoBack } from "~/shared";
import { GOAL_CREATE_TEXTS } from "../constants";

const GoalCreatePage: React.FC = () => {
    const { mutate: createGoal, isPending: isCreatingGoal } = usePostGoals();
    const goBack = useGoBack();
    const { evaluationSelected } = useAppStore();
    const { userData } = useUser()!;

    const isAdmin = userData?.role === GLOBAL_CONSTANTS.ADMIN_ROLE;
    
    const handleSubmit = (data: GoalFormData) => {
        if (isCreatingGoal) return;
        const goalRequest = GoalRequestModel.create({
            ...data,
            id: 0,
            evaluationId: evaluationSelected?.id ?? 0,
            status: GoalStatus.NotStarted,
            goalType: isAdmin ? GoalType.ManagerAssigned : GoalType.SelfAssigned
        });

        createGoal(goalRequest, {
            onSuccess: () => {
                goBack();
            },
        });
    };

    return (
        <>
            <Hero>
                {GOAL_CREATE_TEXTS.TITLE}
            </Hero>
            <GoalForm onSubmit={handleSubmit} />
        </>
    );
};

export default GoalCreatePage;