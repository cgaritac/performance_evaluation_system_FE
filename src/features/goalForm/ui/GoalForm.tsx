import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GoalCategory } from "~/entities";
import { Button, FormTemplate, SelectField, TextAreaField, TextField } from "~/shared";
import { GOAL_FORM_TEXTS } from "../constants";
import { GoalFormData, GoalFormInput } from "../interface";
import { GoalFormSchema } from "../model";

interface GoalFormProps {
  onSubmit: (data: GoalFormData) => void;
  initialData?: GoalFormData;
  isEditing?: boolean;
  onClose?: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, initialData, isEditing = false, onClose }) => {
  const methods = useForm<GoalFormInput, unknown, GoalFormData>({
    resolver: zodResolver(GoalFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      goalCategory: initialData.goalCategory.toString(),
      dueDate: initialData.dueDate.split('T')[0]
    } : undefined
  });

  const navigate = useNavigate();

  return (
    <FormTemplate<GoalFormInput, GoalFormData> 
      methods={methods} 
      onSubmit={onSubmit} 
      className="w-full mt-6 shadow-md rounded-2xl text-fk-text-secondary bg-fk-light-gray p-6"
    >
      <TextField name="title" label={GOAL_FORM_TEXTS.TITLE_LABEL} required={true} maxLength={100}/>
      <TextAreaField name="description" label={GOAL_FORM_TEXTS.DESCRIPTION_LABEL} required={true} maxLength={500}/>
      <section className="flex justify-between">
        <div className="flex gap-12 w-6/8">
          <SelectField
            name="goalCategory"
            label={GOAL_FORM_TEXTS.CATEGORY_LABEL}
            options={Object.entries(GoalCategory)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => ({ label: key, value }))}
        />
        </div>
        <div className="w-2/8">
          <TextField name="dueDate" label={GOAL_FORM_TEXTS.DUE_DATE_LABEL} type="date" required={true}/>
        </div>
      </section>
      <p className="text-fk-text-secondary font-bold text-xs">
        {GOAL_FORM_TEXTS.REQUIRED_FIELDS_TEXT}
      </p>
      <div className="flex justify-between mt-7 mb-4">
          <Button 
              type="button" 
              variant="danger" 
              title={GOAL_FORM_TEXTS.CANCEL_BUTTON} 
              onClick={(e) => {
                e.preventDefault();
                return isEditing ? onClose?.() : navigate(-1);
              }}
          >
              {GOAL_FORM_TEXTS.CANCEL_BUTTON}
          </Button>
          <Button 
              type="submit" 
              variant="default" 
              title={isEditing ? GOAL_FORM_TEXTS.UPDATE_GOAL_BUTTON : GOAL_FORM_TEXTS.CREATE_GOAL_BUTTON}
          >
              {isEditing ? GOAL_FORM_TEXTS.UPDATE_GOAL_BUTTON : GOAL_FORM_TEXTS.CREATE_GOAL_BUTTON}
          </Button>
      </div>
    </FormTemplate>
  );
};

export default GoalForm;
