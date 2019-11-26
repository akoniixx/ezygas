import React, { Component } from 'react';
import { Input as Ip } from 'reactstrap';
import _ from 'lodash';

/**
 * Use these components when using search fields following Ezygas design pattern.
 * Props list
 * 1. value -> Value of the input.
 * 2. onChange -> handle function for onChange event.
 */

class SearchBox extends Component {
    render() {
        const props = this.props;
        let value = _.get(props, 'value', '');
        let onChange = _.get(props, 'onChange', []);
        if (!_.isFunction(onChange)) {
            onChange = () => { console.error('search box:', '"onChange" is not a function or you forgot to declare onChange props.'); }
        }
        return (
            <div className="search-box-container">
                <Ip
                    className="search-box"
                    placeholder="ค้นหา"
                    value={value}
                    onChange={(e) => { onChange(e.target.value) }} />
                <div className="search-icon-group d-flex flex-column justify-content-center">
                    <img
                        className="search-icon"
                        src="/assets/img/search_icon.png" />
                </div>
            </div>
        );
    }
}

export default SearchBox;