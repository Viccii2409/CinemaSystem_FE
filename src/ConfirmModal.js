import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Xác nhận</button>
                    <button onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
