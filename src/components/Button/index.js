import React, { Component } from 'react';
import { Button as Btn } from 'reactstrap';
import _ from 'lodash';
import { NavLink } from "react-router-dom";
import { mobileScreenQuery as mobile } from 'Constants/screenWidth';
import ImageButton from './imageButton';

/**
 * Use these components when using buttons following Ezygas design pattern.
 * 
 * Button Type List
 * 1. primary (default)
 * 2. cancel
 * 3. info
 * 4. register
 * 5. image (view props list in './imageButton.js')
 * 
 * Props list
 * 1. type -> Type of button (list of button view on above of this list)
 * 2. text -> Label for this button.
 * 3. onClick -> Handler function when button is clicked.
 * 4. isFullWidth -> If it's true width will be 100%, false for vice versa.
 * 5. to -> Path to another page. (Use this props if this button leads to another page)
 */

class Button extends Component {

    render() {
        const props = this.props;
        let type = _.get(props, 'type', 'primary');
        const onClick = _.get(props, 'onClick', () => { console.log('You forgot the onClick function!') });
        const to = _.get(props, 'to', '');
        if (type == 'image') {
            const path = _.get(props, 'path', 'error');
            const alt = _.get(props, 'alt', 'alt');
            return <ImageButton path={path} alt={alt} onClick={onClick} to={to} />
        }
        let text = _.get(props, 'text', null);
        const isFullWidth = _.get(props, 'isFullWidth', false);
        let classname = "btn buttons w-100";
        let style = _.get(props, "style", {});
        if (window.innerWidth <= mobile.maxWidth) {
            classname += " px-3";
        }
        if (!isFullWidth) {
            style = {
                ...style,
                maxWidth: 150
            }
            if (window.innerWidth > mobile.maxWidth) classname += " px-3";
        }
        if (
            type != 'primary'
            && type != 'cancel'
            && type != 'info'
            && type != 'register'
        ) {
            type = 'primary';
            console.error('Button Component:', 'Type is not valid, please defined valid type following type list files');
        }
        if (text == null) {
            switch (type) {
                case 'primary':
                    text = "ตกลง";
                    break;
                case "cancel":
                    text = "ยกเลิก";
                    break;
                case 'info':
                    text = "รายละเอียด";
                    break;
                case "register":
                    text = "ลงทะเบียน";
                    break;
                default:
                    text = "button";
            }
        }
        classname += ` ${type}`;
        const button = (
            <Btn
                className={classname}
                outline color="primary"
                onClick={onClick}
                size="lg"
                style={style}>
                <span>{text}</span>
            </Btn>
        );
        if (_.isEmpty(to)) {
            return button;
        }
        return (
            <NavLink to={to}>
                {button}
            </NavLink>
        );
    }
}

export default Button;