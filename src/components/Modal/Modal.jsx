import { createPortal } from "react-dom";
import { useEffect } from "react";
import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot= document.querySelector('#modal-root')

export const Modal = ({ data, onClose }) => {
    useEffect(() => {
        window.addEventListener('keydown', e => handleOnClose(e))
        return window.removeEventListener('keydown',e =>  handleOnClose(e))
    });

    const handleOnClose = e => {
        if (e.code === 'Escape' || e.currentTarget === e.target) {
            onClose()
        }
    };

    const {  tags } = data || {};

     return createPortal(
            <Overlay onClick={handleOnClose}>
                <ModalWindow>
                   <img src={data.largeImageURL} alt={tags} />
                </ModalWindow>
            </Overlay>, modalRoot,
        );
}

Modal.propTypes = {
    data: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
}