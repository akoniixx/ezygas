import React, { Component, Fragment } from 'react';
import Text from 'Components/Text';
import DatePicker from "react-datepicker";

class HeaderControl extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const date = this.props.date
        const func = this.props
        return (
            <Fragment>
                <Header date={date} func={func} />
            </Fragment>
        )
    }
}

export default HeaderControl

class Header extends Component {
    render() {
        const date = this.props.date
        const func = this.props.func
        return (
            <div className="order-history-header-group mb-2">
                <div className="order-history-header">
                    <Text
                        type="header"
                        text="ประวัติการสั่งซื้อ" />
                </div>
                <DatePicker
                    selected={date}
                    dateFormat="DD/MM/YYYY"
                    onChange={func.handleChangeDate} />
            </div>
        )
    }
}