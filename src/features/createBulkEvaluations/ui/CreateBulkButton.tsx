import { usePostEvaluations } from "~/entities";
import { EvaluationRequestModel } from "~/entities/evaluation/model";
import { Button, PlusIcon } from "~/shared";
import { CREATE_BULK_TEXTS } from "../constants";

interface CreateBulkButtonProps {
  departmentId: number;
  year: number;
}

const CreateBulkButton: React.FC<CreateBulkButtonProps> = ({
  departmentId,
  year,
}) => {
  const { mutate: createBulkEvaluations, isPending: isCreatingBulkEvaluations } = usePostEvaluations();

  const handleCreateBulk = () => {
    if (isCreatingBulkEvaluations) return;
    const requestData = EvaluationRequestModel.create({ 
      id: 0, 
      year, 
      departmentId 
    });
    
    createBulkEvaluations(requestData);
  };

  return (
    <Button
      onClick={handleCreateBulk}
      variant="save"
      className="flex items-center gap-1"
      title={CREATE_BULK_TEXTS.TITLE_TEXT}
    >
      <PlusIcon color="white" />
      {CREATE_BULK_TEXTS.BUTTON_TEXT}
    </Button>
  );
};

export default CreateBulkButton;
