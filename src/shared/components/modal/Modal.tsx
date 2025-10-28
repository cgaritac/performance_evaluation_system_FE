import Modal from 'react-modal';
import { useModalScroll } from './useModalScrollHook';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
    useModalScroll(isOpen);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black/10 backdrop-blur-xs z-50 overflow-y-auto"
        >
            <section 
                className={`bg-fk-light-gray rounded-2xl shadow-md p-6 w-full mx-4 max-h-[90vh] overflow-y-auto ${className}`}
            >
                {children}
            </section>
        </Modal>
    );
};

export default ModalComponent;