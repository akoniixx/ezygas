import React, { Component, Fragment } from 'react';
import { Card, CardBody } from "reactstrap";
import Text from 'Components/Text';
import Button from 'Components/Button';
import Media from 'react-media';
import * as screenWidth from 'Constants/screenWidth';
import _ from 'lodash';
function collect(props) {
    return { data: props.data };
}

const placeholder = '-';

class CustomerList extends Component {

    constructor(props) {
        super(props);
        this.filter = this.filter.bind(this);
    }

    filter(list) {
        if (list == undefined) return [];
        return list.filter(
            (item) => {
                let name = item.name;
                let tel = item.tel;
                //change +66 to 0
                if (tel != null) {
                    if (item.tel.substring(0, 3) == "+66") {
                        item.tel = "0" + item.tel.substring(3);
                    }
                } else tel = '';
                let fullName = []
                //let space can exist only once
                if (name != null) {
                    name.split(" ").map(
                        function (item) {
                            if (item != "") {
                                fullName = fullName.concat([item])
                            }
                        }
                    );
                    name = fullName[0] + " " + fullName[1];
                }else name = '';
                return item.is_active
                    && (
                        tel.search(this.props.state.search) !== -1
                        || name.search(this.props.state.search) !== -1
                    );
            }
        );
    }

    render() {
        const customerList = this.props.customerList;
        const filteredList = this.filter(customerList.list);
        const listStyle = (function (width) {
            if (width < 1500) {
                return {
                    fontSize: "1.5vw"
                }
            } return {
                fontSize: "1vw"
            }
        })(window.innerWidth);

        
        return (
            <div className="customer-list-data">
                <ListHeader css={listStyle} />
                {
                    customerList.loading
                        && filteredList.length > 0 ?
                        filteredList.map(
                            (customer, i) => {
                                return (
                                    <DataList
                                        customer={customer}
                                        routeChangeOrder={this.props.routeChangeOrder}
                                        toggleModal={this.props.toggleModal}
                                        key={i} />
                                );
                            }
                        )
                        :
                        <div className="customer-list-placeholder">
                            <Text type="title" text="ยังไม่มีรายชื่อลูกค้า" align="start" />
                        </div>
                }
            </div>
        )
    }
}

class ListHeader extends Component {
    render() {
        return (
            <Media query={screenWidth.nonMobileScreenQuery}>
                <div className="customer-list-item mb-2 py-1">
                    <Text
                        type="title"
                        text="ชื่อ"
                        align="start"
                        size="1.1em" />
                    <Text
                        type="title"
                        text="เบอร์โทรศัพท์"
                        align="start"
                        size="1.1em" />
                    <Text
                        type="title"
                        text="ที่อยู่"
                        align="start"
                        size="1.1em" />
                </div>
            </Media>
        );
    }
}

class DataList extends Component {

    constructor(props) {
        super(props);
        this.convertTelephoneNumber = this.convertTelephoneNumber.bind(this);
    }

    convertTelephoneNumber(tel) {
        if (_.isEmpty(tel)) return placeholder;
        if (tel.length < 3) {
            console.warn(`tel: ${tel} length < 3`);
            return placeholder;
        }
        if (tel.substring(0, 3) == "+66") {
            return "0" + tel.substring(3);
        }
        return tel;
    }

    render() {
        const customer = this.props.customer;
        const buttonInfo = (
            <Button
                type="image"
                path="/assets/img/icon_info.png"
                alt="info"
                onClick={() => this.props.toggleModal("info", customer)} />
        );
        const buttonPos = (
            <Button
                type="image"
                path="/assets/img/icon_pos.png"
                alt="order"
                onClick={()=>this.props.routeChangeOrder(customer)}
                to={`?id=${customer.id}`} />
        );
        const buttonGroup = (
            <Fragment>
                {buttonInfo}
                {buttonPos}
            </Fragment>
        );
        return (
            <Card className="mb-2">
                <CardBody className="customer-list-item">
                    <Text type="normal" text={_.isEmpty(customer.name) ? placeholder : customer.name} align="start" />
                    <Text
                        type="normal"
                        text={this.convertTelephoneNumber(customer.tel)}
                        align="start" />
                    <Media query={screenWidth.nonMobileScreenQuery}>
                        <Text type="normal" text={_.isEmpty(customer.address) ? placeholder : customer.address} align="start" />
                    </Media>
                    <div className="customer-buttons-group">
                        {buttonGroup}
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default CustomerList