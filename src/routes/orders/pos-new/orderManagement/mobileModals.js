import React from 'react';
import { Modal, ModalHeader, ModalBody } from "reactstrap";

//? Child Components
import Header from './header';
import ItemsList from './itemsList';
import DateComponent from './date';
import TimeComponent from './time';
import Result from './result';

export default (props) => {
    const { isOpen, toggleModal } = props.mobileProps;
    return (
        <Modal
            isOpen={isOpen}
            toggle={toggleModal}
            wrapClassName="modal-right"
            backdrop={true}
        >
            <ModalHeader toggle={toggleModal}>
                <Header {...props.headerProps} />
            </ModalHeader>
            <ModalBody>
                <ItemsList {...props.itemsListProps} />
                <DateComponent {...props.dateProps} />
                <TimeComponent {...props.timeProps} />
                <Result {...props.resultProps} />
            </ModalBody>
        </Modal>
    );
}