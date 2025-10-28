import { Component, ErrorInfo, ReactNode } from 'react';
import { GLOBAL_CONSTANTS, ROUTES } from '~/shared';
import { ERROR_BOUNDARY_CONSTANTS } from './ErrorBoundary.contants';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = {
        hasError: false
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(ERROR_BOUNDARY_CONSTANTS.ERROR_CONSOLE_MESSAGE, error, errorInfo);
        setTimeout(() => {
            window.location.href = ROUTES.ERROR;
        }, GLOBAL_CONSTANTS.ERROR_REDIRECT_TIMEOUT);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-red-500 text-center">
                        {ERROR_BOUNDARY_CONSTANTS.ERROR_MESSAGE}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;