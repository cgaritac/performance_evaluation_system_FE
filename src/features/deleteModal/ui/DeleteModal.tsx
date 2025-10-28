import { ModalComponent, Button } from "~/shared";
import { DELETE_MODAL_TEXTS } from "../constants";
import { DeleteModalType } from "../types";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    title: string;
    type: DeleteModalType;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete, title, type }) => {
    return (
        <ModalComponent isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <section 
                className="flex flex-col" 
                role="dialog" 
                aria-labelledby="delete-modal-title" 
                aria-describedby="delete-modal-description"
            >
                <header className="flex justify-center">
                    <h2 
                        id="delete-modal-title" 
                        className="leading-tight font-sans font-medium text-fk-subtitle-size text-fk-text-label"
                    >
                        {DELETE_MODAL_TEXTS.TITLE} {type}: <span className="text-fk-red">{title}</span>
                    </h2>
                </header>
                <main className="flex justify-center mt-8">
                    <p id="delete-modal-description" className="text-gray-600">
                        {DELETE_MODAL_TEXTS.DESCRIPTION} {type}?
                    </p>
                </main>
                <footer className="flex justify-between items-center mt-8">
                    <Button 
                        onClick={onClose} 
                        variant="default" 
                        aria-label={DELETE_MODAL_TEXTS.CANCEL_BUTTON}
                    >
                        {DELETE_MODAL_TEXTS.CANCEL_BUTTON}
                    </Button>
                    <Button 
                        onClick={onDelete} 
                        variant="danger"
                        aria-label={`${DELETE_MODAL_TEXTS.DELETE_BUTTON} ${type}`}
                    >
                        {DELETE_MODAL_TEXTS.DELETE_BUTTON}
                    </Button>
                </footer>
            </section>
        </ModalComponent>
    );
};

export default DeleteModal;