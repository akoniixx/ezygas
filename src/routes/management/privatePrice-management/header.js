import React, { Component, Fragment } from "react";
import Text from "Components/Text";
import Button from "Components/Button";
import _ from "lodash";
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const props = this.props;
        const header = _.get(props, 'header', 'text');
        const method = props.method
        return (
                <div className="product-management-header">
                    <Text
                        type="header"
                        text={header}
                        align="start" />
                    <Button
                        type="primary"
                        text="สร้างโปรโมชั่นเพิ่ม"
                        onClick={(e) => (method.handleState(e, "items", []), method.toggleModalCreatePrivatePrice())} />
                </div>
        )
    }
}

export default Header;