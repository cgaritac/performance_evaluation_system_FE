import { useContext } from 'react';
import { LogoutContext } from '../context';

const useLogout = () => {
    const context = useContext(LogoutContext);
    if (!context) {
        throw new Error('useLogout must be used within a LogoutProvider');
    }
    return context;
};

export default useLogout;