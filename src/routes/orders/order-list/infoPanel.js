import React, { Component } from "react";
import { injectIntl } from 'react-intl';
import Text from 'Components/Text';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from "reactstrap";
import _ from 'lodash';
import * as statusCode from 'Constants/orderStatus';

/**
 * Props list
 * 1. info -> has
 *  1.1 customer -> Typical normal address.
 *  1.2 date -> Date this order created.
 *  1.3 time -> Time this order created.
 *  1.4 isOpen -> State of this modal true when this modal opens.
 *  1.5 order -> Typical order object.
 *  1.6 orderDetail -> Order detail of this order (same object as order.orders).
 * 2. toggle -> Handler function for open / close this modal.
 */

class InfoPanel extends Component {

    constructor(props) {
        super(props);
    }

    onPrint(info) {
        let name = _.get(info, 'customer', "ชื่อลูกค้า");
        let detail = _.get(info, 'orderDetail', []);
        let dateTime = _.get(info, 'date', 'date') + " " + _.get(info, 'time', 'time');
        let id = _.get(info, 'order.vendor_order_id', 'id');
        let Contents = "<hr style ='border-style:dashed'></hr><h4 style='text-align: right;'> เลขที่สั่งซื้อ " + id + "</h4><ul style='list-style-type:none;'><li>ผู้ส่ง..................................................................................................</li><p></p><li>ส่ง.......................................ถัง&nbsp&nbspถังเปล่า......................................ถัง</li><p></p><li>ค่าใช้จ่ายเพิ่มเติม......................................................................บาท</li><p></p><li>ผู้รับ..................................................................................................</li><p></p><li>หมายเหตุ.........................................................................................</li><p></p><li>.........................................................................................................</li></ul> ";
        let Con1 = "<head><style> table {border-collapse: 1px solid #ddd;width: 100%;text-align: left;}td {padding: 0px 30px;} th{border-bottom: 1px solid #ddd; padding: 5px 30px;}</style></head>"
        let Con3 = "<body> <h4 style=' text-align: right;'> เลขที่สั่งซื้อ " + id + "</h4>"
        let Con4 = "<table style='width:100%'><tr><td><h4>รายการสั่งซื้อ</h4></td><td></td><td></td></tr>"

        let Con5 = "<tr><td><h4>ส่ง&nbsp" + name.name + "</h4></td><td></td><td><h4></h4></td></tr>"
        let time = "<tr><td><h4>วันที่&nbsp" + dateTime + "</h4></td><td></td><td><h4></h4></td></tr>"
        let Con6 = "<tr ><th></th><th></th><th></th></tr></table>"
        let Con7 = "<table style='width:100%'><tr ><th>สินค้า</th><th>จำนวน</th><th>ราคา</th></tr><tr><td>&nbsp</td><td></td><td></td></tr>"
        let data = "";
        let sumPrice = 0;
        let sumQu = 0;
        for (let i = 0; i < detail.length; i++) {
            let a = _.get(detail[i], 'stock', 'not found');
            let price = detail[i].quantity * detail[i].price
            sumQu += detail[i].quantity
            sumPrice += price
            data = data + "<tr><td>" + a.cylinder_brand + " " + a.cylinder_type + "</td> <td>" + detail[i].quantity + "</td> <td>" + price + "</td> </tr><tr><td>&nbsp</td><td></td><td></td></tr>"
        }
        data = data + "<tr><td><h4>จำนวนทั้งหมด</h4><h4>รวมทั้งสิ้น</h4></td><td></td><td><h4>" + sumQu + " ถัง</h4><h4>" + sumPrice + " บาท</h4></td></tr></table>"

        let printWindow = window.open('', '', 'height=800,width=1084,scrollbars=1');
        printWindow.document.write('<html><head><title></title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(Con1 + Con3 + Con4 + Con5 + time + Con6 + Con7 + data + Contents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }

    render() {
        const info = _.get(this.props, 'info');
        const toggle = _.get(this.props, 'toggle');
        const isOpening = _.get(info, 'isOpen');
        const customer = _.get(info, 'customer', 'customer');
        const detail = _.get(info, 'orderDetail', _.get(info, 'order.orders', []));
        const service_charge = info.order.service_charge || 0
        const discount = info.order.discount || ""
        const total_price = info.order.total_price || 0
        const status = _.get(info, 'order.status');
        let totalQuantity = 0;
        let totalPrice = 0;
        return (
            <Modal
                className="order-info"
                isOpen={isOpening}
                toggle={toggle}
                wrapClassName="modal-right"
                backdrop={true} >
                <ModalHeader toggle={toggle}>
                    <Text
                        type="title"
                        text="ใบเสร็จสั่งซื้อ"
                        align="start"
                        size="1.2em" />
                </ModalHeader>
                <ModalBody>
                    <Text
                        type="title"
                        text="รายการสั่งซื้อ"
                        align="start" />
                    <div className="paragraph-1 mt-3">
                        <div>
                            <b className="mr-1"><Text type="normal" text="เลขที่สั่งซื้อ" /></b>
                            <Text
                                type="normal"
                                align="end"
                                text={`${_.get(info, 'order.vendor_order_id', 'id')}`} />
                        </div>
                        <div>
                            <b><Text type="normal" text="วันที่" /></b>
                            <Text
                                type="normal"
                                align="end"
                                text={_.get(info, 'date', 'date')} />
                        </div>
                    </div>
                    <div className="paragraph-1 mb-3">
                        <div>
                            <b className="mr-1"><Text type="normal" text="ส่ง" /></b>
                            <Text
                                type="normal"
                                text={`${_.get(customer, 'name', 'ชื่อ')}`} />
                        </div>
                        <div>
                            <b><Text type="normal" text="เวลา" /></b>
                            <Text
                                type="normal"
                                text={_.get(info, 'time', 'XX:XX')} />
                        </div>
                    </div>
                    <hr />
                    <div className="paragraph-2">
                        <b><Text type="normal" text="สินค้า" /></b>
                        <b><Text type="normal" text="จำนวน" /></b>
                        <b><Text type="normal" text="ราคา" /></b>
                    </div>
                    <hr />
                    {detail.map(
                        (item, i) => {
                            const quantity = _.get(item, 'quantity', 0);
                            const price = _.get(item, 'price', 0);
                            const sum = quantity * price;
                            totalQuantity += quantity;
                            totalPrice += sum;
                            const brand = _.get(item, 'stock.cylinder_brand', 'brand');
                            const type = _.get(item, 'stock.cylinder_type', 'type');
                            return (
                                <div key={i} className="order-detail-item mb-2">
                                    <Text
                                        type="normal"
                                        text={`${brand} ${type}`}
                                        align="start" />
                                    <Text type="normal" text={quantity} />
                                    <Text type="normal" text={sum} />
                                </div>
                            );
                        }
                    )}
                    <hr />
                    <div className="order-summary mb-3">
                        <b>
                            <Text
                                type="normal"
                                text="จำนวนทั้งหมด"
                                align="start" />
                        </b>
                        <Text type="normal" text={totalQuantity} />
                        <Text type="normal" text="ถัง" />
                    </div>
                    {service_charge != 0 ?
                        <div className="order-summary mb-3">
                            <b>
                                <Text
                                    type="normal"
                                    text="ค่าบริการ"
                                    align="start" />
                            </b>
                            <Text type="normal" text={service_charge} />
                            <Text type="normal" text="บาท" />
                        </div>
                        :
                        ""
                    }
                    {discount != "" ?
                        <div className="order-summary mb-3">
                            <b>
                                <Text
                                    type="normal"
                                    text="โปรโมชั่น"
                                    align="start" />
                            </b>
                            <Text type="normal" text={discount} />
                        </div>
                        :
                        ""
                    }
                    <div className="order-summary mb-3">
                        <b>
                            <Text
                                type="normal"
                                text="รวมทั้งสิ้น"
                                align="start" />
                        </b>
                        <Text type="normal" text={total_price ==0? totalPrice : total_price} />
                        <Text type="normal" text="บาท" />
                    </div>
                    {
                        status >= statusCode.IN_TRANSIT ?
                            <div className="order-summary sender mb-5">
                                <Text
                                    type="normal"
                                    text="ผู้จัดส่ง"
                                    align="start" />
                                <Text
                                    type="normal"
                                    text={_.get(info, 'order.sender', "ผู้ส่ง")} />
                            </div>
                            :
                            ""
                    }
                    <div className="order-print">
                        <Button color="success" onClick={() => this.onPrint(info)}  >
                            <i className="iconsmind-Printer" />
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

export default injectIntl(InfoPanel);