import React, { Component, Fragment } from "react";
import { Modal, ModalBody, ModalFooter, Card, CardBody } from "reactstrap";
import Button from "Components/Button"
import { Input } from 'Components/Input';
import Text from "Components/Text";
import _ from 'lodash';
class modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            minimumPrice: 0,
            discount: 0,
            validateFillout: true
        }
        this.handleState = this.handleState.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const props = nextProps;
        const items = props.items || {}
        this.setState(
            {
                minimumPrice: items.maximum_price || 0,
                discount: items.discount_price || 0,
                validateFillout: true
            })
    }
    handleState(e, index) {
        let state = {}
        if (!isNaN(+e)) {
            state[index] = e
            this.setState(state)
        } 
    }
    submit(name) {
        let { minimumPrice, discount } = this.state
        let method = this.props.method
        let data = {
            name: name,
            minimumPrice: minimumPrice,
            discount: discount
        }
        if (+minimumPrice && +discount) {
            this.setState({ validateFillout: true }, method.createPrivatePrice(data))
        } else {
            this.setState({ validateFillout: false })
        }
    }
    render() {
        const { discount, minimumPrice, validateFillout }  = this.state
        const props = this.props;
        const modalOpen = props.modalOpen || false;
        const method = props.method
        const name = `ซื้อครบ ${minimumPrice} บาท ลด ${discount} บาท`
        const flexBasis = (window.innerWidth >= 384) ? { flexBasis: "49%" } : { flexBasis: "100%" }
        const input1 = (
            <Fragment>
                <div className="mb-4" style={{ display: "flex", alignItems: "baseline" }}>
                    <b className="mr-2" style={{ minWidth: "4rem" }}>
                        <Text
                            type="normal"
                            text="ราคาขั้นต่ำ:"
                            align="end"
                            color="inherit" />
                    </b>
                    <div style={{ maxWidth: "4rem" }}>
                        <Input value={minimumPrice} onChange={(e) => { this.handleState(e, "minimumPrice") }} />
                    </div>
                </div>
            </Fragment>
        );
        const input2 = (
            <Fragment>
                <div className="mb-4" style={{ display: "flex", alignItems: "baseline" }}>
                    <b className="mr-2" style={{ minWidth: "4rem" }}>
                        <Text
                            type="normal"
                            text="ส่วนลด:"
                            align="end"
                            color="inherit" />
                    </b>
                    <div style={{ maxWidth: "4rem" }}>
                        <Input value={discount} onChange={(e) => { this.handleState(e, "discount") }} />
                    </div>
                </div>
            </Fragment>
        );
        const input3 = (
            <Fragment>
                <div className="mb-4" style={{ display: "flex", alignItems: "baseline" }}>
                    <b className="mr-2" style={{ minWidth: "4rem" }}>
                        <Text
                            type="normal"
                            text="ชื่อ:"
                            align="end"
                            color="inherit" />
                    </b>
                    <div style={{ maxWidth: "100%" }}>
                        <Text
                            type="normal"
                            text={name}
                            align="end"
                            color="inherit" />
                    </div>
                </div>
            </Fragment>
        );
        return (
            <div>
                <Modal
                    className="modal-add-new-stock"
                    isOpen={modalOpen}
                    toggle={method.toggleModal}
                    wrapClassName="modal-center"
                    backdrop={true}
                >
                    <ModalBody>
                        {/* Header */}
                        <Text
                            type="header"
                            text={true ? "เพิ่มโปรโมชั่น" : "แก้ไขโปรโมชั่น"
                            } />
                        {/* Card(s) */}
                        <Card>
                            <CardBody>
                                <Fragment>
                                    <div className="ml-4">
                                        <div className="modal-add-new-stock-info justify-content-start" style={{ flexWrap: "wrap" }}>
                                            <Fragment>
                                                <div className="mr-1" style={{ display: "flex", ...flexBasis }}>
                                                    {input1}
                                                </div>
                                                <div style={{ display: "flex", ...flexBasis }}>
                                                    {input2}
                                                </div>
                                                <div style={{ display: "flex", flexBasis: "100%" }}>
                                                    {input3}
                                                </div>
                                                <div style={{ color: "red" }}>
                                                    {validateFillout == false ? "กรุณากรอกข้อมูลให้ครบ" : ""}
                                                </div>
                                            </Fragment>
                                        </div>
                                    </div>
                                </Fragment>
                            </CardBody>
                        </Card>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="cancel"
                            text="ยกเลิก"
                            onClick={method.toggleModalCreatePrivatePrice} />
                        <Button
                            type="primary"
                            text="บันทึก"
                            onClick={() => this.submit(name)} />
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

export default modal;

