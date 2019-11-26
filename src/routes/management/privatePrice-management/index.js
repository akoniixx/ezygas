import React, { Component } from "react";
import { injectIntl } from 'react-intl';
import { Separator } from "Components/CustomBootstrap";
import { connect } from "react-redux";
import { getPrivatePrice, postPrivatePrice } from "Redux/actions";
import Header from './header';
import ModalCreatePrivatePrice from './modalCreatePrivatePrice';
import Listprivateprice from './listPrivatePrice';

class PrivatePrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            modalCreatePrivatePriceOpen: false
        }
        this.createPrivatePrice = this.createPrivatePrice.bind(this);
        this.handleState = this.handleState.bind(this);
        this.toggleModalCreatePrivatePrice = this.toggleModalCreatePrivatePrice.bind(this);
    }

    componentDidMount(){
        this.props.getPrivatePrice();
    }

    createPrivatePrice(payload, id){
        const { items } = this.state
        const data = {
            name_th: payload.name,
            maximum_price: payload.minimumPrice,
            discount_price: payload.discount
        }
        this.props.postPrivatePrice(data, items.id);
        this.toggleModalCreatePrivatePrice();
    }

    handleState(e, index, items=""){
        let state = {}
        state[index] = items || e
        this.setState(state)
    }

    toggleModalCreatePrivatePrice() {
        let { modalCreatePrivatePriceOpen } = this.state
        this.setState({ modalCreatePrivatePriceOpen: !modalCreatePrivatePriceOpen })
    }


    render() {
        const { items ,modalCreatePrivatePriceOpen } = this.state
        const props = this.props
        const privatePrice = props.private_price.list || []
        const method = {
            createPrivatePrice: this.createPrivatePrice,
            handleState: this.handleState,
            toggleModalCreatePrivatePrice: this.toggleModalCreatePrivatePrice
        }
        return (
            <div className="product-management disable-text-selection ">
                <ModalCreatePrivatePrice items={items} modalOpen={modalCreatePrivatePriceOpen} method={method} />
                <div className="product-management-header-group mb-2">
                    <Header header="การจัดการโปรโมชั่น" method={method} />
                </div>
                <Separator className="mb-2" />
                <Listprivateprice privatePrice={privatePrice} method={method}/>
            </div>

        )
    }
}

const mapStateToProps = ({ private_price }) => {
    return {
        private_price
    };
};
export default injectIntl(connect(
    mapStateToProps,
    {
        getPrivatePrice, 
        postPrivatePrice
    }
)(PrivatePrice));