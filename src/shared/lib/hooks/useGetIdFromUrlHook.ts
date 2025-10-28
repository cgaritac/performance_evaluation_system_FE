import { useParams } from "react-router-dom";

interface UseGetIdFromUrlProps {
    idSelected: number | null | undefined;
}

interface UseGetIdFromUrlResult {
    id: number;
    isValid: boolean;
}

const useGetIdFromUrl = ({ idSelected }: UseGetIdFromUrlProps): UseGetIdFromUrlResult => {
    const { id } = useParams<{ id: string }>();

    if (Number.isNaN(Number(id))) {
        return {
            id: 0,
            isValid: false
        };
    }

    if (id) {
        return {
            id: Number(id),
            isValid: true
        };
    }
    
    return {
        id: idSelected ?? 0,
        isValid: true
    };
};

export default useGetIdFromUrl;