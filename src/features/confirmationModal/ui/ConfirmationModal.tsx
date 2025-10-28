import { Button, ModalComponent } from "~/shared";
import { CONFIRMATION_TEXTS } from "../constants";
import { ConfirmationModalType, ConfirmationItemType } from "../types";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    type: ConfirmationModalType;
    itemType: ConfirmationItemType;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, type, itemType }) => {
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
                        {type} {itemType}: <span className="text-fk-red">{title}</span>
                    </h2>
                </header>
                <main className="flex justify-center mt-8">
                    <p id="delete-modal-description" className="text-gray-600">
                        {CONFIRMATION_TEXTS.DESCRIPTION}{type} this {itemType}?
                    </p>
                </main>
                <footer className="flex justify-between items-center mt-8">
                    <Button 
                        onClick={onClose} 
                        variant="default" 
                        aria-label={CONFIRMATION_TEXTS.CANCEL_BUTTON}
                    >
                        {CONFIRMATION_TEXTS.CANCEL_BUTTON}
                    </Button>
                    <Button 
                        onClick={onConfirm} 
                        variant="danger"
                        aria-label={`${CONFIRMATION_TEXTS.CONFIRM_BUTTON} ${type}`}
                    >
                        {CONFIRMATION_TEXTS.CONFIRM_BUTTON}
                    </Button>
                </footer>
            </section>
        </ModalComponent>
    );
};

export default ConfirmationModal;