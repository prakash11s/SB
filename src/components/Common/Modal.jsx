import React, { useEffect } from "react";
import Modal from "react-modal";

const ModalHOC = ({ isModalOpen, toggleModal, modalTitle, children }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }

    return () => {
      document.body.style.overflow = "scroll";
    }
  }, [isModalOpen]);

  return (
    <Modal
      className=""
      isOpen={isModalOpen}
      onRequestClose={false}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="modal-header border-0">
        <h5 className="modal-title">{modalTitle}</h5>
        <button onClick={toggleModal} className="btn-close"></button>
      </div>
      <div className="date-picker-dashboard">
        {children}
      </div>
    </Modal>
  );
};
export default ModalHOC;
