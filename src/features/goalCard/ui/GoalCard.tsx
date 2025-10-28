import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Approval,
    GoalRequestModel,
    GoalResponseModel,
    GoalStatus,
    useDeleteGoal,
    usePutGoal,
    useUser
} from "~/entities";
import {
    ConfirmationModal,
    ConfirmationModalType,
    DeleteModal,
    EditModal,
    GoalForm,
    GoalFormData
} from "~/features";
import {
    EllipsisMenu,
    GLOBAL_CONSTANTS,
    ROUTES,
    getFormattedDate,
    useAppStore
} from "~/shared";
import {
    ApproveIcon,
    CancelIcon,
    FinishIcon,
    PauseIcon,
    PlayIcon,
    RejectIcon,
    RightArrowIcon,
} from "../assets";
import { GOAL_CARD_TEXTS } from "../constants";
import { getDescription, getGoalCategoryText, getGoalTypeText, getStatusColor, getStatusText } from "../lib";
import setMenuItems from "../lib/set-menu-items.lib";

interface GoalCardProps {
    goal: GoalResponseModel;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
    const { setGoalSelected } = useAppStore();
    const { userData } = useUser();
    const { mutate: deleteGoal, isPending: isDeletingGoal } = useDeleteGoal();
    const { mutate: updateGoal, isPending: isUpdatingGoal } = usePutGoal();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [typeSelected, setTypeSelected] = useState<ConfirmationModalType>("Finish");

    const isAdmin = userData?.role === GLOBAL_CONSTANTS.ADMIN_ROLE;

    const handleDeleteGoal = (goalId: number) => {
        if (isDeletingGoal) return;
        deleteGoal(goalId);
        setIsDeleteModalOpen(false);
    };

    const handleUpdateGoal = (data: GoalFormData) => {
        if (isUpdatingGoal) return;
        const goalRequest = GoalRequestModel.create({
            ...data,
            id: goal.id,
            evaluationId: goal.evaluationId,
            status: goal.status,
            goalType: goal.goalType
        });
        updateGoal(goalRequest);
        setIsUpdateModalOpen(false);
    };

    const handleUpdateGoalStatus = (status: GoalStatus) => {
        if (isUpdatingGoal) return;
        const goalRequest = GoalRequestModel.create({
            ...goal,
            status: status
        });
        updateGoal(goalRequest);
    };

    const handleUpdateGoalApproval = (approval: Approval) => {
        if (isUpdatingGoal) return;
        const goalRequest = GoalRequestModel.create({
            ...goal,
            approval: approval
        });
        updateGoal(goalRequest);
    };

    const handleConfirmation = (typeSelected: ConfirmationModalType) => {
        if (typeSelected === "Finish") {
            handleUpdateGoalStatus(GoalStatus.Finished);
        } else if (typeSelected === "Cancel") {
            handleUpdateGoalStatus(GoalStatus.Cancelled);
        }
        setIsConfirmationModalOpen(false);
    };

    const menuItems = setMenuItems({
        isAdmin,
        goalType: goal.goalType,
        setIsUpdateModalOpen,
        setIsDeleteModalOpen,
        approval: goal.approval
    });
                
