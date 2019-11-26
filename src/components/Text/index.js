import React, { Component, Fragment } from 'react';
import _ from 'lodash';

//Components
import Header from './header';
import Normal from './normal';
import Title from './title';

/**
 * Use these components when using text fields following Ezygas design pattern.
 * 
 * Component Type List
 * 1. header
 * 2. normal
 * 3. title
 * 
 * Props list
 * 1. type -> Type of your text, list on above.
 * 2. text -> Text that you want to declare.
 * 3. size -> Custom size for your text.
 * 4. color -> Custom color for your text.
 * 5. align -> Alignment for your text, default is center.
 */

const alignList = ['start', 'center', 'end'];

class Text extends Component {
    render() {
        const props = this.props;
        const type = _.get(props, 'type', '');
        const text = _.get(props, 'text', 'text');
        const size = _.get(props, 'size', null);
        const color = _.get(props, 'color', null);
        let align = _.get(props, 'align', 'center');
        if(!_.includes(alignList, align)){
            align = 'center';
            console.error('Text Component', `Invalid align ${align}`);
        }
        if (type == 'header') return <Header text={text} size={size} color={color} align={align} />;
        if (type == 'normal') return <Normal text={text} size={size} color={color} align={align} />;
        if (type == 'title') return <Title text={text} size={size} color={color} align={align} />;
        console.error('Text Component', 'Type is not valid, please defined valid type following type list files');
        return (<div>{text}</div>);
    }
}
export default Text;