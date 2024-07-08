import ReactModal from "react-modal";
import css from "./Modal.module.css";
import { GiCrownedSkull } from "react-icons/gi";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "left",
    width: "250px",
  },
};

ReactModal.setAppElement("#root");

const Modal = ({ isOpen, closeModal, children }) => {
  const handleCopyText = () => {
    navigator.clipboard.writeText(children);
    closeModal();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      overlayClassName={css.overlay}
    >
      <div className={css.modal}>
        <h3>
          <GiCrownedSkull color="gold" />
          Звіт Житомир
          <GiCrownedSkull />
        </h3>
        <pre>{children}</pre>
        <button className={css.modalBtn} onClick={handleCopyText}>
          Скопіювати
        </button>
      </div>
    </ReactModal>
  );
};

export default Modal;
