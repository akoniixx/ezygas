import React, { Component } from 'react';
import _ from 'lodash';
import { NavLink } from "react-router-dom";

/**
 * Use this component when you want to use the image which act like button following Ezygas design pattern.
 * 
 * Props are
 * 1. path -> URL of your image.
 * 2. alt -> Equivalent to alt in "img" tag.
 * 3. onClick -> Handler function when button is clicked.
 */

class ImageButton extends Component {
    render() {
        const props = this.props;
        const path = _.get(props, 'path');
        const alt = _.get(props, 'image');
        const onClick = _.get(props, 'onClick');
        const to = _.get(props, 'to', '');
        if (path == 'error') {
            console.error('image button:', 'no image path');
        }
        const out = (
            <img
                className="image-button"
                src={path}
                alt={alt}
                onClick={onClick} />
        );
        if (_.isEmpty(to)) return out;
        return (
            <NavLink to={to}>
                {out}
            </NavLink>
        );
    }
}

export default ImageButton;