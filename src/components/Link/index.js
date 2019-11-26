import React, { Component } from 'react';
import _ from 'lodash';;
import { isNumber } from 'util';

/**
 * Use these components when using link buttons following Ezygas design pattern.
 * 
 * Props list
 * 1. text -> Label for this button.
 * 2. onClick -> Handler function when button is clicked.
 * 3. size -> Size of this link component. (Any unit supports css, string).
 */

class Link extends Component {

    render() {
        const props = this.props;
        const onClick = _.get(props, 'onClick', () => { console.log('You forgot the onClick function!') });
        const text = _.get(props, 'text', 'button');
        let size = _.get(props, 'size', '1em');
        return (
            <span
                className="link"
                onClick={onClick}
                style={{ fontSize: size }} >
                {text}
            </span>
        );
    }
}

export default Link;