import { createContext } from 'react';
import { UserModel } from '../model';

interface UserContextProps {
    userData: UserModel | null;
    setUserData: (user: UserModel | null) => void;
}

const UserContext = createContext<UserContextProps>({
    userData: null,
    setUserData: () => {
        throw new Error('setUserData has to be used within a UserProvider');
    },
});

export default UserContext;