import React, { Component } from 'react';
import Text from 'Components/Text';

class Header extends Component {
    render() {
        return (
            <div className="order-list-header">
                <Text
                    type="header"
                    text="รายการสั่งซื้อ" />
            </div>
        );
    }
}

export default Header;