    return (
        <article className={`relative flex flex-col gap-4 p-4 bg-fk-light-gray rounded-2xl shadow-md border 
                          border-gray-100 transition-all duration-300 ease-in-out 
                            hover:shadow-xl hover:shadow-blue-100/80 hover:border-blue-100
                            hover:-translate-y-2 hover:translate-x-[5px] hover:transition-all hover:duration-400 
                            hover:ease-in-out ${goal.approval === Approval.NotAchived ? 
                            'border-red-500/10 shadow-red-500/20 bg-red-500/10' : goal.approval === Approval.Achived ? 
                            'border-green-500/10 shadow-green-500/20 bg-green-500/10' : ''}
                `}
                role="article" 
                aria-labelledby={`goal-title-${goal.title}`}>
            <header className="flex justify-between items-start">
                <div className="flex items-center w-[80px]">
                    <span className={`text-xs text-white px-2 py-1 rounded-full w-fit ${getStatusColor(goal.status)}`}
                          role="status"
                          aria-label={`Goal status: ${getStatusText(goal.status)}`}>
                        {getStatusText(goal.status)}
                    </span>
                </div>
                <div className="flex items-center gap-2" role="group" aria-label="Goal metadata">
                    <span className="text-xs text-gray-400" role="text">
                        {getGoalTypeText(goal.goalType)}
                    </span>
                    <span className="text-xs text-gray-400"> | </span>
                    <span className="text-xs text-gray-400" role="text">
                        {getGoalCategoryText(goal.goalCategory)}
                    </span>
                </div>
                <EllipsisMenu items={menuItems} />
            </header>
            
           <section className="flex justify-between items-center">
                <div className="w-full">
                    <section>
                        <h3 id={`goal-title-${goal.title}`} className="text-base font-semibold text-fk-text-label ">{goal.title}</h3>
                    </section>
                    
                    <section 
                        className="text-xs text-gray-500 border border-dashed border-gray-200 rounded-md 
                                   px-2 py-0.5 mt-2 mr-2 h-24 overflow-y-auto bg-[#fbfbfb]"
                        role="complementary" 
                        aria-label="Goal description"
                    >
                        <div className="font-medium">{GOAL_CARD_TEXTS.DESCRIPTION}</div>
                        <span className="whitespace-pre-wrap">{getDescription(goal.description)}</span>
                    </section>
                </div>
                <div className="flex flex-col gap-1">
                    {goal.status !== GoalStatus.InProgress ? (
                        <button title="Start goal" 
                                aria-label="Start goal" 
                                className={`rounded-full p-1
                                     ${goal.status === GoalStatus.Cancelled || 
                                       goal.status === GoalStatus.Finished ||
                                       goal.status === GoalStatus.Delayed
                                        ? 'opacity-35 cursor-not-allowed hover:bg-transparent' 
                                        : 'cursor-pointer hover:bg-blue-500/10'}`}
                                onClick={() => handleUpdateGoalStatus(GoalStatus.InProgress)}
                                disabled={goal.status === GoalStatus.Cancelled || goal.status === GoalStatus.Finished}
                        >
                            <PlayIcon />
                        </button>
                    ) : (
                        <button title="Stop goal" aria-label="Stop goal" className="rounded-full p-1 cursor-pointer hover:bg-blue-500/10"
                                onClick={() => handleUpdateGoalStatus(GoalStatus.OnHold)}
                        >
                            <PauseIcon />
                        </button>
                    )}
                    <button title="Finish goal" 
                            aria-label="Finish goal" 
                            className={`rounded-full p-1
                                     ${goal.status === GoalStatus.Cancelled || 
                                       goal.status === GoalStatus.Finished || 
                                       goal.status === GoalStatus.Delayed ||
                                       goal.status === GoalStatus.NotStarted
                                        ? 'opacity-35 cursor-not-allowed hover:bg-transparent' 
                                        : 'cursor-pointer hover:bg-green-500/10'}`}
                            onClick={() => {setIsConfirmationModalOpen(true); setTypeSelected("Finish")}}
                            disabled={
                                goal.status === GoalStatus.Cancelled || 
                                goal.status === GoalStatus.Finished ||
                                goal.status === GoalStatus.Delayed ||
                                goal.status === GoalStatus.NotStarted
                            }
                    >
                        <FinishIcon />
                    </button>
                    <button title="Cancel goal" 
                            aria-label="Cancel goal" 
                            className={`rounded-full p-1 mt-4
                                     ${goal.status === GoalStatus.Cancelled || 
                                       goal.status === GoalStatus.Finished || 
                                       goal.status === GoalStatus.Delayed
                                        ? 'opacity-35 cursor-not-allowed hover:bg-transparent' 
                                        : 'cursor-pointer hover:bg-red-500/10'}`}
                            onClick={() => {setIsConfirmationModalOpen(true); setTypeSelected("Cancel")}}
                            disabled={
                                goal.status === GoalStatus.Cancelled || 
                                goal.status === GoalStatus.Finished || 
                                goal.status === GoalStatus.Delayed
                            }
                    >
                        <CancelIcon />
                    </button>
                </div>
           </section>

           <section className="flex justify-between text-xs text-gray-400" role="contentinfo">
                <time dateTime={goal.startDate}>{GOAL_CARD_TEXTS.START_DATE} {getFormattedDate(goal.startDate)}</time>
                <time dateTime={goal.dueDate}>{GOAL_CARD_TEXTS.DUE_DATE} {getFormattedDate(goal.dueDate)}</time>
                <time dateTime={goal.endDate}>{GOAL_CARD_TEXTS.END_DATE} {getFormattedDate(goal.endDate)}</time>
           </section>

           <hr className="border-gray-200 border-dotted" />

            <footer className={`flex ${isAdmin ? 'justify-between' : 'justify-center'} text-sm text-fk-blue`} role="contentinfo">
                {isAdmin && (
                    <button title="Goal not achieved" aria-label="Goal not achieved" 
                            className={`rounded-full p-1
                                     ${goal.status === GoalStatus.Cancelled || 
                                       (goal.status !== GoalStatus.Finished && goal.status !== GoalStatus.Delayed)
                                        ? 'opacity-35 cursor-not-allowed hover:bg-transparent' 
                                        : 'cursor-pointer hover:bg-red-500/10'
                                    }`
                            }
                            onClick={() => handleUpdateGoalApproval(Approval.NotAchived)}
                            disabled={goal.status === GoalStatus.Cancelled || 
                                    (goal.status !== GoalStatus.Finished && goal.status !== GoalStatus.Delayed)}
                    >
                        <RejectIcon />
                    </button>
                )}
                {goal.startDate === null ? (
                    <div 
                        className="flex items-center gap-1 cursor-not-allowed rounded-full p-1 opacity-35"
                        onClick={(e) => e.preventDefault()}
                    >
                        <span>{GOAL_CARD_TEXTS.ACTIVITIES}</span>
                        <RightArrowIcon />
                    </div>
                ) : (
                    <NavLink
                        to={ROUTES.ACTIVITIES.replace(':id', goal.id.toString())}
                        title={GOAL_CARD_TEXTS.ACTIVITIES}
                        state={{ fromApp: true }}
                        onClick={() => {
                            setGoalSelected(goal);
                        }}
                        className="flex items-center gap-1 cursor-pointer rounded-full p-1 hover:bg-blue-500/10"
                    >
                        <span>{GOAL_CARD_TEXTS.ACTIVITIES}</span>
                        <RightArrowIcon />
                    </NavLink>
                )}
                {isAdmin && (
                    <button title="Goal achieved" aria-label="Goal achieved" 
                            className={`rounded-full p-1
                                     ${goal.status === GoalStatus.Cancelled || 
                                       (goal.status !== GoalStatus.Finished && goal.status !== GoalStatus.Delayed)
                                        ? 'opacity-35 cursor-not-allowed hover:bg-transparent' 
                                        : 'cursor-pointer hover:bg-green-500/10'
                                    }`
                            }
                            onClick={() => handleUpdateGoalApproval(Approval.Achived)}
                            disabled={goal.status === GoalStatus.Cancelled || 
                                    (goal.status !== GoalStatus.Finished && goal.status !== GoalStatus.Delayed)}
                    >
                        <ApproveIcon />
                    </button>
                )}
            </footer>

            <EditModal 
                isOpen={isUpdateModalOpen} 
                onClose={() => setIsUpdateModalOpen(false)} 
                type="goal" 
                title={goal.title} 
            >
                <GoalForm 
                    onSubmit={handleUpdateGoal} 
                    initialData={goal} 
                    isEditing={true} 
                    onClose={() => setIsUpdateModalOpen(false)} 
                />
            </EditModal>
            <DeleteModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onDelete={() => handleDeleteGoal(goal.id)} 
                type="goal" 
                title={goal.title} 
            />
            <ConfirmationModal 
                isOpen={isConfirmationModalOpen} 
                onClose={() => setIsConfirmationModalOpen(false)} 
                onConfirm={() => handleConfirmation(typeSelected)} 
                type={typeSelected} 
                title={goal.title} 
                itemType="goal"
            />
        </article>
    );
};

export default GoalCard;