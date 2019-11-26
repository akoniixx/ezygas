import React, { Component } from 'react';
import _ from 'lodash';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row
} from "reactstrap";
import { Colxx } from 'Components/CustomBootstrap';
import Text from 'Components/Text';
import Button from 'Components/Button';
import { InputWithValidation } from 'Components/Input';

class ModalCustomer extends Component {
    render() {
        const props = this.props;
        const toggle = _.get(props, 'toggleModal', []);
        const state = _.get(props, 'state', {});
        const isOpen = _.get(state, 'modalOpen', false);
        const isNew = _.get(state, 'addNewCustomer', null);
        const name = _.get(state, 'name', '');
        const tel = _.get(state, 'tel', '');
        const address = _.get(state, 'address', '');
        const handleChangeData = _.get(props, 'handleChangeData', []);
        const message = _.get(props, 'message', '');
        const checkConfirm = _.get(props, 'checkConfirm', []);
        const isCorrectName = (message, name) => {
            if (message != null && message == 'This name is exists.') return false;
            if (_.isEmpty(name)) return null;
            return true;
        }
        const isCorrectTel = (tel) => {
            if (_.isEmpty(tel)) return null;
            const isCorrect = _.get(state, 'phoneNumberForm', false) == true;
            if (isCorrect) return true;
            return false;
        }
        const handleChange = (value, target) => {
            const e = {
                target: {
                    value: value
                }
            }
            if (target == 'address') handleChangeData(value, target);
            else handleChangeData(e, target);
        }
        return (
            <Modal
                isOpen={isOpen}
                toggle={toggle}
                wrapClassName="modal-right"
                backdrop={true} >
                <ModalHeader toggle={toggle}>
                    <Text type="title" text={`${isNew ? "เพิ่ม" : "ข้อมูล"}ลูกค้า`} size="inherit" />
                </ModalHeader>
                <form className="modal-customer">
                    <ModalBody>
                        <Row className="form-group mb-2">
                            <Colxx xxs="2" className="text-center label">
                                <Text type="title" text="ชื่อ:" size="inherit" />
                            </Colxx>
                            <Colxx xxs="10">
                                <InputWithValidation
                                    value={name}
                                    onChange={(e) => { handleChange(e, 'name') }}
                                    isCorrect={isCorrectName(message, name)}
                                    message={
                                        isCorrectName(message, name) != null
                                            && !isCorrectName(message, name)
                                            ? "ชือ-นามสกุลนี้ถูกเคยใช้ในการสมัครแล้ว"
                                            : ''
                                    } />
                            </Colxx>
                        </Row>

                        <Row className="form-group mb-2">
                            <Colxx xxs="2" className="text-center label">
                                <Text type="title" text="เบอร์:" size="inherit" />
                            </Colxx>
                            <Colxx xxs="10">
                                <InputWithValidation
                                    value={tel}
                                    onChange={(e) => { handleChange(e, 'tel') }}
                                    isCorrect={isCorrectTel(tel)}
                                    message={
                                        isCorrectTel(tel) != null
                                            && !isCorrectTel(tel)
                                            ? "กรุณากรอกเบอร์โทรให้ถูกต้อง ตัวอย่างเบอร์โทร 098523xxxx"
                                            : ''
                                    } />
                            </Colxx>
                        </Row>

                        <Row className="form-group">
                            <Colxx xxs="2" className="text-center label px-1">
                                <Text type="title" text="ที่อยู่:" size="inherit" />
                            </Colxx>
                            <Colxx xxs="10">
                                <textarea
                                    className="form-control address"
                                    rows="4"
                                    value={address}
                                    onChange={(e) => handleChange(e, 'address')} />
                            </Colxx>
                        </Row>

                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="cancel"
                            text="ยกเลิก"
                            onClick={toggle} />
                        <Button
                            type="primary"
                            text={isNew ? "ยืนยัน" : "บันทึก"}
                            onClick={checkConfirm} />
                    </ModalFooter>
                </form>
            </Modal>
        )
    }
}

export default ModalCustomer;