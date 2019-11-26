import React, { Component } from 'react';
import _ from 'lodash';

class SideButton extends Component {
    render() {
        const button = _.get(this.props, 'button');
        const onClick = _.get(this.props, 'onClick');
        return (
            <div className="side-button-container">
                <a
                    href="#"
                    className="side-button d-flex flex-row justify-content-center"
                    onClick={onClick}>
                    {button}
                </a>
            </div>
        );
    }
}

export default SideButton;