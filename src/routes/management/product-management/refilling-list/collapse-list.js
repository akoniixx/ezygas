import React, { Component } from 'react';
import { CardImg } from "reactstrap";
import { injectIntl } from 'react-intl';
import _ from 'lodash';

//Components
import RowComponent from '../row-component';

class CollapseList extends Component {
    render() {
        const item = _.get(this.props, 'item', []);
        return (
            <div className="collapse-list mb-3">
                {/* Image Section */}
                <CardImg
                    src={`/assets/img/${item.stock.cylinder_brand} ${item.stock.cylinder_type}.png`} />
                {/* Information Section */}
                <div className="collapse-list-info-wrapper">
                    <div className="collapse-list-info">
                        <div>
                            <RowComponent
                                rowData={{
                                    label: "ยี่ห้อ",
                                    value: item.stock.cylinder_brand
                                }} />
                            <RowComponent
                                rowData={{
                                    label: "ส่งเติม",
                                    value: item.quantity
                                }} />
                        </div>
                        <div>
                            <RowComponent
                                rowData={{
                                    label: "ขนาดสินค้า",
                                    value: item.stock.cylinder_type
                                }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(CollapseList);