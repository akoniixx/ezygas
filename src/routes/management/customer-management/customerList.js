import React, { Component, Fragment } from 'react';
import { Card, CardBody } from "reactstrap";
import { NavLink } from "react-router-dom";
import Text from 'Components/Text';
import Button from 'Components/Button';
import Dropdown from 'Components/Dropdown';
import Media from 'react-media';
import * as screenWidth from 'Constants/screenWidth';
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
                }else tel = '';
                let fullName = []
                //let space can exist only once
                if (name != null) {
                    name.split(" ").map(function (item) {
                        if (item != "") {
                            fullName = fullName.concat([item])
                        }
                    });
                    name = fullName[0] + " " + fullName[1];
                }else name = '';
                return (
                    tel.search(this.props.state.search) !== -1
                    || name.search(this.props.state.search) !== -1
                );
            }
        );
    }

    render() {
        const customerList = this.props.customerList;
        const filteredList = this.filter(customerList.list);
        return (
            <div className="customer-list-data">
                <ListHeader />
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
                                        onCustomerStatusChanged={this.props.onCustomerStatusChanged}
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
        //info button
        const buttonInfo = (
            <Button
                type="image"
                path='/assets/img/icon_info.png'
                alt="ดูข้อมูล"
                onClick={() => this.props.toggleModal("info", customer)} />
        );
        //drop down for suspend the user
        const buttonChangeState = (
            <NavLink
                to={`?id=${customer.id}`}>
                <Dropdown
                    type={
                        customer.is_active == null
                            || customer.is_active == false ?
                            "red" : "green"}
                    currentSelected={
                        customer.is_active == null ?
                            "สถานะ" :
                            customer.is_active == true ? "ใช้งาน" : "ถูกระงับ"
                    }
                    list={[
                        {
                            name: 'ใช้งาน',
                            onSelected: () => this.props.onCustomerStatusChanged(true, customer)
                        },
                        {
                            name: 'ถูกระงับ',
                            onSelected: () => this.props.onCustomerStatusChanged(false, customer)
                        }
                    ]} />
            </NavLink>
        );
        //group all buttons
        const buttonGroup = (
            <Fragment>
                {buttonInfo}
                {buttonChangeState}
            </Fragment>
        );
        const isMobile = window.innerWidth < screenWidth.nonMobileScreenQuery.minWidth;
        return (
            <Card className="mb-2">
                <CardBody
                    className="customer-list-item"
                    //Use wrap to let button fall down into new row
                    //If in mobile view, change justify content type to adjust buttons spacing.
                    style={{
                        flexWrap: 'wrap',
                        justifyContent: isMobile ? 'space-around' : ''
                    }}>
                    <Text
                        type="normal"
                        text={_.isEmpty(customer.name) ? placeholder : customer.name}
                        align="start"
                        //Disable flex grow when in mobile view.
                        style={isMobile ? { flexGrow: 0 } : {}} />
                    <Text
                        type="normal"
                        text={this.convertTelephoneNumber(customer.tel)}
                        align="start" />
                    <Media query={screenWidth.nonMobileScreenQuery}>
                        <Text
                            type="normal"
                            text={_.isEmpty(customer.address) ? placeholder : customer.address}
                            align="start" />
                    </Media>
                    <div
                        className={`customer-buttons-group${
                            //add margin when buttons fall down to new row
                            window.innerWidth < 445 ? ' mt-2' : ''
                            }`}>
                        {buttonGroup}
                    </div>
                </CardBody>
            </Card >
        );
    }
}

export default CustomerList