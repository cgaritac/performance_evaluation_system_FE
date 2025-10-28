import { useState, ReactNode } from 'react';
import { LogoutContext } from '../context';

interface LogoutProviderProps {
    children: ReactNode;
}

const LogoutProvider: React.FC<LogoutProviderProps> = ({ children }) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    return (
        <LogoutContext.Provider value={{ isLoggingOut, setIsLoggingOut }}>
            {children}
        </LogoutContext.Provider>
    );
};

export default LogoutProvider;