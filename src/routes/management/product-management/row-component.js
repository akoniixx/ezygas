import React, { Component } from 'react';
import Text from 'Components/Text';
import _ from 'lodash';

/**
 * This Component render information row in product mananagement tabs.
 * Props are
 * 1. label -> Key of this information.
 * 2. value -> Value of this information.
 */

class RowComponent extends Component {
    render() {
        const rowData = _.get(this.props, 'rowData', []);
        const label = rowData.label;
        const value = rowData.value;
        const labelColor = "inherit";
        return (
            <div className="stock-card-info-row">
                <b><Text type="normal" text={`${label}:`} color={labelColor} align="start" /></b>
                <Text type="normal" text={value} align="end" />
            </div>
        );
    }
}

export default RowComponent;