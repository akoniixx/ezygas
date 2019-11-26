import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Button from 'Components/Button';
import Text from 'Components/Text';
import { Redirect } from "react-router";
import * as screen from 'Constants/screenWidth';

class ModalControl extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const state = this.props.state
        const func = this.props
        return (
            <Fragment>
                <ModalCon state={state} func={func} />
                <ModalSuccess state={state} func={func} />
            </Fragment>
        )
    }
}

export default ModalControl


class ModalCon extends Component {
    render() {
        const state = this.props.state
        const func = this.props.func
        const posModal = (function(w){
            if(w > 1024){
                return "pos-modal"
            } else {
                return "pos-modal-mobile"
            }
        })(window.innerWidth)
        // console.log("posModal", posModal)
        return (
            <Fragment>
                <Modal
                    className={`${posModal} confirmmm`}
                    isOpen={state.modalConOpen}
                    toggle={func.toggleModalConOpen}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true} >
                    <ModalHeader>
                        <div className="pos-modal-message">
                            {
                                state.sumGas === 0 || state.checkTimeCurrent === false ?
                                    <Fragment>
                                        <Text
                                            type="normal"
                                            text="การทำรายการเกิดข้อผิดพลาด" />
                                        <Text
                                            type="normal"
                                            text="กรุณาตรวจรายการพร้อมกรอกข้อมูลให้ครบถ้วน" />
                                        <Text
                                            type="normal"
                                            text="หรือ" />

                                        <Text
                                            type="normal"
                                            text="เวลาที่เลือกไม่เหมาะสม" />
                                    </Fragment> : 
                                    <Text type="normal" text={`ยืนยันการสั่งซื้อจำนวน ${state.sumGas} ถัง`} />
                            }
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div
                            className={`pos-modal-buttons justify-content-${
                                state.sumGas === 0 || state.checkTimeCurrent === false ? "center" : "between"
                                }`} >
                            {state.sumGas === 0 || state.checkTimeCurrent === false ?
                                <Button
                                    type="info"
                                    text="ตกลง"
                                    onClick={func.toggleModalConOpen} />
                                :
                                <Fragment>
                                    <Button
                                        type="cancel"
                                        text="ยกเลิก"
                                        onClick={func.toggleModalConOpen} />
                                    <Button
                                        type="primary"
                                        text="ยืนยัน"
                                        onClick={(e) => { func.CreateOrder(e, state.id) }} />
                                </Fragment>
                            }
                        </div>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

class ModalSuccess extends Component {
    render() {
        const state = this.props.state
        const func = this.props.func
        const posModal = (function(w){
            if(w > 1024){
                return "pos-modal"
            } else {
                return "pos-modal-mobile"
            }
        })(window.innerWidth)
        return (
            <Fragment>
                <Modal
                    className={`${posModal}`}
                    isOpen={state.modalSuccessOpen}
                    toggle={func.toggleModalSuccessOpen}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true} >
                    <ModalHeader>
                        <div className="pos-modal-message">
                            {
                                state.CheckOrderMes ?
                                    <Text
                                        type="normal"
                                        text="การสั่งซื้อสำเร็จ" />
                                    :
                                    <Text
                                        type="normal"
                                        text="จำนวนสินค้าไม่พอสั่งซื้อ" />
                            }
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="pos-modal-buttons justify-content-center">
                            <Button
                                type="primary"
                                text="ตกลง"
                                onClick={
                                    state.CheckOrderMes ?
                                        (e) => {
                                            func.clearItem(e);
                                            func.toggleModalSuccessOpen(e, true);
                                        } :
                                        (e)=>{
                                            func.clearItem(e);
                                            func.toggleModalSuccessOpen();
                                            func.dataStock();
                                        }
                                } />
                        </div>
                        {state.ChangeToOrderList && (<Redirect to="/orders/order-list" />)}
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}
