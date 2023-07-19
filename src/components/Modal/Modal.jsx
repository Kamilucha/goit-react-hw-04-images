import { createPortal } from "react-dom";
import { Component } from "react";
import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot= document.querySelector('#modal-root')

export default class Modal extends Component {
   static propTypes = {
    data: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
  };


    state = {
        data: this.props.data,
    }
    componentDidMount() {
        window.addEventListener('keydown', this.handleOnClose)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleOnClose)
    }

    handleOnClose = e => {
        if (e.code === 'Escape' || e.currentTarget === e.target) {
            this.props.onClose();
        }
    };

    render() {
        const { data } = this.props;
        const { largeImageURL, tags } = data || {};
        return createPortal(
            <Overlay onClick={this.handleOnClose}>
                <ModalWindow>
                   <img src={largeImageURL} alt={tags} />
                </ModalWindow>
            </Overlay>, modalRoot,
        );
    };
};