import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import {
    Nav,
    NavLink,
    NavItem,
    TabContent,
    TabPane,
    Row
} from "reactstrap";
import _ from 'lodash';
import classnames from "classnames";
import { Colxx } from 'Components/CustomBootstrap';
import { connect } from "react-redux";
import { getStock, postStock, getFillList, postFill } from "Redux/actions";

import Media from 'react-media';

//Child Components
import Header from "./header";
import OverView from "./overview";
import EmptyTankManagement from './empty-tank';
import RefillGasList from "./refilling-list";
import FullTankManagement from './full-tank';

//Modals
import * as modal from './modals/modals';
import ModalAddProduct from './modals/modal-add-product';

class DataListLayout extends Component {

    constructor(props) {
        super(props);
        this.callData = this.callData.bind(this);
        this.completeRefillStock = this.completeRefillStock.bind(this);
        this.createFillStock = this.createFillStock.bind(this);
        this.createProductStock = this.createProductStock.bind(this);
        this.dataFill = this.dataFill.bind(this);
        this.dataStock = this.dataStock.bind(this);
        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.setDuplicateProduct = this.setDuplicateProduct.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModalConOpen = this.toggleModalConOpen.bind(this);
        this.toggleModalSuccessOpen = this.toggleModalSuccessOpen.bind(this);
        this.toggleModalNonCompletedOpen = this.toggleModalNonCompletedOpen.bind(this);
        this.toggleModalDuplicateProduct = this.toggleModalDuplicateProduct.bind(this);
        this.toggleModalOverload = this.toggleModalOverload.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeFirstTab: "1",
            modalOpen: false,
            modalConOpen: false,
            modalSuccessOpen: false,
            modalNonCompleted: false,
            modalDuplicateProductOpen: false,
            modalOverloadOpen: false,
            selectedItems: [],
            lastChecked: null,
            displayOptionsIsOpen: false,
            isLoading: true,
            itemList: [],
            dataAdd: {
                id: "",
                img: "",
                brand: "",
                type: "",
                full: "",
                empty: "",
                price: "",
                is_active: ""
            },
            addOrEdit: true,
            duplicateProduct: false
        };
    }

    addItem(value, data) {
        if (value === "add") {
            //append to array 
            this.setState({
                itemList: this.state.itemList.concat([this.state.dataAdd])
            })
        } else {
            //remove from array
            this.setState({
                itemList: this.state.itemList.filter(function (val) { return val !== data })
            })
        }
    }

    callData() {
        this.dataStock();
        this.dataFill();
    }

    completeRefillStock(items, id) {
        let data = {}
        const transportPrice = items.transportPrice
        const time_stamp = items.time_stamp
        data = {
            ...data,
            ...items.prices,
            transport_price: transportPrice,
            time_stamp: time_stamp
        }
        let PTT = _.get(items.prices, "PTT", "none")
        let World_gas = _.get(items.prices, "World Gas", "none")
        let Siam_gas = _.get(items.prices, "Siam Gas", "none")
        if (id != "" && PTT != "" && World_gas != "" && Siam_gas != "") {
            this.props.postFill(data, id)
            this.dataFill();
        } else {
            this.toggleModalNonCompletedOpen();
        }
        this.dataFill();
    }

    createFillStock(list, status) {
        let data = {}
        let id = ""
        let checkAmountPass = true
        const stockList = _.get(this.props, "stock.list", [])
        list.forEach(item => {
            let id = item.product.id
            const items = _.find(stockList, (s) => { return s.id === _.get(item, "product.id", []) })
            let amount = parseInt(item.amount, 10)
            if (amount <= 0 || isNaN(amount) || amount > items.quantity_empty) { checkAmountPass = false }
            data = {
                ...data,
                [id]: amount
            }
        })
        if (checkAmountPass === true) {
            this.props.postFill(data, id)
            this.dataStock();
        } else {
            this.toggleModalOverload();
        }
        this.dataStock();
    }

    createProductStock(event, status, product, sumTank) {
        event.preventDefault();
        const { dataAdd, addOrEdit, duplicateProduct } = this.state
        let empty = 'EDIT_EMPTY_TANK'
        let full = 'EDIT_FULL_TANK'
        let id = ""
        let data = {}
        /* CREATE And EDIT */
        data = {
            cylinder_brand: dataAdd.brand,
            cylinder_type: dataAdd.type,
            quantity: parseInt(dataAdd.full, 10),
            quantity_empty: parseInt(dataAdd.empty, 10),
            price: parseInt(dataAdd.price, 10),
        }
        if (addOrEdit === true && status === "createAndEdit") {
            data = {
                ...data,
                is_active: true
            }
        } else if (this.state.addOrEdit === false && status === "createAndEdit") {
            id = dataAdd.id
        }
        /* CHANGE STATUS */
        if (status === true || status === false) {
            data = {
                ...product,
                is_active: status
            }
            id = product.id
            this.setDuplicateProduct();
        }
        /* EMPTY AND FULL TANK */
        if (status === empty) {
            data = {
                ...product,
                quantity_empty: sumTank
            }
            id = product.id
            this.setDuplicateProduct();
        } else if (status === full) {
            data = {
                ...product,
                quantity: sumTank
            }
            id = product.id
            this.setDuplicateProduct();
        }
        /* POST */
        if (duplicateProduct === false) {
            this.props.postStock(data, id);
            this.dataStock();
            if (status === "createAndEdit") {
                this.toggleModalConOpen()
                this.toggleModal()
                this.toggleModalSuccessOpen()
            }
        } else {

        }
        this.dataStock();
    }

    componentDidMount() {
        this.dataStock();
        this.dataFill();
    }

    dataFill() {
        this.props.getFillList();
    }

    dataStock() {
        this.props.getStock();
    }

    onChangeProduct(e, status, tankType) {
        const { dataAdd, addOrEdit } = this.state
        var state = {}
        if (tankType != null) {
            //Update changed data.
            state[status] = dataAdd[status] = tankType
            this.setState(state)
            if (status === "brand") {
                state[status] = dataAdd["type"] = ""
                this.setState(state)
            }
        } else {
            if (!isNaN(parseInt(e.target.value, 10))) {
                state[status] = dataAdd[status] = parseInt(e.target.value, 10)
              } else {
                state[status] = dataAdd[status] = ""
              }
            this.setState(state)
        }
        //Set image path to modalAddProduct modal.
        dataAdd["img"] = dataAdd.brand + " " + dataAdd.type
        //Check stock duplication. If duplicates, modalDuplicateProduct opens.
        this.props.stock.list.forEach(
            item => {
                if (dataAdd["brand"] === item.cylinder_brand && dataAdd["type"] === item.cylinder_type && addOrEdit === true) {
                    this.setState({
                        duplicateProduct: true
                    }, () => { this.toggleModalDuplicateProduct() })
                } else {
                    this.setState({
                        duplicateProduct: false
                    })
                }
            })
    }

    setDuplicateProduct() {
        this.setState({
            duplicateProduct: false
        })
    }

    toggleModalDuplicateProduct() {
        this.setState({
            modalDuplicateProductOpen: !this.state.modalDuplicateProductOpen
        })
        if (!this.state.modalDuplicateProductOpen) {
            //on this modal closes, reset state.
            this.setState({
                dataAdd: {
                    ...this.state.dataAdd,
                    brand: "",
                    type: ""
                }
            });
        }
    }

    toggleModalOverload() {
        this.setState({
            modalOverloadOpen: !this.state.modalOverloadOpen
        })
    }

    toggleModalNonCompletedOpen() {
        this.setState({
            modalNonCompleted: !this.state.modalNonCompleted
        })
    }

    toggleModalSuccessOpen() {
        this.setState({
            modalSuccessOpen: !this.state.modalSuccessOpen
        })
    }

    toggleModalConOpen() {
        this.setState({
            modalConOpen: !this.state.modalConOpen
        });
    }

    toggleModal(status, product) {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
        if (status === "add") {
            this.state.addOrEdit = true
            this.setState({
                dataAdd: {
                    id: "",
                    img: "",
                    brand: "",
                    type: "",
                    full: 0,
                    empty: 0,
                    price: 0,
                    is_active: ""
                },
                duplicateProduct: false
            })
        } else if (status === "edit") {
            this.setState({
                dataAdd: {
                    id: product.id,
                    img: product.cylinder_brand + " " + product.cylinder_type,
                    brand: product.cylinder_brand,
                    type: product.cylinder_type,
                    full: product.quantity,
                    empty: product.quantity_empty,
                    price: product.price,
                    is_active: product.is_active
                },
                duplicateProduct: false,
                addOrEdit: false
            })
        }
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeFirstTab: tab
            });
        }
    }

    render() {
        var tap1 = "1"
        var tap2 = "2"
        var tap3 = "3"
        var tap4 = "4"
        const stock = _.get(this.props, 'stock');
        const fillList = _.get(this.props, 'fill', []);
        const tabsName = [
            "ภาพรวมถัง",
            "ถังเปล่า",
            "รอการเติมแก๊ส",
            "ถังเต็ม"
        ];
        return (
            !this.state.isLoading ?
                <div className="loading"></div>
                :
                <div className="product-management disable-text-selection ">
                    <ModalAddProduct
                        state={this.state}
                        toggleModal={this.toggleModal}
                        toggleModalConOpen={this.toggleModalConOpen}
                        onChangeProduct={this.onChangeProduct} />
                    <modal.ModalCon
                        state={this.state}
                        toggleModalConOpen={this.toggleModalConOpen}
                        createProductStock={this.createProductStock} />
                    <modal.ModalSuccess
                        state={this.state}
                        toggleModalSuccessOpen={this.toggleModalSuccessOpen} />
                    <modal.modalNonCompleted
                        state={this.state}
                        toggleModalNonCompletedOpen={this.toggleModalNonCompletedOpen} />
                    <modal.ModalDuplicateProduct
                        state={this.state}
                        toggleModalDuplicateProduct={this.toggleModalDuplicateProduct} />
                    <modal.ModalOverload
                        state={this.state}
                        toggleModalOverload={this.toggleModalOverload}
                    />
                    <div className="product-management-header-group">
                        <Header
                            header="การจัดการคลังสินค้า"
                            toggleAddProductModal={this.toggleModal} />

                        {/* SECTIONTAP */}
                        <Nav tabs className="product-management-tab separator-tabs ml-0 mb-5">
                            <Media query={{ minWidth: 361 }}>
                                <Fragment>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: this.state.activeFirstTab === tap1,
                                                "nav-link": true
                                            })}
                                            onClick={(e) => { this.toggleTab(tap1), this.callData() }}
                                            to="#" >
                                            <span>{tabsName[0]}</span>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: this.state.activeFirstTab === tap2,
                                                "nav-link": true
                                            })}
                                            onClick={(e) => { this.toggleTab(tap2), this.callData() }}
                                            to="#" >
                                            <span>{tabsName[1]}</span>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: this.state.activeFirstTab === tap3,
                                                "nav-link": true
                                            })}
                                            onClick={(e) => { this.toggleTab(tap3), this.callData() }}
                                            to="#" >
                                            <span>{tabsName[2]}</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: this.state.activeFirstTab === tap4,
                                                "nav-link": true
                                            })}
                                            onClick={(e) => { this.toggleTab(tap4), this.callData() }}
                                            to="#" >
                                            <span>{tabsName[3]}</span>
                                        </NavLink>
                                    </NavItem>
                                </Fragment>
                            </Media>
                            <Media query={{ maxWidth: 360 }}>
                                <div className="tab-row">
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: this.state.activeFirstTab === tap1,
                                                "nav-link": true
                                            })}
                                            onClick={(e) => { this.toggleTab(tap1), this.callData() }}
                                            to="#" >
                                            <span>{tabsName[0]}</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: this.state.activeFirstTab === tap2,
                                                "nav-link": true
                                            })}
                                            onClick={(e) => { this.toggleTab(tap2), this.callData() }}
                                            to="#" >
                                            <span>{tabsName[1]}</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: this.state.activeFirstTab === tap3,
                                                "nav-link": true
                                            })}
                                            onClick={(e) => { this.toggleTab(tap3), this.callData() }}
                                            to="#" >
                                            <span>{tabsName[2]}</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: this.state.activeFirstTab === tap4,
                                                "nav-link": true
                                            })}
                                            onClick={(e) => { this.toggleTab(tap4), this.callData() }}
                                            to="#" >
                                            <span>{tabsName[3]}</span>
                                        </NavLink>
                                    </NavItem>
                                </div>
                            </Media>
                        </Nav>
                    </div>


                    <TabContent activeTab={this.state.activeFirstTab}>
                        <TabPane tabId={tap1}>
                            <OverView
                                state={this.state}
                                stockList={stock}
                                toggleModal={this.toggleModal}
                                createProductStock={this.createProductStock} />
                        </TabPane>
                        <TabPane tabId={tap2}>
                            <EmptyTankManagement
                                activeFirstTab={this.state.activeFirstTab}
                                stock={stock}
                                handleModal={this.createProductStock}
                                createFillStock={this.createFillStock} />
                        </TabPane>
                        <TabPane tabId={tap3}>
                            <RefillGasList
                                activeFirstTab={this.state.activeFirstTab}
                                fillList={fillList}
                                completeRefillStock={this.completeRefillStock} />
                        </TabPane>
                        <TabPane tabId={tap4}>
                            <FullTankManagement
                                stock={stock}
                                handleModal={this.createProductStock} />
                        </TabPane>
                    </TabContent>
                </div>
        );
    }
}
const mapStateToProps = ({ stock, fill }) => {
    return {
        stock,
        fill,
    };
};
export default injectIntl(connect(
    mapStateToProps,
    {
        getStock,
        getFillList,
        postStock,
        postFill,
    }
)(DataListLayout));