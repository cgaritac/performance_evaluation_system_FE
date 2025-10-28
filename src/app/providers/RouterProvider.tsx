import { ReactNode } from "react";
import { BrowserRouter } from 'react-router-dom';

interface RouterProviderProps {
    children: ReactNode;
}

const RouterProvider: React.FC<RouterProviderProps> = ({ children }) =>  {
    return <BrowserRouter>{children}</BrowserRouter>
}

export default RouterProvider;