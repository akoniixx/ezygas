import React, { Component, Fragment } from 'react';
import { Card, CardBody } from 'reactstrap';
import Text from 'Components/Text';
import Button from 'Components/Button';
import { InputWithValidation } from 'Components/Input';
import { Separator } from 'Components/CustomBootstrap';
import _ from 'lodash';

class RefillCard extends Component {
    render() {
        const list = this.props.refillList;
        const methods = _.get(this.props, 'methods', []);
        return (
            <Card className="refill-card">
                <CardBody>
                    <Text type="title" text="รายการส่งเติม" align="start" />
                    <Separator className="mt-2 mb-3" />
                    {
                        list != undefined && list.length > 0 ?
                            list.map(
                                (l, i) => {
                                    const errorMessage = _.get(l, 'errorMessage', '')
                                    return (
                                        <Fragment key={i}>
                                            <div className="mb-3">
                                                <div className="stock-name">
                                                    <Text
                                                        type="normal"
                                                        text={`${l.product.cylinder_brand} ${l.product.cylinder_type}`}
                                                        align="start" />
                                                </div>
                                                <div className="refill-amount">
                                                    <InputWithValidation
                                                        value={_.get(l, 'amount', '')}
                                                        onChange={(e) => methods.onAmountChange(l, e)}
                                                        isCorrect={errorMessage == null || _.isEmpty(errorMessage)}
                                                        message={errorMessage} />
                                                </div>
                                                <div className="refill-unit">
                                                    <Text
                                                        type="normal"
                                                        text="ถัง" />
                                                </div>
                                            </div>
                                        </Fragment>
                                    );
                                }) :
                            <Text
                                type="normal"
                                text="ยังไม่มีถังที่จะสั่งเติม"
                                align="start" />
                    }
                    {
                        list != undefined && list.length > 0 ?
                            <div className="refill-button">
                                <Button
                                    type="register"
                                    onClick={() => { methods.onPostRefillList(list, "create"), methods.setZeroRefillList() }}
                                    text="สร้างสินค้าเพิ่ม" />
                            </div>
                            : ""
                    }
                </CardBody>
            </Card>
        );
    }
}

export default RefillCard;