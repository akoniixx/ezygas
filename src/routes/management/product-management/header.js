import React, { Component } from 'react';
import Text from 'Components/Text';
import Button from 'Components/Button';

class Header extends Component {
    render() {
        const props = this.props;
        const header = _.get(props, 'header', 'text');
        const toggleModal = _.get(props, 'toggleAddProductModal', []);
        return (
            <div className="product-management-header">
                <Text
                    type="header"
                    text={header}
                    align="start" />
                <Button
                    type="primary"
                    text="สร้างสินค้าเพิ่ม"
                    onClick={() => { toggleModal("add") }} />
            </div>
        )
    }

}

export default Header
