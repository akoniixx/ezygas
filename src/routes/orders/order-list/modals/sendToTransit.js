import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Text from 'Components/Text';
import Button from 'Components/Button';
import { Input } from 'Components/Input';
import { injectIntl } from 'react-intl';
import _ from 'lodash';

import * as status from 'Constants/orderStatus';

class SendToTransit extends Component {

    render() {
        const info = _.get(this.props, 'info');
        const isOpening = _.get(info, 'isOpen');
        const toggle = _.get(this.props, 'toggle', []);
        const order = _.get(info, 'order', []);
        const sender = _.get(order, 'sender', '');
        const onChangeSender = _.get(this.props, 'onChangeSender', []);
        const changeStatus = _.get(this.props, 'changeStatus', []);
        return (
            <Modal
                className="send-to-transit-modal"
                isOpen={isOpening}
                toggle={toggle}
                backdrop={true}>
                <ModalHeader>
                    <Text
                        type="title"
                        text="ยืนยันการจัดส่ง"
                        align="start" />
                </ModalHeader>
                <ModalBody>
                    <Text
                        type="title"
                        text="ผู้ส่ง" />
                    <Input
                        value={sender}
                        placeholder="ชื่อผู้ส่ง"
                        onChange={(value) => onChangeSender(value)} />
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="cancel"
                        text="ยกเลิก"
                        onClick={toggle} />
                    <Button
                        type="primary"
                        text="ตกลง"
                        onClick={
                            () => changeStatus(order, status.IN_TRANSIT, sender)
                        } />
                </ModalFooter>
            </Modal>
        );
    }
}

export default injectIntl(SendToTransit);