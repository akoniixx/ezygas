import React, { Component, Fragment } from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    Card,
    CardBody,
    CardImg
} from "reactstrap";
import Text from 'Components/Text';
import Dropdown from 'Components/Dropdown';
import { Input } from 'Components/Input';
import Button from "Components/Button";
import Media from 'react-media';
import * as screen from 'Constants/screenWidth';
import _ from 'lodash';

/**
 * This modal is being shown when user is clicking button on top right corner of product management page ("สร้างสินค้าเพิ่ม").
 */

class ModalAddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const props = this.props;
        const state = _.get(props, 'state', []);
        const isOpen = _.get(state, 'modalOpen');
        const toggle = _.get(props, 'toggleModal');
        const brand = _.get(state, 'dataAdd.brand', '');
        const type = _.get(state, 'dataAdd.type', '');
        const isAdd = _.get(state, 'addOrEdit');
        const brandList =
            [
                { name: "PTT", onSelected: (e) => props.onChangeProduct(e, "brand", "PTT") },
                { name: "World Gas", onSelected: (e) => props.onChangeProduct(e, "brand", "World Gas") },
                { name: "Siam Gas", onSelected: (e) => props.onChangeProduct(e, "brand", "Siam Gas") }
            ]
        const typeList =
            [
                { id:4, name: "Picnic(4 kg)", onSelected: (e) => props.onChangeProduct(e, "type", "Picnic") },
                { id:15, name: "15 kg", onSelected: (e) => props.onChangeProduct(e, "type", "15 kg") },
                { id:48, name: "48 kg", onSelected: (e) => props.onChangeProduct(e, "type", "48 kg") }
            ]
        const typeListWorldGas = _.sortBy([...typeList, { id:13.5, name: "13.5 kg", onSelected: (e) => props.onChangeProduct(e, "type", "13.5 kg") }], ["id"])
        const typeListPTT = _.sortBy([...typeList, { id:7, name: "7 kg", onSelected: (e) => props.onChangeProduct(e, "type", "7 kg") }], ["id"])
        const column1 = (
            <Fragment>
                <div className="modal-info-row mb-1">
                    <b>
                        <Text
                            type="normal"
                            text="ยี่ห้อ:"
                            align="end"
                            color="inherit" />
                    </b>
                    <Dropdown
                        type="primary"
                        disabled={!isAdd}
                        currentSelected={brand == '' ? 'ยี่ห้อ' : brand}
                        list={brandList} />
                </div>
                <div className="modal-info-row mb-1">
                    <b>
                        <Text
                            type="normal"
                            text="ถังเต็ม:"
                            align="end"
                            color="inherit" />
                    </b>
                    <Input
                        value={_.get(state, 'dataAdd.full')}
                        onChange={
                            (value) =>
                                props.onChangeProduct({ target: { value } }, 'full')
                        } />
                </div>
                <div className={
                    `modal-info-row${
                    window.innerWidth <= screen.mobileScreenQuery.maxWidth ?
                        ' mb-1' : ''
                    }`
                }>
                    <b>
                        <Text
                            type="normal"
                            text="ราคา:"
                            align="end"
                            color="inherit" />
                    </b>
                    <Input
                        value={_.get(state, 'dataAdd.price')}
                        onChange={
                            (value) =>
                                props.onChangeProduct({ target: { value } }, 'price')
                        } />
                </div>
            </Fragment>
        );
        const column2 = (
            <Fragment>
                <div className="modal-info-row mb-1">
                    <b>
                        <Text
                            type="normal"
                            text="ยี่ห้อ:"
                            align="end"
                            color="inherit" />
                    </b>
                    <Dropdown
                        type="primary"
                        disabled={!isAdd || _.isEmpty(brand)}
                        currentSelected={type == '' ? 'ขนาดสินค้า' : type}
                        list={brand === "Siam Gas" ? typeList
                            :
                            brand === "World Gas" ?
                                typeListWorldGas
                                :
                                typeListPTT
                        }
                    />
                </div>
                <div className="modal-info-row">
                    <b>
                        <Text
                            type="normal"
                            text="ถังเปล่า:"
                            align="end"
                            color="inherit" />
                    </b>
                    <Input
                        value={_.get(state, 'dataAdd.empty')}
                        onChange={
                            (value) =>
                                props.onChangeProduct({ target: { value } }, 'empty')
                        } />
                </div>
            </Fragment>
        );
        return (
            <Modal
                className="modal-add-new-stock"
                isOpen={isOpen}
                toggle={toggle}
                wrapClassName="modal-center"
                backdrop={true}>
                <ModalBody>
                    {/* Header */}
                    <Text
                        type="header"
                        text={
                            state.addOrEdit ?
                                "เพิ่มสินค้า"
                                :
                                "แก้ไขสินค้า"
                        } />
                    {/* Card(s) */}
                    <Card>
                        <CardBody>
                            <Fragment>
                                {
                                    _.isEmpty(brand) || _.isEmpty(type) ?
                                        <CardImg
                                            src="/assets/img/logo-login.png" /> :
                                        <CardImg
                                            src={"/assets/img/" + brand + " " + type + ".png"} />
                                }
                                <div className="ml-4">
                                    <div className="modal-add-new-stock-info">
                                        <Media query={screen.nonMobileScreenQuery}>
                                            <Fragment>
                                                <div className="modal-info-column">
                                                    {column1}
                                                </div>
                                                <div className="modal-info-column ml-2">
                                                    {column2}
                                                </div>
                                            </Fragment>
                                        </Media>
                                        <Media query={screen.mobileScreenQuery}>
                                            <Fragment>
                                                <div className="modal-info-column">
                                                    {column1}
                                                    {column2}
                                                </div>
                                            </Fragment>
                                        </Media>
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
                        onClick={props.toggleModal} />
                    <Button
                        type="primary"
                        text="บันทึก"
                        onClick={props.toggleModalConOpen} />
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalAddProduct