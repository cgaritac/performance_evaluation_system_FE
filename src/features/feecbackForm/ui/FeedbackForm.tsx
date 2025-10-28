import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    EvaluationRequestModel,
    EvaluationWithGoalsResponseModel,
    FeedbackEnum,
    getFeedbackText,
    GoalResponseModel,
    GoalStatus,
    usePutEvaluationWithGoals,
    useUser
} from "~/entities";
import { ConfirmationModal } from "~/features";
import { Button, FormTemplate, GLOBAL_CONSTANTS, SelectField, TextAreaField, toast } from "~/shared";
import { FEEDBACK_FORM_TEXTS } from "../constants";
import { FeedbackFormData, FeedbackFormInput } from "../interface";
import { FeedbackFormSchema } from "../model";

interface FeedbackFormProps {
    data: EvaluationWithGoalsResponseModel;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ data }) => {
    const { userData } = useUser()!;
    const { mutate: updateEvaluationWithGoals, isPending: isUpdatingEvaluationWithGoals } = usePutEvaluationWithGoals();
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [formDataToSubmit, setFormDataToSubmit] = useState<FeedbackFormData | null>(null);

    const isAdmin = userData?.role === GLOBAL_CONSTANTS.ADMIN_ROLE;

    const methods = useForm<FeedbackFormInput, unknown, FeedbackFormData>({
        resolver: zodResolver(FeedbackFormSchema),
        defaultValues: data ? {
            ...data,
            feedback: data.feedback?.toString() ?? '',
            comment: data.feedbackComments ?? ''
        } : undefined
    });

    const selectedFeedback = Number(methods.watch('feedback')) as FeedbackEnum;
    const selectedFeedbackText = getFeedbackText(selectedFeedback);

    const handleSubmit = (formData: FeedbackFormData) => {
        const nonCancelledGoals = data.goals.filter((goal: GoalResponseModel) => goal.status !== GoalStatus.Cancelled);
        const hasUnapprovedGoals = nonCancelledGoals.some((goal: GoalResponseModel) => 
            goal.approval === undefined || goal.approval === null
        );

        if (hasUnapprovedGoals || data.goals.length === 0) {
            toast.error(FEEDBACK_FORM_TEXTS.UNAPPROVED_GOALS_ERROR);
            return;
        }

        setFormDataToSubmit(formData);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmation = () => {
        if (isUpdatingEvaluationWithGoals) return;
        if (formDataToSubmit) {
            const evaluationRequest = EvaluationRequestModel.create({
                ...data,
                feedback: formDataToSubmit.feedback,
                feedbackComments: formDataToSubmit.comment
            });
            updateEvaluationWithGoals(evaluationRequest);
            setIsConfirmationModalOpen(false);
            setFormDataToSubmit(null);
        }
    };

    return (
        <>
            <FormTemplate<FeedbackFormInput, FeedbackFormData> 
                methods={methods} 
                onSubmit={handleSubmit} 
                className="w-full mt-2 text-fk-text-secondary bg-fk-light-gray"
            >
                <TextAreaField 
                    name="comment" 
                    label={FEEDBACK_FORM_TEXTS.COMMENT_LABEL} 
                    rows={8} 
                    placeholder={isAdmin ? FEEDBACK_FORM_TEXTS.COMMENT_ADMIN_PLACEHOLDER 
                                        : FEEDBACK_FORM_TEXTS.COMMENT_USER_PLACEHOLDER
                    } 
                    required={isAdmin ? true : false}
                    disabled={isAdmin ? false : true}
                    maxLength={isAdmin ? 500 : undefined}
                />

                {isAdmin && (
                    <section>
                        <div className="flex justify-between">
                            <SelectField 
                                name="feedback" 
                                label={FEEDBACK_FORM_TEXTS.FEEDBACK_LABEL} 
                                options={Object.entries(FeedbackEnum)
                                    .filter(([key]) => isNaN(Number(key)))
                                    .map(([, value]) => ({ 
                                        label: getFeedbackText(value as FeedbackEnum),
                                        value
                                    }))
                                } 
                                required={true}
                            />
                        </div>
                        <p className="text-fk-text-secondary font-bold text-xs">
                            {FEEDBACK_FORM_TEXTS.REQUIRED_FIELDS_TEXT}
                        </p>
                        <div className="flex justify-end mb-4">
                            <Button 
                                type="submit" 
                                variant="default" 
                                title={FEEDBACK_FORM_TEXTS.BUTTON}
                            >
                                {FEEDBACK_FORM_TEXTS.BUTTON}
                            </Button>
                        </div>
                    </section>
                )}
            </FormTemplate>
            <ConfirmationModal 
                isOpen={isConfirmationModalOpen} 
                onClose={() => setIsConfirmationModalOpen(false)} 
                onConfirm={handleConfirmation} 
                type="Save"
                title={selectedFeedbackText}
                itemType="feedback"
            />
        </>
    );
};

export default FeedbackForm;