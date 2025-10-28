import { useEffect } from 'react';
import { EvaluationWithGoalsResponseModel } from '~/entities';
import { useAppStore } from '~/shared';

const useEvaluationSelection = (evaluation: EvaluationWithGoalsResponseModel | undefined) => {
    const { setEvaluationSelected } = useAppStore();

    useEffect(() => {
        if (evaluation) {
            setEvaluationSelected(evaluation);
        }
    }, [evaluation, setEvaluationSelected]);
}; 

export default useEvaluationSelection;