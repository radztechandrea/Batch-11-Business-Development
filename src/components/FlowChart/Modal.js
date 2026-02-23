import React, { useEffect } from "react";
import "./index.css";

function Modal({ setOpenModal, node }) {
  const { id, data, targets } = node;

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenModal(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setOpenModal]);

  return (
    <div className="modalBackground">
      <div className="modalContainer">

        <header className="modalHeader">
          <h3>{data.label}</h3>
        </header>
        <section className="modalContent">
          <p>Status: {id}</p>
          <p>Next: {targets ? targets.join(' - ') : 'N/A'}</p>
        </section>


      </div>
    </div>
  );
}

export default Modal;
