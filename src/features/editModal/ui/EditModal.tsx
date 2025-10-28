import { ModalComponent } from "~/shared";
import { EDIT_MODAL_TEXTS } from "../constants";
import { EditModalType } from "../types";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    type: EditModalType;
    children: React.ReactNode;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, title, type, children }) => {
    return (
        <ModalComponent isOpen={isOpen} onClose={onClose} className="max-w-4xl">
            <section 
                className="flex flex-col" 
                role="dialog" 
                aria-labelledby="delete-modal-title" 
                aria-describedby="delete-modal-description"
            >
                <header className="flex justify-center">
                    <h2 
                        id="delete-modal-title" 
                        className="leading-tight font-sans font-medium text-fk-title-size text-fk-text-label"
                    >
                        {EDIT_MODAL_TEXTS.TITLE} {type}: <span className="text-fk-red">{title}</span>
                    </h2>
                </header>
                <main className="flex justify-center">
                    {children}
                </main>
            </section>
        </ModalComponent>
    );
};

export default EditModal;