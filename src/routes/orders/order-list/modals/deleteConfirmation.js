import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
    Modal,
    ModalHeader,
    ModalFooter
} from "reactstrap";
import Text from 'Components/Text';
import Button from 'Components/Button';
import _ from 'lodash';

class DeleteConfirmation extends Component {
    render() {
        const isOpen = _.get(this.props, 'isOpen');
        const toggle = _.get(this.props, 'toggle');
        const order = _.get(this.props, 'order');
        const handleDelete = _.get(this.props, 'handleDelete', []);
        return (
            <Modal
                className="delete-order-modal"
                isOpen={isOpen}
                toggle={toggle}
                backdrop={true} >
                <ModalHeader>
                    <Text
                        type="title"
                        text="ยกเลิกการสั่งสินค้า"
                        align="start" />
                </ModalHeader>
                <ModalFooter>
                    <Button
                        type="cancel"
                        text="ยกเลิก"
                        onClick={toggle} />
                    <Button
                        type="primary"
                        text="ตกลง"
                        onClick={() => handleDelete(order)} />
                </ModalFooter>
            </Modal>
        );
    }
}

export default injectIntl(DeleteConfirmation);