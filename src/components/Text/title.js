import React, { Component } from 'react';
import _ from 'lodash';

/**
 * This is title text component.
 * To use this component, use it from index.js.
 */

class Title extends Component {
    render() {
        const text = _.get(this.props, 'text', 'text');
        const size = _.get(this.props, 'size', null);
        const color = _.get(this.props, 'color', null);
        const align = _.get(this.props, 'align', 'center');
        let style = {};
        if (size != null) style = { fontSize: size };
        if (color != null) style = { ...style, color: color };
        style = { ...style, textAlign: align }
        return (
            <span className={`title-text justify-content-${align}`} style={style}>{text}</span>
        );
    }
}

export default Title;