import { createContext } from 'react';

interface LogoutContextType {
    isLoggingOut: boolean;
    setIsLoggingOut: (value: boolean) => void;
}

export const LogoutContext = createContext<LogoutContextType | undefined>(undefined);