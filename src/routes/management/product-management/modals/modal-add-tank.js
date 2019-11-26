import React, { Component, Fragment } from 'react';
import { Modal, ModalBody, ModalFooter, CardImg, Card, CardBody } from 'reactstrap';
import Text from 'Components/Text';
import Button from 'Components/Button';
import Dropdown from 'Components/Dropdown';
import { Input } from 'Components/Input';
import Media from 'react-media';
import * as screen from 'Constants/screenWidth';

/**
 * This modal is being shown when user is clicking add full tank button ("เพิ่มถังเต็ม") or empty tank button ("เพิ่มถังเปล่า").
 */

class ModalAddFullTank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addTank: 0,
            sumTank: "no"
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != undefined) {
            if (nextProps.propose == 'EDIT_FULL_TANK') this.setState({sumTank:nextProps.data.quantity})
            if (nextProps.propose == 'EDIT_EMPTY_TANK') this.setState({sumTank:nextProps.data.quantity_empty})
            this.setState({addTank:0})
        }
    }

    handleCloseModal() {
        this.setState({
            addTank: 0,
            sumTank: 0
        });
        this.props.toggle();
    }

    handleSave(e) {
        const product = this.props.data;
        const status = this.props.propose;
        const { sumTank } = this.state
        if ("EDIT_EMPTY_TANK" === status) {
            this.props.setZeroRefillList();
        }
        if (product != undefined) {
            this.props.handleModal(e, status, product, sumTank);
        }
    }

    onValueChange(rawValue) {
        if (rawValue === "") rawValue = 0;
        const value = parseInt(rawValue, 10);
        let initial = 0;
        if (this.props.propose == 'EDIT_FULL_TANK') initial = this.props.data.quantity;
        if (this.props.propose == 'EDIT_EMPTY_TANK') initial = this.props.data.quantity_empty;
        const sumValue = value + initial;
        this.setState({
            addTank: value,
            sumTank: sumValue
        });
    }

    render() {
        const product = this.props.data;
        const type = (function (e) {
            switch (e) {
                case 'EDIT_FULL_TANK':
                    return "เต็ม";
                case 'EDIT_EMPTY_TANK':
                    return "เปล่า";
                default:
                    return "";
            }
        })(this.props.propose);
        if (product == null) return (<div></div>);
        const isMobile = window.innerWidth <= screen.mobileScreenQuery.maxWidth;
        const Brand = (
            <div className="modal-info-row mb-1">
                <b>
                    <Text
                        type="normal"
                        text="ยี่ห้อ"
                        align="end"
                        color="inherit" />
                </b>
                <Dropdown
                    type="primary"
                    disabled={true}
                    currentSelected={product.cylinder_brand} />
            </div>
        );
        const Type = (
            <div className="modal-info-row mb-1">
                <b>
                    <Text
                        type="normal"
                        text="ขนาดสินค้า"
                        align="end"
                        color="inherit" />
                </b>
                <Dropdown
                    type="primary"
                    disabled={true}
                    currentSelected={product.cylinder_type} />
            </div>
        );
        const AddTankInput = (
            <div className={
                `modal-info-row${
                isMobile ?
                    ' mb-1' : ''
                }`
            } >
                <b>
                    <Text
                        type="normal"
                        text={`เพิ่มถัง${type}`}
                        align="end"
                        color="inherit" />
                </b>
                <Input
                    value={this.state.addTank}
                    onChange={(value) => this.onValueChange(value)} />
            </div>
        );
        const SumTank = (
            <div
                className={`modal-info-row${isMobile ? '-right' : ''}`}
                style={{
                    padding: '0.75rem 0',
                    paddingRight: isMobile ? 10 : 0,
                }} >
                <Text
                    type="normal"
                    text={`รวมทั้งหมด ${this.state.sumTank} ถัง`}
                    align="end" />
            </div>
        );
        return (
            <Modal
                className="modal-add-new-stock"
                isOpen={this.props.isOpen}
                toggle={this.props.toggle}
                wrapClassName="modal-center"
                backdrop={true} >
                <ModalBody>
                    {/* Header */}
                    <Text
                        type="header"
                        text={`เพิ่มถัง${type}`}
                        align="start" />
                    {/* Card(s) */}
                    <Card>
                        <CardBody>
                            {/* Image Section */}
                            <CardImg
                                src={`/assets/img/${product.cylinder_brand} ${product.cylinder_type}.png`} />
                            {/* Information Section */}
                            <div className="ml-4">
                                <div className="modal-add-new-stock-info">
                                    <Media query={screen.nonMobileScreenQuery}>
                                        <Fragment>
                                            <div className="modal-info-column">
                                                {Brand}
                                                {AddTankInput}
                                            </div>
                                            <div className="modal-info-column ml-2">
                                                {Type}
                                                {SumTank}
                                            </div>
                                        </Fragment>
                                    </Media>
                                    <Media query={screen.mobileScreenQuery}>
                                        <Fragment>
                                            <div className="modal-info-column">
                                                {Brand}
                                                {Type}
                                                {AddTankInput}
                                                {SumTank}
                                            </div>
                                        </Fragment>
                                    </Media>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="cancel"
                        text="ยกเลิก"
                        onClick={this.handleCloseModal} />
                    <Button
                        type="primary"
                        text="ตกลง"
                        onClick={(e) => { this.handleSave(e), this.handleCloseModal() }} />
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalAddFullTank;