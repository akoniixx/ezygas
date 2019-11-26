import React, { Component, Fragment } from 'react';
import Media from 'react-media';
import { injectIntl } from 'react-intl';
import * as screenWidth from 'Constants/screenWidth';
import _ from 'lodash';

//Components
import Desktop from './desktop';
import Mobile from './mobile';

//Modals
import ModalAddTank from '../modals/modal-add-tank';
import { isNaturalNumber } from 'Util/utils';

const errorMessage = {
    nan: 'กรุณากรอกตัวเลขเท่านั้น',
    negativeNumber: 'จำนวนไม่สามารถติดลบได้',
    notEnoughEmptyTanks: 'จำนวนถังเปล่าไม่พอ'
}

class EmptyTankManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalAddOpen: false,
            modalAddData: [],
            refillList: []
        }
        this.toggleModalAdd = this.toggleModalAdd.bind(this);
        this.addRefillList = this.addRefillList.bind(this);
        this.handleCheckCard = this.handleCheckCard.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.setZeroRefillList = this.setZeroRefillList.bind(this);
    }

    addRefillList(product) {
        let r = this.state.refillList;
        const isNoEmptyTank = product.quantity_empty < 1;
        let newItem = {
            product: product,
            amount: 1
        }
        if(isNoEmptyTank){
            newItem = {
                ...newItem,
                amount: 0,
                errorMessage: errorMessage.notEnoughEmptyTanks
            }
        }
        r.push(newItem);
        this.setState({
            refillList: r
        })
    }

    componentWillReceiveProps() {
        if (this.props.activeFirstTab != 2) {
            this.setState({ refillList: [] })
        }
    }

    deleteRefillList(product) {
        let newList = this.state.refillList;
        newList = _.remove(newList, function (o) {
            return o.product !== product
        });
        this.setState({
            refillList: newList
        });
    }

    handleCheckCard(product, isChecked) {
        if (isChecked) {
            this.addRefillList(product);
        } else this.deleteRefillList(product);
    }

    onAmountChange(product, newAmount) {
        const list = this.state.refillList;
        let index = -1;
        index = _.indexOf(list, product);
        let p = list[index];
        const stockQuantity = _.get(p, 'product.quantity_empty', -1);
        let error = '';
        if (isNaN(newAmount)) {
            error = error = errorMessage.nan;
            newAmount = "";
        } else if (isNaturalNumber(newAmount)) {
            if (newAmount > stockQuantity) {
                newAmount = p.amount;
                error = errorMessage.notEnoughEmptyTanks;
            }
        } else if (newAmount < 0) {
            newAmount = 0;
            error = errorMessage.negativeNumber;
        }
        p = {
            ...p,
            errorMessage: error,
            amount: newAmount
        }
        list[index] = p;
        this.setState({
            refillList: list
        });
    }

    setZeroRefillList() {
        this.setState({
            refillList: []
        })
    }

    toggleModalAdd(product) {
        this.setState({
            isModalAddOpen: !this.state.isModalAddOpen,
            modalAddData: product
        });
    }

    render() {
        let stock = this.props.stock;
        if (stock == undefined || !stock.loading) return (<div></div>);
        const stockData = stock.list;
        const methods = {
            handleCheck: this.handleCheckCard,
            toggleModal: this.toggleModalAdd,
            onAmountChange: this.onAmountChange,
            onPostRefillList: this.props.createFillStock,
            setZeroRefillList: this.setZeroRefillList
        };
        return (
            <Fragment>
                <Media query={screenWidth.nonMobileScreenQuery}>
                    <Desktop
                        stock={stockData}
                        methods={methods}
                        refillList={this.state.refillList} />
                </Media>
                <Media query={screenWidth.mobileScreenQuery}>
                    <Mobile
                        stock={stockData}
                        methods={methods}
                        refillList={this.state.refillList} />
                </Media>
                <ModalAddTank
                    isOpen={this.state.isModalAddOpen}
                    toggle={this.toggleModalAdd}
                    data={this.state.modalAddData}
                    handleModal={this.props.handleModal}
                    setZeroRefillList={this.setZeroRefillList}
                    propose="EDIT_EMPTY_TANK" />
            </Fragment>
        );
    }

}

export default injectIntl(EmptyTankManagement);
