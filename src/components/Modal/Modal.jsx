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
    width: "320px",
  },
};

ReactModal.setAppElement("#root");

const Modal = ({ isOpen, closeModal, children }) => {
  const handleCopyText = () => {
    navigator.clipboard.writeText(children);
    closeModal();
    // Закрийте модальне вікно після копіювання
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      overlayClassName={css.overlay}
    >
      {/* <button className={css.closeButton} onClick={closeModal}>
        &times;
      </button> */}

      <div className={css.modal}>
        <h3>
          <GiCrownedSkull />
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
