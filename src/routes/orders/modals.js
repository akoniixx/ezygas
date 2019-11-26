import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";
import Text from 'Components/Text';
import Button from 'Components/Button';
import * as jsx from "Assets/JSX-Style/InlineStyle";

export const ModalNonCompleted = (props) => (
    <Modal
        style={jsx.modalStyle}
        isOpen={props.state.modalNonCompleted}
        toggle={props.toggleModalnonCompletedOpen}
        aria-labelledby="example-modal-sizes-title-sm"
        backdrop={true} >
        <ModalHeader
            className="d-flex flex-row justify-content-center"
            style={jsx.headerModalNonLine} >
            <Text type="normal" text="กรุณากรอกข้อมูลให้สมบูรณ์หรือครบถ้วน" />
        </ModalHeader>
        <ModalBody className="d-flex flex-row justify-content-center">
            <Button
                type="primary"
                text="ตกลง"
                onClick={()=>{props.toggleModalnonCompletedOpen()}} />
        </ModalBody>
    </Modal>
);

export const ModalCon = (props) => (
    <Modal
        style={jsx.modalStyle}
        isOpen={props.state.modalConOpen}
        toggle={props.toggleModalConOpen}
        aria-labelledby="example-modal-sizes-title-sm"
        backdrop={true} >
        <ModalHeader
            className="d-flex flex-row justify-content-center"
            style={jsx.headerModalNonLine} >
            <Text
                type="normal"
                text={`ยืนยันการ${props.state.addNewCustomer ? "สมัคร" : "แก้ไข"}`} />
        </ModalHeader>
        <ModalBody className="modal-buttons">
            <Button
                type="info"
                text="ยกเลิก"
                onClick={props.toggleModalConOpen} />
            <Button
                type="primary"
                text="ยืนยัน"
                onClick={(e) => { props.CreateCustomer(e) }} />
        </ModalBody>
    </Modal>
);

export const ModalSuccess = (props) => (
    <Modal
        style={jsx.modalStyleSuccess}
        isOpen={props.state.modalSuccessOpen}
        toggle={props.toggleModalSuccessOpen}
        aria-labelledby="example-modal-sizes-title-sm"
        backdrop={true} >
        <ModalHeader
            className="d-flex flex-column justify-content-center align-items-center"
            style={jsx.headerModalNonLine} >
            <div className="d-flex flex-column">
                <Text
                    type="normal"
                    text="การสมัครสำเร็จ" />
                <div>
                    <Text
                        type="normal"
                        text="คุณ:"
                        color="#0C0CA9"
                        align="start" />
                    <Text
                        type="normal"
                        text={` ${props.state.name}`}
                        align="start" />
                </div>
                <div>
                    <Text
                        type="normal"
                        text="เบอร์:"
                        color="#0C0CA9"
                        align="start" />
                    <Text
                        type="normal"
                        text={` ${props.state.tel}`}
                        align="start" />
                </div>
            </div>
        </ModalHeader>
        <ModalBody className="modal-buttons">
            <Button
                type="primary"
                text="ตกลง"
                onClick={props.toggleModalSuccessOpen} />
        </ModalBody>
    </Modal>
);