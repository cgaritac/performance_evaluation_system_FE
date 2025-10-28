import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, FormTemplate, TextAreaField, TextField } from "~/shared";
import { ACTIVITY_FORM_TEXTS } from "../constants";
import { ActivityFormData } from "../interface";
import { ActivityFormSchema } from "../model";

interface ActivityFormProps {
    onSubmit: (data: ActivityFormData) => void;
    initialData?: ActivityFormData;
    isEditing?: boolean;
    onClose?: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onSubmit, initialData, isEditing = false, onClose }) => {
    const methods = useForm<ActivityFormData>({
        resolver: zodResolver(ActivityFormSchema),
        defaultValues: initialData
    });

    const navigate = useNavigate();

    return (
        <FormTemplate<ActivityFormData> 
            methods={methods} 
            onSubmit={onSubmit} 
            className="w-full mt-6 shadow-md rounded-2xl text-fk-text-secondary bg-fk-light-gray p-6"
        >
            <TextField 
                name="title" 
                label={ACTIVITY_FORM_TEXTS.TITLE_LABEL} 
                required={true}
                maxLength={100}
            />
            <TextAreaField 
                name="description" 
                label={ACTIVITY_FORM_TEXTS.DESCRIPTION_LABEL} 
                required={true}
                maxLength={500}
            />
            <p className="text-fk-text-secondary font-bold text-xs">
                {ACTIVITY_FORM_TEXTS.REQUIRED_FIELDS_TEXT}
            </p>
            <div className="flex justify-between mt-7 mb-4">
                <Button 
                    type="button" 
                    variant="danger" 
                    title={ACTIVITY_FORM_TEXTS.CANCEL_BUTTON} 
                    onClick={(e) => {
                        e.preventDefault();
                        return isEditing ? onClose?.() : navigate(-1);
                    }}
                >
                    {ACTIVITY_FORM_TEXTS.CANCEL_BUTTON}
                </Button>
                <Button 
                    type="submit" 
                    variant="default" 
                    title={isEditing ? ACTIVITY_FORM_TEXTS.UPDATE_ACTIVITY_BUTTON : ACTIVITY_FORM_TEXTS.CREATE_ACTIVITY_BUTTON}
                >
                    {isEditing ? ACTIVITY_FORM_TEXTS.UPDATE_ACTIVITY_BUTTON : ACTIVITY_FORM_TEXTS.CREATE_ACTIVITY_BUTTON}
                </Button>
            </div>
        </FormTemplate>
    );
};

export default ActivityForm;