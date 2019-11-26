import React, { Component, Fragment } from "react";
import _ from 'lodash';
import Text from 'Components/Text';
import { Input, InputWithValidation } from 'Components/Input';
import { isNaturalNumber } from 'Util/Utils';

class VedorControl extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const dataVendor = _.get(this.props, "dataVendor");
        const address = _.get(this.props, "address");
        const onChangeData = _.get(this.props, "onChangeData");
        const checkPhonenumberForm = _.get(this.props, "checkPhonenumberForm");
        return (
            <Fragment>
                <VendorDetail
                    dataVendor={dataVendor}
                    address={address}
                    onChangeData={onChangeData}
                    checkPhonenumberForm={checkPhonenumberForm} />
            </Fragment>
        )
    }
}

export default VedorControl

class VendorDetail extends Component {
    render() {
        const dataVendor = _.get(this.props, "dataVendor.list[0]");
        const address = _.get(this.props, "address");
        const onChangeData = _.get(this.props, "onChangeData");
        const checkPhonenumberForm = _.get(this.props, "checkPhonenumberForm");
        const name = _.get(dataVendor, "name_en", "");
        const service_charge = _.get(dataVendor, "service_charge", "");
        return (
            <Fragment>
                <Text
                    type="header"
                    text="ข้อมูลร้าน"
                    align="start"
                    size="1.5em" />

                <div className="form-row">
                    <div className="form-item">
                        <Text
                            type="normal"
                            text="ชื่อร้าน:" />
                        <InputWithValidation
                            value={name}
                            isRequired={true}
                            isCorrect={!_.isEmpty(name)}
                            placeholder="กรุณากรอกชื่อร้าน"
                            onChange={(value) => onChangeData({ target: { value } }, "vendor", "name_en")} />
                    </div>
                    <div className="form-item">
                        <Text
                            type="normal"
                            text="ค่าบริการ:" />
                        <InputWithValidation
                            value={service_charge}
                            isCorrect={isNaN(service_charge) || service_charge != ''}
                            message={
                                isNaN(service_charge) ? 'กรุณากรอกตัวเลขเท่านั้น' :
                                    service_charge == '' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : ''
                            }
                            placeholder="กรุณากรอกค่าบริการ"
                            onChange={(value) => onChangeData({ target: { value } }, "vendor", "service_charge")} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-item">
                        <Text
                            type="normal"
                            text="เบอร์โทรศัพท์:" />
                        <InputWithValidation
                            value={_.get(dataVendor, "tel", "")}
                            isRequired={true}
                            placeholder="กรุณากรอกเบอร์ติดต่อ"
                            isCorrect={checkPhonenumberForm}
                            message={checkPhonenumberForm ? '' : 'กรุณากรอกเบอร์โทรให้ถูกต้อง ตัวอย่างเบอร์โทร 098523xxxx'}
                            onChange={(value) => onChangeData({ target: { value } }, "vendor", "tel")} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-item address">
                        <Text
                            type="normal"
                            text="ที่อยู่:" />
                        <textarea
                            className="form-control"
                            rows="4"
                            disabled={true}
                            value={address}
                            onChange={(e) => onChangeData(e, 'address')} />
                    </div>
                </div>
            </Fragment>
        )
    }
}