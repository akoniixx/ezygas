import React, { Component, Fragment } from 'react';
import _ from 'lodash';

//Child Components
import StockCardMobile from './stock-card-mobile';
import RefillModal from '../modals/modal-refill';
import SideButton from 'Components/SideButton';

export default class Mobile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggleRefill = this.toggleRefill.bind(this);
    }

    toggleRefill() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const props = this.props;
        let methods = _.get(props, 'methods', []);
        const stock = _.get(props, 'stock');
        const refillList = _.get(props, 'refillList', []);
        methods = {
            ...methods,
            toggleRefill: this.toggleRefill
        }
        return (
            <Fragment>
                <div className="empty-tank-list-mobile">
                    {stock.map(
                        product => (
                            <StockCardMobile
                                key={product.id}
                                product={product}
                                methods={methods} />
                        )
                    )}
                </div>
                <RefillModal
                    isOpen={this.state.isOpen}
                    methods={methods}
                    list={refillList} />
                <SideButton
                    button={
                        <img
                            className="sidebar-icon"
                            src='/assets/img/white_cylinder.svg'
                            style={{
                                height: "50%",
                                width: "auto"
                            }} />
                    }
                    onClick={this.toggleRefill} />
            </Fragment>
        );
    }
}