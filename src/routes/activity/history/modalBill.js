import React, { Component, Fragment } from 'react';
import { Row, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import * as jsx from "Assets/JSX-Style/InlineStyle";

/* Unused */

class ModalBillControl extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const state = this.props.state
        const func = this.props
        return (
            <Fragment>
                <Bill state={state} func={func} />
            </Fragment>
        )
    }
}

export default ModalBillControl

class Bill extends Component {
    render() {
        const state = this.props.state
        const func = this.props.func
        return (
            <Fragment>
                <Modal
                    isOpen={state.modalOpen}
                    toggle={func.toggleModal}
                    wrapClassName="modal-right"
                    backdrop={true}
                >
                    <ModalHeader toggle={func.toggleModal}>
                        <h1>
                            <IntlMessages id={"รายการสั่งซื้อ"} />
                        </h1>
                    </ModalHeader>
                    <ModalBody>
                        <BillHeaderDetail state={state} />
                        <Separator className="mb-2" />
                        <HeaderOrderList />
                        <Separator className="mb-2" />
                        <OrderList ordersList={state.ordersList} func={func} state={state}/>
                        <Separator className="mb-2" />
                        <Result state={state} />
                    </ModalBody> 
                    <ModalFooter>

                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

class BillHeaderDetail extends Component {
    render() {
        const state = this.props.state
        return (
            <Fragment>
                <div className="mb-4">
                    <Row >
                        <Colxx sm="7">
                            <IntlMessages id={"เลขที่สั่งซื้อ"} />{" "}{state.billData.vendor_order_id}
                        </Colxx>
                        <Colxx sm="5">
                            <IntlMessages id={"วันที่"} />{" "}<div className="float-sm-right">{state.date}</div>
                        </Colxx>
                        <Colxx sm="7">
                            <IntlMessages id={"ส่ง"} />{" "}{state.customerDetail.name}
                        </Colxx>
                        <Colxx sm="5">
                            <IntlMessages id={"เวลา"} />{" "}<div className="float-sm-right">{state.time}</div>
                        </Colxx>
                    </Row>
                </div>
            </Fragment>
        )
    }
}

class HeaderOrderList extends Component {
    render() {
        return (
            <Fragment>
                <div className="mb-2">
                    <Row>
                        <Colxx sm="5">
                            <IntlMessages id={"สินค้า"} />
                        </Colxx>
                        <Colxx sm="4">
                            <div className="text-center">
                                <IntlMessages id={"จำนวน"} />
                            </div>
                        </Colxx>
                        <Colxx sm="3">
                            <div className="text-center">
                                <IntlMessages id={"ราคา"} />
                            </div>
                        </Colxx>
                    </Row>
                </div>
            </Fragment>
        )
    }
}

class OrderList extends Component {
    render() {
        const ordersList = this.props.ordersList
        const state = this.props.state
        const func = this.props.func
        state.sumGas = 0
        state.sumCost = 0
        return (
            <Fragment>
                {ordersList.map(product => {
                    return (
                        <div className="mb-2" key={product.id}>
                            <Row>
                                <Colxx sm="5">
                                    {product.stock.cylinder_brand + " " + product.stock.cylinder_type}
                                </Colxx>
                                <Colxx sm="4">
                                    <div className="text-center">
                                        {product.quantity}
                                        {func.calSumGas(product.quantity)}
                                    </div>
                                </Colxx>
                                <Colxx sm="3">
                                    <div className="text-center">
                                        {product.quantity * product.price}
                                        {func.calSumCost(product.quantity * product.price)}
                                    </div>
                                </Colxx>
                            </Row>
                        </div>
                    );
                }
                )}
            </Fragment>
        )
    }
}

class Result extends Component {
    render() {
        const state = this.props.state
        return (
            <Fragment>
                <Row className="mb-2">
                    <Colxx sm="9">
                        <IntlMessages id={"จำนวนทั้งหมด"} />
                    </Colxx>
                    <Colxx sm="3">
                        <div className="text-center">
                            {state.sumGas}
                            {" "}
                            {"ถัง"}
                        </div>
                    </Colxx>
                </Row>
                <Row className="mb-2">
                    <Colxx sm="9">
                        <IntlMessages id={"รวมทั้งสิ้น"} />
                    </Colxx>
                    <Colxx sm="3">
                        <div className="text-center">
                            {state.sumCost}
                            {" "}
                            {"บาท"}
                        </div>
                    </Colxx>
                </Row>
                <Row>
                    <Colxx sm="6">
                        <IntlMessages id={"ผู้จัดส่ง"} />
                    </Colxx>
                    <Colxx sm="6">
                        <div className="text-right">
                            {state.billData.sender}
                        </div>
                    </Colxx>
                </Row>
            </Fragment>

        )
    }
}