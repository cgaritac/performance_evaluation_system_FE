import { useNavigate } from 'react-router-dom'
import { ROUTES } from '~/shared';

const useGoHome = () => {
    const navigate = useNavigate();

    return () => navigate(ROUTES.HOME, { state: { fromApp: true } });
}

export default useGoHome;