import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Text from 'Components/Text';
import { Input } from 'Components/Input';
import Button from 'Components/Button';
import _ from 'lodash';

/**
 * This modal is being shown when user is clicking side button on refill tab, mobile view.
 */

class RefillModal extends Component {
    render() {
        const list = _.get(this.props, 'list', []);
        const methods = _.get(this.props, 'methods', []);
        const row = (brand, type, amount, l) => {
            return (
                <div className="refill-card mb-3">
                    <div className="stock-name">
                        <Text
                            type="normal"
                            text={`${brand} ${type}`}
                            align="start" />
                    </div>
                    <div className="refill-amount">
                        <Input
                            value={amount}
                            onChange={
                                (e) => methods.onAmountChange(l, e)
                            } />
                    </div>
                    <div className="refill-unit">
                        <Text
                            type="normal"
                            text="ถัง"
                            align="start" />
                    </div>
                </div>
            );
        }
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={methods.toggleRefill}
                wrapClassName="modal-center"
                backdrop={true} >
                <ModalHeader
                    toggle={methods.toggleRefill} >
                    <Text
                        type="title"
                        text="รายการส่งเติม"
                        align="center" />
                </ModalHeader>
                <ModalBody>
                    {
                        _.isEmpty(list) ?
                            <div className="refill-card">
                                <Text
                                    type="normal"
                                    text="ยังไม่มีรายการส่งเติม"
                                    align="start" />
                            </div>
                            :
                            list.map(
                                (l, i) => {
                                    return (
                                        <Fragment key={i}>
                                            {
                                                row(
                                                    l.product.cylinder_brand,
                                                    l.product.cylinder_type,
                                                    l.amount,
                                                    l
                                                )
                                            }
                                        </Fragment>
                                    );
                                }
                            )
                    }
                </ModalBody>
                {
                    list != undefined && list.length > 0 ?
                        <ModalFooter>
                            <div className="refill-button w-100">
                                <Button
                                    type="primary"
                                    text="สร้างสินค้าเพิ่ม"
                                    onClick={
                                        () => { methods.onPostRefillList(list, "create"), methods.setZeroRefillList() }
                                    } />
                            </div>
                        </ModalFooter>
                        : ''
                }
            </Modal>
        );
    }
}

export default RefillModal;