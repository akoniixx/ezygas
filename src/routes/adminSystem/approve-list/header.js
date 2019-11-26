import React, { Component, Fragment } from 'react';
import Text from 'Components/Text';

class Header extends Component {
    render() {
        
        return (
            <div className="order-history-header-group mb-2">
                <div className="order-history-header">
                    <Text
                        type="header"
                        text="ยืนยันการชำระเงิน" />
                </div>
               
            </div>
        )
    }
}
export default Header;