import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '~/shared';

const useGoErrorPage = (error?: Error | null) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            navigate(ROUTES.ERROR, { state: { fromApp: true } });
        }
    }, [error, navigate]);

    return { goToErrorPage: () => navigate(ROUTES.ERROR, { state: { fromApp: true } }) };
}

export default useGoErrorPage;