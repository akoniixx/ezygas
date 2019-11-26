import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import Text from 'Components/Text';
import Button from 'Components/Button';
import { Input } from 'Components/Input';
import Dropdown from 'Components/Dropdown';
import * as status from 'Constants/orderStatus';
import _ from 'lodash';

class CompleteOrder extends Component {
    render() {
        const info = _.get(this.props, 'info');
        const isOpen = _.get(info, 'isOpen');
        const order = _.get(info, 'order');
        const emptyTank = _.get(info, 'emptyTank', []);
        const onAddOrDeleteEmptyTank = _.get(this.props, 'onAddOrDeleteEmptyTank');
        const onChangeEmptyTank = _.get(this.props, 'onChangeEmptyTank');
        const changeStatus = _.get(this.props, 'changeStatus');
        const toggle = _.get(this.props, 'toggle');
        const stock = _.get(this.props, 'stock', []);
        const loading = _.get(this.props, 'loading', []);
        const emptyGasInput = (index, item) => {
            const type = _.get(item, 'type', '');
            const brand = _.get(item, 'brand', '');
            const itemDropdownSelecting = (
                _.isEmpty(type) || _.isEmpty(brand) ?
                    'ยี่ห้อ/ขนาดสินค้า' : `${brand} ${type}`
            );
            const list = [];
            if (loading === true && stock.length != 0) {
                stock.forEach(
                    (item) => {
                        const brand = _.get(item, 'cylinder_brand');
                        const type = _.get(item, 'cylinder_type');
                        const name = `${brand} ${type}`;
                        const onSelected = () => {
                            onChangeEmptyTank(index, "TYPE", brand, type);
                        }
                        const o = {
                            name: name,
                            onSelected: onSelected
                        }
                        list.push(o);
                    }
                );
            }
            return (
                <div className="return-tank-item">
                    <Dropdown
                        type="primary"
                        currentSelected={itemDropdownSelecting}
                        list={list} />
                    <Input
                        value={_.get(item, 'quantity', 'NaN')}
                        onChange={(value) => onChangeEmptyTank(index, 'QUANTITY', value)} />
                    <b>
                        <Text
                            type="normal"
                            text="ถัง" />
                    </b>
                    <a
                        className="item-delete"
                        onClick={() => onAddOrDeleteEmptyTank(index)} >
                        <span>X</span>
                    </a>
                </div>
            );
        };
        const placeholder = (
            <div className="complete-order-modal-placeholder" style={{fontFamily: "auto"}}>
                <p>
                    <Text 
                        type="normal"
                        text="กด" />
                    <Text
                        type="normal"
                        text={` "คืนถังเปล่า" `}
                        color="#FFC107" />
                    <Text
                        type="normal"
                        text="ด้านบนขวา เพื่อรับถังเปล่าคืน" />
                </p>
                <p>
                    <Text
                        type="normal"
                        text=" กด" />
                    <Text
                        type="normal"
                        text={` "ตกลง" `}
                        color="#007BFF" />
                    <Text
                        type="normal"
                        text="เพื่อยืนยันการจัดส่งสำเร็จ" />
                </p>
                <p>
                    <Text
                        type="normal"
                        text="กด" />
                    <Text
                        type="normal"
                        text={` "ยกเลิก" `}
                        color="#DC3545" />
                    <Text
                        type="normal"
                        text="ยังไม่ต้องการยืนยันการจัดส่ง" />
                </p>

            </div>
        );
        const emptyTankComponent = emptyTank.map(
            (item, i) => {
                return (
                    <Fragment key={i}>
                        {emptyGasInput(i, item)}
                    </Fragment>
                );
            }
        );
        const body = _.isEmpty(emptyTank) ? placeholder : emptyTankComponent;
        return (
            <Modal
                className="complete-order-modal"
                isOpen={isOpen}
                toggle={toggle}
                backdrop={true} >
                <ModalHeader>
                    <Text
                        type="title"
                        text="ยืนยันการจัดส่งสำเร็จ"
                        align="start" />
                    <Button
                        type="info"
                        text="คืนถังเปล่า"
                        onClick={() => onAddOrDeleteEmptyTank()} />
                </ModalHeader>
                <ModalBody>{body}</ModalBody>
                <ModalFooter>
                    <Button
                        type="cancel"
                        text="ยกเลิก"
                        onClick={toggle} />
                    <Button
                        type="primary"
                        text="ตกลง"
                        onClick={() => changeStatus(order, status.COMPLETED)} />
                </ModalFooter>
            </Modal >
        );
    }
}

export default injectIntl(CompleteOrder);