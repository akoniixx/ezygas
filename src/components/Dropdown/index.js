import React, { Component } from 'react';
import {
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import _ from 'lodash';

/**
 * Use these components when using buttons following Ezygas design pattern.
 * 
 * Button Type List (Colors)
 * 1. primary (default, grey)
 * 2. green
 * 3. red
 * 
 * Props list
 * 1. type -> Type of button (list of button view on above of this list)
 * 2. currentSelected -> Value of current value that dropdown list selecting.
 * 3. disabled -> True if this dropdown is disabled, false for vice versa.
 * 4. list -> Array of object that be the choices in dropdown list, structure below.
 * 5. isFullWidth -> If it's true width will be 100%, false for vice versa.
 * 6. width -> Custom width into this component.
 * 
 * list structure example
 *  example_list: [
 *      {
 *          name: 'string of choice',
 *          onSelected: () => { [your handler function if this item selected] }
 *      },
 *      {
 *          name: 'string of choice2',
 *          onSelected: () => { [your handler function if this item selected] }
 *      }
 *  ]
 * 
 * ** List can be null or empty if disabled is true.
 */

const typeslist = [
    'primary',
    'green',
    'red'
];

class Dropdown extends Component {
    render() {
        const props = this.props;
        let type = _.get(props, 'type', typeslist[0]);
        if (!_.includes(typeslist, type)) {
            console.error('Dropdown', `invalid types (${type}), consider check your type prop, Displaying default type.`);
            type = typeslist[0];
        }
        const currentSelected = _.get(props, 'currentSelected', '');
        let disabled = _.get(props, 'disabled', false);
        const list = _.get(props, 'list', []);
        const width = _.get(props, 'width', '');
        const isFullWidth = _.get(props, 'isFullWidth', false);
        const style = _.get(props, 'style', {})
        if (list == null || _.isEmpty(list)) disabled = true;
        if (_.isEmpty(currentSelected)) console.error('Dropdown:', 'currentSelected is not defined, consider pass it from props.');
        let className = 'dropdown-group';
        if (!isFullWidth) className += ' dropdown-fixed';
        if (type == typeslist[1]) className += ' green';
        else if (type == typeslist[2]) className += ' red';
        return (
            <UncontrolledButtonDropdown className={className} style={{ width: width }}>
                <DropdownToggle caret size="lg" disabled={disabled} outline  style={style}>
                    <span>{currentSelected}</span>
                </DropdownToggle>
                {
                    !disabled ?
                        <DropdownMenu
                            style={{
                                minHeight: 40,
                                maxHeight: '18vh',
                                overflowY: 'auto',
                            }}>
                            {list.map(
                                (item, i) => {
                                    const name = item.name;
                                    const onClick = item.onSelected;
                                    return (
                                        <DropdownItem
                                            key={i}
                                            onClick={onClick}>
                                            {name}
                                        </DropdownItem>
                                    );
                                }
                            )}
                        </DropdownMenu> : ''
                }
            </UncontrolledButtonDropdown>
        );
    }
}

export default Dropdown;