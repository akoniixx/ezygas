import React, { Fragment } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";
import Text from 'Components/Text';
import Button from 'Components/Button';
import * as jsx from "Assets/JSX-Style/InlineStyle";


const modalStyle = (function(w){
    if(w > 701){
        return {...jsx.modalStyle}
    }else {
        return {...jsx.modalStyle, maxWidth: "80vw", left: "40%"}
    }
})(window.innerWidth)

/**
 * Shown when new stock adding is duplicate.
 */
export const ModalDuplicateProduct = (props) => (
    <Modal
        className="add-stock-modal-duplicate"
        isOpen={props.state.modalDuplicateProductOpen}
        toggle={props.toggleModalDuplicateProduct}
        aria-labelledby="example-modal-sizes-title-sm"
        backdrop={true}>
        <ModalHeader>
            <Text
                type="normal"
                text="สินค้านี้ได้ถูกเพิ่มไว้ในการจัดการสินค้าแล้ว" />
        </ModalHeader>
        <ModalBody>
            <Button
                type="primary"
                text="ตกลง"
                onClick={props.toggleModalDuplicateProduct} />
        </ModalBody>
    </Modal>
)

/**
 *  will visible when there is blank space input add product
 */
export const modalNonCompleted = (props) => (
    <Modal
        className="thisismodalnoncompleted"
        style={modalStyle}
        isOpen={props.state.modalNonCompleted}
        toggle={props.toggleModalNonCompletedOpen}
        aria-labelledby="example-modal-sizes-title-sm"
        backdrop={true}>
        <ModalHeader style={jsx.headerModalNonLine}>
            <Text
                type="normal"
                text="กรุณากรอกข้อมูลให้สมบูรณ์หรือครบถ้วน" />
        </ModalHeader>
        <ModalBody className="d-flex justify-content-center">
            <Button
                type="primary"
                text="ตกลง"
                onClick={props.toggleModalNonCompletedOpen} />
        </ModalBody>
    </Modal>
)

/**
 * show when add product success
 */
export const ModalSuccess = (props) => (
    <Modal
        className="thisismodalsuccess"
        style={modalStyle}
        isOpen={props.state.modalSuccessOpen}
        toggle={props.toggleModalSuccessOpen}
        aria-labelledby="example-modal-sizes-title-sm"
        backdrop={true}>
        <ModalHeader style={jsx.headerModalNonLine}>
            <Text
                type="normal"
                text={
                    props.state.addOrEdit ?
                        "การเพิ่มสินค้าสำเร็จ" :
                        "การแก้สำเร็จ"
                } />
        </ModalHeader>
        <ModalBody className="d-flex justify-content-center">
            <Button
                type="primary"
                text="ตกลง"
                onClick={props.toggleModalSuccessOpen} />
        </ModalBody>
    </Modal>
)

/**
 * Shown when
 * 1. Adding or edit stock successful
 * 2. Adding or edit new stock errors.
 */
export const ModalCon = (props) => {
    const isError = (
        props.state.dataAdd.brand === ""
        || props.state.dataAdd.type === ""
        || props.state.dataAdd.full === ""
        || props.state.dataAdd.empty === ""
        || props.state.dataAdd.price === ""
    );
    const isAdd = props.state.addOrEdit;
    return (
        <Modal
            className="add-stock-modal-confirm"
            isOpen={props.state.modalConOpen}
            toggle={props.toggleModalConOpen}
            aria-labelledby="example-modal-sizes-title-sm"
            backdrop={true}>
            <ModalHeader>
                <Text
                    type="normal"
                    text={
                        isError ?
                            "การทำรายการเกิดข้อผิดพลาด กรุณาตรวจรายการพร้อมกรอกข้อมูลให้ครบถ้วน"
                            :
                            isAdd ?
                                "ยืนยันการเพิ่มสินค้า" : "ยืนยันการแก้ไข"

                    }
                    size={isError ? '' : '1.2em'} />
            </ModalHeader>
            <ModalBody>
                {
                    isError ?
                        <Button
                            type="primary"
                            text="ตกลง"
                            onClick={props.toggleModalConOpen} />
                        :
                        <Fragment>
                            <Button
                                type="cancel"
                                text="ยกเลิก"
                                onClick={props.toggleModalConOpen} />
                            <Button
                                type="primary"
                                text="ตกลง"
                                onClick={(e) => props.createProductStock(e, "createAndEdit")} />
                        </Fragment>
                }
            </ModalBody>
        </Modal>
    );
}

export const ModalOverload = (props) => (
    <Modal
        className="thisismodalsuccess"
        style={modalStyle}
        isOpen={props.state.modalOverloadOpen}
        toggle={props.toggleModalOverload}
        aria-labelledby="example-modal-sizes-title-sm"
        backdrop={true}>
        <ModalHeader style={jsx.headerModalNonLine}>
            <Text
                type="normal"
                text="จำนวนที่สั่งเติมไม่สอดล้องกับจำนวนถังเปล่าที่มี"/>
        </ModalHeader>
        <ModalBody className="d-flex justify-content-center">
            <Button
                type="primary"
                text="ตกลง"
                onClick={props.toggleModalOverload} />
        </ModalBody>
    </Modal>
)