import React, { Component } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import Text from 'Components/Text';
import _ from 'lodash';

class HeaderOverall extends Component {
    render() {
        const customers = _.get(this.props, 'customers');
        return <Header customers={customers} />;
    }
}

export default HeaderOverall

class Header extends Component {
    render() {
        const customers = _.get(this.props, 'customers', []);
        return (
            <div className="pos-header">
                <Row>
                    <Colxx xxs="12">
                        <Row>
                            <div className="mb-2 px-3 pos-header-text">
                                <Text type="header" text="รายชื่อลูกค้า" />
                                <div className="navigation mx-2 pb-2">
                                    <Text type="normal" text="ค้นหาลูกค้า > ลูกค้า > สั่งสินค้า > " color="inherit" />
                                    <Text type="normal" text={_.get(customers, 'name', 'Name')} color="inherit" />
                                </div>
                            </div>
                        </Row>
                    </Colxx>
                </Row>
            </div>
        )
    }
}