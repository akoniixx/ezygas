import React, { Component, Fragment } from 'react';

//Components
import StockCard from './stock-card';

//Modals
import ModalAddTank from './modals/modal-add-tank';

class FullTankManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            isModalAddOpen: false,
            modalAddData: []
        }
        this.toggleModalAdd = this.toggleModalAdd.bind(this);
    }

    toggleModalAdd(product) {
        this.setState({
            isModalAddOpen: !this.state.isModalAddOpen,
            modalAddData: product
        });
    }

    render() {
        const stock = this.props.stock;
        const methods = {
            toggleModal: this.toggleModalAdd
        };
        return (
            <Fragment>
                <StockCard
                    stockList={stock}
                    methods={methods}
                    type="FULL" />
                <ModalAddTank
                    isOpen={this.state.isModalAddOpen}
                    toggle={this.toggleModalAdd}
                    data={this.state.modalAddData}
                    handleModal={this.props.handleModal}
                    propose="EDIT_FULL_TANK" />
            </Fragment>
        );
    }
}

export default FullTankManagement;