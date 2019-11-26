import React, { Component } from 'react';
import Text from 'Components/Text';
import SearchBox from 'Components/SearchBox';
import Button from 'Components/Button';
import _ from 'lodash';
import * as screenWidth from "Constants/screenWidth";
class Header extends Component {
    render() {
        const props = this.props;
        const header = _.get(props, 'header', 'header');
        const buttonText = _.get(props, 'addCustomer', 'text');
        const toggleModal = _.get(props, 'toggleModal', []);
        const searchText = _.get(props, 'state.search', '');
        const handleKeyPress = _.get(props, 'handleKeyPress', []);

        return (
            <div className="customer-list-header">
                <div className="customer-list-header-text">
                    <Text type="header" text={header} />
                    <Button
                        type="primary"
                        text={buttonText}
                        onClick={() => { toggleModal('add') }} />
                </div>
                <div className={`customer-list-search mb-2${
                    window.innerWidth > screenWidth.mobileScreenQuery.maxWidth
                        ? ' pr-0' : ''}`}>
                    <SearchBox
                        value={searchText}
                        onChange={
                            (value) => {
                                const e = { target: { value: value } };
                                handleKeyPress(e, 'search');
                            }
                        } />
                </div>
            </div >
        )
    }
}

export default Header