interface ModalProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ id, title, children }) => {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center">{title}</h3>
                {children}
            </div>
        </dialog>
    )
}

export default Modal;